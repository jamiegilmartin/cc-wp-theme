<?php

/*
Template Name: Store
*/
get_header(); ?>
<div id="content" class="cc-store">
	<section class="content">
		<?php
			$args= array(
				'posts_per_page' => 500,
				'orderby' => 'date',
				'order' => 'ASC',
				'category_name' => 'Store'
			);
			$loop = new WP_Query( $args );
		?>
		<ul class="contentList">
		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
			<li class="item">
				<?php get_template_part( 'cc', 'storeItem'); ?>
			</li>
		<?php endwhile; ?>
		</ul>
	</section>
</div>
<?php get_footer(); ?>