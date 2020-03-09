/**
 * FIRST AMENDMENT -- TEXT HERO ANIMATION
 *
 * @package uri-modern-home
 */

( function () {

  'use strict';

  window.addEventListener( 'load', init, false );

  const data = {};

  function init() {

		data.t = 'Congress shall make no law respecting an establishment of <span>religion</span>, or prohibiting the free exercise thereof; or abridging the freedom of <span>speech</span> or of <span>the press</span>; or the right of the people peaceably to <span>assemble</span>, and to <span>petition</span> the Government for a redress of grievances.';
		data.el = document.getElementById( 'amendment-text-bg' );
    data.story = {
      el: document.querySelector( '.story' ),
    };
    data.status = false;

		let text = '';
		for ( let i = 0; i < 50; i++ ) {
		  text += data.t + ' &mdash; ';
			}

		data.el.innerHTML = text;

    data.spans = data.el.querySelectorAll( 'span' );
    data.l = data.spans.length;

    window.addEventListener( 'resize', resize, false );
    resize();

    window.addEventListener( 'scroll', scroll, false );

    highlight();

  }

  function resize() {

    const w = window.innerWidth;
    const h = window.innerHeight;
    const max = 1920 * 1080;
    const p = Math.min( 1, ( w * h ) / max );

    data.threshold = Math.round( data.l * p );

    scroll();

  }

  function scroll() {

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    data.story.p = data.story.el.getBoundingClientRect().top + scrollTop;

    if ( scrollTop > data.story.p ) {
      clearTimeout( data.timer );
      data.status = false;
    } else if ( false == data.status ) {
      highlight();
    }

  }

  function highlight() {

    const min = 200; // Min time
		const max = 1200; // Max time
		const duration = Math.floor( Math.random() * ( max - min + 1 ) + min );
    const i = Math.floor( ( Math.random() * data.threshold ) );

    data.status = true;

    data.spans[i].classList.add( 'active' );

    setTimeout(
			function() {
				data.spans[i].classList.remove( 'active' );
	    },
		  1000
		);

    data.timer = setTimeout( highlight, duration );

  }

})();
