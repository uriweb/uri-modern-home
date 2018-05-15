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

		<header class="page-header">
			<h1 class="page-title">Features</h1>
		</header><!-- .page-header -->

		<?php
		/* Start the Loop */
		while ( have_posts() ) :
			the_post();

			/*
			 * Include the Post-Format-specific template for the content.
			 * If you want to override this in a child theme, then include a file
			 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
			 */
			get_template_part( 'template-parts/content-feature' );

		endwhile;

		the_posts_navigation();

	else :

		get_template_part( 'template-parts/content', 'none' );

	endif;
	?>

	</main><!-- #main -->

<?php
get_footer();
