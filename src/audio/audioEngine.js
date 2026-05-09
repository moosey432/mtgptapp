// Web Audio chain builder for a testable guitar-like signal path.
let context
let currentNodes = []
let mediaStream

const makeDistortionCurve = (amount = 25) => {
  const n = 44100
  const curve = new Float32Array(n)
  for (let i = 0; i < n; i += 1) {
    const x = (i * 2) / n - 1
    curve[i] = ((3 + amount) * x * 20 * (Math.PI / 180)) / (Math.PI + amount * Math.abs(x))
  }
  return curve
}

const ensureContext = async () => {
  if (!context) context = new window.AudioContext()
  if (context.state === 'suspended') await context.resume()
  return context
}

const addPedalNode = (ctx, type, settings, inputNode) => {
  let out = inputNode
  if (['overdrive', 'distortion', 'fuzz'].includes(type)) {
    const shaper = ctx.createWaveShaper()
    shaper.curve = makeDistortionCurve(15 + settings.drive * 80)
    inputNode.connect(shaper)
    out = shaper
  }
  if (['eq', 'wah'].includes(type)) {
    const f = ctx.createBiquadFilter()
    f.type = type === 'wah' ? 'bandpass' : 'peaking'
    f.frequency.value = type === 'wah' ? 400 + settings.frequency * 1600 : 850
    f.gain.value = type === 'wah' ? 0 : (settings.mids - 0.5) * 16
    inputNode.connect(f)
    out = f
  }
  if (['delay', 'reverb', 'chorus', 'flanger'].includes(type)) {
    const delay = ctx.createDelay(1.2)
    const fb = ctx.createGain(); fb.gain.value = settings.feedback ?? 0.25
    const wet = ctx.createGain(); wet.gain.value = settings.mix ?? 0.3
    const dry = ctx.createGain(); dry.gain.value = 1 - wet.gain.value
    inputNode.connect(dry)
    inputNode.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet)
    const merger = ctx.createGain(); dry.connect(merger); wet.connect(merger)
    out = merger
  }
  if (type === 'compressor') {
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -30 + settings.threshold * 20
    comp.ratio.value = 1 + settings.ratio * 12
    inputNode.connect(comp)
    out = comp
  }
  if (type === 'noise gate') {
    const gate = ctx.createGain()
    gate.gain.value = Math.max(0.1, 1 - (settings.threshold ?? 0.3))
    inputNode.connect(gate)
    out = gate
  }
  return out
}

export const playTestTone = async (tone) => {
  const ctx = await ensureContext()
  const osc = ctx.createOscillator()
  const harmonics = ctx.createOscillator()
  const mix = ctx.createGain(); mix.gain.value = 0.2
  const ampGain = ctx.createGain(); ampGain.gain.value = 0.25 + tone.ampSettings.gain * 0.4
  const eq = ctx.createBiquadFilter(); eq.type = 'lowshelf'; eq.frequency.value = 250; eq.gain.value = (tone.ampSettings.bass - 0.5) * 12
  let node = mix

  tone.pedals.forEach((p) => { if (p.settings.enabled) node = addPedalNode(ctx, p.type, p.settings, node) })

  osc.type = 'sawtooth'; osc.frequency.value = 110
  harmonics.type = 'triangle'; harmonics.frequency.value = 220
  osc.connect(mix); harmonics.connect(mix)
  node.connect(eq); eq.connect(ampGain); ampGain.connect(ctx.destination)
  osc.start(); harmonics.start(); osc.stop(ctx.currentTime + 1.5); harmonics.stop(ctx.currentTime + 1.5)
  currentNodes = [osc, harmonics, mix, node, eq, ampGain]
}

export const startMicInput = async (tone) => {
  const ctx = await ensureContext()
  mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const src = ctx.createMediaStreamSource(mediaStream)
  let node = src
  tone.pedals.forEach((p) => { if (p.settings.enabled) node = addPedalNode(ctx, p.type, p.settings, node) })
  node.connect(ctx.destination)
  currentNodes = [src, node]
}

export const stopAudio = () => {
  currentNodes.forEach((n) => { try { n.disconnect() } catch { /* noop */ } })
  currentNodes = []
  if (mediaStream) mediaStream.getTracks().forEach((t) => t.stop())
}
