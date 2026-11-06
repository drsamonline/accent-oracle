# SPEC — Accent Oracle

**Source of truth:** `knowledge/docs/app_ideas_categorized.md`, section *C11 · Fun apps*,
entry *Accent Oracle — guess where you're from* (rarity: Rare, size: S).
**Status:** specified, not built.

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

## Open questions for the build

- Which on-device model, and how big a download is acceptable for a toy.
- Whether the app needs a fixed sentence to read (comparable samples) or free speech
  (natural, but harder to classify).
- How to present a wrong guess so it is funny rather than deflating.
