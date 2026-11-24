const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const app=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
const sources=[],fetched=[];let fail=false;
const ctx={state:'running',currentTime:10,destination:{},createGain(){return {gain:{setValueAtTime(){},linearRampToValueAtTime(){}},connect(){},disconnect(){}}},createBufferSource(){const s={playbackRate:{},connect(){},disconnect(){},start(t){this.started=t},stop(t){this.stopped=t}};sources.push(s);return s},async decodeAudioData(){return {duration:3}}};
const sandbox={getAudio:()=>ctx,URL,document:{baseURI:'https://example.test/ukelele-pro/'},fetch:async url=>{fetched.push(String(url));return {ok:!fail,arrayBuffer:async()=>new ArrayBuffer(8)}},Math,Set,Map,Promise,Error,metronomeTimer:null,playingTimers:[],clearTimeout,clearInterval,metronomeOn:false,activityBeat:0,clearAudioTimers:()=>{}};
vm.createContext(sandbox);
const engine=app.slice(app.indexOf('// Recorded ukulele samples'),app.indexOf('function playChord('));
const stop=app.match(/function stopAudio\(\)\{[^\n]+/)[0];
vm.runInContext(engine+'\n'+stop+'\nglobalThis.api={prepareUkulele,tone,clickBeat,mutedStroke,stopAudio,ukuleleBuffers,UKULELE_SAMPLES};',sandbox);
(async()=>{
 const a=sandbox.api;
 await a.prepareUkulele();assert.equal(a.ukuleleBuffers.size,15);assert.equal(fetched.length,15);
 assert(fetched.every(x=>x.startsWith('https://example.test/ukelele-pro/assets/audio/ukulele/')));
 await a.prepareUkulele();assert.equal(fetched.length,15,'decoded samples must be reused');
 for(let midi=58;midi<=86;midi++){
  a.tone(midi,12,.6,.16);const s=sources.at(-1),r=a.UKULELE_SAMPLES.find(s=>midi>=s.low&&midi<=s.high);
  assert(Math.abs(s.playbackRate.value-2**((midi-r.key+r.tune/100)/12))<1e-12);assert.equal(s.started,12);assert.equal(s.stopped,12.6);
 }
 a.clickBeat(true);a.mutedStroke();assert.equal(sources.length,31);
 a.stopAudio();assert(sources.every(s=>s.stopped===undefined),'stop must cancel all scheduled/active voices');
 a.ukuleleBuffers.clear();vm.runInContext('ukuleleLoading=null',sandbox);fail=true;
 await assert.rejects(a.prepareUkulele());fail=false;await a.prepareUkulele();assert.equal(a.ukuleleBuffers.size,15,'failed loads must allow retry');
 assert(!app.includes('createOscillator('),'no synthetic oscillator remains');
 console.log('PASS: 15 samples, relative paths, decode reuse, 29 pitches and SFZ cent corrections, percussion, voice cancellation, load failure and retry.');
})().catch(e=>{console.error(e);process.exitCode=1});
