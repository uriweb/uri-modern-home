/**
 * THE INTERNATIONALISTS
 */

( function() {
	'use strict';

	let els, l;

	window.addEventListener(
		'load',
		function() {
			let i;

			els = document.querySelectorAll( '.artboard.reveal' );
			l = els.length;

			for ( i = 0; i < l; i++ ) {
				els[ i ].classList.add( 'has-js' );
			}

			showImages();
		}
	);

	window.addEventListener( 'scroll', showImages, false );
	window.addEventListener( 'resize', showImages, false );

	function showImages() {
		let offset, i;

		const vh = window.innerHeight;

		for ( i = 0; i < l; i++ ) {
			offset = els[ i ].getBoundingClientRect().top;

			if ( vh * .8 > offset ) {
				els[ i ].classList.add( 'visible' );
			}
		}
	}
}() );
