var b=Object.defineProperty;var R=(i,e,t)=>e in i?b(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var d=(i,e,t)=>R(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();let M=null;function N(){return M||(M=new AudioContext),M}function $(){const i=N(),e=i.createOscillator(),t=i.createGain();e.connect(t),t.connect(i.destination),e.type="square",e.frequency.setValueAtTime(150,i.currentTime),t.gain.setValueAtTime(.1,i.currentTime),t.gain.exponentialRampToValueAtTime(.01,i.currentTime+.1),e.start(),e.stop(i.currentTime+.1)}class w{constructor(e,t,s,r,n,a){this.x=e,this.y=t,this.hp=s,this.maxHp=r,this.atk=n,this.def=a}isAlive(){return this.hp>0}attack(e){const t=Math.max(1,this.atk-e.def);return e.hp=Math.max(0,e.hp-t),$(),t}}class k extends w{constructor(){super(1,1,100,100,15,5);d(this,"exp",0);d(this,"level",1);d(this,"gold",0);d(this,"expToNextLevel",100);d(this,"keys",new Set)}gainExp(t){return this.exp+=t,this.exp>=this.expToNextLevel?(this.levelUp(),!0):!1}gainGold(t){this.gold+=t}hasKey(t){return this.keys.has(t)}addKey(t){this.keys.add(t)}levelUp(){this.level++,this.exp-=this.expToNextLevel,this.expToNextLevel=Math.floor(this.expToNextLevel*1.5),this.maxHp+=20,this.hp=this.maxHp,this.atk+=5,this.def+=3}}function O(i,e){const t=Array(e).fill(0).map(()=>Array(i).fill(1));function s(r,n){t[n][r]=0;const a=[[0,2],[2,0],[0,-2],[-2,0]];a.sort(()=>Math.random()-.5);for(const[o,l]of a){const c=r+o,h=n+l;c>0&&c<i-1&&h>0&&h<e-1&&t[h][c]===1&&(t[n+l/2][r+o/2]=0,s(c,h))}}return s(1,1),t}const D={goblin:{hp:30,atk:8,def:3,expReward:25,goldReward:10,sprite:`
      ....GGGG....
      ...GGGGGG...
      ...RWRWRW...
      ...GGGGGG...
      ....RRRR....
      ...GGGGGG...
      ..GGGGGGGG..
      ...GG..GG...
      ...GG..GG...
    `.trim().split(`
`).map(i=>i.trim())},slime:{hp:25,atk:6,def:2,expReward:15,goldReward:5,sprite:`
      ....LLLL....
      ...LLLLLL...
      ..LLWLLWLL..
      ..LLLLLLLL..
      ..LLLLLLLL..
      ...LLLLLL...
    `.trim().split(`
`).map(i=>i.trim())},skeleton:{hp:35,atk:10,def:1,expReward:35,goldReward:15,sprite:`
      ....SSSS....
      ...SSSSSS...
      ...BWBWBW...
      ...SSSSSS...
      ....SSSS....
      ...SSSSSS...
      ..SSSSSSSS..
      ...SS..SS...
      ...SS..SS...
    `.trim().split(`
`).map(i=>i.trim())},bat:{hp:20,atk:7,def:1,expReward:20,goldReward:8,sprite:`
      PP.......PP.
      .PPPP..PPPP.
      ..PPPPPPPP..
      ...PRRRPP...
      ....PPPP....
    `.trim().split(`
`).map(i=>i.trim())},orc:{hp:45,atk:12,def:4,expReward:50,goldReward:25,sprite:`
      ....OOOO....
      ...OOOOOO...
      ...BWBWBW...
      ...OOOOOO...
      ....RRRR....
      ...OOOOOO...
      ..OOOOOOOO..
      ..OO....OO..
      .OOO....OOO.
    `.trim().split(`
`).map(i=>i.trim())},spider:{hp:22,atk:9,def:2,expReward:30,goldReward:12,sprite:`
      N..N..N..N..
      .NNNNNNNN...
      ..NRWWRN....
      .NNNNNNNN...
      N..N..N..N..
    `.trim().split(`
`).map(i=>i.trim())},ghost:{hp:28,atk:11,def:0,expReward:40,goldReward:20,sprite:`
      ....DDDD....
      ...DDDDDD...
      ...RWRWRW...
      ...DDDDDD...
      ...DDDDDD...
      ..DDDDDDDD..
      .DDDDDDDDDD.
      .DD.DD.DD.D.
    `.trim().split(`
`).map(i=>i.trim())},rat:{hp:18,atk:6,def:1,expReward:10,goldReward:3,sprite:`
      .NN........
      NNNN.......
      NRWRN......
      .NNNNNN....
      ..NNNNNN...
      ...NNNNNN..
      ....NN..NN.
    `.trim().split(`
`).map(i=>i.trim())}};let G=0;class P extends w{constructor(t,s){const r=Object.keys(D),n=r[Math.floor(Math.random()*r.length)],a=D[n];super(t,s,a.hp,a.hp,a.atk,a.def);d(this,"type");d(this,"sprite");d(this,"id");d(this,"expReward");d(this,"goldReward");this.type=n,this.sprite=a.sprite,this.id=G++,this.expReward=a.expReward,this.goldReward=a.goldReward}}const y=15,v=15,S=200,A=300;function Y(i,e,t){const s=[];for(let n=0;n<5;n++){let a,o;do a=Math.floor(Math.random()*(y-2))+1,o=Math.floor(Math.random()*(v-2))+1;while(i[o][a]===1||a===e&&o===t||s.some(l=>l.x===a&&l.y===o));s.push(new P(a,o))}return s}const I={sword:`
    ....SS....
    ....SS....
    ....SS....
    ....SS....
    ....BB....
    ...BBBB...
    ....BB....
  `.trim().split(`
`).map(i=>i.trim()),shield:`
    ..BBBBBB..
    .BBBBBBBB.
    BBBBBBBBBB
    .BBBBBBBB.
    ..BBBBBB..
    ...BBBB...
    ....BB....
  `.trim().split(`
`).map(i=>i.trim())};function W(i,e,t,s){const r=[],n=["sword","shield"];for(const a of n){let o,l;do o=Math.floor(Math.random()*(y-2))+1,l=Math.floor(Math.random()*(v-2))+1;while(i[l][o]===1||o===e&&l===t||s.some(c=>c.x===o&&c.y===l)||r.some(c=>c.x===o&&c.y===l));r.push({type:a,x:o,y:l,bonus:a==="sword"?5:3,sprite:I[a]})}return r}class U{constructor(e,t,s={hp:{cost:20,amount:50,used:!1},atk:{cost:20,amount:10,used:!1},def:{cost:20,amount:8,used:!1}}){this.x=e,this.y=t,this.upgrades=s}getAvailableUpgrades(){return Object.entries(this.upgrades).filter(([e,t])=>!t.used).map(([e,t])=>({stat:e,cost:t.cost,amount:t.amount}))}purchase(e){if(!this.upgrades[e]||this.upgrades[e].used)return null;const t=this.upgrades[e];return this.upgrades[e].used=!0,t}}function H(i,e,t){let s=0;const r=[[-1,0],[1,0],[0,-1],[0,1]];for(const[n,a]of r){const o=e+n,l=t+a;(o<0||o>=y||l<0||l>=v||i[l][o]===1)&&s++}return s===3}function z(i){const e=[];for(let t=1;t<v-1;t++)for(let s=1;s<y-1;s++)i[t][s]===0&&H(i,s,t)&&e.push([s,t]);return e}function _(i,e,t,s,r){const n=z(i).filter(([l,c])=>!(l===e&&c===t)&&!s.some(h=>h.x===l&&h.y===c)&&!r.some(h=>h.x===l&&h.y===c));if(n.length===0)throw new Error("No valid dead ends found for merchant placement");const[a,o]=n[Math.floor(Math.random()*n.length)];return new U(a,o)}class q{constructor(e,t,s,r){this.x=e,this.y=t,this.color=s,this.sprite=r}}class j{constructor(e,t,s,r){this.x=e,this.y=t,this.color=s,this.sprite=r}}const m={".":"transparent",B:"#4a4a4a",W:"#ffffff",R:"#ff6b6b",G:"#7ac74f",O:"#d17b46",P:"#9b59b6",L:"#8b4513",D:"#5c2c0c",S:"#e0e0e0",N:"#8d6e63",Y:"#ffd700",T:"#a1887f",K:"#6d4c41",C:"#4169e1",E:"#ffd700",M:"#ff4444"},p={player:`
    .....BBBB.....
    ....BBBBBB....
    ....WWBWBW....
    ....WWBWBW....
    ....BBBBBB....
    .....RRRR.....
    ....BBBBBB....
    ...BBBBBBBB...
    ..BBBBBBBBBB..
    ..BBBBBBBBBB..
    ....BB..BB....
    ....BB..BB....
    ....BB..BB....
    ....BB..BB....
    ...BBB..BBB...
  `.trim().split(`
`).map(i=>i.trim()),wall:`
    DDDDDDDD
    DDDDDDDD
    LLDDLLDD
    LLDDLLDD
    DDLLDDLL
    DDLLDDLL
    LLDDLLDD
    LLDDLLDD
  `.trim().split(`
`).map(i=>i.trim()),merchant:`
    ....YYYY....
    ...YYYYYY...
    ...WWYWYW...
    ...YYYYYY...
    ....RRRR....
    ...YYYYYY...
    ..YYYYYYYY..
    ...YY..YY...
    ...YY..YY...
  `.trim().split(`
`).map(i=>i.trim()),stairsUp:`
    ...TTTTTT...
    ..TTTTTTTT..
    .TTTTTTTTTT.
    TTTTTTTTTTTT
    KKKKKKKKKKKK
    ..TTTTTTTT..
    ..KKKKKKKK..
    ..TTTTTTTT..
    ..KKKKKKKK..
    ..TTTTTTTT..
    ..KKKKKKKK..
    ..TTTTTTTT..
  `.trim().split(`
`).map(i=>i.trim()),stairsDown:`
    ..TTTTTTTT..
    ..KKKKKKKK..
    ..TTTTTTTT..
    ..KKKKKKKK..
    ..TTTTTTTT..
    ..KKKKKKKK..
    TTTTTTTTTTTT
    KKKKKKKKKKKK
    .TTTTTTTTTT.
    ..TTTTTTTT..
    ...TTTTTT...
    ....TTTT....
  `.trim().split(`
`).map(i=>i.trim()),yellowKey:`
    ....EEEE....
    ...EEEEEE...
    ..EEEEEEEE..
    ....EEEE....
    ....BBBB....
  `.trim().split(`
`).map(i=>i.trim()),blueKey:`
    ....CCCC....
    ...CCCCCC...
    ..CCCCCCCC..
    ....CCCC....
    ....BBBB....
  `.trim().split(`
`).map(i=>i.trim()),redKey:`
    ....MMMM....
    ...MMMMMM...
    ..MMMMMMMM..
    ....MMMM....
    ....BBBB....
  `.trim().split(`
`).map(i=>i.trim()),yellowDoor:`
    EEEEEEEE
    EEEEEEEE
    EEBBBBEE
    EEBBBBEE
    EEBBBBEE
    EEBBBBEE
    EEEEEEEE
    EEEEEEEE
  `.trim().split(`
`).map(i=>i.trim()),blueDoor:`
    CCCCCCCC
    CCCCCCCC
    CCBBBBCC
    CCBBBBCC
    CCBBBBCC
    CCBBBBCC
    CCCCCCCC
    CCCCCCCC
  `.trim().split(`
`).map(i=>i.trim()),redDoor:`
    MMMMMMMM
    MMMMMMMM
    MMBBBBMM
    MMBBBBMM
    MMBBBBMM
    MMBBBBMM
    MMMMMMMM
    MMMMMMMM
  `.trim().split(`
`).map(i=>i.trim())},F={yellow:p.yellowDoor,blue:p.blueDoor,red:p.redDoor},V={yellow:p.yellowKey,blue:p.blueKey,red:p.redKey};function Z(i,e,t){const s=[],r=[],n=["yellow","blue","red"],a=Math.min(t+1,n.length);for(let o=0;o<a;o++){const l=n[o],c=E(i,e),h=new j(c.x,c.y,l,V[l]);r.push(h),e.push(c);const T=E(i,e),f=new q(T.x,T.y,l,F[l]);s.push(f),e.push(T)}return{doors:s,keys:r}}class J{constructor(e,t,s,r,n,a,o){this.maze=e,this.monsters=t,this.items=s,this.merchant=r,this.stairs=n,this.doors=a,this.keys=o}}class x{constructor(e,t,s){this.x=e,this.y=t,this.type=s}}function E(i,e){let t,s;do t=Math.floor(Math.random()*(y-2))+1,s=Math.floor(Math.random()*(v-2))+1;while(i[s][t]===1||e.some(r=>r.x===t&&r.y===s));return{x:t,y:s}}function Q(i,e,t,s){const r=O(y,v),n=Y(r,e,t),a=W(r,e,t,n),o=_(r,e,t,n,a),l=[{x:e,y:t},...n,...a,o],c=[];if(i<2){const f=E(r,l);c.push(new x(f.x,f.y,"up")),l.push(f)}if(i>0&&!s){const f=E(r,l);c.push(new x(f.x,f.y,"down"))}const{doors:h,keys:T}=Z(r,l,i);return new J(r,n,a,o,c,h,T)}class X{constructor(){d(this,"element");this.element=document.createElement("div"),this.element.className="combat-popup hidden",document.body.appendChild(this.element)}show(){this.element.classList.remove("hidden")}hide(){this.element.classList.add("hidden")}updateStats(e,t){this.element.innerHTML=`
      <div class="combat-container">
        <div class="combatant player-side">
          <div class="sprite-container">
            <div class="sprite player-sprite"></div>
          </div>
          <div class="stats">
            <div class="name">Player</div>
            <div class="hp-bar">
              <div class="hp-fill" style="width: ${e.hp/e.maxHp*100}%"></div>
              <span class="hp-text">${e.hp}/${e.maxHp}</span>
            </div>
            <div class="combat-stats">
              <div>⚔️ ATK: ${e.atk}</div>
              <div>🛡️ DEF: ${e.def}</div>
            </div>
          </div>
        </div>

        <div class="vs">VS</div>

        <div class="combatant monster-side">
          <div class="sprite-container">
            <div class="sprite monster-${t.id}-sprite"></div>
          </div>
          <div class="stats">
            <div class="name">${t.type.charAt(0).toUpperCase()+t.type.slice(1)}</div>
            <div class="hp-bar">
              <div class="hp-fill" style="width: ${t.hp/t.maxHp*100}%"></div>
              <span class="hp-text">${t.hp}/${t.maxHp}</span>
            </div>
            <div class="combat-stats">
              <div>⚔️ ATK: ${t.atk}</div>
              <div>🛡️ DEF: ${t.def}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="combat-log"></div>
    `}updateLog(e){const t=this.element.querySelector(".combat-log");t&&(t.textContent=e)}}class ee{constructor(){d(this,"element");d(this,"selectedIndex",0);this.element=document.createElement("div"),this.element.className="merchant-popup hidden",document.body.appendChild(this.element),this.setupKeyboardControls()}setupKeyboardControls(){document.addEventListener("keydown",e=>{if(!this.element.classList.contains("hidden"))switch(e.key){case"ArrowUp":e.preventDefault(),this.updateSelection(-1);break;case"ArrowDown":e.preventDefault(),this.updateSelection(1);break;case"Enter":case" ":e.preventDefault(),this.triggerSelectedButton();break;case"Escape":e.preventDefault();const t=this.element.querySelector(".close-btn");t==null||t.click();break}})}updateSelection(e){const t=Array.from(this.element.querySelectorAll("button"));this.selectedIndex=(this.selectedIndex+e+t.length)%t.length,t.forEach((s,r)=>{s.classList.toggle("selected",r===this.selectedIndex)})}triggerSelectedButton(){const t=Array.from(this.element.querySelectorAll("button"))[this.selectedIndex];t&&!t.hasAttribute("disabled")&&t.click()}show(e,t,s){var r;this.selectedIndex=0,this.element.innerHTML=`
      <div class="merchant-container">
        <h2>Merchant's Shop</h2>
        <p>Your Gold: ${t}</p>
        <div class="upgrades">
          ${e.map(({stat:n,cost:a,amount:o})=>`
            <button 
              class="upgrade-btn ${t<a?"disabled":""}"
              data-stat="${n}"
              ${t<a?"disabled":""}
            >
              Upgrade ${n.toUpperCase()}: +${o} (${a} gold)
            </button>
          `).join("")}
        </div>
        <button class="close-btn">Close</button>
      </div>
    `,this.element.classList.remove("hidden"),this.updateSelection(0),this.element.querySelectorAll(".upgrade-btn").forEach(n=>{n.addEventListener("click",()=>{const a=n.dataset.stat;a&&(s(a),this.hide())})}),(r=this.element.querySelector(".close-btn"))==null||r.addEventListener("click",()=>{s("close"),this.hide()})}hide(){this.element.classList.add("hidden")}}class te{constructor(){d(this,"container");d(this,"gameElement");d(this,"statsElement");d(this,"styleElement");this.container=document.createElement("div"),this.container.className="game-container",this.gameElement=document.createElement("div"),this.gameElement.id="game",this.statsElement=document.createElement("div"),this.statsElement.id="stats",this.styleElement=document.createElement("style"),document.head.appendChild(this.styleElement),this.container.appendChild(this.statsElement),this.container.appendChild(this.gameElement),document.body.appendChild(this.container)}renderLevel(e,t,s){this.styleElement.textContent=s.generateSpriteStyles(e),this.gameElement.innerHTML=e.maze.map((r,n)=>`<div class="row">${r.map((o,l)=>{const c=[];o===1&&c.push('<div class="cell-content wall"></div>');const h=e.stairs.find(u=>u.x===l&&u.y===n);h&&c.push(`<div class="cell-content stairs-${h.type}-sprite"></div>`);const T=e.doors.find(u=>u.x===l&&u.y===n);T&&c.push(`<div class="cell-content door-${T.color}-sprite"></div>`);const f=e.keys.find(u=>u.x===l&&u.y===n);f&&c.push(`<div class="cell-content key-${f.color}-sprite"></div>`);const g=e.items.find(u=>u.x===l&&u.y===n);g&&c.push(`<div class="cell-content item-${g.type}-${g.x}-${g.y}-sprite"></div>`);const L=e.monsters.find(u=>u.x===l&&u.y===n&&u.isAlive());return L?c.push(`<div class="cell-content monster-${L.id}-sprite"></div>`):e.merchant.x===l&&e.merchant.y===n&&c.push('<div class="cell-content merchant-sprite"></div>'),t.x===l&&t.y===n&&c.push('<div class="cell-content player-sprite"></div>'),`<div class="cell">${c.join("")}</div>`}).join("")}</div>`).join("")}updateStats(e,t){const s=["yellow","blue","red"].map(r=>`${e.hasKey(r)?"🔑":"❌"} ${r}`).join(`
`);this.statsElement.innerHTML=`
      ⚔️ Level ${e.level}
      📈 EXP: ${e.exp}/${e.expToNextLevel}
      💰 Gold: ${e.gold}
      ❤️ HP: ${e.hp}/${e.maxHp}
      ⚔️ ATK: ${e.atk}
      🛡️ DEF: ${e.def}
      🏰 Floor: ${t+1}
      
      Keys:
      ${s}
    `}}function B(i,e){const s=document.createElement("canvas"),r=s.getContext("2d");return s.width=i[0].length*2,s.height=i.length*2,i.forEach((n,a)=>{[...n].forEach((o,l)=>{const c=e[o];c!=="transparent"&&(r.fillStyle=c,r.fillRect(l*2,a*2,2,2))})}),s.toDataURL()}class se{constructor(){d(this,"sprites",new Map);this.sprites.set("player",B(p.player,m)),this.sprites.set("wall",B(p.wall,m)),this.sprites.set("merchant",B(p.merchant,m)),this.sprites.set("stairsUp",B(p.stairsUp,m)),this.sprites.set("stairsDown",B(p.stairsDown,m)),this.sprites.set("doorYellow",B(p.yellowDoor,m)),this.sprites.set("doorBlue",B(p.blueDoor,m)),this.sprites.set("doorRed",B(p.redDoor,m)),this.sprites.set("keyYellow",B(p.yellowKey,m)),this.sprites.set("keyBlue",B(p.blueKey,m)),this.sprites.set("keyRed",B(p.redKey,m))}generateSpriteStyles(e){let t=`
      .wall { background-image: url(${this.sprites.get("wall")}); }
      .player-sprite { background-image: url(${this.sprites.get("player")}); }
      .merchant-sprite { background-image: url(${this.sprites.get("merchant")}); }
      .stairs-up-sprite { background-image: url(${this.sprites.get("stairsUp")}); }
      .stairs-down-sprite { background-image: url(${this.sprites.get("stairsDown")}); }
    `;return["yellow","blue","red"].forEach(s=>{t+=`.door-${s}-sprite { background-image: url(${this.sprites.get(`door${s.charAt(0).toUpperCase()}${s.slice(1)}`)}); }
`,t+=`.key-${s}-sprite { background-image: url(${this.sprites.get(`key${s.charAt(0).toUpperCase()}${s.slice(1)}`)}); }
`}),e.monsters.forEach(s=>{const r=`monster-${s.id}`;this.sprites.has(r)||this.sprites.set(r,B(s.sprite,m)),t+=`.monster-${s.id}-sprite { background-image: url(${this.sprites.get(r)}); }
`}),e.items.forEach(s=>{const r=`item-${s.type}-${s.x}-${s.y}`;this.sprites.has(r)||this.sprites.set(r,B(s.sprite,m)),t+=`.item-${s.type}-${s.x}-${s.y}-sprite { background-image: url(${this.sprites.get(r)}); }
`}),t}}function C(i,e){const t=i.attack(e);return`${i.constructor.name} deals ${t} damage!`}async function K(i,e,t,s){const r=C(i,e);if(t.updateStats(i,e),t.updateLog(r),!e.isAlive()){const a=i.gainExp(e.expReward);i.gainGold(e.goldReward),await new Promise(l=>setTimeout(l,A));const o=`Victory! Gained ${e.expReward} EXP and ${e.goldReward} gold!`+(a?" Level Up!":"");t.updateLog(o),setTimeout(()=>{t.hide(),s()},1e3);return}await new Promise(a=>setTimeout(a,S));const n=C(e,i);if(t.updateStats(i,e),t.updateLog(n),!i.isAlive()){t.updateLog("Game Over! You were defeated!");return}return await new Promise(a=>setTimeout(a,S)),K(i,e,t,s)}class ie{constructor(){d(this,"currentLevel",0);d(this,"levels",[]);d(this,"player");d(this,"inCombat",!1);d(this,"isShoppingAtMerchant",!1);d(this,"currentMonster",null);d(this,"combatUI");d(this,"merchantUI");d(this,"gameUI");d(this,"spriteManager");this.player=new k,this.spriteManager=new se,this.combatUI=new X,this.merchantUI=new ee,this.gameUI=new te,this.initializeLevels(),this.setupControls(),this.render()}initializeLevels(){for(let e=0;e<3;e++)this.levels[e]=Q(e,this.player.x,this.player.y)}setupControls(){document.addEventListener("keydown",e=>{if(this.inCombat||this.isShoppingAtMerchant)return;let t=this.player.x,s=this.player.y;switch(e.key){case"ArrowRight":t++;break;case"ArrowLeft":t--;break;case"ArrowDown":s++;break;case"ArrowUp":s--;break;default:return}this.handleMovement(t,s)})}handleMovement(e,t){const s=this.levels[this.currentLevel],r=s.doors.find(n=>n.x===e&&n.y===t);if(!(r&&!this.player.hasKey(r.color))&&e>=0&&e<s.maze[0].length&&t>=0&&t<s.maze.length&&s.maze[t][e]===0){const n=s.keys.findIndex(o=>o.x===e&&o.y===t);if(n!==-1){const o=s.keys[n];this.player.addKey(o.color),s.keys.splice(n,1)}const a=s.stairs.find(o=>o.x===e&&o.y===t);a?this.handleStairs(a):(this.player.x=e,this.player.y=t,this.handleInteractions(e,t)),this.render()}}handleStairs(e){if(e.type==="up"&&this.currentLevel<2){this.currentLevel++;const t=this.levels[this.currentLevel].stairs.find(s=>s.type==="down");t&&(this.player.x=t.x,this.player.y=t.y)}else if(e.type==="down"&&this.currentLevel>0){this.currentLevel--;const t=this.levels[this.currentLevel].stairs.find(s=>s.type==="up");t&&(this.player.x=t.x,this.player.y=t.y)}}handleInteractions(e,t){const s=this.levels[this.currentLevel];if(s.merchant.x===e&&s.merchant.y===t){this.handleMerchantInteraction();return}const r=s.items.findIndex(a=>a.x===e&&a.y===t);if(r!==-1){const a=s.items[r];a.type==="sword"?this.player.atk+=a.bonus:a.type==="shield"&&(this.player.def+=a.bonus),s.items.splice(r,1);return}const n=s.monsters.find(a=>a.x===e&&a.y===t&&a.isAlive());n&&this.startCombat(n)}handleMerchantInteraction(){this.isShoppingAtMerchant=!0;const e=this.levels[this.currentLevel].merchant.getAvailableUpgrades();this.merchantUI.show(e,this.player.gold,t=>{if(t!=="close"){const s=this.levels[this.currentLevel].merchant.purchase(t);if(s&&this.player.gold>=s.cost)switch(this.player.gold-=s.cost,t){case"hp":this.player.maxHp+=s.amount,this.player.hp+=s.amount;break;case"atk":this.player.atk+=s.amount;break;case"def":this.player.def+=s.amount;break}}this.isShoppingAtMerchant=!1,this.render()})}startCombat(e){this.inCombat=!0,this.currentMonster=e,this.combatUI.show(),this.combatUI.updateStats(this.player,e),this.handleCombatRound()}async handleCombatRound(){this.currentMonster&&await K(this.player,this.currentMonster,this.combatUI,()=>{this.inCombat=!1,this.currentMonster=null,this.levels[this.currentLevel].monsters=this.levels[this.currentLevel].monsters.filter(e=>e.isAlive()),this.render()})}render(){const e=this.levels[this.currentLevel];this.gameUI.renderLevel(e,this.player,this.spriteManager),this.gameUI.updateStats(this.player,this.currentLevel)}}new ie;
