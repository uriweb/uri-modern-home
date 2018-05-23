<?php
/** 
 * Default template for Featured Posts widget
 */

	$html .= '<div>';

	foreach($posts_array as $post) {
		setup_postdata( $post );

		$excerpt = get_field( 'hero_excerpt' );

		if( !empty( $excerpt ) ) {
			$html .= $excerpt;
		} else {
			$html .= 'Hero excerpt is empty.  :(';
		}

	}
	wp_reset_postdata();
	$html .= '</div>';

	print $html;