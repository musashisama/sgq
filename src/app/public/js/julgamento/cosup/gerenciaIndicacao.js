let semanaAzulTOCSRF = [
  '2ª TURMA-CSRF-CARF-MF-DF',
  '1ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  //'2ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '1ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '2ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '1ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '2ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '4ª TE-2ªSEÇÃO-2004-CARF-MF-DF',
  '5ª TE-2ªSEÇÃO-2005-CARF-MF-DF',
];
let semanaAzulTE = [
  '1ª TE-2ªSEÇÃO-2001-CARF-MF-DF',
  '2ª TE-2ªSEÇÃO-2002-CARF-MF-DF',
  '3ª TE-2ªSEÇÃO-2003-CARF-MF-DF',
];
let semanaVerdeTOCSRF = [
  '1ª TURMA-CSRF-CARF-MF-DF',
  '1ª TO-2ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª TO-2ªCAMARA-2ªSEÇÃO-CARF-MF-DF',
  '1ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  //'2ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '1ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '4ª TE-1ªSEÇÃO-1004-CARF-MF-DF',
  '5ª TE-1ªSEÇÃO-1005-CARF-MF-DF',
];
let semanaVerdeTE = [
  '1ª TE-1ªSEÇÃO-1001-CARF-MF-DF',
  '2ª TE-1ªSEÇÃO-1002-CARF-MF-DF',
  '3ª TE-1ªSEÇÃO-1003-CARF-MF-DF',
];
let semanaAmarelaTOCSRF = [
  '3ª TURMA-CSRF-CARF-MF-DF',
  '1ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  //'2ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '1ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '2ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '1ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '2ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '4ª TE-3ªSEÇÃO-3004-CARF-MF-DF',
  '5ª TE-3ªSEÇÃO-3005-CARF-MF-DF',
];
let semanaAmarelaTE = [
  '1ª TE-3ªSEÇÃO-3001-CARF-MF-DF',
  '2ª TE-3ªSEÇÃO-3002-CARF-MF-DF',
  '3ª TE-3ªSEÇÃO-3003-CARF-MF-DF',
];
let dados = JSON.parse($('#periodo').attr('data-periodo'));
let periodo = dados[0];
let users = JSON.parse($('#periodo').attr('data-cons'));
let indicacoes = JSON.parse($('#periodo').attr('data-indicacoes'));
let pautas = JSON.parse($('#periodo').attr('data-pautas'));
inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initModal();
    montaCard();
    montaTabela();
    initSelect();
    initDatePicker();
  });
}

function montaCard() {
  $('#cardInfo').append(`
    <div class="col s12 m12">
      <div class="card white darken-1">
        <div class="card-content black-text">
          <span class="card-title">Semana ${periodo.semana}</span>
          <p>Mês da Indicação: ${periodo.mes}/${periodo.ano}</p>
          <p>Período da Indicação: ${periodo.abreIndicacao} a ${periodo.fechaIndicacao}</p>
        </div>
      </div>
    </div>

  `);
}

function montaTabela() {
  let dadosTabela = [];
  if (periodo.semana == 'Amarela') {
    if (periodo.tipoColegiado == 'TOCSRF') {
      semanaAmarelaTOCSRF.forEach((colegiado) => {
        dadosTabela.push({ colegiado: colegiado, id: periodo._id });
      });
      tabelaColegiados(dadosTabela);
    }
    if (periodo.tipoColegiado == 'TE') {
      semanaAmarelaTE.forEach((colegiado) => {
        dadosTabela.push({ colegiado: colegiado, id: periodo._id });
      });
      tabelaColegiados(dadosTabela);
    }
  }
  if (periodo.semana == 'Azul') {
    if (periodo.tipoColegiado == 'TOCSRF') {
      semanaAzulTOCSRF.forEach((colegiado) => {
        dadosTabela.push({ colegiado: colegiado, id: periodo._id });
      });
      tabelaColegiados(dadosTabela);
    }
    if (periodo.tipoColegiado == 'TE') {
      semanaAzulTE.forEach((colegiado) => {
        dadosTabela.push({ colegiado: colegiado, id: periodo._id });
      });
      tabelaColegiados(dadosTabela);
    }
  }
  if (periodo.semana == 'Verde') {
    if (periodo.tipoColegiado == 'TOCSRF') {
      semanaVerdeTOCSRF.forEach((colegiado) => {
        dadosTabela.push({ colegiado: colegiado, id: periodo._id });
      });
      tabelaColegiados(dadosTabela);
    }
    if (periodo.tipoColegiado == 'TE') {
      semanaVerdeTE.forEach((colegiado) => {
        dadosTabela.push({ colegiado: colegiado, id: periodo._id });
      });
      tabelaColegiados(dadosTabela);
    }
  }
}

function tabelaColegiados(dados) {
  dados.forEach((d) => {
    d.qtdeIndicacoes = 0;

    pautas.forEach((p) => {
      if (d.colegiado == p.colegiado) {
        d.statusSEPAJ = p.statusSEPAJ;
        d.tipoPauta = p.tipoPauta;
      }
    });
    indicacoes.forEach((ind) => {
      if (d.colegiado == ind.colegiado) {
        d.qtdeIndicacoes += 1;
      }
    });
  });
  table = new Tabulator('#tabelaColegiados', {
    data: dados,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitDataStretch',
    movableRows: false,
    responsiveLayout: 'collapse',
    initialSort: [],
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        title: 'Colegiado',
        field: 'colegiado',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Status',
        field: 'statusSEPAJ',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        formatter: fStatusSEPAJ,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Tipo Pauta',
        field: 'tipoPauta',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        formatter: fTipoPauta,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Quantidade de Indicações',
        field: 'qtdeIndicacoes',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        //headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Gerenciar',
        formatter: formatGerencia,
        hozAlign: 'left',
        download: false,
      },
    ],
  });
}

let fStatusSEPAJ = function fStatusSEPAJ(cell) {
  if (cell.getValue() == null || cell.getValue() == 'undefined') {
    if (
      moment(moment()).isBetween(
        moment(periodo.abreIndicacao, 'DD/MM/YYYY'),
        moment(periodo.fechaIndicacao, 'DD/MM/YYYY'),
        'day',
        [],
      )
    ) {
      return 'Aguardando Indicações';
    } else return 'Aguardando Consolidação';
  } else return cell.getValue();
};

let fTipoPauta = function fTipoPauta(cell) {
  if (cell.getValue() == null || cell.getValue() == 'undefined') {
    if (
      moment(moment()).isBetween(
        moment(periodo.abreIndicacao, 'DD/MM/YYYY'),
        moment(periodo.fechaIndicacao, 'DD/MM/YYYY'),
        'day',
        [],
      )
    ) {
      return 'Aguardando Indicações';
    } else return 'Pauta ainda não consolidada';
  } else return cell.getValue();
};

let formatGerencia = function formatGerencia(cell) {
  if (cell.getRow().getData().tipoPauta == 'Consolidada') {
    return `<a class='black-text btnVisualiza' href='/suporte/restrito/visualiza-pauta/${
      cell.getRow().getData().id
    }&${cell.getRow().getData().colegiado}&${
      cell.getRow().getData().tipoPauta
    }'title='Visualizar Pauta'><i class='material-icons'>find_in_page</i></a>
    &nbsp;
  <a class='black-text btnedita' href='/suporte/restrito/gerencia-colegiado/${
    cell.getRow().getData().id
  }&${
      cell.getRow().getData().colegiado
    }' title='Gerenciar Colegiado'><i class='material-icons'>settings</i></a>
  `;
  } else {
    return `
  <a class='black-text btnedita' href='/suporte/restrito/gerencia-colegiado/${
    cell.getRow().getData().id
  }&${
      cell.getRow().getData().colegiado
    }' title='Gerenciar Colegiado'><i class='material-icons'>settings</i></a>
  `;
  }
};

function initModal() {
  $('.modal').modal();
}

function initSelect() {
  $('select').formSelect();
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
