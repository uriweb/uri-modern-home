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

		var baseURL = '../../wp-content/themes/uri-modern-home/features/2018/space-invaders/';

		data = {
			'unit': 16, // Increment by which creatures should be placed
			'status': 0, // 0 = not started, 1 = running, 2 = game over
			'pointcap': 50, // Game over threshold
			'creatures': {},
			'container': {},
			'score': {
				'spawned': 0,
				'removed': 0
			},
			'audio': {
				'bounce': new Audio( baseURL + 'mp3/bounce.mp3' ),
				'elevate': new Audio( baseURL + 'mp3/elevate.mp3' ),
				'shoot': new Audio( baseURL + 'mp3/shoot.mp3' ),
				'end': new Audio( baseURL + 'mp3/end.mp3' ),
				'menu': new Audio( baseURL + 'mp3/menu.mp3' )
			}
		};

		// Get the habitat habitat el
		data.habitat = document.getElementById( 'creature-box' ).querySelector( '.creatures' );

		// Get the startscreen wrapper
		data.startscreen = document.getElementById( 'startscreen' );

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

		populateCreatureBox();

		// Get the play button
		data.play = document.getElementById( 'play-game' );
		data.play.addEventListener(
			 'click',
			function() {
			playAudio( data.audio.menu );
			setTimeout( startGame, 1000 );
		},
			false
			);

		// Get the reset button
		data.reset = document.getElementById( 'reset-game' );
		data.reset.addEventListener(
			 'click',
			function() {
			playAudio( data.audio.menu );
			setTimeout( resetGame, 1000 );
		},
			false
			);

		// Get the progress bar
		data.progress = document.getElementById( 'progress-bar' );

		// Get the end screen
		data.endscreen = document.getElementById( 'endscreen' );

		window.addEventListener( 'scroll', handleScroll, false );
		window.addEventListener( 'resize', handleResize, false );

	}

	function startGame() {

		var t;

		data.startscreen.classList.add( 'hidden' );
		data.status = 1;
		updateScore();

		t = 3000;

		data.starttimer = function( tick, factor ) {
			return function() {
				if ( --tick >= 0 ) {

					window.setTimeout( data.starttimer, t - factor );
					addCreature();

					if ( t - factor > 300 ) {
						factor += 50;
					}

				}

			}
		}( 5000, 0 );

		window.setTimeout( data.starttimer, t );

	}

	function endGame() {

		var x;

		data.starttimer = false;
		data.status = 2;

		data.container.el.classList.add( 'endgame' );
		data.endscreen.classList.add( 'visible' );

		data.audio.end.play();

		x = 0;

		data.endtimer = window.setInterval(
			 function() {

					 addCreature();

					 if ( ++x === 500 ) {
					   window.clearInterval( data.endtimer );
						}

		},
			50
			);

	}

	function resetGame() {

		// Clear any existing gameplay
		window.clearInterval( data.endtimer );
		data.container.el.innerHTML = '';

		data.container.el.classList.remove( 'endgame' );
		data.endscreen.classList.remove( 'visible' );
		data.score.spawned = 0;
		data.score.removed = 0;

		startGame();

	}

	function updateScore() {

		var remaining, percent;

		if ( 1 == data.status ) {

			remaining = data.score.spawned - data.score.removed;

			data.score.board.spawned.innerHTML = data.score.spawned;
			data.score.board.removed.innerHTML = data.score.removed;
			data.score.board.remaining.innerHTML = remaining;

			percent = 100 / data.pointcap * remaining;

			data.progress.style.width = percent + '%';

			if ( 50 > percent ) {
				data.progress.classList.remove( 'alert' );
			} else if ( 75 > percent ) {
				data.progress.classList.remove( 'warning' );
				data.progress.classList.add( 'alert' );
			} else if ( 90 > percent ) {
				data.progress.classList.remove( 'alert', 'danger' );
				data.progress.classList.add( 'warning' );
			} else if ( 100 > percent ) {
				data.progress.classList.remove( 'warning' );
				data.progress.classList.add( 'danger' );
			}

			if ( data.pointcap == remaining ) {
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

		list = data.container.el.querySelectorAll( '.' + type + ':not(.destroyed)' );
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
			x = Math.min( data.container.x - 128, Math.max( data.creatures[target].x + ( data.unit * Math.floor( Math.random() * 17 - 8 ) ) ) );
			y = Math.min( data.container.y, Math.max( 256, data.creatures[target].y + ( data.unit * Math.floor( Math.random() * 17 - 8 ) ) ) );
		} else {
			x = data.unit * Math.floor( Math.random() * ( data.container.x / data.unit ) );
			y = Math.max( 256, data.unit * Math.floor( Math.random() * ( data.container.y / data.unit ) ) );
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
			'y': y,
			'type': creature.type,
			'status': 1
		};

		// Put the creature on the page
		data.container.el.appendChild( div );
		data.score.spawned++;

		updateScore();

	}

	function removeCreature( id ) {

		var creature;

		switch ( data.creatures[id].type ) {
			case 'crab':
				playAudio( data.audio.elevate );
				break;
			case 'tunicate-1':
			case 'tunicate-2':
				playAudio( data.audio.bounce );
				break;
			case 'seaweed-1':
				playAudio( data.audio.shoot );
				break;
			default:
				playAudio( data.audio.shoot );
		}

		creature = document.getElementById( id );
		creature.classList.add( 'destroyed' );

		data.creatures[id].status = 0;
		data.score.removed++;
		updateScore();

	}

	function playAudio( clip ) {

		if ( clip.paused ) {
			clip.play();
		} else {
			clip.currentTime = 0
		}

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

		var i, creatures, creature, x, z;

		creatures = document.createElement( 'div' );

		for ( i = 0; i < 15; i++ ) {

			creature = getCreature();

			x = data.unit * Math.floor( ( Math.random() * 48 ) + 1 );
			z = Math.floor( ( Math.random() * 10 ) + 1 );

			creature.div.style = 'left:' + x + 'px; z-index:' + z;

			creatures.appendChild( creature.div );

		}

		data.habitat.appendChild( creatures );

	}

})();
