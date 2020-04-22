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
    initSelect();
    btnInsere();
    initModal();
    dataTable()
  });
}

function initSelect() {
  $('select').formSelect();
}

function btnInsere() {
  $('.addListaNC').click(function (event) {

  });
}

function initModal() {
  $('.modal').modal();
}

function dataTable() {
  tabledata = JSON.parse($('form').attr('data-nc'));
  table = new Tabulator("#tabelaNC", {
    data: tabledata,
    pagination: "local",
    height: "1000px",
    minHeight: '300px',
    maxHeight: '1000px',
    layout: layout,
    resizableRows: true,
    responsiveLayout: 'collapse',
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [{ column: "Macroprocesso", dir: "asc" }],
    columns: [
      { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false },
      { title: "Macroprocesso", width: 200, field: "Macroprocesso", sorter: "string", hozAlign: "left", headerFilter: "input", formatter: "textarea", editor: false, responsive: 0, },
      { title: "Não Conformidade", field: "nconformidade", sorter: "string", hozAlign: "left", headerFilter: "input", formatter: "textarea", editor: false, responsive: 0, },
      { title: "Ação Imediata", field: "descDet", sorter: "string", hozAlign: "left", headerFilter: "input", formatter: "textarea", editor: false, responsive: 0 },
      { formatter: formatEdita,  width: 40, hozAlign: "center" },
      { formatter: formatDeleta, cellClick:clicaDeleta, width: 40, hozAlign: "center" },


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
            "Macroprocesso": "Filtrar por Macroprocesso",
            "nconformidade": "Filtrar por NC", //replace default header filter text for column name
          }
        }
      }
    },
  });
}

let formatEdita = function formatNome(cell) {
  return `<a title='Editar' href='/qualidade/restrito/cadastra-nc/${cell.getRow().getData()._id}'><i class='material-icons orange-text'>edit</i></a>`
}

let formatDeleta = function formatNome(cell) {
  
  return `<a class='deletaNC deletaTipoNC' title='Excluir' href='#modal1'><i class='material-icons red-text'>cancel</i></a>`
}

function clicaDeleta(e, cell) {    
  $('.deletaTipoNC').addClass('modal-trigger');
  montaModalDeleta(e,cell);
}

function montaModalDeleta(e,cell){
  $('.hModal').text("Confirmação de Exclusão de Tipo de Não Conformidade");    
  $('.pModal').append(
      `<p class="pModal">
          <br/>
          Tem certeza que quer excluir o registro?
          </p>`
  );
  $('.concorda').click(function () {     
      deleta(e, cell)
  });
  $('.cancela').click(function () {
      $('.hModal2').text('');   
      $('.pModal2').text('');        
  })
}

function deleta(e, cell){  
  $.ajax({
    url: `/qualidade/restrito/exclui-nc/${cell.getRow().getData()._id}`,
    type: 'DELETE',
    success: function (result) {
      var toastHTML = `<span>Registro removido com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      table.deleteRow(cell.getRow());
    }
  })
}
