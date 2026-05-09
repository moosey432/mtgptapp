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

## Included default profile

- Guitar: Benji Madden Signature
- Pickup type: P90
- Amp: Fender Mustang LT25
- Speaker: 1x8 combo speaker
- Notes: beginner/home practice setup
- Featured pedals: Joyo Dark Flame, Danelectro FAB Distortion, Danelectro FAB Flanger, Behringer Vintage Delay VD400, Saphue Classic Chorus, Kmise Spring Reverb, Kmise mini drive

## Pedal-aware matching

The **Pedals owned** field is used during tone matching. Your featured board pedals are now recognized: Joyo Dark Flame, Danelectro FAB Distortion, Danelectro FAB Flanger, Behringer Vintage Delay VD400, Saphue Classic Chorus, Kmise Spring Reverb, and Kmise mini drive. The app also recognizes pedals like Boss DS-1, Boss SD-1, Ibanez Tube Screamer, Pro Co RAT, Big Muff, Boss NS-2, Boss DD-7, Strymon BigSky, Boss CE-2, MXR Phase 90, MXR 10-Band EQ, and Dunlop Cry Baby Wah. It prefers matching owned pedals in the recommended Stomp/Modulation/Delay/Reverb slots before falling back to amp or built-in effect suggestions.

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
