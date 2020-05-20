inicializaComponentes();
layout = "fitDataFill";
let table = null;
let tabledata = "";
let d3 = Plotly.d3;
responsiveLayout = true;
let agrupado = false;
let agrupadoT = false;
let largColuna = '100';
initialSort = [{  }];
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
            "default": "filtrar coluna...", //default header filter placeholder text
            "columns": {
                "nome": "Filtrar por Nome",
                "CPF": "Filtrar por CPF", //replace default header filter text for column name
            }
        }
    }
};
function inicializaComponentes() {
    $(document).ready(function () {
        initSelect();
        formataDados();
        initTabs();
    });
}
function initTabs() {
    $('.tabs').tabs();
}
function initSelect() {
    $('select').formSelect();
}
function formataDados() {
    let tabledata = JSON.parse($('#formReinp').attr('data-reinp')).flat();
    let user = JSON.parse($('#formReinp').attr('data-user'));
    let flat = [];
    let b = d3.nest()
        .key(d => { return d.CPF })
        .rollup(v => {
            return {
                jan: d3.sum(v, d => { if (d.mes == '12/2019' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                fev: d3.sum(v, d => { if (d.mes == '1/2020' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                mar: d3.sum(v, d => { if ((d.mes == '2/2020' && d.trimestre == 'T1') || (d.mes == '3/2020' && d.trimestre == 'T1')) { return +d.HE_CARF } }),
                abr: d3.sum(v, d => { if (d.mes == '3/2020' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                mai: d3.sum(v, d => { if (d.mes == '4/2019' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                jun: d3.sum(v, d => { if ((d.mes == '5/2019' && d.trimestre == 'T2') || (d.mes == '6/2019' && d.trimestre == 'T2')) { return +d.HE_CARF } }),
                jul: d3.sum(v, d => { if (d.mes == '6/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                ago: d3.sum(v, d => { if (d.mes == '7/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                set: d3.sum(v, d => { if ((d.mes == '8/2019' && d.trimestre == 'T3') || (d.mes == '9/2019' && d.trimestre == 'T3')) { return +d.HE_CARF } }),
                out: d3.sum(v, d => { if (d.mes == '9/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                nov: d3.sum(v, d => { if (d.mes == '10/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                dez: d3.sum(v, d => { if ((d.mes == '11/2019' && d.trimestre == 'T4') || (d.mes == '12/2020' && d.trimestre == 'T4')) { return +d.HE_CARF } })
            }
        })
        .entries(tabledata)
    b.forEach(d => {
        flat.push(
            {
                cpf: d.key,
                nome: user.nome,
                Equipe: user.unidade,
                jan: d.values.jan.toFixed(2),
                fev: d.values.fev.toFixed(2),
                mar: d.values.mar.toFixed(2),
                t1: (d.values.jan + d.values.fev + d.values.mar).toFixed(2),
                abr: d.values.abr.toFixed(2),
                mai: d.values.mai.toFixed(2),
                jun: d.values.jun.toFixed(2),
                t2: (d.values.abr + d.values.mai + d.values.jun).toFixed(2),
                jul: d.values.jul.toFixed(2),
                ago: d.values.ago.toFixed(2),
                set: d.values.set.toFixed(2),
                t3: (d.values.jul + d.values.ago + d.values.set).toFixed(2),
                out: d.values.out.toFixed(2),
                nov: d.values.nov.toFixed(2),
                dez: d.values.dez.toFixed(2),
                t4: (d.values.out + d.values.nov + d.values.dez).toFixed(2),
            })
    })
    dataTable(flat)
    dataTable2();
}

function dataTable(msg) {
    let tabledata = msg;
    table = new Tabulator("#tabelaReinp", {
        data: tabledata,
        // pagination: "local",
        height: "200px",
        minHeight: '200px',
        maxHeight: '900px',
        layout: layout,
        responsiveLayout: 'collapse',
        groupStartOpen: false,
        responsiveLayoutCollapseStartOpen: false,
        initialSort: [{}],
        columns: [
            { formatter: "responsiveCollapse", width: 50, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false, responsive: 0, download: true, },
            { title: "Turma", field: "Equipe", sorter: "string", hozAlign: "center", editor: false, responsive: 0, download: true, },
            { title: "1º Trimestre", field: "t1", sorter: "number", hozAlign: "center", editor: false, formatter: formatTrimestre, responsive: 0, download: true, },
            { title: "2º Trimestre", field: "t2", sorter: "number", hozAlign: "center", editor: false, formatter: formatTrimestre, responsive: 0, download: true, },
            { title: "3º Trimestre", field: "t3", sorter: "number", hozAlign: "center", editor: false, formatter: formatTrimestre, responsive: 0, download: true, },
            { title: "4º Trimestre", field: "t4", sorter: "number", hozAlign: "center", editor: false, formatter: formatTrimestre, responsive: 0, download: true, },
        ],
        autoColumns: false,
        locale: true,
        langs: langs,
    });
}

let formatNome = function formatNome(cell) {
    return `<a href='/julgamento/restrito/reinp/detalha/${cell.getRow().getData().cpf}'>${cell.getValue()}</a>`
}

let formatMes = function formatNome(cell) {

    return `${cell.getValue()}`
}
let formatTrimestre = function formatNome(cell) {
    const valor = +cell.getValue();
    if (valor >= 378) { cell.getElement().style.color = 'green'; cell.getElement().style.fontWeight = 'bolder' }
    if (valor < 378) { cell.getElement().style.color = 'red'; cell.getElement().style.fontWeight = 'bolder'; }
    return valor
}

let formatValor = function formatValor(cell) {
    const formato = { style: 'currency', currency: 'BRL', useGrouping: true, localeMatcher: "best fit" }
    const valor = +cell.getValue();
    if (valor >= 1000000) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }
    if (valor < 1000000) { cell.getElement().style.color = 'rgb(63, 138, 2)'; cell.getElement().style.fontWeight = 'bolder'; }
    return `${valor.toLocaleString('pt-BR', formato)}`
}

function mediaCalc(values, data, calcParams) {
    var calc = 0;
    let valor = 0;
    values.forEach(function (value) {
        if (value > 0) {
            valor += +value;
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
            valor += +value;
            calc++;
        }
    });

    return `𝚺: ${(valor)}`;
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
document.getElementById("agrupaMes").addEventListener("click", function () {
    if (agrupado == false) {
        table.setGroupBy(["trimestre", "mes"]);
        agrupado = true;
    }
    else {
        table.setGroupBy();
        agrupado = false;
    };
});

function dataTable2(msg) {
    let tabledata = JSON.parse($('#formReinp').attr('data-reinp')).flat();
    table = new Tabulator("#tabelaReinpDet", {
        data: tabledata,
        pagination: "local",
        height: "600px",
        minHeight: '300px',
        maxHeight: '900px',
        layout: 'fitData',
        responsiveLayout: 'collapse',
        groupStartOpen: false,
        responsiveLayoutCollapseStartOpen: false,
        initialSort: [{}],
        columns: [
            { formatter: "responsiveCollapse", width: 50, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false, responsive: 0, download: true, },
            { title: "Processo", field: "Processo", sorter: "number", hozAlign: "center", topCalc: countCalc, editor: false, responsive: 0, download: true, },
            { title: "Horas Estimadas", field: "HE_CARF", sorter: "number", hozAlign: "center", topCalc: somaCalc, editor: false, responsive: 0, download: true, },
            { title: "Data de Indicação", field: "Data", sorter: "date", hozAlign: "center", editor: false, responsive: 0, download: true, },
            { title: "Trimestre", field: "trimestre", sorter: "string", hozAlign: "center", editor: false, download: true, },
            { title: "Turma", field: "Equipe", sorter: "string", hozAlign: "center", editor: false, responsive: 0, download: true, },
        ],
        autoColumns: false,
        locale: true,
        langs: langs,
    });
}

function dadosGrafico(dados) {
    let flat = [];
    let b = d3.nest()
    .key(d => { return d.CPF })
    .rollup(v => {
        return {
            jan: d3.sum(v, d => { if (d.mes == '12/2019' && d.trimestre == 'T1') { return +d.HE_CARF } }),
            fev: d3.sum(v, d => { if (d.mes == '1/2020' && d.trimestre == 'T1') { return +d.HE_CARF } }),
            mar: d3.sum(v, d => { if ((d.mes == '2/2020' && d.trimestre == 'T1') || (d.mes == '3/2020' && d.trimestre == 'T1')) { return +d.HE_CARF } }),
            abr: d3.sum(v, d => { if (d.mes == '3/2020' && d.trimestre == 'T2') { return +d.HE_CARF } }),
            mai: d3.sum(v, d => { if (d.mes == '4/2019' && d.trimestre == 'T2') { return +d.HE_CARF } }),
            jun: d3.sum(v, d => { if ((d.mes == '5/2019' && d.trimestre == 'T2') || (d.mes == '6/2019' && d.trimestre == 'T2')) { return +d.HE_CARF } }),
                jul: d3.sum(v, d => { if (d.mes == '6/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                ago: d3.sum(v, d => { if (d.mes == '7/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                set: d3.sum(v, d => { if ((d.mes == '8/2019' && d.trimestre == 'T3') || (d.mes == '9/2019' && d.trimestre == 'T3')) { return +d.HE_CARF } }),
                out: d3.sum(v, d => { if (d.mes == '9/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                nov: d3.sum(v, d => { if (d.mes == '10/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                dez: d3.sum(v, d => { if ((d.mes == '11/2019' && d.trimestre == 'T4') || (d.mes == '12/2020' && d.trimestre == 'T4')) { return +d.HE_CARF } })
            }
        })
        .entries(dados)
    b.forEach(d => {
        flat.push(
            {
                jan: d.values.jan.toFixed(2),
                fev: d.values.fev.toFixed(2),
                mar: d.values.mar.toFixed(2),
                abr: d.values.abr.toFixed(2),
                mai: d.values.mai.toFixed(2),
                jun: d.values.jun.toFixed(2),
                jul: d.values.jul.toFixed(2),
                ago: d.values.ago.toFixed(2),
                set: d.values.set.toFixed(2),
                out: d.values.out.toFixed(2),
                nov: d.values.nov.toFixed(2),
                dez: d.values.dez.toFixed(2),
            })
        })
    return flat;
}
function dadosGrafico2(dados) {
    let flat = [];
    let b = d3.nest()
        .key(d => { return d.CPF })
        .rollup(v => {
            return {
                jan: d3.sum(v, d => { if (d.mes == '12/2019' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                fev: d3.sum(v, d => { if (d.mes == '1/2020' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                mar: d3.sum(v, d => { if ((d.mes == '2/2020' && d.trimestre == 'T1') || (d.mes == '3/2020' && d.trimestre == 'T1')) { return +d.HE_CARF } }),
                abr: d3.sum(v, d => { if (d.mes == '3/2020' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                mai: d3.sum(v, d => { if (d.mes == '4/2019' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                jun: d3.sum(v, d => { if ((d.mes == '5/2019' && d.trimestre == 'T2') || (d.mes == '6/2019' && d.trimestre == 'T2')) { return +d.HE_CARF } }),
                jul: d3.sum(v, d => { if (d.mes == '6/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                ago: d3.sum(v, d => { if (d.mes == '7/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                set: d3.sum(v, d => { if ((d.mes == '8/2019' && d.trimestre == 'T3') || (d.mes == '9/2019' && d.trimestre == 'T3')) { return +d.HE_CARF } }),
                out: d3.sum(v, d => { if (d.mes == '9/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                nov: d3.sum(v, d => { if (d.mes == '10/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                dez: d3.sum(v, d => { if ((d.mes == '11/2019' && d.trimestre == 'T4') || (d.mes == '12/2020' && d.trimestre == 'T4')) { return +d.HE_CARF } })
            }
        })
        .entries(dados)
    b.forEach(d => {
        flat.push(
            {
                t1: (d.values.jan + d.values.fev + d.values.mar).toFixed(2),
                t2: (d.values.abr + d.values.mai + d.values.jun).toFixed(2),
                t3: (d.values.jul + d.values.ago + d.values.set).toFixed(2),
                t4: (d.values.out + d.values.nov + d.values.dez).toFixed(2),
            })
    })
    return flat;
}
dados = JSON.parse($('#formReinp').attr('data-reinp')).flat();
let graf = dadosGrafico(dados);
let graf2 = dadosGrafico2(dados);
let cores = ['rgb(204, 204, 204)', 'rgb(254, 181, 204)', 'rgb(104,204, 204)',
    'rgb(124, 181, 204)', 'rgb(164, 204, 204)', 'rgb(184, 181, 204)', 'rgb(84, 105, 119)',
    'rgb(144, 181, 204)', 'rgb(119, 110, 84)', 'rgb(134, 224, 234)', 'rgb(134, 131, 224)',
    'rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)'];
var layoutMes = {
    title: 'Indicações por mês',
    shapes: [{
        type: 'line',
        xref: 'paper',
        y0: 126.0,
        x0: 0,
        y1: 126.0,
        x1: 100,
        line: {
            color: 'rgb(229, 43, 80)',
            width: 2,
            dash: 'dot'
        }
    },
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
    bargap: 0.05,

};
var layoutTrimestre = {
    title: 'Indicações Trimestre',
    shapes: [
        {
            type: 'line',
            xref: 'paper',
            y0: 378.0,
            x0: 0,
            y1: 378.0,
            x1: 100,
            line: {
                color: 'rgb(229, 43, 80)',
                width: 2,
                dash: 'dot'
            }
        },
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
    bargap: 0.05,

};
let config = { responsive: true, displaylogo: false }
var trace1 = {
    x: Object.keys(graf[0]),
    y: Object.values(graf[0]),
    type: 'bar',
    marker: {
        color: cores
    },
    text: Object.values(graf[0]).map(String),
    textposition: 'auto',
    hoverinfo: 'none',
}
var trace2 = {
    x: ['1º Trimestre','2º Trimestre','3º Trimestre','4º Trimestre'],
    y: Object.values(graf2[0]),
    type: 'bar',
    marker: {
        color: cores
    },
    text: Object.values(graf2[0]).map(String),
    textposition: 'auto',
    hoverinfo: 'none',
}
trace1.color = cores;
Plotly.newPlot(document.getElementById('barrasReinpMensal'), [trace1], layoutMes, config);
Plotly.newPlot(document.getElementById('barrasReinpTrimestral'), [trace2], layoutTrimestre, config);

