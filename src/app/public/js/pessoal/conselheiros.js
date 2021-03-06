inicializaComponentes();
let table = '';
let autoColumns = false;
let locale = true;
let pagination = 'local';
let height = '1000px';
let minHeight = '300px';
let maxHeight = '1000px';
let layout = 'fitDataFill';
let responsiveLayout = true;
let initialSort = [{ column: 'nome', dir: 'asc' }];
let agrupado = false;

let langs = {
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
      default: 'Filtrar por esta coluna', //default header filter placeholder text
      columns: {
        nome: 'Filtrar por nome', //replace default header filter text for column name
      },
    },
  },
};
function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    dataTable();
  });
}

function initSelect() {
  $('select').formSelect();
}

function dataTable() {
  tabledataCons = JSON.parse($('form').attr('data-conselheiros'));
  //define table
  table = new Tabulator('#tabelaCons', {
    data: tabledataCons,
    autoColumns: autoColumns,
    locale: locale,
    langs: langs,
    pagination: pagination,
    height: height,
    minHeight: minHeight,
    layout: layout,
    initialSort: initialSort,
    responsiveLayout: responsiveLayout,
    columns: [
      { formatter: formatNome, width: 40, hozAlign: 'center', responsive: 0 },
      {
        title: 'Nome',
        field: 'nome',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
        download: true,
      },
      {
        title: 'CPF',
        field: 'cpf',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 2,
        download: true,
        visible: false,
      },
      {
        title: 'e-mail',
        field: 'email',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 1,
        download: true,
        visible: false,
      },
      {
        title: 'Turma',
        field: 'unidade',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'Fim Mandato',
        field: 'dtFimMandato',
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Mandato Ativo?',
        field: 'mandatoAt',
        width: 90,
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Função',
        field: 'funcao',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Representação',
        field: 'origem',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
    ],
  });
}

document.getElementById('mostraColunas').addEventListener('click', function () {
  if (agrupado == false) {
    table.setGroupBy(['setor', 'camara', 'turma']);
    agrupado = true;
  } else {
    table.setGroupBy();
    agrupado = false;
  }
});

let formatNome = function formatNome(cell) {
  return `<a class='black-text' href='/pessoal/restrito/conselheiros/${
    cell.getRow().getData().cpf
  }' title='Detalhar cadastro do Conselheiro'><i class='material-icons'>folder_shared</i></a>`;
};
