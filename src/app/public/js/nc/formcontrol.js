inicializaComponentes();

function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    $('.tooltipped').tooltip();
    initDatePicker();
    initChips();
    btnInsere();
    initModal();
  });
}

function initSelect() {
  $('select').formSelect();
}

function btnInsere() {
  $('.btn-insere').click(function (event) {
    event.preventDefault();
    $('docref').val(pegaChips());
    if (validaForm()) {
      $('#aModal').addClass('modal-trigger');
      montaModal();
    }
  });
}

function pegaChips() {
  let data = $('.chip').text().split('close');
  let arrayData = data.toString().split(',', data.length - 1);
  return arrayData;
}

function initModal() {
  $('.modal').modal();
}

function insereChips(array) {
  $('#formNC').submit();
}

function montaModal() {
  var data = pegaChips();
  $('.docref').val(pegaChips());
  $('.hModal').text('Confirmação de Inclusão de Registro');
  $('.pModal').append(
    `<p class="pModal">
            <br/>
            Verifique se os dados abaixo estão corretos e clique em "Confirma" para efetuar o registro.<br/><br/>
            <strong>Dados da não conformidade:</strong><br/>
            ${$('.chip').length} processo(s): ${
      document.formNC.docRef.value
    } <br/>
            <strong>Seu macroprocesso:</strong><br/>
            ${document.formNC.mpProcUser.value} <br/>
            <strong>Macroprocesso de origem da não conformidade:</strong><br/>
            ${document.formNC.mProcOrigem.value}<br/>
            <strong>Equipe onde ocorreu a não conformidade:</strong><br/>
            ${document.formNC.equipeNC.value}<br/>
            <strong>Descrição da não conformidade</strong><br/>
            ${document.formNC.descNC.value}<br/>
            <strong>Observações adicionais sobre a não conformidade:</strong><br/>
            ${document.formNC.obsParticipante.value}<br/>
            <strong>Ação imediata:</strong><br/>
            ${document.formNC.acaoImediata.value}<br/>
            <strong>Data de ocorrência da não conformidade:</strong><br/>
            ${document.formNC.dataNC.value}<br/>
            <strong>Data de encaminhamento ou correção da não conformidade:</strong><br/>
            ${document.formNC.EncCorNC.value}
            </p>`,
  );
  $('.concorda').click(function () {
    if ($('.chip').length > 0) {
      dados = $('.docref').val();
      let arrayNC = [];
      dados.split(',').forEach((docref) => {
        arrayNC.push({
          cpfUser: document.formNC.cpfUser.value,
          docRef: docref,
          mProcUser: document.formNC.mpProcUser.value,
          mProcOrigem: document.formNC.mProcOrigem.value,
          equipeNC: document.formNC.equipeNC.value,
          descNC: document.formNC.descNC.value,
          obsParticipante: document.formNC.obsParticipante.value,
          acaoImediata: document.formNC.acaoImediata.value,
          dataNC: document.formNC.dataNC.value,
          EncCorNC: document.formNC.EncCorNC.value,
        });
      });
      insereDados(arrayNC);
    } else {
      $('#formNC').submit();
    }
  });
  $('.cancela').click(function () {
    $('.pModal').text('');
    $('.docref').val('');
  });
}
function insereDados(data) {
  let arrayDados = { dados: data };
  $.ajax({
    url: `/qualidade/adiciona-nc`,
    type: 'POST',
    data: arrayDados,
    beforeSend: function () {},
  })
    .done(function (msg) {
      var toastHTML = `<p>${msg.insertedCount} não conformidade(s) registrada(s) com sucesso!</p><p>Aguarde o redirecionamento.</p>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      // setTimeout(function () {
      //   location.href = `/qualidade/adiciona-nc`;
      // }, 1500);
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<p>Ocorreu um erro.</p><p>${msg}</p>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}
function initChips() {
  $('.docref').keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == '13' && $('.docref').val()) {
      event.preventDefault();
      arrayChips = $('.docref')
        .val()
        .split(/[\s,;]+/);
      arrayChips.forEach((element) => {
        $('.areachip').append(
          `<div class="chip">${element}<i class="close material-icons">close</i></div>`,
        );
      });
      $('.docref').val('');
    }
  });
  $('.addDoc').click(function (event) {
    event.preventDefault();
    if ($('.docref').val()) {
      arrayChips = $('.docref')
        .val()
        .split(/[\s,;]+/);
      arrayChips.forEach((element) => {
        $('.areachip').append(
          `<div class="chip">${element}<i class="close material-icons">close</i></div>`,
        );
      });
      $('.docref').val('');
    }
  });
}
function initDatePicker() {
  $('.datepicker').click(function (event) {
    event.preventDefault();
    $('.lbdataNC').css('color', '#9e9e9e');
    $('.lbEncCorNC').css('color', '#9e9e9e');
  });
  let formato = 'dd/mm/yyyy';
  let meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  let mesesCurtos = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  let diasDaSemana = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  let diasCurtos = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  let diasAbrev = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  $('.datepicker').datepicker({
    autoClose: true,
    format: formato,
    i18n: {
      cancel: 'Cancelar',
      clear: 'Limpar',
      done: 'Ok',
      months: meses,
      monthsShort: mesesCurtos,
      weekdays: diasDaSemana,
      weekdaysShort: diasCurtos,
      weekdaysAbbrev: diasAbrev,
    },
  });
}
