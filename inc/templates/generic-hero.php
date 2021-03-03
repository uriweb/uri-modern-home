<?php

$classes = 'uri-generic-hero';

$atts['class'] = $atts['class'] . ' ' . $atts['className'];

if ( ! empty( $atts['class'] ) ) {
	$classes .= ' ' . $atts['class'];
}

$output = '<section class="uri-generic-hero-wrapper">';
$output .= '<div class="' . $classes . '"';

if ( ! empty( $atts['css'] ) ) {
	$output .= 'style="' . $atts['css'] . '"';
}

$output .= '>';

$output .= '<div class="uri-generic-hero-proper">';

$output .= '<div class="uri-generic-hero-text">';

if ( ! empty( $atts['title'] ) ) {
	$output .= '<h1>' . $atts['title'] . '</h1>';
}

if ( ! empty( $atts['body'] ) ) {
	$output .= '<p>' . $atts['body'] . '</p>';
}

if ( ! empty( $atts['link'] ) ) {
	$button = '<a class="uri-generic-hero-button" href="' . $atts['link'] . '" title="' . $atts['tooltip'] . '">' . $atts['button'] . '</a>';
	if ( function_exists( 'uri_cl_shortcode_button' ) ) {
		$button = do_shortcode( '[cl-button link="' . $atts['link'] . '" text="' . $atts['button'] . '"]' );
	}
	$output .= $button;
}

$output .= '</div>'; // .uri-generic-hero-text

$output .= '</div>'; // .uri-generic-hero-proper


$output .= '</div>'; // .uri-generic-hero
$output .= '</section>';
