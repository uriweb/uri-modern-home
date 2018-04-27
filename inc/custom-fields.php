<?php
/**
 * Custom fields for posts
 *
 * @package uri-modern-home
 */

if ( function_exists( 'register_field_group' ) ) {
	register_field_group(
		array(
			'id' => 'acf_features',
			'title' => 'Features',
			'fields' => array(
				array(
					'key' => 'field_5ae361dc0475c',
					'label' => 'Hero Excerpt',
					'name' => 'hero_excerpt',
					'type' => 'wysiwyg',
					'instructions' => 'A short excerpt formatted for use on the homepage',
					'default_value' => '',
					'toolbar' => 'full',
					'media_upload' => 'yes',
				),
				array(
					'key' => 'field_5ae3715c0475d',
					'label' => 'Stylesheet',
					'name' => 'stylesheet',
					'type' => 'text',
					'instructions' => 'Add the URL to a custom stylesheet to use for the feature.',
					'default_value' => '',
					'placeholder' => '',
					'prepend' => '',
					'append' => '',
					'formatting' => 'html',
					'maxlength' => '',
				),
			),
			'location' => array(
				array(
					array(
						'param' => 'post_type',
						'operator' => '==',
						'value' => 'post',
						'order_no' => 0,
						'group_no' => 0,
					),
				),
			),
			'options' => array(
				'position' => 'normal',
				'layout' => 'no_box',
				'hide_on_screen' => array(),
			),
			'menu_order' => 0,
		)
		);
}
