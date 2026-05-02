# Tone Forge MVP (React + Vite)

A testable guitar tone builder MVP that is **data-driven** and avoids real trademarked gear names.

## Run locally

```bash
npm install
npm run dev
```

## Main tabs
- **Gear Profile**: Save your guitar/pickup/amp/pedal profile in `localStorage`.
- **Tone Builder**: Choose guitar, amp, cab, reorder pedals, and tweak knob settings.
- **Presets**: Load starter tones.
- **Test Audio**: Test synthetic guitar tone and optional microphone/guitar-interface input.

## Core MVP behaviors
- Data-driven gear catalog in `src/data/gearCatalog.js`.
- Tone adaptation logic in `src/utils/toneAdapter.js`.
- Web Audio chain builder in `src/audio/audioEngine.js`.
- Saved tones and current tone state persisted to `localStorage`.

## Real audio processing in this MVP
- Oscillator-based guitar-like test signal.
- Pedal/amp chain with:
  - gain staging
  - waveshaper distortion
  - filter-based EQ/wah approximation
  - compressor
  - feedback delay network
  - simplified noise gate
- Live microphone input with `getUserMedia` routed through selected chain.

## Placeholder/simplified pieces
- Cabinet selection is currently visual/organizational only (no impulse response cabinet IR loading yet).
- Reverb is simplified via delay-network behavior (not studio IR convolution).
- Modulation effects (chorus/phaser/flanger) are simplified and share a core delay/modulation approach.

## Project structure
- `src/data/gearCatalog.js`
- `src/audio/audioEngine.js`
- `src/utils/toneAdapter.js`
- `src/components/SignalChain.jsx`
- `src/App.jsx`

### If you see a blank/white screen
- Open DevTools and clear localStorage for the app origin, then refresh.
- This build now guards against malformed saved tones/pedals, but old invalid local data can still be removed with a reset.
