<?php

/*
Template Name: Models
*/
get_header(); ?>
<div id="content" class="cc-models">
	<section class="content">

		<?php
			$zargs = array(
			    'type' => 'yearly'
			);
			//wp_get_archives($zargs);
		?>
		
		<?php
		/*
			$args= array(
				'posts_per_page' =>  100,
				'orderby' => 'date',
				'order' => 'DSC',
				'category_name' => 'Models'
			);
			$loop = new WP_Query( $args );
			*/
		?>
		
		<?php
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

		  for ( $counter = intval($oldest); $counter <= intval($newest); $counter += 1) {

		    $args=array(
		      'year'     => $counter,
		      'posts_per_page' => -1,
		      'orderby' => 'date',
		      'order' => 'DSC',
			'category_name' => 'Models',
		      'caller_get_posts'=>1
		    );

		    $my_query = new WP_Query($args);
		    if( $my_query->have_posts() ) {
		      echo '<h2>Posts for ' . $counter . '</h2>';
		      while ($my_query->have_posts()) : $my_query->the_post(); ?>
		        <p><small><?php the_time('F jS, Y') ?></small> <a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></p>
		       <?php
		        //the_content('Read the rest of this entry &raquo;');
		      endwhile;
		    } //if ($my_query)
		  wp_reset_query();  // Restore global post data stomped by the_post().
		  }
		}
		?>
		<div class="view">
			<ul class="modelList">
			<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
				
				<?php 
				/*
					$year = ubcc_year();
					$years = array();
					array_push($years, $year);
					foreach($years as $y){
						echo $y;
					}
				*/
				 ?>
				<li class="item">
					<?php //get_template_part( 'cc', 'modelItem'); ?>
				</li>
			<?php endwhile; ?>
			</ul>
		</div>
		
	</section>
</div>
<?php get_footer(); ?>
