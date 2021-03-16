<?php
/**
 * Shortcodes
 *
 * @package uri-modern-home
 */

/**
 * Generic homepage hero shortcode
 *
 * @param arr $atts the attributes.
 * @param str $content the content.
 */
function uri_modern_home_shortcode_hero( $atts, $content = null ) {

	// Attributes.
	$atts = shortcode_atts(
			array(
				'title' => '',
				'body' => '',
				'img' => '',
				'alt' => '',
				'button' => '',
				'link' => '',
				'background' => '',
				'style' => '',
				'class' => '',
				'className' => '',
				'css' => '',
			),
		$atts
		);

	include 'templates/generic-hero.php';
	return $output;

}
add_shortcode( 'uri-generic-hero', 'uri_modern_home_shortcode_hero' );
