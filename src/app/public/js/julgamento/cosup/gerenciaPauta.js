let tablePauta, tableVirtual, tableRetornos;
let processos = [];
let excelRowsJson;
let agrupadoRelator = false;
let tabAlegacoes = JSON.parse($('#pauta').attr('data-alega'));
inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    initTabs();
    initDatePicker();
    pegaPauta();
    controleBotoes();
    downloadPautaCons();
  });
}

function initTabs() {
  $('.tabs').tabs();
}

function returnRep(data) {
  return !data.confirmaQuest.includes('Correto');
}

let formatParadigma = function formatParadigma(cell) {
  if (cell.getRow().getData().comParadigma.includes('não é')) {
    return 'N';
  } else return 'S';
};

function returnApto(data) {
  return data.apto == false;
  //data.apto.includes(false) ||
}

let regex = new RegExp('(.*?).(xls|json)$');
function triggerValidation(el) {
  if (el.value != '')
    if (!regex.test(el.value.toLowerCase())) {
      el.value = '';
    }
}

function downloadPautaCons() {
  $('.dropdownDownloadPauta').dropdown({
    coverTrigger: false,
    hover: false,
    constrainWidth: false,
  });
  $('.pdfDown').click(() => {
    tableVirtual.download('pdf', `${$('.titulo').text()}.pdf`, {
      orientation: 'portrait',
      title: `${$('.titulo').text()}`,
      format: 'a4',
    });
  });
  $('.csvDownVirtual').click(() => {
    tableVirtual.download('csv', `${$('.titulo').text()}.csv`);
  });
  $('.xlsxDownVirtual').click(() => {
    tableVirtual.download('xlsx', `Pauta_Consolidada.xlsx`, {
      sheetName: 'Indicação para Pauta',
    });
  });

  $('.dropdownDownloadPautaCons').dropdown({
    coverTrigger: false,
    hover: false,
    constrainWidth: false,
  });
  $('.csvDownCons').click(() => {
    tablePauta.download('csv', `${$('.titulo').text()}.csv`);
  });
  $('.xlsxDownCons').click(() => {
    tablePauta.download('xlsx', `Indicacoes_Pauta.xlsx`, {
      sheetName: 'Indicação para Pauta',
    });
  });
}

function controleBotoes() {
  $('#botaoEnviaExcel').click(() => {
    $('#botaoEnviaExcel').toggle();
    $('#statusRetorno').text('Recebendo Ata');
    let dataRetornos = [];
    let files = $('#file')[0].files[0];
    let reader = new FileReader();
    reader.onload = function (event) {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: 'binary' });
      workbook.SheetNames.forEach(function (sheetName) {
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName],
        );
        var json_object = JSON.stringify(XL_row_object);
        var excelRowsJson = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName],
          { raw: true, range: 1 },
        );
        let keysMap = {
          Decisão: 'decisao',
          Período: 'periodo',
          Relator: 'relator',
          Resultado: 'resultado',
          'Texto da Ata': 'textoAta',
          Turma: 'turma',
          Vencido: 'vencido',
          Votação: 'votacao',
          'Contribuinte / Interessado': 'contribuinte',
          'Nº Processo': 'processo',
          Complemento: 'complemento',
          'Solicitante Vista': 'solicVista',
          'Sustentação Contribuinte': 'sustContribuinte',
          'Sustentação Procuradoria': 'sustProcuradoria',
          'Qtde Processos': 'qtdeProcessos',
          Item: 'item',
        };
        $('#statusRetorno').text('Lendo Ata');
        excelRowsJson.forEach((r) => {
          Object.entries(keysMap).forEach((entry) => {
            delete Object.assign(r, { [entry[1]]: r[entry[0]] })[entry[0]];
          });
          r.retorno = retornoPauta(r.textoAta);
          r.processo = r.processo.replace('.', '');
          r.processo = r.processo.replace('/', '');
          r.processo = r.processo.replace('-', '');
          if (r.decisao.includes('VISTA') || r.decisao.includes('RETIRADO')) {
            dataRetornos.push(r);
          }
        });
        let processosAleg = [];

        dataRetornos.forEach((p) => {
          processosAleg.push(p.processo);
        });
        $.ajax({
          url: '/alegacoes-retorno',
          data: { processos: processosAleg },
          type: 'POST',
          success: function (result) {
            //console.log(result);
            result.forEach((res) => {
              dataRetornos.forEach((dr) => {
                if (res.processo.numero == dr.processo) {
                  let alegs = res.alegacoesCarf.split(',');
                  dr.alegaPrim = alegs.shift();
                  dr.alegaSec = alegs;
                  dr.alegacoes = res.alegacoesCarf;
                  dr.questionamento = res.questionamentos.toString();
                  dr.comParadigma =
                    res.indicadorParadigma == true
                      ? 'Processo Paradigma'
                      : res.indicadorParadigma == false
                      ? 'Processo não é Paradigma'
                      : 'Não preenchido';
                  dr.HE = res.horasEstimadas;
                  dr.apto = true;
                  dr.abaixo = true;
                }
              });
            });
            tabelaRetornos(dataRetornos);
            tableRetornos.redraw();
          },
          error: function (result) {
            var toastHTML = `<span>Ocorreu um erro.</span>`;
            M.toast({
              html: toastHTML,
              classes: 'rounded',
              timeRemaining: 500,
            });
            console.log(result);
          },
        });
      });
    };
    reader.onerror = function (event) {
      console.error(
        'Não foi possível ler o arquivo! Código: ' + event.target.error.code,
      );
    };

    reader.readAsBinaryString(files);
  });
  $('#botaoCriaVirtual').click(() => {
    let dadosCons = [];
    let parcial = tablePauta.getData();
    // parcial.forEach((p) => {
    //   if (p.apto == 'true' || p.apto == true) {
    //     dadosCons.push(p);
    //   }
    // });
    $('.tabs').tabs('select', 'retornos');
    //tableVirtual.addData(dadosCons, true);
    tabelaVirtual(parcial);
    tableVirtual.redraw();
  });
  $('#botaoAddRetornos').click(() => {
    let dadosRetorno = tableRetornos.getSelectedData();
    console.log(dadosRetorno);
    dadosRetorno.forEach((dr) => {
      tabAlegacoes.forEach((tab) => {
        if (dr.alegaPrim == tab.alegacao_codigo) {
          dr.alegTributo = tab.tributo_nome;
          dr.alegTema = tab.tema_descricao;
          dr.alegMateria = tab.materia_nome;
        }
        if (dr.comParadigma) {
          if (dr.comParadigma.includes('não é')) {
            dr.indParadigma = 'N';
          } else dr.indParadigma = 'S';
        }
      });
    });

    tableVirtual.addData(dadosRetorno, true);
    tableVirtual.redraw();
    $('.tabs').tabs('select', 'virtual');
  });
  $('#botaoConsolida').click(() => {
    let dadosPauta = {};

    dadosPauta.idIndicacao = JSON.parse($('#pauta').attr('data-idIndicacao'));
    tableVirtual.getData().forEach((p) => {
      let processo = {};
      processo.processo = p.processo;
      processo.alegaPrim = p.alegaPrim;
      processo.alegaSec = p.alegaSec;
      processo.contribuinte = p.contribuinte;
      processo.questionamento = p.questionamento;
      processo.relator = p.relator;
      processo.retorno = p.retorno;
      processos.push(processo);
    });
    processos = tableVirtual.getData();
    //console.log(processos);
    dadosPauta.colegiado = JSON.parse($('#pauta').attr('data-colegiado'));
    dadosPauta.statusSEPAJ = 'Aguardando Ordenação';
    dadosPauta.timestamp = moment().unix();
    dadosPauta.pauta = processos;
    //console.log(dadosPauta);
    gravaConsolidacao(dadosPauta);
  });
  $(`#questionamentosCheck`).change(() => {
    if ($(`#questionamentosCheck`).prop('checked')) {
      tablePauta.addFilter(returnRep);
    } else {
      tablePauta.removeFilter(returnRep);
    }
  });
  $(`#aptosCheck`).change(() => {
    if ($(`#aptosCheck`).prop('checked')) {
      tablePauta.addFilter(returnApto);
    } else {
      tablePauta.removeFilter(returnApto);
    }
  });
  $(`#colunasAptoCheck`).change(() => {
    if ($(`#colunasAptoCheck`).prop('checked')) {
      tablePauta.toggleColumn('abaixo');
      tablePauta.toggleColumn('sumula');
      tablePauta.toggleColumn('vinculacao');
      tablePauta.toggleColumn('liminar');
    } else {
      tablePauta.toggleColumn('abaixo');
      tablePauta.toggleColumn('sumula');
      tablePauta.toggleColumn('vinculacao');
      tablePauta.toggleColumn('liminar');
    }
  });
  if ($('#agrupaRelator').length > 0) {
    $('#agrupaRelator').click(() => {
      if (agrupadoRelator == false) {
        tablePauta.setGroupBy(['relator']);
        agrupadoRelator = true;
      } else {
        tablePauta.setGroupBy();
        agrupadoRelator = false;
      }
    });
  }
}
function retornoPauta(termo) {
  if (
    termo.includes('Hábil') ||
    termo.includes('HÁBIL') ||
    termo.includes('hábil') ||
    termo.includes('vista') ||
    termo.includes('Vista') ||
    termo.includes('VISTA')
  ) {
    return 'SIM';
  } else return 'NÃO';
}
function initSelect() {
  $('select').formSelect();
}

function pegaPauta() {
  let pauta = JSON.parse($('#pauta').attr('data-pauta'));
  let dadosColegiado = JSON.parse($('#pauta').attr('data-colegiado'));
  $('#colegiadoNome').text(dadosColegiado);
  let pautaConsolidada = [];
  pauta.forEach((p) => {
    pautaConsolidada.push(p.processos);
  });
  let dados = pautaConsolidada.flat();
  dados.forEach((d) => {
    tabAlegacoes.forEach((tab) => {
      if (d.alegaPrim == tab.alegacao_codigo) {
        d.alegTributo = tab.tributo_nome;
        d.alegTema = tab.tema_descricao;
        d.alegMateria = tab.materia_nome;
      }
      if (d.comParadigma.includes('não é')) {
        d.indParadigma = 'N';
      } else d.indParadigma = 'S';
    });
    d.retorno = 'NÃO';
    d.idIndicacao = JSON.parse($('#pauta').attr('data-idindicacao'));
  });

  tabelaPauta(dados);
}

function tabelaPauta(dados) {
  let tabledata = dados;
  tablePauta = new Tabulator('#tabelaPauta', {
    data: tabledata,
    //pagination: 'local',
    downloadConfig: {
      //  columnHeaders:false, //do not include column headers in downloaded table
      //columnGroups:false, //do not include column groups in column headers for downloaded table
      //rowGroups:false, //do not include row groups in downloaded table
      columnCalcs: false, //do not include column calcs in downloaded table
      //dataTree:false, //do not include data tree in downloaded table
    },
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitData',
    movableRows: true,
    movableColumns: true,
    persistence: {
      columns: true, //persist column layout
    },
    //responsiveLayout: 'collapse',
    initialSort: [],
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        rowHandle: true,
        formatter: 'handle',
        headerSort: false,
        frozen: true,
        width: 30,
        minWidth: 30,
        download: false,
        responsive: 0,
      },
      // {
      //   title: 'Expandir',
      //   formatter: 'responsiveCollapse',
      //   width: 60,
      //   minWidth: 60,
      //   hozAlign: 'center',
      //   resizable: false,
      //   headerSort: false,
      //   responsive: 0,
      //   download: false,
      // },
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
        title: 'Questionamento Correto?',
        field: 'questionamento',
        hozAlign: 'center',
        editor: 'select',
        editorParams: {
          values: [
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
          defaultValue: '',
        },
        responsive: 0,
        download: true,
      },
      {
        title: 'Questionamento Correto?',
        field: 'confirmaQuest',
        hozAlign: 'center',
        editor: 'select',
        formatter: coloreQuest,
        editorParams: {
          values: [
            'Corrigido',
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
          defaultValue: 'Corrigido',
        },
        responsive: 0,
        download: false,
        headerTooltip:
          'Verificação automática baseada nas respostas das colunas.',
      },
      {
        title: 'Retorno?',
        field: 'retorno',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
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
        title: `Abaixo de ${minimoAptoString}`,
        field: 'abaixo',
        sorter: 'boolean',
        hozAlign: 'center',
        editor: false,
        formatter: 'tickCross',
        responsive: 0,
        download: true,
        headerTooltip: `O valor originário do processo é inferior a ${minimoAptoString}`,
      },
      {
        title: 'Súmula?',
        field: 'sumula',
        sorter: 'boolean',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
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
        formatter: 'tickCross',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
        headerTooltip:
          'Trata-se de decisão/liminar judicial para julgamento imediato?',
      },
      {
        title: 'Alegação Principal',
        field: 'alegaPrim',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        width: 180,
        responsive: 0,
        download: true,
        //headerTooltip: 'Caso haja mais de um código, separe por vírgulas.',
      },
      {
        title: 'Demais Alegações',
        field: 'alegaSec',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        width: 250,
        responsive: 0,
        download: true,
        //headerTooltip: 'Caso haja mais de um código, separe por vírgulas.',
      },
      {
        title: 'Complexidade e Indicação de Paradigma',
        field: 'comParadigma',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        //width: 250,
        responsive: 0,
        download: true,
        //headerTooltip: 'Caso haja mais de um código, separe por vírgulas.',
      },
      {
        title: 'Relator',
        field: 'relator',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
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
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

function tabelaRetornos(dados) {
  let tabledata = dados;
  tableRetornos = new Tabulator('#tabelaRetornos', {
    data: tabledata,
    //pagination: 'local',
    downloadConfig: {
      //  columnHeaders:false, //do not include column headers in downloaded table
      //columnGroups:false, //do not include column groups in column headers for downloaded table
      //rowGroups:false, //do not include row groups in downloaded table
      columnCalcs: false, //do not include column calcs in downloaded table
      //dataTree:false, //do not include data tree in downloaded table
    },
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitDataStretch',
    selectable: true,
    //movableRows: true,
    responsiveLayout: 'collapse',
    initialSort: [],
    index: 'processo',
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    rowSelectionChanged: function (data, rows) {
      document.getElementById('select-stats').innerHTML = data.length;
    },
    columns: [
      {
        title: 'Relator',
        field: 'relator',
        sorter: 'string',
        headerFilter: 'input',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Decisão',
        field: 'decisao',
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
      },

      {
        title: 'Processo',
        field: 'processo',
        //formatter: coloreProc,
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
        //formatter: coloreProc,
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'left',
        width: 150,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Alegacoes',
        field: 'alegacoes',
        //formatter: coloreProc,
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'left',
        width: 150,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Alegação Principal',
        field: 'alegaPrim',
        sorter: 'string',
        topCalc: countCalc,
        hozAlign: 'left',
        editor: false,
        width: 180,
        responsive: 0,
        download: true,
        //headerTooltip: 'Caso haja mais de um código, separe por vírgulas.',
      },
      {
        title: 'Demais Alegações',
        field: 'alegaSec',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        width: 250,
        responsive: 0,
        download: true,
        //headerTooltip: 'Caso haja mais de um código, separe por vírgulas.',
      },
      {
        title: 'Retorno?',
        field: 'retorno',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: 'select',
        editorParams: {
          values: ['SIM', 'NÃO'],
          //defaultValue: 'Correto',
        },
        responsive: 0,
        download: true,
      },
      {
        title: 'Questionamento',
        field: 'questionamento',
        hozAlign: 'center',
        editor: 'select',
        editorParams: {
          values: [
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
        title: 'Texto da Ata',
        field: 'textoAta',
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'left',
        width: 150,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Complexidade e Indicação de Paradigma',
        field: 'comParadigma',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        //width: 250,
        responsive: 0,
        download: true,
        //headerTooltip: 'Caso haja mais de um código, separe por vírgulas.',
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
  tableRetornos.getData().forEach((d) => {
    let termo = d.textoAta;
    if (
      termo.includes('Hábil') ||
      termo.includes('HÁBIL') ||
      termo.includes('hábil') ||
      termo.includes('vista') ||
      termo.includes('Vista') ||
      termo.includes('VISTA')
    ) {
      tableRetornos.selectRow(+d.processo);
    }
  });
}

function tabelaVirtual(dados) {
  let tabledata = dados;
  tableVirtual = new Tabulator('#tabelaConsolidadaVirtual', {
    data: tabledata,
    //pagination: 'local',
    downloadConfig: {
      //  columnHeaders:false, //do not include column headers in downloaded table
      //columnGroups:false, //do not include column groups in column headers for downloaded table
      //rowGroups:false, //do not include row groups in downloaded table
      columnCalcs: false, //do not include column calcs in downloaded table
      //dataTree:false, //do not include data tree in downloaded table
    },
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitDataStretch',
    movableRows: true,
    movableColumns: true,
    persistence: {
      columns: true, //persist column layout
    },
    responsiveLayout: 'collapse',
    initialSort: [{ column: 'contribuinte', dir: 'desc' }],
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        rowHandle: true,
        formatter: 'handle',
        headerSort: false,
        frozen: true,
        width: 30,
        minWidth: 30,
        download: false,
        responsive: 0,
      },
      {
        title: 'Item',
        formatter: 'rownum',
        field: 'nItem',
        hozAlign: 'center',
        width: 40,
        responsive: 0,
        download: true,
      },
      {
        title: 'Processo',
        field: 'processo',
        //formatter: coloreProc,
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
        //formatter: coloreProc,
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'left',
        width: 150,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Questionamento',
        field: 'questionamento',
        hozAlign: 'center',
        editor: 'select',
        editorParams: {
          values: [
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
          defaultValue: '',
        },
        responsive: 0,
        download: true,
      },
      {
        title: 'Retorno?',
        field: 'retorno',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
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
        download: true,
        headerTooltip: `O valor originário do processo é inferior a ${minimoAptoString}`,
      },
      {
        title: 'Súmula?',
        field: 'sumula',
        sorter: 'boolean',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
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
        formatter: 'tickCross',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
        headerTooltip:
          'Trata-se de decisão/liminar judicial para julgamento imediato?',
      },
      {
        title: 'Dia',
        field: 'dia',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Hora',
        field: 'hora',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Sequencia',
        field: 'sequencia',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Alegação Principal',
        field: 'alegaPrim',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        width: 180,
        responsive: 0,
        download: true,
        //headerTooltip: 'Caso haja mais de um código, separe por vírgulas.',
      },
      {
        title: 'Tributo',
        field: 'alegTributo',
        sorter: 'string',
        hozAlign: 'left',
        //formatter: alegTributo,
        editor: false,
        width: 180,
        responsive: 0,
        download: true,
      },
      {
        title: 'Matéria',
        field: 'alegMateria',
        //formatter: alegMateria,
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
        //formatter: alegTema,
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        width: 180,
        responsive: 0,
        download: true,
      },
      {
        title: 'Demais Alegações',
        field: 'alegaSec',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        width: 250,
        responsive: 0,
        download: true,
        //headerTooltip: 'Caso haja mais de um código, separe por vírgulas.',
      },
      {
        title: 'Relator',
        field: 'relator',
        sorter: 'string',
        headerFilter: 'input',
        hozAlign: 'left',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Complexidade e Indicação de Paradigma',
        field: 'comParadigma',
        sorter: 'string',
        headerFilter: 'input',
        hozAlign: 'left',
        editor: false,
        //width: 250,
        responsive: 0,
        download: true,
        //headerTooltip: 'Caso haja mais de um código, separe por vírgulas.',
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
        title: 'Indicador Paradigma',
        field: 'indParadigma',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        //formatter: formatParadigma,
        //accessorDownload: numberConvert,
        responsive: 0,
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
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

function coloreQuest(cell) {
  if (cell.getValue() != 'Correto') {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  return cell.getValue();
}

let nItem = function nItem(cell) {
  return cell.getRow().getPosition(true);
};

function initDatePicker() {
  let formato = 'dd/mm/yyyy';
  let meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  let mesesCurtos = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  let diasDaSemana = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  let diasCurtos = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  let diasAbrev = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  $('.datepicker').datepicker({
    autoClose: true,
    format: formato,
    i18n: {
      cancel: 'Cancelar',
      clear: 'Limpar',
      done: 'Ok',
      months: meses,
      monthsShort: mesesCurtos,
      weekdays: diasDaSemana,
      weekdaysShort: diasCurtos,
      weekdaysAbbrev: diasAbrev,
    },
  });
}

function gravaConsolidacao(registro) {
  $.ajax({
    url: '/suporte/restrito/consolida-pauta',
    data: JSON.stringify(registro), //{ dados: JSON.stringify(registro) },
    contentType: 'application/json',

    type: 'POST',
    beforeSend: function () {
      // setting a timeout
      //console.log(JSON.stringify(registro));
    },
    success: function (result) {
      //console.log(result);
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      location.href = `/suporte/restrito/portalcosup`;
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      //console.log(result);
    },
  });
}
