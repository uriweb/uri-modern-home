/**
 * THE INTERNATIONALISTS
 *
 * @package uri-modern-home
 */

( function() {

	'use strict';

	var els, l;

	window.addEventListener(
		 'load', function() {

		var i;

		els = document.querySelectorAll( '.artboard.reveal' );
		l = els.length;

		for ( i = 0; i < l; i++ ) {
				els[i].classList.add( 'has-js' );
		}

		showImages;

	}
		);

	window.addEventListener( 'scroll', showImages, false );
	window.addEventListener( 'resize', showImages, false );

	function showImages() {

		var vh, offset, i;

		vh = window.innerHeight;

		for ( i = 0; i < l; i++ ) {

			offset = els[i].getBoundingClientRect().top;

			if ( vh * .8 > offset ) {
				els[i].classList.add( 'visible' );
			}

		}

	}

})();
