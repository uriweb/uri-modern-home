/**
 * FIRST AMENDMENT -- CONTENT
 *
 * @package uri-modern-home
 */

( function() {
	'use strict';

	window.addEventListener( 'load', init, false );

	const data = {};

	function init() {
		document.body.classList.add( 'has-js' );
		data.els = document.querySelectorAll( '.story-overflow' );

		for ( let i = 0; i < data.els.length; i++ ) {
			setupStory( data.els[ i ] );
		}

		navigation();
	}

	function setupStory( el ) {
		const parent = el.parentElement;
		const div = document.createElement( 'div' );
		div.className = 'overflow-toggle';
		div.innerHTML = 'Continue reading';

		div.addEventListener(
			'click',
			function() {
				parent.classList.add( 'overflow-visible' );
			},
			false
		);

		parent.insertBefore( div, el );
	}

	function navigation() {
		const nav = document.getElementById( 'story-navigation' );
		const links = nav.querySelectorAll( 'a' );

		for ( let i = 0; i < links.length; i++ ) {
			setUpNavLink( links[ i ] );
		}

		const panels = nav.querySelectorAll( '.nav-panel' );
		for ( let i = 0; i < panels.length; i++ ) {
			setUpNavPanel( panels[ i ] );
		}
	}

	function setUpNavLink( a ) {
		const grandparent = a.parentElement.parentElement.parentElement;
		const id = grandparent.getAttribute( 'id' );
		const section = document.getElementById( id.replace( 'nav-panel-', '' ) );
		const expander = section.querySelector( '.overflow-toggle' );
		const anchor = a.getAttribute( 'href' ).replace( '#', '' );

		a.addEventListener( 'click', function( e ) {
			e.preventDefault();
			expander.click();
			document.getElementById( anchor ).scrollIntoView( { behavior: 'smooth', block: 'start', inline: 'nearest' } );
		}, false );
	}

	function setUpNavPanel( p ) {
		const id = p.getAttribute( 'id' );
		const section = document.getElementById( id.replace( 'nav-panel-', '' ) );

		p.addEventListener( 'click', function( e ) {
			if ( 'A' !== e.target.nodeName ) {
				section.scrollIntoView( { behavior: 'smooth', block: 'start', inline: 'nearest' } );
			}
		}, false );
	}
}() );
