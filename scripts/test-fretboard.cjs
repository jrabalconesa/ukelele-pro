const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const constants=source.slice(source.indexOf('const MUSIC='),source.indexOf('const SONGS='));
const stats=source.match(/^function mastery\(id\).*$/m)[0]+'\n'+source.match(/^function pickPlan\(\).*$/m)[0];
const feature=source.slice(source.indexOf('// Original fretboard explorer'),source.indexOf('function chordsPage(){'));
const state={completed:{e2:[{date:'2026-11-20',rating:3}]},sessions:[],favorites:[],name:'Test'};
const sandbox={state,Date,Map,Set,Math,JSON,Number,String,EXERCISES:[],render(){},save(){},notify(){},today:()=> '2026-11-24',stopAudio(){},esc:s=>String(s)};
vm.createContext(sandbox);vm.runInContext(constants+"\nconst chord=id=>CHORDS.find(c=>c.id===id);let exId='fretboard-1';\n"+feature+'\n'+stats+"\nglobalThis.api={CHORDS,BASE_PITCH,FB_SCALES,FB_DRILLS,mastery,pickPlan,fbShapes,fbChordPCs,fbPC,fbAnswer,fbEnsureDrill,fbQuizAction,fbExplorer,fbQuizView,setId:id=>exId=id};",sandbox);
const a=sandbox.api;
for(const c of a.CHORDS){const pcs=a.fbChordPCs(c),shapes=a.fbShapes(c.id);assert(shapes.length>1,c.id);assert.deepEqual(Array.from(shapes[0]),Array.from(c.f));for(const shape of shapes){const found=shape.map((f,s)=>a.fbPC(a.BASE_PITCH[s]+f));assert(pcs.every(p=>found.includes(p)));assert(found.every(p=>pcs.includes(p)));assert(shape.every(f=>f>=0&&f<=15));}}
for(const d of a.FB_DRILLS)for(const target of d.targets)assert(a.BASE_PITCH.some(base=>Array.from({length:d.frets+1},(_,f)=>(base+f)%12).includes(target)));
assert.equal(a.FB_SCALES.major.intervals.join(','),'0,2,4,5,7,9,11');assert.equal(a.FB_SCALES.pentatonic.intervals.join(','),'0,3,5,7,10');
a.fbEnsureDrill();a.fbAnswer(0,1);assert.equal(state.fretboardAttempts.at(-1).correct,false);assert.equal(a.fbEnsureDrill().index,0);a.fbQuizAction('next');assert.equal(state.sessions.length,0);a.fbQuizAction('hint');a.fbQuizAction('hint');assert.equal(a.fbEnsureDrill().hints,1);
for(const target of a.FB_DRILLS[0].targets){let pos;for(let s=0;s<4&&!pos;s++)for(let f=0;f<=5;f++)if((a.BASE_PITCH[s]+f)%12===target){pos=[s,f];break}a.fbAnswer(...pos);a.fbAnswer(...pos);a.fbQuizAction('next');}
assert.equal(state.sessions.length,1);assert.equal(a.mastery('fretboard-1'),83);assert(a.pickPlan().some(e=>e.id==='fretboard-2'));assert(!a.pickPlan().some(e=>e.kind==='fretboard'&&e.level>2));assert.equal(state.sessions[0].firstTry,5);assert.equal(state.sessions[0].errors,1);assert.equal(state.sessions[0].hints,1);assert.equal(state.completed.e2[0].rating,3,'prior progress preserved');a.fbQuizAction('next');assert.equal(state.sessions.length,1);assert.equal(state.fretboardAttempts.length,7);
assert(a.fbExplorer().includes('Escalas'));assert(a.fbQuizView().includes('Ronda completada y guardada'));
console.log('PASS: 16 chords and all alternative positions, scales, five solvable drills, wrong answers, hints, retries, one completion record, and preservation of prior progress.');
