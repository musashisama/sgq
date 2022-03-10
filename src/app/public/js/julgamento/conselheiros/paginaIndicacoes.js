let periodos = JSON.parse($('#tabelaIndicacoes').attr('data-periodos'));
let indicacoes = JSON.parse($('#tabelaIndicacoes').attr('data-indicacoes'));
console.log(periodos);
console.log(indicacoes);
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

function btnCriaIndicacao() {
  $('.btn-cria').click((e) => {
    $('#aModal').addClass('modal-trigger');
    montaModal();
  });
}

function verificaAbertura() {
  periodos.forEach((periodo) => {
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
  tabledata = periodos;
  table = new Tabulator('#tabelaIndicacoes', {
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
        title: 'Mes',
        field: 'mes',
        //formatter: coloreProc,
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
        visible: false,
      },
      {
        title: 'Ano',
        field: 'ano',
        //formatter: coloreProc,
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'left',
        width: 150,
        editor: false,
        responsive: 0,
        download: true,
        visible: false,
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
        field: 'status',
        formatter: corStatus,
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Gerenciar',
        //field: 'anoIndicacao',
        formatter: linksIndica,
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

let corStatus = function corStatus(cell) {
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

let linksIndica = function linksIndica(cell) {
  if (cell.getRow().getData().status == 'Pauta Aberta para Indicações') {
    return `
    <a class='black-text btnVisualiza' href='/julgamento/conselheiros/visualiza-pauta/${
      cell.getRow().getData()._id
    }'title='Indicar Processos para Pauta'><i class='material-icons'>find_in_page</i></a>
    &nbsp;
  <a class='black-text btnedita' href='/julgamento/conselheiros/indicacao-pauta/${
    cell.getRow().getData()._id
  }'title='Indicar Processos para Pauta'><i class='material-icons'>add_circle</i></a>
  `;
  } else if (
    cell.getRow().getData().status ==
    'Pauta Aguardando Abertura para Indicações'
  ) {
    return `<i class='material-icons'/>not_interested</i>`;
  } else {
    return `
  <a class='black-text btnVisualiza' href='/julgamento/conselheiros/visualiza-pauta/${
    cell.getRow().getData()._id
  }'title='Indicar Processos para Pauta'><i class='material-icons'>find_in_page</i></a>
  `;
  }
};
