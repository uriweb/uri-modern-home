/* built */!function(){"use strict";var u;function t(){u.els.page.classList.add("gameplay"),1!=u.status&&(u.status=1,m(),u.timing.start=Date.now(),setTimeout(d,u.timing.init))}function d(){var e,t,n,a,o,r,s,i;1==u.status&&(e=Date.now()-u.timing.start,a=0,o=u.timing.duration,r=e,s=Math.abs(o)-Math.abs(a),i=(Math.abs(r)-Math.abs(a))/s,t=Math.pow(i,2),n=Math.max(120,Math.min(380,u.container.x*u.container.y/1e6*300)),u.timing.interval=Math.max(n,u.timing.init-u.timing.init*t),c(),u.n++,setTimeout(d,u.timing.interval))}function m(){var e,t,n;1==u.status&&(u.score.board.points.innerHTML=b(u.score.points),u.score.points>=u.score.high&&(u.score.board.high.innerHTML=b(u.score.points)),e=u.score.spawned-u.score.removed,t=100/u.pointcap*e,u.progress.style.width=t+"%",t<50?u.progress.classList.remove("alert"):t<75?(u.progress.classList.remove("warning"),u.progress.classList.add("alert")):t<90?(u.progress.classList.remove("alert","danger"),u.progress.classList.add("warning")):t<100&&(u.progress.classList.remove("warning"),u.progress.classList.add("danger")),u.pointcap==e&&(u.status=2,u.container.el.classList.add("endgame"),u.endscreen.classList.add("visible"),u.score.points>f()&&a(u.score.points),u.audio.end.play(),n=0,u.endtimer=window.setInterval(function(){c(),500==++n&&window.clearInterval(u.endtimer)},20)))}function p(){var e,t,n,a={};switch(t=Math.floor(1e3*Math.random()),n=Math.floor(3*Math.random()+1),t<350?a.type="tunicate-1":t<700?a.type="tunicate-2":t<900?a.type="seaweed-1":t<1e3&&(a.type="crab"),n){case 1:e="slow";break;case 2:e="fast";break;default:e=""}return a.div=document.createElement("div"),a.div.className="creature "+a.type+" "+e,a}function c(){var e,t,n,a,o,r,s,i,d,c,l;e=p(),d=e.type,c=u.container.el.querySelectorAll("."+d+":not(.destroyed)"),l=Math.floor(Math.random()*c.length),t=0<c.length?c[l].parentNode.getAttribute("id"):null,i="c_"+Math.random().toString(36).substr(2,9),n={left:0,right:u.container.x-128,top:Math.max(128,u.container.y-16*u.n),bottom:u.container.y-u.score.board.h},Math.floor(1e3*Math.random())<700&&null!=t&&"crab"!=e.type?(o=Math.min(n.right,Math.max(128,u.creatures[t].x+u.unit*Math.floor(17*Math.random()-8))),r=Math.min(n.bottom,Math.max(128,u.creatures[t].y+u.unit*Math.floor(17*Math.random()-8)))):(o=Math.max(n.left,u.unit*Math.floor(Math.random()*(n.right/u.unit))),r=Math.max(n.top,u.unit*Math.floor(Math.random()*(n.bottom/u.unit)))),s=Math.floor(10*Math.random()+1),(a=document.createElement("div")).id=i,a.className="creature-wrapper",a.style="top:"+r+"px; left:"+o+"px; z-index:"+s,a.appendChild(e.div),1==u.status&&a.addEventListener("click",function(e){var t;switch(u.creatures[e].el.classList.add("destroyed"),u.creatures[e].status=0,setTimeout(function(){u.container.el.removeChild(u.creatures[e].el)},5e3),u.creatures[e].type){case"crab":h(u.audio.elevate),t=30;break;case"tunicate-1":h(u.audio.bounce),t=10;break;case"tunicate-2":h(u.audio.bounce),t=30;break;case"seaweed-1":h(u.audio.shoot),t=20;break;default:h(u.audio.shoot),t=10}u.score.removed++,u.score.points+=t,m()}.bind(null,i),!1),u.creatures[i]={el:a,x:o,y:r,type:e.type,status:1},u.container.el.appendChild(a),u.score.spawned++,m()}function i(){var e,t,n,a,o;e=Math.floor(3951*Math.random()+50),t="c_"+Math.random().toString(36).substr(2,9),n=u.unit*Math.floor(Math.random()*(u.container.x/u.unit)),a=u.unit*Math.floor(Math.random()*(u.container.y/u.unit)),(o=document.createElement("div")).id=t,o.className="bubbles bubbles-1",o.style="top:"+a+"px; left:"+n+"px",u.bubbles.appendChild(o),setTimeout(function(){u.bubbles.removeChild(o)},5e3),setTimeout(i,e)}function h(e){e.paused?e.play():e.currentTime=0}function l(){switch(u.status){case 0:t();break;case 1:u.status=3,u.timing.paused=Date.now(),u.container.el.classList.add("paused"),u.buttons.controls.classList.add("paused"),u.els.page.classList.remove("gameplay");break;case 2:window.clearInterval(u.endtimer),u.container.el.innerHTML="",u.container.el.classList.remove("endgame"),u.endscreen.classList.remove("visible"),u.progress.className="",u.score.points=0,u.score.high=f(),u.score.spawned=0,u.score.removed=0,u.n=0,u.score.board.high.innerHTML=b(u.score.high),t();break;case 3:e=Date.now(),u.status=1,u.timing.start+=e-u.timing.paused,u.container.el.classList.remove("paused"),u.buttons.controls.classList.remove("paused"),u.els.page.classList.add("gameplay"),setTimeout(d,u.timing.interval)}var e}function b(e){var t="00000"+e;return t.substr(t.length-5)}function g(){u.score.board.h=u.score.board.el.offsetHeight,u.container.el.style.height="calc( 100vh - "+u.score.board.h+"px)",u.container.x=u.container.el.offsetWidth,u.container.y=u.container.el.offsetHeight}function v(){window.pageYOffset>u.score.board.y-u.container.y&&0==u.status&&(u.score.board.el.classList.add("fixed"),t())}function f(){var e;return""==(e=function(e){var t,n,a,o;for(t=e+"=",n=document.cookie.split(";"),a=0;a<n.length;a++){for(o=n[a];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return""}("uri-space-invaders-high-score"))?(a(0),0):e}function a(e){var t,n,a,o,r;t="uri-space-invaders-high-score",n=e,a=365,(o=new Date).setTime(o.getTime()+24*a*60*60*1e3),r="expires="+o.toUTCString(),document.cookie=t+"="+n+";"+r+";path=/"}window.addEventListener("load",function(){var e,t;e=URIMODERN.path.theme+"/features/2018/space-invaders/",u={unit:16,status:0,pointcap:50,n:0,els:{page:document.getElementById("page"),habitat:document.getElementById("habitat-creatures")},story:{h:document.getElementById("story").offsetHeight,top:document.getElementById("story").getBoundingClientRect().top},buttons:{},creatures:{},container:{},score:{points:0,spawned:0,removed:0,high:f(),board:{wrapper:document.getElementById("scoreboard-wrapper")}},timing:{init:2e3,duration:6e4},audio:{bounce:new Audio(e+"mp3/bounce.mp3"),elevate:new Audio(e+"mp3/elevate.mp3"),shoot:new Audio(e+"mp3/shoot.mp3"),end:new Audio(e+"mp3/end.mp3"),menu:new Audio(e+"mp3/menu.mp3")}},(t=document.createElement("div")).id="game",t.appendChild((u.endscreen=document.createElement("div"),u.endscreen.id="endscreen",u.endscreen.className="modal",u.endscreen.innerHTML="<h1>Game <br> Over</h1>",u.buttons.reset=document.createElement("div"),u.buttons.reset.id="reset-game",u.buttons.reset.className="retro-button",u.buttons.reset.innerHTML="play again",u.endscreen.appendChild(u.buttons.reset),u.endscreen)),t.appendChild((u.container.el=document.createElement("div"),u.container.el.id="creature-container",u.container.el)),t.appendChild((u.bubbles=document.createElement("div"),u.bubbles.id="bubbles-container",u.bubbles)),u.score.board.wrapper.appendChild((u.buttons.controls=document.createElement("div"),u.buttons.controls.id="controls",u.buttons.pause=document.createElement("div"),u.buttons.pause.id="pause-game",u.buttons.pause.innerHTML="pause",u.buttons.controls.appendChild(u.buttons.pause),u.buttons.resume=document.createElement("div"),u.buttons.resume.id="resume-game",u.buttons.resume.innerHTML="resume",u.buttons.controls.appendChild(u.buttons.resume),(n=document.createElement("div")).id="scores",(a=document.createElement("div")).id="points",a.innerHTML='<div class="label">score</div>',u.score.board.points=document.createElement("div"),u.score.board.points.className="score",u.score.board.points.innerHTML=b(u.score.points),a.appendChild(u.score.board.points),n.appendChild(a),(o=document.createElement("div")).id="high",o.innerHTML='<div class="label">high</div>',u.score.board.high=document.createElement("div"),u.score.board.high.className="score",u.score.board.high.innerHTML=b(u.score.high),o.appendChild(u.score.board.high),n.appendChild(o),(r=document.createElement("div")).id="progress",u.progress=document.createElement("div"),u.progress.id="progress-bar",r.appendChild(u.progress),(s=document.createElement("div")).id="progress-label",s.innerHTML="Complete Invasion! --\x3e",r.appendChild(s),u.score.board.el=document.createElement("div"),u.score.board.el.id="scoreboard",u.score.board.el.appendChild(u.buttons.controls),u.score.board.el.appendChild(n),u.score.board.el.appendChild(r),u.score.board.el)),document.getElementById("main").appendChild(t),u.score.board.h=u.score.board.el.offsetHeight,u.score.board.y=u.score.board.el.getBoundingClientRect().top,console.log(u.score.board.y),u.container.el.style.height="calc( 100vh - "+u.score.board.h+"px)",u.container.x=u.container.el.offsetWidth,u.container.y=u.container.el.offsetHeight,u.buttons.reset.addEventListener("click",function(){h(u.audio.menu)},!1),u.buttons.pause.addEventListener("click",function(){1==u.status&&h(u.audio.menu)},!1),u.buttons.resume.addEventListener("click",function(){3==u.status&&h(u.audio.menu)},!1),function(){var e,t,n,a,o;for(t=document.createElement("div"),e=0;e<15;e++)n=p(),a=u.unit*Math.floor(48*Math.random()+1),o=Math.floor(10*Math.random()+1),n.div.style="left:"+a+"px; z-index:"+o,t.appendChild(n.div);u.els.habitat.innerHTML="",u.els.habitat.appendChild(t)}(),i(),u.audio.menu.onended=l,window.addEventListener("resize",g,!1),window.addEventListener("scroll",v,!1);var n,a,o,r,s},!1)}();