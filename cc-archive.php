<?php

/*
Template Name: Archive
*/
get_header(); ?>
<div id="content" class="cc-archive">
	<section class="content">
		<ul class="archiveList">
			<?php
			//do first  - build lists then loops
				$catId = get_cat_ID( 'Archive' );
				$catArgs = array(
					'child_of'=> $catId,
				);
				$categories = get_categories( $catArgs );
			
				foreach($categories as $category){
					echo $category->name;
					//Display the sub category information using $category values like $category->cat_name
					echo '<li class="view"><ul class="archiveStoryList">';
					foreach (get_posts('cat='.$category->term_id) as $post) {
				        setup_postdata( $post );
				        //echo '<li><a href="'.get_permalink($post->ID).'">'.get_the_title().'</a></li>';   
						echo '<li class="item">';
						get_template_part( 'cc', 'archiveItem');
						echo '</li>';
				    }  
				    echo '</ul></li>';
				}
			?>
		</ul>
		<!--
		$args= array(
			'posts_per_page' =>  100,
			'orderby' => 'date',
			'order' => 'ASC',
			'category_name' => $subCat->name
		);
		$loop = new WP_Query( $args );
		<div class="view">
			<ul class="modelList">
			<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
				<li class="item">
					<?php get_template_part( 'cc', 'archiveItem'); ?>
				</li>
			<?php endwhile; ?>
			</ul>
		</div>
		-->
	</section>
</div>
<?php get_footer(); ?>