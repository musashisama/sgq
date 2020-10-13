inicializaComponentes();
let langs = {
  'pt-br': {
    columns: {
      nome: 'Nome', //replace the title of column name with the value "Name"
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
      default: 'Filtrar por esta coluna', //default header filter placeholder text
      columns: {
        nome: 'Filtrar por nome', //replace default header filter text for column name
      },
    },
  },
};

let responsiveLayout = true;
let tableOcorrencias;

function inicializaComponentes() {
  $(document).ready(function () {
    tabelaOcorrencias();
  });
}
function tabelaOcorrencias() {
  let tabledata = JSON.parse($('#tabelaOcorrencias').attr('data-ocorrencias'));
  tableOcorrencias = new Tabulator('#tabelaOcorrencias', {
    data: tabledata,
    autoColumns: false,
    locale: true,
    langs: langs,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitColumns',
    initialSort: [{ column: 'dtOcorrencia', dir: 'desc' }],
    resizableRows: true,
    responsiveLayout: 'collapse',
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        title: 'Ocorrência',
        field: 'tipoOcorrencia',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
      },
      {
        title: 'Detalhes da Ocorrência',
        field: 'ocorDet',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Data da Ocorrência',
        field: 'dtOcorrencia',
        sorter: 'date',
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
    ],
  });
}
