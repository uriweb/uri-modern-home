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
			'unit': 16, // Increment by which creatures should be placed
			'status': 0, // 0 = not started, 1 = running, 2 = game over
			'creatures': {},
			'container': {},
			'score': {
				'spawned': 0,
				'removed': 0
			}
		};
		
		// Get the habitat habitat el
		data.habitat = document.getElementById( 'creature-box' ).querySelector( '.creatures' );

		// Get the creature container el and specs
		data.container.el = document.getElementById( 'creature-container' );
		data.container.x = data.container.el.offsetWidth;
		data.container.y = data.container.el.offsetHeight;

		// Get the scoreboard els and specs
		data.score.board = {
			'el': document.getElementById( 'scoreboard' ),
			'spawned': document.getElementById( 'spawned' ).querySelector( '.score' ),
			'removed': document.getElementById( 'removed' ).querySelector( '.score' ),
			'remaining': document.getElementById( 'remaining' ).querySelector( '.score' )
		}

		data.score.board.top = data.score.board.el.getBoundingClientRect().top;
			
		console.log( data);
		
		populateCreatureBox();
		//startGame();

		window.addEventListener( 'scroll', handleScroll, false );
		window.addEventListener( 'resize', handleResize, false );

	}

	function startGame() {
		data.status = 1;
		data.timer = setInterval( addCreature, 3000 );
	}
	
	function endGame() {
		
		window.clearInterval( data.timer );
		data.status = 2;
		
		data.container.el.classList.add( 'endgame' );
		data.score.board.el.classList.add( 'endgame' );
		
		setInterval( addCreature, 50 );
		
	}

	function updateScore() {

		var remaining;
		
		if ( 1 == data.status ) {
			
			remaining = data.score.spawned - data.score.removed;

			data.score.board.spawned.innerHTML = data.score.spawned;
			data.score.board.removed.innerHTML = data.score.removed;
			data.score.board.remaining.innerHTML = remaining;
			
			if ( 20 == remaining ) {
				endGame();
			}
			
		}

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

		list = data.container.el.querySelectorAll( '.' + type );
		n = Math.floor( ( Math.random() * list.length ) );

		return list.length > 0 ? list[n].parentNode.getAttribute( 'id' ) : null;

	}

	function addCreature() {

		var creature, target, p, div, x, y, z, id;

		creature = getCreature();
		target = getRandomExistingCreatureID( creature.type );

		// Generate a random ID
		id = 'c_' + Math.random().toString( 36 ).substr( 2, 9 );

		p = Math.floor( ( Math.random() * 1000 ) );

		// 70% of the time, position the new creature near another same-type creature, unless it's a crab
		// Otherwise, position it randomly
		if ( 700 > p && null != target && 'crab' != creature.type) {
			x = Math.min( data.container.x, Math.max( 0, data.creatures[target].x + ( data.unit * Math.floor( Math.random() * ( 17 ) - 8 ) ) ) );
			y = Math.min( data.container.y, Math.max( 0, data.creatures[target].y + ( data.unit * Math.floor( Math.random() * ( 17 ) - 8 ) ) ) );
		} else {
			x = data.unit * Math.floor( Math.random() * ( data.container.x / data.unit ) );
			y = data.unit * Math.floor( Math.random() * ( data.container.y / data.unit ) );
		}

		// Get a random value for z-index
		z = Math.floor( ( Math.random() * 10 ) + 1 );

		// Make the creature wrapper and creature
		div = document.createElement( 'div' );
		div.id = id;
		div.className = 'creature-wrapper';
		div.style = 'top:' + y + 'px; left:' + x + 'px; z-index:' + z;
		div.appendChild( creature.div );
		
		if ( 1 == data.status ) {
			div.addEventListener( 'click', removeCreature.bind( null, id ), false );
		}

		// Add it to the database
		data.creatures[id] = {
			'x': x,
			'y': y
		};

		// Put the creature on the page
		data.container.el.appendChild( div );
		data.score.spawned++;

		updateScore();

	}

	function removeCreature( id ) {

		var creature;

		creature = document.getElementById( id );
		creature.parentNode.removeChild( creature );

		delete data.creatures[id];
		data.score.removed++;
		updateScore();

	}
	
	function handleScroll() {

		var yPos = window.pageYOffset;

		if ( yPos > data.score.board.top ) {
			data.score.board.el.classList.add( 'fixed' );
		} else {
			data.score.board.el.classList.remove( 'fixed' );
		}

	}
	
	function handleResize() {
		data.container.x = data.container.el.offsetWidth;
		data.container.y = data.container.el.offsetHeight;
	}
	
	function populateCreatureBox() {
		
		var x, timer;
		
		x = 0;

		timer = window.setInterval( function() {
			
			addHabitatCreature();

			if ( ++x === 15 ) {
				window.clearInterval( timer );
			}
			
		}, 50 );
		
	}
	
	function addHabitatCreature() {

		var creature, x, z;

		creature = getCreature();

		x = data.unit * Math.floor( ( Math.random() * 48 ) + 1 );
		z = Math.floor( ( Math.random() * 10 ) + 1 );

		creature.div.style = 'left:' + x + 'px; z-index:' + z;

		data.habitat.appendChild( creature.div );

	}

})();
