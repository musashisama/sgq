inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    pegaHeader();
    pegaNavBar()
    pegaFooter();
  });
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
function pegaNavBar() {
  fetch("/estatico/html/navbar.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector(".sidenav").innerHTML = data;
      $(".dropdown-trigger").dropdown({ coverTrigger: false, hover: false, constrainWidth: false });
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
