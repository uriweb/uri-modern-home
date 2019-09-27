/* ==============================
   BLUE MINDS - STORY SCRIPT
   ============================== */


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

  }

  function setupStory( id, story ) {

		data[id] = {
		  section: story,
		  iframe: story.querySelector( 'iframe' ),
		  a: story.querySelector( 'a.teaser-click-target' )
		}

    if ( data[id].iframe ) {

  		data[id].player = new Vimeo.Player( data[id].iframe );

      data[id].player.on( 'loaded', function() {
        this.pause();
      }, false );

  		data[id].section.addEventListener( 'mouseenter', handleMouseOver.bind( null, id ), false );
  		data[id].section.addEventListener( 'mouseleave', handleMouseOut.bind( null, id ), false );

    }

		data[id].a.addEventListener( 'click', function( e ) {
      e.preventDefault();
      handleClick( data[id].section );
		}, false );

  }

  function handleClick( section ) {

		var classItem = 'open';

		if ( section.classList.contains( classItem ) ) {
		  section.classList.remove( classItem );
			} else {
		  section.classList.add( classItem );
		  section.scrollIntoView( { behavior: 'smooth', block: 'start', inline: 'nearest' } );
			}

  }

  function handleMouseOver( id ) {

		data[id].player.play();

  }

  function handleMouseOut( id ) {

		data[id].player.pause();

  }

})();
