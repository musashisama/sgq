inicializaComponentes();
let langs = {
  'pt-br': {
    columns: {
      nome: 'Nome', //replace the title of column name with the value "Name"
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
      default: 'Filtrar por esta coluna', //default header filter placeholder text
      columns: {
        nome: 'Filtrar por nome', //replace default header filter text for column name
      },
    },
  },
};
let toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['link'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['clean'],
];
let options = {
  modules: {
    toolbar: toolbarOptions,
    history: {
      delay: 2500,
      userOnly: true,
    },
  },
  theme: 'snow',
};

layout = 'fitDataFill';
let responsiveLayout = true;
let tableReinp,
  table = null;
let d3 = Plotly.d3;
let agrupado = false;
let agrupadoReinp = false;

function inicializaComponentes() {
  document.getElementById('agrupaMes').addEventListener('click', function () {
    if (agrupado == false) {
      table.setGroupBy(['mes']);
      agrupado = true;
    } else {
      table.setGroupBy();
      agrupado = false;
    }
  });
  $(document).ready(function () {
    let indicacoes = JSON.parse($('#idProdutividade').attr('data-indicacoes'));
    let solicitacoes = JSON.parse(
      $('#idProdutividade').attr('data-solicitacoes'),
    );
    let processos = [];
    if (indicacoes.length > 0) {
      indicacoes.forEach((i) => {
        i.processos.forEach((p) => {
          processos.push({
            // multiplicador: retornaMultiplicador(
            //   retornaTrimestre(i.mesIndicacao),
            // ),
            processo: p.processo,
            he: +p.HE,
            mes: i.mesIndicacao,
            contribuinte: p.contribuinte,
            tipo: p.questionamento,
            trimestre: retornaTrimestre(i.mesIndicacao),
          });
        });
      });
    }
    if (solicitacoes.length > 0) {
      solicitacoes.forEach((s) => {
        processos.push({
          // multiplicador: retornaMultiplicador(
          //   retornaTrimestre(retornaMes(s.dados.trimestreREINP)),
          // ),
          processo: s.uniqueId,
          he: s.dados.horasReducao
            ? +s.dados.horasReducao
            : 0 + s.dados.somatorioHoras
            ? +s.dados.somatorioHoras
            : 0,
          mes: retornaMes(s.dados.trimestreREINP),
          //trimestre: '0' + s.dados.trimestreREINP,
          trimestre: retornaTrimestre(retornaMes(s.dados.trimestreREINP)),
          contribuinte: s.tipo,
          tipo: 'Solicitação SGI',
        });
      });
    }
    let T1 = somaTrimestre('1', processos);
    let T2 = somaTrimestre('2', processos);
    let T3 = somaTrimestre('3', processos);
    let T4 = somaTrimestre('4', processos);
    $('#horas1T').text(+T1.toFixed(2));
    $('#horas2T').text(+T2.toFixed(2));
    $('#horas3T').text(+T3.toFixed(2));
    $('#horas4T').text(+T4.toFixed(2));
    $('#extratoREINP').append(`${separaProcSol('1', processos)}</br>`);
    $('#extratoREINP').append(`${separaProcSol('2', processos)}</br>`);
    $('#extratoREINP').append(`${separaProcSol('3', processos)}</br>`);
    $('#extratoREINP').append(`${separaProcSol('4', processos)}</br>`);
    dataTableReinpDet(processos);
    //formataDados();
    //graficoReinp();
  });
}

function retornaMultiplicador(trimestre) {
  let indicacoes = JSON.parse($('#idProdutividade').attr('data-indicacoes'));
  indicacoes.forEach((i) => {
    console.log(retornaTrimestre(i.mesIndicacao));
    if (retornaTrimestre(i.mesIndicacao) == trimestre) {
      console.log(i.funcao);
      // if (i.funcao != 'undefined') {
      //   if (!i.funcao.includes('Vice', 0)) {
      //     if (
      //       i.funcao.includes('Presidente de TO', 0) ||
      //       i.funcao.includes('Presidente de TO Substituto', 0) ||
      //       i.funcao.includes('Presidente de TE', 0) ||
      //       i.funcao.includes('Presidente de TE Substituto', 0) ||
      //       i.funcao.includes('Presidente de Seção de Julgamento', 0) ||
      //       i.funcao.includes('Presidente do CARF', 0) ||
      //       i.funcao.includes('Presidente de Seção de Julgamento Substituto', 0)
      //     ) {
      //       console.log('1.5');
      //     } else console.log('1');
      //   }
      // }
    }
  });
}

function retornaMes(trimestre) {
  if (trimestre.includes('1/')) {
    ano = trimestre.split('/');
    return `01/${ano[1]}`;
  }
  if (trimestre.includes('2/')) {
    ano = trimestre.split('/');
    return `04/${ano[1]}`;
  }
  if (trimestre.includes('3/')) {
    ano = trimestre.split('/');
    return `07/${ano[1]}`;
  }
  if (trimestre.includes('4/')) {
    ano = trimestre.split('/');
    return `10/${ano[1]}`;
  }
}

function retornaTrimestre(mes) {
  if (mes.includes('1/') || mes.includes('2/') || mes.includes('3/')) {
    return '1';
  }
  if (mes.includes('4/') || mes.includes('5/') || mes.includes('6/')) {
    return '2';
  }
  if (mes.includes('7/') || mes.includes('8/') || mes.includes('9/')) {
    return '3';
  }
  if (mes.includes('10/') || mes.includes('11/') || mes.includes('12/')) {
    return '4';
  }
}

function somaTrimestre(trimestre, processos) {
  let soma = 0;
  processos.forEach((p) => {
    // if (p.trimestre == trimestre && p.retorno == 'NÃO') {
    if (p.trimestre == trimestre) {
      soma += p.he;
    }
  });
  return +soma.toFixed(2);
}
function dataTableReinpDet(msg) {
  table = new Tabulator('#tabelaReinpDet', {
    data: msg,
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
        hozAlign: 'center',
        resizable: true,
        headerSort: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Processo',
        field: 'processo',
        width: 150,
        minWidth: 130,
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Trimestre de Indicação',
        field: 'trimestre',
        sorter: 'string',
        hozAlign: 'center',
        topCalc: countCalc,
        headerFilter: 'input',
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
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Contribuinte',
        field: 'contribuinte',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Horas Efetivas',
        field: 'he',
        topCalc: somaCalc,
        sorter: 'number',
        hozAlign: 'center',
        mutator: formatValorReinp,
        accessorDownload: downloadValorReinp,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Código',
        field: 'tipo',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Descrição',
        field: 'obs',
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
  tableReinp = table;
  //separaProcSol(tableReinp.getData());
}

function separaProcSol(trimestre, processos) {
  let solicitacoes = [],
    indicados = [];
  processos.forEach((p) => {
    if (p.tipo.includes('SGI')) {
      solicitacoes.push(p);
    } else indicados.push(p);
  });
  return `${trimestre}º trimestre: ${somaTrimestre(
    trimestre,
    indicados,
  )} horas indicadas e ${somaTrimestre(
    trimestre,
    solicitacoes,
  )} horas de solicitações.`;
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
function somaCalc(values, data, calcParams) {
  var calc = 0;
  let valor = 0;
  values.forEach(function (value) {
    if (value > 0) {
      valor += value;
      calc++;
    }
  });

  return `𝚺: ${valor.toFixed(2)}`;
}

//GRÁFICO REINP MENSAL
function dadosGrafico(dados) {
  let arrayMes = [];
  dados.forEach((elem) => {
    elem.forEach((ele) => {
      arrayMes.push(ele);
    });
  });
  return d3
    .nest()
    .rollup((v) => {
      return {
        Jan: d3.sum(v, (d) => {
          if (d.mes == `01/${d.ano}`) {
            return d.he;
          }
        }),
        Fev: d3.sum(v, (d) => {
          if (d.mes == `02/${d.ano}`) {
            return d.he;
          }
        }),
        Mar: d3.sum(v, (d) => {
          if (d.mes == `03/${d.ano}`) {
            return d.he;
          }
        }),
        Abr: d3.sum(v, (d) => {
          if (d.mes == `04/${d.ano}`) {
            return d.he;
          }
        }),
        Mai: d3.sum(v, (d) => {
          if (d.mes == `05/${d.ano}`) {
            return d.he;
          }
        }),
        Jun: d3.sum(v, (d) => {
          if (d.mes == `06/${d.ano}`) {
            return d.he;
          }
        }),
        Jul: d3.sum(v, (d) => {
          if (d.mes == `07/${d.ano}`) {
            return d.he;
          }
        }),
        Ago: d3.sum(v, (d) => {
          if (d.mes == `08/${d.ano}`) {
            return d.he;
          }
        }),
        Set: d3.sum(v, (d) => {
          if (d.mes == `09/${d.ano}`) {
            return d.he;
          }
        }),
        Out: d3.sum(v, (d) => {
          if (d.mes == `10/${d.ano}`) {
            return d.he;
          }
        }),
        Nov: d3.sum(v, (d) => {
          if (d.mes == `11/${d.ano}`) {
            return d.he;
          }
        }),
        Dez: d3.sum(v, (d) => {
          if (d.mes == `12/${d.ano}`) {
            return d.he;
          }
        }),
      };
    })
    .entries(arrayMes);
}
//GRÁFICO REINP TRIMESTRAL
function dadosGrafico(dados) {
  let arrayMes = dados;
  return d3
    .nest()
    .rollup((v) => {
      return {
        Jan: d3.sum(v, (d) => {
          if (d.mes == `01/${d.ano}`) {
            return d.he;
          }
        }),
        Fev: d3.sum(v, (d) => {
          if (d.mes == `02/${d.ano}`) {
            return d.he;
          }
        }),
        Mar: d3.sum(v, (d) => {
          if (d.mes == `03/${d.ano}`) {
            return d.he;
          }
        }),
        Abr: d3.sum(v, (d) => {
          if (d.mes == `04/${d.ano}`) {
            return d.he;
          }
        }),
        Mai: d3.sum(v, (d) => {
          if (d.mes == `05/${d.ano}`) {
            return d.he;
          }
        }),
        Jun: d3.sum(v, (d) => {
          if (d.mes == `06/${d.ano}`) {
            return d.he;
          }
        }),
        Jul: d3.sum(v, (d) => {
          if (d.mes == `07/${d.ano}`) {
            return d.he;
          }
        }),
        Ago: d3.sum(v, (d) => {
          if (d.mes == `08/${d.ano}`) {
            return d.he;
          }
        }),
        Set: d3.sum(v, (d) => {
          if (d.mes == `09/${d.ano}`) {
            return d.he;
          }
        }),
        Out: d3.sum(v, (d) => {
          if (d.mes == `10/${d.ano}`) {
            return d.he;
          }
        }),
        Nov: d3.sum(v, (d) => {
          if (d.mes == `11/${d.ano}`) {
            return d.he;
          }
        }),
        Dez: d3.sum(v, (d) => {
          if (d.mes == `12/${d.ano}`) {
            return d.he;
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

function graficoReinpInd(msg) {
  let graf = dadosGrafico(msg);
  let graf2 = dadosGrafico2(msg);
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
      l: 75,
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
}
