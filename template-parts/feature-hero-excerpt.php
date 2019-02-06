<?php
/**
 * Template to display the Feature hero excerpt
 *
 * @package uri-modern-home
 */

?>

<div class="feature-hero-excerpt-wrapper">
	
	<?php

	$excerpt = uri_modern_home_get_field( 'hero_excerpt', $post->ID, false );

	if ( ! empty( $excerpt ) ) {
		echo do_shortcode( $excerpt );
	} else {
		echo 'Hero excerpt is empty.  :(';
	}

	?>

</div>
