<?php
/**
 * The template for displaying all Feature single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package uri-modern
 */

$template = null;
if ( uri_modern_home_get_field( 'template' ) ) {
	$template = uri_modern_home_get_field( 'template' );
}

get_header( $template );

if ( uri_modern_home_get_field( 'stylesheet' ) ) : ?>
	<style>@import url( <?php the_field( 'stylesheet' ); ?> )</style>
<?php endif; ?>

	<main id="main" class="site-main" role="main">

		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content-feature' );

			the_post_navigation(
				array(
					'prev_text' => 'Previous feature',
					'next_text' => 'Next feature',
				)
			);

		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();
