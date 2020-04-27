inicializaComponentes();
layout = "fitDataFill";
responsiveLayout = true;
let table = null;
let tabledata = "";
let agrupado = false;
let agrupadoT = false;
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
    let tabledata = JSON.parse($('#formGerencial').attr('data-regap'));
    table = new Tabulator("#tabelaRegap", {
        data: tabledata,
        pagination: "local",
        height: "1000px",
        minHeight: '300px',
        maxHeight: '1000px',
        layout: layout,
        responsiveLayout: 'collapse',
        groupStartOpen: false,
        responsiveLayoutCollapseStartOpen: false,
        initialSort: [{ column: "Atividade", dir: "desc" }, { column: "Dias_na_Atividade", dir: "desc" }, { column: "HE_CARF", dir: "desc" }],
        columns: [
            { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false,responsive: 0, download: true, },
            { title: "Processo", field: "Processo", sorter: "number", hozAlign: "center", headerFilter: "input", topCalc: countCalc, editor: false, responsive: 0, download: true, },
            { title: "Contribuinte", field: "Contribuinte", sorter: "string", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Turma", field: "turma", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 1, download: true, },
            { title: "Câmara", field: "camara", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 1, download: true, },
            { title: "Seção", field: "setor", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 1, download: true, },
            { title: "Equipe Atual", field: "Equipe_Atual", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2, download: true, },
            { title: "Ind. Apenso", field: "Ind_Apenso", sorter: "string", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Atividade", field: "Atividade", sorter: "string", hozAlign: "center",  topCalc: countCalc, editor: false, responsive: 0, download: true, },
            { title: "Situação de Julgamento", field: "Situacao", sorter: "string", headerFilter: "input", topCalc: countCalc, hozAlign: "center", editor: false, responsive: 0, download: true, },
            { title: "Entrada na Atividade", field: "Entrada_na_Atividade", sorter: "date", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Horas CARF", field: "HE_CARF", sorter: "number", hozAlign: "center", headerFilter: "input", topCalc: somaCalc, editor: false, responsive: 0, download: true, },
            { title: "Dias na Atividade", field: "Dias_na_Atividade", sorter: "number", hozAlign: "center", topCalc: mediaCalc, editor: false, formatter: coloreDias, responsive: 0, download: true },
            { title: "Dias da Sessão de Julgamento", field: "Dias_da_SJ", sorter: "number", hozAlign: "center", editor: false, responsive: 0, download: true, },
            { title: "Data da Sessão de Julgamento", field: "Data_da_Sessao_Julgamento", sorter: "number", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Dias da Última Distribuição", field: "Dias_da_Dist", sorter: "number", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Retorno Sepoj?", field: "Retorno_Sepoj", sorter: "string", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Última Equipe", field: "Equipe_Ultima", sorter: "string", hozAlign: "center", editor: false, responsive: 0, download: true, },
            { title: "Observações", field: "Observacoes", sorter: "string", hozAlign: "center", editor: false, responsive: 1, download: true, },

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

document.getElementById("mostraColunasAtividade").addEventListener("click", function () {
    if (agrupado == false) {
        table.setGroupBy(["Atividade", "Situacao"]);
        agrupado = true;
    }
    else {
        table.setGroupBy();
        agrupado = false;
    };
});

function coloreDias(cell, formatterParams) {
    let value = cell.getValue();

    if (cell.getRow().getData().Atividade == 'Para Relatar' && cell.getRow().getData().Situacao == 'AGUARDANDO PAUTA') {
        if (value >= 180) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
        if (value < 180 && value >= 140) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder'; }
        if (value < 140) { cell.getElement().style.color = 'rgb(63, 138, 2)'; cell.getElement().style.fontWeight = 'bolder' }
    }

    if (cell.getRow().getData().Atividade == 'Formalizar Decisao' && value >= 30) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Formalizar Decisao' && value < 30) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Formalizar Voto Vencedor' && value >= 30) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Formalizar Voto Vencedor' && value < 30) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }

    if (cell.getRow().getData().Atividade == 'Apreciar e Assinar Documento' && value >= 15) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Apreciar e Assinar Documento' && value < 15) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Corrigir Decisão' && value >= 1) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }

    return value
}

function mediaCalc(values, data, calcParams) {
    var calc = 0;
    let valor = 0;
    values.forEach(function (value) {
        if (value > 0) {
            valor += value;
            calc++;
        }
    });

    return `𝛍: ${(valor / calc).toFixed(2)}`;
}

function somaCalc(values, data, calcParams) {
    var calc = 0;
    let valor = 0;
    values.forEach(function (value) {
        if (value > 0) {
            valor += value;
            calc++;
        }
    });

    return `𝚺: ${(valor).toFixed(2)}`;
}

function countCalc(values, data, calcParams) {
    var calc = 0;
    let valor = 0;
    values.forEach(function (value) {
        if (value) {
            valor += value;
            calc++;
        }
    });

    return `|𝜲|: ${(calc)}`;
}

$('.Atividade').change(() =>{
    console.log($( "select option:selected" ).text());
    table.setFilter("Atividade", "=", $( "select option:selected" ).text())
    if($( "select option:selected" ).text()=='Todas'){
        table.removeFilter("Atividade", "=", $( "select option:selected" ).text())
    }else {table.setFilter("Atividade", "=", $( "select option:selected" ).text())}
})