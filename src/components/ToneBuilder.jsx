import GearCard from './GearCard'
import KnobSlider from './KnobSlider'
import SignalChain from './SignalChain'

export default function ToneBuilder(props){const {tone,setTone,gearCatalog,onAdapt,onSave,adaptMsg}=props; const amp=gearCatalog.amps.find(a=>a.id===tone.amp)||gearCatalog.amps[0];
const addPedal=(name)=>name&&setTone({...tone,pedals:[...tone.pedals,{id:crypto.randomUUID(),name,settings:{gain:0.5,level:0.6,mix:0.3,time:0.3,feedback:0.3,rate:0.3,depth:0.3,enabled:true}}]})
return <div><SignalChain pedals={tone.pedals}/><div className='grid'>
<select value={tone.guitar} onChange={e=>setTone({...tone,guitar:e.target.value})}>{gearCatalog.guitars.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select>
<select value={tone.amp} onChange={e=>{const a=gearCatalog.amps.find(x=>x.id===e.target.value);setTone({...tone,amp:e.target.value,ampSettings:{...a.defaultEQ}})}}>{gearCatalog.amps.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</select>
<select value={tone.cab} onChange={e=>setTone({...tone,cab:e.target.value})}>{gearCatalog.cabinets.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
</div>
<GearCard title='Amp Settings'>{Object.entries(tone.ampSettings).map(([k,v])=><KnobSlider key={k} label={k} value={v} onChange={val=>setTone({...tone,ampSettings:{...tone.ampSettings,[k]:val}})}/>)}</GearCard>
<GearCard title='Pedals'><select defaultValue='' onChange={(e)=>{addPedal(e.target.value);e.target.value=''}}><option value=''>Add pedal</option>{gearCatalog.pedals.map(p=><option key={p}>{p}</option>)}</select>{tone.pedals.map((p,i)=><div key={p.id} className='pedal'><b>{p.name}</b><div><button onClick={()=>setTone({...tone,pedals:tone.pedals.filter(x=>x.id!==p.id)})}>Remove</button><button disabled={i===0} onClick={()=>{const x=[...tone.pedals];[x[i-1],x[i]]=[x[i],x[i-1]];setTone({...tone,pedals:x})}}>↑</button><button disabled={i===tone.pedals.length-1} onClick={()=>{const x=[...tone.pedals];[x[i+1],x[i]]=[x[i],x[i+1]];setTone({...tone,pedals:x})}}>↓</button></div></div>)}</GearCard>
<div className='row'><button onClick={onAdapt}>Adapt Tone To My Gear</button><button onClick={onSave}>Save Tone</button></div>{adaptMsg&&<div className='notice'>{adaptMsg}</div>}
<p>Selected amp: {amp.name}</p></div>}
