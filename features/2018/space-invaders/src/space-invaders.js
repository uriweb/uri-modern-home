/**
 * SPACE INVADERS
 *
 * @package uri-modern-home
 */

( function() {

	'use strict';

	var data;

	window.addEventListener( 'load', initInvaders, false );

	function initInvaders() {

		data = {
			'creatureBox': {},
			'storyBox': {},
			'creatures': {},
			'scoring': {
				'scoreboard': {},
				'spawned': 0,
				'removed': 0
			}
		};
		
		data.unit = 16;
		data.creatureBox.el = document.getElementById( 'creature-box' ).querySelector( '.creatures' );
		
		data.storyBox.el = document.getElementById( 'story' );
		data.storyBox.x = data.storyBox.el.offsetWidth;
		data.storyBox.y = data.storyBox.el.offsetHeight;
		
		data.clearButton = document.getElementById( 'clear-creatures' );
		data.clearButton.addEventListener( 'click', clearCreatureBox, false );
		
		data.scoring.scoreboard.spawned = document.getElementById( 'spawned' ).querySelector( '.score' );
		data.scoring.scoreboard.removed = document.getElementById( 'removed' ).querySelector( '.score' );
		data.scoring.scoreboard.remaining = document.getElementById( 'remaining' ).querySelector( '.score' );

		populateCreatureBox();
		populateStoryBox();

	}

	function populateStoryBox() {
		setInterval( addStoryBoxCreature, 3000 );
	}

	function populateCreatureBox() {
		setIntervalX( addCreatureBoxCreature, 50, 15 );
	}

	function setIntervalX( callback, delay, repetitions ) {

		var x, intervalID;

		x = 0;
		intervalID = window.setInterval(
			 function () {

					callback();

					if (++x === repetitions) {
						 window.clearInterval( intervalID );
						  }

		},
			delay
			);

	}

	function clearCreatureBox() {
		data.creatureBox.el.innerHTML = '';
		populateCreatureBox();
	}
	
	function updateScore() {
		
		data.scoring.scoreboard.spawned.innerHTML = data.scoring.spawned;
		data.scoring.scoreboard.removed.innerHTML = data.scoring.removed;
		data.scoring.scoreboard.remaining.innerHTML = data.scoring.spawned - data.scoring.removed;
		
	}

	function getCreature() {

		var creature = {}, speed, n, s;

		n = Math.floor( Math.random() * 1000 );
		s = Math.floor( ( Math.random() * 3 ) + 1 );

		if ( 350 > n ) {
			creature.type = 'tunicate-1';
		} else if ( 700 > n ) {
			creature.type = 'tunicate-2';
		} else if ( 900 > n ) {
			creature.type = 'seaweed-1';
		} else if ( 1000 > n ) {
			creature.type = 'crab';
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

		creature.div = document.createElement( 'div' );
		creature.div.className = 'creature ' + creature.type + ' ' + speed;

		return creature;

	}
	
	function getRandomExistingCreatureID( type ) {
		
		var list, n;
		
		list = data.storyBox.el.querySelectorAll( '.' + type );
		n = Math.floor( ( Math.random() * list.length ) );
		
		return list.length > 0 ? list[n].parentNode.getAttribute( 'id' ) : null;
		
	}

	function addCreatureBoxCreature() {

		var creature, x, z;

		creature = getCreature();

		x = data.unit * Math.floor( ( Math.random() * 48 ) + 1 );
		z = Math.floor( ( Math.random() * 10 ) + 1 );

		creature.div.style = 'left:' + x + 'px; z-index:' + z;

		data.creatureBox.el.appendChild( creature.div );

	}

	function addStoryBoxCreature() {

		var creature, target, p, div, x, y, z, id;

		creature = getCreature();
		target = getRandomExistingCreatureID( creature.type );
		
		// Generate a random ID
		id = 'c_' + Math.random().toString( 36 ).substr( 2, 9 );
		
		p = Math.floor( ( Math.random() * 1000 ) );
		
		// 70% of the time, position the new creature near another same-type creature, unless it's a crab
		// Otherwise, position it randomly
		if ( 700 > p && null != target && 'crab' != creature.type) {
			x = Math.min( data.storyBox.x, Math.max( 0, data.creatures[target].x + ( data.unit * Math.floor( Math.random() * ( 17 ) - 8 ) ) ) );
			y = Math.min( data.storyBox.y, Math.max( 0, data.creatures[target].y + ( data.unit * Math.floor( Math.random() * ( 17 ) - 8 ) ) ) );
		} else {
			x = data.unit * Math.floor( Math.random() * ( data.storyBox.x / data.unit ) );
			y = data.unit * Math.floor( Math.random() * ( data.storyBox.y / data.unit ) );
		}
		
		// Get a random value for z-index
		z = Math.floor( ( Math.random() * 10 ) + 1 );
		
		// Make the creature wrapper and creature
		div = document.createElement( 'div' );
		div.id = id;
		div.className = 'creature-wrapper';
		div.style = 'top:' + y + 'px; left:' + x + 'px; z-index:' + z;
		div.appendChild( creature.div );
		div.addEventListener( 'click', removeCreature.bind( null, id ), false );

		// Add it to the database
		data.creatures[id] = { 
			'x': x, 
			'y': y
		};
		
		// Put the creature on the page
		data.storyBox.el.appendChild( div );
		data.scoring.spawned++;
		updateScore();

	}
	
	function removeCreature( id ) {
		
		var creature;
		
		creature = document.getElementById( id );
		creature.parentNode.removeChild( creature );
		
		delete data.creatures[id];
		data.scoring.removed++;
		updateScore();
		
	}

})();
