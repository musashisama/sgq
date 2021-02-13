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
            <p><strong>Conselheiro:</strong> ${
              JSON.parse($('#dataUser').attr('data-user')).nome
            }</p>
            <p><strong>CPF:</strong> ${
              JSON.parse($('#dataUser').attr('data-user')).cpf
            }</p>
            <p><strong>Verifique</strong> se os dados abaixo estão corretos e clique em <strong>"Confirma"</strong> para efetuar o registro:</p>

            ${html}

            </p>`,
  );
  $('.concorda').click(function () {
    $('.pModal').text('');
    $('.hModal').text('');
    dados.html = html;
    handleSOL(dados, 'POST', dados.setor);
    $('#btn-enviar').removeClass('modal-trigger');
  });
  $('.cancela').click(function () {
    $('.pModal').text('');
    $('.hModal').text('');
    $('#btn-enviar').removeClass('modal-trigger');
    $('.modal').modal('destroy');
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
//Faz validações de todos os campos de solicitações de dispensa e envia os valores e grupos de dispensa para a função de montagem e formatação  da listagem de solicitações.
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
        `<strong>Tipo:</strong> Excesso de Horas em Lotes de Sorteio, <strong>Nome do Lote:</strong> ${$(
          '#nomeLoteEx',
        ).val()}, <strong>Mês do Sorteio:</strong> ${$(
          '#mesSorteioEx',
        ).val()}, <strong>Horas em Excesso do Lote:</strong> ${
          +$('#horasLoteEx').val() - 126
        }`,
        moment().unix(),
        +$('#horasLoteEx').val() - 126,
        'G1',
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
        `<strong>Tipo:</strong> Formalização de Voto Vencedor, </strong>Número do Processo:<strong> ${$(
          '#numProcFVV',
        ).val()}, <strong>Número do Acórdão:</strong> ${$(
          '#numAcoFVV',
        ).val()}, <strong>Data da Sessão:</strong> ${$(
          '#dtSessaoFVV',
        ).val()}, HE CARF: ${+valorFVV(
          $('#dtSessaoFVV').val(),
          $('#horasFVV').val(),
        )}`,
        moment().unix(),
        +valorFVV($('#dtSessaoFVV').val(), $('#horasFVV').val()),
        //$('#dtSessaoFVV').val(),
        'G2',
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
        `<strong>Tipo:</strong> Horas Recebidas em Sorteio Extraordinário, <strong>Nome do Lote/nº do Processo:</strong> ${$(
          '#nomeLoteSE',
        ).val()}, <strong>Mês do Sorteio:</strong> ${$(
          '#mesSorteioSE',
        ).val()}, <strong>Horas do Lote/Processo:</strong> ${+$(
          '#horasLoteSE',
        ).val()}`,
        moment().unix(),
        +$('#horasLoteSE').val(),
        'G1',
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
        `<strong>Tipo:</strong> Distribuição de Processos Reflexos ou Decorrentes, <strong>Número do Processo:</strong> ${$(
          '#numProcRD',
        ).val()}, <strong>Data da Distribuição:</strong> ${$(
          '#dtDistRD',
        ).val()}, <strong>HE CARF:</strong> ${+$('#horasRD').val()}`,
        moment().unix(),
        +$('#horasRD').val(),
        'G1',
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
    } else if (
      moment($('#dtJulgamento').val(), 'DD/MM/YYYY').isBefore(
        moment('01/03/2019', 'DD/MM/YYYY'),
      ) ||
      moment($('#dtJulgamento').val(), 'DD/MM/YYYY').isAfter(
        moment('31/03/2020', 'DD/MM/YYYY'),
      )
    ) {
      var toastHTML = `<span>Observe o período da participação. Somente entre 01/03/2019 e 31/03/2020</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    } else {
      montaLiDisp(
        `<strong>Tipo:</strong> Participação em TO/CSRF de março de 2019 até março de 2020, <strong>Turma de Participação:</strong> ${$(
          '#tipoAfastamento option:selected',
        ).val()}, <strong>Data do Julgamento:</strong> ${$(
          '#dtJulgamento',
        ).val()}, <strong>Turno:</strong> ${$(
          '#turnoPart option:selected',
        ).val()}, HE CARF: 4`,
        moment().unix(),
        4,
        'G2',
      );
      $('#dtJulgamento').val('');
    }
  });
  $('#btnSeminario').click(() => {
    montaLiDisp(
      `<strong>Tipo:</strong> Participação em Seminário Promovido pelo CARF, <strong>Data de Participação:</strong> ${$(
        '#turnoSeminario option:selected',
      ).text()}, <strong>HE CARF:</strong>${+$(
        '#turnoSeminario option:selected',
      ).val()}`,
      moment().unix(),
      +$('#turnoSeminario option:selected').val(),
      'G2',
    );
  });
  $('#btnProcAdHoc').click(() => {
    if (!$('#numProcAdHoc').val() || !$('#dtDistAdHoc').val()) {
      var toastHTML = `<span>Todos os campos devem ser preenchidos.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    } else {
      montaLiDisp(
        `<strong>Tipo:</strong> Relatoria de Processos <em>ad hoc</em>, <strong>Número do Processo:</strong> ${$(
          '#numProcAdHoc',
        ).val()}, <strong>Data da Distribuição:</strong> ${$(
          '#dtDistAdHoc',
        ).val()}, <strong>HE CARF:</strong> 2`,
        moment().unix(),
        2,
        'G2',
      );
      $('#numProcAdHoc').val('');
      $('#dtDistAdHoc').val('');
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
        `<strong>Tipo:</strong> Processos Devolvidos Por Impedimento, Suspeição ou por Impossibilidade de Julgamento, <strong>Número do Processo:</strong> ${$(
          '#numProcDev',
        ).val()}, <strong>Data da Distribuição:</strong> ${$(
          '#dtDistDev',
        ).val()}, <strong>HE CARF:</strong> ${+$('#horasDev').val()}`,
        moment().unix(),
        +-$('#horasDev').val(),
        'G1',
      );
      $('#numProcDev').val('');
      $('#dtDistDev').val('');
      $('#horasDev').val('');
    }
  });

  $('#btnProcApes').click(() => {
    if (!$('#numProcApes').val() || !$('#horasApes').val()) {
      var toastHTML = `<span>Todos os campos devem ser preenchidos.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    } else {
      montaLiDisp(
        `<strong>Tipo:</strong> Apuração Especial nº 749, <strong>Número da Solicitação:</strong> ${$(
          '#numSol',
        ).val()},<strong>Número do Processo:</strong> ${$(
          '#numProcApes',
        ).val()}, <strong>Saldo de Horas:</strong> ${+$('#horasApes').val()}`,
        moment().unix(),
        +$('#horasApes').val(),
        'G1',
      );
      $('#numSol').val('');
      $('#numProcApes').val('');
      $('#horasApes').val('');
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
  +$('#somatorioHoras').html(+$('#somatorioHoras').html() + valor);
  if (+$('#somatorioHoras').html() >= 126) {
    $('#cardSoma').removeClass('cardLaranja');
    $('#cardSoma').addClass('cardVerde');
  }
  if (+$('#somatorioHoras').html() < 126) {
    $('#cardSoma').removeClass('cardVerde');
    $('#cardSoma').addClass('cardLaranja');
  }
  $(`.removePart${id}`).click((e) => {
    +$('#somatorioHoras').html(
      +$('#somatorioHoras').html() - +$(`.removePart${id}`).attr('data-valor'),
    );
    $(`#${id}`).remove();
  });
}

function pegaParts() {
  let parts = [];
  $('.collection-parts')
    .get()
    .forEach((c) => {
      parts.push(
        '<br />' +
          $(c)
            .text()
            .replace(/(\r\n|\n|\r)/gm, ''),
      );
    });
  return parts;
}

function montaLiDisp(solicitacao, id, valor, grupo) {
  $('#ulSolicitacoes').append(`
            <li class="collection-item collection-disp" id='${id}'>
            <div>${solicitacao}<a href="#!" data-G1=${
    grupo == 'G1' ? +valor : 0
  } data-G2=${
    grupo == 'G2' ? +valor : 0
  } data-valor=${+valor} class="removeDisp${id}  secondary-content">
            <i class="red-text	far fa-trash-alt"/>
            </a>
            </div>
            </li>`);
  if (grupo == 'G1') {
    $('#G1').html(+$('#G1').html() + +valor);
    console.log($('#G1').html());
  }
  if (grupo == 'G2') {
    $('#G2').html(+$('#G2').html() + +valor);
    console.log($('#G2').html());
  }
  $('#cardSoma').slideUp(300).slideDown(300);
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
    $('#cardSoma').slideUp(300).slideDown(300);
    +$('#G1').html(+$('#G1').html() - +$(`.removeDisp${id}`).attr('data-G1'));
    +$('#G2').html(+$('#G2').html() - +$(`.removeDisp${id}`).attr('data-G2'));
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
      disp.push(
        '<br />' +
          $(c)
            .text()
            .replace(/(\r\n|\n|\r)/gm, ''),
      );
    });
  return disp;
}

function pegaAPES() {
  let disp = [];
  $('.collection-apes')
    .get()
    .forEach((c) => {
      disp.push(
        '<br />' +
          $(c)
            .text()
            .replace(/(\r\n|\n|\r)/gm, ''),
      );
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
  //PORTARIA ME Nº 430, DE 30 DE DEZEMBRO DE 2020
  feriados = [
    '24-12-2020',
    '25-12-2020',
    '31-12-2020',
    '01-01-2021',
    '15-02-2021',
    '16-02-2021',
    '17-02-2021',
    '02-04-2021',
    '21-04-2021',
    '01-05-2021',
    '03-06-2021',
    '07-09-2021',
    '12-10-2021',
    '28-10-2021',
    '02-11-2021',
    '15-11-2021',
    '24-12-2021',
    '25-12-2021',
    '31-12-2021',
    '01-01-2022',
  ];
  moment.updateLocale('br', {
    workingWeekdays: [1, 2, 3, 4, 5],
    //holidays: feriados,
    //holidayFormat: 'DD-MM-YYYY',
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

function calculaFeriados(inicio, fim, relatorio) {
  let diff;
  let meioPeriodo = [
    '24/12/2020',
    '31/12/2021',
    '31/12/2020',
    '24/12/2021',
    '17/02/2021',
  ];
  let feriados = [
    '25/12/2020',
    '01/01/2021',
    '15/02/2021',
    '16/02/2021',
    '02/04/2021',
    '21/04/2021',
    '01/05/2021',
    '03/06/2021',
    '07/09/2021',
    '12/10/2021',
    '28/10/2021',
    '02/11/2021',
    '15/11/2021',
    '25/12/2021',
    '01/01/2022',
  ];

  if (relatorio == 'REGAP') {
    diff =
      moment(fim, 'DD/MM/YYYY').diff(moment(inicio, 'DD/MM/YYYY'), 'days') + 1;
  } else if (relatorio == 'REINP') {
    diff =
      moment(fim, 'DD/MM/YYYY').businessDiff(moment(inicio, 'DD/MM/YYYY')) + 1;
    meioPeriodo.forEach((d) => {
      if (
        moment(d, 'DD/MM/YYYY').isBetween(
          moment(inicio, 'DD/MM/YYYY'),
          moment(fim, 'DD/MM/YYYY'),
        )
      ) {
        diff -= 0.25;
        console.log(diff);
      }
    });
    feriados.forEach((d) => {
      if (
        moment(d, 'DD/MM/YYYY').isBetween(
          moment(inicio, 'DD/MM/YYYY'),
          moment(fim, 'DD/MM/YYYY'),
        )
      ) {
        diff -= 1;
        console.log(diff);
      }
    });
  }

  return diff;
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
  let arrayCogec = [
    'Licença à gestante',
    'Licença à adotante',
    'Licença à paternidade',
    'Licença para tratamento de saúde',
    'Licença em razão de casamento',
    'Licença por motivo de falecimento (cônjuge, companheiro, pais, madastra ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos)',
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
  if (array === 'cogec') {
    arrayCogec.forEach((ops, i) => {
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
  <div class ='col s5 diasUteis'>
  <h6>Quantidade de dias úteis (excluídos os dias de sessão): <span id='diasUteis'/></h6>
  <h6>Horas a serem reduzidas da meta: <span id='horasMeta'/></h6>
  </div>
  <div class ='col s5 diasSessao input-field'>
  <i class=" fas fa-calendar-day prefix"/>
  <input id="diasSessao" name="diasSessao" type="number" class="validate" value=0/>
  <label for="diasSessao">Qtde de Dias de Sessão programados no período acima (se houver):</label>
  </div>
  </div>`;
  let diasSessao = `
  <div class="row">
  <div class ='col s5 diasSessao input-field'>
  <i class=" fas fa-calendar-day prefix"/>
  <input id="diasSessao" name="diasSessao" type="number" class="validate" value=0/>
  <label for="diasSessao">Qtde de Dias de Sessão programados no período acima (se houver):</label>
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
  <strong>Você pode adicionar mais de uma participação na mesma solicitação.</strong> Caso tenha participado de sessão de julgamento em mais de uma turma por turno, selecione <strong>apenas</strong> a primeira turma de participação.
  As solicitações deverão ser feitas individualmente para cada turno de participação, onde serão abatidas 4 horas por turno. Caso haja mais de uma solicitação para <strong>uma mesma data e turno</strong>, <strong>todas serão rejeitadas.</strong>
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
  let processosRape = `
<div class='row'>
<div class ='col s3 numProc input-field'>
<i class=" fas fa-calendar-day prefix"/>
<input id="numProc" placeholder="Nº do Processo. Somente números" name="numProc" type="text" class="validate">
<label for="numProc">Número do Processo:</label>
</div>
<div class ='col s2 saldoHE input-field'>
<i class=" fas fa-calendar-day prefix"/>
<input id="saldoHE" placeholder="Saldo de Horas" name="saldoHE" type="text" class="validate">
<label for="saldoHE">Saldo de Horas:</label>
</div>
<div><a id="btnProc" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar processo">
<i class="material-icons">add</i>
</a>
</div>
</div>
<div class='row'>
<div id="mostraProcessos" class="col s12">
<ul class="collection ulProcessos"/>
</div>
</div>`;
  let processosDMH = `
<div class='row'>
<div class ='col s3 numProc input-field'>
<i class=" fas fa-calendar-day prefix"/>
<input id="numProc" placeholder="Nº do Processo. Somente números" name="numProc" type="text" class="validate">
<label for="numProc">Número do Processo:</label>
</div>
<div class ='col s2 heRegap input-field'>
<i class=" fas fa-calendar-day prefix"/>
<input id="heRegap" placeholder="HE REGAP Atual" name="heRegap" type="text" class="validate">
<label for="heRegap">HE REGAP Atual:</label>
</div>
<div class='col s3'>
                <i class="far fa-question-circle prefix"/>
                <label for="tipoProc">Selecione o tipo:</label>
                <select required name="tipoProc" id="tipoProc">
                <option class="form-group" value="RORV">Recurso de Ofício/Voluntário</option>
                <option class="form-group" value="RESP">Recurso Especial</option>
                <option class="form-group" value="SEMB">Embargo recebido em sorteio</option>
                <option class="form-group" value="RD">Retorno de Diligência - Próprio Conselheiro</option>
                </select>
                </div>
<div><a id="btnProc" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar processo">
<i class="material-icons">add</i>
</a>
</div>
</div>
<div class='row'>
<div id="mostraProcessos" class="col s12">
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
      $('body').mousemove(() => {
        diff = calculaFeriados(
          $('#inicioAfastamento').val(),
          $('#fimAfastamento').val(),
          'REGAP',
        );
        // diff =
        //   moment($('#fimAfastamento').val(), 'DD/MM/YYYY').diff(
        //     moment($('#inicioAfastamento').val(), 'DD/MM/YYYY'),
        //     'days',
        //   ) + 1;
        $('#diasCorridos').html(diff);
      });
      $('#btn-enviar').click((e) => {
        if (!$('#fimAfastamento').val() || !$('#inicioAfastamento').val()) {
          var toastHTML = `<span>Os campos de início e fim do afastamento precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (
          moment($('#inicioAfastamento').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já iniciados ou finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <h5>REGAP: ${$('#aflp').text()}</h5>
          <p><strong>Tipo:</strong> ${$(
            '#tipoAfastamento option:selected',
          ).val()}</p>
          <p><strong>Início:</strong> ${$('#inicioAfastamento').val()}</p>
          <p><strong>Fim:</strong> ${$('#fimAfastamento').val()}</p>
          <p><strong>Dias:</strong> ${diff}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            setor: 'DIPAJ',
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
          initModal();
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
          <h5>REGAP: ${$('#pvv').text()}</h5>
          <p><strong>Quantidade de Dias a serem Prorrogados:</strong> ${$(
            '#diasProrrogacao',
          ).val()}</p>
          <p><strong>Processo(s):</strong> ${pegaProcs()}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REGAP: ${$('#pvv').text()}`,
            setor: 'DIPAJ',
            dados: {
              diasProrrogacao: $('#diasProrrogacao').val(),
              processos: pegaProcs(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
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
          <h5>REGAP: ${$('#ppi').text()}</h5>
          <p><strong>Quantidade de Dias a serem Prorrogados:</strong> ${$(
            '#diasProrrogacao',
          ).val()}</p>
          <p><strong>Processo(s):</strong> ${pegaProcs()}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REGAP: ${$('#ppi').text()}`,
            setor: 'DIPAJ',
            dados: {
              diasProrrogacao: $('#diasProrrogacao').val(),
              processos: pegaProcs(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
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
          <h5>REGAP: ${$('#ppa').text()}</h5>
          <p><strong>Quantidade de Dias a serem Prorrogados:</strong> ${$(
            '#diasProrrogacao',
          ).val()}</p>
          <p><strong>Processo(s):</strong> ${pegaProcs()}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REGAP: ${$('#ppa').text()}`,
            setor: 'DIPAJ',
            dados: {
              diasProrrogacao: $('#diasProrrogacao').val(),
              processos: pegaProcs(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
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
          <h5>REGAP: ${$('#dpa').text()}</h5>
          <p><strong>Processo(s):</strong> ${pegaProcs()}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REGAP: ${$('#dpa').text()}`,
            setor: 'DIPAJ',
            dados: {
              processos: pegaProcs(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
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
        } else if (
          moment($('#dtJulgamento').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já ocorridos e finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <h5>REGAP: ${$('#ora').text()}</h5>
          <p><strong>Data do Julgamento:</strong> ${$(
            '#dtJulgamento',
          ).val()}</p>
          <p><strong>Processo(s):</strong> ${pegaProcs()}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REGAP: ${$('#ora').text()}`,
            setor: 'DIPAJ',
            dados: {
              dataJulgamento: $('#dtJulgamento').val(),
              processos: pegaProcs(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
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
      $('body').mousemove(() => {
        diff = calculaFeriados(
          $('#inicioAfastamento').val(),
          $('#fimAfastamento').val(),
          'REINP',
        );
        // diff =
        //   moment($('#fimAfastamento').val(), 'DD/MM/YYYY').businessDiff(
        //     moment($('#inicioAfastamento').val(), 'DD/MM/YYYY'),
        //   ) + 1;
        $('#diasUteis').html(diff - $('#diasSessao').val());
        $('#horasMeta').html(+$('#diasUteis').html() * 8);
      });
      $('#btn-enviar').click((e) => {
        if (!$('#fimAfastamento').val() || !$('#inicioAfastamento').val()) {
          var toastHTML = `<span>Os campos de início e fim do afastamento precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (
          moment($('#inicioAfastamento').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já iniciados ou finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <h5>REINP: ${$('#aflm').text()}</h5>
          <p><strong>Tipo:</strong> ${$(
            '#tipoAfastamento option:selected',
          ).val()}</p>
          <p><strong>Início:</strong> ${$('#inicioAfastamento').val()}</p>
          <p><strong>Fim:</strong> ${$('#fimAfastamento').val()}</p>
           <p><strong>Dias de Sessão programados no período:<strong> ${$(
             '#diasSessao',
           ).val()}</p>
          <p><strong>Dias úteis (excluídos os dias de sessão):<strong> ${$(
            '#diasUteis',
          ).text()}</p>
          <p><strong>Horas a serem reduzidas da meta de produtividade:</strong> ${$(
            '#horasMeta',
          ).text()}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REINP: ${$('#aflm').text()}`,
            setor: 'DIPAJ',
            dados: {
              tipoAfastamento: $('#tipoAfastamento option:selected').val(),
              inicioAfastamento: $('#inicioAfastamento').val(),
              fimAfastamento: $('#fimAfastamento').val(),
              diasUteis: $('#diasUteis').text(),
              diasSessao: $('#diasSessao').val(),
              horasReducao: $('#horasMeta').text(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
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
          <h5>REINP: ${$('#mcc').text()}</h5>
          <p><strong>Tipo:</strong> ${$(
            '#tipoAfastamento option:selected',
          ).val()}</p>
          <p><strong>Data da Mudança:</strong> ${$('#dtMudanca').val()}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REINP: ${$('#mcc').text()}`,
            setor: 'DIPAJ',
            dados: {
              tipoAfastamento: $('#tipoAfastamento option:selected').val(),
              dtMudanca: $('#dtMudanca').val(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
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
          <h5>REINP: ${$('#acp').text()}</h5>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
        let dados = {
          uniqueId: moment().unix(),
          tipo: `REINP: ${$('#acp').text()}`,
          setor: 'DIPAJ',
          dados: {
            observacoes: $('#observacoes').val(),
            arquivos: pegaArquivos(),
          },
        };
        initModal();
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
      $('body').mousemove(() => {
        diff =
          moment($('#fimPeriodo').val(), 'DD/MM/YYYY').businessDiff(
            moment($('#inicioPeriodo').val(), 'DD/MM/YYYY'),
          ) + 1;
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
          <h5>REINP: ${$('#presi').text()}</h5>
          <p><strong>Tipo:</strong> ${$(
            '#tipoAfastamento option:selected',
          ).val()}</p>
          <p><strong>Início do Período:</strong> ${$(
            '#inicioPeriodo',
          ).val()}</p>
          <p><strong>Fim do Período:</strong> ${$('#fimPeriodo').val()}</p>
          <p><strong>Dias Corridos:</strong> ${diff}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REINP: ${$('#presi').text()}`,
            setor: 'DIPAJ',
            dados: {
              inicioPeriodo: $('#inicioPeriodo').val(),
              fimPeriodo: $('#fimPeriodo').val(),
              diasCorridos: diff,
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
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
                <div class='col s6 offset-s3'>
                <div id='cardSoma' class="card hoverable cardLaranja">
                <div class="card-content ">
                <span class="card-title">Somatório de Horas da Solicitação: <span id='somatorioHoras'>0</span></span>
                </div>
                </div>
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
        } else if (
          moment($('#dtJulgamento').val(), 'DD/MM/YYYY').isBefore(
            moment('01/04/2020', 'DD/MM/YYYY'),
          )
        ) {
          var toastHTML = `<span>Somente a partir de abril de 2020.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          montaLiPart(
            `<strong>Turma de Participação:</strong> ${$(
              '#tipoAfastamento option:selected',
            ).val()},
        <strong>Data do Julgamento:</strong> ${$('#dtJulgamento').val()},
        <strong>Turno:</strong> ${$(
          '#turnoPart option:selected',
        ).val()}, <strong>HE CARF:</strong> ${4}`,
            moment().unix(),
            4,
          );
        }
      });
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
        } else if (
          moment($('#dtJulgamento').val(), 'DD/MM/YYYY').isBefore(
            moment('01/04/2020', 'DD/MM/YYYY'),
          )
        ) {
          var toastHTML = `<span>Somente a partir de abril de 2020.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
              <div class='row'>
              <h5>REINP: ${$('#ptoa').text()}</h5>
              <p><strong>Participações:</strong> ${pegaParts()}</p>
              <p><strong>Somatório de Horas:</strong> ${+$(
                '#somatorioHoras',
              ).html()}</p>
              <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
              <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
              `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REINP: ${$('#ptoa').text()}`,
            setor: 'DIPAJ',
            dados: {
              somatorioHoras: +$('#somatorioHoras').html(),
              participacoes: pegaParts(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
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
                <div class='col s6 offset-s3'>
                <div id='cardSoma' class="card hoverable cardLaranja">
                <div class="card-content ">
                <span class="card-title">Somatório de Horas da Solicitação: <span id='somatorioHoras'>0</span></span>
                </div>
                </div>
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
        } else if (
          moment($('#dtJulgamento').val(), 'DD/MM/YYYY').isBefore(
            moment('01/04/2020', 'DD/MM/YYYY'),
          )
        ) {
          var toastHTML = `<span>Somente a partir de abril de 2020.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          montaLiPart(
            `<strong>Turma de Participação:</strong> ${$(
              '#tipoAfastamento option:selected',
            ).val()},
        <strong>Data do Julgamento:</strong> ${$('#dtJulgamento').val()},
        <strong>Turno:</strong> ${$(
          '#turnoPart option:selected',
        ).val()}, <strong>HE CARF:</strong> ${4}`,
            moment().unix(),
            4,
          );
        }
      });
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
        } else if (
          moment($('#dtJulgamento').val(), 'DD/MM/YYYY').isBefore(
            moment('01/04/2020', 'DD/MM/YYYY'),
          )
        ) {
          var toastHTML = `<span>Somente a partir de abril de 2020.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
              <div class='row'>
              <h5>REINP: ${$('#pptex').text()}</h5>
              <p><strong>Participações:</strong> ${pegaParts()}</p>
               <p><strong>Somatório de Horas:</strong> ${+$(
                 '#somatorioHoras',
               ).html()}</p>
              <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
              <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
              `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REINP: ${$('#pptex').text()}`,
            setor: 'DIPAJ',
            dados: {
              somatorioHoras: +$('#somatorioHoras').html(),
              participacoes: pegaParts(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
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
      $('body').mousemove(() => {
        diff =
          moment($('#dataIndicacao').val(), 'DD/MM/YYYY').diff(
            moment($('#dataSorteio').val(), 'DD/MM/YYYY'),
            'days',
          ) + 1;
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
        } else if (+diff >= 21) {
          var toastHTML = `<span>A diferença deve ser de no mínimo 21 dias.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <h5>REINP: ${$('#s21').text()}</h5>
          <p><strong>Data do Sorteio:</strong> ${$('#dataSorteio').val()}</p>
          <p><strong>Data da Indicação para Pauta:</strong> ${$(
            '#dataIndicacao',
          ).val()}</p>
          <p><strong>Dias corridos:</strong> ${diff}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REINP: ${$('#s21').text()}`,
            setor: 'DIPAJ',
            dados: {
              dtSorteio: $('#dataSorteio').val(),
              dtindicacao: $('#dataIndicacao').val(),
              diasCorridos: diff,
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //APURAÇÃO ESPECIAL749
  $('#rape').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#rape').text()}</h5><br/>
      ${processosRape}
      ${campoObs}
      <blockquote>
              <strong>Importante:</strong>
             Deverá ser informado o saldo de horas definido na solicitação de verificação. Ex: Se um processo tinha no REGAP 12 horas e na solicitação de verificação foi constatado que a atribuição correta é de 15 horas, o saldo é de 3 horas e esse é o valor a ser informado no campo «Saldo de Horas»
              </blockquote>
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
          let string = `<strong>Número do Processo:</strong> ${$(
            '#numProc',
          ).val()}, <strong>Saldo de Horas:</strong> ${$('#saldoHE').val()}`;
          montaLiAPES($('#numProc').val(), string);
          $('#numSol').val('');
          $('#numProc').val('');
          $('#saldoHE').val('');
        }
      });
      $('#btn-enviar').click((e) => {
        if (!$('.ulProcessos').children().text()) {
          var toastHTML = `<span>O campo  Número do(s) Processo(s) precisa estar preenchido.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <h5>REINP: ${$('#rape').text()}</h5>
          <p><strong>Processo(s):</strong> ${pegaProcs()}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `REINP: ${$('#rape').text()}`,
            setor: 'DIPAJ',
            dados: {
              processos: pegaProcs(),
              observacoes: $('#observacoes').val(),
            },
          };
          initModal();
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
              <input id="mesSorteioEx" placeholder="mm/aaaa" name="mesSorteioEx" type="text" class="validate"/>
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
                <i class="fas fa-undo-alt"/>Processos Devolvidos por Impedimento, Suspeição ou por Impossibilidade de Julgamento (Sem Retorno)
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
              <input id="mesSorteioSE" placeholder="mm/aaaa" name="mesSorteioSE" type="text" class="validate"/>
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
              <div><a id="btnProcAdHoc" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Processo">
              <i class="material-icons">add</i>
              </a>
              </div>

              </div>
               </div>
            </li>

            <li>
              <div class="collapsible-header">
                <i class="fas fa-clipboard-list"/>Apuração Especial nº 749
              </div>
              <div class="collapsible-body">
                <div class='row'>
                <div class ='col s4 numSol input-field'>
              <i class=" fas fa-calendar-day prefix"/>
              <input id="numSol" placeholder="Número (ID) da Solicitação de Verificação" name="numSol" type="text" class="validate">
              <label for="numSol">Número (ID) da Solicitação de Verificação:</label>
              </div>
              <div class ='col s3 numProcApes input-field'>
              <i class=" fas fa-calendar-day prefix"/>
              <input id="numProcApes" placeholder="Nº do Processo. Somente números" name="numProcApes" type="text" class="validate" />
              <label for="numProcApes">Número do Processo:</label>
              </div>

               <div class ='col s2 horasApes input-field'>
              <i class="far fa-hourglass prefix"/>
              <input id="horasApes" name="horasApes" type="text" class="validate"/>
              <label for="horasApes">Saldo de Horas:</strong></label>
              </div>
              <div><a id="btnProcApes" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Processo">
              <i class="material-icons">add</i>
              </a>
              </div>

              </div>
              <blockquote>
              <strong>Importante:</strong>
             Deverá ser informado o saldo de horas definido na solicitção de verificação. Ex: Se um processo tinha no REGAP 12 horas e na solicitação de verificação foi constatado que a atribuição correta é de 15 horas, o saldo é de 3 horas e esse é o valor a ser informado no campo «Saldo de Horas»
              </blockquote>
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
           <span id="G1" class="hide">0</span>
           <span id="G2" class="hide">0</span>
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
            <h5>Dispensa de Sorteio</h5>
            <p><strong>Solicitações:</strong><br /> ${pegaDisp()}</p>
            <p><strong>Somatório de Horas:</strong>${+$(
              '#somatorioHoras',
            ).html()}</p>
            <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
            <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
            <p><strong>Grupo Excesso de Horas, Sorteio Extraordinário, Reflexos/Decorrentes,  :</strong> ${$(
              '#G1',
            ).html()} horas.</p>
            <p><strong>Grupo Formalizar Voto Vencedor, Seminário CARF, Participação em TO/CSRF, Relatoria <em>ad hoc</em>:</strong> ${$(
              '#G2',
            ).html()} horas.</p>
            `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: `Dispensa de Sorteio`,
            setor: 'DIPAJ',
            dados: {
              G1: +$('#G1').html(),
              G2: +$('#G2').html(),
              solicitacoes: pegaDisp(),
              somatorioHoras: +$('#somatorioHoras').html(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
  //Outras solicitações
  //RAPURAÇÃO ESPECIAL 749
  $('#dmh').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#dmh').text()}</h5><br/>
      ${processosDMH}
      ${campoObs}
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
          var toastHTML = `<span>O campo «Número de Processo» deve estar preenchido somente com números!</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let string = `<strong>HE REGAP Atual:</strong> ${$(
            '#heRegap',
          ).val()}, <strong>Tipo:</strong> ${$(
            '#tipoProc option:selected',
          ).text()}`;
          montaLiAPES($('#numProc').val(), string);
          $('#numProc').val('');
          $('#heRegap').val('');
        }
      });
      $('#btn-enviar').click((e) => {
        let html = `
          <div class='row'>
          <h5>${$('#dmh').text()}</h5>
          <p><strong>Processo(s):</strong> ${pegaAPES()}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          `;
        let dados = {
          uniqueId: moment().unix(),
          tipo: `${$('#dmh').text()}`,
          setor: 'DIPAJ',
          dados: {
            processos: pegaAPES(),
            heRegap: $('#heRegap').val(),
            heOriginal: $('#heOriginal').val(),
            tipo: $('#tipoProc option:selected').val(),
            observacoes: $('#observacoes').val(),
          },
        };
        initModal();
        $('#btn-enviar').addClass('modal-trigger');
        montaModal(html, dados);
      });
    });
  });
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
          moment($('#inicioAfastamento').val(), 'DD/MM/YYYY').isAfter(moment())
        ) {
          var toastHTML = `<span>Somente podem ser cadastrados eventos já iniciados ou finalizados.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <h5>${$('#fsj').text()}</h5>
          <p><strong>Tipo:</strong> ${$(
            '#tipoAfastamento option:selected',
          ).val()}</p>
          <p><strong>Início:</strong> ${$('#inicioAfastamento').val()}</p>
          <p><strong>Fim</strong>: ${$('#fimAfastamento').val()}</p>
          <p><strong>Dias de Sessão:</strong> ${$('#diasSessao').val()}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            tipo: $('#fsj').text(),
            setor: 'DIPAJ',
            dados: {
              tipoAfastamento: $('#tipoAfastamento option:selected').val(),
              inicioAfastamento: $('#inicioAfastamento').val(),
              fimAfastamento: $('#fimAfastamento').val(),
              diasSessao: $('#diasSessao').val(),
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });

  //Licenças e Afastamentos para Controle da COGEC
  $('#lacc').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#lacc').text()}</h5><br/>
      ${arraySol('cogec')}
      ${campoPeriodo}
      ${diasCorridos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      let diff;
      $('body').mousemove(() => {
        diff =
          moment($('#fimAfastamento').val(), 'DD/MM/YYYY').diff(
            moment($('#inicioAfastamento').val(), 'DD/MM/YYYY'),
            'days',
          ) + 1;
        $('#diasCorridos').html(diff);
      });
      $('#btn-enviar').click((e) => {
        if (!$('#fimAfastamento').val() || !$('#inicioAfastamento').val()) {
          var toastHTML = `<span>Os campos de início e fim do afastamento precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        }
        if (!$('#fimAfastamento').val() || !$('#inicioAfastamento').val()) {
          var toastHTML = `<span>Os campos de início e fim do afastamento precisam estar preenchidos.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else if (!$('.arqsUp').children().text()) {
          var toastHTML = `<span>É necessário o envio de pelo menos um arquivo. Selecione o arquivo em seu computador e clique em «+» para enviá-lo.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        } else {
          let html = `
          <div class='row'>
          <h5>${$('#lacc').text()}</h5>
          <p><strong>Tipo:</strong> ${$(
            '#tipoAfastamento option:selected',
          ).val()}</p>
          <p><strong>Início:</strong> ${$('#inicioAfastamento').val()}</p>
          <p><strong>Fim:</strong> ${$('#fimAfastamento').val()}</p>
          <p><strong>Dias:</strong> ${diff}</p>
          <p><strong>Observações:</strong> ${$('#observacoes').val()}</p>
          <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
          `;
          let dados = {
            uniqueId: moment().unix(),
            setor: 'SEGEP',
            tipo: `${$('#lacc').text()}`,
            dados: {
              tipoAfastamento: $('#tipoAfastamento option:selected').val(),
              inicioAfastamento: $('#inicioAfastamento').val(),
              fimAfastamento: $('#fimAfastamento').val(),
              diasCorridos: diff,
              observacoes: $('#observacoes').val(),
              arquivos: pegaArquivos(),
            },
          };
          initModal();
          $('#btn-enviar').addClass('modal-trigger');
          montaModal(html, dados);
        }
      });
    });
  });
}

function pegaArquivos(html) {
  let a = [];
  if (html == true) {
    $('.collection-arqs')
      .get()
      .forEach((c) => {
        a.push(
          '<br />' +
            $(c)
              .text()
              .replace(/(\r\n|\n|\r)/gm, ''),
        );
      });
  } else {
    $('.collection-arqs')
      .get()
      .forEach((c) => {
        a.push($(c).attr('data-id'));
      });
  }
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
  registro.cpf = JSON.parse($('#dataUser').attr('data-user')).cpf;
  registro.nome = JSON.parse($('#dataUser').attr('data-user')).nome;
  registro.dtCriacao = moment().format('DD/MM/YYYY - HH:mm');
  registro.status = `Encaminhada para Análise - ${setor}`;
  $.ajax({
    url: '/julgamento/conselheiros/registro-solicitacoes',
    data: registro,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Solicitação nº ${result} criada com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      setTimeout((a) => {
        location.reload();
      }, 2500);
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro na criação da solicitação. Tente novamente.</span>`;
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

function montaLiAPES(processo, dados) {
  $('.ulProcessos').append(`
            <li class="collection-item collection-apes" data-id='${processo}' id='${processo}'>
            <div>${processo}, ${dados}<a href="#!" class="removeProc${processo} secondary-content">
            <i class="red-text	far fa-trash-alt"/>
            </a>
            </div>
            </li>`);
  $(`.removeProc${processo}`).click((e) => {
    $(`#${processo}`).remove();
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

function pegaProcs(html) {
  let procs = [];
  if (html == true) {
    $('.collection-procs')
      .get()
      .forEach((c) => {
        procs.push(
          '<br />' +
            $(c)
              .text()
              .replace(/(\r\n|\n|\r)/gm, ''),
        );
      });
  } else {
    $('.collection-procs')
      .get()
      .forEach((c) => {
        procs.push($(c).attr('data-id'));
      });
  }
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
        var toastHTML = `<span>Arquivo excluído com sucesso.</span>`;
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
        var toastHTML = `<span>Arquivo enviado com sucesso.</span>`;
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
