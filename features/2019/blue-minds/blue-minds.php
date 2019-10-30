<?php
/**
 * Blue Minds
 *
 * @package uri-modern-home
 */

 /**
  * Story block shortcode
  *
  * @param arr $atts the attributes.
  * @param str $content the content.
  */
function uri_modern_features_blue_minds_story_block( $atts, $content = null ) {

	// Attributes.
	$atts = shortcode_atts(
			array(
				'wrapper_id' => '',
				'post_id' => '',
				'h1' => '',
				'h2' => '',
				'media_html' => '',
				'link' => '',
				'include_content' => true,
			),
		$atts
		);

	ob_start();

  include 'story-block-template.php';

	$output .= ob_get_clean();

	return $output;

}
add_shortcode( 'uri-blue-minds-story-block', 'uri_modern_features_blue_minds_story_block' );
