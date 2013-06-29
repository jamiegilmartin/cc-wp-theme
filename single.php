<?php get_header(); ?>
<div id="content" class="cc-news">
	<section class="content">
		<ul class="contentList">
		<?php if (have_posts()) :while ( have_posts() ) : the_post(); ?>
			<li class="item">
				<?php get_template_part( 'cc', 'newsItem'); ?>
			</li>
		<?php endwhile; endif; ?>
		</ul>
		
		<div class="navigation">
			<p class="backToTop"><a href="<?php echo esc_url( get_permalink( get_page_by_title( 'News' ) ) ); ?>" onclick="window.scrollTo(0,0);">Back to List</a></p>
			<p class="nav-next"><?php next_post_link( '%link', 'Next Post' ) ?></p>
			<p class="nav-previous"><?php previous_post_link( '%link', 'Previous Entry' ) ?></p>
			
			
		</div>
			
	</section>
</div>
<?php get_footer(); ?>
