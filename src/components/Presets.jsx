export default function Presets({ presets,onLoad }){return <div className='preset-grid'>{presets.map(p=><button key={p.name} onClick={()=>onLoad(p)}>{p.name}</button>)}</div>}
