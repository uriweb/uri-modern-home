/**
 * FIRST AMENDMENT -- CONTENT
 */

( function() {
	'use strict';

	window.addEventListener( 'load', init, false );

	const data = {};

	function init() {
		document.body.classList.add( 'has-js' );
		data.els = document.querySelectorAll( '.story-overflow' );

		for ( let i = 0; i < data.els.length; i++ ) {
			setupStory( data.els[ i ], i );
		}

		data.nav = document.querySelector( '.story-navigation' );
		data.navPos = data.nav.offsetTop + data.nav.offsetHeight;
		data.stickyWrapper = document.getElementById( 'sticky-nav-wrapper' );
		data.stickyNav = data.nav.cloneNode( true );
		data.stickyNav.classList.add( 'sticky' );
		data.stickyNav.setAttribute( 'data-active', 'no-active' );
		data.stickyWrapper.appendChild( data.stickyNav );

		navigation( data.nav, false );
		navigation( data.stickyNav, true );

		window.addEventListener( 'scroll', handleSticky, false );
		window.addEventListener( 'resize', handleSticky, false );

		deepLink();
	}

	function deepLink() {
		const a = getAnchor();

		if ( null !== a ) {
			handleAnchor( a );
		}
	}

	function getAnchor() {
		const currentUrl = document.URL,
			urlParts = currentUrl.split( '#' );

		return ( urlParts.length > 1 ) ? urlParts[ 1 ] : null;
	}

	function handleAnchor( a ) {
		const el = document.getElementById( a );
		const grandparent = el.parentElement.parentElement;

		if ( -1 === a.indexOf( 'part-' ) ) {
			const expander = grandparent.querySelector( '.overflow-toggle' );
			expander.click();
		}

		el.scrollIntoView( { behavior: 'smooth', block: 'start', inline: 'nearest' } );
	}

	function setupStory( el, i ) {
		const parent = el.parentElement;
		const div = document.createElement( 'div' );
		div.className = 'overflow-toggle overflow-part-' + ( i + 1 );
		div.innerHTML = 'Expand and continue reading';

		div.addEventListener(
			'click',
			function() {
				parent.classList.add( 'overflow-visible' );
			},
			false
		);

		parent.insertBefore( div, el );
	}

	function navigation( nav, isSticky ) {
		const panelsParent = nav.querySelector( '.nav-panels' );
		const links = panelsParent.querySelectorAll( 'a' );

		for ( let i = 0; i < links.length; i++ ) {
			setUpNavLink( links[ i ], nav );
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

		if ( isSticky ) {
			const menubar = document.createElement( 'div' );
			menubar.className = 'nav-menubar';
			menubar.innerHTML = 'Sections';
			menubar.addEventListener( 'click', toggleNavOpen.bind( null, nav ), false );
			nav.insertBefore( menubar, panelsParent );
		}
	}

	function toggleNavOpen( nav ) {
		nav.classList.toggle( 'nav-open' );
	}

	function handleSticky() {
		const y = window.pageYOffset;
		if ( y >= data.navPos ) {
			data.stickyWrapper.classList.add( 'visible' );
		} else {
			data.stickyWrapper.classList.remove( 'visible' );
			data.stickyNav.classList.remove( 'nav-open' );
		}
	}

	function setUpNavLink( a, nav ) {
		const grandparent = a.parentElement.parentElement.parentElement;
		const id = grandparent.getAttribute( 'class' );
		const section = document.getElementById( id.replace( 'nav-panel nav-panel-', '' ) );
		const expander = section.querySelector( '.overflow-toggle' );
		const anchor = a.getAttribute( 'href' ).replace( '#', '' );

		a.addEventListener( 'click', function( e ) {
			e.preventDefault();
			expander.click();
			toggleNavOpen( nav );
			document.getElementById( anchor ).scrollIntoView( { behavior: 'smooth', block: 'start', inline: 'nearest' } );
		}, false );
	}

	function setUpNavPanel( p, nav ) {
		const id = p.getAttribute( 'class' );
		const name = id.replace( 'nav-panel nav-panel-', '' );
		const section = document.getElementById( name );

		p.addEventListener( 'click', function( e ) {
			widthSwitcher( e, section, nav, name );
		}, false );
	}

	function widthSwitcher( e, section, nav, name ) {
		if ( 600 > window.innerWidth || nav.classList.contains( 'sticky' ) ) {
			nav.setAttribute( 'data-active', 'active-panel-' + name );
		} else if ( 'A' !== e.target.nodeName ) {
			toggleNavOpen( nav );
			section.scrollIntoView( { behavior: 'smooth', block: 'start', inline: 'nearest' } );
		}
	}
}() );
