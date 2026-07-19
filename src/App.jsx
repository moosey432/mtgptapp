import { useMemo, useState } from 'react'
import './styles.css'

const maxSoul = 100
const maxMonster = 120

const acts = [
  { label: 'Check', effect: 'The training dummy looks wobbly. ATK 4 DEF 2. It seems open to kindness.', mercy: 10 },
  { label: 'Compliment', effect: 'You tell the dummy its stitches are perfectly spooky.', mercy: 22 },
  { label: 'Joke', effect: 'You share a skeleton pun. The dummy rattles with laughter.', mercy: 18 },
]

const items = [
  { label: 'Nice Cream', heal: 28 },
  { label: 'Butterscotch Pie', heal: 45 },
  { label: 'Bandage', heal: 18 },
]

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function App() {
  const [monsterHp, setMonsterHp] = useState(maxMonster)
  const [soulHp, setSoulHp] = useState(maxSoul)
  const [mercy, setMercy] = useState(0)
  const [inventory, setInventory] = useState(items)
  const [mode, setMode] = useState('intro')
  const [defending, setDefending] = useState(false)
  const [message, setMessage] = useState('* A shy training dummy blocks the way.')
  const [battleLog, setBattleLog] = useState(['The encounter begins.'])

  const battleOver = monsterHp <= 0 || soulHp <= 0 || mode === 'spared'
  const mercyReady = mercy >= 100

  const monsterMood = useMemo(() => {
    if (mode === 'spared') return 'spared'
    if (monsterHp <= 0) return 'defeated'
    if (mercy >= 75) return 'hopeful'
    if (mercy >= 40) return 'curious'
    return 'nervous'
  }, [mercy, mode, monsterHp])

  const addLog = (entry) => setBattleLog((prev) => [entry, ...prev].slice(0, 6))

  const enemyTurn = (setupMessage, isDefending = defending) => {
    if (battleOver) return

    const incomingDamage = Math.floor(Math.random() * 12) + 8
    const reducedDamage = isDefending ? Math.floor(incomingDamage * 0.55) : incomingDamage

    setDefending(false)
    setSoulHp((hp) => {
      const nextHp = clamp(hp - reducedDamage, 0, maxSoul)
      if (nextHp <= 0) {
        setMode('lost')
        setMessage('* Your SOUL flickers out... Tap RESET to try again.')
        addLog('You were defeated by the bullet pattern.')
      } else {
        setMessage(`${setupMessage} Dodge phase! You take ${reducedDamage} damage.`)
        addLog(`Dummy attacks for ${reducedDamage} damage.`)
      }
      return nextHp
    })
  }

  const handleFight = () => {
    if (battleOver) return
    const damage = Math.floor(Math.random() * 18) + 14
    setMonsterHp((hp) => {
      const nextHp = clamp(hp - damage, 0, maxMonster)
      if (nextHp <= 0) {
        setMode('won')
        setMessage('* You won! The dummy topples over in a dramatic puff of stuffing.')
        addLog(`You dealt ${damage} damage and won.`)
      } else {
        setMessage(`* You swing carefully and deal ${damage} damage.`)
        addLog(`Fight: ${damage} damage.`)
        setTimeout(() => enemyTurn('* The dummy wiggles angrily.'), 250)
      }
      return nextHp
    })
  }

  const handleAct = (act) => {
    if (battleOver) return
    setMercy((value) => clamp(value + act.mercy, 0, 100))
    setMessage(`* ${act.effect}`)
    addLog(`${act.label}: mercy +${act.mercy}.`)
    setTimeout(() => enemyTurn('* The dummy sends soft cotton bullets your way.'), 250)
  }

  const handleItem = (item) => {
    if (battleOver) return
    setSoulHp((hp) => clamp(hp + item.heal, 0, maxSoul))
    setInventory((current) => current.filter((inventoryItem) => inventoryItem.label !== item.label))
    setMessage(`* You used ${item.label}. You recovered ${item.heal} HP.`)
    addLog(`${item.label}: healed ${item.heal} HP.`)
    setTimeout(() => enemyTurn('* The dummy attacks while you snack.'), 250)
  }

  const handleMercy = () => {
    if (battleOver) return
    if (mercyReady) {
      setMode('spared')
      setMessage('* You spared the dummy. It waves goodbye with a tiny felt hand.')
      addLog('Mercy accepted. Encounter ended peacefully.')
      return
    }

    setDefending(true)
    setMessage('* You chose MERCY, but the dummy is not ready. Your guard rises for the next attack.')
    addLog('Mercy failed. Guard up for reduced damage.')
    setTimeout(() => enemyTurn('* The dummy hesitates before attacking.', true), 250)
  }

  const resetBattle = () => {
    setMonsterHp(maxMonster)
    setSoulHp(maxSoul)
    setMercy(0)
    setInventory(items)
    setMode('intro')
    setDefending(false)
    setMessage('* A shy training dummy blocks the way.')
    setBattleLog(['The encounter begins.'])
  }

  return (
    <main className="game-shell">
      <section className="battle-card" aria-label="Monster battle">
        <div className={`monster ${monsterMood}`} aria-hidden="true">
          <div className="monster-face">
            <span className="eye" />
            <span className="eye" />
            <span className="mouth" />
          </div>
        </div>

        <div className="monster-info">
          <h1>Pocket Soul Battle</h1>
          <p>Training Dummy</p>
          <div className="meter" aria-label={`Monster health ${monsterHp} out of ${maxMonster}`}>
            <span style={{ width: `${(monsterHp / maxMonster) * 100}%` }} />
          </div>
        </div>

        <div className="dialogue-box" role="status">{message}</div>

        <div className="soul-arena" aria-label="Dodge arena">
          <button className="move-pad up" aria-label="Move soul up">▲</button>
          <button className="move-pad left" aria-label="Move soul left">◀</button>
          <div className="soul">♥</div>
          <button className="move-pad right" aria-label="Move soul right">▶</button>
          <button className="move-pad down" aria-label="Move soul down">▼</button>
          <span className="bullet bullet-one" />
          <span className="bullet bullet-two" />
          <span className="bullet bullet-three" />
        </div>

        <div className="player-stats">
          <strong>SOUL</strong>
          <div className="meter hp" aria-label={`Soul health ${soulHp} out of ${maxSoul}`}>
            <span style={{ width: `${(soulHp / maxSoul) * 100}%` }} />
          </div>
          <span>{soulHp}/{maxSoul} HP</span>
          <span>MERCY {mercy}%</span>
        </div>

        <nav className="battle-actions" aria-label="Battle commands">
          <button onClick={handleFight} disabled={battleOver}>FIGHT</button>
          <div className="action-menu">
            <button disabled={battleOver}>ACT</button>
            <div className="submenu">
              {acts.map((act) => <button key={act.label} onClick={() => handleAct(act)}>{act.label}</button>)}
            </div>
          </div>
          <div className="action-menu">
            <button disabled={battleOver || inventory.length === 0}>ITEM</button>
            <div className="submenu">
              {inventory.length > 0
                ? inventory.map((item) => <button key={item.label} onClick={() => handleItem(item)}>{item.label}</button>)
                : <span>No items left</span>}
            </div>
          </div>
          <button className={mercyReady ? 'mercy-ready' : ''} onClick={handleMercy} disabled={battleOver}>MERCY</button>
        </nav>

        <button className="reset-button" onClick={resetBattle}>RESET</button>
      </section>

      <aside className="log-panel">
        <h2>Battle Log</h2>
        <ul>
          {battleLog.map((entry, index) => <li key={`${entry}-${index}`}>{entry}</li>)}
        </ul>
      </aside>
    </main>
  )
}
