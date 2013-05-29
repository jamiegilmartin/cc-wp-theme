<?php

/*
Template Name: News
*/
get_header(); ?>
<div id="content" class="cc-news">
	<section class="content">
		<!--TODO-->
		<div class="twitter-module ">
			<p class="title">TWITTER @UBcatclub &mdash; 2 days ago</p>
			<div class="tweet garamonditalic">Cat casting call, going on now, please visit us at our new website: <a href="#">http://t.co/XCOlseAa @UBcatclub</a></div>
		</div>
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
	</section>
</div>
<?php get_footer(); ?>