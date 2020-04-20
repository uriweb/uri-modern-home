/**
 * Riser
 *
 * @see https://codepen.io/Archtects/pen/YJeaVJ
 * @package uri-modern-home
 */

( function() {
	document.addEventListener( 'DOMContentLoaded', init, false );

	let data;

	function init() {
		data = {
			hero: document.getElementById( 'story-hero' ),
			deck: document.getElementById( 'deck-wrapper' ),
		};

		data.title = data.hero.querySelector( 'h1' );

		data.hero.classList.add( 'has-js' );

		window.addEventListener( 'resize', scroll, false );
		window.addEventListener( 'scroll', scroll, false );
		scroll();
	}

	function scroll() {
		const ypos = window.pageYOffset;

		if ( ypos > window.innerHeight * 1.5 ) {
			return;
		}

		const heroH = data.hero.offsetHeight;
		data.deck.style.marginTop = ( heroH * 1.2 ) + 'px';

		data.title.setAttribute( 'style', 'transform: translatey(' + ( -ypos / 1.5 ) + 'px); opacity: ' + Math.min( 1, ypos / 200 ) );
		data.hero.setAttribute( 'style', 'transform: translatey(' + ( -ypos / 1.8 ) + 'px)' );
	}
}() );
