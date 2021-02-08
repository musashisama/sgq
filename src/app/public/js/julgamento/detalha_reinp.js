inicializaComponentes();
layout = 'fitDataFill';
let table = null;
let d3 = Plotly.d3;
responsiveLayout = true;
let agrupado = false;
let agrupadoT = false;
let largColuna = '100';
let langs = {
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
  let data = JSON.parse($('#formReinp').attr('data-reinp'));
  let dados = data[0];
  let user = JSON.parse($('#formReinp').attr('data-user'));
  let dadosTabela = [
    {
      T1: somaTrimestre('1', dados),
      T2: somaTrimestre('2', dados),
      T3: somaTrimestre('3', dados),
      T4: somaTrimestre('4', dados),
      unidade: user.unidade,
    },
  ];
  dataTable(dadosTabela);
  let arrayMes = dados.detalhamento;
  dataTable2(arrayMes.flat());
  return dadosTabela;
}

function dataTable(msg) {
  let tabledata = msg;
  table = new Tabulator('#tabelaReinp', {
    data: tabledata,
    height: '200px',
    minHeight: '200px',
    maxHeight: '900px',
    layout: layout,
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
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
        title: 'Turma',
        field: 'unidade',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: '1º Trimestre',
        field: 'T1',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
      {
        title: '2º Trimestre',
        field: 'T2',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
      {
        title: '3º Trimestre',
        field: 'T3',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
      {
        title: '4º Trimestre',
        field: 'T4',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

document.getElementById('agrupaMes').addEventListener('click', function () {
  if (agrupado == false) {
    table.setGroupBy(['mes']);
    agrupado = true;
  } else {
    table.setGroupBy();
    agrupado = false;
  }
});

function dataTable2(msg) {
  let tabledata = msg;
  table = new Tabulator('#tabelaReinpDet', {
    data: tabledata,
    pagination: 'local',
    height: '600px',
    minHeight: '300px',
    maxHeight: '900px',
    layout: 'fitData',
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
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
        title: 'Processo',
        field: 'processo',
        sorter: 'number',
        hozAlign: 'center',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Mês de Indicação',
        field: 'mes',
        sorter: 'string',
        hozAlign: 'center',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Contribuinte',
        field: 'contribuinte',
        sorter: 'string',
        hozAlign: 'center',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Horas Efetivas',
        field: 'horasEfetivas',
        topCalc: somaCalc,
        mutator: formatValorReinp,
        accessorDownload: downloadValorReinp,
        sorter: 'date',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Código',
        field: 'classificacao.tipo',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Descrição',
        field: 'classificacao.descricao',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

let downloadValorReinp = function (value, data, type, params, column) {
  let valor = value.toLocaleString();
  return valor.replace('.', ',');
};

let formatValorReinp = function (valor, data, type, params, column) {
  if (valor == 7.8) {
    valor = 8;
  }

  return valor;
};

function dadosGrafico(dados) {
  let arrayMes = dados.detalhamento;
  return d3
    .nest()
    .rollup((v) => {
      return {
        Jan: d3.sum(v, (d) => {
          if (d.mes == `01/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
        Fev: d3.sum(v, (d) => {
          if (d.mes == `02/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
        Mar: d3.sum(v, (d) => {
          if (d.mes == `03/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
        Abr: d3.sum(v, (d) => {
          if (d.mes == `04/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
        Mai: d3.sum(v, (d) => {
          if (d.mes == `05/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
        Jun: d3.sum(v, (d) => {
          if (d.mes == `06/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
        Jul: d3.sum(v, (d) => {
          if (d.mes == `07/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
        Ago: d3.sum(v, (d) => {
          if (d.mes == `08/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
        Set: d3.sum(v, (d) => {
          if (d.mes == `09/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
        Out: d3.sum(v, (d) => {
          if (d.mes == `10/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
        Nov: d3.sum(v, (d) => {
          if (d.mes == `11/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
        Dez: d3.sum(v, (d) => {
          if (d.mes == `12/${d.ano}`) {
            return d.horasEfetivas;
          }
        }),
      };
    })
    .entries(arrayMes);
}
function dadosGrafico2(dados) {
  return {
    T1: somaTrimestre('1', dados),
    T2: somaTrimestre('2', dados),
    T3: somaTrimestre('3', dados),
    T4: somaTrimestre('4', dados),
  };
}
dados = JSON.parse($('#formReinp').attr('data-reinp'));
let graf = dadosGrafico(dados[0]);
let graf2 = dadosGrafico2(dados[0]);
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
    l: 50,
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
  text: Object.values(graf).map(String),
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
