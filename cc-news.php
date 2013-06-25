<?php

/*
Template Name: News
*/
get_header(); ?>
<div id="content" class="cc-news">
	<section class="content">
		<!--<div class="twitter-module">
			<a class="twitter-timeline" href="https://twitter.com/jamiegilmartin" data-widget-id="347109372226334720" data-chrome="nofooter noheader transparent noborders" data-tweet-limit="1">Tweets by @jamiegilmartin</a>
			<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
		</div>
		TODO-->
		<div class="twitter-module ">
			<p class="title">TWITTER @UBcatclub &mdash; 2 days ago</p>
			<div class="tweet garamonditalic">Cat casting call, going on now, please visit us at our new website: <a href="#">http://t.co/XCOlseAa @UBcatclub</a></div>
		</div>
		<?php
			$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
			$args= array(
				'posts_per_page' => 15,
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
			//global $wp_query; 
			$total_pages = $wp_query->max_num_pages; 
			//echo $published_posts ;
			$posts = get_posts('category=news');
			$count = count($posts);

			//echo '<br /><br />'.$count;
			//if ( $total_pages > 1 ) { ?>
				
			<!--
			<div id="nav-below" class="navigation">
				<p class="nav-previous">Older News<?php next_posts_link(__( '<span class="meta-nav">&laquo;</span> older articles' )) ?></p>
				<p class="nav-next">Newer News<?php previous_posts_link(__( 'newer articles <span class="meta-nav">&raquo;</span>')) ?></p>
			</div>-->
		
			<div class="navigation">
				<p class="backToTop"><a href="javascript:void(0);" onclick="window.scrollTo(0,0);">Back to Top</a></p>
				<p class="nav-next"><a href="javascript:void(0);">Newer News</a></p>
				<p class="nav-previous"><a href="javascript:void(0);">Older News</a></p>
			</div>
		
		<?php // } ?>
		
	</section>
</div>
<?php get_footer(); ?>