import { useState } from 'react'
import './styles.css'
import { gearCatalog } from './data/gearCatalog'
import { presets } from './data/presets'
import { loadLocal, saveLocal } from './utils/storage'
import { adaptToneToMyGear } from './utils/toneAdapter'
import { playTestRiff, startLiveInput, stopAudio } from './audio/audioEngine'
import GearProfile from './components/GearProfile'
import ToneBuilder from './components/ToneBuilder'
import Presets from './components/Presets'
import TestAudio from './components/TestAudio'

const tabs=['Gear Profile','Tone Builder','Presets','Test Audio']
const defaultAmp=gearCatalog.amps[0]
const defaultTone={name:'New Tone',inputGain:0.5,guitar:gearCatalog.guitars[0].id,amp:defaultAmp.id,cab:gearCatalog.cabinets[0].id,ampSettings:{...defaultAmp.defaultEQ},pedals:[]}

export default function App(){
  const [tab,setTab]=useState('Gear Profile'); const [error,setError]=useState('');
  const [profile,setProfile]=useState(loadLocal('gearProfile',{pickupType:gearCatalog.pickups[0]}));
  const [tone,setTone]=useState(loadLocal('currentTone',defaultTone));
  const [saved,setSaved]=useState(loadLocal('savedTones',[])); const [mode,setMode]=useState('riff'); const [adaptMsg,setAdaptMsg]=useState('')
  const saveProfile=()=>saveLocal('gearProfile',profile)
  const saveTone=()=>{const name=window.prompt('Tone name?','My Tone');if(!name)return;const next=[...saved,{name,tone}];setSaved(next);saveLocal('savedTones',next);saveLocal('currentTone',tone)}
  const loadPreset=(p)=>{const amp=gearCatalog.amps.find(a=>a.id===p.amp)||defaultAmp;setTone({...defaultTone,...p,ampSettings:{...amp.defaultEQ},pedals:(p.pedals||[]).map(pd=>({id:crypto.randomUUID(),name:pd.name,settings:{gain:0.5,level:0.6,mix:0.3,time:0.3,feedback:0.3,rate:0.3,depth:0.3,...pd.settings,enabled:true}}))});setTab('Tone Builder')}
  const adapt=()=>{const {tone:next,changes}=adaptToneToMyGear(tone,profile);setTone(next);setAdaptMsg(changes.join(' '));saveLocal('currentTone',next)}
  const runAudio=async(fn)=>{try{setError('');await fn(tone)}catch(e){setError(e.message)}}
  return <div className='app'><h1>Tone Forge MVP</h1><p>Stable MVP tone builder using text-only gear references.</p><div className='tabs'>{tabs.map(t=><button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t}</button>)}</div>
  {tab==='Gear Profile'&&<GearProfile profile={profile} setProfile={setProfile} onSave={saveProfile} pickups={gearCatalog.pickups}/>} {tab==='Tone Builder'&&<ToneBuilder tone={tone} setTone={setTone} gearCatalog={gearCatalog} onAdapt={adapt} onSave={saveTone} adaptMsg={adaptMsg}/>} {tab==='Presets'&&<Presets presets={presets} onLoad={loadPreset}/>} {tab==='Test Audio'&&<TestAudio mode={mode} setMode={setMode} onPlay={()=>runAudio(playTestRiff)} onLive={()=>runAudio(startLiveInput)} onStop={stopAudio} error={error}/>}<h3>Saved Tones</h3>{saved.map((s,i)=><div key={`${s.name}-${i}`} className='row'><button onClick={()=>setTone(s.tone)}>{s.name}</button><button onClick={()=>{const n=saved.filter((_,x)=>x!==i);setSaved(n);saveLocal('savedTones',n)}}>Delete</button></div>)}
  <footer>Gear names are used for reference only. This app is not affiliated with or endorsed by any gear manufacturer.</footer></div>
}
