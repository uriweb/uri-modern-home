/**
 * FIRST AMENDMENT -- CONTENT
 *
 * @package uri-modern-home
 */

( function () {

  'use strict';

  window.addEventListener( 'load', init, false );

  const data = {};

  function init() {

		document.body.classList.add( 'has-js' );
		data.els = document.querySelectorAll( '.story-overflow' );

		for ( let i = 0; i < data.els.length; i++ ) {
		  setupStory( data.els[i] );
			}

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

})();
