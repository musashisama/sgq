inicializaComponentes();
var table = "";
var autoColumns = false;
var locale = true;
pagination = "local";
height = '1000px';
minHeight = '300px';
maxHeight = '1000px';
layout = "fitDataFill";
responsiveLayout = true;
initialSort = [{column:"nome", dir:"asc"}];

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

    let tabledataCons = JSON.parse($('#dadosCons').text());
    //define table
    tableCons = new Tabulator("#tabelaCons", {
        data: tabledataCons,
        autoColumns: autoColumns,
        locale: locale,
        langs: langs,
        pagination: pagination,
        height: height,
        minHeight: minHeight,
        maxHeight: maxHeight,
        layout: layout,
        initialSort: initialSort,
        responsiveLayout: responsiveLayout,      
        columns: [
            
            { title: "Nome", field: "nome", sorter: "string", hozAlign: "left", editor: false, headerFilter:"input", bottomCalc: "count", responsive:0 },
            { title: "CPF", field: "cpf", sorter: "string", hozAlign: "center", width: 150, editor: false, headerFilter:"input", responsive:3 },
            { title: "Siape", field: "siape", sorter: "string", hozAlign: "center", editor: false, headerFilter:"input", responsive:4 },
            { title: "Turma", field: "turma", sorter: "string", hozAlign: "center", editor: false, headerFilter:"input", responsive:2},
            { title: "Câmara", field: "camara", sorter: "string", hozAlign: "center", width: 150, editor: false, headerFilter:"input", responsive:2},
            { title: "Seção", field: "setor", sorter: "string", hozAlign: "left", headerFilter:"input", editor: false, responsive:2},            
            { title: "Função", field: "funcao", sorter: "string", hozAlign: "left", headerFilter:"input", editor: false, responsive:4},
            { title: "e-mail", field: "email", sorter: "string", hozAlign: "left", headerFilter:"input", editor: false, responsive:2},
            
        ],

    });
    
    let tabledataCol = JSON.parse($('#dadosCol').text());
    tableCol = new Tabulator("#tabelaCol", {
        data: tabledataCol,
        autoColumns: autoColumns,
        locale: locale,
        langs: langs,
        pagination: pagination,
        height: height,
        minHeight: minHeight,
        maxHeight: maxHeight,
        layout: layout,
        initialSort: initialSort,
        columns: [    
            
            { title: "Nome", field: "nome", sorter: "string", hozAlign: "left", editor: false, headerFilter:"input", bottomCalc: "count" },
            { title: "CPF", field: "cpf", sorter: "string", hozAlign: "center", width: 150, editor: false,headerFilter:"input" },
            { title: "Setor", field: "setor", sorter: "string", hozAlign: "left", editor: false, },
            { title: "Cargo", field: "cargo", sorter: "string", hozAlign: "left", editor: false, },
            { title: "Função", field: "funcao", sorter: "string", hozAlign: "left", editor: false, },
            { title: "e-mail", field: "email", sorter: "string", hozAlign: "left", editor: false },
        ],

    });
    
    let tabledataServ = JSON.parse($('#dadosServ').text());
    tableServ = new Tabulator("#tabelaServ", {
        data: tabledataServ,
        autoColumns: autoColumns,
        locale: locale,
        langs: langs,
        pagination: pagination,
        height: height,
        minHeight: minHeight,
        maxHeight: maxHeight,
        layout: layout,
        initialSort: initialSort,
        columns: [
            { title: "Nome", field: "nome", sorter: "string", hozAlign: "left", editor: false, headerFilter:"input",bottomCalc: "count" },
            { title: "CPF", field: "cpf", sorter: "string", hozAlign: "center", width: 150, editor: false,headerFilter:"input" },
            { title: "Setor", field: "setor", sorter: "string", hozAlign: "left", editor: false, },
            { title: "Cargo", field: "cargo", sorter: "string", hozAlign: "left", editor: false, },
            { title: "Função", field: "funcao", sorter: "string", hozAlign: "left", editor: false, },
            { title: "e-mail", field: "email", sorter: "string", hozAlign: "left", editor: false },
        ],

    });
    
    let tabledataTerc = JSON.parse($('#dadosTerc').text());
    tableTerc = new Tabulator("#tabelaTerc", {
        data: tabledataTerc,
        autoColumns: autoColumns,
        locale: locale,
        langs: langs,
        pagination: pagination,
        height: height,
        minHeight: minHeight,
        maxHeight: maxHeight,
        layout: layout,
        initialSort: initialSort,
        columns: [
            { title: "Nome", field: "nome", sorter: "string", hozAlign: "left", editor: false, headerFilter:"input",bottomCalc: "count" },
            { title: "CPF", field: "cpf", sorter: "string", hozAlign: "center", width: 150, editor: false,headerFilter:"input" },
            { title: "Setor", field: "setor", sorter: "string", hozAlign: "left", editor: false, },
            { title: "Cargo", field: "cargo", sorter: "string", hozAlign: "left", editor: false, },
            { title: "Função", field: "funcao", sorter: "string", hozAlign: "left", editor: false, },
            { title: "e-mail", field: "email", sorter: "string", hozAlign: "left", editor: false },
        ],

    });
    tableTerc.setFilter("funcao", "=", "Terceirizado");


}
