/* built */!function(){"use strict";var m;function t(){m.startscreen.classList.add("hidden"),m.status=1,l(),m.timing={init:2e3,duration:6e4,start:Date.now()},i()}function i(){var e,t,n,a,o,r,s;e=Date.now()-m.timing.start,o=e/m.timing.duration*100,r=m.timing.duration,s=o*(o/r),t=Math.round(1e3*s)/1e3,a=Math.max(120,Math.min(350,m.container.x*m.container.y/1e6*300)),n=Math.max(a,m.timing.init-m.timing.init*t),console.log(n),d(),m.n++,1==m.status&&setTimeout(i,n)}function n(){window.clearInterval(m.endtimer),m.container.el.innerHTML="",m.container.el.classList.remove("endgame"),m.endscreen.classList.remove("visible"),m.progress.className="",m.score.spawned=0,m.score.removed=0,m.n=0,t()}function l(){var e,t,n;1==m.status&&(e=m.score.spawned-m.score.removed,m.score.board.spawned.innerHTML=m.score.spawned,m.score.board.removed.innerHTML=m.score.removed,m.score.board.remaining.innerHTML=e,t=100/m.pointcap*e,m.progress.style.width=t+"%",t<50?m.progress.classList.remove("alert"):t<75?(m.progress.classList.remove("warning"),m.progress.classList.add("alert")):t<90?(m.progress.classList.remove("alert","danger"),m.progress.classList.add("warning")):t<100&&(m.progress.classList.remove("warning"),m.progress.classList.add("danger")),m.pointcap==e&&(m.status=2,m.container.el.classList.add("endgame"),m.endscreen.classList.add("visible"),m.audio.end.play(),n=0,m.endtimer=window.setInterval(function(){d(),500==++n&&window.clearInterval(m.endtimer)},20)))}function p(){var e,t,n,a={};switch(t=Math.floor(1e3*Math.random()),n=Math.floor(3*Math.random()+1),t<350?a.type="tunicate-1":t<700?a.type="tunicate-2":t<900?a.type="seaweed-1":t<1e3&&(a.type="crab"),n){case 1:e="slow";break;case 2:e="fast";break;default:e=""}return a.div=document.createElement("div"),a.div.className="creature "+a.type+" "+e,a}function d(){var e,t,n,a,o,r,s,i,d,c,u;e=p(),d=e.type,c=m.container.el.querySelectorAll("."+d+":not(.destroyed)"),u=Math.floor(Math.random()*c.length),t=0<c.length?c[u].parentNode.getAttribute("id"):null,i="c_"+Math.random().toString(36).substr(2,9),n={left:0,right:m.container.x-128,top:Math.max(128,m.container.y-m.score.board.h-16*m.n),bottom:m.container.y-m.score.board.h},Math.floor(1e3*Math.random())<700&&null!=t&&"crab"!=e.type?(o=Math.min(n.right,Math.max(128,m.creatures[t].x+m.unit*Math.floor(17*Math.random()-8))),r=Math.min(n.bottom,Math.max(128,m.creatures[t].y+m.unit*Math.floor(17*Math.random()-8)))):(o=Math.max(n.left,m.unit*Math.floor(Math.random()*(n.right/m.unit))),r=Math.max(n.top,m.unit*Math.floor(Math.random()*(n.bottom/m.unit)))),s=Math.floor(10*Math.random()+1),(a=document.createElement("div")).id=i,a.className="creature-wrapper",a.style="top:"+r+"px; left:"+o+"px; z-index:"+s,a.appendChild(e.div),1==m.status&&a.addEventListener("click",function(e){switch(m.creatures[e].type){case"crab":h(m.audio.elevate);break;case"tunicate-1":case"tunicate-2":h(m.audio.bounce);break;case"seaweed-1":h(m.audio.shoot);break;default:h(m.audio.shoot)}document.getElementById(e).classList.add("destroyed"),m.creatures[e].status=0,m.score.removed++,l()}.bind(null,i),!1),m.creatures[i]={x:o,y:r,type:e.type,status:1},m.container.el.appendChild(a),m.score.spawned++,l()}function h(e){e.paused?e.play():e.currentTime=0}function a(){window.pageYOffset>m.story.top+m.story.h+m.score.board.h-m.container.y?m.score.board.el.classList.add("fluid"):m.score.board.el.classList.remove("fluid")}function o(){m.container.x=m.container.el.offsetWidth,m.container.y=m.container.el.offsetHeight}window.addEventListener("load",function(){var e;e="../../wp-content/themes/uri-modern-home/features/2018/space-invaders/",(m={unit:16,status:0,pointcap:50,n:0,story:{h:document.getElementById("story").offsetHeight,top:document.getElementById("story").getBoundingClientRect().top},buttons:{},creatures:{},container:{},score:{spawned:0,removed:0},audio:{bounce:new Audio(e+"mp3/bounce.mp3"),elevate:new Audio(e+"mp3/elevate.mp3"),shoot:new Audio(e+"mp3/shoot.mp3"),end:new Audio(e+"mp3/end.mp3"),menu:new Audio(e+"mp3/menu.mp3")}}).habitat=document.getElementById("creature-box").querySelector(".creatures"),m.startscreen=document.getElementById("startscreen"),m.container.el=document.getElementById("creature-container"),m.container.x=m.container.el.offsetWidth,m.container.y=m.container.el.offsetHeight,m.score.board={el:document.getElementById("scoreboard"),spawned:document.getElementById("spawned").querySelector(".score"),removed:document.getElementById("removed").querySelector(".score"),remaining:document.getElementById("remaining").querySelector(".score")},m.score.board.h=m.score.board.el.offsetHeight,function(){var e,t,n,a,o;for(t=document.createElement("div"),e=0;e<15;e++)n=p(),a=m.unit*Math.floor(48*Math.random()+1),o=Math.floor(10*Math.random()+1),n.div.style="left:"+a+"px; z-index:"+o,t.appendChild(n.div);m.habitat.appendChild(t)}(),m.buttons.play=document.getElementById("play-game"),m.buttons.play.addEventListener("click",function(){h(m.audio.menu),setTimeout(t,1e3)},!1),m.buttons.reset=document.getElementById("reset-game"),m.buttons.reset.addEventListener("click",function(){h(m.audio.menu),setTimeout(n,1e3)},!1),m.buttons.pause=document.getElementById("pause-game"),m.buttons.pause.addEventListener("click",function(){1==m.status&&(h(m.audio.menu),m.status=3,m.timing.paused=Date.now(),m.container.el.classList.add("paused"))},!1),m.buttons.resume=document.getElementById("resume-game"),m.buttons.resume.addEventListener("click",function(){var e;3==m.status&&(h(m.audio.menu),e=Date.now(),m.status=1,m.timing.start+=e-m.timing.paused,m.container.el.classList.remove("paused"),i())},!1),m.progress=document.getElementById("progress-bar"),m.endscreen=document.getElementById("endscreen"),window.addEventListener("scroll",a,!1),window.addEventListener("resize",o,!1)},!1)}();