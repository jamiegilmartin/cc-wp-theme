
<article class="entry">
		<header>
			<div class="date"><?php ubcc_posted_on(); ?></div>
			<h2 class="title"><a href="javascript:void(0);"><?php the_title(); ?></a></h2>
		</header>
		
		<section class="content">
			<?php
			global $more;
			$more = 0;
			?>
			<?php the_content('...more'); ?>
		</section>
		
</article>
