inicializaComponentes();
layout = 'fitDataFill';
let table = null;
let tabledata = '';
responsiveLayout = true;
let agrupado = false;
let agrupadoT = false;
let largColuna = '100';
let d3 = Plotly.d3;
initialSort = [{ column: 'nome', dir: 'asc' }];
function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    getRelatorios('', testeCallback);
    initTabs();
  });
}

function initTabs() {
  $('.tabs').tabs();
}
function initSelect() {
  $('select').formSelect();
}

function dataTable(msg) {
  let tabledata = msg;
  table = new Tabulator('#tabelaReinp', {
    data: tabledata,
    pagination: 'local',
    height: '900px',
    minHeight: '300px',
    maxHeight: '900px',
    layout: layout,
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    initialSort: initialSort,
    columns: [
      {
        formatter: 'responsiveCollapse',
        width: 50,
        minWidth: 30,
        hozAlign: 'left',
        resizable: false,
        headerSort: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'CPF',
        field: 'cpf',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        editor: false,
        responsive: 1,
        formatter: formatNome,
        download: true,
      },
      {
        title: 'Responsável',
        field: 'nome',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        editor: false,
        formatter: formatNome,
        responsive: 0,
        download: true,
      },
      {
        title: 'Equipe',
        field: 'unidade',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: '1º Trimestre',
        field: `T1`,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        topCalc: somaCalc,
        responsive: 0,
        download: true,
      },
      {
        title: '2º Trimestre',
        field: `T2`,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        topCalc: somaCalc,
        responsive: 0,
        download: true,
      },
      {
        title: '3º Trimestre',
        field: `T3`,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        topCalc: somaCalc,
        responsive: 0,
        download: true,
      },
      {
        title: '4º Trimestre',
        field: `T4`,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        topCalc: somaCalc,
        responsive: 0,
        download: true,
      },
      {
        title: 'Ano',
        field: `ano`,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        topCalc: somaCalc,
        responsive: 0,
        download: true,
        visible: false,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: {
      'pt-br': {
        columns: {
          name: 'Nome', //replace the title of column name with the value "Name"
        },
        ajax: {
          loading: 'Carregando', //ajax loader text
          error: 'Erro', //ajax error text
        },
        groups: {
          //copy for the auto generated item count in group header
          item: 'item', //the singular  for item
          items: 'itens', //the plural for items
        },
        pagination: {
          page_size: 'Quantidade de registros', //label for the page size select element
          first: 'Primeira', //text for the first page button
          first_title: 'Primeira Página', //tooltip text for the first page button
          last: 'Última',
          last_title: 'Última Página',
          prev: 'Anterior',
          prev_title: 'Página Anterior',
          next: 'Próxima',
          next_title: 'Próxima Página',
        },
        headerFilters: {
          default: 'filtrar coluna...', //default header filter placeholder text
          columns: {
            nome: 'Filtrar por Nome',
            CPF: 'Filtrar por CPF', //replace default header filter text for column name
          },
        },
      },
    },
  });
}

function dadosGrafico(dados) {
  console.log(dados);
  return d3
    .nest()
    .rollup((v) => {
      return {
        Jan: d3.sum(v, (d) => {
          if (d.mes == `01/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
        Fev: d3.sum(v, (d) => {
          if (d.mes == `02/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
        Mar: d3.sum(v, (d) => {
          if (d.mes == `03/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
        Abr: d3.sum(v, (d) => {
          if (d.mes == `04/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
        Mai: d3.sum(v, (d) => {
          if (d.mes == `05/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
        Jun: d3.sum(v, (d) => {
          if (d.mes == `06/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
        Jul: d3.sum(v, (d) => {
          if (d.mes == `07/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
        Ago: d3.sum(v, (d) => {
          if (d.mes == `08/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
        Set: d3.sum(v, (d) => {
          if (d.mes == `09/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
        Out: d3.sum(v, (d) => {
          if (d.mes == `10/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
        Nov: d3.sum(v, (d) => {
          if (d.mes == `11/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
        Dez: d3.sum(v, (d) => {
          if (d.mes == `12/${new Date().getFullYear()}`) {
            return d.he;
          }
        }),
      };
    })
    .entries(dados);
}
function dadosGrafico2(dados) {
  let T1 = 0;
  let T2 = 0;
  let T3 = 0;
  let T4 = 0;
  dados.forEach((d) => {
    if (d.trimestre == `1`) {
      d.forEach((e) => {
        T1 += e.he;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `2`) {
      d.forEach((e) => {
        T2 += e.he;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `3`) {
      d.forEach((e) => {
        T3 += e.he;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `4`) {
      d.forEach((e) => {
        T4 += e.he;
      });
    }
  });

  return {
    T1: T1.toFixed(2),
    T2: T2.toFixed(2),
    T3: T3.toFixed(2),
    T4: T4.toFixed(2),
  };
}
//dados = JSON.parse($('#reinpData').attr('data-reinp'));
function graficos(dadosPlot) {
  let graf = dadosGrafico(dadosPlot);
  let graf2 = dadosGrafico2(dadosPlot);
  let cores = [
    'rgb(204, 204, 204)',
    'rgb(254, 181, 204)',
    'rgb(104,204, 204)',
    'rgb(124, 181, 204)',
    'rgb(164, 204, 204)',
    'rgb(184, 181, 204)',
    'rgb(84, 105, 119)',
    'rgb(144, 181, 204)',
    'rgb(119, 110, 84)',
    'rgb(134, 224, 234)',
    'rgb(134, 131, 224)',
    'rgba(204,204,204,1)',
    'rgba(222,45,38,0.8)',
    'rgba(204,204,204,1)',
    'rgba(204,204,204,1)',
  ];
  var layoutMes = {
    title: 'Indicações por mês',
    shapes: [
      {
        type: 'line',
        xref: 'paper',
        y0: 126.0,
        x0: 0,
        y1: 126.0,
        x1: 100,
        line: {
          color: 'rgb(229, 43, 80)',
          width: 2,
          dash: 'dot',
        },
      },
    ],
    yaxis: {
      showticklabels: true,
      tickangle: 0,
      tickfont: {
        family: 'Arial',
        size: 10,
        color: 'black',
      },
    },
    margin: {
      l: 200,
      r: 30,
      b: 50,
      t: 100,
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
          dash: 'dot',
        },
      },
    ],
    yaxis: {
      showticklabels: true,
      tickangle: 0,
      tickfont: {
        family: 'Arial',
        size: 10,
        color: 'black',
      },
    },
    margin: {
      l: 200,
      r: 30,
      b: 50,
      t: 100,
    },
    bargap: 0.05,
  };
  let config = { responsive: true, displaylogo: false };
  var trace1 = {
    x: Object.keys(graf),
    y: Object.values(graf),
    type: 'bar',
    marker: {
      color: cores,
    },
    text: Object.values(graf).map((d) => {
      return +d.toFixed(2);
    }),
    textposition: 'auto',
    hoverinfo: 'none',
  };
  var trace2 = {
    x: ['1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre'],
    y: Object.values(graf2),
    type: 'bar',
    marker: {
      color: cores,
    },
    text: Object.values(graf2).map(String),
    textposition: 'auto',
    hoverinfo: 'none',
  };
  trace1.color = cores;
  Plotly.newPlot(
    document.getElementById('barrasReinpMensal'),
    [trace1],
    layoutMes,
    config,
  );
  Plotly.newPlot(
    document.getElementById('barrasReinpTrimestral'),
    [trace2],
    layoutTrimestre,
    config,
  );
}
