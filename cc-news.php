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
		
		<?php
			/*
			$twitterFeedURL = get_stylesheet_directory_uri() .'twitterfeed.class.php';
			echo $twitterFeedURL;
			include_once($twitterFeedURL);

			$feed = new TwitterFeed(array(
				'username' => 'jamiegilmartin'//,
				//'cache_file' => '/var/www/twitterfeed/cache_1.txt'
			));

			$tweets = $feed->getAll();

			var_dump($tweets);
			*/
		?>
		
		<div class="twitter-module ">
			<p class="title"><a href="#">Twitter</a> @<a href="#">UBcatclub</a> &mdash; 2 days ago</p>
			<div class="tweet garamonditalic">Cat casting call, going on now, please visit us at our new website: <a href="#">http://t.co/XCOlseAa</a> @<a href="#">UBcatclub</a></div>
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
