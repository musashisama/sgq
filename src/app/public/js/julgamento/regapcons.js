let langs = {

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
        tabelaOcorrencias();
        initTabs();
    });
}

function initSelect() {
    $('select').formSelect();
}

function initTabs() {
    $('.tabs').tabs();
}

$('.dataRel').change(() => {
    console.log($("#dataRel option:selected").val());
    $.ajax({
        url: `/julgamento/conselheiros/${$("select option:selected").val()}`,
        type: 'POST',
        data: {},
        beforeSend: function () {
            $("#resultado").html("ENVIANDO...");
        }
    })
        .done(function (msg) {
            dataTable(msg);
            grafico(msg);
        })
        .fail(function (jqXHR, textStatus, msg) {
            var toastHTML = `<span>Ocorreu um erro.</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        });

})

function tabelaOcorrencias() {

    let tabledata = JSON.parse($('#tabelaOcorrencias').attr('data-ocorrencias'));
    //define table
    let table = new Tabulator("#tabelaOcorrencias", { 
        data: tabledata,
        autoColumns: false,
        locale: true,
        langs: langs,    
        pagination:'local',
        height: '1000px',       
        minHeight: '300px',
        maxHeight: '1000px',
        layout: "fitColumns",
        initialSort:[{ column: "dtOcorrencia", dir: "desc" }],
        resizableRows: true,
    responsiveLayout: 'collapse',
    responsiveLayoutCollapseStartOpen: false,
        columns: [
            { title: "Ocorrência", field: "tipoOcorrencia", sorter: "string", hozAlign: "left", editor: false, headerFilter: "input",topCalc: "count", responsive: 0 },
            { title: "Detalhes da Ocorrência", field: "ocorDet", sorter: "string", hozAlign: "left", editor: false, headerFilter: "input", responsive: 0, },
            { title: "Data da Ocorrência", field: "dtOcorrencia", sorter: "date", hozAlign: "center", editor: false, headerFilter: "input", responsive: 0 },           
           
        ],

    });
}



function dataTable(dados) {
    let tabledata = dados;
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
            { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false, responsive: 0, download: true, },
            { title: "Processo", field: "Processo", sorter: "number", hozAlign: "center", headerFilter: "input", topCalc: countCalc, editor: false, responsive: 0, download: true, },
            { title: "Contribuinte", field: "Contribuinte", sorter: "string", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Turma", field: "turma", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2, download: true, },
            { title: "Câmara", field: "camara", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2, download: true, },
            { title: "Seção", field: "setor", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2, download: true, },
            { title: "Equipe Atual", field: "Equipe_Atual", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2, download: true, },
            { title: "Ind. Apenso", field: "Ind_Apenso", sorter: "string", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Atividade", field: "Atividade", sorter: "string", hozAlign: "center", topCalc: countCalc, editor: false, responsive: 0, download: true, },
            { title: "Situação de Julgamento", field: "Situacao", sorter: "string", headerFilter: "input", topCalc: countCalc, hozAlign: "center", editor: false, responsive: 0, download: true, },
            { title: "Entrada na Atividade", field: "Entrada_na_Atividade", sorter: "date", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Horas CARF", field: "HE_CARF", sorter: "number", hozAlign: "center", headerFilter: "input", topCalc: somaCalc, editor: false, responsive: 0, download: true, },
            { title: "Dias na Atividade", field: "Dias_na_Atividade", sorter: "number", hozAlign: "center", topCalc: mediaCalc, editor: false, formatter: coloreDias, responsive: 0, download: true },
            { title: "Dias da Sessão de Julgamento", field: "Dias_da_SJ", sorter: "number", hozAlign: "center", editor: false, responsive: 0, download: true, },
            { title: "Data da Sessão de Julgamento", field: "Data_da_Sessao_Julgamento", sorter: "number", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Dias da Última Distribuição", field: "Dias_da_Dist", sorter: "number", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Retorno Sepoj?", field: "Retorno_Sepoj", sorter: "string", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Última Equipe", field: "Equipe_Ultima", sorter: "string", hozAlign: "center", editor: false, responsive: 1, download: true, },
            { title: "Observações", field: "Observacoes", sorter: "string", hozAlign: "center", editor: false, responsive: 1, download: true, },
            { title: "Valor Originário", field: "Valor_Originario", sorter: "number", hozAlign: "center", editor: false, formatter: formatValor, responsive: 0, download: true, },

        ],
        autoColumns: false,
        locale: true,
        langs:langs
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

let formatValor = function formatValor(cell) {
    const formato = { style: 'currency', currency: 'BRL', useGrouping: true, localeMatcher: "best fit" }
    const valor = +cell.getValue();
    if (valor >= 1000000) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }
    if (valor < 1000000) { cell.getElement().style.color = 'rgb(63, 138, 2)'; cell.getElement().style.fontWeight = 'bolder'; }
    return `${valor.toLocaleString('pt-BR', formato)}`
}

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

$('.Atividade').change(() => {
    //console.log($("select option:selected").val());
    table.setFilter("Atividade", "=", $("#atividadeSelect option:selected").val())
    if ($("#atividadeSelect option:selected").val() == 'Todas') {
        table.removeFilter("Atividade", "=", $("#atividadeSelect option:selected").val())
    } else { table.setFilter("Atividade", "=", $("#atividadeSelect option:selected").val()) }
})

function grafico(dados){
    var layoutAtividade = {
        title: 'Processos por atividade',        
        shapes: [            
        ],
        yaxis: {
            showticklabels: true,
            tickangle: 0,
            tickfont: {
                family: 'Arial',
                size: 10,
                color: 'black'
            },
        },
        margin: {
            l: 200,
            r: 30,
            b: 50,
            t: 100
        },
    
    };    
    let config = { responsive: false, displaylogo: false }
    let d3 = Plotly.d3;
    let somatorio = d3.nest().rollup(v => {
        return [
            { y: 'Para Relatar - Aguardando Pauta', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'AGUARDANDO PAUTA') { return 1 } }), },
            { y: 'Para Relatar - Cancelado', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'CANCELADO') { return 1 } }) },
            { y: 'Para Relatar - Retirado de Pauta', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'RETIRADO DE PAUTA') { return 1 } }) },
            { y: 'Para Relatar - Pedido de Vista', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'PEDIDO DE VISTA') { return 1 } }) },
            { y: 'Para Relatar - Indicado para Pauta', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'INDICADO PARA PAUTA') { return 1 } }) },
            { y: 'Para Relatar - Em Sessão', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'EM SESSÃO') { return 1 } }) },
            { y: 'Para Relatar - Em Pauta', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'EM PAUTA') { return 1 } }) },
            { y: 'Formalizar Voto Vencedor', x: d3.sum(v, d => { if (d.Atividade == 'Formalizar Voto Vencedor') { return 1 } }) },
            { y: 'Apreciar e Assinar Documento', x: d3.sum(v, d => { if (d.Atividade == 'Apreciar e Assinar Documento') { return 1 } }) },
            { y: 'Formalizar Decisão', x: d3.sum(v, d => { if (d.Atividade == 'Formalizar Decisao') { return 1 } }) },
            { y: 'Corrigir Decisão', x: d3.sum(v, d => { if (d.Atividade == 'Corrigir Decisao' || d.Atividade == 'Corrigir Decisão') { return 1 } }) }
        ]
    }).entries(dados)
    
    let arrayDados = [];
    arrayDados.y = [];
    arrayDados.x = [];
    arrayDados.text = [];
    arrayDados.color = [];
    
    let cores = ['rgb(204, 204, 204)', 'rgb(254, 181, 204)', 'rgb(104,204, 204)',
        'rgb(124, 181, 204)', 'rgb(164, 204, 204)', 'rgb(184, 181, 204)', 'rgb(84, 105, 119)', 'rgb(144, 181, 204)'
        , 'rgb(119, 110, 84)', 'rgb(134, 224, 234)', 'rgb(134, 131, 224)'];
    somatorio = somatorio.sort((a, b) => { return a.x - b.x })
    somatorio.forEach((row, index) => {
        arrayDados.y.push(row.y)
        arrayDados.x.push(row.x)
        arrayDados.color.push(cores[index]);
        arrayDados.text.push(row.y)
        
    })
    arrayDados.type = 'bar'
    arrayDados.orientation = 'h';
    arrayDados.type = 'bar';
    arrayDados.fillcolor = 'cls';
    arrayDados.hovertemplate = `<i>Quantidade</i>: %{x:.d} processos<br>                         
                            <b>%{text}</b>`;
    arrayDados.marker = {
        color: arrayDados.color,
        width: 4,
        'colorscale': 'Viridis',
        line: {
        }
    }
    Plotly.newPlot(document.getElementById('barrasAtividade'), [arrayDados], layoutAtividade, config);
}