inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    btnCriaIndicacao();
    initModal();
    anoIndica();
    initSelect();
    initDatePicker();
    initValues();
  });
}

function initValues() {
  let dados = JSON.parse($('#dadosIndicacao').attr('data-indicacao'));
  dados = dados[0];
  $(`#tipoSessao`).val(dados.tipoSessao);
  $(`#tipoColegiado`).val(dados.tipoColegiado);
  $(`#semana`).val(dados.semana);
  $(`#mes`).val(dados.mes);
  $(`#ano`).val(dados.ano);
  $('#abreIndicacao').val(dados.abreIndicacao);
  $('#fechaIndicacao').val(dados.fechaIndicacao);
  initSelect();
}

function anoIndica() {
  $('#selectAno').append(`
   <i class="far fa-calendar-alt prefix"/>
              <label for="ano">Ano da Indicação:</label>
              <select required name="ano" id="ano">
  <option class='form-group' value=${moment().year()}>${moment().year()}</option>
  <option class='form-group' value=${parseInt(moment().year() + 1)}>${
    moment().year() + 1
  }</option>
  <option class='form-group' value=${parseInt(moment().year() + 2)}>${
    moment().year() + 2
  }</option>
  <option class='form-group' value=${parseInt(moment().year() + 3)}>${
    moment().year() + 3
  }</option>
  <option class='form-group' value=${parseInt(moment().year() + 4)}>${
    moment().year() + 4
  }</option>
              </select>
  `);
}

function initModal() {
  $('.modal').modal();
}

function initSelect() {
  $('select').formSelect();
}

function btnCriaIndicacao() {
  $('.btn-atualiza').click((e) => {
    $('#aModal').addClass('modal-trigger');
    montaModal();
  });
}

function montaModal() {
  $('.hModal').text('Criação de Período de Indicação para Pauta');
  $('.pModal').append(
    `<p class="pModal ">
            <br/>
            <strong>Tipo de Sessão:</strong> ${$(
              '#tipoSessao option:selected',
            ).text()}<br/>
            <strong>Colegiados:</strong> ${$(
              '#tipoColegiado option:selected',
            ).text()}<br/>
            <strong>Semana:</strong> ${$('#semana option:selected').text()}<br/>
            <strong>Mês da Indicação:</strong> ${
              $('#mes option:selected').text() +
              '/' +
              $('#ano option:selected').text()
            }<br/>
           <strong> Mês:</strong> ${$('#mes option:selected').text()}<br/>
            <strong>Ano:</strong> ${$('#ano option:selected').text()}<br/>
    <strong> Período de Indicação pelos Conselheiros: </strong> de ${$(
      '#abreIndicacao',
    ).val()} a ${$('#fechaIndicacao').val()}<br/>

            </p>`,
  );
  $('.concorda').click(function () {
    let data = {
      tipoSessao: $('#tipoSessao').val(),
      tipoColegiado: $('#tipoColegiado').val(),
      semana: $('#semana').val(),
      mes: $('#mes').val(),
      ano: $('#ano').val(),
      mesIndicacao: $('#mes').val() + '/' + $('#ano').val(),
      abreIndicacao: $('#abreIndicacao').val(),
      fechaIndicacao: $('#fechaIndicacao').val(),
    };
    handleIndicacao(data, 'POST');
    $('.pModal').text('');
  });
  $('.cancela').click(function () {
    $('.pModal').text('');
  });
}

function handleIndicacao(registro, metodo) {
  let dados = JSON.parse($('#dadosIndicacao').attr('data-indicacao'));
  dados = dados[0];
  registro._id = dados._id;
  $.ajax({
    url: `/suporte/restrito/edita-periodo/${dados._id}`,
    data: registro,
    type: metodo,
    success: function (result) {
      location.assign('/suporte/restrito/gestao-indicacao');
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
    },
  });
}

function initDatePicker() {
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
