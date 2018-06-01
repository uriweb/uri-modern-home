<?php
/**
 * Default template for Featured Posts widget
 *
 * @package uri-modern-home
 */

	$html .= '<div class="uri-featured-posts-hero-wrapper">';

	foreach ( $posts_array as $post ) {
	setup_postdata( $post );

	$excerpt = get_field( 'hero_excerpt', $post->ID, false );

	if ( ! empty( $excerpt ) ) {
		$html .= do_shortcode( $excerpt );
		} else {
		$html .= 'Hero excerpt is empty.  :(';
		}
}
	wp_reset_postdata();
	$html .= '</div>';

	print $html;
