/* built */!function(){"use strict";var n={};function i(t,e){n[t]={section:e,iframe:e.querySelector("iframe"),a:e.querySelector("a.teaser-click-target")},n[t].player=new Vimeo.Player(n[t].iframe),n[t].player.on("loaded",function(){this.pause()},!1),n[t].section.addEventListener("mouseenter",function(e){n[e].player.play()}.bind(null,t),!1),n[t].section.addEventListener("mouseleave",function(e){n[e].player.pause()}.bind(null,t),!1),n[t].a.addEventListener("click",function(e){e.preventDefault(),function(e){var t="open";e.classList.contains(t)?e.classList.remove(t):(e.classList.add(t),e.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"}))}(n[t].section)},!1)}window.addEventListener("load",function(){var e,t;for(document.body.classList.add("has-js"),e=document.querySelectorAll("section.story"),t=0;t<e.length;t++)i(e[t].getAttribute("id"),e[t])},!1)}();