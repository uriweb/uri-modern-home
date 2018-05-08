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

		$top_ancestor_id = get_ancestors( get_the_ID(), 'page' )[0];
		$top_ancestor_title = empty( $top_ancestor_id ) ? get_the_title() : get_the_title( $top_ancestor_id );

		if ( in_array( $top_ancestor_title, $ancestor_title_whitelist ) ) {

			$site_title = $top_ancestor_title;
			$site_title_url = get_permalink( $top_ancestor_id );

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
