import { useMemo, useState } from 'react'
import './styles.css'

const omnitrixSystems = {
  og: {
    name: 'OG Omnitrix',
    color: '#57ff71',
    transformSeconds: 18,
    rechargeSeconds: 10,
    randomMisfireChance: 0.2,
    aliens: [
      { name: 'Heatblast', role: 'Pyro Blaster' },
      { name: 'Four Arms', role: 'Heavy Brawler' },
      { name: 'XLR8', role: 'Speed Runner' },
      { name: 'Diamondhead', role: 'Crystal Tank' },
      { name: 'Wildmutt', role: 'Tracker' },
    ],
  },
  af: {
    name: 'Alien Force Omnitrix',
    color: '#43e8ff',
    transformSeconds: 25,
    rechargeSeconds: 7,
    randomMisfireChance: 0.08,
    aliens: [
      { name: 'Swampfire', role: 'Regenerator' },
      { name: 'Humungousaur', role: 'Titan Bruiser' },
      { name: 'Jetray', role: 'Aerial Striker' },
      { name: 'Big Chill', role: 'Stealth Freezer' },
      { name: 'Chromastone', role: 'Energy Redirector' },
    ],
  },
  ultimatrix: {
    name: 'Ultimatrix',
    color: '#ff5252',
    transformSeconds: 30,
    rechargeSeconds: 6,
    randomMisfireChance: 0.12,
    aliens: [
      { name: 'Ultimate Humungousaur', role: 'Cannon Beast' },
      { name: 'Ultimate Echo Echo', role: 'Sonic Commander' },
      { name: 'Ultimate Spidermonkey', role: 'Acrobatic Hunter' },
      { name: 'Ultimate Big Chill', role: 'Absolute Freeze' },
      { name: 'Ultimate Swampfire', role: 'Napalm Flora' },
    ],
  },
}

export default function App() {
  const [systemKey, setSystemKey] = useState('og')
  const [selectedAlien, setSelectedAlien] = useState(0)
  const [state, setState] = useState('ready')
  const [timeLeft, setTimeLeft] = useState(0)
  const [log, setLog] = useState(['Omnitrix online. Choose a form and transform.'])

  const system = useMemo(() => omnitrixSystems[systemKey], [systemKey])
  const currentAlien = system.aliens[selectedAlien]

  const addLog = (message) => setLog((prev) => [message, ...prev].slice(0, 8))

  const tick = (seconds, onEnd) => {
    setTimeLeft(seconds)
    let remaining = seconds
    const timer = setInterval(() => {
      remaining -= 1
      setTimeLeft(remaining)
      if (remaining <= 0) {
        clearInterval(timer)
        onEnd()
      }
    }, 1000)
  }

  const transform = () => {
    if (state !== 'ready') return

    const misfire = Math.random() < system.randomMisfireChance
    const finalAlien = misfire
      ? system.aliens[Math.floor(Math.random() * system.aliens.length)]
      : currentAlien

    setState('active')
    addLog(`${system.name}: transformed into ${finalAlien.name}${misfire ? ' (misfire!)' : ''}.`)

    tick(system.transformSeconds, () => {
      setState('recharging')
      addLog(`${finalAlien.name} timed out. Omnitrix recharging...`)

      tick(system.rechargeSeconds, () => {
        setState('ready')
        setTimeLeft(0)
        addLog('Recharge complete. Ready for the next transformation.')
      })
    })
  }

  return (
    <div className="app">
      <h1>Ben 10 Omnitrix Simulator</h1>
      <p className="subtitle">Play with the OG Omnitrix, Alien Force Omnitrix, and Ultimatrix.</p>

      <div className="panel row">
        <label>
          Device
          <select value={systemKey} onChange={(e) => { setSystemKey(e.target.value); setSelectedAlien(0); setState('ready'); setTimeLeft(0) }}>
            <option value="og">OG Omnitrix</option>
            <option value="af">Alien Force Omnitrix</option>
            <option value="ultimatrix">Ultimatrix</option>
          </select>
        </label>

        <label>
          Alien Form
          <select value={selectedAlien} onChange={(e) => setSelectedAlien(Number(e.target.value))} disabled={state !== 'ready'}>
            {system.aliens.map((alien, idx) => (
              <option key={alien.name} value={idx}>{alien.name}</option>
            ))}
          </select>
        </label>

        <button className="transform-btn" style={{ borderColor: system.color }} onClick={transform} disabled={state !== 'ready'}>
          Transform
        </button>
      </div>

      <div className="panel">
        <h2 style={{ color: system.color }}>{system.name}</h2>
        <p><strong>Selected:</strong> {currentAlien.name} — {currentAlien.role}</p>
        <p><strong>Status:</strong> {state.toUpperCase()} {state !== 'ready' ? `(${timeLeft}s)` : ''}</p>
        <p>Transform Duration: {system.transformSeconds}s | Recharge: {system.rechargeSeconds}s</p>
      </div>

      <div className="panel">
        <h3>Battle Log</h3>
        <ul>
          {log.map((entry, idx) => <li key={`${entry}-${idx}`}>{entry}</li>)}
        </ul>
      </div>
    </div>
  )
}
