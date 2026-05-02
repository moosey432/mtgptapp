export const gearCatalog = {
  guitars: [
    { id: 'strat-style', name: 'S-Style Solid Body', type: 'Single Cut/S-Style' },
    { id: 't-style', name: 'T-Style Solid Body', type: 'T-Style' },
    { id: 'hh-modern', name: 'Modern HH Superstrat', type: 'Superstrat' },
    { id: 'semi-hollow', name: 'Semi-Hollow Classic', type: 'Semi-Hollow' },
  ],
  pickups: ['single coil', 'humbucker', 'p90', 'active', 'acoustic pickup'],
  amps: [
    { id: 'american-clean', name: 'American Clean Combo', gain: 0.3, bass: 0.55, mids: 0.45, treble: 0.65 },
    { id: 'british-crunch', name: 'British Crunch Amp', gain: 0.55, bass: 0.45, mids: 0.7, treble: 0.6 },
    { id: 'high-gain-stack', name: 'High Gain Metal Stack', gain: 0.85, bass: 0.6, mids: 0.5, treble: 0.7 },
    { id: 'small-practice', name: 'Small Practice Combo', gain: 0.4, bass: 0.35, mids: 0.65, treble: 0.55 },
  ],
  cabinets: [
    { id: '1x12-open', name: '1x12 Open Back', color: '#89a' },
    { id: '2x12-closed', name: '2x12 Closed Back', color: '#678' },
    { id: '4x12-stack', name: '4x12 Stack Cab', color: '#445' },
  ],
  pedalTypes: [
    'tuner', 'compressor', 'overdrive', 'distortion', 'fuzz', 'chorus',
    'phaser', 'flanger', 'delay', 'reverb', 'eq', 'noise gate', 'wah'
  ],
}

export const defaultPedalSettings = {
  tuner: { enabled: true },
  compressor: { threshold: 0.5, ratio: 0.4, level: 0.6, enabled: true },
  overdrive: { drive: 0.4, tone: 0.5, level: 0.65, enabled: true },
  distortion: { drive: 0.6, tone: 0.5, level: 0.65, enabled: true },
  fuzz: { drive: 0.8, tone: 0.45, level: 0.6, enabled: true },
  chorus: { depth: 0.45, rate: 0.3, mix: 0.35, enabled: true },
  phaser: { depth: 0.35, rate: 0.25, mix: 0.3, enabled: true },
  flanger: { depth: 0.35, rate: 0.35, mix: 0.25, enabled: true },
  delay: { time: 0.35, feedback: 0.4, mix: 0.35, enabled: true },
  reverb: { size: 0.35, mix: 0.35, enabled: true },
  eq: { bass: 0.5, mids: 0.5, treble: 0.5, enabled: true },
  'noise gate': { threshold: 0.2, release: 0.25, enabled: true },
  wah: { frequency: 0.6, q: 0.65, enabled: true },
}

export const presets = [
  { name: 'Clean Worship', amp: 'american-clean', cab: '2x12-closed', pedals: ['compressor', 'chorus', 'delay', 'reverb'] },
  { name: 'Classic Rock Crunch', amp: 'british-crunch', cab: '4x12-stack', pedals: ['overdrive', 'eq'] },
  { name: '80s Metal', amp: 'high-gain-stack', cab: '4x12-stack', pedals: ['noise gate', 'distortion', 'chorus', 'delay'] },
  { name: 'Modern Metal', amp: 'high-gain-stack', cab: '4x12-stack', pedals: ['noise gate', 'overdrive', 'eq'] },
  { name: 'Punk Rock', amp: 'british-crunch', cab: '2x12-closed', pedals: ['distortion', 'noise gate'] },
  { name: 'Blues Lead', amp: 'american-clean', cab: '1x12-open', pedals: ['compressor', 'overdrive', 'delay'] },
  { name: 'Ambient Clean', amp: 'american-clean', cab: '2x12-closed', pedals: ['chorus', 'delay', 'reverb', 'eq'] },
  { name: 'Grunge Fuzz', amp: 'british-crunch', cab: '4x12-stack', pedals: ['fuzz', 'delay'] },
]
