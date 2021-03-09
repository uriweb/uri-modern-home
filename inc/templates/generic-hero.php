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

// The backdrop
$bg = '<div class="uri-generic-hero-backdrop">';
$speeds = array(
	'low',
	'medium',
	'high',
);
for ( $n = 0; $n <= 10; $n++ ) {
	$w = rand( 2, 8 ) * 10;
	$x = rand( 10, 90 );
	$o = rand( 1, 5 ) / 10;
	$s = $speeds[ array_rand( $speeds, 1 ) ];
	$bg .= '<div class="speed-' . $s . '" style="width:calc( 1vw * ' . $w . '); left:' . ( $x - ( $w / 2 ) ) . '%; opacity:' . $o . '"></div>';
}

$bg .= '</div>';
$output .= $bg;

$output .= '<div class="uri-generic-hero-proper">';



$output .= '<div class="uri-generic-hero-text">';

// The title
if ( ! empty( $atts['title'] ) ) {
	$output .= '<h1>' . $atts['title'] . '</h1>';
}

// The body
if ( ! empty( $atts['body'] ) ) {
	$output .= '<p>' . $atts['body'] . '</p>';
}

// The button
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
