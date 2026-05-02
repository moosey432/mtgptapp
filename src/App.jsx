import { useMemo, useState } from 'react'
import { defaultPedalSettings, gearCatalog, presets } from './data/gearCatalog'
import { adaptToneToProfile } from './utils/toneAdapter'
import { playTestTone, startMicInput, stopAudio } from './audio/audioEngine'
import SignalChain from './components/SignalChain'

const safeParse = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const mkPedal = (type) => ({
  id: `${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  type,
  settings: { ...defaultPedalSettings[type] },
})

const makeDefaultTone = () => ({
  guitar: gearCatalog.guitars[0].id,
  amp: gearCatalog.amps[0].id,
  cab: gearCatalog.cabinets[0].id,
  inputGain: 1,
  ampSettings: { ...gearCatalog.amps[0] },
  pedals: [mkPedal('compressor'), mkPedal('overdrive'), mkPedal('delay')],
})

const normalizeTone = (incoming) => {
  const base = makeDefaultTone()
  if (!incoming) return base
  return {
    ...base,
    ...incoming,
    ampSettings: { ...base.ampSettings, ...(incoming.ampSettings || {}) },
    pedals: Array.isArray(incoming.pedals)
      ? incoming.pedals.map((p) => ({ ...mkPedal(p.type || 'overdrive'), ...p }))
      : base.pedals,
  }
}

const reorder = (list, from, to) => {
  const copy = [...list]
  const [item] = copy.splice(from, 1)
  copy.splice(to, 0, item)
  return copy
}

export default function App() {
  const [tab, setTab] = useState('builder')
  const [profile, setProfile] = useState(() => safeParse('gearProfile', {}))
  const [tone, setTone] = useState(() => normalizeTone(safeParse('currentTone', null)))
  const [notes, setNotes] = useState([])
  const [savedTones, setSavedTones] = useState(() => safeParse('savedTones', []))

  const amp = useMemo(() => gearCatalog.amps.find((a) => a.id === tone.amp), [tone.amp])

  const saveProfile = () => localStorage.setItem('gearProfile', JSON.stringify(profile))

  const saveTone = () => {
    localStorage.setItem('currentTone', JSON.stringify(tone))
    const next = [...savedTones, { name: `Tone ${savedTones.length + 1}`, tone }]
    setSavedTones(next)
    localStorage.setItem('savedTones', JSON.stringify(next))
  }

  const applyPreset = (preset) => {
    const nextAmp = gearCatalog.amps.find((a) => a.id === preset.amp) || gearCatalog.amps[0]
    setTone((current) => ({
      ...current,
      amp: preset.amp,
      cab: preset.cab,
      ampSettings: { ...nextAmp },
      pedals: preset.pedals.map(mkPedal),
    }))
  }

  const adapt = () => {
    const { updates, notes: why } = adaptToneToProfile(tone, profile)
    setTone(normalizeTone(updates))
    setNotes(why)
  }

  return (
    <div className="app">
      <h1>Tone Forge MVP</h1>
      <div className="tabs">
        {['profile', 'builder', 'presets', 'audio'].map((t) => (
          <button key={t} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'profile' && (
        <section>
          <h2>Gear Profile</h2>
          {['guitarType', 'ownedAmp', 'ownedPedals', 'audioInputChoice'].map((k) => (
            <input key={k} placeholder={k} value={profile[k] || ''} onChange={(e) => setProfile({ ...profile, [k]: e.target.value })} />
          ))}
          <select value={profile.pickupType || ''} onChange={(e) => setProfile({ ...profile, pickupType: e.target.value })}>
            <option value="">Pickup Type</option>
            {gearCatalog.pickups.map((p) => <option key={p}>{p}</option>)}
          </select>
          <button onClick={saveProfile}>Save Profile</button>
        </section>
      )}

      {tab === 'builder' && (
        <section>
          <h2>Tone Builder</h2>
          <select value={tone.guitar} onChange={(e) => setTone({ ...tone, guitar: e.target.value })}>
            {gearCatalog.guitars.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <select value={tone.amp} onChange={(e) => setTone({ ...tone, amp: e.target.value, ampSettings: { ...gearCatalog.amps.find((a) => a.id === e.target.value) } })}>
            {gearCatalog.amps.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <select value={tone.cab} onChange={(e) => setTone({ ...tone, cab: e.target.value })}>
            {gearCatalog.cabinets.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <SignalChain pedals={tone.pedals} />

          <div>
            {tone.pedals.map((p, i) => (
              <div key={p.id} className="pedal">
                <b>{p.type}</b>
                <button onClick={() => i > 0 && setTone({ ...tone, pedals: reorder(tone.pedals, i, i - 1) })}>↑</button>
                <button onClick={() => i < tone.pedals.length - 1 && setTone({ ...tone, pedals: reorder(tone.pedals, i, i + 1) })}>↓</button>
              </div>
            ))}
          </div>

          <select onChange={(e) => e.target.value && setTone({ ...tone, pedals: [...tone.pedals, mkPedal(e.target.value)] })}>
            <option value="">Add pedal type</option>
            {gearCatalog.pedalTypes.map((p) => <option key={p}>{p}</option>)}
          </select>

          <div>
            <label>
              Gain
              <input type="range" min="0" max="1" step="0.01" value={tone.ampSettings.gain} onChange={(e) => setTone({ ...tone, ampSettings: { ...tone.ampSettings, gain: Number(e.target.value) } })} />
            </label>
          </div>

          <button onClick={adapt}>Adapt Tone To My Gear</button>
          <button onClick={saveTone}>Save Tone</button>
          <ul>{notes.map((n) => <li key={n}>{n}</li>)}</ul>
        </section>
      )}

      {tab === 'presets' && (
        <section>
          <h2>Presets</h2>
          {presets.map((p) => <button key={p.name} onClick={() => applyPreset(p)}>{p.name}</button>)}
        </section>
      )}

      {tab === 'audio' && (
        <section>
          <h2>Test Audio</h2>
          <p>Current amp: {amp?.name}</p>
          <button onClick={() => playTestTone(tone)}>Test Tone</button>
          <button onClick={() => startMicInput(tone)}>Start Mic Input</button>
          <button onClick={stopAudio}>Stop Audio</button>
          <h3>Load Saved Tone</h3>
          {savedTones.map((s, idx) => <button key={idx} onClick={() => setTone(normalizeTone(s.tone))}>{s.name}</button>)}
        </section>
      )}
    </div>
  )
}
