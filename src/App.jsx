import { useEffect, useMemo, useState } from 'react'
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

const clamp = (n) => Math.min(1, Math.max(0, Number(n)))

const mkPedal = (type) => ({
  id: `${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  type,
  settings: { ...(defaultPedalSettings[type] || { enabled: true }) },
})

const makeDefaultTone = () => ({
  name: 'Current Tone',
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
      ? incoming.pedals.map((p) => {
          const type = p?.type || 'overdrive'
          return { ...mkPedal(type), ...p, type, settings: { ...(defaultPedalSettings[type] || {}), ...(p?.settings || {}) } }
        })
      ? incoming.pedals.map((p) => ({ ...mkPedal(p.type || 'overdrive'), ...p, settings: { ...defaultPedalSettings[p.type], ...p.settings } }))
      : base.pedals,
  }
}

const reorder = (list, from, to) => {
  const copy = [...list]
  const [item] = copy.splice(from, 1)
  copy.splice(to, 0, item)
  return copy
}

const knob = (label, value, onChange) => (
  <label className="knob" key={label}>
    <span>{label}</span>
    <input type="range" min="0" max="1" step="0.01" value={value ?? 0} onChange={(e) => onChange(clamp(e.target.value))} />
    <small>{Number(value ?? 0).toFixed(2)}</small>
  </label>
)

export default function App() {
  const [tab, setTab] = useState('Tone Builder')
  const [profile, setProfile] = useState(() => safeParse('gearProfile', { pickupType: 'single coil' }))
  const [tone, setTone] = useState(() => normalizeTone(safeParse('currentTone', null)))
  const [notes, setNotes] = useState([])
  const [savedTones, setSavedTones] = useState(() => Array.isArray(safeParse('savedTones', [])) ? safeParse('savedTones', []) : [])

  const tabs = ['Gear Profile', 'Tone Builder', 'Presets', 'Test Audio']
  const amp = useMemo(() => gearCatalog.amps.find((a) => a.id === tone.amp) || gearCatalog.amps[0], [tone.amp])

  useEffect(() => {
    localStorage.setItem('currentTone', JSON.stringify(tone))
  }, [tone])
  const tabs = ['Gear Profile', 'Tone Builder', 'Presets', 'Test Audio']
  const amp = useMemo(() => gearCatalog.amps.find((a) => a.id === tone.amp), [tone.amp])

  useEffect(() => {
    localStorage.setItem('currentTone', JSON.stringify(tone))
  }, [tone])

  const saveProfile = () => localStorage.setItem('gearProfile', JSON.stringify(profile))

  const saveTone = () => {
    const next = [...savedTones, { name: profile.favoriteToneName || `Tone ${savedTones.length + 1}`, tone }]
    setSavedTones(next)
    localStorage.setItem('savedTones', JSON.stringify(next))
  }

  const applyPreset = (preset) => {
    const nextAmp = gearCatalog.amps.find((a) => a.id === preset.amp) || gearCatalog.amps[0]
    setTone((current) => ({
      ...current,
      name: preset.name,
      amp: preset.amp,
      cab: preset.cab,
      ampSettings: { ...nextAmp },
      pedals: preset.pedals.map(mkPedal),
    }))
    setTab('Tone Builder')
  }

  const updatePedalSetting = (id, key, value) => {
    setTone((current) => ({
      ...current,
      pedals: current.pedals.map((p) => (p.id === id ? { ...p, settings: { ...p.settings, [key]: value } } : p)),
    }))
  }

  const adapt = () => {
    const { updates, notes: why } = adaptToneToProfile(tone, profile)
    setTone(normalizeTone(updates))
    setNotes(why)
  }

  return (
    <div className="app">
      <p className="tag">Build tones with amps, cabs, and pedal chains. Test with synth guitar tone or mic input.</p>
      <h1>Tone Forge MVP</h1>
      <div className="tabs">
        {tabs.map((t) => (
          <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Gear Profile' && (
        <section>
          <h2>Gear Profile Setup</h2>
          {['guitarType', 'ownedAmp', 'ownedPedals', 'audioInputChoice', 'favoriteToneName'].map((k) => (
            <input key={k} placeholder={k} value={profile[k] || ''} onChange={(e) => setProfile({ ...profile, [k]: e.target.value })} />
          ))}
          <select value={profile.pickupType || ''} onChange={(e) => setProfile({ ...profile, pickupType: e.target.value })}>
            {gearCatalog.pickups.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <button onClick={saveProfile}>Save Profile</button>
        </section>
      )}

      {tab === 'Tone Builder' && (
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
          <div className="pedal-grid">
            {tone.pedals.map((p, i) => (
              <div key={p.id} className="pedal">
                <div className="pedal-head"><b>{p.type}</b><label><input type="checkbox" checked={Boolean(p?.settings?.enabled)} onChange={(e) => updatePedalSetting(p.id, 'enabled', e.target.checked)} /> On</label></div>
                <div className="pedal-head"><b>{p.type}</b><label><input type="checkbox" checked={p.settings.enabled} onChange={(e) => updatePedalSetting(p.id, 'enabled', e.target.checked)} /> On</label></div>
                <div className="row">
                  <button onClick={() => i > 0 && setTone({ ...tone, pedals: reorder(tone.pedals, i, i - 1) })}>↑</button>
                  <button onClick={() => i < tone.pedals.length - 1 && setTone({ ...tone, pedals: reorder(tone.pedals, i, i + 1) })}>↓</button>
                </div>
                <div className="knobs">
                  {Object.entries(p?.settings || {}).filter(([k]) => k !== 'enabled').map(([k, v]) => knob(k, v, (value) => updatePedalSetting(p.id, k, value)))}
                  {Object.entries(p.settings).filter(([k]) => k !== 'enabled').map(([k, v]) => knob(k, v, (value) => updatePedalSetting(p.id, k, value)))}
                </div>
              </div>
            ))}
          </div>

          <select onChange={(e) => e.target.value && setTone({ ...tone, pedals: [...tone.pedals, mkPedal(e.target.value)] })}>
            <option value="">Add pedal type</option>
            {gearCatalog.pedalTypes.map((p) => <option key={p}>{p}</option>)}
          </select>

          <h3>Amp Controls</h3>
          <div className="knobs">
            {['gain', 'bass', 'mids', 'treble'].map((k) => knob(k, tone.ampSettings[k], (value) => setTone({ ...tone, ampSettings: { ...tone.ampSettings, [k]: value } })))}
          </div>

          <button onClick={adapt}>Adapt Tone To My Gear</button>
          <button onClick={saveTone}>Save Tone</button>
          <ul>{notes.map((n) => <li key={n}>{n}</li>)}</ul>
        </section>
      )}

      {tab === 'Presets' && (
        <section>
          <h2>Presets</h2>
          <div className="preset-grid">{presets.map((p) => <button key={p.name} onClick={() => applyPreset(p)}>{p.name}</button>)}</div>
        </section>
      )}

      {tab === 'Test Audio' && (
        <section>
          <h2>Test Audio</h2>
          <p>Current amp: {amp?.name}</p>
          <button onClick={() => playTestTone(tone)}>Test Tone</button>
          <button onClick={() => startMicInput(tone)}>Start Mic Input</button>
          <button onClick={stopAudio}>Stop Audio</button>
          <h3>Load Saved Tone</h3>
          {savedTones.map((s, idx) => <button key={`${s.name}-${idx}`} onClick={() => setTone(normalizeTone(s.tone))}>{s.name}</button>)}
        </section>
      )}
    </div>
  )
}
