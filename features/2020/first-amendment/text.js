/* built */!function(){"use strict";window.addEventListener("load",(function(){e.t="Congress shall make no law respecting an establishment of <span>religion</span>, or prohibiting the free exercise thereof; or abridging the freedom of <span>speech</span> or of <span>the press</span>; or the right of the people peaceably to <span>assemble</span>, and to <span>petition</span> the Government for a redress of grievances.",e.el=document.getElementById("amendment-text-bg"),e.story={el:document.querySelector(".story")},e.status=!1;let o="";for(let t=0;t<50;t++)o+=e.t+" &mdash; ";e.el.innerHTML=o,e.spans=e.el.querySelectorAll("span"),e.l=e.spans.length,window.addEventListener("resize",t,!1),t(),window.addEventListener("scroll",n,!1),s()}),!1);const e={};function t(){const t=window.innerWidth,s=window.innerHeight,o=Math.min(1,t*s/2073600);e.threshold=Math.round(e.l*o),n()}function n(){const t=window.pageYOffset||document.documentElement.scrollTop;e.story.p=e.story.el.getBoundingClientRect().top+t,t>e.story.p?(clearTimeout(e.timer),e.status=!1):0==e.status&&s()}function s(){const t=Math.floor(1001*Math.random()+200),n=Math.floor(Math.random()*e.threshold);e.status=!0,e.spans[n].classList.add("active"),setTimeout((function(){e.spans[n].classList.remove("active")}),1e3),e.timer=setTimeout(s,t)}}();