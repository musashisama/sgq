inicializaComponentes();
let table = "";
let autoColumns = false;
let locale = true;
let pagination = "local";
let height = '1000px';
let minHeight = '300px';
let maxHeight = '1000px';
let layout = "fitDataFill";
let responsiveLayout = 'collapse';
let initialSort = [{ column: "nome", dir: "asc" }];
let agrupado = false;

var langs = {

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
            "default": "Filtrar por esta coluna", //default header filter placeholder text
            "columns": {
                "nome": "Filtrar por nome", //replace default header filter text for column name
            }
        }
    }

};
function inicializaComponentes() {
    $(document).ready(function () {
        initSelect();
        dataTable();
        initTabs();
    });
}

function initTabs() {
    $('.tabs').tabs();
}

function initSelect() {
    $('select').formSelect();
}

function dataTable() { 
    
    let tabledata = JSON.parse($('#formAgenda').attr('data-agenda'));
    table = new Tabulator("#tabelaAgenda", {
        data: tabledata,
        autoColumns: autoColumns,
        locale: locale,
        langs: langs,
        pagination: pagination,
        height: height,
        minHeight: minHeight,
        maxHeight: maxHeight,
        layout: layout,
        initialSort: initialSort,
        responsiveLayout:responsiveLayout,
        responsiveLayoutCollapseStartOpen: false,     
        columns: [
            { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false },            
            { title: "Nome", field: "nome", sorter: "string", hozAlign: "left", editor: false, headerFilter:"input",bottomCalc: "count", responsive:0 },
            { title: "Telefone/Ramal", field: "telefone", sorter: "string", hozAlign: "left", editor: false, responsive:2 },   
            { title: "Setor", field: "unidade", sorter: "string", hozAlign: "left", editor: false, responsive:2 },           
            { title: "Cargo", field: "cargo", sorter: "string", hozAlign: "left", editor: false, responsive:2 },
            { title: "Função", field: "funcao", sorter: "string", hozAlign: "left", editor: false, responsive:2 },
            { title: "e-mail", field: "email", sorter: "string", hozAlign: "left", editor: false, responsive:1 },
           
        ],

    });    
}

document.getElementById("mostraColunas").addEventListener("click", function () {
    if (agrupado == false) {
        table.setGroupBy(["unidade"]);
        agrupado = true;
    }
    else {
        table.setGroupBy();
        agrupado = false;
    };

});

