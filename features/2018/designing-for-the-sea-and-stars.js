/**
 * DESIGNING FOR THE SEA AND STARS
 *
 * @package uri-modern-home
 */

( function() {
	
	'use strict';
	
	window.addEventListener( 'load', initPage, false );
	
	
	/**
	 * Initialize the page
	 */
	function initPage() {
		
		initProgressBar();
		initParallax();
		
	}
	
	
	/**
	 * Initialize the progress bar
	 */
	function initProgressBar() {
				
		var data = {};
		
		data.bar = document.getElementById( 'progress' );
		data.bar.classList.add( 'has-js' );
		
		data.div = data.bar.querySelector( '.progress-bar' );
		data.pos = data.bar.getBoundingClientRect().top;
		data.story = document.getElementById( 'story' );		
		
		window.addEventListener( 'resize', updateProgress.bind( null, data ), false );
		window.addEventListener( 'scroll', updateProgress.bind( null, data ), false);
		
		
	}
	
	
	/**
	 * Update the progress bar
	 *
	 * @param data obj The data initialized in initProgressBar().
	 */
	function updateProgress( data ) {
		
		var vh, storyHeight, storyTop, yPos, prog;
		
		vh = window.innerHeight;
		storyHeight =  data.story.offsetHeight;
		storyTop = data.story.offsetTop;
		yPos = window.pageYOffset;
		
		// Calculate the progress as a percent between 0-97
		prog = Math.min( 97, Math.max( 0, ( yPos - storyTop ) / storyHeight * 100 ) );
		data.div.style.top =  prog + '%';
		
		// If the progress is >29%, swap out the rocket for the submarine
		prog > 29 ? data.div.classList.add( 'titan' ) : data.div.classList.remove( 'titan' );
		
		// If the page scroll is past the initial story top, make the progress bar sticky.
		// And, if the end of the story scrolls into view, move the progress bar along with it.
		if ( yPos > data.pos ) {
			data.bar.classList.add( 'sticky' );
			storyHeight + storyTop - vh < yPos ? data.bar.classList.add( 'end' ) : data.bar.classList.remove( 'end' );
		} else {
			data.bar.classList.remove( 'sticky' );
		}
		
	}
	
	
	/**
	 * Initialize Parallax
	 */
	function initParallax() {
		
		var frames, top, vh, vw, s, yPos, y, i;
		
		frames = document.querySelectorAll( '.parallax' );
	
		window.addEventListener( 'scroll', function() {

			top = this.pageYOffset;
			vh = this.innerHeight;
			vw = this.innerWidth;

			for ( i = 0; i < frames.length; i++ ) {
				
				// Shift the frame offset so that the bottom of the viewport is now 0
				// This makes it so that frames don't move until they're scrolled into view
				y = frames[i].getBoundingClientRect().top - vh;	
				
				// Adjust the speed to be relative to the viewport width
				s = frames[i].getAttribute('data-speed') * vw / 1000;
				
				// Set the y translation of the frame (only generates numbers <=0)
				yPos = Math.min( 0, ( y * s / 100 ) );
				frames[i].setAttribute( 'style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)' );
			}
			
		});
		
	}
	
	
})();