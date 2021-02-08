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
  $(document).ready(function () {
    getRelatoriosInd('conselheiro');
    //formataDados();
    //graficoReinp();
  });

  function getRelatoriosInd(tipo) {
    $.ajax({
      url: `/julgamento/restrito/reinp/`,
      type: 'POST',
      data: {
        get: 'listagem',
      },
      beforeSend: function () {
        $('.progressReinp').toggle();
      },
    })
      .done(function (msg) {
        msg.forEach((m) => {
          $('#anosReinp').append(`
        <div class="col s12 m2">
            <div class="card hoverable cardAzul">
              <div class="card-content">
                <span class="card-title center"><a href='' id='reinp${m}' class='white-text'>${m}</a></span>
              </div>
            </div>
       `);
          $(`#reinp${m}`).click((e) => {
            e.preventDefault();
            tipo ? selectRelatoriosInd(m, tipo) : selectRelatoriosInd(m);
          });
        });
      })
      .fail(function (jqXHR, textStatus, msg) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      });
  }

  function selectRelatoriosInd(ano, tipo) {
    $.ajax({
      url: `/julgamento/restrito/reinp/`,
      type: 'POST',
      data: {
        get: 'relatorio',
        ano: ano,
        tipo: tipo,
      },
      beforeSend: function () {
        $('#tabelaReinp').val('');
        $('.progressReinp').toggle();
      },
    })
      .done(function (msg) {
        formataDados(msg[0]);
        $('.progressReinp').toggle();
      })
      .fail(function (jqXHR, textStatus, msg) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      });
  }
}
function formataDados(msg) {
  let T1 = somaTrimestre('1', msg);
  let T2 = somaTrimestre('2', msg);
  let T3 = somaTrimestre('3', msg);
  let T4 = somaTrimestre('4', msg);

  $('#horas1T').text(+T1.toFixed(2));
  $('#horas2T').text(+T2.toFixed(2));
  $('#horas3T').text(+T3.toFixed(2));
  $('#horas4T').text(+T4.toFixed(2));
  graficoReinpInd(msg);
  let arrayMes = msg.detalhamento ? msg.detalhamento : [{}];
  dataTableReinpDet(arrayMes.flat());
  document.getElementById('agrupaMes').addEventListener('click', function () {
    if (agrupadoReinp == false) {
      table.setGroupBy(['mes']);
      agrupadoReinp = true;
    } else {
      table.setGroupBy();
      agrupadoReinp = false;
    }
  });
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
        field: 'horasEfetivas',
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
//GRÁFICO REINP TRIMESTRAL
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
}
