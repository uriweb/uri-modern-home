/**
 * BLUE MINDS - STORY SCRIPT
 */


( function() {

  'use strict';

  var data = {};

  window.addEventListener( 'load', init, false );

  function init() {

		var stories, i, a, s, id;

		document.body.classList.add( 'has-js' );

		stories = document.querySelectorAll( 'section.story' );

		for ( i = 0; i < stories.length; i++ ) {
		  id = stories[i].getAttribute( 'id' );
		  setupStory( id, stories[i] );
		}

    setupReadMode();
    deepLink();

  }

  function deepLink() {

    var a;

    a = getAnchor();

    if ( null != a ) {
      handleClick( document.getElementById( a ) );
    }

  }

  function getAnchor() {

    var currentUrl = document.URL,
  	urlParts   = currentUrl.split('#');

    return ( urlParts.length > 1 ) ? urlParts[1] : null;

  }

  function setupStory( id, story ) {

		data[id] = {
		  section: story,
		  iframe: story.querySelector( 'iframe' ),
		  a: story.querySelector( 'a.teaser-click-target' )
			}

		if ( data[id].iframe ) {

			data[id].player = new Vimeo.Player( data[id].iframe );

		data[id].player.on(
			 'loaded',
			function() {
			  this.pause();
		  },
		  false
			);

			data[id].section.addEventListener( 'mouseenter', handleMouseOver.bind( null, id ), false );
			data[id].section.addEventListener( 'mouseleave', handleMouseOut.bind( null, id ), false );

			}

		if ( ! data[id].section.classList.contains( 'external-content' ) ) {

			data[id].a.addEventListener(
			 'click',
			function( e ) {
		   e.preventDefault();
			handleClick( data[id].section );
			},
			false
			  );

			}

  }

  function handleClick( section ) {

		var classItem = 'open';

		if ( section.classList.contains( classItem ) ) {
		  section.classList.remove( classItem );
			} else {
		 section.classList.add( classItem );
			}

		section.scrollIntoView( { behavior: 'smooth', block: 'start', inline: 'nearest' } );

  }

  function handleMouseOver( id ) {

		data[id].player.play();

  }

  function handleMouseOut( id ) {

		data[id].player.pause();

  }

  function setupReadMode() {

    var light, dark;

    light = document.querySelector( '.read-mode-toggle .read-mode-toggle-light' );
    dark = document.querySelector( '.read-mode-toggle .read-mode-toggle-dark' );

    light.addEventListener( 'click', function() {
      document.body.classList.add( 'read-mode-light' );
    }, false );

    dark.addEventListener( 'click', function() {
      document.body.classList.remove( 'read-mode-light' );
    }, false );

  }

})();
