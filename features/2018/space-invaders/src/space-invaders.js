/**
 * SPACE INVADERS
 *
 * @package uri-modern-home
 */

( function() {

	'use strict';

	var timer, creatureBox;

	window.addEventListener( 'load', initInvaders, false );

	function initInvaders() {

		creatureBox = document.getElementById( 'creature-box' ).querySelector( '.creatures' );

		addCreature();
		addCreature();
		addCreature();

		timer = setInterval( addCreature, 5500 );

		document.getElementById( 'clear-creatures' ).addEventListener( 'click', clearCreatures, false );

	}

	function clearCreatures() {
		creatureBox.innerHTML = '';
	}

	function addCreature() {

		var creature, speed, n, s, x, z, div;

		n = Math.floor( Math.random() * 1000 );
		s = Math.floor( ( Math.random() * 3 ) + 1 );
		x = 16 * Math.floor( ( Math.random() * 48 ) + 1 );
		z = Math.floor( ( Math.random() * 4 ) + 1 );

		if ( 350 > n ) {
			creature = 'tunicate-1';
		} else if ( 700 > n ) {
			creature = 'tunicate-2';
		} else if ( 900 > n ) {
			creature = 'seaweed-1';
		} else if ( 1000 > n ) {
			creature = 'crab';
		}

		switch ( s ) {
			case 1:
				speed = 'slow';
				break;
			case 2:
				speed = 'fast';
				break;
			default:
				speed = '';
				break;
		}

		div = document.createElement( 'div' );
		div.className = 'creature ' + creature + ' ' + speed;
		div.style = 'left:' + x + 'px; z-index:' + z;

		creatureBox.appendChild( div );

	}

})();
