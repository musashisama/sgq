inicializaComponentes();

function inicializaComponentes() {
    $(document).ready(function () {
        initSidenav();
        initCollapsible();
        
    });
}

function initSidenav(){
    $('.sidenav').sidenav();
  }

  function initCollapsible() {
    $('.collapsible').collapsible();
}