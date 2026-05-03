# Song Tone Match MVP (No-Build)

## How to run
- Download ZIP
- Extract ZIP
- Open `index.html` directly (double-click)

No install needed. No React, Vite, npm, backend, or external packages.

## What it does
- Saves your gear profile to localStorage.
- Matches song/artist/style tones from a local database and estimates when missing.
- Adapts tone settings to your gear (including Fender Mustang LT25 rules).
- Saves matched tones (save/load/delete) with localStorage.

## Notes
- Save profile uses localStorage.
- This is a no-subscription MVP.
- Live input may require localhost or HTTPS.
# Tone Forge (No-Build Version)

This is now a plain HTML/CSS/JavaScript app designed to work by **double-clicking `index.html`**.

## Run
1. Download ZIP.
2. Extract ZIP.
3. Double-click `index.html`.
# Tone Forge MVP

React + Vite guitar tone-building MVP (frontend only) with Web Audio API and localStorage persistence.

## ⚠️ Important: do NOT open `index.html` directly
This project is a **Vite app**. If you double-click `index.html` (using `file://`), the app can show a white screen because browser module loading differs from a dev server.

Use the app this way:
## Install and run

No npm, no build, no React, no Vite.

## Features
- Gear Profile with localStorage.
- Tone Builder with guitar/amp/cab selection, pedal chain add/remove/reorder, amp sliders.
- Adapt Tone To My Gear logic with explanation output.
- Presets list (style-based labels).
- Test Audio with Play Test Riff / Stop and optional Live Input.
- Saved tones (save/load/delete) in localStorage.

## Notes on Live Input
- Some browsers restrict microphone input on `file://` pages.
- If blocked, the app shows a visible error message instead of crashing.
- Play Test Riff still works for audio testing.

## Legal notice
Gear names are used for reference only. This app is not affiliated with or endorsed by any gear manufacturer.
Then open the localhost URL shown in the terminal (usually `http://localhost:5173/`).

## Build check
```bash
npm run build
```

## Features that work
- Gear Profile tab with owned guitar, pickup type, amp, pedals, cab size, and notes.
- Tone Builder tab with guitar/amp/cab selection, pedal add/remove/reorder, amp sliders, signal-chain display, tone save, and gear adaptation.
- Presets tab with 14 style presets.
- Test Audio tab with Test Riff or Live Input modes, plus Stop button.
- Error box shown in UI when audio calls fail.
- Saved tones persisted in `localStorage` (save/load/delete).

## Audio engine summary
- AudioContext is only created after user button click.
- Test riff uses oscillator notes + ADSR-like envelope for a guitar-like feel.
- Chain includes input gain, EQ (biquad filters), distortion waveshaper, compressor, delay with feedback, wet/dry mix, and output gain.
- Live input uses `getUserMedia` and runs through the same chain.

## Simplified / placeholder parts
- No impulse-response cab simulation.
- Pedal settings UI is simplified for stability.
- Effects are approximations intended for MVP testing.

## Extending the catalog
- Add guitars/amps/cabinets/pedals in `src/data/gearCatalog.js`.
- Add preset objects in `src/data/presets.js`.
- Add tone-adaptation rules in `src/utils/toneAdapter.js`.

## White screen troubleshooting
1. Confirm you started with `npm run dev` (not `file://index.html`).
2. Open browser console for runtime errors.
3. Check missing import/export paths.
4. Check terminal output from Vite.
5. Restart dev server (`Ctrl+C`, then `npm run dev`).
1. Open browser console for runtime errors.
2. Check missing import/export paths.
3. Check terminal output from Vite.
4. Restart dev server (`Ctrl+C`, then `npm run dev`).
