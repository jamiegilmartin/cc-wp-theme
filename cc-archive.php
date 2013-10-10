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
					//echo $category->name;
					//Display the sub category information using $category values like $category->cat_name
					echo '<li class="story"><ul class="archiveStoryList">';
					$args = array(
					   'posts_per_page'=> 500,
					   'category'=>'cat='.$category->term_id
					);
					foreach (get_posts($args) as $post) {
				        setup_postdata( $post );
				        //echo '<li><a href="'.get_permalink($post->ID).'">'.get_the_title().'</a></li>';   
						echo '<li class="item"><article class="entry"><header><h2 class="title"><a href="javascript:void(0);">';
						echo $category->name;
						echo '</a></h2></header><div class="imgHolder"></div><section class="content"><p class="name">';
						echo $category->name;
						echo '</p>';
						the_content();
						echo '</section></article>';
						echo '</li>';
				    }  
				    echo '</ul></li>';
				}
			?>
		</ul>
	</section>
</div>
<?php get_footer(); ?>