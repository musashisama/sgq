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
    montaReinp();
    initTabs();
  });
}

function initTabs() {
  $('.tabs').tabs();
}
function initSelect() {
  $('select').formSelect();
}

function montaReinp() {
  document
    .getElementById('mostraColunas')
    .addEventListener('click', function () {
      if (agrupadoT == false) {
        table.setGroupBy(['unidade']);
        agrupadoT = true;
      } else {
        table.setGroupBy();
        agrupadoT = false;
      }
    });
  let reinp = d3
    .nest()
    .key((k) => {
      return k.conselheiro.nome;
    })
    .entries(JSON.parse($('#reinpData').attr('data-reinp')));
  let dadosTabela = [];
  reinp.forEach((elem) => {
    dadosTabela.push({
      nome: elem.key,
      cpf: elem.values[0].conselheiro.cpf,
      unidade: elem.values[0].unidade,
      mediaHorasT1: elem.values.length >= 1 ? elem.values[0].mediaHoras : 0,
      mediaHorasT2: elem.values.length >= 2 ? elem.values[1].mediaHoras : 0,
      mediaHorasT3: elem.values.length >= 3 ? elem.values[2].mediaHoras : 0,
      mediaHorasT4: elem.values.length >= 4 ? elem.values[3].mediaHoras : 0,
      T1:
        elem.values.length >= 1
          ? somaTrimestre(`T1${new Date().getFullYear()}`, elem.values[0])
          : 0,
      T2:
        elem.values.length >= 2
          ? somaTrimestre(`T2${new Date().getFullYear()}`, elem.values[1])
          : 0,
      T3:
        elem.values.length >= 3
          ? somaTrimestre(`T3${new Date().getFullYear()}`, elem.values[2])
          : 0,
      T4:
        elem.values.length >= 4
          ? somaTrimestre(`T4${new Date().getFullYear()}`, elem.values[3])
          : 0,
      Jan:
        elem.values.length >= 1
          ? +somaMes(`${new Date().getFullYear()}-01`, elem.values[0])
          : 0,
      Fev:
        elem.values.length >= 1
          ? +somaMes(`${new Date().getFullYear()}-02`, elem.values[0])
          : 0,
      Mar:
        elem.values.length >= 1
          ? +somaMes(`${new Date().getFullYear()}-03`, elem.values[0])
          : 0,
      Abr:
        elem.values.length >= 2
          ? +somaMes(`${new Date().getFullYear()}-04`, elem.values[1])
          : 0,
      Mai:
        elem.values.length >= 2
          ? +somaMes(`${new Date().getFullYear()}-05`, elem.values[1])
          : 0,
      Jun:
        elem.values.length >= 2
          ? +somaMes(`${new Date().getFullYear()}-06`, elem.values[1])
          : 0,
      Jul:
        elem.values.length >= 3
          ? +somaMes(`${new Date().getFullYear()}-07`, elem.values[2])
          : 0,
      Ago:
        elem.values.length >= 3
          ? +somaMes(`${new Date().getFullYear()}-08`, elem.values[2])
          : 0,
      Set:
        elem.values.length >= 3
          ? somaMes(`${new Date().getFullYear()}-09`, elem.values[2])
          : 0,
      Out:
        elem.values.length >= 4
          ? +somaMes(`${new Date().getFullYear()}-10`, elem.values[3])
          : 0,
      Nov:
        elem.values.length >= 4
          ? +somaMes(`${new Date().getFullYear()}-11`, elem.values[3])
          : 0,
      Dez:
        elem.values.length >= 4
          ? +somaMes(`${new Date().getFullYear()}-12`, elem.values[3])
          : 0,
    });
  });

  dataTable(dadosTabela);
}

function somaMes(mes, processos) {
  let soma = 0;
  processos.detalhamento.forEach((p) => {
    if (p.mes == mes) {
      if (p.horasEfetivas == 7.8) {
        p.horasEfetivas = 8;
      }
      soma += p.horasEfetivas;
    }
  });
  return +soma.toFixed(2);
}

function somaTrimestre(trimestre, processos) {
  let soma = 0;
  processos.detalhamento.forEach((p) => {
    if (processos.trimestre == trimestre) {
      if (p.horasEfetivas == 7.8) {
        p.horasEfetivas = 8;
      }
      soma += p.horasEfetivas;
    }
  });
  return +soma.toFixed(2);
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
        field: 'Jan',
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
        field: 'Fev',
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
        field: 'Mar',
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
        field: 'Abr',
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
        field: 'Mai',
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
        field: 'Jun',
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
        field: 'Jul',
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
        field: 'Ago',
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
        field: 'Set',
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
        field: 'Out',
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
        field: 'Nov',
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
        field: 'Dez',
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
dados = JSON.parse($('#reinpData').attr('data-reinp'));
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
