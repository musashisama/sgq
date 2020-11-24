inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    initTabs();
    initCollapsible();
    calendario();
    initModal();
    controleForm();
    initDatePicker();
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

function initModal() {
  $('.modal').modal();
}

function montaModal(html, dados) {
  $('.pModal').text('');
  $('.hModal').text('');
  $('.hModal').text('Confirmação de Registro de Solicitação');
  $('.pModal').append(
    `<p class="pModal ">
            <br/>
            Verifique se os dados abaixo estão corretos e clique em "Confirma" para efetuar o registro.<br/><br/>

            ${html}

            </p>`,
  );
  $('.concorda').click(function () {
    $('.pModal').text('');
    $('.hModal').text('');
    console.log(dados);
    $('#btn-enviar').removeClass('modal-trigger');
  });
  $('.cancela').click(function () {
    $('.pModal').text('');
    $('.hModal').text('');
    $('#btn-enviar').removeClass('modal-trigger');
  });
}

function calendario(dias) {
  let calendario = JSON.parse($('#dataCAL').attr('data-cal'));
  let datas = [];
  calendario.forEach((c) => {
    if (moment(c.start, 'DD/MM/YYYY').isSameOrAfter(moment())) {
      datas.push(moment(c.start, 'DD/MM/YYYY').diff(moment(), 'days'));
    }
  });
  $('#daps').text(Math.min(...datas));
  $('#ps').text(
    moment()
      .add(Math.min(...datas) + 1, 'days')
      .format('DD/MM/YYYY'),
  );
  return +dias + Math.min(...datas);
}

function initSelect() {
  $('select').formSelect();
}

function initTabs() {
  $('.tabs').tabs();
}

function initCollapsible() {
  $(document).ready(function () {
    $('#classesSol').collapsible();
  });
}

function initCollapsibleDisp() {
  $(document).ready(function () {
    $('#classesDisp').collapsible();
  });
}

function resetElementos() {
  $('#classesSol').off();
  $('#classesSol').fadeToggle('slow', 'linear');
  $('.progress').hide();
  $('#mostraArq').hide();
  $('#camposSol').empty();
}
function resetElementosDispensa() {
  $('#classesSol').off();
  $('#classesSol').fadeToggle('slow', 'linear');
  $('.progress').hide();
  $('#mostraArq').hide();
  $('#areaDispensa').empty();
  $('#areaBotoes').empty();
}

function valorFVV(data, he) {
  if (moment(data, 'DD/MM/YYYY').isBetween('2019-09-01', '2020-09-30')) {
    return 3;
  } else if (moment(data, 'DD/MM/YYYY').isAfter('2020-09-30')) {
    he = he * 0.3;
    if (he < 2) {
      return 2;
    }
    if (he > 8) {
      return 8;
    } else return he;
  } else return 0;
}

function elementosDispensa() {
  $('#btnLoteEx').click(() => {
    if (
      !$('#nomeLoteEx').val() ||
      !$('#mesSorteioEx').val() ||
      !$('#horasLoteEx').val()
    ) {
      var toastHTML = `<span>Todos os campos devem ser preenchidos.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    } else {
      montaLiDisp(
        `Tipo: Excesso de Horas em Lotes de Sorteio, Nome do Lote: ${$(
          '#nomeLoteEx',
        ).val()}, Mês do Sorteio: ${$(
          '#mesSorteioEx',
        ).val()}, Horas em Excesso do Lote: ${+$('#horasLoteEx').val() - 126}`,
        moment().unix(),
        +$('#horasLoteEx').val() - 126,
      );
      $('#nomeLoteEx').val('');
      $('#mesSorteioEx').val('');
      $('#horasLoteEx').val('');
    }
  });
  $('#btnProcFVV').click(() => {
    if (
      !$('#numProcFVV').val() ||
      !$('#numAcoFVV').val() ||
      !$('#dtSessaoFVV').val() ||
      !$('#horasFVV').val()
    ) {
      var toastHTML = `<span>Todos os campos devem ser preenchidos.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    } else {
      montaLiDisp(
        `Tipo: Formalização de Voto Vencedor, Número do Processo: ${$(
          '#numProcFVV',
        ).val()}, Número do Acórdão: ${$(
          '#numAcoFVV',
        ).val()}, Data da Sessão: ${$(
          '#dtSessaoFVV',
        ).val()}, HE CARF: ${+valorFVV(
          $('#dtSessaoFVV').val(),
          $('#horasFVV').val(),
        )}`,
        moment().unix(),
        +valorFVV($('#dtSessaoFVV').val(), $('#horasFVV').val()),
        $('#dtSessaoFVV').val(),
      );
      $('#numProcFVV').val('');
      $('#numAcoFVV').val('');
      $('#horasFVV').val('');
      $('#dtSessaoFVV').val('');
    }
  });
  $('#btnLoteSE').click(() => {
    if (
      !$('#nomeLoteSE').val() ||
      !$('#mesSorteioSE').val() ||
      !$('#horasLoteSE').val()
    ) {
      var toastHTML = `<span>Todos os campos devem ser preenchidos.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    } else {
      montaLiDisp(
        `Tipo: Horas Recebidas em Sorteio Extraordinário, Nome do Lote/nº do Processo: ${$(
          '#nomeLoteSE',
        ).val()}, Mês do Sorteio: ${$(
          '#mesSorteioSE',
        ).val()}, Horas do Lote/Processo: ${+$('#horasLoteSE').val()}`,
        moment().unix(),
        +$('#horasLoteSE').val(),
      );
      $('#nomeLoteSE').val('');
      $('#mesSorteioSE').val('');
      $('#horasLoteSE').val('');
    }
  });
  $('#btnProcRD').click(() => {
    if (
      !$('#numProcRD').val() ||
      !$('#dtDistRD').val() ||
      !$('#horasRD').val()
    ) {
      var toastHTML = `<span>Todos os campos devem ser preenchidos.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    } else {
      montaLiDisp(
        `Tipo: Distribuição de Processos Reflexos ou Decorrentes, Número do Processo: ${$(
          '#numProcRD',
        ).val()}, Data da Distribuição: ${$('#dtDistRD').val()}, HE CARF: ${+$(
          '#horasRD',
        ).val()}`,
        moment().unix(),
        +$('#horasRD').val(),
      );
      $('#numProcRD').val('');
      $('#dtDistRD').val('');
      $('#horasRD').val('');
    }
  });
  $('#btnPart').click(() => {
    if (!$('#dtJulgamento').val()) {
      var toastHTML = `<span>Todos os campos devem ser preenchidos.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    } else {
      montaLiDisp(
        `Tipo: Participação em TO/CSRF de março de 2019 até março de 2020, Turma de Participação: ${$(
          '#tipoAfastamento option:selected',
        ).val()}, Data do Julgamento: ${$('#dtJulgamento').val()}, Turno: ${$(
          '#turnoPart option:selected',
        ).val()}, HE CARF: 4`,
        moment().unix(),
        4,
      );
      $('#dtJulgamento').val('');
    }
  });
  $('#btnSeminario').click(() => {
    montaLiDisp(
      `Tipo: Participação em Seminário Promovido pelo CARF, Data de Participação: ${$(
        '#turnoSeminario option:selected',
      ).text()}, HE CARF:${+$('#turnoSeminario option:selected').val()}`,
      moment().unix(),
      +$('#turnoSeminario option:selected').val(),
    );
  });
  $('#btnProcAdHoc').click(() => {
    if (
      !$('#numProcAdHoc').val() ||
      !$('#dtDistAdHoc').val() ||
      !$('#horasAdHoc').val()
    ) {
      var toastHTML = `<span>Todos os campos devem ser preenchidos.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    } else {
      montaLiDisp(
        `Tipo: Relatoria de Processos <em>ad hoc</em>, Número do Processo: ${$(
          '#numProcAdHoc',
        ).val()}, Data da Distribuição: ${$(
          '#dtDistAdHoc',
        ).val()}, HE CARF: ${+$('#horasAdHoc').val()}`,
        moment().unix(),
        +$('#horasAdHoc').val(),
      );
      $('#numProcAdHoc').val('');
      $('#dtDistAdHoc').val('');
      $('#horasAdHoc').val('');
    }
  });
  $('#btnProcDev').click(() => {
    if (
      !$('#numProcDev').val() ||
      !$('#dtDistDev').val() ||
      !$('#horasDev').val()
    ) {
      var toastHTML = `<span>Todos os campos devem ser preenchidos.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    } else {
      montaLiDisp(
        `Tipo: Processos Devolvidos Por Impedimento, Suspeição ou por Impossibilidade de Julgamento, Número do Processo: ${$(
          '#numProcDev',
        ).val()}, Data da Distribuição: ${$('#dtDistDev').val()}, HE CARF: ${+$(
          '#horasDev',
        ).val()}`,
        moment().unix(),
        +-$('#horasDev').val(),
      );
      $('#numProcDev').val('');
      $('#dtDistDev').val('');
      $('#horasDev').val('');
    }
  });
}

function montaLiPart(solicitacao, id, valor) {
  $('#ulPart').append(`
            <li class="collection-item collection-parts" data-id="${id}" id='${id}'>
            <div>${solicitacao}<a href="#!" data-valor=${+valor} class="removePart${id}  secondary-content">
            <i class="red-text	far fa-trash-alt"/>
            </a>
            </div>
            </li>`);
  $(`.removePart${id}`).click((e) => {
    $(`#${id}`).remove();
  });
}

function pegaParts() {
  let parts = [];
  $('.collection-parts')
    .get()
    .forEach((c) => {
      parts.push('<br />' + $(c).text());
    });
  return parts;
}

function montaLiDisp(solicitacao, id, valor) {
  $('#ulSolicitacoes').append(`
            <li class="collection-item collection-disp" id='${id}'>
            <div>${solicitacao}<a href="#!" data-valor=${+valor} class="removeDisp${id}  secondary-content">
            <i class="red-text	far fa-trash-alt"/>
            </a>
            </div>
            </li>`);
  +$('#somatorioHoras').html(+$('#somatorioHoras').html() + valor);
  if (+$('#somatorioHoras').html() >= 126) {
    $('#cardSoma').removeClass('cardLaranja');
    $('#cardSoma').addClass('cardVerde');
  }
  if (+$('#somatorioHoras').html() < 126) {
    $('#cardSoma').removeClass('cardVerde');
    $('#cardSoma').addClass('cardLaranja');
  }
  $(`.removeDisp${id}`).click((e) => {
    +$('#somatorioHoras').html(
      +$('#somatorioHoras').html() - +$(`.removeDisp${id}`).attr('data-valor'),
    );
    $(`#${id}`).remove();
    if (+$('#somatorioHoras').html() >= 126) {
      $('#cardSoma').removeClass('cardLaranja');
      $('#cardSoma').addClass('cardVerde');
    }
    if (+$('#somatorioHoras').html() < 126) {
      $('#cardSoma').removeClass('cardVerde');
      $('#cardSoma').addClass('cardLaranja');
    }
  });
}

function pegaDisp() {
  let disp = [];
  $('.collection-disp')
    .get()
    .forEach((c) => {
      disp.push('<br />' + $(c).text());
    });
  return disp;
}

function initElementos() {
  initDatePicker();
  initSelect();
  initModal();
  initCollapsibleDisp();
  btnEnviaArq();
  $('.progress').hide();
  M.updateTextFields();
  moment.updateLocale('br', {
    workingWeekdays: [1, 2, 3, 4, 5],
  });
  $('#btn-voltar').click(() => {
    $('#camposSol').fadeOut('slow');
    resetElementos();
  });
  $('#btn-limpar').click(() => {
    $('#camposSol').fadeOut('slow');
    resetElementos();
  });
}

function arraySol(array) {
  let html = '';
  let arrayTurma = [
    '1ª Turma CSRF',
    '2ª Turma CSRF',
    '3ª Turma CSRF',
    '1ª TEx/1ª SJ',
    '2ª TEx/1ª SJ',
    '3ª TEx/1ª SJ',
    '1ª TO/2ª C./ 1ª SJ',
    '1ª TO/3ª C./ 1ª SJ',
    '2ª TO/3ª C./ 1ª SJ',
    '1ª TO/4ª C./ 1ª SJ',
    '2ª TO/4ª C./ 1ª SJ',
    '1ª TEx/2ª SJ',
    '2ª TEx/2ª SJ',
    '3ª TEx/2ª SJ',
    '1ª TO/2ª C./ 2ª SJ',
    '2ª TO/2ª C./ 2ª SJ',
    '1ª TO/3ª C./ 2ª SJ',
    '1ª TO/4ª C./ 2ª SJ',
    '2ª TO/4ª C./ 2ª SJ',
    '1ª TEx/3ª SJ',
    '2ª TEx/3ª SJ',
    '3ª TEx/3ª SJ',
    '1ª TO/2ª C./ 3ª SJ',
    '1ª TO/3ª C./ 3ª SJ',
    '2ª TO/3ª C./ 3ª SJ',
    '1ª TO/4ª C./ 3ª SJ',
    '2ª TO/4ª C./ 3ª SJ',
  ];
  let arrayTurmaTO = [
    '1ª Turma CSRF',
    '2ª Turma CSRF',
    '3ª Turma CSRF',
    '1ª TO/2ª C./ 1ª SJ',
    '1ª TO/3ª C./ 1ª SJ',
    '2ª TO/3ª C./ 1ª SJ',
    '1ª TO/4ª C./ 1ª SJ',
    '2ª TO/4ª C./ 1ª SJ',
    '1ª TO/2ª C./ 2ª SJ',
    '2ª TO/2ª C./ 2ª SJ',
    '1ª TO/3ª C./ 2ª SJ',
    '1ª TO/4ª C./ 2ª SJ',
    '2ª TO/4ª C./ 2ª SJ',
    '1ª TO/2ª C./ 3ª SJ',
    '1ª TO/3ª C./ 3ª SJ',
    '2ª TO/3ª C./ 3ª SJ',
    '1ª TO/4ª C./ 3ª SJ',
    '2ª TO/4ª C./ 3ª SJ',
  ];
  let arrayTurmaTex = [
    '1ª TEx/1ª SJ',
    '2ª TEx/1ª SJ',
    '3ª TEx/1ª SJ',
    '1ª TEx/2ª SJ',
    '2ª TEx/2ª SJ',
    '3ª TEx/2ª SJ',
    '1ª TEx/3ª SJ',
    '2ª TEx/3ª SJ',
    '3ª TEx/3ª SJ',
  ];
  let arrayFalta = [
    'Licença à gestante',
    'Licença à adotante',
    'Licença à paternidade',
    'Licença para tratamento de saúde',
    'Licença em razão de casamento',
    'Licença por motivo de falecimento (cônjuge, companheiro, pais, madastra ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos)',
    'Período de férias (marcado antes da designação para Conselheiro(a))',
    'Compromissos profissionais ou acadêmicos assumidos antes da designação para Conselheiro(a)',
  ];
  let arrayMeta = [
    'Licença à gestante',
    'Licença à adotante',
    'Licença à paternidade',
    'Licença para tratamento de saúde',
    'Licença em razão de casamento',
    'Licença por motivo de falecimento (cônjuge, companheiro, pais, madastra ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos)',
    'Período de férias (marcado perante a RFB)',
  ];
  let arrayPrazo = [
    'Licença à gestante',
    'Licença à adotante',
    'Licença à paternidade',
    'Licença para tratamento de saúde',
    'Licença em razão de casamento',
    'Licença por motivo de falecimento (cônjuge, companheiro, pais, madastra ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos)',
    'Participação em Seminário promovido pelo CARF',
    'Período de férias (marcado perante a RFB)',
  ];
  let arrayMudanca = [
    'Turma Extraordinária para Turma Ordinária da mesma Seção',
    'Turma Extraordinária para Turma Ordinária de Seção Diferente',
    'Turma Ordinária para Turma Ordinária da Mesma Seção',
    'Turma Ordinária para Turma Ordinária de Seção Diferente',
    'Turma Ordinária para Turma da Câmara Superior de Rcursos Fiscais',
  ];
  let arrayDispensa = [
    'Excesso de Horas em Lotes de Sorteio',
    'Formalização de Voto Vencedor',
    'Horas Recebidas em Sorteio Extraordinário',
    'Distribuição de processos reflexos ou decorrentes',
    'Participação em TO/CSRF de março de 2019 até março de 2020',
  ];

  if (array === 'turma') {
    arrayTurma.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione a Turma de Participação:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'turmaTO') {
    arrayTurmaTO.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione a Turma de Participação:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'turmaTex') {
    arrayTurmaTex.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione a Turma de Participação:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'falta') {
    arrayFalta.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione o tipo de afastamento/licença:</label>
        <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'meta') {
    arrayMeta.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione o tipo de afastamento/licença:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'prazo') {
    arrayPrazo.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione o tipo de afastamento/licença:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'mudanca') {
    arrayMudanca.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione o tipo de Mudança:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'dispensa') {
    html = `<<option class="form-group" value="" selected disabled>Clique para selecionar</option>>`;
    arrayDispensa.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoDispensa">Selecione o tipo de Dispensa:</label>
    <select required name="tipoDispensa" id="tipoDispensa">
    ${html}
    </select>
    </div>
    <div class='col s6'>
    <div class="card hoverable cardLaranja">
              <div class="card-content ">
                <span class="card-title">Somatório de Horas da Solicitação: <span id='somatorioHoras'>0</span></span>
              </div>
            </div>
          </div>
    </div>
    </div>`;
    return retorno;
  }
}

function controleForm() {
  let botoes = `
  <div class='row valign-wrapper'>
   <div class='col s12 left-align'>
  <a id="btn-voltar" title="Voltar" class="waves-effect waves-purple hoverable z-depth-3 btn blue">
  <i class="fas fa-backspace left"/>Voltar
  </a>
  </div>
  <div class='col s12 right-align'>
  <a id="btn-enviar" title="Enviar" href='#modal1' class="waves-effect waves-blue hoverable z-depth-3 btn green">
  <i class="material-icons left">send</i>Enviar
  </a>
  </div>
  </div>`;
  let dataJulgamento = `
   <div class='row'>
  <div class="form-group dtJulgamento input field col s3">
  <input id="dtJulgamento" name="dtJulgamento"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="dtJulgamento">Data do Julgamento</label>
  </div>
  </div>
  `;
  let dataMudanca = `
   <div class='row'>
  <div class="form-group dtMudanca input field col s3">
  <input id="dtMudanca" name="dtMudanca"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="dtMudanca">Data da Mudança</label>
  </div>
  </div>
  `;
  let dataSorteio = `
   <div class='row'>
  <div class="form-group dataSorteio input field col s3">
  <input id="dataSorteio" name="dataSorteio"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="dataSorteio">Data do Sorteio</label>
  </div>
  </div>
  `;
  let dataIndicacao = `
   <div class='row'>
  <div class="form-group dataIndicacao input field col s3">
  <input id="dataIndicacao" name="dataIndicacao"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="dataIndicacao">Data da Indicação</label>
  </div>
  </div>
  `;
  let campoPeriodo = `
  <div class='row'>
  <div class="form-group inicioAfastamento input field col s3">
  <input id="inicioAfastamento" name="inicioAfastamento"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="inicioAfastamento">Início do Afastamento</label>
  </div>
  <div class="form-group fimAfastamento input field col s3">
  <input id="fimAfastamento" name="fimAfastamento" type="text" class="datepicker"/>
  <i class="far fa-calendar-check prefix"/>
  <label for="fimAfastamento">Último dia do Afastamento</label>
  </div>
  </div>
  `;
  let campoPeriodoInterino = `
  <div class='row'>
  <div class="form-group inicioPeriodo input field col s3">
  <input id="inicioPeriodo" name="inicioPeriodo"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="inicioPeriodo">Início do Período</label>
  </div>
  <div class="form-group fimPeriodo input field col s3">
  <input id="fimPeriodo" name="fimPeriodo" type="text" class="datepicker"/>
  <i class="far fa-calendar-check prefix"/>
  <label for="fimPeriodo">Último dia do Período</label>
  </div>
  </div>
  `;
  let diasCorridos = `
  <div class="row">
  <div class ='col s5 diasCorridos'>
  <h6>Quantidade de dias: <span id='diasCorridos'/></h6>
  </div>
  </div>
  </div>
  `;
  let diasUteis = `
  <div class="row">
  <div class ='col s5 diasSessao input-field'>
  <i class=" fas fa-calendar-day prefix"/>
  <input id="diasSessao" name="diasSessao" type="number" class="validate" value=0/>
  <label for="diasSessao">Qtde de Dias de Sessão programados no período acima:</label>
  </div>
  <div class ='col s5 diasUteis'>
  <h6>Quantidade de dias úteis (excluídos os dias de sessão): <span id='diasUteis'/></h6>
  </div>
   <div class ='col s3 horasMeta'>
  Horas a serem reduzidas da meta: <span id='horasMeta'/>
  </div>
  </div>`;
  let diasSessao = `
  <div class="row">
  <div class ='col s5 diasSessao input-field'>
  <i class=" fas fa-calendar-day prefix"/>
  <input id="diasSessao" name="diasSessao" type="number" class="validate" value=0/>
  <label for="diasSessao">Qtde de Dias de Sessão programados no período acima:</label>
  </div>
  </div>`;
  let diasProrrogacao = `
  <div class="row">
  <div class ='col s4 diasProrrogacao input-field'>
  <i class=" fas fa-calendar-day prefix"/>
  <input id="diasProrrogacao" name="diasProrrogacao" type="number" class="validate" value=0/>
  <label for="diasProrrogacao">Qtde de Dias a serem Prorrogados:</label>
  </div>
  </div>`;
  let campoObs = `
  <div class='row'>
  <div class="input-field col s12">
  <i class="material-icons prefix">mode_edit</i>
  <textarea id="observacoes" class="materialize-textarea"></textarea>
  <label for="observacoes">Observações</label>
  </div>
  </div>`;
  let msgTurno = `
  <div class='row'>
  <blockquote>
  <strong>Importante:</strong>
  Caso tenha participado de sessão de julgamento em mais de uma turma por turno, selecione <strong>apenas</strong> a primeira turma de participação.
  As solicitações deverão ser feitas individualmente para cada turno de participação, onde serão abatidas 4 horas por turno.
  </blockquote>
  </div>`;
  let camposArq = `
  <div class="row">
  <div class="file-field left ctoastsucesso input-field form-group col s6">
  <div class="btn">
  <span>Arquivo</span>
  <input type="file" name="filetoupload" id='file' accept=".pdf" onchange="" required/>
  </div>
  <div class="file-path-wrapper">
  <input class="file-path validate" type="text"/>
  </div>
  <div class="hidden progress">
  <div class="determinate"/>
  </div>
  </div>
  <div><a id="btnEnviaArq" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Enviar arquivo">
  <i class="material-icons">add</i>
  </a>
  </div>
  </div>
  <div class="row valign-wrapper">
  <div id="mostraArq" class="col s6">
  <ul class="collection arqsUp"/>
  </div>
  <div id="enviaArq" class="col s6 valign-wrapper"/>
  </div>
  `;
  let processos = `
<div class='row'>
<div class ='col s3 numProc input-field'>
<i class=" fas fa-calendar-day prefix"/>
<input id="numProc" placeholder="Nº do Processo. Somente números" name="numProc"type="text" class="validate">
<label for="numProc">Número do Processo:</label>
</div>
<div><a id="btnProc" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar processo">
<i class="material-icons">add</i>
</a>
</div>
</div>
<div class='row'>
<div id="mostraProcessos" class="col s3">
<ul class="collection ulProcessos"/>
</div>
</div>`;
  //REGAP - Justificar Suspensão de Prazos Regimentais
  //Afastamentos e Licenças
  $('#aflp').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#aflp').text()}</h5><br/>
      ${arraySol('prazo')}
      ${campoPeriodo}
      ${diasCorridos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      let diff;
      $('body').click(() => {
        diff = moment($('#fimAfastamento').val(), 'DD/MM/YYYY').diff(
          moment($('#inicioAfastamento').val(), 'DD/MM/YYYY'),
          'days',
        );
        $('#diasCorridos').html(diff);
      });
      $('#btn-enviar').click((e) => {
        if (!$('#fimAfastamento').val() || !$('#inicioAfastamento').val()) {
          var toastHTML = `<span>Os campos de início e fim do afastamento precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (
          moment($('#fimAfastamento').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já ocorridos e finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <p>REGAP: ${$('#aflp').text()}</p>
          <p>Tipo: ${$('#tipoAfastamento option:selected').val()}</p>
          <p>Início: ${$('#inicioAfastamento').val()}</p>
          <p>Fim: ${$('#fimAfastamento').val()}</p>
          <p>Dias: ${diff}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REGAP: ${$('#aflp').text()}`,
            dados: {
              tipoAfastamento: $('#tipoAfastamento option:selected').val(),
              inicioAfastamento: $('#inicioAfastamento').val(),
              fimAfastamento: $('#fimAfastamento').val(),
              diasCorridos: diff,
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //Prorrogação de Voto Vencedor -  art. 45, §1º, inciso II do RICARF
  //Número de dias de prorrogação - Número dos processos
  $('#pvv').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#pvv').text()}</h5><br/>
      ${diasProrrogacao}
      ${processos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnProc').click(() => {
        if (
          !$('#numProc').val() ||
          $('#numProc').val().includes('/') ||
          $('#numProc').val().includes('.') ||
          $('#numProc').val().includes('-') ||
          $('#numProc').val().includes('\\')
        ) {
          var toastHTML = `<span>Somente números!</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          montaLiProc($('#numProc').val());
          $('#numProc').val('');
        }
      });
      $('#btn-enviar').click((e) => {
        if (
          !$('#diasProrrogacao').val() ||
          !$('.ulProcessos').children().text()
        ) {
          var toastHTML = `<span>Os campos Quantidade de Dias e Número do(s) Processo(s) precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <p>REGAP: ${$('#pvv').text()}</p>
          <p>Quantidade de Dias a serem Prorrogados: ${$(
            '#diasProrrogacao',
          ).val()}</p>
          <p>Processo(s): ${pegaProcs()}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REGAP: ${$('#pvv').text()}`,
            dados: {
              diasProrrogacao: $('#diasProrrogacao').val(),
              processos: pegaProcs(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //Prorrogação de Prazo de Processo de Imunidade
  //Suspensão de 90 dias - Número dos Processos
  $('#ppi').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#ppi').text()}</h5><br/>
      ${diasProrrogacao}
      ${processos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnProc').click(() => {
        if (
          !$('#numProc').val() ||
          $('#numProc').val().includes('/') ||
          $('#numProc').val().includes('.') ||
          $('#numProc').val().includes('-') ||
          $('#numProc').val().includes('\\')
        ) {
          var toastHTML = `<span>Somente números!</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          montaLiProc($('#numProc').val());
          $('#numProc').val('');
        }
      });
      $('#btn-enviar').click((e) => {
        if (
          !$('#diasProrrogacao').val() ||
          !$('.ulProcessos').children().text()
        ) {
          var toastHTML = `<span>Os campos Quantidade de Dias e Número do(s) Processo(s) precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <p>REGAP: ${$('#ppi').text()}</p>
          <p>Quantidade de Dias a serem Prorrogados: ${$(
            '#diasProrrogacao',
          ).val()}</p>
          <p>Processo(s): ${pegaProcs()}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REGAP: ${$('#ppi').text()}`,
            dados: {
              diasProrrogacao: $('#diasProrrogacao').val(),
              processos: pegaProcs(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //Prorrogação de Prazo autorizada pela Presidência do CARF - art. 45, §1º, inciso II, item b do RICARF
  // Número de dias de prorrogação e número dos processos - Presi ou COJUL?
  $('#ppa').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#ppa').text()}</h5><br/>
      ${diasProrrogacao}
      ${processos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnProc').click(() => {
        if (
          !$('#numProc').val() ||
          $('#numProc').val().includes('/') ||
          $('#numProc').val().includes('.') ||
          $('#numProc').val().includes('-') ||
          $('#numProc').val().includes('\\')
        ) {
          var toastHTML = `<span>Somente números!</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          montaLiProc($('#numProc').val());
          $('#numProc').val('');
        }
      });
      $('#btn-enviar').click((e) => {
        if (
          !$('#diasProrrogacao').val() ||
          !$('.ulProcessos').children().text()
        ) {
          var toastHTML = `<span>Os campos Quantidade de Dias e Número do(s) Processo(s) precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <p>REGAP: ${$('#ppa').text()}</p>
          <p>Quantidade de Dias a serem Prorrogados: ${$(
            '#diasProrrogacao',
          ).val()}</p>
          <p>Processo(s): ${pegaProcs()}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REGAP: ${$('#ppa').text()}`,
            dados: {
              diasProrrogacao: $('#diasProrrogacao').val(),
              processos: pegaProcs(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //Justificativa para deixar de praticar de ato processual (Art. 45, IV RICARF)
  $('#dpa').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#dpa').text()}</h5><br/>
      ${processos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnProc').click(() => {
        if (
          !$('#numProc').val() ||
          $('#numProc').val().includes('/') ||
          $('#numProc').val().includes('.') ||
          $('#numProc').val().includes('-') ||
          $('#numProc').val().includes('\\')
        ) {
          var toastHTML = `<span>Somente números!</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          montaLiProc($('#numProc').val());
          $('#numProc').val('');
        }
      });
      $('#btn-enviar').click((e) => {
        if (!$('.ulProcessos').children().text()) {
          var toastHTML = `<span>O campo Número do(s) Processo(s) precisa estar preenchido.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <p>REGAP: ${$('#dpa').text()}</p>
          <p>Processo(s): ${pegaProcs()}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REGAP: ${$('#dpa').text()}`,
            dados: {
              processos: pegaProcs(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //Processo Objeto de Retificação de Ata
  //Data do Julgamento e Número do processo.
  $('#ora').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#ora').text()}</h5><br/>
      ${dataJulgamento}
      ${processos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnProc').click(() => {
        if (
          !$('#numProc').val() ||
          $('#numProc').val().includes('/') ||
          $('#numProc').val().includes('.') ||
          $('#numProc').val().includes('-') ||
          $('#numProc').val().includes('\\')
        ) {
          var toastHTML = `<span>Somente números!</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          montaLiProc($('#numProc').val());
          $('#numProc').val('');
        }
      });
      $('#btn-enviar').click((e) => {
        if (!$('#dtJulgamento').val() || !$('.ulProcessos').children().text()) {
          var toastHTML = `<span>Os campos Data do Julgamento e Número do(s) Processo(s) precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <p>REGAP: ${$('#ora').text()}</p>
          <p>Data do Julgamento: ${$('#dtJulgamento').val()}</p>
          <p>Processo(s): ${pegaProcs()}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REGAP: ${$('#ora').text()}`,
            dados: {
              dataJulgamento: $('#dtJulgamento').val(),
              processos: pegaProcs(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //REINP - Redução de Horas da Meta de Produtividade
  //Afastamentos e Licença
  $('#aflm').click(() => {
    resetElementos();
    $('#camposSol').show('', () => {
      $('#camposSol').append(`
      <h5>${$('#aflm').text()}</h5><br/>
      ${arraySol('meta')}
      ${campoPeriodo}
      ${diasUteis}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      let diff;
      $('body').click(() => {
        diff = moment($('#fimAfastamento').val(), 'DD/MM/YYYY').businessDiff(
          moment($('#inicioAfastamento').val(), 'DD/MM/YYYY'),
        );
        $('#diasUteis').html(diff - $('#diasSessao').val());
        $('#horasMeta').html(+$('#diasUteis').html() * 8);
      });
      $('#btn-enviar').click((e) => {
        if (!$('#fimAfastamento').val() || !$('#inicioAfastamento').val()) {
          var toastHTML = `<span>Os campos de início e fim do afastamento precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (
          moment($('#fimAfastamento').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já ocorridos e finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <p>REINP: ${$('#aflm').text()}</p>
          <p>Tipo: ${$('#tipoAfastamento option:selected').val()}</p>
          <p>Início: ${$('#inicioAfastamento').val()}</p>
          <p>Fim: ${$('#fimAfastamento').val()}</p>
          <p>Dias úteis (excluídos os dias de sessão): ${$(
            '#diasUteis',
          ).text()}</p>
          <p>Horas a serem reduzidas da meta de produtividade: ${$(
            '#horasMeta',
          ).text()}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REINP: ${$('#aflm').text()}`,
            dados: {
              tipoAfastamento: $('#tipoAfastamento option:selected').val(),
              inicioAfastamento: $('#inicioAfastamento').val(),
              fimAfastamento: $('#fimAfastamento').val(),
              diasUteis: $('#diasUteis').text(),
              horasReducao: $('#horasMeta').text(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //Mudança de Colegiado que implique em alteração do calendário da sessão de julgamento
  $('#mcc').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#mcc').text()}</h5><br/>
      ${arraySol('mudanca')}
      ${dataMudanca}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btn-enviar').click((e) => {
        if (!$('#dtMudanca').val()) {
          var toastHTML = `<span>O campo Data da Mudança deve ser preenchido.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (
          moment($('#dtMudanca').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já ocorridos e finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <p>REINP: ${$('#mcc').text()}</p>
          <p>Tipo: ${$('#tipoAfastamento option:selected').val()}</p>
          <p>Data da Mudança: ${$('#dtMudanca').val()}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REINP: ${$('#mcc').text()}`,
            dados: {
              tipoAfastamento: $('#tipoAfastamento option:selected').val(),
              dtMudanca: $('#dtMudanca').val(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //Não cumprimento da meta por ausência de carga de processo
  $('#acp').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#acp').text()}</h5><br/>
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btn-enviar').click((e) => {
        let html = `
          <div class='row'>
          <p>REINP: ${$('#acp').text()}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
        let dados = {
          uniqueId: moment().unix(),
          tipo: `REINP: ${$('#acp').text()}`,
          dados: {
            observacoes: $('#observacoes').val(),
            arquivos: pegaArquivos(),
          },
        };
        $('#btn-enviar').addClass('modal-trigger');
        montaModal(html, dados);
      });
    });
  });
  //Assumir interinamente Presidência de Turma por no mínimo um mês
  $('#presi').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#presi').text()}</h5><br/>
      ${arraySol('turma')}
      ${campoPeriodoInterino}
      ${diasCorridos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      let diff;
      $('body').click(() => {
        diff = moment($('#fimPeriodo').val(), 'DD/MM/YYYY').businessDiff(
          moment($('#inicioPeriodo').val(), 'DD/MM/YYYY'),
        );
        $('#diasCorridos').html(diff);
      });
      $('#btn-enviar').click((e) => {
        if (!$('#inicioPeriodo').val() || !$('#fimPeriodo').val()) {
          var toastHTML = `<span>O período deve deve ser preenchido.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (
          moment($('#fimPeriodo').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já ocorridos e finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <p>REINP: ${$('#presi').text()}</p>
          <p>Tipo: ${$('#tipoAfastamento option:selected').val()}</p>
          <p>Início do Período: ${$('#inicioPeriodo').val()}</p>
          <p>Fim do Período: ${$('#fimPeriodo').val()}</p>
          <p>Dias Corridos: ${diff}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REINP: ${$('#presi').text()}`,
            dados: {
              inicioPeriodo: $('#inicioPeriodo').val(),
              fimPeriodo: $('#fimPeriodo').val(),
              diasCorridos: diff,
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //Participação em sessão TO/CSRF a partir de abril de 2020
  $('#ptoa').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#ptoa').text()}</h5><br/>
      ${arraySol('turmaTO')}
               <div class='row'>
                 <div class="form-group dtJulgamento input field col s3">
                <input id="dtJulgamento" name="dtJulgamento"  type="text" class="datepicker"/>
                <i class="fas fa-calendar-check prefix"/>
                <label for="dtJulgamento">Data do Julgamento</label>
                </div>
                <div class='col s6'>
                <i class="far fa-question-circle prefix"/>
                <label for="turnoPart">Selecione o turno de participação:</label>
                <select required name="turnoPart" id="turnoPart">
                <option class="form-group" value="Manha">Manhã</option>
                <option class="form-group" value="Tarde">Tarde</option>
                </select>
                </div>
                <div><a id="btnPart" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Participação">
                <i class="material-icons">add</i>
                </a>
                </div>
                </div>
                <div class='row'>
                <div id="mostraPart" class="col s12">
                <ul id="ulPart" class="collection"/>
                </div>
                </div>
                 ${msgTurno}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnPart').click(() => {
        if (!$('#dtJulgamento').val()) {
          var toastHTML = `<span>O campo Data de Julgamento deve ser preenchido.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (
          moment($('#dtJulgamento').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já ocorridos e finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          montaLiPart(
            `Turma de Participação: ${$(
              '#tipoAfastamento option:selected',
            ).val()},
        Data do Julgamento: ${$('#dtJulgamento').val()},
        Turno: ${$('#turnoPart option:selected').val()}`,
            moment().unix(),
            4,
          );
        }
        $('#btn-enviar').click((e) => {
          if (!$('#ulPart').children().text()) {
            var toastHTML = `<span>Deve ser adicionada pelo menos uma participação.</span>`;
            M.toast({
              html: toastHTML,
              classes: 'rounded',
              timeRemaining: 500,
            });
          } else if (
            moment($('#dtJulgamento').val(), 'DD/MM/YYYY').isAfter(moment())
          ) {
            var toastHTML = `<span>Somente podem ser cadastrados eventos já ocorridos e finalizados.</span>`;
            M.toast({
              html: toastHTML,
              classes: 'rounded',
              timeRemaining: 500,
            });
          } else {
            let html = `
            <div class='row'>
            <p>REINP: ${$('#ptoa').text()}</p>
            <p>Participações: ${pegaParts()}</p>
            <p>Observações: ${$('#observacoes').val()}</p>
            <p>Arquivos:${$('.arqsUp').children().text()}</p>
            `;
            let dados = {
              uniqueId: moment().unix(),
              tipo: `REINP: ${$('#ptoa').text()}`,
              dados: {
                participacoes: pegaParts(),
                observacoes: $('#observacoes').val(),
                arquivos: pegaArquivos(),
              },
            };
            $('#btn-enviar').addClass('modal-trigger');
            montaModal(html, dados);
          }
        });
      });
    });
  });
  //Participação em sessão presencial ou virtual de TEX para sustentação oral
  $('#pptex').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#pptex').text()}</h5><br/>
      ${arraySol('turmaTex')}
                 <div class='row'>
                 <div class="form-group dtJulgamento input field col s3">
                <input id="dtJulgamento" name="dtJulgamento"  type="text" class="datepicker"/>
                <i class="fas fa-calendar-check prefix"/>
                <label for="dtJulgamento">Data do Julgamento</label>
                </div>
                <div class='col s6'>
                <i class="far fa-question-circle prefix"/>
                <label for="turnoPart">Selecione o turno de participação:</label>
                <select required name="turnoPart" id="turnoPart">
                <option class="form-group" value="Manha">Manhã</option>
                <option class="form-group" value="Tarde">Tarde</option>
                </select>
                </div>
                <div><a id="btnPart" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Participação">
                <i class="material-icons">add</i>
                </a>
                </div>
                </div>
                <div class='row'>
                <div id="mostraPart" class="col s12">
                <ul id="ulPart" class="collection"/>
                </div>
                </div>
                 ${msgTurno}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnPart').click(() => {
        if (!$('#dtJulgamento').val()) {
          var toastHTML = `<span>O campo Data de Julgamento deve ser preenchido.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (
          moment($('#dtJulgamento').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já ocorridos e finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          montaLiPart(
            `Turma de Participação: ${$(
              '#tipoAfastamento option:selected',
            ).val()},
        Data do Julgamento: ${$('#dtJulgamento').val()},
        Turno: ${$('#turnoPart option:selected').val()}`,
            moment().unix(),
            4,
          );
        }
        $('#btn-enviar').click((e) => {
          if (!$('#ulPart').children().text()) {
            var toastHTML = `<span>Deve ser adicionada pelo menos uma participação.</span>`;
            M.toast({
              html: toastHTML,
              classes: 'rounded',
              timeRemaining: 500,
            });
          } else if (
            moment($('#dtJulgamento').val(), 'DD/MM/YYYY').isAfter(moment())
          ) {
            var toastHTML = `<span>Somente podem ser cadastrados eventos já ocorridos e finalizados.</span>`;
            M.toast({
              html: toastHTML,
              classes: 'rounded',
              timeRemaining: 500,
            });
          } else {
            let html = `
            <div class='row'>
            <p>REINP: ${$('#pptex').text()}</p>
            <p>Participações: ${pegaParts()}</p>
            <p>Observações: ${$('#observacoes').val()}</p>
            <p>Arquivos:${$('.arqsUp').children().text()}</p>
            `;
            let dados = {
              uniqueId: moment().unix(),
              tipo: `REINP: ${$('#pptex').text()}`,
              dados: {
                participacoes: pegaParts(),
                observacoes: $('#observacoes').val(),
                arquivos: pegaArquivos(),
              },
            };
            $('#btn-enviar').addClass('modal-trigger');
            montaModal(html, dados);
          }
        });
      });
    });
  });
  //1º sorteio com prazo inferior a 21 dias da indicação
  $('#s21').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#s21').text()}</h5><br/>
      ${dataSorteio}
      ${dataIndicacao}
      ${diasCorridos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      let diff;
      $('body').click(() => {
        diff = moment($('#dataIndicacao').val(), 'DD/MM/YYYY').diff(
          moment($('#dataSorteio').val(), 'DD/MM/YYYY'),
          'days',
        );
        $('#diasCorridos').html(diff);
      });
      $('#btn-enviar').click((e) => {
        if (!$('#dataIndicacao').val() || !$('#dataSorteio').val()) {
          var toastHTML = `<span>Os campos Data de Indicação e Data de Sorteio precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (
          moment($('#dataSorteio').val(), 'DD/MM/YYYY').isAfter(moment()) ||
          moment($('#dataIndicacao').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já ocorridos e finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (+diff < 21) {
          var toastHTML = `<span>A diferença deve ser de no mínimo 21 dias.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <p>REINP: ${$('#s21').text()}</p>
          <p>Data do Sorteio: ${$('#dataSorteio').val()}</p>
          <p>Data da Indicação para Pauta: ${$('#dataIndicacao').val()}</p>
          <p>Dias corridos: ${diff}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REINP: ${$('#s21').text()}`,
            dados: {
              dtSorteio: $('#dataSorteio').val(),
              dtindicacao: $('#dataIndicacao').val(),
              diasCorridos: diff,
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //Dispensa de Sorteio
  //Excesso de Horas em Lotes de Sorteio - Nome do lote - Mes e Tamanho
  //Formalização de Voto Vencedor - Número do Processo - Número do Acórdão - HE (Se DtSessao for depois de set/2019 e antes de set/2020 - HE = 3,0. Se DtSessao for depois de set/2020 - 30% >2 e <8) - Data da Sessão
  //Horas Recebidas em Sorteio Extraordinário//Excesso de Horas em Lotes de Sorteio - Nome do lote - Mes e Tamanho
  //Distribuição de processos reflexos ou decorrentes - Numero do processo - Data da distribuição e HE
  //Participação em TO/CSRF de março de 2019 até março de 2020 - DtSessao - Turma - Turno - 4 horas por turno (Vários na mesma)
  $('#dds').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#dds').text()}</h5><br/>

      <ul id="classesDisp" class="collapsible popout col s6 m12">

            <li>
              <div class="collapsible-header">
                <i class="fas fa-hockey-puck"/>Excesso de Horas em Lotes de Sorteio
              </div>
              <div class="collapsible-body">
               <div class='row'>
              <div class ='col s3 nomeLoteEx input-field'>
              <i class="fas fa-th prefix"/>
              <input id="nomeLoteEx" name="nomeLoteEx" type="text" class="validate"/>
              <label for="nomeLoteEx">Nome do Lote:</strong></label>
              </div>
              <div class ='col s2 mesSorteioEx input-field'>
              <i class="far fa-calendar-minus prefix"/>
              <input id="mesSorteioEx" name="mesSorteioEx" type="text" class="validate"/>
              <label for="mesSorteioEx">Mês do Sorteio:</strong></label>
              </div>
              <div class ='col s2 horasLoteEx input-field'>
              <i class="far fa-hourglass prefix"/>
              <input id="horasLoteEx" name="horasLoteEx" type="text" class="validate"/>
              <label for="horasLoteEx">HE do Lote:</strong></label>
              </div>
              <div><a id="btnLoteEx" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Lote">
              <i class="material-icons">add</i>
              </a></div>
              </div>
               <div class='row'>
              <blockquote>
              <strong>Importante:</strong>
              Para que o cálculo seja feito corretamente, deverão ser inseridas as Horas REGAP do lote cheio. Destas horas serão deduzidas as 126 relativas à relatoria mensal de processos.
              </blockquote>
             </div>
            </li>

<li>
              <div class="collapsible-header">
                <i class="fas fa-undo-alt"/>Processos Devolvidos por Impedimento, Suspeição ou por Impossibilidade de Julgamento
              </div>
              <div class="collapsible-body">
                <div class='row'>
              <div class ='col s3 numProcDev input-field'>
              <i class=" fas fa-calendar-day prefix"/>
              <input id="numProcDev" placeholder="Nº do Processo. Somente números" name="numProcDev"type="text" class="validate" />
              <label for="numProcDev">Número do Processo:</label>
              </div>
               <div class="form-group dtDistDev input field col s2">
              <input id="dtDistDev" name="dtDistDev"  type="text" class="datepicker"/>
              <i class="fas fa-calendar-check prefix"/>
              <label for="dtDistDev">Data da Distribuição</label>
              </div>
               <div class ='col s2 horasDev input-field'>
              <i class="far fa-hourglass prefix"/>
              <input id="horasDev" name="horasDev" type="text" class="validate"/>
              <label for="horasDev">HE CARF:</strong></label>
              </div>
              <div><a id="btnProcDev" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Processo">
              <i class="material-icons">add</i>
              </a>
              </div>

              </div>
               </div>
            </li>

            <li>
              <div class="collapsible-header">
                <i class="fas fa-feather-alt"/>Formalização de Voto Vencedor
              </div>
              <div class="collapsible-body">
              <div class='row'>
              <div class ='col s3 numProcFVV input-field'>
              <i class=" fas fa-calendar-day prefix"/>
              <input id="numProcFVV" placeholder="Nº do Processo. Somente números" name="numProcFVV"type="text" class="validate" />
              <label for="numProcFVV">Número do Processo:</label>
              </div>
              <div class ='col s3 numAcoFVV input-field'>
              <i class=" fas fa-calendar-day prefix"/>
              <input id="numAcoFVV" placeholder="Nº do Acórdão. Somente números" name="numAcoFVV"type="text" class="validate" />
              <label for="numAcoFVV">Número do Acórdão:</label>
              </div>
              <div class="form-group dtSessaoFVV input field col s2">
              <input id="dtSessaoFVV" name="dtSessaoFVV"  type="text" class="datepicker"/>
              <i class="fas fa-calendar-check prefix"/>
              <label for="dtSessaoFVV">Data da Sessão</label>
              </div>
               <div class ='col s3 horasFVV input-field'>
              <i class="far fa-hourglass prefix"/>
              <input id="horasFVV" name="horasFVV" type="text" class="validate"/>
              <label for="horasFVV">HE do e-Processo:</strong></label>
              </div>
              <div><a id="btnProcFVV" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Processo">
              <i class="material-icons">add</i>
              </a>
              </div>
              </div>
              <div class='row'>
              <blockquote>
              <strong>Importante:</strong>
              Somente para formalizações <strong>a partir de</strong> setembro de 2019.<br />
              Serão atribuídas 3 horas por voto vencedor formalizado no período de set/19 a set/20. A partir de 01/out/20, será atribuído
              o valor correpondente a 30% das horas constantes da coluna Horas Estimadas do <strong>e-Processo</strong> com limite máximo de 8 horas e mínimo de 2 horas.
              </blockquote>
             </div>
              </div>
            </li>

            <li>
              <div class="collapsible-header">
                <i class="far fa-clock"/>Horas Recebidas em Sorteio Extraordinário
              </div>
              <div class="collapsible-body">
              <div class='row'>
              <div class ='col s3 nomeLoteSE input-field'>
              <i class="fas fa-th prefix"/>
              <input id="nomeLoteSE" name="nomeLoteSE" type="text" class="validate"/>
              <label for="nomeLoteSE">Nome do Lote/nº Processo:</strong></label>
              </div>
              <div class ='col s2 mesSorteioSE input-field'>
              <i class="far fa-calendar-minus prefix"/>
              <input id="mesSorteioSE" name="mesSorteioSE" type="text" class="validate"/>
              <label for="mesSorteioSE">Mês do Sorteio:</strong></label>
              </div>
              <div class ='col s3 horasLoteSE input-field'>
              <i class="far fa-hourglass prefix"/>
              <input id="horasLoteSE" name="horasLoteSE" type="text" class="validate"/>
              <label for="horasLoteSE">HE do Lote/Processo:</strong></label>
              </div>
              <div><a id="btnLoteSE" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Lote">
              <i class="material-icons">add</i>
              </a></div>
              </div>
            </li>

            <li>
              <div class="collapsible-header">
                <i class="fas fa-link"/>Distribuição de Processos Reflexos ou Decorrentes
              </div>
              <div class="collapsible-body">
                <div class='row'>
              <div class ='col s3 numProcRD input-field'>
              <i class=" fas fa-calendar-day prefix"/>
              <input id="numProcRD" placeholder="Nº do Processo. Somente números" name="numProcRD"type="text" class="validate" />
              <label for="numProcRD">Número do Processo:</label>
              </div>
               <div class="form-group dtDistRD input field col s2">
              <input id="dtDistRD" name="dtDistRD"  type="text" class="datepicker"/>
              <i class="fas fa-calendar-check prefix"/>
              <label for="dtDistRD">Data da Distribuição</label>
              </div>
               <div class ='col s2 horasRD input-field'>
              <i class="far fa-hourglass prefix"/>
              <input id="horasRD" name="horasRD" type="text" class="validate"/>
              <label for="horasRD">HE CARF:</strong></label>
              </div>
              <div><a id="btnProcRD" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Processo">
              <i class="material-icons">add</i>
              </a>
              </div>

              </div>
               </div>
            </li>

            <li>
              <div class="collapsible-header">
                <i class="fas fa-retweet"/>Participação em TO/CSRF de março de 2019 até março de 2020
              </div>
              <div class="collapsible-body">
                 ${arraySol('turmaTO')}
                 <div class='row'>
                 <div class="form-group dtJulgamento input field col s3">
                <input id="dtJulgamento" name="dtJulgamento"  type="text" class="datepicker"/>
                <i class="fas fa-calendar-check prefix"/>
                <label for="dtJulgamento">Data do Julgamento</label>
                </div>
                <div class='col s6'>
                <i class="far fa-question-circle prefix"/>
                <label for="turnoPart">Selecione o turno de participação:</label>
                <select required name="turnoPart" id="turnoPart">
                <option class="form-group" value="Manha">Manhã</option>
                <option class="form-group" value="Tarde">Tarde</option>
                </select>
                </div>
                <div><a id="btnPart" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Participação">
                <i class="material-icons">add</i>
                </a>
                </div>
                </div>
                 ${msgTurno}
              </div>
            </li>

            <li>
              <div class="collapsible-header">
                <i class="fas fa-balance-scale"/>Participação em Seminário Promovido pelo CARF
              </div>
              <div class="collapsible-body">
                 <div class='row'>
                <div class='col s6'>
                <i class="far fa-question-circle prefix"/>
                <label for="turnoSeminario">Selecione o turno de participação:</label>
                <select required name="turnoSeminario" id="turnoSeminario">
                <option class="form-group" value=8>Dia 24/11/2020</option>
                <option class="form-group" value=3>Dia 25/11/2020 (1 turno)</option>
                <option class="form-group" value=6>Dia 25/11/2020 (2 turnos)</option>
                <option class="form-group" value=3>Dia 26/11/2020</option>
                </select>
                </div>
                <div><a id="btnSeminario" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Participação">
                <i class="material-icons">add</i>
                </a>
                </div>
                </div>
                <div class='row'>
              <blockquote>
              <strong>Importante:</strong>
              Serão concedidas 8 horas para participação no dia 24/11/2020, 3 horas por turno no dia 25/11/2020 e 3 horas no dia 26/11/2020.
              </blockquote>
             </div>
              </div>
            </li>

            <li>
              <div class="collapsible-header">
                <i class="fab fa-adversal"/>Relatoria de Processos  <em>ad hoc</em>
              </div>
              <div class="collapsible-body">
                <div class='row'>
              <div class ='col s3 numProcAdHoc input-field'>
              <i class=" fas fa-calendar-day prefix"/>
              <input id="numProcAdHoc" placeholder="Nº do Processo. Somente números" name="numProcAdHoc"type="text" class="validate" />
              <label for="numProcAdHoc">Número do Processo:</label>
              </div>
               <div class="form-group dtDistAdHoc input field col s2">
              <input id="dtDistAdHoc" name="dtDistAdHoc"  type="text" class="datepicker"/>
              <i class="fas fa-calendar-check prefix"/>
              <label for="dtDistAdHoc">Data da Distribuição</label>
              </div>
               <div class ='col s2 horasAdHoc input-field'>
              <i class="far fa-hourglass prefix"/>
              <input id="horasAdHoc" name="horasRD" type="text" class="validate"/>
              <label for="horasAdHoc">HE CARF:</strong></label>
              </div>
              <div><a id="btnProcAdHoc" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Processo">
              <i class="material-icons">add</i>
              </a>
              </div>

              </div>
               </div>
            </li>

            </ul>
            </div>
            <div id='areaDispensa'>
            <div class='row'>
            <div class='col s6 offset-s3'>
            <div id='cardSoma' class="card hoverable cardLaranja">
            <div class="card-content ">
            <span class="card-title">Somatório de Horas da Solicitação: <span id='somatorioHoras'>0</span></span>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div id='areaBotoes'/>
            `);
      $('#areaBotoes').append(`
      <ul id='ulSolicitacoes' class='collection'/>
          ${campoObs}
          ${camposArq}
          ${botoes}
          `);
      initElementos();
      elementosDispensa();
      $('#btn-enviar').click((e) => {
        if (!$('#ulSolicitacoes').children().text()) {
          var toastHTML = `<span>Deve ser adicionada pelo menos uma solicitação.</span>`;
          M.toast({
            html: toastHTML,
            classes: 'rounded',
            timeRemaining: 500,
          });
        } else if (+$('#somatorioHoras').html() < 126) {
          var toastHTML = `<span>As solicitações de Dispensa de Sorteio só poderão ser enviadas caso o somatório total seja maior ou igual a 126 horas.</span>`;
          M.toast({
            html: toastHTML,
            classes: 'rounded',
            timeRemaining: 500,
          });
        } else {
          let html = `
            <div class='row'>
            <p>Dispensa de Sorteio</p>
            <p>Solicitações:<br> ${pegaDisp()}</p>
            <p>Somatório de Horas:${+$('#somatorioHoras').html()}</p>
            <p>Observações: ${$('#observacoes').val()}</p>
            <p>Arquivos:${$('.arqsUp').children().text()}</p>
            `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `Dispensa de Sorteio`,
            dados: {
              solicitacoes: pegaDisp(),
              somatorioHoras: +$('#somatorioHoras').html(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //Outras solicitações
  //Justificar faltas à sessões de julgamento - arrayFalta - período do afastamento
  $('#fsj').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#fsj').text()}</h5><br/>
      ${arraySol('falta')}
      ${campoPeriodo}
      ${diasSessao}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btn-enviar').click((e) => {
        if (
          !$('#fimAfastamento').val() ||
          !$('#inicioAfastamento').val() ||
          !$('#diasSessao').val()
        ) {
          var toastHTML = `<span>Os campos de início/fim do afastamento e dias de sessão precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (
          moment($('#fimAfastamento').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já ocorridos e finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <p>${$('#fsj').text()}</p>
          <p>Tipo: ${$('#tipoAfastamento option:selected').val()}</p>
          <p>Início: ${$('#inicioAfastamento').val()}</p>
          <p>Fim: ${$('#fimAfastamento').val()}</p>
          <p>Dias de Sessão: ${$('#diasSessao').val()}</p>
          <p>Observações: ${$('#observacoes').val()}</p>
          <p>Arquivos:${$('.arqsUp').children().text()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: $('#fsj').text(),
            dados: {
              tipoAfastamento: $('#tipoAfastamento option:selected').val(),
              inicioAfastamento: $('#inicioAfastamento').val(),
              fimAfastamento: $('#fimAfastamento').val(),
              diasSessao: $('#diasSessao').val(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
}

function pegaArquivos() {
  let a = [];
  $('.collection-arqs')
    .get()
    .forEach((c) => {
      a.push($(c).attr('data-id'));
    });
  return a;
}
function btnEnviaArq() {
  $('#btnEnviaArq').off();
  $('#btnEnviaArq').click((e) => {
    e.preventDefault();
    if ($('#file')[0].files[0]) {
      $('#btnEnviaArq').toggle();
      var arq = $('#file')[0].files[0];
      handleFile(arq, 'POST');
    }
  });
}
function handleSOL(registro, metodo, setor) {
  registro.setor = setor;
  registro.cpf = $('#cpfCons').text();
  registro.uniqueId = moment.now();
  registro.dtCriacao = moment().format('DD/MM/YYYY');
  registro.nome = $('.nomeSol').text();
  $.ajax({
    url: '/julgamento/conselheiros/solicitacoes',
    data: registro,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      setTimeout((a) => {
        location.reload();
      }, 1100);
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
    },
  });
}
function montaLi(result) {
  $('.arqsUp').append(`
            <li class="collection-arqs collection-item" data-id='${result._id}' id='${result._id}'>
            <div>${result.nome}<a href="#!" class="aClick secondary-content">
           <i class="red-text	far fa-trash-alt"/>
            </a>
            </div>
            </li>`);
  $('.aClick').click((e) => {
    handleFile({ _id: result._id }, 'DELETE');
  });
}

function montaLiProc(processo) {
  $('.ulProcessos').append(`
            <li class="collection-item collection-procs" data-id='${processo}' id='${processo}'>
            <div>${processo}<a href="#!" class="removeProc${processo} secondary-content">
            <i class="red-text	far fa-trash-alt"/>
            </a>
            </div>
            </li>`);
  $(`.removeProc${processo}`).click((e) => {
    $(`#${processo}`).remove();
  });
}

function pegaProcs() {
  let procs = [];
  $('.collection-procs')
    .get()
    .forEach((c) => {
      procs.push($(c).attr('data-id'));
    });
  return procs;
}

function handleFile(arquivo, metodo) {
  let fd;
  if (metodo == 'DELETE') {
    fd = arquivo;
    $.ajax({
      url: '/julgamento/conselheiros/arquivos',
      data: fd,
      type: metodo,
      success: function (result) {
        var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        console.log(result);
        $(`#${fd._id}`).remove();
      },
      error: function (result) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        console.log(result);
      },
    });
  } else {
    fd = new FormData();
    $('#btnEnviaArq').toggle();
    $('.progress').show();
    fd.append('file', arquivo);
    $.ajax({
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener(
          'progress',
          function (evt) {
            $('.progress').show();
            if (evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total;
              $('.determinate').css(
                'width',
                Math.round(percentComplete * 100) + '%',
              );
            }
          },
          false,
        );
        return xhr;
      },
      url: '/julgamento/conselheiros/arquivos',
      data: fd,
      processData: false,
      contentType: false,
      type: metodo,
      success: function (result) {
        var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        console.log(result);
        $('#mostraArq').show();
        montaLi(result);
        $('.btnEnviaArq').toggle();
        $('.progress').fadeOut();
        $('.file-path').val('');
      },
      error: function (result) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        console.log(result);
      },
    });
  }
}
