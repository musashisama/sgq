let dadosPlot;
let AtivApes = false;
inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    getRelatorios({ get: 'listagem' });
    elementosTabelas();
    elementosApes749();
    initTabs();
    clickStats();
  });
}

function returnApes(data) {
  return data.apes == true;
}
function elementosApes749() {
  // $(`#apes749Check`).change(() => {
  //   if ($(`#apes749Check`).prop('checked')) {
  //     table.addFilter(returnApes);
  //   } else {
  //     table.removeFilter(returnApes);
  //   }
  // });
  document
    .getElementById('mostraColunasAtividadeApes')
    .addEventListener('click', function () {
      if (AtivApes == false) {
        tableApes.setGroupBy(['atividade']);
        AtivApes = true;
      } else {
        tableApes.setGroupBy();
        AtivApes = false;
      }
    });
  $('#xlsxDownApes').click(() => {
    tableApes.download('xlsx', `${$('#gerApes749').text()}.xlsx`, {
      sheetName: 'Relatório',
    });
  });
  $('#consultaRegap').click((e) => {
    selectRelatorios();
  });
}

function clickStats() {
  $('#stata').click(() => {
    setTimeout(() => {
      grafico(dadosPlot);
    }, 1000);
  });
}

function initTabs() {
  $('.tabs').tabs();
}

function getRelatorios(data) {
  $.ajax({
    url: `/julgamento/conselheiros/listaregap`,
    type: 'POST',
    data: data,
    beforeSend: function () {
      $('.progressRegap').toggle();
    },
  })
    .done(function (msg) {
      msg.forEach((m) => {
        $('#dataRelRegap').append(
          $('<option>', {
            value: m._id,
            text: moment.unix(m.dtRel).format('DD/MM/YYYY'),
          }),
        );
        $('#dataRelRegap').formSelect();
      });
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}

function elementosTabelas() {
  $('#listaProcApes').click((e) => {
    e.preventDefault();
    getApes('cons', dataTableApes);
  });
  $('.dataRelRegap').change(() => {
    $.ajax({
      url: `/julgamento/conselheiros/listaregap`,
      type: 'POST',
      data: {
        get: 'relatorio',
        idRel: $('#dataRelRegap option:selected').val(),
      },
      beforeSend: function () {
        $('.progressRegap').toggle();
      },
    })
      .done(function (msg) {
        $('.classProcessos').show();
        console.log(msg[0].relatorio);
        msg[0].relatorio.forEach((r) => {
          r.Dias_na_Atividade = retornaDias(r.entradaAtividade);
          r.Dias_da_Dist = retornaDias(r.dtUltDist);
          r.Dias_da_SJ = retornaDias(r.dtSessao);
          r.DAAPS = parseInt($('#daps').text()) + r.Dias_na_Atividade;
          r.diff = +r.apesHE - +r.HE;
        });
        // msg[0].relatorio.forEach((d) => {
        //   apes.forEach((a) => {
        //     if (a.Processo == d.processo) {
        //       d.solicitacao = a.solicitacao;
        //     }
        //   });
        // });
        dadosPlot = msg[0].relatorio;
        dataTable(msg[0].relatorio);
        //dataTableApes(msg[0].relatorio);
        grafico(msg[0].relatorio);
        $('.progressRegap').toggle();
      })
      .fail(function (jqXHR, textStatus, msg) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      });
  });
}

//TABELA REGAP
function dataTable(dados) {
  console.log(dados);
  let tabledata = dados;
  table = new Tabulator('#tabelaRegap', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitData',
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [
      { column: 'Dias_na_Atividade', dir: 'desc' },
      { column: 'processo', dir: 'desc' },
      { column: 'atividade', dir: 'desc' },
    ],
    downloadConfig: {
      columnCalcs: false,
    },
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
        title: 'Processo',
        field: 'processo',
        formatter: coloreProc,
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Contribuinte',
        field: 'contribuinte',
        formatter: coloreProc,
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'center',
        width: 150,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Ind. Apenso',
        field: 'apenso',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Atividade',
        field: 'atividade',
        sorter: 'string',
        hozAlign: 'center',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Situação de Julgamento',
        field: 'situacao',
        sorter: 'string',
        headerFilter: 'input',
        topCalc: countCalc,
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Entrada na Atividade',
        field: 'entradaAtividade',
        sorter: 'date',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Horas CARF',
        field: 'HE',
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: somaCalc,
        accessorDownload: numberConvert,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Dias na Atividade',
        field: 'Dias_na_Atividade',
        sorter: 'number',
        hozAlign: 'center',
        width: 140,
        topCalc: mediaCalc,
        editor: false,
        formatter: coloreDias,
        responsive: 0,
        download: true,
      },
      {
        title: 'Dias na Atividade na Próxima Sessão',
        field: 'DAAPS',
        sorter: 'number',
        width: 140,
        hozAlign: 'center',
        editor: false,
        formatter: coloreDias,
        responsive: 0,
        download: true,
      },
      {
        title: 'Valor Originário',
        field: 'valorOrig',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        accessorDownload: numberConvert,
        responsive: 0,
        download: true,
      },
      {
        title: 'Observações',
        field: 'obs',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Prioridade',
        field: 'prioridade',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Assunto',
        field: 'assunto',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },

      {
        title: 'Motivo da Prioridade',
        field: 'motPrior',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Alegações',
        field: 'alegacoes',
        sorter: 'string',
        cellClick: alegaJSON,
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },

      {
        title: 'Dias da Sessão de Julgamento',
        field: 'Dias_da_SJ',
        sorter: 'number',
        width: 150,
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: false,
      },
      {
        title: 'Data da Sessão de Julgamento',
        field: 'dtSessao',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: false,
      },
      {
        title: 'Dias da Última Distribuição',
        field: 'Dias_da_Dist',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: false,
      },
      {
        title: 'Retorno Sepoj?',
        field: 'Retorno_Sepoj',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Última Equipe',
        field: 'ultEquipe',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: false,
      },
      {
        title: 'Questionamento',
        field: 'questionamento',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Solicitação de Juntada?',
        field: 'juntada',
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

let formatValorDAPS = function (value, data, type, params, column) {
  let valor = calendario(value);
  return valor;
};
function formatDAPS(cell) {
  let value = calendario(cell.getValue());
  if (
    cell.getRow().getData().Atividade == 'Para Relatar' &&
    cell.getRow().getData().Situacao == 'AGUARDANDO PAUTA'
  ) {
    if (value >= 180) {
      cell.getElement().style.color = '#D8000C';
      cell.getElement().style.fontWeight = 'bolder';
    }
    if (value < 180 && value >= 140) {
      cell.getElement().style.color = 'rgb(245, 131, 0)';
      cell.getElement().style.fontWeight = 'bolder';
    }
    if (value < 140) {
      cell.getElement().style.color = 'rgb(63, 138, 2)';
      cell.getElement().style.fontWeight = 'bolder';
    }
  }

  if (
    cell.getRow().getData().Atividade == 'Formalizar Decisao' &&
    value >= 30
  ) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (cell.getRow().getData().Atividade == 'Formalizar Decisao' && value < 30) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (
    cell.getRow().getData().Atividade == 'Formalizar Voto Vencedor' &&
    value >= 30
  ) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (
    cell.getRow().getData().Atividade == 'Formalizar Voto Vencedor' &&
    value < 30
  ) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }

  if (
    cell.getRow().getData().Atividade == 'Apreciar e Assinar Documento' &&
    value >= 15
  ) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (
    cell.getRow().getData().Atividade == 'Apreciar e Assinar Documento' &&
    value < 15
  ) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (cell.getRow().getData().Atividade == 'Corrigir Decisão' && value >= 1) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  return value;
}
let downloadValorDAPS = function (value, data, type, params, column) {
  let valor = calendario(value);
  return valor;
};

function alegaJSON(e, cell) {
  $.ajax({
    url: '/julgamento/conselheiros/pega-alegacao',
    data: { idAlegacao: cell.getValue() },
    type: 'POST',
    success: function (result) {
      var toastHTML = `${JSON.stringify(result.descricao)}`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      window.open(
        `http://dispe.carf/tab-alegacoes/alegacoes/${result.codigo}`,
        '_blank',
      );
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro na criação da solicitação. Tente novamente.</span>`;

      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
    },
  });
}
function grafico(dados) {
  var layoutAtividade = {
    //title: 'Carga de Horas por atividade',
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
      r: 50,
      b: 50,
      t: 50,
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
              d.atividade == 'Para Relatar' &&
              d.situacao == 'AGUARDANDO PAUTA'
            ) {
              return d.HE;
            }
          }),
        },
        {
          y: 'Para Relatar - Cancelado',
          x: d3.sum(v, (d) => {
            if (d.atividade == 'Para Relatar' && d.situacao == 'CANCELADO') {
              return d.HE;
            }
          }),
        },
        {
          y: 'Para Relatar - Retirado de Pauta',
          x: d3.sum(v, (d) => {
            if (
              d.atividade == 'Para Relatar' &&
              d.situacao == 'RETIRADO DE PAUTA'
            ) {
              return d.HE;
            }
          }),
        },
        {
          y: 'Para Relatar - Pedido de Vista',
          x: d3.sum(v, (d) => {
            if (
              d.atividade == 'Para Relatar' &&
              d.situacao == 'PEDIDO DE VISTA'
            ) {
              return d.HE;
            }
          }),
        },
        {
          y: 'Para Relatar - Indicado para Pauta',
          x: d3.sum(v, (d) => {
            if (
              d.atividade == 'Para Relatar' &&
              d.situacao == 'INDICADO PARA PAUTA'
            ) {
              return d.HE;
            }
          }),
        },
        {
          y: 'Para Relatar - Em Sessão',
          x: d3.sum(v, (d) => {
            if (d.atividade == 'Para Relatar' && d.situacao == 'EM SESSÃO') {
              return d.HE;
            }
          }),
        },
        {
          y: 'Para Relatar - Em Pauta',
          x: d3.sum(v, (d) => {
            if (d.atividade == 'Para Relatar' && d.situacao == 'EM PAUTA') {
              return d.HE;
            }
          }),
        },
        {
          y: 'Formalizar Voto Vencedor',
          x: d3.sum(v, (d) => {
            if (d.atividade == 'Formalizar Voto Vencedor') {
              return d.HE;
            }
          }),
        },
        {
          y: 'Apreciar e Assinar Documento',
          x: d3.sum(v, (d) => {
            if (d.atividade == 'Apreciar e Assinar Documento') {
              return d.HE;
            }
          }),
        },
        {
          y: 'Formalizar Decisão',
          x: d3.sum(v, (d) => {
            if (d.atividade == 'Formalizar Decisao') {
              return d.HE;
            }
          }),
        },
        {
          y: 'Corrigir Decisão',
          x: d3.sum(v, (d) => {
            if (
              d.atividade == 'Corrigir Decisao' ||
              d.atividade == 'Corrigir Decisão'
            ) {
              return d.HE;
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
  arrayDados.hovertemplate = `<i>Carga</i>: %{x:.d} Horas CARF<br>
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

function dataTableApes(msg) {
  console.log(msg);
  let tabledataApes = msg;
  tableApes = new Tabulator('#tabelaApes', {
    data: msg,
    minHeight: '300px',
    maxHeight: '1000px',
    height: '900px',
    layout: 'fitDataFill',
    paginationInitialPage: 1,
    downloadConfig: {
      columnCalcs: false,
    },
    groupStartOpen: true,
    initialSort: [{ column: 'solicitacao', dir: 'desc' }],
    columns: [
      {
        title: 'Processo',
        field: 'processo',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        download: true,
        width: 200,
      },

      {
        title: 'Atividade',
        field: 'atividade',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        width: 150,
        download: true,
      },
      {
        title: 'Situação de Julgamento',
        field: 'situacao',
        sorter: 'string',
        headerFilter: 'input',
        topCalc: countCalc,
        hozAlign: 'center',
        editor: false,
        width: 150,
      },
      {
        title: 'Diferença',
        field: 'diff',
        sorter: 'number',
        hozAlign: 'center',
        formatter: formatDiff,
        headerFilter: 'input',
        topCalc: somaCalc,
        accessorDownload: numberConvert,
        editor: false,
        width: 100,
        download: true,
      },
      // {
      //   title: 'Solicitação',
      //   field: 'solicitacao',
      //   sorter: 'number',
      //   hozAlign: 'center',
      //   //formatter: coloreApes,
      //   headerFilter: 'input',
      //   editor: false,
      //   width: 100,
      //   download: true,
      // },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

let formatDiff = function formatDiff(cell) {
  const valor = +cell.getRow().getData().diff;

  return `${valor.toFixed(2)}`;
};
