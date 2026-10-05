# NORTHEAST // 30: E-Magazine & 38-Page Monograph

> **"Securing the Northeast: Indian Army's Role in Stability, Peace & National Security"**  
> *Issue 01 · 30 Days (1 Sep – 3 Oct 2026) · 8 States · 50 Stories · 21 Accredited Sources*

---

## 📖 Overview

**NORTHEAST // 30** is a full-featured digital editorial monograph and interactive e-magazine documenting the synchronized civil-military paradigm across Northeast India. The platform captures both vigilant border protection along the Line of Actual Control (LAC) and International Borders (IB), alongside non-kinetic community engagement under Operation Sadbhavana.

---

## ✨ Key Features

1. **Scenic Heritage Aesthetic**:
   - **Cover Hero**: Dawn mountain and winding river landscape (`northeast-dawn-bg.jpg`).
   - **Section 2 (TOC & Editorial)**: Traditional stilt homestay, suspension footbridge, blooming magnolias, and lotus pond background (`northeast-homestay-terrace-bg.jpg`) with frosted editorial cards (`bg-white/96`).
   - **Section 2.5 (Ashtalakshmi Cultural Pavilion)**: Terraced rice paddies, flying hornbills, and rhododendron flora (`northeast-culture-terrace-bg.jpg`).
   - **Interactive Blossom Drift**: Falling magnolia & cherry blossom petals with subtle toggle.

2. **38-Page 3D Physical Book Monograph (`/newsletter`)**:
   - **38 Dedicated Structured Pages** spanning all 8 states (Arunachal Pradesh, Assam, Manipur, Nagaland, Meghalaya, Mizoram, Sikkim, Tripura), Tri-Service Regional Strike, AFSPA Review, Youth Honors, Strategic Briefings, Tea Companion, Appendices, and Colophon.
   - **Interactive Navigation Controls**:
     - Quick-Jump Header Dropdown (Pages 01–38)
     - Hanging Bookmark Ribbon Bar (14 categorized bookmark ribbons)
     - 38-Pill Scrubber Grid Tray with active ring indicators
     - 3D Page Curl corner & keyboard arrow key navigation (`←` / `→`)

3. **Regional Currents: 8 Individual State Tabs (`/regional-currents`)**:
   - Dedicated filter ribbon featuring all **8 individual state tabs** (`Arunachal Pradesh`, `Assam`, `Manipur`, `Meghalaya`, `Mizoram`, `Nagaland`, `Sikkim`, `Tripura`) + `All`.
   - Comprehensive state civic dossiers: native script greetings, wildlife mascots, administrative capitals, constitutional mandates (FNTA Bill, Sixth Schedule, TTAADC), and verified field dispatches.

4. **Rigorous Data & Verification Integrity**:
   - **50 Verified Field Dispatches**: Strict adherence to the 1 Sep – 3 Oct 2026 chronological window.
   - **21 Accredited National & Regional Sources**: The Hindu, Assam Tribune, Nagaland Post, Imphal Free Press, EastMojo, Morung Express, Arunachal Times, All India Radio, and official press releases.
   - **Automated Validation**: `node scripts/validate.cjs` confirms schema, source accreditation, and non-fabrication compliance.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (comes bundled with Node.js)

### Installation & Running Locally

1. **Extract and Navigate to Directory**:
   ```bash
   cd EMAG
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```
   Open `http://localhost:4173`.

6. **Validate Dataset**:
   ```bash
   node scripts/validate.cjs
   ```

---

## 📁 Repository Structure

```
EMAG/
├── dist/                          # Production build output
├── public/                        # Public assets & backgrounds
├── scripts/
│   └── validate.cjs               # Strict data validator script
├── reports/
│   ├── dossier-corrections.md     # Editorial audit notes
│   └── verification.md            # Sourced fact-checking matrix
├── src/
│   ├── assets/images/             # High-res scenic artwork illustrations
│   ├── components/                # Modular UI components (Navigation, 3D Book, Postmarks, Cards)
│   ├── data/
│   │   └── articles.json          # 50 accredited field dispatches
│   ├── types/
│   │   └── article.ts             # TypeScript interfaces & state schemas
│   ├── views/
│   │   ├── CoverView.tsx          # Front cover, TOC & editorial spread
│   │   ├── NewsletterDigestView.tsx # Complete 38-page physical book
│   │   ├── RegionalCurrentsView.tsx # 8 individual state tabs & civic dossiers
│   │   ├── SecurityPulseView.tsx  # Counter-infiltration & border dominance
│   │   ├── FrontierView.tsx       # High Himalaya & LAC vigilance
│   │   ├── DevelopmentView.tsx    # High-altitude infrastructure & BRO roads
│   │   ├── SocietyYouthView.tsx   # Healthcare, Sadbhavana & youth sports
│   │   ├── SportsView.tsx         # Championship glory & honors
│   │   ├── AppendicesView.tsx     # Accredited source register & methodology
│   │   └── PresentationAlbumView.tsx # 50-slide presentation deck
│   ├── App.tsx                    # Route configuration & smooth scrolling
│   ├── main.tsx                   # React root entrypoint
│   └── index.css                  # Tailored typography & print styles
├── index.html                     # HTML5 shell
├── package.json                   # Dependencies & build scripts
├── tailwind.config.js             # Sand, ochre, saffron, & navy color tokens
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite bundler configuration
```

---

*Monograph curated & published under official Sovereign Cartographic & Editorial Guidelines.*
