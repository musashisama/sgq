inicializaComponentes();
layout = 'fitDataFill';
responsiveLayout = true;
let table = '';
let tabledata = '';
let agrupado = false;

function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    dataTable();
    initModal();
  });
}

function initSelect() {
  $('select').formSelect();
}

function initModal() {
  $('.modal').modal();
}

function dataTable(msg) {
  let tabledata = JSON.parse($('#dataUsers').attr('data-users'));
  table = new Tabulator('#tabelaUsuarios', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: layout,
    responsiveLayout: 'collapse',
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [{ column: 'nome', dir: 'asc' }],
    columns: [
      {
        formatter: 'responsiveCollapse',
        width: 30,
        minWidth: 30,
        hozAlign: 'left',
        resizable: false,
        headerSort: false,
      },
      {
        title: 'Nome',
        field: 'nome',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        bottomCalc: 'count',
        responsive: 0,
      },
      {
        title: 'CPF',
        field: 'cpf',
        sorter: 'string',
        hozAlign: 'center',
        width: 150,
        editor: false,
        headerFilter: 'input',
        responsive: 2,
      },
      {
        title: 'Setor',
        field: 'setor',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
      },
      {
        title: 'Cargo',
        field: 'cargo',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 2,
      },
      {
        title: 'Função',
        field: 'funcao',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
      },
      {
        formatter: formatDeleta,
        cellClick: clickDeleta,
        width: 40,
        hozAlign: 'center',
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
            nome: 'Filtrar por Nome',
            CPF: 'Filtrar por CPF', //replace default header filter text for column name
          },
        },
      },
    },
  });
}

let formatDeleta = function formatNome(cell) {
  return `<a class='btn-perfil-deleta' title='Excluir' href='#modal1'><i class='material-icons red-text'>cancel</i></a>`;
};

function clickDeleta(e, cell) {
  e.preventDefault();
  $('.btn-perfil-deleta').addClass('modal-trigger');
  montaModal(e, cell);
  initSelect();
}

function montaModal(e, cell) {
  $('.hModal').text(`Exclusão de usuário`);
  $('.pModal').append(
    `<p class="pModal">
    <h6>Confirma exclusão do seguinte usuário?</h6>
            <br/>
            <strong>Usuário:</strong> ${cell.getRow().getData().nome}<br/>
            <strong>CPF:</strong> ${
              cell.getRow().getData().cpf
            }<br/>                      
           </p>`,
  );

  $('.concorda').click(function () {
    edita(e, cell);
  });
  $('.cancela').click(function () {
    $('.hModal').text('');
    $('.pModal').text('');
  });
}

function edita(e, cell) {
  let cpf = cell.getRow().getData().cpf;
  $.ajax({
    type: 'DELETE',
    url: `/admin/usuario/exclui`,
    data: { cpf: cpf },
    done: function (result) {
      console.log(result);
      var toastHTML = `<span>Usuário excluído com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      location.reload(true);
    },
    error: function (result) {
      console.log(`Erro: ${result}`);
    },
  });
  location.reload(true);
}

document.getElementById('mostraColunas').addEventListener('click', function () {
  if (agrupado == false) {
    table.setGroupBy(['funcao', 'cargo']);
    agrupado = true;
  } else {
    table.setGroupBy();
    agrupado = false;
  }
});
