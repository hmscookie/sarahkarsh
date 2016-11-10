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

// $(function(){
//     $(".element").typed({
//         strings: ["hello my name is sarah.", "Second sentence."],
//             typeSpeed: 30,
//     });
// });