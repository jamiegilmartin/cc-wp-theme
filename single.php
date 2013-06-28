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
			<p class="backToTop"><a href="javascript:void(0);" onclick="window.scrollTo(0,0);">Back to Top</a></p>
			<p class="nav-next"><a href="javascript:void(0);">Newer News</a></p>
			<p class="nav-previous"><a href="javascript:void(0);">Older News</a></p>
		</div>
			
	</section>
</div>
<?php get_footer(); ?>
