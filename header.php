<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<?php // Load Meta ?>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Web developer">
  <meta name="keywords" content="HTML,CSS,Jquery,JavaScript,WordPress">
  <meta name="author" content="Sarah Karsh">
  <title><?php  wp_title('|', true, 'right'); ?></title>
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
  <!-- stylesheets should be enqueued in functions.php -->
  <?php wp_head(); ?>
</head>


<body <?php body_class(); ?> class="clearfix">
<div class="preloader"></div>

<header>
  <div class="container wrapper">
    <ul class="topnav" id="myTopnav">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About Me</a></li>
    <li><a href="#work">My Work</a></li>
    <li><a href="#contact">Contact Me</a></li>
    <li class="icon">
      <a href="javascript:void(0);" onclick="myFunction()">&#9776;</a>
  </li>
</ul>




  </div> <!-- /.container -->

</header><!--/.header-->

