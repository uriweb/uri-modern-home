/* built */!function(){"use strict";var u;function c(){u.startscreen.classList.add("hidden"),function(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",g,!1);window.onmousewheel=document.onmousewheel=null,window.onwheel=null,window.ontouchmove=null,document.onkeydown=null}(),1!=u.status&&(u.status=1,p(),u.timing.start=Date.now(),setTimeout(l,u.timing.init))}function l(){var e,t,n,a,o,r;1==u.status&&(e=Date.now()-u.timing.start,a=e/u.timing.duration*100,o=u.timing.duration,r=a*(a/o),t=Math.round(1e3*r)/1e3,n=Math.max(200,Math.min(350,u.container.x*u.container.y/1e6*300)),u.timing.interval=Math.max(n,u.timing.init-u.timing.init*t),s(),u.n++,setTimeout(l,u.timing.interval))}function m(){window.clearInterval(u.endtimer),u.container.el.innerHTML="",u.container.el.classList.remove("endgame"),u.endscreen.classList.remove("visible"),u.progress.className="",u.score.points=0,u.score.spawned=0,u.score.removed=0,u.n=0,c()}function p(){var e,t,n;1==u.status&&(e=u.score.spawned-u.score.removed,u.score.board.points.innerHTML=u.score.points,u.score.board.remaining.innerHTML=e,t=100/u.pointcap*e,u.progress.style.width=t+"%",t<50?u.progress.classList.remove("alert"):t<75?(u.progress.classList.remove("warning"),u.progress.classList.add("alert")):t<90?(u.progress.classList.remove("alert","danger"),u.progress.classList.add("warning")):t<100&&(u.progress.classList.remove("warning"),u.progress.classList.add("danger")),u.pointcap==e&&(u.status=2,u.container.el.classList.add("endgame"),u.endscreen.classList.add("visible"),u.score.board.remaining.innerHTML=">"+u.pointcap,u.audio.end.play(),n=0,u.endtimer=window.setInterval(function(){s(),500==++n&&window.clearInterval(u.endtimer)},20)))}function h(){var e,t,n,a={};switch(t=Math.floor(1e3*Math.random()),n=Math.floor(3*Math.random()+1),t<350?a.type="tunicate-1":t<700?a.type="tunicate-2":t<900?a.type="seaweed-1":t<1e3&&(a.type="crab"),n){case 1:e="slow";break;case 2:e="fast";break;default:e=""}return a.div=document.createElement("div"),a.div.className="creature "+a.type+" "+e,a}function s(){var e,t,n,a,o,r,s,i,d,c,l;e=h(),d=e.type,c=u.container.el.querySelectorAll("."+d+":not(.destroyed)"),l=Math.floor(Math.random()*c.length),t=0<c.length?c[l].parentNode.getAttribute("id"):null,i="c_"+Math.random().toString(36).substr(2,9),n={left:0,right:u.container.x-128,top:Math.max(128,u.container.y-16*u.n),bottom:u.container.y-u.score.board.h},Math.floor(1e3*Math.random())<700&&null!=t&&"crab"!=e.type?(o=Math.min(n.right,Math.max(128,u.creatures[t].x+u.unit*Math.floor(17*Math.random()-8))),r=Math.min(n.bottom,Math.max(128,u.creatures[t].y+u.unit*Math.floor(17*Math.random()-8)))):(o=Math.max(n.left,u.unit*Math.floor(Math.random()*(n.right/u.unit))),r=Math.max(n.top,u.unit*Math.floor(Math.random()*(n.bottom/u.unit)))),s=Math.floor(10*Math.random()+1),(a=document.createElement("div")).id=i,a.className="creature-wrapper",a.style="top:"+r+"px; left:"+o+"px; z-index:"+s,a.appendChild(e.div),1==u.status&&a.addEventListener("click",function(e){var t;switch(u.creatures[e].type){case"crab":v(u.audio.elevate),t=30;break;case"tunicate-1":v(u.audio.bounce),t=10;break;case"tunicate-2":v(u.audio.bounce),t=30;break;case"seaweed-1":v(u.audio.shoot),t=20;break;default:v(u.audio.shoot),t=10}document.getElementById(e).classList.add("destroyed"),u.creatures[e].status=0,u.score.removed++,u.score.points+=t,p()}.bind(null,i),!1),u.creatures[i]={x:o,y:r,type:e.type,status:1},u.container.el.appendChild(a),u.score.spawned++,p()}function v(e){e.paused?e.play():e.currentTime=0}function b(){u.score.board.h=u.score.board.el.offsetHeight,u.container.el.style.height="calc( 100vh - "+u.score.board.h+"px)",u.container.x=u.container.el.offsetWidth,u.container.y=u.container.el.offsetHeight}function g(e){(e=e||window.event).preventDefault&&e.preventDefault(),e.returnValue=!1}function w(e){if({37:1,38:1,39:1,40:1}[e.keyCode])return g(e),!1}window.addEventListener("load",function(){var e,t,n,a,o,r,s,i,d;e="../../wp-content/themes/uri-modern-home/features/2018/space-invaders/",u={unit:16,status:0,pointcap:50,n:0,story:{h:document.getElementById("story").offsetHeight,top:document.getElementById("story").getBoundingClientRect().top},buttons:{},creatures:{},container:{},score:{points:0,spawned:0,removed:0,board:{}},timing:{init:2e3,duration:6e4},audio:{bounce:new Audio(e+"mp3/bounce.mp3"),elevate:new Audio(e+"mp3/elevate.mp3"),shoot:new Audio(e+"mp3/shoot.mp3"),end:new Audio(e+"mp3/end.mp3"),menu:new Audio(e+"mp3/menu.mp3")}},(t=document.createElement("div")).id="game",(n=document.createElement("div")).id="creature-box",u.habitat=document.createElement("div"),u.habitat.className="creatures",n.appendChild(u.habitat),u.startscreen=document.createElement("div"),u.startscreen.id="startscreen",(a=document.createElement("div")).className="modal",(o=document.createElement("div")).id="story-header",o.innerHTML="<h1>Space <br> Invaders</h1>",u.buttons.play=document.createElement("div"),u.buttons.play.id="play-game",u.buttons.play.className="retro-button",u.buttons.play.innerHTML="play",o.appendChild(u.buttons.play),a.appendChild(o),a.appendChild(n),u.startscreen.appendChild(a),t.appendChild(u.startscreen),u.endscreen=document.createElement("div"),u.endscreen.id="endscreen",u.endscreen.className="modal",u.endscreen.innerHTML="<h1>Game <br> Over</h1>",u.buttons.reset=document.createElement("div"),u.buttons.reset.id="reset-game",u.buttons.reset.className="retro-button",u.buttons.reset.innerHTML="play again",u.endscreen.appendChild(u.buttons.reset),t.appendChild(u.endscreen),u.container.el=document.createElement("div"),u.container.el.id="creature-container",t.appendChild(u.container.el),u.score.board.el=document.createElement("div"),u.score.board.el.id="scoreboard",u.buttons.controls=document.createElement("div"),u.buttons.controls.id="controls",u.score.board.el.appendChild(u.buttons.controls),u.buttons.pause=document.createElement("div"),u.buttons.pause.id="pause-game",u.buttons.pause.innerHTML="pause",u.buttons.controls.appendChild(u.buttons.pause),u.buttons.resume=document.createElement("div"),u.buttons.resume.id="resume-game",u.buttons.resume.innerHTML="resume",u.buttons.controls.appendChild(u.buttons.resume),(r=document.createElement("div")).id="scores",(s=document.createElement("div")).id="points",s.innerHTML='<div class="label">score</div>',u.score.board.points=document.createElement("div"),u.score.board.points.className="score",u.score.board.points.innerHTML=0,s.appendChild(u.score.board.points),r.appendChild(s),(i=document.createElement("div")).id="remaining",i.innerHTML='<div class="label">invaders</div>',u.score.board.remaining=document.createElement("div"),u.score.board.remaining.className="score",u.score.board.remaining.innerHTML=0,s.appendChild(u.score.board.remaining),r.appendChild(i),u.score.board.el.appendChild(r),(d=document.createElement("div")).id="progress",u.progress=document.createElement("div"),u.progress.id="progress-bar",d.appendChild(u.progress),d.innerHTML+='<div id="progress-label">Complete Invasion! --\x3e</div>',u.score.board.el.appendChild(d),t.appendChild(u.score.board.el),document.getElementById("main").appendChild(t),u.score.board.h=u.score.board.el.offsetHeight,u.container.el.style.height="calc( 100vh - "+u.score.board.h+"px)",u.container.x=u.container.el.offsetWidth,u.container.y=u.container.el.offsetHeight,function(){window.addEventListener&&window.addEventListener("DOMMouseScroll",g,!1);window.onwheel=g,window.onmousewheel=document.onmousewheel=g,window.ontouchmove=g,document.onkeydown=w}(),function(){var e,t,n,a,o;for(t=document.createElement("div"),e=0;e<15;e++)n=h(),a=u.unit*Math.floor(48*Math.random()+1),o=Math.floor(10*Math.random()+1),n.div.style="left:"+a+"px; z-index:"+o,t.appendChild(n.div);u.habitat.appendChild(t)}(),u.buttons.play.addEventListener("click",function(){v(u.audio.menu),setTimeout(c,1e3)},!1),u.buttons.reset.addEventListener("click",function(){v(u.audio.menu),setTimeout(m,1e3)},!1),u.buttons.pause.addEventListener("click",function(){1==u.status&&(v(u.audio.menu),u.status=3,u.timing.paused=Date.now(),u.container.el.classList.add("paused"),u.buttons.controls.classList.add("paused"))},!1),u.buttons.resume.addEventListener("click",function(){var e;3==u.status&&(v(u.audio.menu),e=Date.now(),u.status=1,u.timing.start+=e-u.timing.paused,u.container.el.classList.remove("paused"),u.buttons.controls.classList.remove("paused"),setTimeout(l,u.timing.interval))},!1),window.addEventListener("resize",b,!1)},!1)}();