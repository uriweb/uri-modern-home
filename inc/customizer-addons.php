<?php
/**
 * URI Modern Home Theme Customizer Addons
 *
 * @package uri-modern-home
 */

/**
 * Add stuff to the customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function uri_modern_home_customize_register( $wp_customize ) {

	$wp_customize->add_setting(
		'use_ancestor_title_whitelist', array(
			'default'           => '',
			'type'              => 'option',
			'sanitize_callback' => 'sanitize_textarea_field',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize,
			'use_ancestor_title_whitelist',
			array(
				'section'     => 'header_image',
				'label'       => __( 'Use Top Ancestor Title', 'uri' ),
				'description' => __( 'Whitelist top-level ancestor pages to use its title as the site name for it and all of its children.  One page title per line, case-sensitive.', 'uri' ),
				'type'        => 'textarea',
			)
		)
	);

}
add_action( 'customize_register', 'uri_modern_home_customize_register' );
