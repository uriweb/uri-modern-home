<?php
/**
 * Blue Minds - Story Block Template
 *
 * @package uri-modern-home
 */

 ?>

 <section class="story" id="<?php echo $atts['wrapper_id']; ?>">
  <div class="story-container breakout">
	<div class="teaser-wrapper">
	  <div class="teaser-content">

			<div class="teaser-media">
		  <?php echo $atts['media_html']; ?>
			</div>

			<div class="teaser-overlay"></div>

	  <div class="text-content-block">

			  <div class="teaser-click-target-wrapper">

				<a href="<?php echo get_permalink( $atts['post_id'] ); ?>" class="teaser-click-target" data-id="<?php echo $atts['wrapper_id']; ?>">
					<h1><?php echo $atts['h1']; ?></h1>
					<h2><?php echo $atts['h2']; ?></h2>
					<div class="teaser-click-icon"><span></span></div>
				</a>

			  </div>

		<div class="story-content-wrapper breakout">
				<div class="story-content content-width">

				<?php

			if ( shortcode_exists( 'display-posts' ) ) {
					  echo do_shortcode( '[display-posts id="' . $atts['post_id'] . '" post_type="feature" include_excerpt="false" include_content="true" include_title="false" wrapper="div" wrapper_class="story-body-wrapper" content_class="story-body"]' );
			}

			?>

				</div>
			</div>

	  </div>

	  </div>
	</div>
  </div>
</section>
