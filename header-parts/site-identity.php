<?php
/**
 * The template for the site identity
 *
 * @package uri-modern-home
 */

?>

<div id="siteidentity">
			
	<h1 class="site-title">
		
		<?php

		$ancestor_title_whitelist = explode( "\n", get_option( 'use_ancestor_title_whitelist' ) );

		$ancestors = get_ancestors( get_the_ID(), 'page' );
		$top_ancestor_id = ( is_array( $ancestors ) && ! empty ( $ancestors[0] ) ) ? $ancestors[0] : NULL;
		$top_ancestor_title = empty( $top_ancestor_id ) ? get_the_title() : get_the_title( $top_ancestor_id );

		$this_post_type = get_post_type( get_the_ID() );

		if ( in_array( $top_ancestor_title, $ancestor_title_whitelist ) ) {

			$site_title = $top_ancestor_title;
			$site_title_url = get_permalink( $top_ancestor_id );

		} else if ( 'Gateway' == $top_ancestor_title ) {

			$site_title = get_the_title();
			$site_title_url = get_permalink();

		} else if ( 'feature' == $this_post_type ) {

			$site_title = 'Features';
			$site_title_url = get_post_type_archive_link( $this_post_type );

		} else {

			$site_title = get_bloginfo( 'name' );
			$site_title_url = esc_url( home_url( '/' ) );

		}

		?>
		
		<a href="<?php echo $site_title_url; ?>" rel="home">
			<?php echo $site_title; ?>
		</a>
	</h1>
	<?php
	$description = get_bloginfo( 'description', 'display' );
	if ( $description || is_customize_preview() ) :
	?>
		<h2 class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></h2>
	<?php
	endif;
	?>

</div>
