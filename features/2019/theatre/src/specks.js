/**
 * Specks
 *
 * @see https://codepen.io/Archtects/pen/YJeaVJ
 * @package uri-modern-home
 */

( function () {

	window.addEventListener( 'load', init, false );

	function init() {

		var canvas = document.getElementById( "specks" );
		var ctx = canvas.getContext( "2d" );
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		var particles = [];
		var num_particles = 300;

		// start with random starting position
		var Particle = function () {
			this.x = canvas.width * Math.random();
			this.y = canvas.height * Math.random();
			this.vx = -.2;
			this.vy = Math.random() / 5;
		}
		// Ading two methods
		Particle.prototype.Draw = function (ctx) {
			ctx.beginPath();
			ctx.fillStyle = "rgba(255,255,255,.5)";
			ctx.arc( this.x, this.y, Math.random(), 0, 2 * Math.PI );
			ctx.fill();
		}

		Particle.prototype.Update = function () {
			// set the starting x/y to have velociaty
			this.x += this.vx;
			this.y += this.vy;

			if (this.x < 0) {
				this.x = canvas.width; // resets back to begining
			}
			if ( this.y < -20 || this.y > canvas.height + 20 ) { // when it hits the top or bottom bounce
				this.vy = - this.vy * Math.random();
			}
		}
		function loop() {
			ctx.clearRect( 0, 0, canvas.width, canvas.height );

			for (var i = 0; i < num_particles; i++) {
				particles[i].Update();
				particles[i].Draw( ctx );
			}
			requestAnimationFrame( loop );
		}
		// Create particles
		for (var i = 0; i < num_particles; i++) {
			particles.push( new Particle() );
		}
		loop();

	}

})();
