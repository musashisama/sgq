inicializaComponentes();
layout = "fitDataFill";
var table = null;
let tabledata = "";
let agrupado = false;
initialSort = [{ column: "nome", dir: "asc" }];
function inicializaComponentes() {
    $(document).ready(function () {
        initSelect();
        dataTable();
    });
}

document.getElementById("mostraColunas").addEventListener("click", function () {
    if (agrupado == false) {
        table.setGroupBy(["nome", "Atividade", "Situacao"]);
        agrupado = true;
    }
    else {
        table.setGroupBy();
        agrupado = false;
    };

});

function initSelect() {
    $('select').formSelect();
}

function dataTable(msg) {
    let tabledata = JSON.parse($('form').attr('data-regapCojul'));
    table = new Tabulator("#tabelaRegap", {
        data: tabledata,
        pagination: "local",
        height: "1000px",
        minHeight: '300px',
        //maxHeight: '1000px',
        layout: layout,
        responsiveLayout: 'collapse',
        responsiveLayoutCollapseStartOpen: false,
        // groupBy:["nome", "Atividade", "Situacao"], 
        groupStartOpen: false,
        groupToggleElement: "header",
        initialSort: [{ column: "Dias_na_Atividade", dir: "desc" }],
        columns: [
            { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false },
            { title: "CPF", field: "CPF", sorter: "string", hozAlign: "left", headerFilter: "input", editor: false, responsive: 0, formatter: formatNome },
            { title: "Responsável Atual", field: "nome", sorter: "string", hozAlign: "left", headerFilter: "input", editor: false, responsive: 0 },
            { title: "Turma", field: "turma", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2 },
            { title: "Câmara", field: "camara", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2 },
            { title: "Seção", field: "setor", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2 },
            { title: "Contribuinte", field: "Contribuinte", sorter: "string", hozAlign: "center", editor: false, responsive: 2 },
            { title: "Processo", field: "Processo", sorter: "number", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2 },
            { title: "Ind. Apenso", field: "Ind_Apenso", sorter: "string", hozAlign: "center", editor: false, responsive: 2 },
            { title: "Atividade", field: "Atividade", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 0 },
            { title: "Situação de Julgamento", field: "Situacao", sorter: "string", headerFilter: "input", bottomCalc: "count", hozAlign: "center", editor: false, responsive: 0 },
            { title: "Entrada na Atividade", field: "Entrada_na_Atividade", sorter: "date", hozAlign: "center", editor: false, responsive: 2 },
            { title: "Horas CARF", field: "HE_CARF", sorter: "number", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2 },
            { title: "Dias na Atividade", field: "Dias_na_Atividade", sorter: "number", hozAlign: "center", editor: false, responsive: 0 },
            { title: "Dias da Sessão de Julgamento", field: "Dias_da_SJ", sorter: "number", hozAlign: "center", editor: false, responsive: 2 },
            { title: "Data da Sessão de Julgamento", field: "Data_da_Sessao_Julgamento", sorter: "number", hozAlign: "center", editor: false, responsive: 2 },
            { title: "Dias da Última Distribuição", field: "Dias_da_Dist", sorter: "number", hozAlign: "center", editor: false, responsive: 2 },
            { title: "Retorno Sepoj?", field: "Retorno_Sepoj", sorter: "string", hozAlign: "center", editor: false, responsive: 0 },
            { title: "Última Equipe", field: "Equipe_Ultima", sorter: "string", hozAlign: "center", editor: false, responsive: 2 },
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
                        "nome": "Filtrar por Nome",
                        "CPF": "Filtrar por CPF", //replace default header filter text for column name
                    }
                }
            }
        },
    });
}

let formatNome = function formatNome(cell){
    return `<a href='/julgamento/restrito/regapCojul/detalha/${cell.getValue()}'>${cell.getValue()}</a>`    
}