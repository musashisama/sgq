inicializaComponentes();
initialSort = [{ column: 'HE', dir: 'desc' }];
function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    initTabs();
    elementosTabela();
    getRelatorios();
  });
}

function initTabs() {
  $('.tabs').tabs();
}

function getRelatorios() {
  $.ajax({
    url: `/julgamento/restrito/regap_consolidado/`,
    type: 'POST',
    data: {
      get: 'listagem',
    },
    beforeSend: function () {
      $('.progressEstoque').toggle();
    },
  })
    .done(function (msg) {
      msg.reverse().forEach((m) => {
        $('#dataRelEstoque').append(
          $('<option>', {
            value: m,
            text: moment.unix(m).format('DD/MM/YYYY'),
          }),
        );
        $('#dataRelEstoque').formSelect();
      });
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}

function elementosTabela() {
  document
    .getElementById('mostraColunasTurma')
    .addEventListener('click', function () {
      if (agrupadoT == false) {
        table.setGroupBy(['equipe']);
        agrupadoT = true;
      } else {
        table.setGroupBy();
        agrupadoT = false;
      }
    });
  $('#consultaEstoque').click((e) => {
    $('#tabelaEstoque').empty();

    selectRelatorios();
  });
}

function selectRelatorios() {
  $.ajax({
    url: `/julgamento/restrito/estoque_conselheiros/`,
    type: 'POST',
    data: {
      get: 'relatorio',
      dtRel: $('#dataRelEstoque option:selected').val(),
      semana: $('#semanaRelEstoque option:selected').val(),
    },
    beforeSend: function () {
      $('.progressEstoque').toggle();
    },
  })
    .done(function (msg) {
      $('.progressEstoque').toggle();
      $('.classProcessos').show();
      let parcial = [];
      msg.forEach((m) => {
        m.relatorio.forEach((r) => {
          if (
            r.atividade == 'Formalizar Voto Vencedor' ||
            (r.atividade == 'Para Relatar' && r.situacao == 'AGUARDANDO PAUTA')
          ) {
            parcial.push({
              cpf: m.conselheiro.cpf,
              nome: m.conselheiro.nome,
              equipe: m.conselheiro.equipe,
              HE: r.HE,
              valorOrig: r.valorOrig,
            });
          }
        });
      });
      let dados = d3
        .nest()
        .key((d) => {
          return d.cpf;
        })
        .sortKeys(d3.ascending)
        .rollup((v) => {
          return {
            HE: d3.sum(v, function (d) {
              return d.HE;
            }),
            Valor: d3.sum(v, function (d) {
              return d.valorOrig;
            }),
            qtdeProc: v.length,
          };
        })
        .entries(parcial);
      dados.forEach((dado) => {
        parcial.forEach((p) => {
          if (dado.key == p.cpf) {
            dado.cpf = dado.key;
            dado.nome = p.nome;
            dado.equipe = p.equipe;
            dado.HE = +dado.values.HE.toFixed(2);
            dado.Valor = +dado.values.Valor.toFixed(2);
            dado.qtdeProc = dado.values.qtdeProc;
            delete dado.key;
            delete dado.values;
          }
        });
      });
      console.log(dados);
      dataTable(dados);
      initElementos();
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      console.log(msg);
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}

function initSelect() {
  $('select').formSelect();
}

function dataTable(msg) {
  let tabledata = msg;
  table = new Tabulator('#tabelaEstoque', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: layout,
    responsiveLayout: 'collapse',
    downloadConfig: {
      columnCalcs: false,
    },
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [{ column: 'HE', dir: 'desc' }],
    columns: [
      {
        formatter: 'responsiveCollapse',
        width: 30,
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
        sorter: 'number',
        formatter: formatNome,
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Responsável',
        field: 'nome',
        sorter: 'string',
        width: 200,
        formatter: formatNome,
        hozAlign: 'left',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Equipe',
        field: 'equipe',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Quantidade',
        field: 'qtdeProc',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Carga em horas',
        field: 'HE',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: '',
        field: 'HE',
        sorter: 'number',
        hozAlign: 'left',
        width: 250,
        formatter: 'progress',
        formatterParams: {
          min: 0,
          max: 1000,
          color: function (value) {
            if (value <= 126) return 'red';
            if (value > 126 && value <= 252) return 'orange';
            if (value > 252) return 'green';
          },
        },
        download: false,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

function montaGraficos(msg) {
  dados = JSON.parse(msg);
  var layoutAtividade = {
    title: 'Processos por atividade',
    shapes: [],
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
  };
  let config = { responsive: true, displaylogo: false };

  let somatorio = d3
    .nest()
    .rollup((v) => {
      return [
        {
          y: 'Para Relatar - Aguardando Pauta',
          x: d3.sum(v, (d) => {
            if (
              d.Atividade == 'Para Relatar' &&
              d.Situacao == 'AGUARDANDO PAUTA'
            ) {
              return 1;
            }
          }),
        },
        {
          y: 'Para Relatar - Cancelado',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Para Relatar' && d.Situacao == 'CANCELADO') {
              return 1;
            }
          }),
        },
        {
          y: 'Para Relatar - Retirado de Pauta',
          x: d3.sum(v, (d) => {
            if (
              d.Atividade == 'Para Relatar' &&
              d.Situacao == 'RETIRADO DE PAUTA'
            ) {
              return 1;
            }
          }),
        },
        {
          y: 'Para Relatar - Pedido de Vista',
          x: d3.sum(v, (d) => {
            if (
              d.Atividade == 'Para Relatar' &&
              d.Situacao == 'PEDIDO DE VISTA'
            ) {
              return 1;
            }
          }),
        },
        {
          y: 'Para Relatar - Indicado para Pauta',
          x: d3.sum(v, (d) => {
            if (
              d.Atividade == 'Para Relatar' &&
              d.Situacao == 'INDICADO PARA PAUTA'
            ) {
              return 1;
            }
          }),
        },
        {
          y: 'Para Relatar - Em Sessão',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Para Relatar' && d.Situacao == 'EM SESSÃO') {
              return 1;
            }
          }),
        },
        {
          y: 'Para Relatar - Em Pauta',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Para Relatar' && d.Situacao == 'EM PAUTA') {
              return 1;
            }
          }),
        },
        {
          y: 'Formalizar Voto Vencedor',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Formalizar Voto Vencedor') {
              return 1;
            }
          }),
        },
        {
          y: 'Apreciar e Assinar Documento',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Apreciar e Assinar Documento') {
              return 1;
            }
          }),
        },
        {
          y: 'Formalizar Decisão',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Formalizar Decisao') {
              return 1;
            }
          }),
        },
        {
          y: 'Corrigir Decisão',
          x: d3.sum(v, (d) => {
            if (
              d.Atividade == 'Corrigir Decisao' ||
              d.Atividade == 'Corrigir Decisão'
            ) {
              return 1;
            }
          }),
        },
      ];
    })
    .entries(dados);

  let arrayDados = [];
  arrayDados.y = [];
  arrayDados.x = [];
  arrayDados.text = [];
  arrayDados.color = [];

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
  ];
  somatorio = somatorio.sort((a, b) => {
    return a.x - b.x;
  });
  somatorio.forEach((row, index) => {
    arrayDados.y.push(row.y);
    arrayDados.x.push(row.x);
    arrayDados.color.push(cores[index]);
    arrayDados.text.push(row.y);
  });
  arrayDados.type = 'bar';
  arrayDados.orientation = 'h';
  arrayDados.type = 'bar';
  arrayDados.fillcolor = 'cls';
  arrayDados.hovertemplate = `<i>Quantidade</i>: %{x:.d} processos<br>
                        <b>%{text}</b>`;
  arrayDados.marker = {
    color: arrayDados.color,
    width: 4,
    colorscale: 'Viridis',
    line: {},
  };
  Plotly.newPlot(
    document.getElementById('barrasAtividade'),
    [arrayDados],
    layoutAtividade,
    config,
  );
}
