inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initDropDown();
    getHeader();
    initToolToast();
    geraBreadcrumb();
    volta();
  });
}



function initDropDown() {
  $(".dropdown-trigger").dropdown({ coverTrigger: false, hover: false, constrainWidth: false });
}

function getHeader() {
  let req = new XMLHttpRequest();
  req.open('GET', '/', false);
  req.send(null);
  if (req.getResponseHeader('autenticado') == 'true') {
    $('.loginout').attr('href', '/logout')
    $('.loginout').html(`Logout<i class="material-icons left">radio_button_checked</i>`)

  }
}

function initToolToast() {
  let toastHTML = `<span>${$('#msg').text()}</span><button class="btn-flat toast-action">Ok</button>`;
  $('.tooltipped').tooltip();
  if ($('#toastsucesso').hasClass('ctoastsucesso')) {
    M.toast({ html: toastHTML });
  }

  $('.toast-action').click(function () {
    M.Toast.dismissAll();
  })
}

function geraBreadcrumb() {
  let links = [];
  links.push({ nome: 'Início', link: '/' })
  links.push({ nome: ($('.titulo').text()), link: location.pathname })
  links.push({ nome: 'Página anterior', link: '#' })
  if (location.pathname!='/'&&location.pathname!='') {
    $('header').after(`
        <div class="nav-wrapper breads">
        <div class='row'>
        <div class="col offset-s2">
          <a href="${links[0].link}" class="breadcrumb center">${links[0].nome}</a>
          <a href="${links[2].link}" class="breadcrumb center go-back">${links[2].nome}</a>
         <a href="${links[1].link}" class="breadcrumb center">${links[1].nome}</a>      
       </div>
     </div>
      </div>`)
  }
}
function volta() {
  $('.go-back').click(function () {
    window.history.back();
  })
}