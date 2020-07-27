inicializaComponentes();
var table = '';
var autoColumns = false;
var locale = true;
pagination = 'local';
height = '1000px';
minHeight = '300px';
maxHeight = '1000px';
layout = 'fitColumns';
responsiveLayout = true;

function inicializaComponentes() {
  $(document).ready(function () {
    initModal();
    formataDados();
  });
}

function formataDados() {
  let reinp = JSON.parse($('#reinp').attr('data-reinp'));
  let reinpForm = [{}];
  reinp.forEach((elem) => {
    reinpForm.push({
      cpf: elem.conselheiro.cpf,
      nome: elem.conselheiro.nome,
      id: elem._id,
    });
  });

  dataTable(reinpForm);
}

function initModal() {
  $('.modal').modal();
}

function dataTable(reinp) {
  tabledata = reinp;
  table = new Tabulator('#tabelaReinp', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: layout,
    resizableRows: true,

    responsiveLayout: 'collapse',
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [{ column: 'cpf', dir: 'asc' }],
    columns: [
      {
        title: 'Nome',
        field: 'nome',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        formatter: 'textarea',
        editor: false,
        responsive: 0,
      },
      {
        title: 'CPF',
        field: 'cpf',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        formatter: 'textarea',
        editor: 'input',
        cellEdited: edita,
        responsive: 0,
        editorParams: {
          search: false,
          elementAttributes: {
            maxlength: '11', //set the maximum character length of the input element to 10 characters
          },
        },
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
            tipoOcorrencia: 'Filtrar por Tipo',
          },
        },
      },
    },
  });
}

let edita = function handleReinp(cell) {
  let dados = {
    id: cell.getRow().getData().id,
    cpf: cell.getRow().getData().cpf,
    nome: cell.getRow().getData().nome,
  };
  console.log(dados);
  $.ajax({
    url: `/julgamento/restrito/corrigereinp/envia`,
    data: dados,
    type: 'POST',
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      //   location.reload();
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    },
  });
};
