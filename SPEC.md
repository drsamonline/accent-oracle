# SPEC — Accent Oracle

**Source of truth:** `knowledge/docs/app_ideas_categorized.md`, section *C11 · Fun apps*,
entry *Accent Oracle — guess where you're from* (rarity: Rare, size: S).
**Status:** built — 2026-11-07. The app is `docs/play/index.html`; the twelve accent cards and the
calibration path are in `ACCENTS.md`; the engine's tests are `test/engine.test.js`.

## The brief, as recorded

> Build an app called **Accent Oracle**. It listens to a short spoken sample and guesses the
> speaker's accent and likely region, on-device. Add: a "learn more about this accent" card
> and a challenge mode. Handle with care: frame it as a fun game, never as a judgment about
> a person.

## What that means in requirements

1. **On device, only.** Speech is processed locally. No upload, no account, no telemetry —
   which also means no cloud speech model: whatever does the classification ships with the
   app and works with the network off.
2. **An accent, not a person.** The output names an accent and the region it is usually
   heard in. It does not assert nationality, ethnicity or identity, and the result screen
   says which of those it is *not* doing.
3. **A confidence band, not a verdict.** A single confident answer invites the app to be
   wrong in public. The guess should come with its uncertainty.
4. **Learn more.** A card per accent: where it is heard, what it is commonly confused with,
   one interesting fact. This is what turns a gimmick into something you keep.
5. **Challenge mode.** A round where the room argues with the app. Losing is part of the
   game, which is the point of the care framing.
6. **A short sample.** Seconds, not a monologue — and the recording is discarded when the
   guess is made, not stored.

## Explicitly out of scope

- Identifying individuals, or matching a voice to a person.
- Any claim about nationality, ethnicity or immigration status.
- Sending audio anywhere, ever.

## Open questions for the build — answered

**Which on-device model, and how big a download is acceptable for a toy.**
None. A quantised accent classifier is 20–100 MB, which is not a single self-contained page and
is a bad first impression for something meant to be a party trick. The app instead measures eight
things from the audio with hand-written signal processing — autocorrelation pitch, cepstral
formants, envelope syllables, Bark vowel spread — and scores them against twelve profiles. Zero
download, works offline, no build step. The profiles are hand-set priors rather than measured
centroids, and both the app and `ACCENTS.md` say so; replacing them is a documented one-file job
and the honest path to real accuracy.

**Whether the app needs a fixed sentence to read (comparable samples) or free speech.**
Both, leaning on the fixed sentence. The home screen shows one sentence and asks for it, because
comparable samples are the only way eight numbers mean anything across speakers. Nothing checks
what you actually read, and a dropped clip is measured the same way — so free speech works, it is
just noisier.

**How to present a wrong guess so it is funny rather than deflating.**
Three things, all on the result screen rather than in a footer. The band: "too close to call" is a
result the app can return, so it is not always claiming a winner. The runners-up: the second and
third profiles are shown with their fit, so a near-miss is visible as a near-miss. And the card:
every outcome, right or wrong, hands over something true about the accent it named — where it is
heard, what it is confused with — so the round was worth playing even when the guess was wrong.

## What the build added that the brief did not ask for

- A **clip button**. Microphones are refused more often than anyone expects, and a page that can
  only listen is a page half the visitors cannot use. Files are decoded in the page like
  everything else.
- A **`Content-Security-Policy` with `connect-src 'none'`**. The brief asks for on-device only;
  a policy the browser enforces makes that checkable instead of promised.
- **"What it measured"**, behind a disclosure on the result screen. Eight numbers, so the guess
  can be argued with rather than just received.
