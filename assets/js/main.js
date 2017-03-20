
var menuStatus = false;

$(document).ready(function(){
  menuToggle();

});

function menuToggle(){
  $(".navbar-toggle").on("click", function(){ 
    if(!menuStatus){
      openMenu();
      } else {
        closeMenu();
      }
  });
   showSubmenu();

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
    $(".navigation-submenu").toggle();
  });
}

