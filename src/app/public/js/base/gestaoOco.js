inicializaComponentes();
var table = "";
var autoColumns = false;
var locale = true;
pagination = "local";
height = '1000px';
minHeight = '300px';
maxHeight = '1000px';
layout = "fitColumns";
responsiveLayout = true;

function inicializaComponentes() {
  $(document).ready(function () {
    btnInsere();
    initModal();
    dataTable()
  });
}

function btnInsere() {
  $('.addListaOco').click(function (event) {
    $('.addListaOco').addClass('modal-trigger');
    montaModalInsere()
  });
}

function montaModalInsere() {
  $('.hModal').text('');
  $('.pModal').text('');
  $('.hModal').text("Adicionar Tipo de Ocorrência");
  $('.pModal').append(
    `<form id="formOco" name="formOco" action="/admin/ocorrencias/cadastra" method="post">
    <div class="row">      
      <div class="row">
        <div class="input-field tipoOcorrencia col s12">
          <label for="tipoOcorrencia">Qual é o tipo de ocorrência que deseja cadastrar?</label>
          <textarea required type="text" id="tipoOcorrencia" name="tipoOcorrencia" class="form-control materialize-textarea tipoOcorrencia alturaTextArea"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="input-field descDet col s12">
          <label for="descDet">Descrição detalhada do tipo de ocorrência:</label>
          <textarea required type="text" id="descDet" name="descDet" class="form-control materialize-textarea descDet alturaTextArea"></textarea>
        </div>       
      </div>
    </div>
  </form>
          </p>`
  );
  $('.concorda').click(function () {
    dados = { tipoOcorrencia: $('#tipoOcorrencia').val(), descDet: $('#descDet').val() }
    $('.hModal').text('');
    $('.pModal').text('');
    handleOcorrencias(dados, 'POST');
  });
  $('.cancela').click(function () {
    $('.hModal').text('');
    $('.pModal').text('');
  })
}

function initModal() {
  $('.modal').modal();
}

function dataTable() {
  tabledata = JSON.parse($('form').attr('data-ocorrencias'));
  table = new Tabulator("#tabelaOcorrencias", {
    data: tabledata,
    pagination: "local",
    height: "1000px",
    minHeight: '300px',
    maxHeight: '1000px',
    layout: layout,
    resizableRows: true,
    responsiveLayout: 'collapse',
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [{ column: "tipoOcorrencia", dir: "asc" }],
    columns: [
      { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false },
      { title: "Tipo de Ocorrência", field: "tipoOcorrencia", sorter: "string", hozAlign: "left", headerFilter: "input", formatter: "textarea", editor: false, responsive: 0, },
      { title: "Descrição Detalhada", field: "descDet", sorter: "string", hozAlign: "left", headerFilter: "input", formatter: "textarea", editor: false, responsive: 0 },
      { formatter: formatEdita, cellClick: clicaEdita, width: 40, hozAlign: "center" },
      { formatter: formatDeleta, cellClick: clicaDeleta, width: 40, hozAlign: "center" },


    ],
    autoColumns: false,
    locale: true,
    langs: {
      "pt-br": {
        "columns": {
          "name": "Nome", //replace the title of column name with the value "Name"
        },
        "ajax": {
          "loading": "Carregando", //ajax loader text
          "error": "Erro", //ajax error text
        },
        "groups": { //copy for the auto generated item count in group header
          "item": "item", //the singular  for item
          "items": "itens", //the plural for items
        },
        "pagination": {
          "page_size": "Quantidade de registros", //label for the page size select element
          "first": "Primeira", //text for the first page button
          "first_title": "Primeira Página", //tooltip text for the first page button
          "last": "Última",
          "last_title": "Última Página",
          "prev": "Anterior",
          "prev_title": "Página Anterior",
          "next": "Próxima",
          "next_title": "Próxima Página",
        },
        "headerFilters": {
          "default": "filtrar coluna...", //default header filter placeholder text
          "columns": {
            "tipoOcorrencia": "Filtrar por Tipo",
          }
        }
      }
    },
  });
}

let formatEdita = function formatNome(cell) {
  return `<a class='editaTipoOco' title='Editar' href='#modal1'><i class='material-icons orange-text'>edit</i></a>`
}
let formatDeleta = function formatNome(cell) {
  return `<a class='deletaTipoOco' title='Excluir' href='#modal1'><i class='material-icons red-text'>cancel</i></a>`
}
function clicaEdita(e, cell) {
  $('.editaTipoOco').addClass('modal-trigger');
  montaModalEdita(e, cell);
}
function montaModalEdita(e, cell) {
  $('.hModal').text('');
  $('.pModal').text('');
  $('.hModal').text("Edição de Tipo de Ocorrência");
  $('.pModal').append(
    `<form id="formOco" name="formOco" action="/admin/ocorrencias/cadastra" method="post">
    <div class="row">      
      <div class="row">
        <div class="input-field tipoOcorrencia col s12">
          <label for="tipoOcorrencia">Qual é o tipo de ocorrência que deseja cadastrar?</label>
          <textarea required type="text" id="tipoOcorrencia" name="tipoOcorrencia" class="form-control materialize-textarea tipoOcorrencia alturaTextArea">${cell.getRow().getData().tipoOcorrencia}</textarea>
        </div>
      </div>
      <div class="row">
        <div class="input-field descDet col s12">
          <label for="descDet">Descrição detalhada do tipo de ocorrência:</label>
          <textarea required type="text" id="descDet" name="descDet" class="form-control materialize-textarea descDet alturaTextArea">${cell.getRow().getData().descDet}</textarea>
        </div>       
      </div>
    </div>
  </form>
          </p>`
  );
  $('.concorda').click(function () {
    dados = { id: cell.getRow().getData()._id, tipoOcorrencia: $('#tipoOcorrencia').val(), descDet: $('#descDet').val() }
    $('.hModal').text('');
    $('.pModal').text('');
    handleOcorrencias(dados, 'POST');
  });
  $('.cancela').click(function () {
    $('.hModal').text('');
    $('.pModal').text('');
  })
}

function clicaDeleta(e, cell) {
  $('.deletaTipoOco').addClass('modal-trigger');
  montaModalDeleta(e, cell);
}

function montaModalDeleta(e, cell) {
  $('.hModal').text('');
  $('.pModal').text('');
  $('.hModal').text("Confirmação de Exclusão de Tipo de Ocorrência");
  $('.pModal').append(
    `<p class="pModal">
          <br/>
          Tem certeza que quer excluir o registro?
          </p>`
  );
  $('.concorda').click(function () {
    handleOcorrencias({ id: cell.getRow().getData()._id }, 'DELETE');
    $('.hModal').text('');
    $('.pModal').text('');
    table.deleteRow(cell.getRow());
  });
  $('.cancela').click(function () {
    $('.hModal').text('');
    $('.pModal').text('');
  })
}


function handleOcorrencias(dados, metodo) {
  $.ajax({
    url: `/admin/ocorrencias/${dados.id ? dados.id : 1}`,
    data: dados,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      location.reload();
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });

    }
  })
}
