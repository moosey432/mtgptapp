export const adaptToneToProfile = (tone, profile) => {
  const updates = structuredClone(tone)
  const notes = []
  const pickup = profile.pickupType?.toLowerCase()
  const amp = profile.ownedAmp?.toLowerCase() ?? ''

  if (pickup === 'humbucker') {
    updates.ampSettings.gain = Math.max(0, updates.ampSettings.gain - 0.08)
    updates.ampSettings.treble = Math.min(1, updates.ampSettings.treble + 0.08)
    notes.push('Humbuckers detected: reduced gain and brightened treble.')
  }
  if (pickup === 'single coil') {
    updates.ampSettings.gain = Math.min(1, updates.ampSettings.gain + 0.08)
    updates.ampSettings.treble = Math.max(0, updates.ampSettings.treble - 0.06)
    notes.push('Single coils detected: boosted gain/compression feel and softened top end.')
  }
  if (pickup === 'active') {
    updates.inputGain = Math.max(0.2, updates.inputGain - 0.15)
    notes.push('Active pickups detected: lowered input gain to avoid clipping.')
  }
  if (amp.includes('small') || amp.includes('practice')) {
    updates.ampSettings.mids = Math.min(1, updates.ampSettings.mids + 0.1)
    updates.ampSettings.bass = Math.max(0, updates.ampSettings.bass - 0.1)
    notes.push('Practice amp profile: increased mids and tightened bass.')
  }

  const ownedPedals = (profile.ownedPedals || '').toLowerCase()
  if (!ownedPedals.includes('delay') && !updates.pedals.some((p) => p.type === 'delay')) {
    notes.push('No delay pedal in profile: consider enabling app delay.')
  }
  if (!ownedPedals.includes('reverb') && !updates.pedals.some((p) => p.type === 'reverb')) {
    notes.push('No reverb pedal in profile: consider enabling app reverb.')
  }

  return { updates, notes }
}
