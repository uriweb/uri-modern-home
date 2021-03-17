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
$bgclasses = 'uri-generic-hero-backdrop';
if ( 'lattice' == $atts['style'] ) {
	$bgclasses .= ' lattice';
}
$bg = '<div class="' . $bgclasses . '"';
if ( ! empty( $atts['background'] ) ) {
	$bg .= ' style="background:' . $atts['background'] . '"';
}
$bg .= '>';

$speeds = array(
	'low',
	'medium',
	'high',
);
$directions = array(
	'left',
	'right',
);

if ( 'bars' == $atts['style'] ) {
	for ( $n = 0; $n <= 10; $n++ ) {
		$w = rand( 2, 8 ) * 10;
		$x = rand( 10, 90 );
		$o = rand( 1, 5 ) / 10;
		$s = $speeds[ array_rand( $speeds, 1 ) ];
		$bg .= '<div class="bar speed-' . $s . '" style="width:calc( 1vw * ' . $w . '); left:' . ( $x - ( $w / 2 ) ) . '%; opacity:' . $o . '"></div>';
	}
}

if ( 'discs' == $atts['style'] ) {
	for ( $n = 0; $n <= 5; $n++ ) {
		$w = rand( 2, 7 ) * 10;
		$x = rand( 10, 90 );
		$y = rand( 10, 90 );
		$o = rand( 2, 5 ) / 10;
		$r = rand( 1, 3 ) * 10;
		$d = $directions[ array_rand( $directions, 1 ) ];
		$s = $speeds[ array_rand( $speeds, 1 ) ];
		$bg .= '<div class="disc direction-' . $d . ' speed-' . $s . '" style="width:calc( 1vw * ' . $r . '); height:calc( 1vw * ' . $r . '); left:' . ( $x - ( $r / 2 ) ) . '%; top:' . ( $y - ( $r / 2 ) ) . '%; opacity:' . $o . '">';
		$bg .= '<div style="top:-' . ( $w / 2 ) . 'vw; left:' . ( ( $r / 2 ) - ( $w / 2 ) ) . 'vw; width:calc( 1vw * ' . $w . '); height:calc( 1vw * ' . $w . ');"></div>';
		$bg .= '</div>';
	}
}

if ( 'lattice' == $atts['style'] ) {
	for ( $n = 0; $n <= 200; $n++ ) {
		$t = rand( 5, 60 );
		$s = $speeds[ array_rand( $speeds, 1 ) ];
		$bg .= '<div class="triangle speed-' . $s . '" style="animation-duration:' . $t . 's;"></div>';
	}
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
