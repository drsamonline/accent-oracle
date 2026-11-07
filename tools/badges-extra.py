#!/usr/bin/env python3
"""The two badges badges.py does not know about: engine version and the accent set.

Same generator, same palette, so the whole row looks like one row.

  python3 tools/badges-extra.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from badges import badge  # noqa: E402

INK = "#0d1a20"
CREAM = "#edf1f3"
COLD = "#0f766e"
WARM = "#b45309"

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "docs", "assets")

SPECS = [
    ("engine", "engine", "1.1.0", COLD),
    ("accents", "accents", "12", COLD),
]


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, label, value, colour in SPECS:
        path = os.path.join(OUT, "badge-%s.svg" % name)
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(badge(label, value, colour, INK, CREAM))
        print("wrote", path)


if __name__ == "__main__":
    main()
