inicializaComponentes();

function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    ocultaSPA();
    initBtns();
    sendVote();
  });
}

function initSelect() {
  $('select').formSelect();
}

function ocultaSPA() {
  $('#premioVoto').toggle();
  $('#premioSobre').toggle();
  $('#cardVoto').click(() => {
    $('#premioVoto').toggle();
    $('#premioSobre').hide();
  });
  $('#cardSobre').click(() => {
    $('#premioSobre').toggle();
    $('#premioVoto').hide();
  });
}

function initBtns() {
  $('.btnSelCons').click((e) => {
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
  $('.btnCancelTerc').click((e) => {
    $('#nomeTerc').text('');
  });
}

function sendVote() {
  $('.btnVotar').click((e) => {
    var cookie = document.cookie;
    if (cookie.includes('voto=true')) {
      var toastHTML = `<span>Você já votou e não poderá fazê-lo novamente.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    } else {
      let voto = {
        cons: $('#nomeCons').text(),
        serv: $('#nomeServ').text(),
        terc: $('#nomeTerc').text(),
        uniqueId: moment.now(),
        dtVoto: moment().format('DD/MM/YYYY'),
      };
      $.ajax({
        url: `/votacao-premio`,
        type: 'POST',
        data: voto,
        beforeSend: function () {
          $('.btnVotar').toggle();
        },
      })
        .done(function (msg) {
          var toastHTML = `<span>Voto registrado com sucesso!<br/> Aguarde redirecionamento.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
          document.cookie = `voto=true;max-age=${3600 * 24 * 30}`;
          setTimeout(function () {
            location.href = `/`;
          }, 2500);
        })
        .fail(function (jqXHR, textStatus, msg) {
          $('.btnVotar').toggle();
          var toastHTML = `<span>Ocorreu um erro.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        });
    }
  });
}
