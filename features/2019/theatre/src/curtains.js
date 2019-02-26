/**
 * Curtains
 *
 * @package uri-modern-home
 */


( function() {

	window.addEventListener( 'load', init, false );

	var data = {}

	function init() {

		data.curtains = document.querySelectorAll( '.story-direction-wrapper' );

		getTriggerPoints();
		getWindowSpecs();

		window.addEventListener( 'resize', getWindowSpecs(), false );

		console.log( data );

	}

	function getTriggerPoints() {

		var i;

		data.triggers = [];

		for ( i = 0; i < data.curtains.length; i++ ) {
			data.triggers.push( data.curtains[i].getBoundingClientRect().top );
		}

	}

	function getWindowSpecs() {

		data.window = {
			h: window.innerHeight,
			w: window.innerWidth,
		}

	}

})();
