<?php

/*
Template Name: Models
*/
get_header(); ?>
<div id="content" class="cc-models">
	<section class="content">
		<?php
		// @see - http://wordpress.org/support/topic/sort-posts-by-year-and-alphabetically#post-1300381
		$args=array(
		    'orderby' => 'date',
		    'order' => 'ASC',
			'category_name' => 'Models',
		    'posts_per_page' => 1,
		    'caller_get_posts'=>1
		);
		$oldestpost =  get_posts($args);

		$args=array(
		    'orderby' => 'date',
		    'order' => 'DESC',
			'category_name' => 'Models',
		    'posts_per_page' => 1,
		    'caller_get_posts'=>1
		);
		$newestpost =  get_posts($args);

		if ( !empty($oldestpost) && !empty($newestpost) ) {
		  $oldest = mysql2date("Y", $oldestpost[0]->post_date);
		  $newest = mysql2date("Y", $newestpost[0]->post_date);

		  for ( $counter = intval($newest); $counter >= intval($oldest); $counter -= 1) {
			
		    $args=array(
				'year'     => $counter,
				'posts_per_page' => -1,
				'orderby' => 'date',
				'order' => 'ASC',
				'category_name' => 'Models',
				'caller_get_posts'=>1
		    );

			$my_query = new WP_Query($args);
			if( $my_query->have_posts() ) {
				echo '<div class="view"><h2 class="date">' . $counter . '</h2>';
				echo '<ul class="modelList">';
				while ($my_query->have_posts()) : $my_query->the_post();
			?>
				<li class="item">
					<?php get_template_part( 'cc', 'modelItem'); ?>
				</li>
			<?php
				endwhile;
				echo '</ul></div>';
		    } //if ($my_query)
			wp_reset_query();  // Restore global post data stomped by the_post().
		  }
		}
		?>
		
	</section>
</div>
<?php get_footer(); ?>
