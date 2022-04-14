let indicacao;
if (!$('#tabelaIndicacao').attr('data-indicacao') == false) {
  indicacao = JSON.parse($('#tabelaIndicacao').attr('data-indicacao'));
} else {
  indicacao = false;
}
inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    if (!indicacao == false) {
      tabelaIndicacoes();
      somaHE();
      $('#periodoIndica').text(indicacao.mesIndicacao);
    } else {
      $('#h4Periodo').text(
        'Não foram encontradas indicações para este período',
      );
      $('.dropdownDownload').toggle();
      $('#h5Periodo').toggle();
    }
  });
}

function initModal() {
  $('.modal').modal();
}

function initSelect() {
  $('select').formSelect();
}

function somaHE() {
  let somaHE = 0;
  let qtde = 0;
  indicacao.processos.forEach((i) => {
    console.log(i.HE);
    somaHE += +i.HE;
    qtde += 1;
  });
  if (somaHE >= 126) {
    $('#h5Periodo').addClass('green');
  } else $('#h5Periodo').addClass('orange');
  $('#qtdeProc').text(qtde);
  $('#somaHE').text(somaHE.toFixed(2));
}

function tabelaIndicacoes() {
  let tabledata = indicacao.processos;
  table = new Tabulator('#tabelaIndicacao', {
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
    responsiveLayout: 'collapse',
    initialSort: [],
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      //   {
      //     rowHandle: true,
      //     formatter: 'handle',
      //     headerSort: false,
      //     frozen: true,
      //     width: 30,
      //     minWidth: 30,
      //     download: false,
      //     responsive: 0,
      //   },
      //   {
      //     title: 'Expandir',
      //     formatter: 'responsiveCollapse',
      //     width: 60,
      //     minWidth: 60,
      //     hozAlign: 'center',
      //     resizable: false,
      //     headerSort: false,
      //     responsive: 0,
      //     download: false,
      //   },
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
        title: `Abaixo de ${minimoAptoString}`,
        field: 'abaixo',
        sorter: 'boolean',
        hozAlign: 'center',
        editor: false,
        formatter: 'tickCross',
        responsive: 0,
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
        title: 'Questionamento Correto?',
        field: 'questionamento',
        hozAlign: 'center',
        editor: 'string',
        // editorParams: {
        //   values: [
        //     'Recurso Voluntário',
        //     'Recurso de Ofício',
        //     'Recurso Voluntário/Ofício',
        //     'Recurso Especial da Procuradoria',
        //     'Recurso Especial do Contribuinte',
        //     'Recurso Especial Procuradoria/Contribuinte',
        //     'Embargo da Procuradoria',
        //     'Embargo do Contribuinte',
        //     'Embargo Procuradoria/Contribuinte',
        //   ],
        //   defaultValue: '',
        // },
        responsive: 0,
        download: true,
      },
      {
        title: 'Questionamento Correto?',
        field: 'confirmaQuest',
        hozAlign: 'center',
        editor: 'string',
        //formatter: coloreQuest,
        // editorParams: {
        //   values: [
        //     'Corrigido',
        //     'Recurso Voluntário',
        //     'Recurso de Ofício',
        //     'Recurso Voluntário/Ofício',
        //     'Recurso Especial da Procuradoria',
        //     'Recurso Especial do Contribuinte',
        //     'Recurso Especial Procuradoria/Contribuinte',
        //     'Embargo da Procuradoria',
        //     'Embargo do Contribuinte',
        //     'Embargo Procuradoria/Contribuinte',
        //   ],
        //   defaultValue: 'Corrigido',
        // },
        responsive: 0,
        download: true,
        headerTooltip:
          'Verificação automática baseada nas respostas das colunas.',
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
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}
