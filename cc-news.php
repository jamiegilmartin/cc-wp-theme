<?php

/*
Template Name: News
*/
get_header(); ?>
<div id="content" class="cc-news">

	<?php
		$args= array(
			'posts_per_page' => 5,
			'orderby' => 'date',
			'order' => 'DSC',
			'category_name' => 'News'
		);
		$loop = new WP_Query( $args );
	?>
	<ul class="contentList">
	<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
		<li>
			<?php get_template_part( 'cc', 'newsItem'); ?>
		</li>
	<?php endwhile; ?>
	</ul>
</div>
<?php get_footer(); ?>