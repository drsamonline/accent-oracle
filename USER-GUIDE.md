# Accent Oracle — user guide

Everything the app does, in the order you will meet it. Written for someone opening it
for the first time, with a section at the end for whoever maintains it.

---

## 1. The thirty-second version

1. Open **https://drsamonline.github.io/accent-oracle/play/** (or the app from the landing page).
2. Press **Record four seconds** and allow the microphone when the browser asks.
3. Read the sentence on screen out loud, in your normal voice.
4. It stops itself at about four seconds and shows a guess: an accent, the region it is
   usually heard in, how sure it is, and two runners-up.
5. Press **The full card** to learn what that accent actually is. Press **Argue about it**
   to make it a game.

Nothing is uploaded. The recording is turned into eight numbers and thrown away.

---

## 2. Setup

### 2.1 The easy way — use it live

No install, no account, no download. Open
**[drsamonline.github.io/accent-oracle/play/](https://drsamonline.github.io/accent-oracle/play/)**.

The microphone needs a secure page. `https://` counts; `http://localhost` counts;
`file://` does not, on most browsers. If you are serving it locally and the record button
complains, that is why — use `http://localhost:8000`, not a double-clicked file.

### 2.2 Run it on your own machine

```bash
git clone https://github.com/drsamonline/accent-oracle.git
cd accent-oracle
python3 -m http.server 8000
```

Then open **http://localhost:8000/docs/play/**. The app is a single HTML file, so
double-clicking `docs/play/index.html` also works — everything except the microphone.

### 2.3 Install it as an app (recommended on a phone)

Once the page has loaded from the network, it registers a service worker, which makes the
*next* visit work with no connection at all.

- **Android / Chrome:** menu (⋮) → **Add to Home screen** → **Install**. It opens full
  screen, with its own icon, like any other app.
- **Desktop Chrome / Edge:** the install icon in the address bar, or menu → **Cast, save
  and share** → **Install page as app**.
- **iPhone / Safari:** Share → **Add to Home Screen**. It works, but Safari is stricter
  about microphone permission for installed pages — if the button fails, use Safari on the
  normal page instead.

### 2.4 Microphone permissions, by browser

The first time you press record, the browser asks. Choose **Allow**.

| What you see | What it means | Fix |
|---|---|---|
| "Microphone permission was refused, so nothing was recorded." | You pressed Block, or a previous Block was remembered | Click the padlock / microphone icon in the address bar → allow → reload the page |
| "No microphone was found." | No input device, or it is unplugged / disabled | Plug one in, or use **Use a clip instead** |
| "This browser will not give a local page a microphone." | You are on `file://` or an old browser | Use `http://localhost` or the live site, or use a clip |
| "The browser paused its audio engine…" | On a phone, a call or another app took the audio; Safari calls this state `interrupted` | Close the other app (or end the call) and press record again — no reload needed |
| Nothing happens at all | The page is in a background tab | Bring it to the front and press record again |

If none of that works, **Use a clip instead** needs no permission at all.

---

## 3. The oracle — guessing an accent

### 3.1 Record a sample

1. On the home screen, read the sentence in the box: *"I asked her to bring a bottle of
   water from the corner shop."* It is fixed on purpose — the same words, the same vowels,
   so what is left to compare is how you say them.
2. Press **Record four seconds**.
3. Allow the microphone if asked. The scope starts drawing your voice.
4. Read the sentence at a normal pace, about a hand-span from the microphone. Do not
   shout; a normal speaking voice is what it is built for.
5. It stops by itself at about four seconds. If you finish early, press **Stop early** —
   anything over about two seconds is enough. On a phone it gives a short vibration at the
   start and the end of the recording, so you can tell it is listening without looking.
6. The result screen appears.

**Tips that actually change the answer:** read the whole sentence rather than one word;
avoid a room with a fan or an echo; do not whisper (whispering has no pitch to measure);
and speak as you normally would rather than performing an accent — it is measuring you,
not your impression.

### 3.2 Use a clip instead

1. Press **Use a clip instead** (or drop a file on the button — both work).
2. Pick an audio file: WAV, MP3, OGG, M4A and WebM all decode in most browsers.
3. The file is decoded **in the page**. It is not uploaded, and it is discarded the same
   way a recording is.

This exists for two reasons: desktop machines often have no microphone, and some browsers
refuse one to a page they do not trust. A clip is also the fastest way to test the app.

### 3.3 Reading the result screen

From the top down:

- **The band.** One of four words, and it is the most important thing on the screen.
- **The accent name**, then **"usually heard in …"** — the region, not a nationality.
- **"also in the running"** — the second and third closest profiles, with their fit as a
  percentage *of the winner*. 92% means "almost as good a fit", not "92% likely".
- **About this accent** — where it is heard, what it is confused with, one thing worth
  knowing.
- **The caveat** — that this names an accent, not a person.
- **What it measured** — open it to see the eight numbers the guess came from.

### 3.4 The four bands, and how to read them

| Band | What it means | How to treat it |
|---|---|---|
| **clear enough** | One profile fits noticeably better than the next | The best case this app offers. Still not a fact. |
| **narrow-ish** | Two profiles are close | The winner is a coin that landed your way |
| **too close to call** | The top profiles are effectively tied | It is guessing, and it says so. This is a feature |
| **wide open** | Nothing in the set fits this sample well | The honest answer is "I don't know" |

"Too close to call" and "wide open" are not errors. An app that always names a winner is an
app that is wrong in public; these two bands are how it declines to.

### 3.5 What the eight measurements are

Open **What it measured** on any result.

| Measurement | What it is | Why it matters |
|---|---|---|
| median pitch | your average voice pitch, in Hz | Weak evidence on purpose — it tracks age and sex far more than accent |
| pitch movement | how much your pitch moves, in semitones | Some accents are far more melodic than others |
| syllables / second | how fast you speak, counting only speech time | Rhythm is the strongest signal here |
| voiced share | how much of the speech is voiced sound | Separates syllable-timed accents from stress-timed ones |
| first formant | vowel "openness", in Bark | Vowel quality is what accent is made of |
| second formant | vowel "frontness", in Bark | Same, from the other axis |
| vowel spread | how far apart your vowels sit | A crowded vowel space sounds different from a spread one |
| voice quality | how strongly periodic your voice is | Separates breathy from pressed phonation |

If the formants could not be measured on a clip, the row says **not measurable** rather
than inventing a number.

### 3.6 The accent card

Press **The full card** on any result, or the card shown inline. It carries:

- **where it is heard** — cities and regions, not countries-as-identity
- **commonly confused with** — the accents this one is routinely mistaken for
- **worth knowing** — one thing that is true and interesting about it

There are twelve cards, one per accent in the set. They are the reason to come back: a
guess is a gimmick, a card is something you learn.

---

## 4. Challenge mode — the room against the oracle

The point of the game: the app is allowed to lose, in public, and the room keeps score.

1. Press **Challenge** in the header (or **Argue about it** on a result).
2. Hand the phone to someone. Press **Record a round** — they read the sentence.
3. The oracle announces its guess and its band, under "the oracle said".
4. The room now says what it actually was. Pick the accent from the **The room says it
   was** dropdown.
5. Press **Settle it**. The scoreboard updates and the round is logged below.
6. If nobody in the room knows, press **Nobody knows** — the round is dropped rather than
   scored, which is fairer than guessing.
7. Press **Reset the scoreboard** to start a fresh session.

The scoreboard counts **rounds**, **room right** and **oracle right**. It is stored in this
browser only, survives a reload, and clears if you clear site data.

Suggested house rule: the oracle wins a round if its top guess matches the room, and the
room wins otherwise — including when the band said "too close to call", because a coin
flip that lands your way is still your win.

---

## 5. The rest of the interface

### 5.1 Theme

Press **Dark** / **Light** in the header. The app and the landing page remember their
themes separately, so changing one does not change the other. The first visit follows your
system setting.

### 5.2 Audio — what happens to your recording

Press **Audio** in the header. It states, in plain words: nothing leaves the device, nothing
is stored, there is no account, and what *is* kept locally (your theme, and the challenge
scoreboard).

This is not a promise in a footer. The page carries a `Content-Security-Policy` with
`connect-src 'none'`, so the browser itself refuses any network call the page might try to
make.

### 5.3 Support

Press **Support** in the header (or **Support it** on the landing page). UPI with a
scannable QR and the ID as selectable text, Ko-fi, PayPal, the book store, the rest of the
estate, and an email address. Nothing in the app is gated behind it.

### 5.4 Offline use

- After the first visit from the network, the app works with no connection.
- On a plane: install it to the home screen first, then turn the radio off.
- The first visit ever still needs the network, unless you are running it from disk.

---

## 6. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| "That was too short to read." | Under ~2 seconds of audio | Record again, or use a longer clip |
| "Almost nothing in that clip was speech." | Silence, or the mic is muted | Check the input device; move closer |
| "The audio was there but no voiced speech came out of it." | Humming, whistling, clapping | Speak a sentence — it needs voiced sound to measure pitch |
| "That file did not decode as audio." | Unsupported codec | Convert to WAV or MP3 |
| Every result says "too close to call" | The sample is short, or noisy | Read the full sentence, quiet room, normal volume |
| The same accent comes back every time | You are being compared against hand-set profiles, not a trained model | Expected. See §7.1 |
| The app will not update after a release | The service worker is serving the old shell | Reload twice, or clear site data. The page itself is network-first, so this should be rare |
| Install prompt never appears | Not served over `https://`, or already installed | Use the live URL |

---

## 7. For whoever maintains it

### 7.1 The honest limitation, and how to fix it

The eight measurements are real signal processing. **The twelve profiles they are compared
against are hand-set starting values**, not values measured from a labelled corpus. The app
says so on the result screen and on the Audio page.

To make the guesses mean something, replace the `PRIOR` block at the top of the engine in
`docs/play/index.html`. The full procedure is in **[ACCENTS.md](ACCENTS.md)** § Calibration:
measure the same eight features across a labelled corpus (Common Voice or VoxCommunis),
average per accent, paste the centroids in, take the per-feature standard deviation into the
`scale` values, delete the disclaimer, bump `ENGINE_VERSION`.

### 7.2 Change the words or add an accent

- **Card copy:** edit the `ACCENTS` object in the engine block. Every entry needs `name`,
  `region`, `where`, `confused`, `fact` — the tests fail if one is missing.
- **Add a thirteenth accent:** add a profile to `PRIOR` and a card to `ACCENTS` with the same
  `id`. The test `every profile has a card` keeps the two in step.
- **The read sentence:** the `SENTENCE` constant in the interface script, and the same text
  in the two HTML blocks that display it.

### 7.3 Run the tests

```bash
node test/engine.test.js     # 23 passing, 0 failing
```

The tests lift the engine out of the HTML and run it in Node against synthesised voices with
known pitch, formants and syllable gating, so a change to the maths is checked against ground
truth rather than against its own previous output.

### 7.4 Release checklist

1. `node test/engine.test.js`
2. `python3 tools/verify.py . --audit` — the estate's presentation checks
3. Bump `CACHE` in `docs/play/sw.js` — an unchanged cache name pins the old build
4. `bash tools/shot.sh . app app "#/demo/us-south" 940` and `bash tools/shot.sh . landing landing "" 1900`
5. Commit and push; Pages builds from `main` / `docs`

### 7.5 Demo routes (for screenshots and the landing page)

| Route | Shows |
|---|---|
| `#/` | the home screen |
| `#/demo/us-south` | a result with a clear band |
| `#/demo/close` | a result in the "too close to call" band |
| `#/demo/loose` | a result in the "wide open" band |
| `#/demo/in-gen` | any accent by id — `in-gen`, `gb-rp`, `au`, `ng`, … |
| `#/challenge` | challenge mode |
| `#/learn/gb-scot` | an accent card by id |

Demo results are marked **illustrative sample** on screen so they are never mistaken for a
real measurement.
