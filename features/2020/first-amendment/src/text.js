/**
 * FIRST AMENDMENT -- TEXT HERO ANIMATION
 *
 * @package uri-modern-home
 */

( function() {
	'use strict';

	window.addEventListener( 'load', init, false );

	const data = {};

	function init() {
		data.t = 'Congress shall make no law respecting an establishment of <span>religion</span>, or prohibiting the free exercise thereof; or abridging the freedom of <span>speech</span> or of <span>the press</span>; or the right of the people peaceably to <span>assemble</span>, and to <span>petition</span> the Government for a redress of grievances.';
		data.el = document.getElementById( 'amendment-text-bg' );
		data.story = {
			el: document.querySelector( '.story' ),
		};
		data.headline = {
			el: document.getElementById( 'headline' ),
		};
		data.status = false;
		data.amendment = {
			el: document.getElementById( 'amendment' ),
			heights: [],
		};
		data.amendment.spans = data.amendment.el.querySelectorAll( 'span' );

		let text = '';
		for ( let i = 0; i < 50; i++ ) {
			text += data.t + ' &mdash; ';
		}

		data.el.innerHTML = text;

		data.spans = data.el.querySelectorAll( 'span' );
		data.l = data.spans.length;

		window.addEventListener(
			'scroll',
			function() {
				updateVars();
				requestAnimationFrame( scroll );
			},
			false
		);

		window.addEventListener( 'resize', resize, false );
		resize();

		highlight();
	}

	function resize() {
		updateVars();

		let previous = -0.15 * data.vh;
		for ( let i = 0; i < data.amendment.spans.length; i++ ) {
			let h = ( data.amendment.spans[ i ].offsetHeight * .5 ) + 50;
			h += previous;
			data.amendment.heights.push( h );
			previous = h;
		}

		const max = 1920 * 1080;
		const p = Math.min( 1, ( data.vw * data.vh ) / max );

		data.threshold = Math.round( data.l * p );

		requestAnimationFrame( scroll );
	}

	function updateVars() {
		data.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		data.vh = window.innerHeight;
		data.vw = window.innerWidth;
		data.story.p = data.story.el.getBoundingClientRect().top + data.scrollTop;
		data.headline.p = data.headline.el.getBoundingClientRect().top + data.scrollTop;
	}

	function scroll() {
		if ( data.scrollTop > data.story.p ) {
			clearTimeout( data.timer );
			data.status = false;
		} else if ( false === data.status ) {
			highlight();
		}

		if ( data.scrollTop + ( 0.2 * data.vh ) > data.headline.p ) {
			data.el.classList.add( 'emphasis' );
			data.headline.el.classList.add( 'reveal' );
		} else {
			data.el.classList.remove( 'emphasis' );
			data.headline.el.classList.remove( 'reveal' );
		}

		if ( 0 <= data.scrollTop ) {
			data.amendment.el.setAttribute( 'data-level', '1' );
		}
		if ( data.amendment.heights[ 0 ] < data.scrollTop ) {
			data.amendment.el.setAttribute( 'data-level', '2' );
		}
		if ( data.amendment.heights[ 1 ] < data.scrollTop ) {
			data.amendment.el.setAttribute( 'data-level', '3' );
		}
		if ( data.amendment.heights[ 2 ] < data.scrollTop ) {
			data.amendment.el.setAttribute( 'data-level', '4' );
		}
		if ( data.amendment.heights[ 3 ] < data.scrollTop ) {
			data.amendment.el.setAttribute( 'data-level', '5' );
		}
		if ( data.amendment.heights[ 4 ] < data.scrollTop ) {
			data.amendment.el.setAttribute( 'data-level', '6' );
		}

		// const yPos = Math.max( 0, ( data.scrollTop * .3 ) );
		// data.amendment.el.setAttribute( 'style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)' );
	}

	function highlight() {
		const min = 200; // Min time
		const max = 1200; // Max time
		const duration = Math.floor( ( Math.random() * ( max - min + 1 ) ) + min );
		const i = Math.floor( ( Math.random() * data.threshold ) );

		data.status = true;

		data.spans[ i ].classList.add( 'active' );

		setTimeout(
			function() {
				data.spans[ i ].classList.remove( 'active' );
			},
			1000
		);

		data.timer = setTimeout( highlight, duration );
	}
}() );
