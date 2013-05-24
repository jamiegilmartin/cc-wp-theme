<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta http-equiv="content-type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
<title><?php wp_title(' | ', true, 'right'); ?></title>
<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />

<script src="<?php echo bloginfo( 'template_url' ); ?>/js/utils.js"></script>
<script src="<?php echo bloginfo( 'template_url' ); ?>/js/animator.js"></script>
<script src="<?php echo bloginfo( 'template_url' ); ?>/js/slideShow.js"></script>
<script src="<?php echo bloginfo( 'template_url' ); ?>/js/main.js"></script>

<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div id="wrapper" class="hfeed">
		<header id="cc-header" class="closed">
			<section class="content">
				<div class="dot"></div>
				<div id="branding">
					<div id="site-title">
						<a href="/">
						<?php if ( is_singular() ) {} else {echo '<h1>';} ?><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php bloginfo( 'name' ) ?>" rel="home"><?php bloginfo( 'name' ) ?></a><?php if ( is_singular() ) {} else {echo '</h1>';} ?>
						</a>
					</div>
				</div>
				<nav>
					
					<?php wp_nav_menu(); ?>
					<!-- <?php get_template_part( 'nav' ); ?> -->
				</nav>
				<section class="about">
					<?php
					//$page = get_page_by_path('about');
					//echo apply_filters('the_content', $page->content);
					//include "wp-load.php";
					$page = get_page_by_title('About');
					$page_id = $page->ID;
					$page_data = get_page( $page_id );
				
					echo apply_filters('the_content', $page_data->post_content);
					?>
				</section>
			</section>
		</header>
		<div id="container">