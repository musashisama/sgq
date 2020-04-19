inicializaComponentes();
layout = "fitDataFill";
responsiveLayout = true;
initialSort = [{ column: "nome", dir: "asc" }];
function inicializaComponentes() {
    $(document).ready(function () {
        initSelect();
        dataTable();
    });
}

function initSelect() {
    $('select').formSelect();
}

function dataTable(msg) {
    let tabledata = JSON.parse($('#dadosCarga').text());
    var table = null;
    table = new Tabulator("#tabelaCarga", {
        data: tabledata,
        pagination: "local",
        height: "1000px",
        minHeight: '300px',
        maxHeight: '1000px',
        layout: layout,
        //responsiveLayout: responsiveLayout,
        initialSort: [{ column: "HE_CARF", dir: "desc" }],
        columns: [
            { title: "CPF", field: "CPF", sorter: "string", hozAlign: "left", headerFilter: "input", editor: false, },
            { title: "Nome", field: "nome", sorter: "string", hozAlign: "left", headerFilter: "input", editor: false, },
            { title: "Turma", field: "turma", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, },
            { title: "Câmara", field: "camara", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, },
            { title: "Seção", field: "setor", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, },
            { title: "Quantidade", field: "qtdeProc", sorter: "number", hozAlign: "center", editor: false, },
            { title: "Carga em horas", field: "HE_CARF", sorter: "number", hozAlign: "center", editor: false, },
            {
                title: "", field: "HE_CARF", sorter: "number", hozAlign: "left", width: 250, formatter: "progress", formatterParams: {
                    min: 0,
                    max: 1000,
                    color: function (value) {
                        if (value <= 126) return "red";
                        if (value > 126 && value <= 252) return "orange";
                        if (value > 252) return "green";
                    },
                }
            }],
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
