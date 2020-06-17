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
		const panelsParent = document.getElementById( 'nav-panels' );
		const links = panelsParent.querySelectorAll( 'a' );

		data.navPos = nav.offsetTop + nav.offsetHeight;

		for ( let i = 0; i < links.length; i++ ) {
			setUpNavLink( links[ i ] );
		}

		const panels = panelsParent.querySelectorAll( '.nav-panel' );
		for ( let i = 0; i < panels.length; i++ ) {
			setUpNavPanel( panels[ i ], nav );
		}

		const backbutton = document.createElement( 'div' );
		backbutton.className = 'nav-back-button';
		backbutton.innerHTML = 'Back';
		backbutton.addEventListener( 'click', function() {
			nav.setAttribute( 'data-active', '' );
		}, false );
		panelsParent.insertBefore( backbutton, panels[ 0 ] );

		const menubar = document.createElement( 'div' );
		menubar.id = 'nav-menubar';
		menubar.innerHTML = 'Sections';
		menubar.addEventListener( 'click', function() {
			nav.classList.toggle( 'nav-open' );
		}, false );
		nav.insertBefore( menubar, panelsParent );

		window.addEventListener( 'scroll', handleSticky.bind( null, nav ), false );
		window.addEventListener( 'resize', handleSticky.bind( null, nav ), false );
	}

	function handleSticky( nav ) {
		const y = window.pageYOffset;
		if ( y >= data.navPos ) {
			window.pageYOffset += nav.offsetHeight;
			nav.classList.add( 'sticky' );
		} else {
			nav.classList.remove( 'sticky' );
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

	function setUpNavPanel( p, nav ) {
		const id = p.getAttribute( 'id' );
		const name = id.replace( 'nav-panel-', '' );
		const section = document.getElementById( name );

		p.addEventListener( 'click', function( e ) {
			widthSwitcher( e, section, nav, name );
		}, false );
	}

	function widthSwitcher( e, section, nav, name ) {
		if ( 600 > window.innerWidth ) {
			nav.setAttribute( 'data-active', 'active-panel-' + name );
		} else if ( 'A' !== e.target.nodeName ) {
			section.scrollIntoView( { behavior: 'smooth', block: 'start', inline: 'nearest' } );
		}
	}
}() );
