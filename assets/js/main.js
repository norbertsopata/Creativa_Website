
var menuStatus = false;
var windowWidth = $(window).width();

$(document).ready(function(){

  $(window).resize(function(){
      windowWidth = $(window).width();
      console.log(windowWidth);
      return windowWidth;
  });


  menuToggle();
  showSubmenu();

});

function menuToggle(){
  $(".navbar-toggle").on("click", function(){ 
    if(!menuStatus){
      openMenu();
      } else {
        closeMenu();
      }
  });
   // CLose submenu after link click
   $(".nav-list__item a[href]").on("click", function(){
    closeMenu();
   });
}
  // Open menu function
function openMenu(){
     $(".navigation").addClass("navigation__opened");
     menuStatus = true;
}
  // Close menu function
function closeMenu(){
     $(".navigation").removeClass("navigation__opened");
     menuStatus = false;
}
  // Show and Hide Submenu
function showSubmenu(){
   $("#projects").on("click", function(){
    console.log(windowWidth);
    if(windowWidth <= 800){
    $(".navigation-submenu").toggle();
  } else {
    return;
  }
  });
}


