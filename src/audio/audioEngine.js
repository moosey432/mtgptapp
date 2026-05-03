let ctx; let active=[]; let mic;
const ensure=async()=>{if(!ctx) ctx=new window.AudioContext(); if(ctx.state==='suspended') await ctx.resume(); return ctx}
const clip=(v)=>Math.max(0,Math.min(1,Number(v)||0))
const distCurve=(amt)=>{const n=2048,c=new Float32Array(n);for(let i=0;i<n;i++){const x=i*2/n-1;c[i]=Math.tanh(x*(1+amt*8))}return c}

function buildChain(c,input,tone){
  const inputGain=c.createGain(); inputGain.gain.value=0.5+clip(tone.inputGain||0.5); input.connect(inputGain); let node=inputGain;
  const low=c.createBiquadFilter(); low.type='lowshelf'; low.frequency.value=180; low.gain.value=(clip(tone.ampSettings?.bass)-0.5)*18; node.connect(low); node=low;
  const mid=c.createBiquadFilter(); mid.type='peaking'; mid.frequency.value=800; mid.Q.value=0.8; mid.gain.value=(clip(tone.ampSettings?.mid)-0.5)*18; node.connect(mid); node=mid;
  const hi=c.createBiquadFilter(); hi.type='highshelf'; hi.frequency.value=2200; hi.gain.value=(clip(tone.ampSettings?.treble)-0.5)*18; node.connect(hi); node=hi;
  const drive=c.createWaveShaper(); drive.curve=distCurve(clip(tone.ampSettings?.gain)); drive.oversample='2x'; node.connect(drive); node=drive;
  const comp=c.createDynamicsCompressor(); comp.threshold.value=-30; comp.ratio.value=3; node.connect(comp); node=comp;
  const delay=c.createDelay(1.2); delay.delayTime.value=0.25; const fb=c.createGain(); fb.gain.value=0.25; delay.connect(fb); fb.connect(delay);
  const wet=c.createGain();wet.gain.value=0.2; const dry=c.createGain();dry.gain.value=0.85; node.connect(dry); node.connect(delay); delay.connect(wet);
  const mix=c.createGain(); dry.connect(mix); wet.connect(mix); node=mix;
  const out=c.createGain(); out.gain.value=clip(tone.ampSettings?.volume||0.7); node.connect(out); out.connect(c.destination);
  active.push(inputGain,low,mid,hi,drive,comp,delay,fb,wet,dry,mix,out);
}

export async function playTestRiff(tone){
  try{ stopAudio(); const c=await ensure();
    const bus=c.createGain(); buildChain(c,bus,tone);
    const notes=[110,146.83,164.81,196,220,196];
    notes.forEach((f,i)=>{const t=c.currentTime+i*0.25;const o=c.createOscillator();const g=c.createGain();o.type='sawtooth';o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.28,t+0.01);g.gain.exponentialRampToValueAtTime(0.0001,t+0.22);o.connect(g);g.connect(bus);o.start(t);o.stop(t+0.23);active.push(o,g)})
  }catch(e){throw new Error(`Audio engine failed: ${e.message}`)}
}
export async function startLiveInput(tone){try{stopAudio();const c=await ensure();mic=await navigator.mediaDevices.getUserMedia({audio:true});const src=c.createMediaStreamSource(mic);buildChain(c,src,tone);active.push(src)}catch(e){throw new Error(`Live input failed: ${e.message}`)}}
export function stopAudio(){active.forEach(n=>{try{n.disconnect()}catch{}});active=[];if(mic){mic.getTracks().forEach(t=>t.stop());mic=null}}
