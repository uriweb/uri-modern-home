/* built */!function(){"use strict";var e={};function t(t,a){e[t]={section:a,iframe:a.querySelector("iframe"),a:a.querySelector("a.teaser-click-target")},e[t].iframe&&(e[t].player=new Vimeo.Player(e[t].iframe),e[t].player.on("loaded",(function(){this.pause()}),!1),e[t].section.addEventListener("mouseenter",o.bind(null,t),!1),e[t].section.addEventListener("mouseleave",i.bind(null,t),!1)),e[t].section.classList.contains("external-content")||e[t].a.addEventListener("click",(function(o){o.preventDefault(),n(e[t].section)}),!1)}function n(e){e.classList.contains("open")?e.classList.remove("open"):e.classList.add("open"),e.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})}function o(t){e[t].player.play()}function i(t){e[t].player.pause()}window.addEventListener("load",(function(){var e,o;for(document.body.classList.add("has-js"),e=document.querySelectorAll("section.story"),o=0;o<e.length;o++)t(e[o].getAttribute("id"),e[o]);i=document.querySelector(".read-mode-toggle .read-mode-toggle-light"),a=document.querySelector(".read-mode-toggle .read-mode-toggle-dark"),i.addEventListener("click",(function(){document.body.classList.add("read-mode-light")}),!1),a.addEventListener("click",(function(){document.body.classList.remove("read-mode-light")}),!1),function(){var e;null!=(e=function(){var e=document.URL.split("#");return e.length>1?e[1]:null}())&&n(document.getElementById(e))}();var i,a}),!1)}();