
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


// Contact Form

$(function() {
        var $inputs = $('form input[required], form textarea[required], select[required]');

        var displayFieldError = function($elem) {
            var $fieldRow = $elem.closest('.form-row');
            var $fieldError = $fieldRow.find('.field-error'); 
        };

        var hideFieldError = function($elem) {
            var $fieldRow = $elem.closest('.form-row');
            var $fieldError = $fieldRow.find('.field-error');
            if ($fieldError.length) {
                $fieldError.remove();
            }
        };

        $inputs.on('input', function() {
            var $elem = $(this);
            if (!$elem.get(0).checkValidity()) {
                $elem.addClass('error');
            } else {
                $elem.removeClass('error');
                hideFieldError($elem);
            }
        });

        

        var checkFieldsErrors = function() {
            //ustawiamy zmienną na true. Następnie robimy pętlę po wszystkich polach
            //jeżeli któreś z pól jest błędne, przełączamy zmienną na false.
            var fieldsAreValid = true;
            $inputs.each(function(i, elem) {
                var $elem = $(elem);
                //if (new RegExp(pattern).test($elem.val())) {
                if (elem.checkValidity()) {
                    hideFieldError($elem);
                    $elem.removeClass('error');
                } else {
                    displayFieldError($elem);
                    $elem.addClass('error');
                    fieldsAreValid = false;
                }
            });
            return fieldsAreValid;
        };

        $('.form').on('submit', function(e) {
            e.preventDefault();

            var $form = $(this);

            if (checkFieldsErrors($inputs)) {
                var dataToSend = $form.serializeArray();

         dataToSend = dataToSend.concat(
            $form.find('input:checkbox:not(:checked)').map(function() {
                return {"name": this.name, "value": this.value}
            }).get()
        );

                var $submit = $form.find(':submit');
                $submit.prop('disabled', 1);
                $submit.addClass('element-is-busy');

                $.ajax({
                    url : $form.attr('action'),
                    method: $form.attr('method'),
                    dataType : 'json',
                    data : dataToSend,
                    success: function(ret) {
                        if (ret.errors) {
                            ret.errors.map(function(el) {
                                return '[name="'+el+'"]'
                            });
                            checkFieldsErrors($form.find(ret.errors.join(',')));
                        } else {
                            if (ret.status=='ok') {
                                $form.replaceWith('<div class="form-send-success"><strong>Wiadomość została wysłana</strong><span>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej</span></div>');
                            }
                            if (ret.status=='error') {
                                $submit.after('<div class="send-error">Wysłanie wiadomości się nie powiodło</div>');
                            }
                        }
                    },
                    error : function() {
                        console.error('Wystąpił błąd z połączeniem');
                    },
                    complete: function() {
                        $submit.prop('disabled', 0);
                        $submit.removeClass('element-is-busy');
                    }
                });
            }
        })
    });