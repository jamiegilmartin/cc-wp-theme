
<article class="entry">
		<header>
			<h2 class="title"><a href="javascript:void(0);"><?php the_title(); ?></a></h2>
		</header>
		<div class="imgHolder"></div>
		<section class="content">
			<div class="meta">
				<p class="name">Name: <?php the_title(); ?></p>
				<?php the_meta(); ?>
			</div>
			<?php the_content(); ?>
		</section>
		
</article>