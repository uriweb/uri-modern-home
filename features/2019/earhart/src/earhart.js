/**
 * EARHART
 *
 * @package uri-modern-home
 */

( function() {

	'use strict';

	var data = {};

	window.addEventListener( 'load', init, false );

	function init() {

		data.deck = {
			el: document.getElementById( 'deck' ),
			offsetY: 0
		};

		data.graphic = document.getElementById( 'hero-graphic' );

		handleResize();

		window.addEventListener( 'resize', handleResize, false );
		window.addEventListener( 'scroll', handleScroll, false );

	}

	function handleResize() {

		data.deck.offsetY = data.deck.el.getBoundingClientRect().top + window.pageYOffset;

	}

	function handleScroll() {

		var y;

		y = window.pageYOffset;

		if ( y > data.deck.offsetY ) {
			data.graphic.setAttribute( 'style', 'position: absolute; top: ' + data.deck.offsetY + 'px;' );
		} else {
			data.graphic.setAttribute( 'style', 'position: fixed;' );
		}

	}

})();
