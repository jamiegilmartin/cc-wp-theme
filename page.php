<?php get_header(); ?>
<div id="content" class="cc-news">
	<section class="content">
		<article class="entry">
			PAGEPAGE
			<?php the_post(); ?>
			<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<h1 class="entry-title"><?php the_title(); ?></h1>
				<div class="entry-content">
				<?php 
				if ( has_post_thumbnail() ) {
				the_post_thumbnail();
				} 
				?>
				<?php the_content(); ?>
				<?php wp_link_pages('before=<div class="page-link">' . __( 'Pages:', 'blankslate' ) . '&after=</div>') ?>
				<?php edit_post_link( __( 'Edit', 'blankslate' ), '<div class="edit-link">', '</div>' ) ?>
				</div>
			</div>
			<?php comments_template( '', true ); ?>
		</article>
		PAGEPAGE
	</section>
</div>
<?php get_footer(); ?>