<?php

/*
Template Name: News
*/
get_header(); ?>
<div id="content" class="cc-news">
	<section class="content">
		<!-- http://wordpress.org/plugins/rotatingtweets/-->
		<div class="twitter-module ">
		<p class="title"><a href="https://twitter.com/unitedbamboo" target"_blank">Twitter</a> @<a href="https://twitter.com/unitedbamboo" target"_blank">UBcatclub</a></p>
		<?php echo do_shortcode("[rotatingtweets screen_name='unitedbamboo' rotation_type='none' ]"); ?>
		</div>
		
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
