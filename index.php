<?php get_header(); ?>
	<div id="content">
		<?php while ( have_posts() ) : the_post() ?>
		<?php get_template_part( 'entry' ); ?>
		<?php endwhile; ?>
	</div>
<?php get_footer(); ?>