export default function SignalChain({ pedals }) {
  return (
    <div className="chain">
      <strong>Signal Chain:</strong> Guitar → {pedals.map((p) => p.type).join(' → ')} → Amp → Cab
    </div>
  )
}
