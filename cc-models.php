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
			$args= array(
				'posts_per_page' =>  100,
				'orderby' => 'date',
				'order' => 'ASC',
				'category_name' => 'Models'
			);
			$loop = new WP_Query( $args );
		?>
		<div class="view">
			<ul class="modelList">
			<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
				<li class="item">
					<?php get_template_part( 'cc', 'modelItem'); ?>
				</li>
			<?php endwhile; ?>
			</ul>
		</div>
	</section>
</div>
<?php get_footer(); ?>