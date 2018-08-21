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
		
		data.vh = window.innerHeight;
		data.vw = window.innerWidth;
		
		data.bar = document.getElementById( 'progress' );
		data.bar.classList.add( 'has-js' );
		
		data.indicator = data.bar.querySelector( '.progress-bar' );
		data.pos = data.bar.getBoundingClientRect().top;
		
		data.story = document.getElementById( 'story' );
		data.storyHeight =  data.story.offsetHeight;
		data.storyTop = data.story.offsetTop;
		
		data.scale = getProgressScale();
		
		setProgressScale( data );
		updateProgress( data );
				
		window.addEventListener( 'resize', function() {
			
			data.vh = window.innerHeight;
			data.vw = window.innerWidth;
			
			data.storyHeight =  data.story.offsetHeight;
			data.storyTop = data.story.offsetTop;
			
			setProgressScale( data );
			updateProgress( data );
			
		}, false );
		
		window.addEventListener( 'scroll', updateProgress.bind( null, data ), false );
		
	}
	
	
	/**
	 * Get the progress scale labels and depths
	 */
	function getProgressScale() {
		
		var scale = {}, i;
	
		scale.ticks = document.getElementById( 'progress' ).querySelectorAll( '.progress-label' );
		scale.depths = [];
		for ( i = 0; i < scale.ticks.length; i++ ) {
			scale.depths.push( scale.ticks[i].getAttribute( 'data-depth' ) );
		}
							  
		return scale;
		
	}
	
	
	/**
	 * Set/update the progress scale
	 *
	 * @param data obj The data initialized in initProgressBar().
	 */
	function setProgressScale( data ) {
		
		var n, i, bottom, range, maxDepth;
		
		n = data.scale.ticks.length;
		data.scale.waterline = Math.max( 2083, data.vw * 2.083 ) / data.storyHeight * 100;
		bottom = 98;
		range = bottom - data.scale.waterline;
		maxDepth = data.scale.depths[n - 1];
		
		data.bar.style.background = 'linear-gradient(to bottom, rgba(0,0,0,.4) calc( ' + data.scale.waterline + '% + 5px ), rgba(18,85,146,.4) calc( ' + data.scale.waterline + '% + 5px ))';
		
		data.scale.ticks[0].style.top = data.scale.waterline + '%';
		data.scale.ticks[n - 1].style.top = bottom + '%';
				
		for ( i = 1; i < n - 1; i++ ) {
			
			data.scale.ticks[i].style.top = data.scale.waterline + ( data.scale.depths[i] / maxDepth ) * range + '%';
			
		}
		
		
	}
	
	
	/**
	 * Update the progress bar
	 *
	 * @param data obj The data initialized in initProgressBar().
	 */
	function updateProgress( data ) {
		
		var yPos, prog;
		
		yPos = window.pageYOffset;
		
		// Calculate the progress as a percent between 0-97
		prog = Math.min( 97, Math.max( 0, ( yPos - data.storyTop ) / data.storyHeight * 100 ) );
		data.indicator.style.top =  prog + '%';
		
		// Swap out the rocket for the submarine at the waterline
		prog > data.scale.waterline - 1 ? data.indicator.classList.add( 'titan' ) : data.indicator.classList.remove( 'titan' );
		
		// If the page scroll is past the initial story top, make the progress bar sticky.
		// And, if the end of the story scrolls into view, move the progress bar along with it.
		if ( yPos > data.pos ) {
			data.bar.classList.add( 'sticky' );
			data.storyHeight + data.storyTop < yPos + data.vh - data.storyTop ? data.bar.classList.add( 'end' ) : data.bar.classList.remove( 'end' );
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