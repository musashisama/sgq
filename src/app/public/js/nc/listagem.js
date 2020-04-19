inicializaComponentes();
layout = "fitColumns";
//responsiveLayout = "collapse";
function inicializaComponentes() {
    $(document).ready(function () {        
        dataTable();
        
    });
}


function dataTable() {
    let tabledata = JSON.parse($('form').attr('data-nc'));
    var table = null;
    table = new Tabulator("#tabelaNC", {
        data: tabledata,
        pagination: "local",
        height: "1000px",
        minHeight: '300px',
        maxHeight: '1000px',
        layout: layout,
       // responsiveLayout: responsiveLayout,
        
        initialSort: [{ column: "Macroprocesso", dir: "asc" }],
        columns: [           
            { title: "Macroprocesso", width:180, field: "Macroprocesso", sorter: "string", hozAlign: "left", headerFilter: "input", formatter:"textarea", editor: false, },
            { title: "Não Conformidade", field: "nconformidade", sorter: "string", hozAlign: "left", headerFilter: "input",bottomCalc: "count", formatter:"textarea", editor: false,},
            { title: "Descrição", field: "descDet", sorter: "string", hozAlign: "left", headerFilter: "input",formatter:"textarea",  editor: false,  },           
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