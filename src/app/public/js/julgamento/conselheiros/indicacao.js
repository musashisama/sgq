let dadosPlot;
let tabAlegacoes = JSON.parse($('#dataAlega').attr('data-alega'));
let dadosPauta = JSON.parse($('#dataPauta').attr('data-pauta'));
let dadosIndicacao = [];
let tableAptidao, tableIndicacao, tableConfirmacao;
inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    elementosTabelas();
    initTabs();
    initCollapsible();
    initSelect();
    controleTabs();
    downloadPauta();
  });
}

function downloadPauta() {
  $('.dropdownDownloadPauta').dropdown({
    coverTrigger: false,
    hover: false,
    constrainWidth: false,
  });
  $('.pdfDown').click(() => {
    tableAptidao.download('pdf', `${$('.titulo').text()}.pdf`, {
      orientation: 'portrait',
      title: `${$('.titulo').text()}`,
      format: 'a4',
    });
  });
  $('.csvDownPauta').click(() => {
    tableAptidao.download('csv', `${$('.titulo').text()}.csv`);
  });
  $('.xlsxDownPauta').click(() => {
    tableAptidao.download('xlsx', `Indicacao_Pauta.xlsx`, {
      sheetName: 'Indicação para Pauta',
    });
  });
}

function initSelect() {
  $('select').formSelect();
}

function initTabs() {
  $('.tabs').tabs();
}

function initCollapsible() {
  $(document).ready(function () {
    $('.collapsible').collapsible();
  });
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

function shiftAlega(alegacoes) {
  let array = alegacoes.split(',');
  array.shift();
  return array;
}

function elementosTabelas() {
  let tabledata = JSON.parse($('#tabelaIndicacao').attr('data-indicacao'));
  $('#mespauta').text(dadosPauta.mesIndicacao);
  tabledata.forEach((r) => {
    r.Dias_na_Atividade = retornaDias(r.entradaAtividade);
    r.Dias_da_Dist = retornaDias(r.dtUltDist);
    r.Dias_da_SJ = retornaDias(r.dtSessao);
    r.DAAPS = parseInt($('#daps').text()) + r.Dias_na_Atividade;
    r.confirmaQuest = 'Correto';
    r.comParadigma =
      r.assunto.includes('PARADIGMA') ||
      r.assunto.includes('paradigma') ||
      r.assunto.includes('Paradigma')
        ? 'Processo Paradigma - Complexidade Média'
        : 'Processo não é Paradigma - Complexidade Média';
    r.alegacoes = r.alegacoes.replace(';', ',');
    //r.alegacoes = r.alegacoes.replace(',', '/');
    r.alegaPrim =
      r.alegacoes != null || r.alegacoes != ''
        ? r.alegacoes.split(',')[0]
        : r.alegacoes;
    r.alegaSec =
      r.alegacoes != null || r.alegacoes != ''
        ? shiftAlega(r.alegacoes)
        : r.alegacoes;
    r.reinp = true;
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
    // paginationSize: 10,
    //paginationSizeSelector: [10, 25, 50, 100, true],
    height: '1000px',
    minHeight: '200px',
    maxHeight: '100%',
    layout: 'fitData',
    //responsiveLayout: 'collapse',
    groupStartOpen: false,
    selectable: true,
    rowSelected: function (row) {
      +$('#somatorioHoras').html(
        +$('#somatorioHoras').html() + +row.getData().HE,
      );
      row.update({
        apto: false,
        vinculacao: false,
        abaixo: false,
        sumula: false,
        liminar: false,
      });
      tableAptidao.updateOrAddData([row.getData()]);
    },
    rowDeselected: function (row) {
      +$('#somatorioHoras').html(
        +$('#somatorioHoras').html() - +row.getData().HE,
      );
      if (table.getSelectedRows().length == 0) {
        +$('#somatorioHoras').html(0);
      }
      tableAptidao.deleteRow(
        tableAptidao.getRows().filter((rowAptidao) => {
          return rowAptidao.getData().processo == row.getData().processo;
        }),
      );
    },
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [
      { column: 'Dias_na_Atividade', dir: 'desc' },
      { column: 'assunto', dir: 'desc' },
      { column: 'contribuinte', dir: 'desc' },
    ],
    downloadConfig: {
      columnCalcs: false,
    },
    columns: [
      {
        title: 'Processo',
        field: 'processo',
        formatter: coloreProc,
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        //topCalc: countCalc,
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
        title: 'Equipe Processo',
        field: 'equipeProcesso',
        width: 200,
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        topCalc: countCalc,
        responsive: 0,
        formatter: formataTESuperior,
        download: true,
      },
      {
        title: 'Horas CARF',
        field: 'HE',
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        //topCalc: somaCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Entrada na Atividade',
        field: 'entradaAtividade',
        sorter: 'date',
        width: 140,
        hozAlign: 'center',
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
        //topCalc: mediaCalc,
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
        title: 'Valor do Processo',
        field: 'valor',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        accessorDownload: numberConvert,
        responsive: 0,
        download: true,
      },
      // {
      //   title: 'Valor Original',
      //   field: 'valorOriginal',
      //   sorter: 'number',
      //   hozAlign: 'center',
      //   editor: false,
      //   formatter: formatValor,
      //   accessorDownload: numberConvert,
      //   responsive: 1,
      //   download: true,
      // },
      {
        title: 'Observações',
        field: 'obs',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Assunto',
        field: 'assunto',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
        download: true,
      },
      // {
      //   title: 'Valor Originário Lançado/Pleiteado',
      //   field: 'valorOrig',
      //   sorter: 'number',
      //   hozAlign: 'center',
      //   editor: false,
      //   formatter: formatValor,
      //   accessorDownload: numberConvert,
      //   responsive: 1,
      //   download: true,
      // },
      // {
      //   title: 'Valor Crédito Lançado (Multa de Ofício)',
      //   field: 'valorCrdLanc',
      //   sorter: 'number',
      //   hozAlign: 'center',
      //   editor: false,
      //   formatter: formatValor,
      //   accessorDownload: numberConvert,
      //   responsive: 1,
      //   download: true,
      // },
      // {
      //   title:
      //     'Imposto Projetado Sobre Lançamento de Reduções de Base de Cálculo e/ou de Imposto',
      //   field: 'impostoProj',
      //   sorter: 'number',
      //   hozAlign: 'center',
      //   editor: false,
      //   formatter: formatValor,
      //   accessorDownload: numberConvert,
      //   responsive: 1,
      //   download: true,
      // },
      // {
      //   title: 'Valor Sem TJM (Atual)',
      //   field: 'valorSemTJM',
      //   sorter: 'number',
      //   hozAlign: 'center',
      //   editor: false,
      //   formatter: formatValor,
      //   accessorDownload: numberConvert,
      //   responsive: 1,
      //   download: true,
      // },
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
        title: 'Questionamento',
        field: 'questionamento',
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
    cell.getElement().style.color = 'green';
    +$('#somatorioHoras').html(
      +$('#somatorioHoras').html() + +cell.getRow().getData().HE,
    );
    cell.getRow().update({
      apto: false,
      vinculacao: false,
      abaixo: false,
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
  $('#botaoVerifica').click((e) => {
    tableAptidao.redraw();
    const formato = {
      style: 'currency',
      currency: 'BRL',
      useGrouping: true,
      localeMatcher: 'best fit',
    };
    dadosIndicacao = tableAptidao.getData();
    let alegacaoNula = 0;
    let alegacaoErrada = 0;
    dadosIndicacao.forEach((p) => {
      console.log(p.alegTributo);
      if (p.confirmaQuest != 'Correto') {
        p.questionamento = p.confirmaQuest;
      }
      if (p.alegaPrim == '' || p.alegaPrim == null) {
        alegacaoNula += 1;
      }
      if (p.alegMateria == '' || p.alegTema == '' || p.alegTributo == '') {
        alegacaoNula += 1;
      }
      if (
        p.alegMateria == 'Não encontrado' ||
        p.alegTema == 'Não encontrado' ||
        p.alegTributo == 'Não encontrado'
      ) {
        alegacaoErrada += 1;
      }
      if (
        typeof p.alegMateria == 'undefined' ||
        typeof p.alegTema == 'undefined' ||
        typeof p.alegTributo == 'undefined'
      ) {
        alegacaoErrada += 1;
      }
    });
    if (alegacaoNula > 0 || alegacaoErrada > 0) {
      var toastHTML0 = `<span>Há ${alegacaoErrada} processos com alegação(ões) incorreta(s) ou não preenchida(s).</span>`;
      M.toast({ html: toastHTML0, classes: 'rounded', timeRemaining: 5000 });
      // var toastHTML = `<span>Há ${alegacaoNula} processo(s) com alegação(ões) não preenchida(s) e ${alegacaoErrada} processos com alegações erradas.</span>`;
      // M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 5000 });
      var toastHTML2 = `É necessário preencher as alegações faltantes e corrigir as erradas para efetuar a confirmação da indicação para pauta.</span>`;
      M.toast({ html: toastHTML2, classes: 'rounded', timeRemaining: 5000 });
    } //AQUI VERIFICAÇÂO DE JUNTADA
    else {
      dadosIndicacao.forEach((t) => {
        $('#tabelaConfirmacao').append(
          `
        <div class='row'>
        <h6><strong>Processo:</strong> ${
          t.processo
        } - <strong>Contribuinte:</strong> ${t.contribuinte}</h6>
        <p><strong>Horas CARF:</strong> ${t.HE}</p>
        <p><strong>Valor Original:</strong> ${t.valorOriginal.toLocaleString(
          'pt-BR',
          formato,
        )}</p>
        <!--<p><strong>Processo Apto?</strong> ${
          t.apto == true ? 'Sim' : 'Não'
        }</p>-->
        <p><strong>Questionamento: </strong> ${
          t.confirmaQuest == 'Correto' ? t.questionamento : t.confirmaQuest
        }</p>
        <p><strong>Alegações: </strong> ${
          t.alegaPrim == '' || t.alegaPrim == null
            ? '<strong><span class="red-text">Não preenchida</span></strong>'
            : t.alegaPrim
        }</p>
        <p><strong>Complexidade e Indicação de Paradigma:</strong> ${
          t.comParadigma
        }</p>
        <p><strong>Equipe da Indicação:</strong> ${t.equipeProcesso}</p>
        </div>
        `,
        );
      });
      $('#confirmacaoTab').removeClass('disabled');
      $('.tabs').tabs('select', 'confirmacao');
    }
  });

  $('#botaoConfirma').click((e) => {
    $('#confirmacaoTab').removeClass('disabled');
    $('.tabs').tabs('select', 'confirmacao');
    let dadosUser = JSON.parse($('#dataUser').attr('data-user'));
    let dadosGravacao = {};
    dadosGravacao.cpf = dadosUser.cpf;
    dadosGravacao.nome = dadosUser.nome;
    dadosGravacao.colegiado = dadosIndicacao[0].equipeProcesso;
    dadosGravacao.mesIndicacao = dadosPauta.mes + '/' + dadosPauta.ano;
    dadosGravacao.idIndicacao = dadosPauta._id;
    dadosGravacao.processos = dadosIndicacao;
    console.log(dadosGravacao);
    gravaIndicacao(dadosGravacao);
    tableAptidao.redraw();
  });

  $('#alegaTab').click((e) => {
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
    maxHeight: '100%',
    layout: 'fitData',
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    index: 'processo',
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [
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
        download: false,
        visible: false,
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
        responsive: 0,
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
        title: `Abaixo de ${minimoAptoString}`,
        field: 'abaixo',
        sorter: 'boolean',
        hozAlign: 'center',
        editor: false,
        formatter: 'tickCross',
        responsive: 0,
        cellClick: clickBool,
        download: false,
        visible: false,
        headerTooltip: `O valor originário do processo é inferior a ${minimoAptoString}`,
      },
      {
        title: 'Súmula?',
        field: 'sumula',
        sorter: 'boolean',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        cellClick: clickBool,
        download: false,
        visible: false,
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
        download: false,
        visible: false,
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
        title: 'Valor do Processo',
        field: 'valor',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        accessorDownload: numberConvert,
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
        title: 'Questionamento',
        field: 'questionamento',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Questionamento Correto?',
        field: 'confirmaQuest',
        hozAlign: 'center',
        editor: 'select',
        editorParams: {
          values: [
            'Correto',
            'Recurso Voluntário',
            'Recurso de Ofício',
            'Recurso Voluntário/Ofício',
            'Recurso Especial da Procuradoria',
            'Recurso Especial do Contribuinte',
            'Recurso Especial Procuradoria/Contribuinte',
            'Embargo da Procuradoria',
            'Embargo do Contribuinte',
            'Embargo Procuradoria/Contribuinte',
          ],
          defaultValue: 'Correto',
        },
        responsive: 0,
        download: true,
      },
      {
        title: 'Complexidade e Paradigma',
        field: 'comParadigma',
        hozAlign: 'center',
        editor: 'select',
        width: 250,
        editorParams: {
          values: [
            'Processo Paradigma - Complexidade Baixa',
            'Processo Paradigma - Complexidade Média',
            'Processo Paradigma - Complexidade Alta',
            'Processo não é Paradigma - Complexidade Baixa',
            'Processo não é Paradigma - Complexidade Média',
            'Processo não é Paradigma - Complexidade Alta',
          ],
          defaultValue: 'Processo não é Paradigma - Complexidade Média',
        },
        responsive: 0,
        download: true,
      },
      {
        title: 'Alegação Principal',
        field: 'alegaPrim',
        sorter: 'string',
        hozAlign: 'left',
        //  editorParams: {
        //     search: true,
        //     mask: '99.999.9999',
        //     elementAttributes: {
        //       maxlength: '11', //set the maximum character length of the input element to 10 characters
        //     },
        //   },
        cellEdited: alegEdita,
        //accessor: alegaPrim,
        //validator: 'required',
        editor: true,
        width: 180,
        responsive: 0,
        download: true,
      },
      {
        title: 'Tributo',
        field: 'alegTributo',
        sorter: 'string',
        hozAlign: 'left',
        formatter: alegTributo,
        editor: false,
        width: 180,
        responsive: 0,
        download: true,
      },
      {
        title: 'Matéria',
        field: 'alegMateria',
        formatter: alegMateria,
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        width: 180,
        responsive: 0,
        download: true,
      },
      {
        title: 'Tema',
        field: 'alegTema',
        formatter: alegTema,
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        width: 180,
        responsive: 0,
        download: true,
      },
      {
        title: 'Demais Alegações (separar por vírgulas)',
        field: 'alegaSec',
        sorter: 'string',
        hozAlign: 'left',
        //validator: 'required',
        editor: true,
        width: 250,
        responsive: 0,
        download: true,
        headerTooltip: 'Caso haja mais de um código, separe por barras (/).',
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

let alegaPrim = function alegaPrim(cell) {
  if (cell.getValue() != null || cell.getValue() != '') {
    return cell.getValue();
  } else return cell.getValue();
};

let alegEdita = function alegEdita(cell) {
  console.log(cell.getRow().getData().processo);
  alegMateria(cell), alegTema(cell), alegTributo(cell);
  tableAptidao.redraw();
};

let alegTributo = function alegTributo(cell) {
  let nome = 'Não encontrado';
  let processo = cell.getRow().getData().processo;
  let alegacao = cell.getRow().getData().alegaPrim;
  tabAlegacoes.forEach((t) => {
    if (t.alegacao_codigo == alegacao) {
      nome = t.tributo_nome;
      tableAptidao
        .updateOrAddData([{ processo: processo, alegTributo: nome }], true)
        .then((row) => {
          tableAptidao.redraw();
        });
    }
  });
  return nome;
};

let alegMateria = function alegMateria(cell) {
  let nome = 'Não encontrado';
  let processo = cell.getRow().getData().processo;
  let alegacao = cell.getRow().getData().alegaPrim;
  tabAlegacoes.forEach((t) => {
    if (t.alegacao_codigo == alegacao) {
      nome = t.materia_nome;
      tableAptidao
        .updateOrAddData([{ processo: processo, alegMateria: nome }], true)
        .then((row) => {
          tableAptidao.redraw();
        });
    }
  });

  return nome;
};
let alegTema = function alegTema(cell) {
  let nome = 'Não encontrado';
  let processo = cell.getRow().getData().processo;
  let alegacao = cell.getRow().getData().alegaPrim;
  tabAlegacoes.forEach((t) => {
    if (t.alegacao_codigo == alegacao) {
      nome = t.tema_descricao;
      tableAptidao
        .updateOrAddData([{ processo: processo, alegTema: nome }], true)
        .then((row) => {
          tableAptidao.redraw();
        });
    }
  });

  return nome;
};

function gravaIndicacao(registro) {
  $.ajax({
    url: '/julgamento/conselheiros/grava-indicacao-pauta',
    data: JSON.stringify(registro),
    contentType: 'application/json',
    type: 'POST',
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      location.href = '/julgamento/conselheiros/gestao-indicacoes';
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    },
  });
}
