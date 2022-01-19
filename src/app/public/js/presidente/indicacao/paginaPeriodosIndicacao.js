let periodosIndicacao = JSON.parse($('#tabelaPautas').attr('data-periodos'));
let pautas = JSON.parse($('#tabelaPautas').attr('data-pautas'));
pautas.forEach((pauta) => {
  periodosIndicacao.forEach((periodo) => {
    if (pauta.idIndicacao == periodo._id) {
      pauta.abreIndicacao = periodo.abreIndicacao;
      pauta.fechaIndicacao = periodo.fechaIndicacao;
      pauta.mesIndicacao = periodo.mesIndicacao;
    }
  });
});
console.log(periodosIndicacao);
console.log(pautas);
inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    verificaAbertura();
    tabelaIndicacoes();
  });
}

function initModal() {
  $('.modal').modal();
}

function initSelect() {
  $('select').formSelect();
}

function periodosbtnCriaIndicacao() {
  $('.btn-cria').click((e) => {
    $('#aModal').addClass('modal-trigger');
    montaModal();
  });
}

function verificaAbertura() {
  periodosIndicacao.forEach((periodo) => {
    if (
      moment(moment()).isBetween(
        moment(periodo.abreIndicacao, 'DD/MM/YYYY'),
        moment(periodo.fechaIndicacao, 'DD/MM/YYYY'),
        'day',
        [],
      )
    ) {
      periodo.status = 'Pauta Aberta para Indicações';
    } else {
      if (
        moment(moment()).isBefore(moment(periodo.abreIndicacao, 'DD/MM/YYYY'))
      ) {
        periodo.status = 'Pauta Aguardando Abertura para Indicações';
      } else {
        periodo.status = 'Pauta Fechada para Indicações';
      }
    }
  });
}

function tabelaIndicacoes() {
  tabledata = pautas;
  table = new Tabulator('#tabelaPautas', {
    data: tabledata,
    //pagination: 'local',
    downloadConfig: {
      //  columnHeaders:false, //do not include column headers in downloaded table
      //columnGroups:false, //do not include column groups in column headers for downloaded table
      //rowGroups:false, //do not include row groups in downloaded table
      columnCalcs: false, //do not include column calcs in downloaded table
      //dataTree:false, //do not include data tree in downloaded table
    },
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitDataFill',
    //responsiveLayout: 'collapse',
    initialSort: [{ column: 'mesIndicacao', dir: 'desc' }],
    groupStartOpen: false,
    //responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        title: 'Mes da Indicação',
        field: 'mesIndicacao',
        //formatter: coloreProc,
        sorter: 'date',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        sorterParams: { format: 'MM/YYYY' },
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Início Indicação',
        field: 'abreIndicacao',
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        sorterParams: { format: 'DD/MM/YYYY' },
      },
      {
        title: 'Fim Indicação',
        field: 'fechaIndicacao',
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        sorterParams: { format: 'DD/MM/YYYY' },
      },
      {
        title: 'Status da Indicação',
        field: 'statusSEPAJ',
        formatter: corStatusIndicacao,
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Gerenciar',
        //field: 'periodosanoIndicacao',
        formatter: linksIndicacao,
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'left',
        //width: 150,
        editor: false,
        responsive: 0,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

let corStatusIndicacao = function corStatusIndicacao(cell) {
  if (cell.getValue() == 'Pauta Aberta para Indicações') {
    cell.getElement().style.color = 'rgb(63, 138, 2)';
    cell.getElement().style.fontWeight = 'bolder';
  } else if (cell.getValue() == 'Pauta Aguardando Abertura para Indicações') {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  } else {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }

  return cell.getValue();
};

let linksIndicacao = function linksIndicacao(cell) {
  if (cell.getRow().getData().statusSEPAJ == 'Aguardando Ordenação') {
    return `
    <a class='black-text btnVisualiza' href='/presidente/restrito/visualiza_pauta/${
      cell.getRow().getData().idIndicacao
    }'title='Visualizar Pauta'><i class='material-icons'>find_in_page</i></a>
    &nbsp;
  <a class='black-text btnedita' href='/presidente/restrito/ordena_pauta/${
    cell.getRow().getData().idIndicacao
  }'title='Ordenar Pauta'><i class='material-icons'>add_circle</i></a>
  `;
  } else {
    return `
  <a class='black-text btnVisualiza' href='/presidente/restrito/visualiza_pauta/${
    cell.getRow().getData().idIndicacao
  }'title='Visualizar Pauta'><i class='material-icons'>find_in_page</i></a>
  `;
  }
};
