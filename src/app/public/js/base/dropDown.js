inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initDropDown();
    getHeader();
    initToolToast();
  });
}

function initDropDown() {
  $(".dropdown-trigger").dropdown({ coverTrigger: false, hover: false, constrainWidth: false });
}

function getHeader() {
  let req = new XMLHttpRequest();
  req.open('GET', document.location, false);
  req.send(null); 
  if (req.getResponseHeader('autenticado')=='true') {
    $('.loginout').attr('href', '/logout')
    $('.loginout').html(`Logout<i class="material-icons left">radio_button_checked</i>`)

  }
}

function initToolToast(){
  var toastHTML = `<span>${$('#msg').text()}</span><button class="btn-flat toast-action">Ok</button>`;     
      $('.tooltipped').tooltip();          
      if($('#toastsucesso').hasClass('ctoastsucesso')){
          M.toast({html: toastHTML});
      }

      $('.toast-action').click(function(){
          M.Toast.dismissAll();
      })
}