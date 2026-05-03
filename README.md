# Tone Forge MVP

React + Vite guitar tone-building MVP (frontend only) with Web Audio API and localStorage persistence.

## ⚠️ Important: do NOT open `index.html` directly
This project is a **Vite app**. If you double-click `index.html` (using `file://`), the app can show a white screen because browser module loading differs from a dev server.

Use the app this way:

```bash
npm install
npm run dev
```

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
