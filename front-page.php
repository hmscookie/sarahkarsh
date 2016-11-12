<?php get_header();  ?>

  <div class="content">
    <?php if( have_posts()) while( have_posts()) : the_post(); ?>
        
    <section class="my-home" id="home">
      <div class="info">
        <h1><?php   the_field('title')?> </h1>
        <h2><?php the_field('name') ?></h2>
        <h2>FRONT End developer | </h2>
        <h2 class="element"> </h2>
        
      </div>
    </section>
  </div>

  <section class="about-me" id="about">
      <div class="wrapper">
        <div class="about-flex">
          <div class="my-pic">
            <h2><?php the_field('about_title') ?> </h2>
            
              <p><?php the_field('about_para') ?> </p>
          </div>
          <div class="sarah-me">
           <?php $meimage = get_field('about_img') ?>
            <img src="<?php echo $meimage['url'] ?>" alt="">
          </div>
        </div>
        <h3>My skills</h3>
        <div class="devicons">
          <i class="devicon-css3-plain-wordmark"></i>
          <i class="devicon-html5-plain-wordmark"></i>
          <i class="devicon-sass-original"></i>
          <i class="devicon-javascript-plain"></i>
          <i class="devicon-jquery-plain"></i>
          <i class="devicon-git-plain"></i>
          <i class="devicon-github-plain-wordmark"></i>
          <i class="devicon-gulp-plain"></i>
          <i class="devicon-wordpress-plain"></i>
          <i class="devicon-android-plain"></i>
       </div>
      </div>
  </section>
    
  <section class="my-work" id="work">
    <h2><?php the_field('work_title') ?> </h2>
    <?php while(have_rows('my_work')) : the_row(); ?>
      <div class="wrapper workOne">
        <div class="work-text">
          <p> <?php the_sub_field('project_title') ?> </p>
          <p><?php the_sub_field('project_description') ?></p>
          <button><?php the_sub_field('project_button') ?> </button>
        </div>
        <div class="work-img">
          <?php $workimage = get_sub_field('project_image') ?>
          <img src="<?php echo $workimage['url'] ?>" alt="">
        </div>
      </div>
        <?php endwhile ?>
  </section>
  <section class="contact-me" id="contact">

          <h2><?php the_field('contact_title') ?></h2>

      <div class="wrapper contact-flex">
        <div class="contact-form">
          <?php echo do_shortcode('[contact-form-7 id="28" title="Contact"]')?> 
        </div>
<!--         <div class="address"> -->
        <div class="address">
          <h3><?php the_field('address_h3') ?></h3>
          <p><?php the_field('address') ?> </p>
          <h3><?php the_field('social_networks') ?></h3>

          <div class="icon-flex">
             <a href="https://twitter.com/SarahKarsh"><i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i></a>
             <a href="https://github.com/hmscookie"><i class="fa fa-github-square fa-2x" aria-hidden="true"></i></a>
            <a href="https://ca.linkedin.com/in/sarah-karsh-5915b770"><i class="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
        <div class="connect">
          <h3><?php the_field('connect_h3') ?></h3>
          <p> <i class="fa fa-phone-square " aria-hidden="true"></i> 416-802-4634</p>
          <p><i class="fa fa-envelope-o " aria-hidden="true"></i> savkarsh [at] gmail.com</p>
          <p><i class="fa fa-mouse-pointer " aria-hidden="true"></i> sarahkarsh.com</p>
        </div>
      </div>
    </section>

      <?php endwhile; // end the loop?>
    </div> <!-- /,content

  <!-- </div> /.container -->


<?php get_footer(); ?>