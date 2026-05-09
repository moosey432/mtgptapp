# Song Tone Match MVP (No-Build)

This is a no-subscription, no-login, no-paywall MVP for matching song/artist tone ideas to your own guitar gear.

## How to run

1. Download the ZIP.
2. Extract the ZIP.
3. Double-click `index.html`.

No install is needed for the app. The runtime app does not use React, Vite, npm, a backend, imports, modules, or external packages. The app code and styles are embedded directly inside `index.html` so mobile file previews do not have to load separate script files.

## Main workflow

1. Save your real gear profile.
2. Type a song title, artist, and style on **Song Tone Match**.
3. The app checks a built-in local `songToneDatabase`.
4. If there is no exact match, it estimates from artist/style rules.
5. The app adapts the tone to your saved gear, including the pedals you typed into your profile, and gives dial-in settings.
5. The app adapts the tone to your saved gear and gives dial-in settings.

## Included default profile

- Guitar: Benji Madden Signature
- Pickup type: P90
- Amp: Fender Mustang LT25
- Speaker: 1x8 combo speaker
- Notes: beginner/home practice setup
- Featured pedals: Joyo Dark Flame, Danelectro FAB Distortion, Danelectro FAB Flanger, Behringer Vintage Delay VD400, Saphue Classic Chorus, Kmise Spring Reverb, Kmise mini drive

## Pedal-aware matching

The **Pedals owned** field is used during tone matching. Your featured board pedals are now recognized: Joyo Dark Flame, Danelectro FAB Distortion, Danelectro FAB Flanger, Behringer Vintage Delay VD400, Saphue Classic Chorus, Kmise Spring Reverb, and Kmise mini drive. The app also recognizes pedals like Boss DS-1, Boss SD-1, Ibanez Tube Screamer, Pro Co RAT, Big Muff, Boss NS-2, Boss DD-7, Strymon BigSky, Boss CE-2, MXR Phase 90, MXR 10-Band EQ, and Dunlop Cry Baby Wah. It prefers matching owned pedals in the recommended Stomp/Modulation/Delay/Reverb slots before falling back to amp or built-in effect suggestions.
- Featured pedals: SAPHUE Classic Chorus, Rowin Spring Reverb, KMISE Analog Delay, Behringer Vintage Delay VD400, Danelectro FAB Flange, Danelectro FAB Distortion, JOYO Dark Flame

## Pedal-aware matching

The **Pedals owned** field is used during tone matching. If you type pedals like JOYO Dark Flame, Danelectro FAB Distortion, SAPHUE Classic Chorus, Rowin Spring Reverb, KMISE Analog Delay, Behringer Vintage Delay VD400, Danelectro FAB Flange, Boss DS-1, Boss SD-1, Ibanez Tube Screamer, Pro Co RAT, Big Muff, Boss NS-2, Boss DD-7, Strymon BigSky, Boss CE-2, MXR Phase 90, MXR 10-Band EQ, or Dunlop Cry Baby Wah, the app prefers those pedals in the recommended Stomp/Modulation/Delay/Reverb slots before falling back to amp or built-in effect suggestions.

## Special supported amps

- Fender Mustang LT25
- Fender Squier Champ 15

The Song Tone Match adapter has specific small-practice-amp rules for both of these amps, including tighter bass and controlled gain recommendations.

## Persistence

- Save Profile uses `localStorage`.
- Saved matched tones use `localStorage`.
- If localStorage is blocked by the browser, the app shows a visible error instead of crashing.

## Runtime files

The app you open and use is self-contained in:

- `index.html` (fully self-contained app for double-click/open-in-browser use)

These files are kept as editable/reference copies of the same no-build app assets:

- `style.css`
- `app.js`
- `README.md`

Some legacy project files may still exist in the repository only to keep the branch mergeable, but they are not required to run or test this no-build MVP.

## If your phone shows the fallback screen

Some mobile ZIP/file preview apps block JavaScript. If that happens, `index.html` now shows an interactive fallback with expandable sections, editable fields, sliders, and featured pedal guidance instead of getting stuck. For full save/load and automatic matching, use your phone browser option such as **Share → Open in Browser**.

## Notes

- This MVP uses a local tone database and rule-based adaptation.
- It does not pull real-time internet data yet.
- It gives estimated settings to help users get close to a tone.
- Future versions could add online lookup or AI tone research.
- Live input may require localhost or HTTPS if added later.

## Disclaimer

Gear names are used for reference only. This app is not affiliated with or endorsed by any gear manufacturer.
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
