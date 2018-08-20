/**
 * DESIGNING FOR THE SEA AND STARS
 *
 * @package uri-modern-home
 */

( function() {
	
	'use strict';
	
	window.addEventListener( 'load', initPage, false );
	
	function initPage() {
		
		initProgressBar();
		initParallax();
		
	}
	
	function initProgressBar() {
				
		var content, bar, div, pos;
		
		bar = document.getElementById( 'progress' );
		bar.classList.add( 'has-js' );
		
		div = bar.querySelector( '.progress-bar' );
		
		content = document.getElementById( 'story' );
		pos = bar.getBoundingClientRect().top;
		
		window.addEventListener( 'resize', updateProgress.bind( null, content, bar, pos, div ), false );
		window.addEventListener( 'scroll', updateProgress.bind( null, content, bar, pos, div ), false);
		
		
	}
	
	function updateProgress( content, bar, pos, div ) {
		
		var vh, contentHeight, contentTop, yPos, progress;
		
		vh = window.innerHeight;
		contentHeight =  content.offsetHeight;
		contentTop = content.offsetTop;
		yPos = window.pageYOffset;
		
		progress = Math.min( 97, Math.max( 0, ( yPos - contentTop ) / contentHeight * 100 ) );
		div.style.top =  progress + '%';
		if ( progress > 29 ) {
			div.classList.add( 'titan' );
		} else {
			div.classList.remove( 'titan' );
		}
		
		if ( pos < yPos ) {
			bar.classList.add( 'sticky' );
			
			if (contentHeight + contentTop - vh < yPos ) {
				bar.classList.add( 'end' );
			} else {
				bar.classList.remove( 'end' );
			}
			
		} else {
			bar.classList.remove( 'sticky' );
		}
		
	}
	
	function initParallax() {
		
		var frames, top, vh, vw, s, yPos, y, i;
		
		frames = document.querySelectorAll( '.parallax' );
	
		window.addEventListener( 'scroll', function() {

			top = this.pageYOffset;
			vh = this.innerHeight;
			vw = this.innerWidth;

			for ( i = 0; i < frames.length; i++ ) {
												
				y = frames[i].getBoundingClientRect().top - vh;		
				s = frames[i].getAttribute('data-speed') * vw / 1000;
				
				yPos = Math.min( 0, ( y * s / 100 ) );
				frames[i].setAttribute( 'style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)' );
			}
			
		});
		
	}
	
	
})();