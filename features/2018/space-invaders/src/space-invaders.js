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

		var baseURL, game;

		baseURL = '../../wp-content/themes/uri-modern-home/features/2018/space-invaders/';

		data = {
			'unit': 16, // Increment by which creatures should be placed
			'status': 0, // 0 = not started, 1 = running, 2 = game over, 3 = paused
			'pointcap': 50, // Game over threshold
			'n': 0,
			'story': {
				'h': document.getElementById( 'story' ).offsetHeight,
				'top': document.getElementById( 'story' ).getBoundingClientRect().top
			},
			'buttons': {},
			'creatures': {},
			'container': {},
			'score': {
				'points': 0,
				'spawned': 0,
				'removed': 0,
				'board': {}
			},
			'timing': {
				'init': 2000, // Initial interval between spawns
				'duration': 60000 // Time until max spawn rate (approx)
			},
			'audio': {
				'bounce': new Audio( baseURL + 'mp3/bounce.mp3' ),
				'elevate': new Audio( baseURL + 'mp3/elevate.mp3' ),
				'shoot': new Audio( baseURL + 'mp3/shoot.mp3' ),
				'end': new Audio( baseURL + 'mp3/end.mp3' ),
				'menu': new Audio( baseURL + 'mp3/menu.mp3' )
			}
		};
		
		game = document.createElement( 'div' );
		game.id = 'game';

		
		/**
		 * Make the creature box habitat
		 */
		var habitat;
		
		habitat = document.createElement( 'div' );
		habitat.id = 'creature-box';
		data.habitat = document.createElement( 'div' );
		data.habitat.className = 'creatures';
		habitat.appendChild( data.habitat );

		
		/**
		 * Make the startscreen
		 */
		data.startscreen = document.createElement( 'div' );
		data.startscreen.id = 'startscreen';
		
		var modal, header;
		
		modal = document.createElement( 'div' );
		modal.className = 'modal';
		
		header = document.createElement( 'div' );
		header.id = 'story-header';
		header.innerHTML = '<h1>Space <br> Invaders</h1>';
		
		data.buttons.play = document.createElement( 'div' );
		data.buttons.play.id = 'play-game';
		data.buttons.play.className = 'retro-button';
		data.buttons.play.innerHTML = 'play';
		header.appendChild( data.buttons.play );
		
		modal.appendChild( header );
		modal.appendChild( habitat );
		
		data.startscreen.appendChild( modal );
		
		game.appendChild( data.startscreen );

		
		/**
		 * Make the end screen
		 */
		data.endscreen = document.createElement( 'div' );
		data.endscreen.id = 'endscreen';
		data.endscreen.className = 'modal';
		data.endscreen.innerHTML = '<h1>Game <br> Over</h1>';
		
		data.buttons.reset = document.createElement( 'div' );
		data.buttons.reset.id = 'reset-game';
		data.buttons.reset.className = 'retro-button';
		data.buttons.reset.innerHTML = 'play again';
		data.endscreen.appendChild( data.buttons.reset );
		
		game.appendChild( data.endscreen );
		
		
		/**
		 * Make the creature container
		 */
		data.container.el = document.createElement( 'div' );
		data.container.el.id = 'creature-container';
		game.appendChild( data.container.el );
		
		
		/**
		 * Make the scoreboard
		 */
		data.score.board.el = document.createElement( 'div' );
		data.score.board.el.id = 'scoreboard';
		
		data.buttons.controls = document.createElement( 'div' );
		data.buttons.controls.id = 'controls';
		data.score.board.el.appendChild( data.buttons.controls );
		
		// Add buttons to the scoreboard
		data.buttons.pause = document.createElement( 'div' );
		data.buttons.pause.id = 'pause-game';
		data.buttons.pause.innerHTML = 'pause';
		data.buttons.controls.appendChild( data.buttons.pause );
		
		data.buttons.resume = document.createElement( 'div' );
		data.buttons.resume.id = 'resume-game';
		data.buttons.resume.innerHTML = 'resume';
		data.buttons.controls.appendChild( data.buttons.resume );
		
		var scores, points, remaining, progress;
		
		scores = document.createElement( 'div' );
		scores.id = 'scores';
		
		points = document.createElement( 'div' );
		points.id = 'points';
		points.innerHTML = '<div class="label">score</div>';
		data.score.board.points = document.createElement( 'div' );
		data.score.board.points.className = 'score';
		data.score.board.points.innerHTML = 0;
		points.appendChild( data.score.board.points );
		scores.appendChild( points );
		
		remaining = document.createElement( 'div' );
		remaining.id = 'remaining';
		remaining.innerHTML = '<div class="label">invaders</div>';
		data.score.board.remaining = document.createElement( 'div' );
		data.score.board.remaining.className = 'score';
		data.score.board.remaining.innerHTML = 0;
		points.appendChild( data.score.board.remaining );
		scores.appendChild( remaining );
		
		data.score.board.el.appendChild( scores );
		
		progress = document.createElement( 'div' );
		progress.id = 'progress';
		data.progress = document.createElement( 'div' );
		data.progress.id = 'progress-bar';
		progress.appendChild( data.progress );
		progress.innerHTML += '<div id="progress-label">Complete Invasion! --></div>';
		
		data.score.board.el.appendChild( progress );
		
		game.appendChild( data.score.board.el );
		
		/**
		 * Put the game on the page
		 */
		document.getElementById( 'main' ).appendChild( game );		
		
		
		
		
		
		// Get some specs once everything's on the page
		data.score.board.h = data.score.board.el.offsetHeight;
		data.container.el.style.height = 'calc( 100vh - ' + data.score.board.h + 'px)';
		data.container.x = data.container.el.offsetWidth;
		data.container.y = data.container.el.offsetHeight;

		disableScroll();
		populateCreatureBox();

		// Get the play button
		data.buttons.play.addEventListener(
			 'click',
			function() {
			playAudio( data.audio.menu );
			setTimeout( startGame, 1000 );
		},
			false
			);

		// Get the reset button
		data.buttons.reset.addEventListener(
			 'click',
			function() {
			playAudio( data.audio.menu );
			setTimeout( resetGame, 1000 );
		},
			false
			);

		// Get the pause button
		data.buttons.pause.addEventListener(
			 'click',
			function() {
				if ( 1 == data.status ) {
					playAudio( data.audio.menu );
					pauseGame();
				}
		},
			false
			);

		// Get the resume button
		data.buttons.resume.addEventListener(
			 'click',
			function() {
				if ( 3 == data.status ) {
					playAudio( data.audio.menu );
					resumeGame();
				}
		},
			false
			);

		window.addEventListener( 'resize', handleResize, false );

	}

	function startGame() {

		var init, duration, start;

		data.startscreen.classList.add( 'hidden' );
		enableScroll();

		// Don't restart the game if it's already playing
		// (prevents multiple instances)
		if ( 1 != data.status ) {

			data.status = 1;
			updateScore();

			data.timing.start = Date.now();

			setTimeout( ticker, data.timing.init );

		}

	}

	function ticker() {

		var millis, y, min;

		if ( 1 == data.status ) {

			millis = Date.now() - data.timing.start;
			y = ease( (millis / data.timing.duration ) * 100 , data.timing.duration );
			min = Math.max( 200, Math.min( 350, ( data.container.x * data.container.y / 1000000 ) * 300 ) );
			data.timing.interval = Math.max( min, data.timing.init - ( data.timing.init * y ) );

			addCreature()
			data.n++;
			setTimeout( ticker, data.timing.interval );

		}

	}

	function pauseGame() {

		data.status = 3;
		data.timing.paused = Date.now();
		data.container.el.classList.add( 'paused' );
		data.buttons.controls.classList.add( 'paused' );

	}

	function resumeGame() {

		var resume = Date.now();

		data.status = 1;
		data.timing.start += resume - data.timing.paused;
		data.container.el.classList.remove( 'paused' );
		data.buttons.controls.classList.remove( 'paused' );

		setTimeout( ticker, data.timing.interval );

	}

	function endGame() {

		var x;

		data.status = 2;

		data.container.el.classList.add( 'endgame' );
		data.endscreen.classList.add( 'visible' );
		data.score.board.remaining.innerHTML = '>' + data.pointcap;

		data.audio.end.play();

		x = 0;

		data.endtimer = window.setInterval(
			 function() {

					 addCreature();

					 if ( ++x === 500 ) {
					   window.clearInterval( data.endtimer );
						}

		},
			20
			);

	}

	function resetGame() {

		// Clear any existing gameplay
		window.clearInterval( data.endtimer );
		data.container.el.innerHTML = '';

		data.container.el.classList.remove( 'endgame' );
		data.endscreen.classList.remove( 'visible' );
		data.progress.className = '';
		data.score.points = 0;
		data.score.spawned = 0;
		data.score.removed = 0;
		data.n = 0;

		startGame();

	}

	function updateScore() {

		var remaining, percent;

		if ( 1 == data.status ) {

			remaining = data.score.spawned - data.score.removed;

			data.score.board.points.innerHTML = data.score.points;
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

		var creature, target, p, boundary, div, x, y, z, id;

		creature = getCreature();
		target = getRandomExistingCreatureID( creature.type );

		// Generate a random ID
		id = 'c_' + Math.random().toString( 36 ).substr( 2, 9 );

		boundary = {
			'left': 0,
			'right': data.container.x - 128,
			'top': Math.max( 128, data.container.y - data.n * 16 ),
			'bottom': data.container.y - data.score.board.h
		}

		p = Math.floor( ( Math.random() * 1000 ) );

		// 70% of the time, position the new creature near another same-type creature, unless it's a crab
		// Otherwise, position it randomly
		if ( 700 > p && null != target && 'crab' != creature.type) {
			x = Math.min( boundary.right, Math.max( 128, data.creatures[target].x + ( data.unit * Math.floor( Math.random() * 17 - 8 ) ) ) );
			y = Math.min( boundary.bottom, Math.max( 128, data.creatures[target].y + ( data.unit * Math.floor( Math.random() * 17 - 8 ) ) ) );
		} else {
			x = Math.max( boundary.left, data.unit * Math.floor( Math.random() * ( boundary.right / data.unit ) ) );
			y = Math.max( boundary.top, data.unit * Math.floor( Math.random() * ( boundary.bottom / data.unit ) ) );
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

		var creature, pointValue;

		switch ( data.creatures[id].type ) {
			case 'crab':
				playAudio( data.audio.elevate );
				pointValue = 30;
				break;
			case 'tunicate-1':
				playAudio( data.audio.bounce );
				pointValue = 10;
				break;
			case 'tunicate-2':
				playAudio( data.audio.bounce );
				pointValue = 30;
				break;
			case 'seaweed-1':
				playAudio( data.audio.shoot );
				pointValue = 20;
				break;
			default:
				playAudio( data.audio.shoot );
				pointValue = 10;
		}

		creature = document.getElementById( id );
		creature.classList.add( 'destroyed' );

		data.creatures[id].status = 0;
		data.score.removed++;
		data.score.points += pointValue;
		updateScore();

	}

	function playAudio( clip ) {

		if ( clip.paused ) {
			clip.play();
		} else {
			clip.currentTime = 0
		}

	}

	function ease( x, duration ) {
		var y = ( x * ( x / duration ) );
		return Math.round( y * 1000 ) / 1000
	}

	function handleResize() {
		data.score.board.h = data.score.board.el.offsetHeight;
		data.container.el.style.height = 'calc( 100vh - ' + data.score.board.h + 'px)';
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

	function preventDefault(e) {

		e = e || window.event;

		if ( e.preventDefault ) {
			e.preventDefault();
		}

		e.returnValue = false;

	}

	function preventDefaultForScrollKeys( e ) {

		var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

		if ( keys[e.keyCode] ) {

			preventDefault( e );
			return false;

		}

	}

	function disableScroll() {

		if ( window.addEventListener ) { // older FF
			window.addEventListener( 'DOMMouseScroll', preventDefault, false );
		}

		window.onwheel = preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
		window.ontouchmove  = preventDefault; // mobile
		document.onkeydown  = preventDefaultForScrollKeys;

	}

	function enableScroll() {

		if ( window.removeEventListener ) {
			window.removeEventListener( 'DOMMouseScroll', preventDefault, false );
		}

		window.onmousewheel = document.onmousewheel = null;
		window.onwheel = null;
		window.ontouchmove = null;
		document.onkeydown = null;

	}

})();
