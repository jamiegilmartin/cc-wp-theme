<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta http-equiv="content-type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
<title><?php wp_title(' | ', true, 'right'); ?> UB Cat Club</title>
<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />

<!--[if lt IE 10]>
<script>
document.createElement('header');
document.createElement('nav');
document.createElement('section');
document.createElement('article');
document.createElement('aside');
document.createElement('footer');
document.createElement('hgroup');
</script>

<style>

header
,nav
,section
,article
,aside
,footer
,hgroup 
{ 
display: block;
}

</style>
<script src="<?php echo bloginfo( 'template_url' ); ?>/js/shims.js" type="text/javascript" charset="utf-8"></script> 
<![endif]-->
<script src="<?php echo bloginfo( 'template_url' ); ?>/js/libraries/greensock/TweenMax.min.js"></script>

<script src="<?php echo bloginfo( 'template_url' ); ?>/js/libraries/widgets.js"></script>

<script src="<?php echo bloginfo( 'template_url' ); ?>/js/utils.js"></script>
<!--<script src="<?php echo bloginfo( 'template_url' ); ?>/js/screensaver.js"></script>-->
<script src="<?php echo bloginfo( 'template_url' ); ?>/js/slideShow.js"></script>
<script src="<?php echo bloginfo( 'template_url' ); ?>/js/slideShowVertical.js"></script>
<script src="<?php echo bloginfo( 'template_url' ); ?>/js/main.js"></script>


<link href="//cloud.webtype.com/css/a32f59da-8972-4ea4-af8c-8b3f9047dda9.css" rel="stylesheet" type="text/css" />

<link type="text/css" rel="stylesheet" href="http://fast.fonts.com/cssapi/a4d8896a-8bbe-4120-94f7-f4ac84fd9314.css"/>

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
				</nav>
				<section class="about">
					<?php
						$page = get_page_by_title('About');
						$page_id = $page->ID;
						$page_data = get_page( $page_id );
				
						echo apply_filters('the_content', $page_data->post_content);
					?>
				</section>
			</section>
		</header>
		<div id="container">