# Tone Forge MVP

A testable React + Vite guitar tone builder app with a data-driven gear catalog and browser audio chain.

## Setup

```bash
npm install
npm run dev
```

## Features
- Gear profile setup saved to localStorage.
- Tone builder with guitar/amp/cab selection and reorderable pedal chain.
- Presets for common tones.
- Web Audio test tone generator and optional microphone input.
- Tone adaptation from profile (pickup/amp-aware suggestions).
- Save/load tones with localStorage.

## Real audio processing vs placeholders
### Real processing
- Oscillator-based guitar-like test signal.
- Chainable gain, waveshaper distortion, filter EQ/wah, compressor, delay network, and simple gate.
- Live microphone input (`getUserMedia`) through the selected chain.

### Placeholder/simplified behavior
- Cab simulation is visual only (no IR loader yet).
- Reverb is a delay-network approximation (not studio convolution IRs).
- Some pedals share simplified implementations.
