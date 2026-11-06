# ACCENTS — the closed set

The oracle never invents an accent. It picks from these twelve, and every one of them
carries a card: where it is heard, what it is commonly confused with, and one thing worth
knowing. Twelve is a deliberate cap — a game that can name forty things names nothing.

Two rules the copy keeps everywhere:

- It names an **accent**, never a person. "Indian English", not "Indian". "Usually heard
  in", not "you are from".
- It says **where an accent is heard**, not who is entitled to speak it. Accents travel;
  people move; the second generation of a family in London may speak exactly the accent
  the card places in Chennai.

## The set

| id | accent | region phrasing |
|---|---|---|
| `in-gen` | General Indian English | India — the English heard across most of the country |
| `in-south` | South Indian English | Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana |
| `in-east` | Eastern Indian English | West Bengal, Odisha, Assam and the north-east |
| `gb-rp` | Received Pronunciation | southern England, long the reference accent of British broadcasting |
| `gb-north` | Northern English | Manchester, Leeds, Liverpool, Sheffield, Newcastle |
| `gb-scot` | Scottish English | Scotland |
| `ie` | Irish English | the Republic of Ireland and Northern Ireland |
| `us-gen` | General American | the United States, strongest in the Midwest and West |
| `us-south` | Southern US English | the American South, from Texas to the Carolinas |
| `au` | Australian English | Australia |
| `ng` | Nigerian English | Nigeria, and widely across West Africa |
| `sg` | Singaporean and Malaysian English | Singapore and peninsular Malaysia |

## The cards

### General Indian English · `in-gen`
**Where it is heard.** School and office English from Mumbai to Delhi to Hyderabad; the
default register of Indian news broadcasting and, increasingly, of Indian tech.
**Commonly confused with.** Pakistani and Bangladeshi English, and with Sri Lankan English
on a short sample.
**Worth knowing.** It is usually described as syllable-timed: syllables keep roughly equal
weight, where British or American English crushes unstressed syllables almost to nothing.
That evenness is the single most audible thing about it, and the hardest to fake.

### South Indian English · `in-south`
**Where it is heard.** Chennai, Kochi, Bengaluru, Hyderabad — and everywhere their speakers
have moved since.
**Commonly confused with.** Sri Lankan English; general Indian English on a sample shorter
than a sentence.
**Worth knowing.** Retroflex consonants are made with the tongue curled further back than in
most other Englishes. It is one of the most reliably audible markers in the country, and one
of the few the oracle can actually get hold of.

### Eastern Indian English · `in-east`
**Where it is heard.** Kolkata, Bhubaneswar, Guwahati and the north-east.
**Commonly confused with.** General Indian English, and with Bangladeshi English.
**Worth knowing.** Vowel length is often carried by quality rather than duration, so pairs
that sound clearly different in British English can fall together. A classifier that leans on
vowel length alone will misread it.

### Received Pronunciation · `gb-rp`
**Where it is heard.** Southern England. Long the reference accent of British broadcasting,
and much less dominant there now than the old recordings suggest.
**Commonly confused with.** Other southern British accents, and with "BBC English" as people
remember it rather than as it is spoken today.
**Worth knowing.** It is non-rhotic: the r in *car* is not pronounced. Most English accents
share that, which makes it a weak clue on its own and a good example of why one measurement
never decides anything here.

### Northern English · `gb-north`
**Where it is heard.** Manchester, Leeds, Liverpool, Sheffield, Newcastle — and they are not
the same accent, which is the game's whole problem in miniature.
**Commonly confused with.** Scottish and Irish English, and with each other.
**Worth knowing.** The vowel in *cup* is the classic dividing line: the north keeps it short
and rounded, the south lengthens it. It is a two-second test that generations of English
people have used on each other.

### Scottish English · `gb-scot`
**Where it is heard.** Scotland. Glasgow, Edinburgh and the Highlands differ more from each
other than some of the cards here differ from one another.
**Commonly confused with.** Irish English and Northern Irish English, and with Northern
English.
**Worth knowing.** It is rhotic, and it keeps a distinction between *which* and *witch* that
most other varieties have dropped. That /hw/ is a genuine shibboleth, and a rare one.

### Irish English · `ie`
**Where it is heard.** The Republic of Ireland and Northern Ireland.
**Commonly confused with.** Scottish English, and with Northern English.
**Worth knowing.** Many Irish varieties soften t and d between vowels, so *city* can land
close to *sissy*. The same habit turns up in some American English, which is exactly why a
single shared feature is not evidence.

### General American · `us-gen`
**Where it is heard.** The United States; the accent of national broadcast news, strongest in
the Midwest and West.
**Commonly confused with.** Canadian English, which is very close, and with "neutral"
American in general.
**Worth knowing.** It is rhotic and it flaps its t's, so *writer* and *rider* can sound
identical. That is why Americans spell names out loud on the phone, and why the oracle's
transcript-free approach cannot separate them either.

### Southern US English · `us-south`
**Where it is heard.** The American South, from Texas to the Carolinas.
**Commonly confused with.** Appalachian English and African American English, which share
several features with it and are routinely collapsed into it by outsiders.
**Worth knowing.** The drawl is measurable: vowels lengthen and some become glides, so *time*
drifts toward *tahm*. Duration is one of the few things here a browser can measure honestly.

### Australian English · `au`
**Where it is heard.** Australia. It is broadly uniform across a continent — the real split is
city against country, not state against state.
**Commonly confused with.** New Zealand English, the closest pair in this set.
**Worth knowing.** The vowel in *kit* is raised toward *ee*, which is why *fish and chips* is
the shibboleth Australians and New Zealanders use on each other. The two accents differ
slightly in opposite directions on that vowel.

### Nigerian English · `ng`
**Where it is heard.** Nigeria, and widely across West Africa.
**Commonly confused with.** Other West African Englishes, and with general Indian English on
a short sample — both are syllable-timed, and rhythm is what the oracle leans on hardest.
**Worth knowing.** Final consonant clusters are often simplified, so *asked* can come out as
*aks*. That is not a mistake: it is a form that has been in English for a thousand years and
lost the argument in Britain.

### Singaporean and Malaysian English · `sg`
**Where it is heard.** Singapore and peninsular Malaysia.
**Commonly confused with.** Each other, and with other South-East Asian Englishes.
**Worth knowing.** Strongly syllable-timed, with heavy final-consonant reduction. Together
those give a noticeably even, clipped rhythm next to British English — and they are precisely
the two features the oracle measures best.

## Calibration — read this before trusting a number

The oracle measures eight things from your sample, for real, in the browser: median pitch,
pitch movement, syllable rate, voiced share, first and second formant, vowel spread, and voice
quality. That part is not a simulation.

The **profiles it compares those measurements against are hand-set starting values**, not
values measured from a labelled corpus. They are in one block at the top of the engine in
`docs/play/index.html`, marked `PRIOR`. They are ordered the way the linguistics literature
would lead you to expect — syllable-timed varieties sitting together, rhotic varieties
sitting together — but they are not measurements, and the app says so on screen rather than
pretending otherwise.

To make the guesses real, replace that block with centroids computed from a labelled corpus:

1. **Pick a corpus with accent labels.** Common Voice (per-accent metadata, CC0) or
   VoxCommunis (English accents, CC-BY) both carry enough per-accent material to start.
2. **Run the same eight measurements.** `test/engine.test.js` imports the engine directly, so
   a Node script can read WAVs, call `extractFeatures`, and write out one vector per file.
3. **Average per accent**, and take the per-feature standard deviation too — that becomes the
   `scale` value instead of the hand-set one, which is the single biggest accuracy gain
   available.
4. **Paste the centroids into `PRIOR`**, delete the disclaimer string, and bump
   `ENGINE_VERSION`.

Two confounds to fix in the same pass, or the corpus will teach the model the wrong thing:
median pitch tracks speaker sex and age far more than it tracks accent (it is already weighted
down to 0.25 for that reason), and formant values track vocal tract length, so they want
normalising per speaker before averaging.

Until that pass happens, this is a game with a real microphone and honest measurements behind
it. Which is what the spec asked for.
