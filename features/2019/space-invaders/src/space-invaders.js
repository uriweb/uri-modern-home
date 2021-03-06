/**
 * SPACE INVADERS
 */

( function() {
	'use strict';

	let data;

	window.addEventListener( 'load', initInvaders, false );

	function initInvaders() {
		const baseURL = URIMODERN.path.theme + '/features/2019/space-invaders/';

		data = {
			unit: 16, // Increment by which creatures should be placed
			status: 0, // 0 = not started, 1 = running, 2 = game over, 3 = paused, 4 = initiate
			pointcap: 50, // Game over threshold
			n: 0,
			els: {
				page: document.getElementById( 'page' ),
				habitat: document.getElementById( 'habitat-creatures' ),
			},
			buttons: {},
			creatures: {},
			types: {
				tunicate1: {
					slug: 'tunicate-1',
					name: 'Styela clava',
				},
				tunicate2: {
					slug: 'tunicate-2',
					name: 'Ciona intestinalis',
				},
				seaweed1: {
					slug: 'seaweed-1',
					name: 'Grateloupia turuturu',
				},
				seaweed2: {
					slug: 'seaweed-2',
					name: 'Codium fragile',
				},
				crab: {
					slug: 'crab',
					name: 'Hemigrapsus sanguineus',
				},
			},
			container: {},
			endscreen: {},
			score: {
				points: 0,
				spawned: 0,
				removed: 0,
				types: {},
				high: getHighScore(),
				board: {
					wrapper: document.getElementById( 'scoreboard-wrapper' ),
				},
			},
			timing: {
				init: 2000, // Initial interval between spawns
				duration: 60000, // Time until max spawn rate (approx)
				timers: {},
			},
			audio: {
				bounce: new Audio( baseURL + 'mp3/bounce.mp3' ),
				elevate: new Audio( baseURL + 'mp3/elevate.mp3' ),
				shoot: new Audio( baseURL + 'mp3/shoot.mp3' ),
				end: new Audio( baseURL + 'mp3/end.mp3' ),
				menu: new Audio( baseURL + 'mp3/menu.mp3' ),
			},
		};

		// If it's the homepage, do homepage specific stuff and skip everything else
		if ( document.body.classList.contains( 'home' ) || document.body.classList.contains( 'ln-preview' ) ) {
			renderHomepageHero();
			return;
		}

		// Add a class to the body
		document.body.classList.add( 'si-gameplay-supported' );

		// Add some more data that's only available on the story page
		data.story = {
			h: document.getElementById( 'story' ).offsetHeight,
			top: document.getElementById( 'story' ).getBoundingClientRect().top,
		};

		// Create the game
		data.game = document.createElement( 'div' );
		data.game.id = 'game';
		data.game.appendChild( makeEndScreen() );
		data.game.appendChild( makeCountDown() );
		data.game.appendChild( makeCreatureContainer() );
		data.game.appendChild( makeBubblesContainer() );
		data.score.board.wrapper.appendChild( makeScoreBoard() );

		// Put the game on the page
		document.getElementById( 'main' ).appendChild( data.game );

		// Get some specs once everything's on the page
		data.score.board.h = data.score.board.el.offsetHeight;
		data.score.board.y = data.score.board.el.getBoundingClientRect().top;
		data.score.board.parent = data.score.board.wrapper.parentElement;
		data.container.el.style.height = 'calc( 100vh - ' + data.score.board.h + 'px)';
		data.container.x = data.container.el.offsetWidth;
		data.container.y = data.container.el.offsetHeight;

		// Set up a few things
		addButtonEvents();
		populateCreatureBox();
		makeBubbles();

		window.addEventListener( 'resize', handleResize, false );
		window.addEventListener( 'scroll', handleScroll, false );
	}

	function renderHomepageHero() {
		const hero = document.getElementById( 'feature-hero' ).querySelector( '.cl-hero' );
		const still = hero.querySelector( '.still' );

		hero.insertBefore( makeCreatureContainer(), still );
		hero.insertBefore( makeBubblesContainer(), still );

		data.score.board.h = 0;
		data.container.x = data.container.el.offsetWidth;
		data.container.y = data.container.el.offsetHeight;
		data.n = data.container.y / 16;

		makeBubbles();
		setIntervalX( 'homepageCreatures', addCreature, 1000, 20 );
	}

	function makeEndScreen() {
		let div, span, x, type;

		data.endscreen.el = document.createElement( 'div' );
		data.endscreen.el.id = 'endscreen';
		data.endscreen.el.className = 'modal';
		data.endscreen.el.innerHTML = '<h1>Game <br> Over</h1>';

		const high = document.createElement( 'div' );
		high.id = 'new-high-score';
		high.innerHTML = 'New High Score';
		data.endscreen.el.appendChild( high );

		const stats = document.createElement( 'div' );
		stats.id = 'game-stats';

		data.endscreen.stats = {};

		for ( x in data.types ) {
			type = data.types[ x ].slug;

			div = document.createElement( 'div' );
			div.className = 'stat-wrapper';

			span = document.createElement( 'span' );
			span.className = 'stat-creature ' + type;
			div.appendChild( span );

			data.endscreen.stats[ type ] = document.createElement( 'span' );
			data.endscreen.stats[ type ].className = 'stat-label';
			data.endscreen.stats[ type ].innerHTML = 0;
			div.appendChild( data.endscreen.stats[ type ] );

			span = document.createElement( 'span' );
			span.className = 'stat-creature-name';
			span.innerHTML = data.types[ x ].name;
			div.appendChild( span );

			stats.appendChild( div );
		}

		data.endscreen.el.appendChild( stats );

		data.buttons.reset = document.createElement( 'div' );
		data.buttons.reset.id = 'reset-game';
		data.buttons.reset.className = 'retro-button';
		data.buttons.reset.innerHTML = 'play again';

		data.endscreen.el.appendChild( data.buttons.reset );

		div = document.createElement( 'div' );
		div.id = 'remove-game';
		div.innerHTML = 'or, just read the story';
		div.addEventListener( 'click', removeGame, false );

		data.endscreen.el.appendChild( div );

		return data.endscreen.el;
	}

	function makeCountDown() {
		data.countdown = document.createElement( 'div' );
		data.countdown.id = 'countdown';
		data.countdown.className = 'modal';
		data.countdown.innerHTML = 'Invasives coming!<div class="counter">3</div>';

		return data.countdown;
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
		const scores = document.createElement( 'div' );
		scores.id = 'scores';

		const points = document.createElement( 'div' );
		points.id = 'points';
		points.innerHTML = '<div class="label">score</div>';
		data.score.board.points = document.createElement( 'div' );
		data.score.board.points.className = 'score';
		data.score.board.points.innerHTML = padNum( data.score.points );
		points.appendChild( data.score.board.points );
		scores.appendChild( points );

		const high = document.createElement( 'div' );
		high.id = 'high';
		high.innerHTML = '<div class="label">high</div>';
		data.score.board.high = document.createElement( 'div' );
		data.score.board.high.className = 'score';
		data.score.board.high.innerHTML = padNum( data.score.high );
		high.appendChild( data.score.board.high );
		scores.appendChild( high );

		// Progress Bar
		const progress = document.createElement( 'div' );
		progress.id = 'progress';

		data.progress = document.createElement( 'div' );
		data.progress.id = 'progress-bar';
		progress.appendChild( data.progress );

		const progressLabel = document.createElement( 'div' );
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
				if ( 1 === data.status ) {
					playAudio( data.audio.menu );
				}
			},
			false
		);

		// Resume button
		data.buttons.resume.addEventListener(
			'click',
			function() {
				if ( 3 === data.status ) {
					playAudio( data.audio.menu );
				}
			},
			false
		);
	}

	function startGame() {
		data.countdown.classList.remove( 'visible' );
		data.els.page.classList.add( 'gameplay' );

		// Don't restart the game if it's already playing
		// (prevents multiple instances)
		if ( 1 !== data.status ) {
			data.status = 1;
			updateScore();

			setIntervalX( 'initialCreatures', addCreature, 50, 10 );

			data.timing.start = Date.now();
			setTimeout( ticker, data.timing.init );
		}
	}

	function ticker() {
		let millis, y, min;

		if ( 1 === data.status ) {
			millis = Date.now() - data.timing.start;
			y = ease( 0, data.timing.duration, millis );
			min = Math.max( 120, Math.min( 300, ( data.container.x * data.container.y / 1000000 ) * 300 ) );
			data.timing.interval = Math.max( min, data.timing.init - ( data.timing.init * y ) );

			addCreature();
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
		const resume = Date.now();

		data.status = 1;
		data.timing.start += resume - data.timing.paused;
		data.container.el.classList.remove( 'paused' );
		data.buttons.controls.classList.remove( 'paused' );
		data.els.page.classList.add( 'gameplay' );

		setTimeout( ticker, data.timing.interval );
	}

	function endGame() {
		let type, score;

		data.status = 2;

		for ( type in data.endscreen.stats ) {
			score = 0;
			if ( null !== data.score.types[ type ] ) {
				score = data.score.types[ type ];
			}
			data.endscreen.stats[ type ].innerHTML = score;
		}

		playAudio( data.audio.end );
		data.container.el.classList.add( 'endgame' );
		data.endscreen.el.classList.add( 'visible' );

		if ( data.score.points > getHighScore() ) {
			setHighScore( data.score.points );
			data.endscreen.el.classList.add( 'new-high' );
		}

		const n = Math.floor( Math.max( 200, Math.min( 600, ( data.container.x * data.container.y / 1000000 ) * 400 ) ) );

		setIntervalX( 'endGame', addCreature, 20, n );
	}

	function resetGame() {
		// Clear any existing gameplay
		window.clearInterval( data.timing.timers.endGame );
		data.container.el.innerHTML = '';

		data.container.el.classList.remove( 'endgame' );
		data.endscreen.el.classList.remove( 'visible', 'new-high' );
		data.progress.className = '';
		data.score.points = 0;
		data.score.high = getHighScore();
		data.score.spawned = 0;
		data.score.removed = 0;
		data.score.types = {};
		data.n = 0;

		data.score.board.high.innerHTML = padNum( data.score.high );

		startGame();
	}

	function removeGame() {
		// Clear any existing gameplay
		window.clearInterval( data.timing.timers.endGame );

		data.els.page.classList.remove( 'gameplay' );
		data.score.board.parent.removeChild( data.score.board.wrapper );
		document.getElementById( 'main' ).removeChild( data.game );

		document.body.classList.remove( 'si-gameplay-supported' );
	}

	function updateScore() {
		let remaining, percent;

		if ( 1 === data.status ) {
			data.score.board.points.innerHTML = padNum( data.score.points );

			if ( data.score.points >= data.score.high ) {
				data.score.board.high.innerHTML = padNum( data.score.points );
			}

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

			if ( data.pointcap === remaining ) {
				endGame();
			}
		}
	}

	function getCreature() {
		let speed;

		const n = Math.floor( Math.random() * 1000 );
		const s = Math.floor( ( Math.random() * 3 ) + 1 );
		const creature = {};

		if ( 300 > n ) {
			creature.type = data.types.tunicate1.slug;
		} else if ( 600 > n ) {
			creature.type = data.types.tunicate2.slug;
		} else if ( 750 > n ) {
			creature.type = data.types.seaweed1.slug;
		} else if ( 900 > n ) {
			creature.type = data.types.seaweed2.slug;
		} else if ( 1000 > n ) {
			creature.type = data.types.crab.slug;
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
		const list = data.container.el.querySelectorAll( '.' + type + ':not(.destroyed)' );
		const n = Math.floor( ( Math.random() * list.length ) );

		return list.length > 0 ? list[ n ].parentNode.getAttribute( 'id' ) : null;
	}

	function addCreature() {
		let x, y;

		const creature = getCreature();
		const target = getRandomExistingCreatureID( creature.type );

		// Generate a random ID
		const id = 'c_' + Math.random().toString( 36 ).substr( 2, 9 );

		const boundary = {
			left: 0,
			right: data.container.x - 128,
			top: Math.max( 128, data.container.y - ( data.n * 16 ) ),
			bottom: data.container.y - data.score.board.h,
		};

		const p = Math.floor( ( Math.random() * 1000 ) );

		// 70% of the time, position the new creature near another same-type creature, unless it's a crab
		// Otherwise, position it randomly
		if ( 700 > p && null !== target && 'crab' !== creature.type && 0 < data.n ) {
			x = Math.min( boundary.right, Math.max( 128, data.creatures[ target ].x + ( data.unit * Math.floor( ( Math.random() * 17 ) - 8 ) ) ) );
			y = Math.min( boundary.bottom, Math.max( 128, data.creatures[ target ].y + ( data.unit * Math.floor( ( Math.random() * 17 ) - 8 ) ) ) );
		} else {
			x = Math.max( boundary.left, data.unit * Math.floor( Math.random() * ( boundary.right / data.unit ) ) );
			y = Math.max( boundary.top, data.unit * Math.floor( Math.random() * ( boundary.bottom / data.unit ) ) );
		}

		// Get a random value for z-index
		const z = Math.floor( ( Math.random() * 10 ) + 1 );

		// Make the creature wrapper and creature
		const div = document.createElement( 'div' );
		div.id = id;
		div.className = 'creature-wrapper';

		if ( 500 > p ) {
			div.classList.add( 'flipped' );
		}

		div.setAttribute( 'style', 'top:' + y + 'px; left:' + x + 'px; z-index:' + z );
		div.appendChild( creature.div );

		if ( 1 === data.status ) {
			div.addEventListener( 'click', removeCreature.bind( null, id ), false );
		}

		// Add it to the database
		data.creatures[ id ] = {
			el: div,
			x,
			y,
			type: creature.type,
			status: 1,
		};

		// Put the creature on the page
		data.container.el.appendChild( div );
		data.score.spawned++;

		updateScore();
	}

	function removeCreature( id ) {
		let pointValue;

		const creature = data.creatures[ id ];

		creature.el.classList.add( 'destroyed' );
		creature.status = 0;

		if ( null === data.score.types[ creature.type ] ) {
			data.score.types[ creature.type ] = 1;
		} else {
			data.score.types[ creature.type ]++;
		}

		// Remove div after 5 seconds
		setTimeout(
			function() {
				data.container.el.removeChild( creature.el );
			},
			5000
		);

		switch ( creature.type ) {
			case data.types.crab.slug:
				playAudio( data.audio.elevate );
				pointValue = 30;
				break;
			case data.types.tunicate1.slug:
				playAudio( data.audio.bounce );
				pointValue = 10;
				break;
			case data.types.tunicate2.slug:
				playAudio( data.audio.bounce );
				pointValue = 30;
				break;
			case data.types.seaweed1.slug:
				playAudio( data.audio.shoot );
				pointValue = 20;
				break;
			case data.types.seaweed2.slug:
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
		const min = 1000; // Min time between bubbles
		const max = 8000; // Max time between bubbles
		const duration = Math.floor( ( Math.random() * ( max - min + 1 ) ) + min );

		const id = 'b_' + Math.random().toString( 36 ).substr( 2, 9 );
		const x = data.unit * Math.floor( Math.random() * ( data.container.x / data.unit ) );
		const y = data.unit * Math.floor( Math.random() * ( data.container.y / data.unit ) );

		// Make the creature wrapper and creature
		const div = document.createElement( 'div' );
		div.id = id;
		div.className = 'bubbles bubbles-1';
		div.setAttribute( 'style', 'top:' + y + 'px; left:' + x + 'px' );

		// Put the bubbles on the page
		data.bubbles.appendChild( div );

		// Remove div after 5 seconds
		setTimeout(
			function() {
				data.bubbles.removeChild( div );
			},
			5000
		);

		setTimeout( makeBubbles, duration );
	}

	function playAudio( clip ) {
		let promise, success, failure;

		success = audioSuccess;
		failure = audioFailure;

		if ( data.audio.menu === clip ) {
			success = function() {
				clip.onended = menuButtonCallback;
			};
			failure = menuButtonCallback;
		}

		if ( clip.paused ) {
			promise = clip.play();

			if ( undefined !== promise ) {
				promise.then( success ).catch( failure );
			}
		} else {
			clip.currentTime = 0;
		}
	}

	function audioSuccess() {
		// console.log( 'playback ok' );
	}

	function audioFailure() {
		// console.log( 'playback failed' );
	}

	function menuButtonCallback() {
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
		const s = '00000' + num;
		return s.substr( s.length - 5 );
	}

	function ease( min, max, current ) {
		const range = Math.abs( max ) - Math.abs( min );
		const position = ( Math.abs( current ) - Math.abs( min ) ) / range;

		return Math.pow( position, 2 );
	}

	function handleResize() {
		data.score.board.h = data.score.board.el.offsetHeight;
		data.score.board.y = data.score.board.el.getBoundingClientRect().top;
		data.container.el.style.height = 'calc( 100vh - ' + data.score.board.h + 'px)';
		data.container.x = data.container.el.offsetWidth;
		data.container.y = data.container.el.offsetHeight;
	}

	function handleScroll() {
		const yPos = window.pageYOffset;

		if ( yPos > data.score.board.y - data.container.y && 0 === data.status ) {
			data.score.board.el.classList.add( 'fixed' );
			startGame();
		}
	}

	function setIntervalX( name, callback, delay, reps ) {
		let x;

		x = 0;
		data.timing.timers[ name ] = window.setInterval(
			function() {
				callback();

				if ( ++x === reps ) {
					window.clearInterval( data.timing.timers[ name ] );
				}
			},
			delay
		);
	}

	function populateCreatureBox() {
		let creature, x, z;

		data.els.habitat.innerHTML = '';
		const creatures = document.createElement( 'div' );
		data.els.habitat.appendChild( creatures );

		setIntervalX(
			'populateCreatureBox',
			function() {
				creature = getCreature();

				x = data.unit * Math.floor( ( Math.random() * 48 ) + 1 );
				z = Math.floor( ( Math.random() * 10 ) + 1 );

				creature.div.setAttribute( 'style', 'left:' + x + 'px; z-index:' + z );

				creatures.appendChild( creature.div );
			},
			50,
			15
		);
	}

	function getHighScore() {
		const high = getCookie( 'uri-space-invaders-high-score' );

		if ( '' === high ) {
			setHighScore( 0 );
			return 0;
		}
		return high;
	}

	function setHighScore( n ) {
		setCookie( 'uri-space-invaders-high-score', n, 365 );
	}

	function setCookie( cname, cvalue, exdays ) {
		const d = new Date();
		d.setTime( d.getTime() + ( exdays * 24 * 60 * 60 * 1000 ) );
		const expires = 'expires=' + d.toUTCString();

		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	function getCookie( cname ) {
		let i, c;

		const name = cname + '=';
		const ca = document.cookie.split( ';' );

		for ( i = 0; i < ca.length; i++ ) {
			c = ca[ i ];

			while ( ' ' === c.charAt( 0 ) ) {
				c = c.substring( 1 );
			}

			if ( 0 === c.indexOf( name ) ) {
				return c.substring( name.length, c.length );
			}
		}

		return '';
	}
}() );
