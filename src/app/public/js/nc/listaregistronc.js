inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    dataTable();
    $('#mostraColunas').toggle();
  });
}
let formatterParams = {
  outputFormat: 'DD/MM/YYYY',
};

let sorterParams = {
  format: 'DD/MM/YYYY',
  alignEmptyValues: 'bottom',
  invalidPlaceholder: 'Data Inválida',
};
let table = null;
let tabledata = null;
layout = 'fitDataFill';
let colunas = [];
//responsiveLayout = "collapse";

function dataTable() {
  tabledata = JSON.parse($('form').attr('data-nc'));
  table = new Tabulator('#tabelaNC', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: layout,
    resizableRows: true,
    responsiveLayout: 'collapse',
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [{ column: 'horaCriacao', dir: 'desc' }],
    columns: [
      {
        formatter: 'responsiveCollapse',
        width: 30,
        minWidth: 30,
        hozAlign: 'left',
        resizable: false,
        headerSort: false,
        download: true,
      },
      {
        title: 'CPF Usuário',
        field: 'cpfUser',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        formatter: 'textarea',
        editor: false,
        responsive: 0,
        download: true,
        visible: false,
      },
      {
        title: 'Macroprocesso Usuário',
        field: 'mProcUser',
        width: 200,
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        topCalc: 'count',
        formatter: 'textarea',
        responsive: 0,
        editor: false,
        download: true,
      },
      {
        title: 'Macroprocesso Origem',
        width: 200,
        field: 'mProcOrigem',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        formatter: 'textarea',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Não Conformidade',
        width: 300,
        field: 'descNC',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        topCalc: 'count',
        formatter: 'textarea',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Ação Imediata',
        width: 140,
        field: 'acaoImediata',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        formatter: 'textarea',
        editor: false,
        responsive: 1,
        download: true,
      },
      {
        title: 'Data Encaminhamento',
        field: 'EncCorNC',
        sorter: 'date',
        sorterParams: sorterParams,
        hozAlign: 'left',
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Data NC',
        field: 'dataNC',
        sorter: 'date',
        sorterParams: sorterParams,
        hozAlign: 'left',
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Equipe',
        field: 'equipeNC',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        formatter: 'textarea',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Data do Registro da NC',
        field: 'horaCriacao',
        sorter: 'date',
        sorterParams: sorterParams,
        hozAlign: 'left',
        headerFilter: 'input',
        editor: false,
        responsive: 1,
        download: true,
      },
      {
        title: 'Documento de Ref.',
        width: 180,
        field: 'docRef',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        formatter: 'textarea',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Observações',
        field: 'obsParticipante',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        formatter: 'textarea',
        editor: false,
        responsive: 2,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: {
      'pt-br': {
        columns: {
          name: 'Nome', //replace the title of column name with the value "Name"
        },
        ajax: {
          loading: 'Carregando', //ajax loader text
          error: 'Erro', //ajax error text
        },
        groups: {
          //copy for the auto generated item count in group header
          item: 'item', //the singular  for item
          items: 'itens', //the plural for items
        },
        pagination: {
          page_size: 'Quantidade de registros', //label for the page size select element
          first: 'Primeira', //text for the first page button
          first_title: 'Primeira Página', //tooltip text for the first page button
          last: 'Última',
          last_title: 'Última Página',
          prev: 'Anterior',
          prev_title: 'Página Anterior',
          next: 'Próxima',
          next_title: 'Próxima Página',
        },
        headerFilters: {
          default: 'filtrar coluna...', //default header filter placeholder text
          columns: {
            Macroprocesso: 'Filtrar por Macroprocesso',
            nconformidade: 'Filtrar por NC', //replace default header filter text for column name
          },
        },
      },
    },
  });
}
