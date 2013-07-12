<?php

/*
Template Name: News
*/
get_header(); ?>
<div id="content" class="cc-news">
	<section class="content">
		<!--<
		<div class="twitter-module ">
			<p class="title"><a href="#">Twitter</a> @<a href="#">UBcatclub</a> &mdash; 2 days ago</p>
			<div class="tweet garamonditalic">Cat casting call, going on now, please visit us at our new website: <a href="#">http://t.co/XCOlseAa</a> @<a href="#">UBcatclub</a></div>
		</div>
		TODO-->
		<!-- http://wordpress.org/plugins/rotatingtweets/-->
		
		

		
		<?php echo do_shortcode("[rotatingtweets screen_name='jamiegilmartin']"); ?>
		
		
		<?php
			$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
			$args= array(
				'posts_per_page' => 5,
				'orderby' => 'date',
				'order' => 'DSC',
				'category_name' => 'News',
				'paged' => $paged
			);
			$loop = new WP_Query( $args );
		?>
		<ul class="contentList">
		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
			<li class="item">
				<?php get_template_part( 'cc', 'newsItem'); ?>
			</li>
		<?php endwhile; ?>
		</ul>
		
			<!--@see : http://wordpress.org/support/topic/adding-pagination-to-a-wp_query-loop#post-1497116 -->
			<div class="navigation">
				
				<p class="backToTop"><a href="javascript:void(0);" onclick="window.scrollTo(0,0);">Back to Top</a></p>
				<p class="nav-next"><?php previous_posts_link('Newer News') ?></p>
				<p class="nav-previous"><?php next_posts_link('Older News', $loop->max_num_pages) ?></p>
				
				
				
			</div>
		
		<?php // } ?>
		
	</section>
</div>
<?php get_footer(); ?>
