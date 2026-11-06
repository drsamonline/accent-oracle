# Accent Oracle

[![License: PolyForm Noncommercial 1.0.0](https://img.shields.io/badge/license-PolyForm%20Noncommercial%201.0.0-blue)](LICENSE)

**It listens to a short spoken sample and guesses your accent and region — on device.**

> **Status: specified, not built.** This repository was created from the estate's app-idea
> list and, until now, was empty: the idea had a spec but the repository carried none of it.
> Nothing here runs yet. The spec is in [SPEC.md](SPEC.md).

## What it is meant to be

A small, offline, accountless app. You speak for a few seconds; it says what it thinks your
accent is and where that accent is usually from. Everything happens on the device — no
recording leaves it, because there is nothing to send it to.

## How it must be framed

The idea list is explicit about this, and it is the first requirement rather than a
footnote:

> Frame it as a fun game, never as a judgment about a person.

So: it guesses an accent, not a nationality; it never claims to place *you*, only the
speech in that sample; and it says so on screen. A wrong guess has to be cheap and funny,
not embarrassing — which is a design constraint on the result screen, not a disclaimer
tucked in a footer.

## Planned shape

- **The oracle** — record a few seconds, get a guess with a confidence band rather than a
  single confident answer.
- **"Learn more about this accent"** — a card explaining the accent it guessed: where it is
  heard, what it is often confused with.
- **Challenge mode** — someone reads a sentence, the app guesses, the room argues about it.

## Built with

Nothing yet. When it is built it follows the estate's conventions: a single self-contained
page under `docs/play/`, a landing page at `docs/index.html`, offline-first, no accounts, no
telemetry, PolyForm Noncommercial.
