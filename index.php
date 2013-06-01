<?php get_header(); ?>
	<div id="content" class="cc-home">
		<!-- <?php while ( have_posts() ) : the_post() ?>
				<?php get_template_part( 'entry' ); ?>
				<?php endwhile; ?> -->
				
		<?php
			$page = get_page_by_title('Home');
			$page_id = $page->ID;
			$page_data = get_page( $page_id );
	
			echo apply_filters('the_content', $page_data->post_content);
		?>
	</div>
<?php get_footer(); ?>