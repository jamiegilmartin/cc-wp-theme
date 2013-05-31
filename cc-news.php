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
		
		<?php
			//not working!!!! TODO
			
			/*set max number of pages @see http://wpengineer.com/1263/correct-pagination-with-get_posts/*/
			$ppp = get_option('posts_per_page');
			//echo $ppp.'<br /><br />';
			$published_posts = wp_count_posts()->publish;
			global $wp_query; $total_pages = $wp_query->max_num_pages; 
			echo $total_pages ;
			//if ( $total_pages > 1 ) { ?>
			
			<div id="nav-below" class="navigation">
				<p class="nav-previous">Older News<?php next_posts_link(__( '<span class="meta-nav">&laquo;</span> older articles' )) ?></p>
				<p class="nav-next">Newer News<?php previous_posts_link(__( 'newer articles <span class="meta-nav">&raquo;</span>')) ?></p>
			</div>
		
		<?php // } ?>
		
	</section>
</div>
<?php get_footer(); ?>