inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initDropDown();
    getHeader();
    initToolToast();
    geraBreadcrumb();
    download();
    volta();
    getProfile();
  });
}


function download(){
  $('.dropdownDownload').dropdown({ coverTrigger: false, hover: false, constrainWidth: false });  
  $('.pdfDown').click(() =>{
      table.download("pdf", `${$('.titulo').text()}.pdf`, {
          orientation:"portrait",
          title: `${$('.titulo').text()}`,
          format: 'a4',
      });
  });
  $('.csvDown').click(() =>{
      table.download("csv", `${$('.titulo').text()}.csv`);
  });
  $('.xlsxDown').click(() =>{
      table.download("xlsx", `${$('.titulo').text()}.xlsx`, {sheetName:"Relatório"});
  })
}

function initDropDown() {
  $(".dropdown-trigger").dropdown({ coverTrigger: false, hover: false, constrainWidth: false });
}

function getProfile(){
  $.ajax({
    url: `/admin/userprofile`,
    type: 'GET',
    success: function (perfil) {      
      perfil.forEach(p => {
        $(`<style type='text/css'>.perfil${p} {display:block} </style>`).appendTo("head");  
      });
      
    }
  })
}

function getHeader() {
  let req = new XMLHttpRequest();
  req.open('GET', '/', false);
  req.send(null);
  if (req.getResponseHeader('autenticado') == 'true') {
    $('.loginout').attr('href', '/logout')
    $('.loginout').html(`Sair<i class="material-icons left">radio_button_checked</i>`)

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
