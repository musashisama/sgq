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
    formataDados();
    initTabs();
  });
}

function initTabs() {
  $('.tabs').tabs();
}

document
  .getElementById('mostraColunasTurma')
  .addEventListener('click', function () {
    if (agrupadoT == false) {
      table.setGroupBy(['Equipe']);
      agrupadoT = true;
    } else {
      table.setGroupBy();
      agrupadoT = false;
    }
  });
function initSelect() {
  $('select').formSelect();
}

function formataDados() {
  let tabledata = JSON.parse($('#formReinp').attr('data-reinp')).flat();
  let users = JSON.parse($('#formReinp').attr('data-users')).flat();
  let flat = [];
  let b = d3
    .nest()
    .key((d) => {
      return d.CPF;
    })
    .rollup((v) => {
      return {
        jan: d3.sum(v, (d) => {
          if (d.mes == '12/2019' && d.trimestre == 'T1') {
            return +d.HE_CARF;
          }
        }),
        fev: d3.sum(v, (d) => {
          if (d.mes == '1/2020' && d.trimestre == 'T1') {
            return +d.HE_CARF;
          }
        }),
        mar: d3.sum(v, (d) => {
          if (
            (d.mes == '2/2020' && d.trimestre == 'T1') ||
            (d.mes == '3/2020' && d.trimestre == 'T1')
          ) {
            return +d.HE_CARF;
          }
        }),
        abr: d3.sum(v, (d) => {
          if (d.mes == '3/2020' && d.trimestre == 'T2') {
            return +d.HE_CARF;
          }
        }),
        mai: d3.sum(v, (d) => {
          if (d.mes == '4/2020' && d.trimestre == 'T2') {
            return +d.HE_CARF;
          }
        }),
        jun: d3.sum(v, (d) => {
          if (
            (d.mes == '5/2020' && d.trimestre == 'T2') ||
            (d.mes == '6/2020' && d.trimestre == 'T2')
          ) {
            return +d.HE_CARF;
          }
        }),
        jul: d3.sum(v, (d) => {
          if (d.mes == '6/2020' && d.trimestre == 'T3') {
            return +d.HE_CARF;
          }
        }),
        ago: d3.sum(v, (d) => {
          if (d.mes == '7/2020' && d.trimestre == 'T3') {
            return +d.HE_CARF;
          }
        }),
        set: d3.sum(v, (d) => {
          if (
            (d.mes == '8/2020' && d.trimestre == 'T3') ||
            (d.mes == '9/2020' && d.trimestre == 'T3')
          ) {
            return +d.HE_CARF;
          }
        }),
        out: d3.sum(v, (d) => {
          if (d.mes == '9/2020' && d.trimestre == 'T4') {
            return +d.HE_CARF;
          }
        }),
        nov: d3.sum(v, (d) => {
          if (d.mes == '10/2020' && d.trimestre == 'T4') {
            return +d.HE_CARF;
          }
        }),
        dez: d3.sum(v, (d) => {
          if (
            (d.mes == '11/2020' && d.trimestre == 'T4') ||
            (d.mes == '12/2020' && d.trimestre == 'T4')
          ) {
            return +d.HE_CARF;
          }
        }),
      };
    })
    .entries(tabledata);
  b.forEach((d) => {
    flat.push({
      cpf: d.key,
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
    });
  });
  users.forEach((user) => {
    flat.forEach((f) => {
      if (user.cpf == f.cpf) {
        f.Equipe = user.unidade;
        f.nome = user.nome;
      }
    });
  });
  dataTable(flat);
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
    initialSort: [{}],
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
        field: 'Equipe',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: '1º Trimestre',
        field: 't1',
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
        field: 't2',
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
        field: 't3',
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
        field: 't4',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        topCalc: somaCalc,
        responsive: 0,
        download: true,
      },
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
        title: 'Janeiro',
        field: 'jan',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
      },
      {
        title: 'Fevereiro',
        field: 'fev',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
      },
      {
        title: 'Março',
        field: 'mar',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
      },
      {
        title: 'Abril',
        field: 'abr',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
      },
      {
        title: 'Maio',
        field: 'mai',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
      },
      {
        title: 'Junho',
        field: 'jun',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
      },
      {
        title: 'Julho',
        field: 'jul',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
      },
      {
        title: 'Agosto',
        field: 'ago',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
      },
      {
        title: 'Setembro',
        field: 'set',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
      },
      {
        title: 'Outubro',
        field: 'out',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
      },
      {
        title: 'Novembro',
        field: 'nov',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
      },
      {
        title: 'Dezembro',
        field: 'dez',
        width: largColuna,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatMes,
        responsive: 2,
        download: true,
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

let formatNome = function formatNome(cell) {
  return `<a href='/julgamento/restrito/reinp/detalha/${
    cell.getRow().getData().cpf
  }'>${cell.getValue()}</a>`;
};

let formatMes = function formatNome(cell) {
  return `${cell.getValue()}`;
};
let formatTrimestre = function formatNome(cell) {
  const valor = +cell.getValue();
  if (valor >= 378) {
    cell.getElement().style.color = 'green';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (valor < 378) {
    cell.getElement().style.color = 'red';
    cell.getElement().style.fontWeight = 'bolder';
  }
  return valor;
};

function mediaCalc(values, data, calcParams) {
  var calc = 0;
  let valor = 0;
  values.forEach(function (value) {
    if (value > 0) {
      valor += +value;
      calc++;
    }
  });

  return `𝛍: ${valor / calc}`;
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

  return `𝚺: ${(+valor).toLocaleString()}`;
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

  return `|𝜲|: ${calc}`;
}

function dadosGrafico(dados) {
  let flat = [];
  let b = d3
    .nest()
    .rollup((v) => {
      return {
        jan: d3.sum(v, (d) => {
          if (d.mes == '12/2019' && d.trimestre == 'T1') {
            return +d.HE_CARF;
          }
        }),
        fev: d3.sum(v, (d) => {
          if (d.mes == '1/2020' && d.trimestre == 'T1') {
            return +d.HE_CARF;
          }
        }),
        mar: d3.sum(v, (d) => {
          if (
            (d.mes == '2/2020' && d.trimestre == 'T1') ||
            (d.mes == '3/2020' && d.trimestre == 'T1')
          ) {
            return +d.HE_CARF;
          }
        }),
        abr: d3.sum(v, (d) => {
          if (d.mes == '3/2020' && d.trimestre == 'T2') {
            return +d.HE_CARF;
          }
        }),
        mai: d3.sum(v, (d) => {
          if (d.mes == '4/2020' && d.trimestre == 'T2') {
            return +d.HE_CARF;
          }
        }),
        jun: d3.sum(v, (d) => {
          if (
            (d.mes == '5/2020' && d.trimestre == 'T2') ||
            (d.mes == '6/2020' && d.trimestre == 'T2')
          ) {
            return +d.HE_CARF;
          }
        }),
        jul: d3.sum(v, (d) => {
          if (d.mes == '6/2020' && d.trimestre == 'T3') {
            return +d.HE_CARF;
          }
        }),
        ago: d3.sum(v, (d) => {
          if (d.mes == '7/2020' && d.trimestre == 'T3') {
            return +d.HE_CARF;
          }
        }),
        set: d3.sum(v, (d) => {
          if (
            (d.mes == '8/2020' && d.trimestre == 'T3') ||
            (d.mes == '9/2020' && d.trimestre == 'T3')
          ) {
            return +d.HE_CARF;
          }
        }),
        out: d3.sum(v, (d) => {
          if (d.mes == '9/2020' && d.trimestre == 'T4') {
            return +d.HE_CARF;
          }
        }),
        nov: d3.sum(v, (d) => {
          if (d.mes == '10/2020' && d.trimestre == 'T4') {
            return +d.HE_CARF;
          }
        }),
        dez: d3.sum(v, (d) => {
          if (
            (d.mes == '11/2020' && d.trimestre == 'T4') ||
            (d.mes == '12/2020' && d.trimestre == 'T4')
          ) {
            return +d.HE_CARF;
          }
        }),
      };
    })
    .entries(dados);
  // b.forEach(d => {
  //     flat.push(
  //         {
  //             jan: d.values.jan.toFixed(2),
  //             fev: d.values.fev.toFixed(2),
  //             mar: d.values.mar.toFixed(2),
  //             abr: d.values.abr.toFixed(2),
  //             mai: d.values.mai.toFixed(2),
  //             jun: d.values.jun.toFixed(2),
  //             jul: d.values.jul.toFixed(2),
  //             ago: d.values.ago.toFixed(2),
  //             set: d.values.set.toFixed(2),
  //             out: d.values.out.toFixed(2),
  //             nov: d.values.nov.toFixed(2),
  //             dez: d.values.dez.toFixed(2),
  //         })
  // })
  return b;
}
function dadosGrafico2(dados) {
  let flat = {};
  let b = d3
    .nest()
    .rollup((v) => {
      return {
        jan: d3.sum(v, (d) => {
          if (d.mes == '12/2019' && d.trimestre == 'T1') {
            return +d.HE_CARF;
          }
        }),
        fev: d3.sum(v, (d) => {
          if (d.mes == '1/2020' && d.trimestre == 'T1') {
            return +d.HE_CARF;
          }
        }),
        mar: d3.sum(v, (d) => {
          if (
            (d.mes == '2/2020' && d.trimestre == 'T1') ||
            (d.mes == '3/2020' && d.trimestre == 'T1')
          ) {
            return +d.HE_CARF;
          }
        }),
        abr: d3.sum(v, (d) => {
          if (d.mes == '3/2020' && d.trimestre == 'T2') {
            return +d.HE_CARF;
          }
        }),
        mai: d3.sum(v, (d) => {
          if (d.mes == '4/2020' && d.trimestre == 'T2') {
            return +d.HE_CARF;
          }
        }),
        jun: d3.sum(v, (d) => {
          if (
            (d.mes == '5/2020' && d.trimestre == 'T2') ||
            (d.mes == '6/2020' && d.trimestre == 'T2')
          ) {
            return +d.HE_CARF;
          }
        }),
        jul: d3.sum(v, (d) => {
          if (d.mes == '6/2020' && d.trimestre == 'T3') {
            return +d.HE_CARF;
          }
        }),
        ago: d3.sum(v, (d) => {
          if (d.mes == '7/2020' && d.trimestre == 'T3') {
            return +d.HE_CARF;
          }
        }),
        set: d3.sum(v, (d) => {
          if (
            (d.mes == '8/2020' && d.trimestre == 'T3') ||
            (d.mes == '9/2020' && d.trimestre == 'T3')
          ) {
            return +d.HE_CARF;
          }
        }),
        out: d3.sum(v, (d) => {
          if (d.mes == '9/2020' && d.trimestre == 'T4') {
            return +d.HE_CARF;
          }
        }),
        nov: d3.sum(v, (d) => {
          if (d.mes == '10/2020' && d.trimestre == 'T4') {
            return +d.HE_CARF;
          }
        }),
        dez: d3.sum(v, (d) => {
          if (
            (d.mes == '11/2020' && d.trimestre == 'T4') ||
            (d.mes == '12/2020' && d.trimestre == 'T4')
          ) {
            return +d.HE_CARF;
          }
        }),
      };
    })
    .entries(dados);

  flat.t1 = (b.jan + b.fev + b.mar).toFixed(2);
  flat.t2 = (b.abr + b.mai + b.jun).toFixed(2);
  flat.t3 = (b.jul + b.ago + b.set).toFixed(2);
  flat.t4 = (b.out + b.nov + b.dez).toFixed(2);

  return flat;
}
dados = JSON.parse($('#formReinp').attr('data-reinp')).flat();
let graf = dadosGrafico(dados);
let graf2 = dadosGrafico2(dados);
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
