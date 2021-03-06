/**
 * Specks
 *
 * @see https://codepen.io/Archtects/pen/YJeaVJ
 */

( function() {
	window.addEventListener( 'load', checkDevice, false );

	const data = {};

	function checkDevice() {
		if ( window.innerWidth >= 600 ) {
			init();
		}
	}

	function init() {
		data.canvas = document.getElementById( 'specks' );
		data.ctx = data.canvas.getContext( '2d' );
		data.canvas.width = window.innerWidth;
		data.canvas.height = window.innerHeight;
		data.particles = [];
		data.num_particles = 200;

		data.curtains = document.querySelectorAll( '.story-direction-wrapper' );
		data.triggers = getTriggerPoints();
		data.state = false;

		window.addEventListener( 'resize', getTriggerPoints(), false );
		window.addEventListener(
			'scroll',
			function() {
				if ( getAnimationState() && false === data.state ) {
					loop();
				}
			},
			false
		);

		// start with random starting position
		const Particle = function() {
			this.x = data.canvas.width * Math.random();
			this.y = data.canvas.height * Math.random();
			this.vx = -.2;
			this.vy = Math.random() / 5;
		};

		// Adding two methods
		Particle.prototype.Draw = function( ctx ) {
			ctx.fillStyle = 'rgba(255,255,255,.5)';
			ctx.fillRect( this.x, this.y, 2, 2 );
		};

		Particle.prototype.Update = function() {
			// set the starting x/y to have velociaty
			this.x += this.vx;
			this.y += this.vy;

			if ( this.x < 0 ) {
				this.x = data.canvas.width; // resets back to begining
			}
			if ( this.y < -20 || this.y > data.canvas.height + 20 ) { // when it hits the top or bottom bounce
				this.vy = -this.vy * Math.random();
			}
		};

		// Create particles
		for ( let i = 0; i < data.num_particles; i++ ) {
			data.particles.push( new Particle() );
		}

		loop();
	}

	function getTriggerPoints() {
		let i;

		const y = window.pageYOffset;
		const h = window.innerHeight;
		const t = [];

		for ( i = 0; i < data.curtains.length; i++ ) {
			t.push(
				[
					data.curtains[ i ].getBoundingClientRect().top + y + ( h * .1 ),
					data.curtains[ i ].getBoundingClientRect().bottom + y - ( h * .5 ),
				]
			);
		}

		return t;
	}

	function getAnimationState() {
		let i, state;

		const y = window.pageYOffset;
		const h = window.innerHeight;

		state = false;

		for ( i = 0; i < data.triggers.length; i++ ) {
			if ( y + h > data.triggers[ i ][ 0 ] && y < data.triggers[ i ][ 1 ] ) {
				state = true;
				break;
			}
		}

		return state;
	}

	function loop() {
		data.ctx.clearRect( 0, 0, data.canvas.width, data.canvas.height );

		for ( let i = 0; i < data.num_particles; i++ ) {
			data.particles[ i ].Update();
			data.particles[ i ].Draw( data.ctx );
		}

		data.state = false;

		if ( getAnimationState() ) {
			data.state = true;
			requestAnimationFrame( loop );
		}
	}
}() );
