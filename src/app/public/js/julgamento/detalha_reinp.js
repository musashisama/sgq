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
  let dados = JSON.parse($('#formReinp').attr('data-reinp'));
  let user = JSON.parse($('#formReinp').attr('data-user'));
  let T1 = 0;
  let T2 = 0;
  let T3 = 0;
  let T4 = 0;
  dados.forEach((d) => {
    if (d.trimestre == `T1${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T1 += e.horasEfetivas;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `T2${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T2 += e.horasEfetivas;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `T3${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T3 += e.horasEfetivas;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `T4${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T4 += e.horasEfetivas;
      });
    }
  });
  let dadosTabela = [
    {
      T1: +T1.toFixed(2),
      T2: +T2.toFixed(2),
      T3: +T3.toFixed(2),
      T4: +T4.toFixed(2),
      unidade: user.unidade,
    },
  ];
  dataTable(dadosTabela);

  let arrayMes = [];
  dados.forEach((d) => {
    arrayMes.push(d.detalhamento);
  });

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

  return `𝚺: ${valor}`;
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
        title: 'Horas Estimadas',
        field: 'horasEstimadas',
        sorter: 'number',
        hozAlign: 'center',
        topCalc: somaCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Horas Efetivas',
        field: 'horasEfetivas',
        topCalc: somaCalc,
        sorter: 'date',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Código',
        field: 'classificacao.codigo',
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

function dadosGrafico(dados) {
  let arrayMes = [];
  dados.forEach((elem) => {
    elem.detalhamento.forEach((ele) => {
      arrayMes.push(ele);
    });
  });
  return d3
    .nest()
    .rollup((v) => {
      return {
        Jan: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-01`) {
            return d.horasEfetivas;
          }
        }),
        Fev: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-02`) {
            return d.horasEfetivas;
          }
        }),
        Mar: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-03`) {
            return d.horasEfetivas;
          }
        }),
        Abr: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-04`) {
            return d.horasEfetivas;
          }
        }),
        Mai: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-05`) {
            return d.horasEfetivas;
          }
        }),
        Jun: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-06`) {
            return d.horasEfetivas;
          }
        }),
        Jul: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-07`) {
            return d.horasEfetivas;
          }
        }),
        Ago: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-08`) {
            return d.horasEfetivas;
          }
        }),
        Set: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-09`) {
            return d.horasEfetivas;
          }
        }),
        Out: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-10`) {
            return d.horasEfetivas;
          }
        }),
        Nov: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-11`) {
            return d.horasEfetivas;
          }
        }),
        Dez: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-12`) {
            return d.horasEfetivas;
          }
        }),
      };
    })
    .entries(arrayMes);
}
function dadosGrafico2(dados) {
  let T1 = 0;
  let T2 = 0;
  let T3 = 0;
  let T4 = 0;
  dados.forEach((d) => {
    if (d.trimestre == `T1${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T1 += e.horasEfetivas;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `T2${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T2 += e.horasEfetivas;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `T3${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T3 += e.horasEfetivas;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `T4${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T4 += e.horasEfetivas;
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
dados = JSON.parse($('#formReinp').attr('data-reinp'));
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
