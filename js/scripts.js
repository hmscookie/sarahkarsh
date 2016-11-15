$(function(){

	console.log("It's working, nice!");

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


$('a').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();

            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top}, 800, function() {
                    window.location.hash = hash;
                });
        }
    });

$(window).load(function() {
   $('.preloader').fadeOut('slow');
});