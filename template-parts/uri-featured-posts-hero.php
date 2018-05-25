<?php
/**
 * Default template for Featured Posts widget
 *
 * @package uri-modern-home
 */

	$html .= '<div>';

	foreach ( $posts_array as $post ) {
	setup_postdata( $post );

	$excerpt = get_field( 'hero_excerpt', $post->ID, false );

	if ( ! empty( $excerpt ) ) {
		$html .= $excerpt;
		} else {
		$html .= 'Hero excerpt is empty.  :(';
		}
}
	wp_reset_postdata();
	$html .= '</div>';

	print $html;
