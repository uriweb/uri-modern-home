/**
 * DESIGNING FOR THE SEA AND STARS
 */

( function() {
	'use strict';

	window.addEventListener( 'load', initPage, false );

	/**
	 * Initialize the page
	 */
	function initPage() {
		initParallax();
		initProgressBar();
	}

	/**
	 * Initialize Parallax
	 */
	function initParallax() {
		let vh, vw, s, yPos, y, i;

		const frames = document.querySelectorAll( '.parallax' );

		window.addEventListener(
			'scroll',
			function() {
				top = this.pageYOffset;
				vh = this.innerHeight;
				vw = this.innerWidth;

				for ( i = 0; i < frames.length; i++ ) {
					// Shift the frame offset so that the bottom of the viewport is now 0
					// This makes it so that frames don't move until they're scrolled into view
					y = frames[ i ].getBoundingClientRect().top - vh;

					// Adjust the speed to be relative to the viewport width
					s = frames[ i ].getAttribute( 'data-speed' ) * vw / 1000;

					// Set the y translation of the frame (only generates numbers <=0)
					yPos = Math.min( 0, ( y * s / 100 ) );
					frames[ i ].setAttribute( 'style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)' );
				}
			}
		);
	}

	/**
	 * Initialize the progress bar
	 */
	function initProgressBar() {
		// Define a bunch of stuff we can pass around inside one object
		const data = {
			vh: window.innerHeight,
			vw: window.innerWidth,
			lastPos: window.pageYOffset,
			bar: document.getElementById( 'progress' ),
			indicator: document.getElementById( 'indicator' ),
			scale: getProgressScale(),
			sky: document.getElementById( 'keyframe-backdrop-sky' ),
			story: document.getElementById( 'story' ),
		};

		// Get some measurements
		data.pos = data.story.getBoundingClientRect().top;
		data.storyHeight = data.story.offsetHeight;

		// Add a hook now that we have js
		data.bar.classList.add( 'has-js' );

		// Initialize the scale and update the indicator
		setProgressScale( data );
		updateProgress( data );

		// Update indicator on scroll
		window.addEventListener( 'scroll', updateProgress.bind( null, data ), false );

		// Update measurements, scale, and indicator on window resize
		window.addEventListener(
			'resize',
			function() {
				data.vh = window.innerHeight;
				data.vw = window.innerWidth;

				data.storyHeight = data.story.offsetHeight;

				setProgressScale( data );
				updateProgress( data );
			},
			false
		);
	}

	/**
	 * Get the progress scale labels and depths
	 */
	function getProgressScale() {
		let i;

		const scale = {
			ticks: document.getElementById( 'progress' ).querySelectorAll( '.progress-label' ),
			depths: [],
		};

		for ( i = 0; i < scale.ticks.length; i++ ) {
			scale.depths.push( scale.ticks[ i ].getAttribute( 'data-depth' ) );
		}

		return scale;
	}

	/**
	 * Set/update the progress scale
	 *
	 * @param {Object} data The data initialized in initProgressBar().
	 */
	function setProgressScale( data ) {
		let i;

		const n = data.scale.ticks.length;

		// Determine how far down the page (in percent) the waterline is
		data.scale.waterline = data.sky.offsetHeight / data.storyHeight * 100;

		// Define the offset (in percent) for the last tickmark
		const bottom = 98;

		// Set the progress bar offset margin
		data.bar.style.marginLeft = 'calc( -50vw + (' + getScrollbarWidth() + 'px / 2 ) )';

		// Set the background colors of the progress bar
		data.bar.style.background = 'linear-gradient(to bottom, rgba(0,0,0,.4) calc( ' + data.scale.waterline + '% + 5px ), rgba(18,85,146,.4) calc( ' + data.scale.waterline + '% + 5px ), rgba(0,20,40,.6) calc( 98% + 5px ), rgba(120,96,38,.5) calc( 98% + 5px ))';

		// Set the offsets for the first and last tickmark (in percent)
		data.scale.ticks[ 0 ].style.top = data.scale.waterline + '%';
		data.scale.ticks[ n - 1 ].style.top = bottom + '%';

		// Loop through the other tickmarks and calculate/set their offsets (in percent)
		for ( i = 1; i < n - 1; i++ ) {
			data.scale.ticks[ i ].style.top = data.scale.waterline + ( ( data.scale.depths[ i ] / data.scale.depths[ n - 1 ] ) * ( bottom - data.scale.waterline ) ) + '%';
		}
	}

	/**
	 * Update the progress bar
	 *
	 * @param {Object} data The data initialized in initProgressBar().
	 */
	function updateProgress( data ) {
		const yPos = window.pageYOffset;

		// Calculate the progress as a percent between 0-97
		const prog = Math.min( 97, Math.max( 0, yPos / data.storyHeight * 100 ) );
		data.indicator.style.top = prog + '%';

		// Swap out the rocket for the submarine at the waterline
		if ( prog > data.scale.waterline - 1 ) {
			data.indicator.classList.add( 'titan' );
		} else {
			data.indicator.classList.remove( 'titan' );
		}

		// Swap out the rocket flame for the parachute based on scroll direction
		if ( yPos < data.lastPos ) {
			data.indicator.classList.add( 'flame' );
		} else {
			data.indicator.classList.remove( 'flame' );
		}

		// Store the scroll position for later reference in determining scroll direction
		data.lastPos = yPos;

		// If the page scroll is past the initial story top, make the progress bar sticky.
		// And, if the end of the story scrolls into view, move the progress bar along with it.
		if ( yPos > data.pos ) {
			data.bar.classList.add( 'sticky' );
			if ( data.storyHeight + data.pos < yPos + data.vh ) {
				data.bar.classList.add( 'end' );
			} else {
				data.bar.classList.remove( 'end' );
			}
		} else {
			data.bar.classList.remove( 'sticky' );
		}
	}

	/*
	 * Get scrollbar width
	 *
	 * @see http://jsfiddle.net/UU9kg/17/
	 */
	function getScrollbarWidth() {
		const outer = document.createElement( 'div' );
		outer.style.visibility = 'hidden';
		outer.style.width = '100px';
		outer.style.msOverflowStyle = 'scrollbar'; // Needed for WinJS apps

		document.body.appendChild( outer );

		const widthNoScroll = outer.offsetWidth;

		// Force scrollbars
		outer.style.overflow = 'scroll';

		// Add innerdiv
		const inner = document.createElement( 'div' );
		inner.style.width = '100%';
		outer.appendChild( inner );

		const widthWithScroll = inner.offsetWidth;

		// Remove divs
		outer.parentNode.removeChild( outer );

		return widthNoScroll - widthWithScroll;
	}
}() );
