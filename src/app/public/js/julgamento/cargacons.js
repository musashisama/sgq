inicializaComponentes();
layout = "fitDataFill";
initialSort = [{ column: "nome", dir: "asc" }];
let table = null;
let tabledata = "";
let agrupado = false;
let sj1 = ["1ª TE-1ªSEÇÃO-1001-CARF-MF-DF",
    "2ª TE-1ªSEÇÃO-1002-CARF-MF-DF",
    "3ª TE-1ªSEÇÃO-1003-CARF-MF-DF",
    "1ª SEÇÃO-CARF-MF-DF",
    "1ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "2ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "1ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "2ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "1ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "2ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "1ª CÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "2ª CÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "3ª CÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "4ª CÂMARA-1ªSEÇÃO-CARF-MF-DF"]
let sj2 = ["1ª TE-2ªSEÇÃO-2001-CARF-MF-DF",
    "2ª TE-2ªSEÇÃO-2002-CARF-MF-DF",
    "3ª TE-2ªSEÇÃO-2003-CARF-MF-DF",
    "3ª SEÇÃO - CARF - MF - DF",
    "2ª SEÇÃO-CARF-MF-DF",
    "1ª TO-2ªCÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "2ª TO-2ªCAMARA-2ªSEÇÃO-CARF-MF-DF",
    "1ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "2ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "1ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "2ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "1ª CÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "2ª CÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "3ª CÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "4ª CÂMARA-2ªSEÇÃO-CARF-MF-DF"]
let sj3 = ["1ª TE-3ªSEÇÃO-3001-CARF-MF-DF",
    "2ª TE-3ªSEÇÃO-3002-CARF-MF-DF",
    "3ª TE-3ªSEÇÃO-3003-CARF-MF-DF",
    "1ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "2ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "1ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "2ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "1ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "2ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "1ª CÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "2ª CÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "3ª CÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "4ª CÂMARA-3ªSEÇÃO-CARF-MF-DF"]
let csrf = ["1ª TURMA-CSRF-CARF-MF-DF", "2ª TURMA-CSRF-CARF-MF-DF", "3ª TURMA-CSRF-CARF-MF-DF"]
let corCSRF = {
    "1ª TURMA-CSRF-CARF-MF-DF": 'rgb(84, 105, 119)'
    , "2ª TURMA-CSRF-CARF-MF-DF": 'rgb(144, 181, 204)'
    , "3ª TURMA-CSRF-CARF-MF-DF": 'rgb(119, 110, 84)'
}
let corsj1 = {
    "1ª TE-1ªSEÇÃO-1001-CARF-MF-DF": 'rgb(84, 105, 119)',
    "2ª TE-1ªSEÇÃO-1002-CARF-MF-DF": 'rgb(114, 181, 204)',
    "3ª TE-1ªSEÇÃO-1003-CARF-MF-DF": 'rgb(144, 204, 204)',
    "1ª SEÇÃO-CARF-MF-DF": 'rgb(174, 181, 204)',
    "1ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF": 'rgb(204, 204, 204)',
    "2ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF": 'rgb(254, 181, 204)',
    "1ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF": 'rgb(104,204, 204)',
    "2ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF": 'rgb(124, 181, 204)',
    "1ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF": 'rgb(164, 204, 204)',
    "2ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF": 'rgb(184, 181, 204)',
    "1ª CÂMARA-1ªSEÇÃO-CARF-MF-DF": 'rgb(204, 204, 204)',
    "2ª CÂMARA-1ªSEÇÃO-CARF-MF-DF": 'rgb(224, 181, 204)',
    "3ª CÂMARA-1ªSEÇÃO-CARF-MF-DF": 'rgb(244,204, 204)',
    "4ª CÂMARA-1ªSEÇÃO-CARF-MF-DF": 'rgb(64, 181, 204)'
}


let corsj2 = {
    "1ª TE-2ªSEÇÃO-2001-CARF-MF-DF": 'rgb(84, 105, 119)',
    "2ª TE-2ªSEÇÃO-2002-CARF-MF-DF": 'rgb(114, 181, 204)',
    "3ª TE-2ªSEÇÃO-2003-CARF-MF-DF": 'rgb(144, 204, 204)',
    "3ª SEÇÃO - CARF - MF - DF": 'rgb(174, 181, 204)',
    "2ª SEÇÃO-CARF-MF-DF": 'rgb(204, 181, 204)',
    "1ª TO-2ªCÂMARA-2ªSEÇÃO-CARF-MF-DF": 'rgb(254, 181, 204)',
    "2ª TO-2ªCAMARA-2ªSEÇÃO-CARF-MF-DF": 'rgb(104, 204, 204)',
    "1ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF": 'rgb(124, 181, 204)',
    "2ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF": 'rgb(164, 181, 204)',
    "1ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF": 'rgb(184, 204, 204)',
    "2ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF": 'rgb(204, 181, 204)',
    "1ª CÂMARA-2ªSEÇÃO-CARF-MF-DF": 'rgb(224, 204, 204)',
    "2ª CÂMARA-2ªSEÇÃO-CARF-MF-DF": 'rgb(244, 181, 204)',
    "3ª CÂMARA-2ªSEÇÃO-CARF-MF-DF": 'rgb(64, 204, 204)',
    "4ª CÂMARA-2ªSEÇÃO-CARF-MF-DF": 'rgb(24, 181, 204)'
}

let corsj3 = {
    "1ª TE-3ªSEÇÃO-3001-CARF-MF-DF": 'rgb(24, 204, 204)',
    "2ª TE-3ªSEÇÃO-3002-CARF-MF-DF": 'rgb(64, 181, 204)',
    "3ª TE-3ªSEÇÃO-3003-CARF-MF-DF": 'rgb(244, 204, 204)',
    "1ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF": 'rgb(224, 181, 204)',
    "2ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF": 'rgb(204, 204, 204)',
    "1ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF": 'rgb(184, 181, 204)',
    "2ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF": 'rgb(164, 204, 204)',
    "1ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF": 'rgb(124, 181, 204)',
    "2ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF": 'rgb(104, 204, 204)',
    "1ª CÂMARA-3ªSEÇÃO-CARF-MF-DF": 'rgb(254, 181, 204)',
    "2ª CÂMARA-3ªSEÇÃO-CARF-MF-DF": 'rgb(204, 204, 204)',
    "3ª CÂMARA-3ªSEÇÃO-CARF-MF-DF": 'rgb(174, 181, 204)',
    "4ª CÂMARA-3ªSEÇÃO-CARF-MF-DF": 'rgb(144, 204, 204)'
}

function inicializaComponentes() {
    $(document).ready(function () {
        initSelect();
        dataTable();
        initTabs();
        initScrollSpy();
        $('.scspy').hide()
        clickTabs();
    });
}

function initScrollSpy() {
    $('.scrollspy').scrollSpy();
}
function initTabs() {
    $('.tabs').tabs();
}

function clickTabs() {
    $('.libox').click(() => {
        $('#scspy').show()
        $('#scspy2').hide()
    })
    $('.litab').click(() => {
        $('#scspy').hide()
        $('#scspy2').hide()
    })
    $('.libar').click(() => {
        $('#scspy').hide()
        $('#scspy2').show()
    })
}
function initSelect() {
    $('select').formSelect();
}

//*TABELA DE ESTOQUE
function dataTable(msg) {
    tabledata = JSON.parse($('#dadosCarga').text());
    table = new Tabulator("#tabelaCarga", {
        data: tabledata,
        pagination: "local",
        height: "1000px",
        minHeight: '300px',
        maxHeight: '1000px',
        layout: layout,
        responsiveLayout: 'collapse',
        groupStartOpen: false,
        responsiveLayoutCollapseStartOpen: false,
        initialSort: [{ column: "HE_CARF", dir: "desc" }],
        columns: [
            { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false,responsive: 0,  download: true, },
            { title: "CPF", field: "CPF", sorter: "string", hozAlign: "left", headerFilter: "input", editor: false, responsive:0},
            { title: "Nome", field: "nome", sorter: "string", hozAlign: "left", headerFilter: "input", editor: false, responsive:2 },
            { title: "Turma", field: "turma", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive:2},
            { title: "Câmara", field: "camara", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive:2},
            { title: "Seção", field: "setor", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive:2},
            { title: "Quantidade", field: "qtdeProc", sorter: "number", hozAlign: "center", editor: false, responsive:0},
            { title: "Carga em horas", field: "HE_CARF", sorter: "number", hozAlign: "center", editor: false, responsive:0},
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
document.getElementById("mostraColunas").addEventListener("click", function () {
    if (agrupado == false) {
        table.setGroupBy(["setor", "camara", "turma"]);
        agrupado = true;
    }
    else {
        table.setGroupBy();
        agrupado = false;
    };

});
//*

//Graficos
let estoqueGeral = JSON.parse($('#dadosCarga').text())
estoqueGeral = estoqueGeral.sort((a, b) => { return a.HE_CARF - b.HE_CARF })
var config = {responsive: true,displaylogo: false}

//BoxPlot por Seção de Julgamento e Turmas da CSRF
function separaSJ(secao) {
    let parcial = [];

    secao.forEach(turma => {
        parcial.HE_CARF = [];
        estoqueGeral.forEach(row => {
            if (row.unidade === turma) {
                parcial.turma = turma
                parcial.HE_CARF.push(row.HE_CARF);
            }
        })
        if (parcial.HE_CARF.length > 0) {
            parcial.push({
                name: parcial.turma,
                y: parcial.HE_CARF,
                type: 'box',
                boxmean: true,
                boxpoints: 'all',
                jitter: 0.5,
                whiskerwidth: 0.2,
                fillcolor: 'cls',
                marker: {
                    size: 2
                },
                line: {
                    width: 1
                }
            })
        }
    });

    let retorno = []
    parcial.forEach(row => {
        if (row.y.length > 0) {
            retorno.push(row)
        }
    })
    return retorno
}

var layout0 = {
    shapes: [
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 126.0,
            x1: 1,
            y1: 126.0,
            line: {
                color: 'rgb(229, 43, 80)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 252.0,
            x1: 1,
            y1: 252.0,
            line: {
                color: 'rgb(192,43,229)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 378.0,
            x1: 1,
            y1: 378.0,
            line: {
                color: 'rgb(235,206,88)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 504.0,
            x1: 1,
            y1: 504.0,
            line: {
                color: 'rgb(229, 192, 43)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 630.0,
            x1: 1,
            y1: 630.0,
            line: {
                color: 'rgb(25, 247, 203)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 756.0,
            x1: 1,
            y1: 756.0,
            line: {
                color: 'rgb(43, 229, 192)',
                width: 1,
                dash: 'dot'
            }
        }
    ],
    title: {
        text: 'Câmara Superior de Recursos Fiscais',
        font: {
            family: 'Arial',
            size: 24
        },
        xref: 'paper',
        x: 0.5,
    },
    legend: { "orientation": "v" },
    xaxis: {
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: '',
        showticklabels: false
    },
    yaxis: {
        autorange: false,
        range: [0, 1000],
        showgrid: true,
        zeroline: true,
        dtick: 50,
        gridcolor: 'rgb(255, 255, 255)',
        gridwidth: 1,
        zerolinecolor: 'rgb(255, 255, 255)',
        zerolinewidth: 2
    },
    margin: {
        l: 50,
        r: 30,
        b: 8,
        t: 100
    },
    paper_bgcolor: 'rgb(243, 243, 243)',
    plot_bgcolor: 'rgb(243, 243, 243)',
    showlegend: true

};
Plotly.newPlot(document.getElementById('boxPlotCSRF'), separaSJ(csrf), layout0, config);

var layout1 = {
    shapes: [
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 126.0,
            x1: 1,
            y1: 126.0,
            line: {
                color: 'rgb(229, 43, 80)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 252.0,
            x1: 1,
            y1: 252.0,
            line: {
                color: 'rgb(192,43,229)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 378.0,
            x1: 1,
            y1: 378.0,
            line: {
                color: 'rgb(235,206,88)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 504.0,
            x1: 1,
            y1: 504.0,
            line: {
                color: 'rgb(229, 192, 43)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 630.0,
            x1: 1,
            y1: 630.0,
            line: {
                color: 'rgb(25, 247, 203)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 756.0,
            x1: 1,
            y1: 756.0,
            line: {
                color: 'rgb(43, 229, 192)',
                width: 1,
                dash: 'dot'
            }
        }
    ],
    title: {
        text: '1ª Seção de Julgamento',
        font: {
            family: 'Arial',
            size: 24
        },
        xref: 'paper',
        x: 0.5,
    },
    legend: { "orientation": "v" },
    xaxis: {
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: '',
        showticklabels: false
    },
    yaxis: {
        autorange: false,
        range: [0, 1000],
        showgrid: true,
        zeroline: true,
        dtick: 50,
        gridcolor: 'rgb(255, 255, 255)',
        gridwidth: 1,
        zerolinecolor: 'rgb(255, 255, 255)',
        zerolinewidth: 2
    },
    margin: {
        l: 50,
        r: 30,
        b: 8,
        t: 100
    },
    paper_bgcolor: 'rgb(243, 243, 243)',
    plot_bgcolor: 'rgb(243, 243, 243)',
    showlegend: true

};
Plotly.newPlot(document.getElementById('boxPlotSJ1'), separaSJ(sj1), layout1, config);
var layout2 = {
    shapes: [
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 126.0,
            x1: 1,
            y1: 126.0,
            line: {
                color: 'rgb(229, 43, 80)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 252.0,
            x1: 1,
            y1: 252.0,
            line: {
                color: 'rgb(192,43,229)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 378.0,
            x1: 1,
            y1: 378.0,
            line: {
                color: 'rgb(235,206,88)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 504.0,
            x1: 1,
            y1: 504.0,
            line: {
                color: 'rgb(229, 192, 43)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 630.0,
            x1: 1,
            y1: 630.0,
            line: {
                color: 'rgb(25, 247, 203)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 756.0,
            x1: 1,
            y1: 756.0,
            line: {
                color: 'rgb(43, 229, 192)',
                width: 1,
                dash: 'dot'
            }
        }
    ],
    title: {
        text: '2ª Seção de Julgamento',
        font: {
            family: 'Arial',
            size: 24
        },
        xref: 'paper',
        x: 0.5,
    },
    legend: { "orientation": "v" },
    xaxis: {
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: '',
        showticklabels: false
    },
    yaxis: {
        autorange: false,
        range: [0, 1000],
        showgrid: true,
        zeroline: true,
        dtick: 50,
        gridcolor: 'rgb(255, 255, 255)',
        gridwidth: 1,
        zerolinecolor: 'rgb(255, 255, 255)',
        zerolinewidth: 2
    },
    margin: {
        l: 50,
        r: 30,
        b: 8,
        t: 100
    },
    paper_bgcolor: 'rgb(243, 243, 243)',
    plot_bgcolor: 'rgb(243, 243, 243)',
    showlegend: true

};
Plotly.newPlot(document.getElementById('boxPlotSJ2'), separaSJ(sj2), layout2, config);
var layout3 = {
    shapes: [
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 126.0,
            x1: 1,
            y1: 126.0,
            line: {
                color: 'rgb(229, 43, 80)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 252.0,
            x1: 1,
            y1: 252.0,
            line: {
                color: 'rgb(192,43,229)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 378.0,
            x1: 1,
            y1: 378.0,
            line: {
                color: 'rgb(235,206,88)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 504.0,
            x1: 1,
            y1: 504.0,
            line: {
                color: 'rgb(229, 192, 43)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 630.0,
            x1: 1,
            y1: 630.0,
            line: {
                color: 'rgb(25, 247, 203)',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 756.0,
            x1: 1,
            y1: 756.0,
            line: {
                color: 'rgb(43, 229, 192)',
                width: 1,
                dash: 'dot'
            }
        }
    ],
    title: {
        text: '3ª Seção de Julgamento',
        font: {
            family: 'Arial',
            size: 24
        },
        xref: 'paper',
        x: 0.5,
    },
    legend: { "orientation": "v" },
    xaxis: {
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: '',
        showticklabels: false
    },
    yaxis: {
        autorange: false,
        range: [0, 1000],
        showgrid: true,
        zeroline: true,
        dtick: 50,
        gridcolor: 'rgb(255, 255, 255)',
        gridwidth: 1,
        zerolinecolor: 'rgb(255, 255, 255)',
        zerolinewidth: 2
    },
    margin: {
        l: 50,
        r: 30,
        b: 8,
        t: 100
    },
    paper_bgcolor: 'rgb(243, 243, 243)',
    plot_bgcolor: 'rgb(243, 243, 243)',
    showlegend: true

};
Plotly.newPlot(document.getElementById('boxPlotSJ3'), separaSJ(sj3), layout3, config);

//Barras horizontais por Seção de Julgamento e Turmas da CSRF



function separaSJCons(secao, cor) {
    let parcial = [];
    parcial.y = [];
    parcial.x = [];
    parcial.color = [];
    parcial.text = [];
    parcial.qtde = [];
    secao.forEach(turma => {
        estoqueGeral.forEach(row => {
            if (row.unidade === turma) {
                parcial.y.push(row.nome);
                parcial.x.push(row.HE_CARF);
                parcial.color.push(cor[turma]);
                parcial.qtde.push(row.qtdeProc)
                parcial.orientation = 'h';
                parcial.type = 'bar';
                parcial.fillcolor = 'cls';
                parcial.hovertemplate = `<i>Carga</i>: %{x:.2f} horas<br>                         
                        <b>%{text}</b>`;
                parcial.text.push(turma);
                parcial.marker = {
                    color: parcial.color,
                    width: 4,
                    'colorscale': 'Viridis',
                    line: {

                    }
                };
            };
        });
    });    
    return parcial;
}


var layoutCSRF = {
    title: 'Câmara Superior de Recursos Fiscais',
    //showlegend: true,
    shapes: [
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '126',
            y0: 0,
            x1: '126',
            y1: 1,
            fillcolor: '#d11515',
            opacity: 0.8,
            line: {
                color: '#d11515',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '252',
            y0: 0,
            x1: '252',
            y1: 1,
            fillcolor: '#b05d21',
            opacity: 0.6,
            line: {
                color: '#b05d21',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '378',
            y0: 0,
            x1: '378',
            y1: 1,
            fillcolor: '#ebd831',
            opacity: 0.6,
            line: {
                color: '#ebd831',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '504',
            y0: 0,
            x1: '504',
            y1: 1,
            fillcolor: '#b9eb31',
            opacity: 0.6,
            line: {
                color: '#b9eb31',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '630',
            y0: 0,
            x1: '630',
            y1: 1,
            fillcolor: '#59b823',
            opacity: 0.6,
            line: {
                width: 1,
                color: '#59b823',
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '756',
            y0: 0,
            x1: '756',
            y1: 1,
            fillcolor: '#0b7540',
            opacity: 0.6,
            line: {
                width: 1,
                color: '#0b7540',
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

};
var layoutSJ1 = {
    title: '1ª Seção de Julgamento',
    //showlegend: true,
    shapes: [
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '126',
            y0: 0,
            x1: '126',
            y1: 1,
            fillcolor: '#d11515',
            opacity: 0.8,
            line: {
                color: '#d11515',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '252',
            y0: 0,
            x1: '252',
            y1: 1,
            fillcolor: '#b05d21',
            opacity: 0.6,
            line: {
                color: '#b05d21',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '378',
            y0: 0,
            x1: '378',
            y1: 1,
            fillcolor: '#ebd831',
            opacity: 0.6,
            line: {
                color: '#ebd831',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '504',
            y0: 0,
            x1: '504',
            y1: 1,
            fillcolor: '#b9eb31',
            opacity: 0.6,
            line: {
                color: '#b9eb31',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '630',
            y0: 0,
            x1: '630',
            y1: 1,
            fillcolor: '#59b823',
            opacity: 0.6,
            line: {
                width: 1,
                color: '#59b823',
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '756',
            y0: 0,
            x1: '756',
            y1: 1,
            fillcolor: '#0b7540',
            opacity: 0.6,
            line: {
                width: 1,
                color: '#0b7540',
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

};

var layoutSJ2 = {
    title: '2ª Seção de Julgamento',
    //showlegend: true,
    shapes: [
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '126',
            y0: 0,
            x1: '126',
            y1: 1,
            fillcolor: '#d11515',
            opacity: 0.8,
            line: {
                color: '#d11515',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '252',
            y0: 0,
            x1: '252',
            y1: 1,
            fillcolor: '#b05d21',
            opacity: 0.6,
            line: {
                color: '#b05d21',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '378',
            y0: 0,
            x1: '378',
            y1: 1,
            fillcolor: '#ebd831',
            opacity: 0.6,
            line: {
                color: '#ebd831',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '504',
            y0: 0,
            x1: '504',
            y1: 1,
            fillcolor: '#b9eb31',
            opacity: 0.6,
            line: {
                color: '#b9eb31',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '630',
            y0: 0,
            x1: '630',
            y1: 1,
            fillcolor: '#59b823',
            opacity: 0.6,
            line: {
                width: 1,
                color: '#59b823',
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '756',
            y0: 0,
            x1: '756',
            y1: 1,
            fillcolor: '#0b7540',
            opacity: 0.6,
            line: {
                width: 1,
                color: '#0b7540',
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

};

var layoutSJ3 = {
    title: '3ª Seção de Julgamento',
    //showlegend: true,
    shapes: [
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '126',
            y0: 0,
            x1: '126',
            y1: 1,
            fillcolor: '#d11515',
            opacity: 0.8,
            line: {
                color: '#d11515',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '252',
            y0: 0,
            x1: '252',
            y1: 1,
            fillcolor: '#b05d21',
            opacity: 0.6,
            line: {
                color: '#b05d21',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '378',
            y0: 0,
            x1: '378',
            y1: 1,
            fillcolor: '#ebd831',
            opacity: 0.6,
            line: {
                color: '#ebd831',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '504',
            y0: 0,
            x1: '504',
            y1: 1,
            fillcolor: '#b9eb31',
            opacity: 0.6,
            line: {
                color: '#b9eb31',
                width: 1,
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '630',
            y0: 0,
            x1: '630',
            y1: 1,
            fillcolor: '#59b823',
            opacity: 0.6,
            line: {
                width: 1,
                color: '#59b823',
                dash: 'dot'
            }
        },
        {
            type: 'line',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '756',
            y0: 0,
            x1: '756',
            y1: 1,
            fillcolor: '#0b7540',
            opacity: 0.6,
            line: {
                width: 1,
                color: '#0b7540',
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

};

function ordena(a, b) {
    return b.x - a.x;
}

Plotly.newPlot(document.getElementById('barrasCSRF'), [separaSJCons(csrf, corCSRF)], layoutCSRF,config);
Plotly.newPlot(document.getElementById('barrasSJ1'), [separaSJCons(sj1, corsj1)], layoutSJ1,config);
Plotly.newPlot(document.getElementById('barrasSJ2'), [separaSJCons(sj2, corsj2)], layoutSJ2,config);
Plotly.newPlot(document.getElementById('barrasSJ3'), [separaSJCons(sj3, corsj3)], layoutSJ3,config);
