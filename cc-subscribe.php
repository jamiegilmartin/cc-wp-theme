<?php

/*
Template Name: Subscribe
*/

get_header(); ?>
<div id="content" class="cc-subscribe">
	<section class="content">
		<form action="<?php bloginfo('url'); ?>/subscribe" method="POST">
			<fieldset>
				<label><span>Name</span> : </label>
				<input name="n" id="name" maxlength="256" />
			</fieldset>
			<fieldset>
				<label><span>Email</span> : </label>
				<input name="e" id="email" type="email" maxlength="256" />
			</fieldset>
			<fieldset>
				<label><span>City</span> : </label>
				<input name="c" placeholder="e.g. Rome, Italy" id="city" maxlength="256" />
			</fieldset>
			<fieldset>
				<input type="submit" id="submit" class="submitBtn" value="submit" />
			</fieldset>
		</form>
		<?php
			/*
			http://codex.wordpress.org/Creating_Tables_with_Plugins
			http://net.tutsplus.com/tutorials/php/create-a-signup-form-with-email-confirmation/
			*/
			global $wpdb;
			$table_name = $wpdb->prefix . "sufs";
			mysql_connect('localhost', 'root', 'root') or die( "Unable to select database");
			mysql_select_db('ubcatclub') or die("I couldn't find the database table make sure it's spelt right!"); 


			if( 'POST' == $_SERVER['REQUEST_METHOD'] ) {
	
				$name = mysql_real_escape_string($_POST['n']);
				$email = mysql_real_escape_string($_POST['e']);
				$city = mysql_real_escape_string($_POST['c']);
	
				$action = array();  
				$action['result'] = null;  
	
				$text = array();  
	
				if(empty($name)){
					$action['result'] = 'error';  
					array_push($text,'You forgot your name');  
				}
				if(empty($email)){
					$action['result'] = 'error';  
					array_push($text,'You forgot your email');  
				}
				if(empty($city)){
					$action['result'] = 'error';  
					array_push($text,'You forgot your city');  
				}
	
				if($action['result'] !== 'error'){  

					$sql = "SELECT email from wp_sufs WHERE email = %s";
					$stmt = $wpdb->prepare($sql, $email);
					$checkEmail = $wpdb->query($stmt);
					if ($checkEmail > 0) {
			 			$alreadyInDb = 'Gotcha already, thanks';
					}else{
						$add = $wpdb->insert( $table_name, array( 'time' => current_time('mysql'), 'name' => $name, 'email' => $email, 'city' => $city ) );
					}
					
					if($add){
						//the user was added to the database
			
					}else{
						$action['result'] = 'error';  
						array_push($text,'User could not be added to the database. Reason: ' . mysql_error());  
					}
		
					//TODO: set cookie
					
					?>
						<!-- auxiliary -->
						<section class="auxiliary subscribeThanks">
							<h1>Thanks <?php echo $name; ?>.</h1>
							<p><?php 
							if($alreadyInDb){
								echo $alreadyInDb;
							}else{
								//echo 'name: '.$name.' email: '.$email.' city: '.$city.' ';
								echo 'We\'ll be in touch...';
							}
							?></p>
							<a href="<?php bloginfo('url'); ?>" class="homeBtn btn">Home</a>
						</section>
					<?php
				}else{
					
					
					?>
						
						<!-- auxiliary -->
						<section class="auxiliary subscribeErrors">
							<h1>Uh oh.</h1>
							<?php
								foreach($text as $t){
									echo '<p class="error">'.$t.'</p>';
								}
								
							?>
							<a href="<?php bloginfo('url'); ?>" class="homeBtn btn">Home</a>
						</section>
					<?php
		
				}
			}
		?>

	</section>
</div>
<?php get_footer(); ?>
