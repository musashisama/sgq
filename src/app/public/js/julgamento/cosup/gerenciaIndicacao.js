let semanaAzulTOCSRF = [
  '2ª TURMA-CSRF-CARF-MF-DF',
  '1ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '2ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '1ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '2ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '1ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '2ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
];
let semanaAzulTE = [
  '1ª TE-2ªSEÇÃO-2001-CARF-MF-DF',
  '2ª TE-2ªSEÇÃO-2002-CARF-MF-DF',
  '3ª TE-2ªSEÇÃO-2003-CARF-MF-DF',
];
let semanaVerdeTOCSRF = [
  '1ª TURMA-CSRF-CARF-MF-DF',
  '1ª TO-2ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '1ª TO-2ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª TO-2ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª TO-2ªCAMARA-2ªSEÇÃO-CARF-MF-DF',
  '1ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '1ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
];
let semanaVerdeTE = [
  '1ª TE-1ªSEÇÃO-1001-CARF-MF-DF',
  '2ª TE-1ªSEÇÃO-1002-CARF-MF-DF',
  '3ª TE-1ªSEÇÃO-1003-CARF-MF-DF',
];
let semanaAmarelaTOCSRF = [
  '3ª TURMA-CSRF-CARF-MF-DF',
  '1ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '2ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '1ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '2ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '1ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '2ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
];
let semanaAmarelaTE = [
  '1ª TE-3ªSEÇÃO-3001-CARF-MF-DF',
  '2ª TE-3ªSEÇÃO-3002-CARF-MF-DF',
  '3ª TE-3ªSEÇÃO-3003-CARF-MF-DF',
];
let dados = JSON.parse($('#periodo').attr('data-periodo'));
let users = JSON.parse($('#periodo').attr('data-cons'));
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
  let periodo = dados[0];
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
  let periodo = dados[0];
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
        title: 'Gerenciar',
        formatter: formatGerencia,
        hozAlign: 'center',
        download: false,
      },
    ],
  });
}

let formatGerencia = function formatGerencia(cell) {
  return `
  <a class='black-text btnedita' href='/suporte/restrito/gerencia-colegiado/${
    cell.getRow().getData().id
  }&${
    cell.getRow().getData().colegiado
  }' title='Gerenciar Colegiado'><i class='material-icons'>settings</i></a>
  `;
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
