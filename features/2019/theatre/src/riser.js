/**
 * Riser
 *
 * @see https://codepen.io/Archtects/pen/YJeaVJ
 * @package uri-modern-home
 */

( function() {

	window.addEventListener( 'load', init, false );

	var data;

	function init() {

		var style, matrix;

		data = {
			hero: document.getElementById( 'story-hero' ),
			deck: document.getElementById( 'deck-wrapper' )
		}

		data.title = data.hero.querySelector( 'h1' );

		data.hero.classList.add( 'has-js' );

		window.addEventListener( 'resize', scroll, false );
		window.addEventListener( 'scroll', scroll, false );
		scroll();

	}

	function scroll() {

		var heroH = data.hero.offsetHeight;
		var ypos = window.pageYOffset;
				
		data.deck.style.marginTop = heroH * 1.2 + 'px';

		data.title.setAttribute( 'style', 'transform: translatey(' + ( -ypos / 1.5 ) + 'px); opacity: ' + Math.min( 1, ypos / 200 ) );
		data.hero.setAttribute( 'style', 'transform: translatey(' + ( -ypos / 1.8 ) + 'px)' );
	}

})();
