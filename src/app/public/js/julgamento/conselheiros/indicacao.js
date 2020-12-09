let dadosPlot;
let tableAptidao, tableIndicacao;
inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    elementosTabelas();
    initTabs();
    controleTabs();
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
  let tabledata = JSON.parse($('#tabelaIndicacao').attr('data-indicacao'));
  tabledata.forEach((r) => {
    r.Dias_na_Atividade = retornaDias(r.entradaAtividade);
    r.Dias_da_Dist = retornaDias(r.dtUltDist);
    r.Dias_da_SJ = retornaDias(r.dtSessao);
    r.DAAPS = parseInt($('#daps').text()) + r.Dias_na_Atividade;
  });
  dataTable(tabledata);
  dataTableAptidao();
}

//Tabela para Indicação
function dataTable(data) {
  let tabledata = data;
  table = new Tabulator('#tabelaIndicacao', {
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
      { column: 'contribuinte', dir: 'desc' },
      { column: 'processo', dir: 'desc' },
    ],
    downloadConfig: {
      columnCalcs: false,
    },
    columns: [
      {
        title: 'Indicar',
        formatter: formatIndica,
        cellClick: clickIndica,
        width: 100,
        minWidth: 100,
        hozAlign: 'center',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: false,
      },
      {
        title: 'Expandir',
        formatter: 'responsiveCollapse',
        width: 60,
        minWidth: 60,
        hozAlign: 'center',
        resizable: false,
        headerSort: false,
        responsive: 0,
        download: false,
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
        title: 'Horas CARF',
        field: 'HE',
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: somaCalc,
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
  table.addFilter('atividade', '=', 'Para Relatar');
  table.addFilter('situacao', '=', 'AGUARDANDO PAUTA');
  table.setSort('Dias_na_Atividade', 'desc');
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
let formatIndica = function formatIndica(cell) {
  return `<i class='classIndica fas fa-check-square'/>`;
};
function clickIndica(e, cell) {
  if (cell.getElement().style.color == 'green') {
    $('#cardSoma').slideUp(10).slideDown(10);
    +$('#somatorioHoras').html(
      +$('#somatorioHoras').html() - +cell.getRow().getData().HE,
    );
    cell.getElement().style.color = 'black';
    tableAptidao.deleteRow(
      tableAptidao.getRows().filter((row) => {
        return row.getData().processo == cell.getRow().getData().processo;
      }),
    );
  } else {
    $('#cardSoma').slideUp(10).slideDown(10);
    cell.getElement().style.color = 'green';
    +$('#somatorioHoras').html(
      +$('#somatorioHoras').html() + +cell.getRow().getData().HE,
    );
    cell.getRow().update({
      apto: false,
      vinculacao: false,
      abaixo: +cell.getRow().getData().valorOrig >= 8000000 ? false : true,
      sumula: false,
      liminar: false,
    });
    tableAptidao.updateOrAddData([cell.getRow().getData()]);
  }
}

function clickBool(e, cell) {
  if (cell.getValue() == false || !cell.getValue()) {
    cell.setValue(true, true);
  } else cell.setValue(false, true);
  console.log(
    `Liminar: ${cell.getRow().getData().liminar}, Abaixo: ${
      cell.getRow().getData().abaixo
    }, Sumula: ${cell.getRow().getData().sumula}, Vinculacao: ${
      cell.getRow().getData().vinculacao
    }, Apto: ${cell.getRow().getData().apto}`,
  );
  avaliaAptidao(cell);
}

function avaliaAptidao(cell) {
  cell.getRow().update({ apto: false });
  if (cell.getRow().getData().liminar === true) {
    cell.getRow().update({ apto: true });
  }
  if (
    cell.getRow().getData().liminar === false &&
    cell.getRow().getData().abaixo === true &&
    cell.getRow().getData().vinculacao === false
  ) {
    cell.getRow().update({ apto: true });
  }
  if (
    cell.getRow().getData().liminar === false &&
    cell.getRow().getData().abaixo === false &&
    cell.getRow().getData().sumula === true &&
    cell.getRow().getData().vinculacao === false
  ) {
    cell.getRow().update({ apto: true });
  }
}

function controleTabs() {
  $('#botaoIndica').click((e) => {
    $('#aptidaoTab').removeClass('disabled');
    $('.tabs').tabs('select', 'aptidao');
    tableAptidao.redraw();
    tableAptidao.redraw();
  });
  $('#aptidaoTab').click((e) => {
    tableAptidao.redraw();
    tableAptidao.redraw();
  });
}

function dataTableAptidao() {
  tableAptidao = new Tabulator('#tabelaAptidao', {
    data: [],
    pagination: 'local',
    height: '1000px',
    minHeight: '200px',
    maxHeight: '1000px',
    layout: 'fitData',
    responsiveLayout: false,
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [
      { column: 'Dias_na_Atividade', dir: 'desc' },
      { column: 'contribuinte', dir: 'desc' },
      { column: 'processo', dir: 'desc' },
    ],
    downloadConfig: {
      columnCalcs: false,
    },
    columns: [
      {
        title: 'Processo Apto?',
        field: 'apto',
        sorter: 'boolean',
        hozAlign: 'center',
        editor: false,
        formatter: 'tickCross',
        responsive: 0,
        download: true,
        headerTooltip:
          'Verificação automática baseada nas respostas das colunas.',
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
        responsive: 2,
        download: true,
      },
      {
        title: 'Contribuinte',
        field: 'contribuinte',
        formatter: coloreProc,
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'left',
        width: 150,
        editor: false,
        responsive: 0,
        download: true,
      },

      {
        title: 'Abaixo de 8 milhões?',
        field: 'abaixo',
        sorter: 'boolean',
        hozAlign: 'center',
        editor: false,
        formatter: 'tickCross',
        responsive: 0,
        cellClick: clickBool,
        download: true,
        headerTooltip:
          'O valor originário do processo é inferior a 8 (OITO) milhões de reais?',
      },
      {
        title: 'Súmula?',
        field: 'sumula',
        sorter: 'boolean',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        cellClick: clickBool,
        download: true,
        formatter: 'tickCross',
        headerTooltip:
          'O processo é objeto de súmula/ resolução do CARF ou tem decisão definitiva do STF /STJ conforme art. 53, § 2º RICARF?',
      },
      {
        title: 'Vinculação?',
        field: 'vinculacao',
        sorter: 'boolean',
        hozAlign: 'center',
        cellClick: clickBool,
        editor: false,
        responsive: 0,
        download: true,
        formatter: 'tickCross',
        headerTooltip:
          'O processo apto para sessão virtual tem vinculação por decorrência ou reflexo (art. 6º, §1º, II e III) a outro processo de sua relatoria que seja não apto?',
      },
      {
        title: 'Dec./Liminar?',
        field: 'liminar',
        sorter: 'boolean',
        cellClick: clickBool,
        formatter: 'tickCross',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
        headerTooltip:
          'Trata-se de decisão/liminar judicial para julgamento imediato?',
      },

      {
        title: 'Valor Originário',
        field: 'valorOrig',
        sorter: 'number',
        hozAlign: 'right',
        editor: false,
        formatter: formatValor,
        responsive: 0,
        download: true,
      },
      {
        title: 'Horas CARF',
        field: 'HE',
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: somaCalc,
        editor: false,
        responsive: 2,
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
        title: 'Dias na Atividade',
        field: 'Dias_na_Atividade',
        sorter: 'number',
        hozAlign: 'center',
        width: 140,
        topCalc: mediaCalc,
        editor: false,
        formatter: coloreDias,
        responsive: 2,
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
        responsive: 2,
        download: true,
      },

      {
        title: 'Assunto/Objeto',
        field: 'assunto',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Observações/Nome do Lote',
        field: 'obs',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Alegações',
        field: 'alegacoes',
        sorter: 'string',
        hozAlign: 'left',
        editor: true,
        responsive: 0,
        download: true,
      },
      {
        title: 'Questionamento',
        field: 'questionamento',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Prioridade',
        field: 'prioridade',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 2,
        download: true,
      },

      {
        title: 'Motivo da Prioridade',
        field: 'motPrior',
        sorter: 'string',
        hozAlign: 'left',
        editor: true,
        responsive: 2,
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
