/* built */!function(){var n;function e(){var e,t;(e=window.pageYOffset)>1.5*window.innerHeight||(t=n.hero.offsetHeight,n.deck.style.marginTop=1.2*t+"px",n.title.setAttribute("style","transform: translatey("+-e/1.5+"px); opacity: "+Math.min(1,e/200)),n.hero.setAttribute("style","transform: translatey("+-e/1.8+"px)"))}document.addEventListener("DOMContentLoaded",function(){(n={hero:document.getElementById("story-hero"),deck:document.getElementById("deck-wrapper")}).title=n.hero.querySelector("h1"),n.hero.classList.add("has-js"),window.addEventListener("resize",e,!1),window.addEventListener("scroll",e,!1),e()},!1)}();