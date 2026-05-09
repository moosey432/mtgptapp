# Song Tone Match MVP (No-Build)

This is a no-subscription, no-login, no-paywall MVP for matching song/artist tone ideas to your own guitar gear.

## How to run

1. Download the ZIP.
2. Extract the ZIP.
3. Double-click `index.html`.

No install is needed. There is no React, no Vite, no npm step, no backend, no imports, no modules, and no external packages. The app code and styles are also embedded directly inside `index.html` so mobile file previews do not have to load separate script files.

## Main workflow

1. Save your real gear profile.
2. Type a song title, artist, and style on **Song Tone Match**.
3. The app checks a built-in local `songToneDatabase`.
4. If there is no exact match, it estimates from artist/style rules.
5. The app adapts the tone to your saved gear and gives dial-in settings.

## Included default profile

- Guitar: Benji Madden Signature
- Pickup type: P90
- Amp: Fender Mustang LT25
- Speaker: 1x8 combo speaker
- Notes: beginner/home practice setup

## Persistence

- Save Profile uses `localStorage`.
- Saved matched tones use `localStorage`.
- If localStorage is blocked by the browser, the app shows a visible error instead of crashing.

## File structure

- `index.html` (fully self-contained app for double-click/open-in-browser use)
- `style.css` (same styles kept separately for editing/reference)
- `app.js` (same JavaScript kept separately for editing/reference)
- `README.md`

## Notes

- This MVP uses a local tone database and rule-based adaptation.
- It does not pull real-time internet data yet.
- It gives estimated settings to help users get close to a tone.
- Future versions could add online lookup or AI tone research.
- Live input may require localhost or HTTPS if added later.

## Disclaimer

Gear names are used for reference only. This app is not affiliated with or endorsed by any gear manufacturer.
