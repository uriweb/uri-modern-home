/**
 * VIDEO
 *
 * @package uri-modern-home
 */

( function() {
	'use strict';

	const data = [];

	window.addEventListener( 'load', initVideo, false );

	function initVideo() {
		const els = document.querySelectorAll( '.video-content' );

		for ( let i = 0; i < els.length; i++ ) {
			const id = els[ i ].querySelector( 'iframe' ).getAttribute( 'id' );
			setup( els[ i ], id );
		}
	}

	function setup( el, id ) {
		data[ id ] = {
			wrapper: el,
			overlay: el.querySelector( '.video-poster' ),
			video: el.querySelector( 'iframe' ),
			text: el.querySelector( '.action' ),
		};

		data[ id ].player = new Vimeo.Player( data[ id ].video );

		data[ id ].overlay.addEventListener( 'click', playVideo.bind( null, data[ id ] ), false );
		data[ id ].player.on( 'ended', resetVideo.bind( null, data[ id ] ) );
	}

	function playVideo( video ) {
		video.wrapper.classList.add( 'playing', 'watched' );
		video.player.play();
	}

	function resetVideo( video ) {
		video.wrapper.classList.remove( 'playing' );
		video.text.innerHTML = 'Rewatch';
	}
}() );
