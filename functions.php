<?php

if ( ! function_exists( 'ubcc_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 * Create your own twentyeleven_posted_on to override in a child theme
 *
 * @since Twenty Eleven 1.0
 */
function ubcc_posted_on() {
	/*printf( __( '<span class="sep">Posted on </span><a href="%1$s" title="%2$s" rel="bookmark"><time class="entry-date" datetime="%3$s" pubdate>%4$s</time></a><span class="by-author"> <span class="sep"> by </span> <span class="author vcard"><a class="url fn n" href="%5$s" title="%6$s" rel="author">%7$s</a></span></span>', 'twentyeleven' ),*/
	printf( __( '<a href="%1$s" title="%2$s" rel="bookmark"><time class="entry-date" datetime="%3$s" pubdate>%4$s</time> &nbsp; </a>', 'ubcc' ),
		esc_url( get_permalink() ),
		esc_attr( get_the_time() ),
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date( 'm.d.Y' ) )
		/*,
		esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
		esc_attr( sprintf( __( 'View all posts by %s', 'twentyeleven' ), get_the_author() ) ),
		get_the_author()*/
	);
}
endif;


// posts per page based on CPT
function iti_custom_posts_per_page($query)
{
    switch ( $query->query_vars['category_name'] )
    {
        case 'News':  // Post Type named 'iti_cpt_1'
            $query->query_vars['posts_per_page'] = 5;
            break;
        default:
            break;
    }
    return $query;
}

if( !is_admin() )
{
    //add_filter( 'pre_get_posts', 'iti_custom_posts_per_page' );
}