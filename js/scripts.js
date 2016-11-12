$(function(){

	console.log("It's working");

});


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


//typed.js
$(function(){
    $(".element").typed({
        strings: [ "Accessible coder.", "Teacher.", "Gardener.", "Cat lover.", "Video games👾."],
            typeSpeed: 30,
            startDelay: 0,
            backSpeed: 20,
            backDelay:1900,
            loop:true
    });
});

// smooth scroll //
  $(document).on('click', 'a', function(e){
      e.preventDefault();

      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 550);
  });