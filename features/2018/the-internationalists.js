/**
 * THE INTERNATIONALISTS
 */

( function() {
	
	'use strict';
	
	var els, l;
	
	window.addEventListener( 'load', function() {
		els = document.querySelectorAll( '.artboard.reveal' );
		l = els.length;
		showImages;
	});
	
	window.addEventListener( 'scroll', showImages, false );
	window.addEventListener( 'resize', showImages, false );
	
	function showImages() {
		
		var vh, offset, i;
		
		vh = window.innerHeight;

		for ( i = 0; i < l; i++ ) {
			
			offset = els[i].getBoundingClientRect().top;
									
			if ( vh * .75 > offset ) {
				els[i].classList.add( 'visible' );
			}
			
		}
		
	}
	
})();