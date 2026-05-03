export function adaptToneToMyGear(tone, profile) {
  const next = structuredClone(tone); const changes=[]; const p=(profile.pickupType||'').toLowerCase(); const cab=(profile.cabSize||'').toLowerCase(); const pedals=(profile.ownedPedals||'').toLowerCase();
  if(p.includes('humbucker')){next.ampSettings.gain=Math.max(0,next.ampSettings.gain-0.08);next.ampSettings.treble=Math.min(1,next.ampSettings.treble+0.06);next.ampSettings.presence=Math.min(1,next.ampSettings.presence+0.05);next.ampSettings.bass=Math.max(0,next.ampSettings.bass-0.05);changes.push('Humbuckers: reduced gain, raised treble/presence, tightened bass.')}
  if(p.includes('single')){next.ampSettings.gain=Math.min(1,next.ampSettings.gain+0.08);next.ampSettings.treble=Math.max(0,next.ampSettings.treble-0.05);next.ampSettings.mid=Math.min(1,next.ampSettings.mid+0.08);changes.push('Single coils: added gain/mids and softened top end.')}
  if(p.includes('p90')){changes.push('P90: added light gate guidance, smoothed highs, boosted mids.');next.ampSettings.treble=Math.max(0,next.ampSettings.treble-0.05);next.ampSettings.mid=Math.min(1,next.ampSettings.mid+0.08)}
  if(p.includes('active')){next.inputGain=Math.max(0.2,next.inputGain-0.1);next.ampSettings.gain=Math.max(0,next.ampSettings.gain-0.07);next.ampSettings.bass=Math.max(0,next.ampSettings.bass-0.06);changes.push('Active pickups: lowered input/drive and tightened bass.')}
  if(p.includes('acoustic')){next.ampSettings.gain=0.18;changes.push('Acoustic pickup: clean gain with extra compression/reverb suggestion.')}
  if(cab.includes('1x12 practice')||cab.includes('practice')){next.ampSettings.bass=Math.max(0,next.ampSettings.bass-0.08);next.ampSettings.mid=Math.min(1,next.ampSettings.mid+0.1);changes.push('Practice amp/cab: reduced bass, raised mids, suggested lower gain.')}
  if(!pedals.includes('delay')) changes.push('No owned delay listed: use app delay for space.');
  if(!pedals.includes('reverb')) changes.push('No owned reverb listed: use app reverb for ambience.');
  return {tone:next, changes}
}
