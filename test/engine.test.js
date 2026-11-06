#!/usr/bin/env node
/*
  Engine tests. The engine lives inside docs/play/index.html, so this file lifts
  the <script id="oracle-engine"> block out of the page and runs it here. No
  browser, no audio hardware: the test synthesises a voiced signal with known
  pitch and formants, and asserts the measurements come back where they should.

    node test/engine.test.js
*/
'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const PAGE = path.join(__dirname, '..', 'docs', 'play', 'index.html');
const html = fs.readFileSync(PAGE, 'utf8');
const block = html.match(/<script id="oracle-engine">([\s\S]*?)<\/script>/);
assert(block, 'docs/play/index.html has no <script id="oracle-engine"> block');

// eslint-disable-next-line no-eval
eval(block[1]);
const E = globalThis.OracleEngine;
assert(E, 'the engine block did not export OracleEngine');

let passed = 0;
const failures = [];

function test(name, fn) {
  try { fn(); passed++; }
  catch (err) { failures.push({ name, err }); }
}

/* ------------------------------------------------------------------ */
/* A synthetic speaker: glottal pulse train through two resonators,    */
/* gated into syllables. Known f0, known formants — so the measurement */
/* can be checked against ground truth rather than against itself.     */
/* ------------------------------------------------------------------ */
function synth(opts) {
  const o = Object.assign({
    f0: 120, formants: [[700, 80], [1200, 100]], seconds: 3,
    sr: 16000, syllable: 0.2, gap: 0.1, amp: 0.3
  }, opts || {});

  const n = Math.floor(o.seconds * o.sr);
  const src = new Float32Array(n);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    phase += o.f0 / o.sr;
    if (phase >= 1) { phase -= 1; src[i] = 1; }
  }

  let sig = src;
  for (const [f, bw] of o.formants) {
    const r = Math.exp(-Math.PI * bw / o.sr);
    const c = 2 * r * Math.cos(2 * Math.PI * f / o.sr);
    const y = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      y[i] = sig[i] + c * (i > 0 ? y[i - 1] : 0) - r * r * (i > 1 ? y[i - 2] : 0);
    }
    sig = y;
  }

  const out = new Float32Array(n);
  const period = o.syllable + o.gap;
  for (let i = 0; i < n; i++) {
    const t = (i / o.sr) % period;
    out[i] = t < o.syllable ? sig[i] * o.amp : 0;
  }

  let peak = 0;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(out[i]));
  if (peak > 0) for (let i = 0; i < n; i++) out[i] = out[i] / (peak * 1.1);
  return out;
}

/* ------------------------------ shape ------------------------------ */

test('exposes the documented surface', () => {
  ['extractFeatures', 'classify', 'bandFor', 'demoVector', 'ACCENTS', 'PRIOR', 'FEATURE_KEYS']
    .forEach(k => assert(E[k], 'missing ' + k));
  assert.strictEqual(E.PRIOR.length, 12, 'the closed set is twelve accents');
  assert.strictEqual(Object.keys(E.ACCENTS).length, 12, 'every profile needs a card');
});

test('every profile has a card with all three fields', () => {
  for (const p of E.PRIOR) {
    const a = E.ACCENTS[p.id];
    assert(a, 'no card for ' + p.id);
    for (const f of ['name', 'region', 'where', 'confused', 'fact']) {
      assert(a[f] && a[f].length >= 3, p.id + ' card is missing ' + f);
    }
  }
});

test('bark scale is monotonic and plausible', () => {
  assert(E.bark(100) < E.bark(500));
  assert(E.bark(500) < E.bark(2000));
  assert(E.bark(1000) > 8 && E.bark(1000) < 10, '1 kHz is about 8.5 Bark');
});

/* --------------------------- measurement --------------------------- */

test('recovers a 120 Hz voice', () => {
  const r = E.extractFeatures(synth({ f0: 120 }), 16000);
  assert(r.ok, 'extraction failed: ' + r.reason);
  const err = Math.abs(r.features.f0med - 120) / 120;
  assert(err < 0.08, 'median pitch was ' + r.features.f0med.toFixed(1) + ' Hz, expected ~120');
});

test('recovers a 210 Hz voice', () => {
  const r = E.extractFeatures(synth({ f0: 210 }), 16000);
  assert(r.ok, 'extraction failed: ' + r.reason);
  const err = Math.abs(r.features.f0med - 210) / 210;
  assert(err < 0.08, 'median pitch was ' + r.features.f0med.toFixed(1) + ' Hz, expected ~210');
});

test('a steady voice has low pitch movement', () => {
  const steady = E.extractFeatures(synth({ f0: 130 }), 16000);
  assert(steady.ok);
  assert(steady.features.f0sd < 1.5, 'steady f0 gave ' + steady.features.f0sd.toFixed(2) + ' st');
});

test('syllable rate follows the gating', () => {
  // 200 ms on, 100 ms off => 10 syllables in 3 s, but only 2 s of it is speech.
  // The engine reports nuclei per second OF SPEECH, so the expected figure is 5.
  const r = E.extractFeatures(synth({ f0: 130, syllable: 0.2, gap: 0.1 }), 16000);
  assert(r.ok, 'extraction failed: ' + r.reason);
  assert(r.features.sylRate > 3.8 && r.features.sylRate < 6.2,
    'syllable rate was ' + r.features.sylRate.toFixed(2) + ', expected ~5');
});

test('voiced share is a share', () => {
  const r = E.extractFeatures(synth({ f0: 130 }), 16000);
  assert(r.ok);
  assert(r.features.pctV > 0.2 && r.features.pctV <= 1.0001, 'pctV = ' + r.features.pctV);
});

test('formants come back in the right neighbourhood', () => {
  const r = E.extractFeatures(synth({ f0: 120, formants: [[700, 80], [1200, 100]] }), 16000);
  assert(r.ok, 'extraction failed: ' + r.reason);
  const f1 = r.features.f1, f2 = r.features.f2; // Bark
  const f1hz = 600 * Math.sinh(f1 / 6);          // rough inverse, only for a sanity band
  assert(f1 > 3 && f1 < 12, 'F1 landed at ' + f1.toFixed(2) + ' Bark');
  assert(f2 > f1, 'F2 (' + f2.toFixed(2) + ') should sit above F1 (' + f1.toFixed(2) + ')');
  assert(f1hz > 250 && f1hz < 1400, 'F1 back-converts to ' + Math.round(f1hz) + ' Hz');
});

test('a different vowel space moves the formants', () => {
  const open = E.extractFeatures(synth({ f0: 120, formants: [[750, 80], [1200, 100]] }), 16000);
  const closed = E.extractFeatures(synth({ f0: 120, formants: [[300, 60], [2300, 120]] }), 16000);
  assert(open.ok && closed.ok);
  assert(open.formantFrames > 5 && closed.formantFrames > 5, 'no formant frames were measured');
  // 750/1200 vs 300/2300 Hz: about 4 Bark apart in F1 and 4 in F2.
  assert(Math.abs(open.features.f1 - closed.features.f1) > 2,
    'F1 barely moved between vowel spaces');
  assert(Math.abs(open.features.f2 - closed.features.f2) > 2,
    'F2 barely moved between vowel spaces');
});

/* ------------------------------ refusals ------------------------------ */

test('refuses silence instead of guessing', () => {
  const quiet = new Float32Array(16000 * 2);
  const r = E.extractFeatures(quiet, 16000);
  assert.strictEqual(r.ok, false);
  assert.strictEqual(r.reason, 'quiet');
});

test('refuses a clip that is too short', () => {
  const r = E.extractFeatures(synth({ seconds: 0.2 }), 16000);
  assert.strictEqual(r.ok, false);
  assert.strictEqual(r.reason, 'short');
});

test('refuses nothing at all', () => {
  assert.strictEqual(E.extractFeatures(null, 16000).ok, false);
  assert.strictEqual(E.extractFeatures(new Float32Array(0), 16000).ok, false);
});

/* --------------------------- classification --------------------------- */

test('a sample built from a profile classifies as that profile', () => {
  for (const p of E.PRIOR) {
    const v = E.classify(E.demoVector(p.id, 1));
    assert.strictEqual(v.id, p.id, 'demo vector for ' + p.id + ' came back as ' + v.id);
  }
});

test('the ranking is ordered and normalised', () => {
  const v = E.classify(E.demoVector('gb-rp', 1));
  assert.strictEqual(v.ranked.length, 3, 'three names is enough to show');
  assert.strictEqual(v.ranked[0].pct, 100, 'the winner is the reference');
  assert(v.ranked[0].d <= v.ranked[1].d && v.ranked[1].d <= v.ranked[2].d, 'not sorted');
  assert(v.ranked[1].pct < 100 && v.ranked[1].pct >= 0, 'second place needs a real number');
});

test('classification is deterministic', () => {
  const a = E.classify(E.demoVector('au', 1));
  const b = E.classify(E.demoVector('au', 1));
  assert.strictEqual(a.id, b.id);
  assert.strictEqual(a.ranked[0].d, b.ranked[0].d);
});

test('distance is zero to itself and symmetric', () => {
  const p = E.PRIOR[0];
  assert(E.distance(p, p) < 1e-9, 'a profile should be at zero distance from itself');
  const q = E.PRIOR[3];
  assert(Math.abs(E.distance(p, q) - E.distance(q, p)) < 1e-9);
});

/* ------------------------------- bands ------------------------------- */

test('a clear winner reads as a narrow band', () => {
  assert.strictEqual(E.bandFor(0.2, 0.9).key, 'tight');
  assert.strictEqual(E.bandFor(0.5, 0.72).key, 'fair');
});

test('a near-tie is called a near-tie, not a winner', () => {
  assert.strictEqual(E.bandFor(0.4, 0.45).key, 'toss');
  assert.strictEqual(E.bandFor(0.9, 0.95).key, 'toss');
});

test('nothing fits reads as wide open', () => {
  assert.strictEqual(E.bandFor(1.9, 2.4).key, 'loose');
  const v = E.classify(E.demoVector('loose'));
  assert.strictEqual(v.band.key, 'loose', 'the loose demo vector should refuse to answer');
});

test('the close demo vector lands in the near-tie band', () => {
  const v = E.classify(E.demoVector('close'));
  assert.strictEqual(v.band.key, 'toss');
});

test('every band has a label and a sentence', () => {
  [[0.2, 0.9], [0.5, 0.9], [0.4, 0.45], [1.9, 2.4]].forEach(([a, b]) => {
    const band = E.bandFor(a, b);
    assert(band.label && band.label.length > 3, 'band needs a label');
    assert(band.note && band.note.length > 20, 'band needs a sentence, not a code');
  });
});

/* -------------------------------- report -------------------------------- */

if (failures.length) {
  console.error('\n' + failures.length + ' failing, ' + passed + ' passing\n');
  for (const f of failures) {
    console.error('  FAIL  ' + f.name);
    console.error('        ' + (f.err && f.err.message ? f.err.message : f.err) + '\n');
  }
  process.exit(1);
}

console.log(passed + ' passing, 0 failing');
