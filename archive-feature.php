<?php
/**
 * The template for displaying Feature archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package uri-modern
 */

get_header(); ?>

	<main id="main" class="site-main" role="main">

	<?php
	if ( have_posts() ) :
	?>

		<div class="cl-tiles thirds">
		<?php
		/* Start the Loop */
		while ( have_posts() ) :
			the_post();

			$presentation = 'card'; // Choose 'card' or 'scard'

			if ( 'scard' == $presentation && function_exists( 'uri_cl_shortcode_scard' ) ) {

				echo do_shortcode( '[cl-scard post="' . get_the_ID() . '" showcat="false"]' );

			} else if ( 'card' == $presentation && function_exists( 'uri_cl_shortcode_card' ) ) {

				echo do_shortcode( '<div>[cl-card title="' . get_the_title() . '" body="' . str_replace( array( '[', ']', '"' ), array( '&#91;', '&#93;', '&#34;' ), get_the_excerpt() ) . '" link="' . get_permalink() . '" img="' . get_the_post_thumbnail_url() . '" button="Read More"]</div>' );

			} else {
				/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
				 */
				get_template_part( 'template-parts/content-feature' );

			}

		endwhile;

		?>
		</div>
		<?php

		the_posts_navigation();

	else :

		get_template_part( 'template-parts/content', 'none' );

	endif;
	?>

	</main><!-- #main -->

<?php
get_footer();
