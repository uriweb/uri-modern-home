/**
 * DESIGNING FOR THE SEA AND STARS
 *
 * @package uri-modern-home
 */

( function() {
	
	'use strict';
	
	window.addEventListener( 'load', initPage, false );
	
	function initPage() {
		
		//initProgressBar();
		initParallax();
		
	}
	
	function initProgressBar() {
				
		var bar;
		
		bar = document.getElementById( 'page-progress' );
		window.addEventListener( 'resize', resizeProgress.bind( null, bar ), false );
		window.addEventListener( 'scroll', resizeProgress.bind( null, bar ), false);
		
		
	}
	
	function resizeProgress( bar ) {
		
		var ch, vh, pos, val;
		
		ch = document.getElementById( 'content' ).offsetHeight;
		vh = window.innerHeight;
		pos = window.pageYOffset;
				
		val = Math.min( pos / ( ch - vh ) * 100, 100 );
				
		bar.style.top = val + '%';
		
	}
	
	function initParallax() {
		
		var frames, top, vh, vw, speed, yPos, offset, f, i;
		
		frames = document.querySelectorAll( '.parallax' );
	
		window.addEventListener( 'scroll', function() {

			top = this.pageYOffset;
			vh = this.innerHeight;
			vw = this.innerWidth;

			for ( i = 0; i < frames.length; i++ ) {
				
				offset = frames[i].getBoundingClientRect().top;
								
				f = offset - vh;
								
				speed = frames[i].getAttribute('data-speed') * ( vw * 0.001 );
				yPos = Math.min( 0, ( f * speed / 100 ) );
				frames[i].setAttribute( 'style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)' );
			}
			
		});
		
	}
	
	
})();