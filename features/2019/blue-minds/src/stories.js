/* ==============================
   BLUE MINDS - STORY SCRIPT
   ============================== */


( function() {

  'use strict';

  var data = {};

  window.addEventListener( 'load', init, false );

  function init() {

    var i, a, s;

    document.body.classList.add( 'has-js' );

    data.stories = document.querySelectorAll( 'section.story' );

    //console.log( data.stories );

    for ( i = 0; i < data.stories.length; i++ ) {

      a = data.stories[i].querySelector( 'a.story-hero' );

      a.addEventListener( 'click', function(e) {
        e.preventDefault();
        handleClick( this );
      }, false );

    }

  }

  function handleClick( a ) {

    var id, el;

    id = a.getAttribute( 'data-id' );
    el = document.getElementById( id );

    if ( el.classList.contains( 'open' ) ) {
      el.classList.remove( 'open' );
    } else {
      el.classList.add( 'open' );
      el.scrollIntoView( { behavior: 'smooth', block: 'start', inline: 'nearest' } );
    }

  }

})();
