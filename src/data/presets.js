const p=(name,settings)=>({name,...settings})
export const presets=[
p('Metallica Rhythm',{guitar:'esp-ltd-ec1000',amp:'mesa-dual-rectifier',cab:'marshall-4x12-v30',pedals:[{name:'Ibanez Tube Screamer',settings:{gain:0.25,level:0.75}},{name:'Boss NS-2 Noise Suppressor',settings:{threshold:0.5}}]}),
p('Metallica Clean',{guitar:'fender-stratocaster',amp:'roland-jc120',cab:'fender-2x12-open-back',pedals:[{name:'Boss CE-2 Chorus',settings:{depth:0.5,rate:0.35,mix:0.4}}]}),
p('Van Halen Brown Sound',{guitar:'gibson-les-paul',amp:'marshall-plexi',cab:'marshall-4x12-greenback',pedals:[{name:'MXR 10-Band EQ',settings:{mid:0.6}},{name:'Boss DD-7 Delay',settings:{time:0.28,feedback:0.2,mix:0.2}}]}),
p('Nirvana Grunge',{guitar:'fender-mustang',amp:'marshall-dsl',cab:'marshall-4x12-v30',pedals:[{name:'Boss DS-1 Distortion',settings:{gain:0.7}}]}),
p('Green Day Punk',{guitar:'gibson-les-paul',amp:'marshall-jcm800',cab:'marshall-4x12-greenback',pedals:[{name:'Boss SD-1 Super OverDrive',settings:{gain:0.42}}]}),
p('AC/DC Classic Rock',{guitar:'gibson-sg',amp:'marshall-plexi',cab:'marshall-4x12-greenback',pedals:[]}),
p('Guns N’ Roses Lead',{guitar:'gibson-les-paul',amp:'marshall-jcm800',cab:'marshall-4x12-v30',pedals:[{name:'Boss DD-7 Delay',settings:{time:0.32,mix:0.24}}]}),
p('John Mayer Clean Blues',{guitar:'fender-stratocaster',amp:'fender-twin-reverb',cab:'fender-2x12-open-back',pedals:[{name:'Ibanez Tube Screamer',settings:{gain:0.22}},{name:'Strymon BigSky',settings:{mix:0.25}}]}),
p('Pink Floyd Ambient Lead',{guitar:'fender-stratocaster',amp:'hiwatt-like',cab:'vox-2x12',pedals:[{name:'Boss DD-7 Delay',settings:{time:0.65,feedback:0.55,mix:0.4}},{name:'Strymon BigSky',settings:{mix:0.45}}]}),
p('Worship Clean',{guitar:'taylor-814ce',amp:'fender-deluxe-reverb',cab:'fender-2x12-open-back',pedals:[{name:'Strymon Timeline',settings:{time:0.55,feedback:0.45,mix:0.35}},{name:'Strymon BigSky',settings:{mix:0.4}}]}),
p('Modern Metal',{guitar:'schecter-hellraiser',amp:'evh-5150iii',cab:'4x12-metal-cab',pedals:[{name:'Boss NS-2 Noise Suppressor',settings:{threshold:0.6}},{name:'Ibanez Tube Screamer',settings:{gain:0.2,level:0.8}}]}),
p('80s Metal',{guitar:'ibanez-jem',amp:'soldano-slo100',cab:'marshall-4x12-v30',pedals:[{name:'Boss DD-7 Delay',settings:{time:0.3,mix:0.2}},{name:'Boss CE-2 Chorus',settings:{mix:0.28}}]}),
p('Doom Fuzz',{guitar:'gibson-sg',amp:'orange-rockerverb',cab:'orange-ppc412',pedals:[{name:'Electro-Harmonix Big Muff',settings:{gain:0.85}}]}),
p('Funk Clean',{guitar:'fender-stratocaster',amp:'fender-twin-reverb',cab:'fender-1x12-open-back',pedals:[{name:'MXR Dyna Comp',settings:{level:0.6}},{name:'Dunlop Cry Baby Wah',settings:{depth:0.5}}]}),
]
