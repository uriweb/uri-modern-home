<?php
/**
 * Features custom post type and fields
 *
 * @package uri-modern-home
 */

/**
 * Set up Talks post type and custom fields
 */
function uri_modern_home_create_feature_post_type() {
  register_post_type( 'feature',
    array(
        'label' => 'Feature',
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'capability_type' => 'post',
        'hierarchical' => true,
        'rewrite' => array('slug' => 'features'),
        'query_var' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'supports' => array('title','editor','thumbnail','revisions'),
        'taxonomies' => array('post_tag', 'category'),
        'labels' => array(
            'name' => __( 'Features' ),
            'singular_name' => __( 'Feature' ),
            'add_new'            => __( 'Add New', 'Feature' ),
            'add_new_item'       => __( 'Add New Feature' ),
            'edit_item'          => __( 'Edit Feature' ),
            'new_item'           => __( 'New Feature' ),
            'all_items'          => __( 'All Features' ),
            'view_item'          => __( 'View Feature' ),
            'search_items'       => __( 'Search features' ),
            'not_found'          => __( 'No features found' ),
            'not_found_in_trash' => __( 'No fetures found in the Trash' ),
            'parent_item_colon'  => '',
            'menu_name'          => 'Features'
        ),
        'menu_icon' => 'dashicons-star-filled',
    )
  );
}
add_action( 'init', 'uri_modern_home_create_feature_post_type' );

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
                array (
                    'key' => 'field_5ae37adc1dfcc',
                    'label' => 'Template',
                    'name' => 'template',
                    'type' => 'select',
                    'instructions' => 'Select the template to use.',
                    'choices' => array (
                        'default' => 'Default',
                        'external' => 'Minimal Branding',
                    ),
                    'default_value' => 'default',
                    'allow_null' => 0,
                    'multiple' => 0,
                ),
			),
			'location' => array(
				array(
					array(
						'param' => 'post_type',
						'operator' => '==',
						'value' => 'feature',
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
