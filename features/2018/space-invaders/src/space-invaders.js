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

		baseURL = URIMODERN.path.theme + '/features/2018/space-invaders/';

		data = {
			'unit': 16, // Increment by which creatures should be placed
			'status': 0, // 0 = not started, 1 = running, 2 = game over, 3 = paused
			'pointcap': 50, // Game over threshold
			'n': 0,
			'els': {
				'page': document.getElementById( 'page' ),
				'habitat': document.getElementById( 'habitat-creatures' ),
			},
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
				'high': getHighScore(),
				'board': {
					'wrapper': document.getElementById( 'scoreboard-wrapper' ),
				}
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

		// Create the game
		game = document.createElement( 'div' );
		game.id = 'game';
		game.appendChild( makeEndScreen() );
		game.appendChild( makeCreatureContainer() );
		game.appendChild( makeBubblesContainer() );
		data.score.board.wrapper.appendChild( makeScoreBoard() );

		// Put the game on the page
		document.getElementById( 'main' ).appendChild( game );

		// Get some specs once everything's on the page
		data.score.board.h = data.score.board.el.offsetHeight;
		data.score.board.y = data.score.board.el.getBoundingClientRect().top;
		console.log( data.score.board.y );
		data.container.el.style.height = 'calc( 100vh - ' + data.score.board.h + 'px)';
		data.container.x = data.container.el.offsetWidth;
		data.container.y = data.container.el.offsetHeight;

		// Set up a few things
		addButtonEvents();
		populateCreatureBox();
		makeBubbles();

		data.audio.menu.onended = audioDoneCallback;

		window.addEventListener( 'resize', handleResize, false );
		window.addEventListener( 'scroll', handleScroll, false );

	}

	function makeEndScreen() {

		data.endscreen = document.createElement( 'div' );
		data.endscreen.id = 'endscreen';
		data.endscreen.className = 'modal';
		data.endscreen.innerHTML = '<h1>Game <br> Over</h1>';

		data.buttons.reset = document.createElement( 'div' );
		data.buttons.reset.id = 'reset-game';
		data.buttons.reset.className = 'retro-button';
		data.buttons.reset.innerHTML = 'play again';

		data.endscreen.appendChild( data.buttons.reset );

		return data.endscreen;

	}

	function makeCreatureContainer() {

		data.container.el = document.createElement( 'div' );
		data.container.el.id = 'creature-container';

		return data.container.el;

	}
	
	function makeBubblesContainer() {
		
		data.bubbles = document.createElement( 'div' );
		data.bubbles.id = 'bubbles-container';
		
		return data.bubbles;
		
	}

	function makeScoreBoard() {

		var scores, points, high, remaining, progress, progressLabel;

		// Controls
		data.buttons.controls = document.createElement( 'div' );
		data.buttons.controls.id = 'controls';

		data.buttons.pause = document.createElement( 'div' );
		data.buttons.pause.id = 'pause-game';
		data.buttons.pause.innerHTML = 'pause';
		data.buttons.controls.appendChild( data.buttons.pause );

		data.buttons.resume = document.createElement( 'div' );
		data.buttons.resume.id = 'resume-game';
		data.buttons.resume.innerHTML = 'resume';
		data.buttons.controls.appendChild( data.buttons.resume );

		// Scores
		scores = document.createElement( 'div' );
		scores.id = 'scores';

		points = document.createElement( 'div' );
		points.id = 'points';
		points.innerHTML = '<div class="label">score</div>';
		data.score.board.points = document.createElement( 'div' );
		data.score.board.points.className = 'score';
		data.score.board.points.innerHTML = padNum( data.score.points );
		points.appendChild( data.score.board.points );
		scores.appendChild( points );

		high = document.createElement( 'div' );
		high.id = 'high';
		high.innerHTML = '<div class="label">high</div>';
		data.score.board.high = document.createElement( 'div' );
		data.score.board.high.className = 'score';
		data.score.board.high.innerHTML = padNum( data.score.high );
		high.appendChild( data.score.board.high );
		scores.appendChild( high );
		
		// Progress Bar
		progress = document.createElement( 'div' );
		progress.id = 'progress';

		data.progress = document.createElement( 'div' );
		data.progress.id = 'progress-bar';
		progress.appendChild( data.progress );

		progressLabel = document.createElement( 'div' );
		progressLabel.id = 'progress-label';
		progressLabel.innerHTML = 'Complete Invasion! -->';
		progress.appendChild( progressLabel );

		// Scoreboard
		data.score.board.el = document.createElement( 'div' );
		data.score.board.el.id = 'scoreboard';
		data.score.board.el.appendChild( data.buttons.controls );
		data.score.board.el.appendChild( scores );
		data.score.board.el.appendChild( progress );

		return data.score.board.el;

	}

	function addButtonEvents() {

		// Reset button
		data.buttons.reset.addEventListener(
			 'click',
			function() {
			playAudio( data.audio.menu );
		},
			false
			);

		// Pause button
		data.buttons.pause.addEventListener(
			 'click',
			function() {
				if ( 1 == data.status ) {
					playAudio( data.audio.menu );
				}
		},
			false
			);

		// Resume button
		data.buttons.resume.addEventListener(
			 'click',
			function() {
				if ( 3 == data.status ) {
					playAudio( data.audio.menu );
				}
		},
			false
			);

	}

	function startGame() {

		var init, duration, start;

		data.els.page.classList.add( 'gameplay' );

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
			y = ease( 0, data.timing.duration, millis );
			min = Math.max( 120, Math.min( 380, ( data.container.x * data.container.y / 1000000 ) * 300 ) );
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
		data.els.page.classList.remove( 'gameplay' );

	}

	function resumeGame() {

		var resume = Date.now();

		data.status = 1;
		data.timing.start += resume - data.timing.paused;
		data.container.el.classList.remove( 'paused' );
		data.buttons.controls.classList.remove( 'paused' );
		data.els.page.classList.add( 'gameplay' );

		setTimeout( ticker, data.timing.interval );

	}

	function endGame() {

		var x;

		data.status = 2;

		data.container.el.classList.add( 'endgame' );
		data.endscreen.classList.add( 'visible' );

		if ( data.score.points > getHighScore() ) {
			setHighScore( data.score.points );
		}

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
		data.score.high = getHighScore();
		data.score.spawned = 0;
		data.score.removed = 0;
		data.n = 0;

		data.score.board.high.innerHTML = padNum( data.score.high );

		startGame();

	}

	function updateScore() {

		var remaining, percent;

		if ( 1 == data.status ) {

			data.score.board.points.innerHTML = padNum( data.score.points );

			remaining = data.score.spawned - data.score.removed;
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
			'el': div,
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

		data.creatures[id].el.classList.add( 'destroyed' );
		data.creatures[id].status = 0;

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

		data.score.removed++;
		data.score.points += pointValue;
		updateScore();

	}
	
	function makeBubbles() {
		
		var duration, min, max, id, boundary, x, y, div;
		
		min = 50; // Min time between bubbles
		max = 4000; // Max time between bubbles
		duration = Math.floor( Math.random() * ( max - min + 1 ) + min );
		
		id = 'c_' + Math.random().toString( 36 ).substr( 2, 9 );
		x = data.unit * Math.floor( Math.random() * ( data.container.x / data.unit ) );
		y = data.unit * Math.floor( Math.random() * ( data.container.y / data.unit ) );

		// Make the creature wrapper and creature
		div = document.createElement( 'div' );
		div.id = id;
		div.className = 'bubbles bubbles-1';
		div.style = 'top:' + y + 'px; left:' + x + 'px';

		// Put the bubbles on the page
		data.bubbles.appendChild( div );
		
		setTimeout( makeBubbles, duration );
		
	}

	function playAudio( clip ) {

		if ( clip.paused ) {
			clip.play();
		} else {
			clip.currentTime = 0
		}

	}

	function audioDoneCallback() {

		switch ( data.status ) {
			case 0:
				startGame();
				break;
			case 1:
				pauseGame();
				break;
			case 2:
				resetGame();
				break;
			case 3:
				resumeGame();
				break;
		}

	}

	function padNum( num ) {
		var s = "00000" + num;
		return s.substr( s.length - 5 );
	}

	function ease(min, max, current) {
		
		var range, position;
		
		range = Math.abs( max ) - Math.abs( min );
		position = ( Math.abs( current ) - Math.abs( min ) ) / range;

		return Math.pow( position, 2 );
	}

	function handleResize() {
		data.score.board.h = data.score.board.el.offsetHeight;
		data.container.el.style.height = 'calc( 100vh - ' + data.score.board.h + 'px)';
		data.container.x = data.container.el.offsetWidth;
		data.container.y = data.container.el.offsetHeight;
	}
	
	function handleScroll() {
		
		
		var yPos = window.pageYOffset;
		
		if ( yPos > data.score.board.y - data.container.y && 0 == data.status ) {
			data.score.board.el.classList.add( 'fixed' );
			startGame();
		}
		
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

		data.els.habitat.innerHTML = '';
		data.els.habitat.appendChild( creatures );

	}

	function getHighScore() {

		var high;

		high = getCookie( 'uri-space-invaders-high-score' );

		if ( '' == high ) {
			setHighScore( 0 );
			return 0;
		} else {
			return high;
		}

	}

	function setHighScore( n ) {

		setCookie( 'uri-space-invaders-high-score', n, 365 );

	}

	function setCookie( cname, cvalue, exdays ) {

		var d, expires;

		d = new Date();
		d.setTime( d.getTime() + (exdays * 24 * 60 * 60 * 1000) );
		expires = 'expires=' + d.toUTCString();

		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';

	}

	function getCookie( cname ) {

		var name, ca, i, c;

		name = cname + '=';
		ca = document.cookie.split( ';' );

		for ( i = 0; i < ca.length; i++ ) {

			c = ca[i];

			while ( ' ' == c.charAt( 0 ) ) {
				c = c.substring( 1 );
			}

			if ( 0 == c.indexOf( name ) ) {
				return c.substring( name.length, c.length );
			}

		}

		return '';

	}

})();
