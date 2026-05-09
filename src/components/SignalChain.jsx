export default function SignalChain({ pedals }) { return <div className="chain">Input → {pedals.map((p)=>p.name).join(' → ')} → Amp → Cab → Output</div> }
