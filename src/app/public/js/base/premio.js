inicializaComponentes();

function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    initBtns();
  });
}

function initSelect() {
  $('select').formSelect();
}

function initBtns() {
  $('.btnSelCons').click((e) => {
    console.log($('.selectCons option:selected').text());
    $('#nomeCons').text($('.selectCons option:selected').text());
  });
  $('.btnSelServ').click((e) => {
    $('#nomeServ').text($('.selectServ option:selected').text());
  });
  $('.btnSelTerc').click((e) => {
    $('#nomeTerc').text($('.selectTerc option:selected').text());
  });
  $('.btnCancelCons').click((e) => {
    $('#nomeCons').text('');
  });
  $('.btnCancelServ').click((e) => {
    $('#nomeServ').text('');
  });
  $('.btnCancelCons').click((e) => {
    $('#nomeTerc').text('');
  });
  //<span id="nomeTerc"/> btnSelCons btnCancelCons
}
