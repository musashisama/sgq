inicializaComponentes();
function inicializaComponentes() {
    $(document).ready(function () {
        dataTable();
        $('#mostraColunas').toggle();
    });
}
let formatterParams = {
    outputFormat: "DD/MM/YYYY",
    invalidPlaceholder: "(invalid date)",
}
let table = null;
let tabledata = null;
layout = "fitDataFill";
let colunas = [];
//responsiveLayout = "collapse";
var headerMenu = [
    {
        label: "<i class='fas fa-eye-slash'></i> Ocultar Coluna",
        action: function (e, column) {
            if (colunas.length == 0) {
                $('#mostraColunas').toggle();
            }
            colunas.push(column);
            column.hide();

        }
    }
]

document.getElementById("mostraColunas").addEventListener("click", function () {
    colunas.forEach(coluna => {
        coluna.show();
    })
});

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
        responsiveLayoutCollapseStartOpen:false,
        initialSort: [{ column: "mProcOrigem", dir: "asc" }],
        columns: [
            { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false },
            { title: "Macroprocesso Origem", width: 200, field: "mProcOrigem", sorter: "string", hozAlign: "left", headerFilter: "input", formatter: "textarea", editor: false, responsive: 0, headerMenu: headerMenu, },
            { title: "Não Conformidade", width: 300,field: "descNC", sorter: "string", hozAlign: "left", headerFilter: "input", formatter: "textarea", editor: false, responsive: 0, headerMenu: headerMenu },
            { title: "Ação Imediata", width: 140,field: "acaoImediata", sorter: "string", hozAlign: "left", headerFilter: "input", formatter: "textarea", editor: false, responsive: 0 },
            { title: "Data Encaminhamento", field: "EncCorNC", sorter: "date", hozAlign: "left", headerFilter: "input", formatter: "datetime", formatterParams: formatterParams, editor: false, responsive: 0 },
            { title: "Data NC", field: "dataNC", sorter: "date", hozAlign: "left", headerFilter: "input", formatter: "datetime", formatterParams: formatterParams, editor: false, responsive: 0 },
            { title: "Equipe", field: "equipeNC", sorter: "string", hozAlign: "left", headerFilter: "input", formatter: "textarea", editor: false, responsive: 2, headerMenu: headerMenu },
            { title: "Macroprocesso Usuário", field: "mpProcUser", sorter: "string", hozAlign: "left", headerFilter: "input", bottomCalc: "count", formatter: "textarea", editor: false, },
            { title: "Documento de Ref.", width: 180, field: "docRef", sorter: "string", hozAlign: "left", headerFilter: "input", formatter: "textarea", editor: false, responsive: 2 },
            { title: "Observações", field: "obsParticipante", sorter: "string", hozAlign: "left", headerFilter: "input", formatter: "textarea", editor: false, responsive: 2 },

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