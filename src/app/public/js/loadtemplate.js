inicializaComponentes();

function inicializaComponentes() {
  $(document).ready(function () {   
    initSidenav();
    pegaHeader();    
    pegaSideNav();
    pegaMenuSideNav()
    pegaFooter();
    
  });
}

function initSidenav() {
  $('.sidenav').sidenav();
}
function pegaHeader() {
  fetch("/estatico/html/header.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector("header").innerHTML = data;
    });
}
function pegaFooter() {
  fetch("/estatico/html/footer.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector("footer").innerHTML = data;
    });
}

function pegaMenuSideNav() {
  fetch("/estatico/html/menusidenav.html")
    .then(response => {      
      return response.text()
    })
    .then(data => {
      $('header').after(data);
    });
}

function pegaSideNav() {
  fetch("/estatico/html/sidenav.html")
    .then(response => {      
      return response.text()
    })
    .then(data => {
      $('#slide-out').append(data);
    });
}

