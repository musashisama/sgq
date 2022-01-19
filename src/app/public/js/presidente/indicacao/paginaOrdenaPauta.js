let tableOrdenacao = null;
let pauta = JSON.parse($('#tabelaPauta').attr('data-pauta'));
let tabAlegacoes = JSON.parse($('#tabelaPauta').attr('data-alegacoes'));
console.log(pauta);
console.log(tabAlegacoes);
inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    controleBotoes();
    tabelaOrdenacao();
  });
}

function initModal() {
  $('.modal').modal();
}

function initSelect() {
  $('select').formSelect();
}

function controleBotoes() {
  $('#botaoOrdena').click(() => {
    var toastHTML = `<span>Dados enviados com sucesso!</span>`;
    M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    // let dadosPauta = {};
    // dadosPauta.idIndicacao = pauta.idIndicacao;
    // processos = tableOrdenacao.getData();
    // console.log(processos);
    // dadosPauta.colegiado = pauta.colegiado;
    // dadosPauta.statusSEPAJ = 'Pauta Ordenada';
    // dadosPauta.processos = JSON.stringify(processos);
    // //console.log(dadosPauta);
    // gravaConsolidacao(dadosPauta);
  });
}

function tabelaOrdenacao(dados) {
  let tabledata = pauta.processos;
  tableOrdenacao = new Tabulator('#tabelaPauta', {
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
    index: 'processo',
    responsiveLayout: 'collapse',
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
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'left',
        width: 150,
        editor: false,
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
        },
      },
      {
        title: 'Alegação Princpal',
        field: 'alegaPrim',
        sorter: 'string',
        topCalc: countCalc,
        hozAlign: 'left',

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
        formatter: alegaTributo,
        editor: false,
        width: 180,
        responsive: 0,
        download: true,
      },
      {
        title: 'Matéria',
        field: 'alegMateria',
        formatter: alegaMateria,
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
        formatter: alegaTema,
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
        topCalc: countCalc,
        hozAlign: 'left',
        editor: false,
        width: 250,
        responsive: 0,
        download: true,
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
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

let alegaTributo = function alegTributo(cell) {
  let nome = 'Não encontrado';
  let processo = cell.getRow().getData().processo;
  let alegacao = cell.getRow().getData().alegaPrim;
  console.log(processo);
  console.log(alegacao);
  tabAlegacoes.forEach((t) => {
    if (t.alegacao_codigo == alegacao) {
      nome = t.tributo_nome;
      tableOrdenacao
        .updateOrAddData([{ processo: processo, alegTributo: nome }], true)
        .then((row) => {
          console.log(row);
          tableOrdenacao.redraw();
        });
    }
  });
  return nome;
};

let alegaMateria = function alegMateria(cell) {
  let nome = 'Não encontrado';
  let processo = cell.getRow().getData().processo;
  let alegacao = cell.getRow().getData().alegaPrim;
  tabAlegacoes.forEach((t) => {
    if (t.alegacao_codigo == alegacao) {
      nome = t.materia_nome;
      tableOrdenacao
        .updateOrAddData([{ processo: processo, alegMateria: nome }], true)
        .then((row) => {
          tableOrdenacao.redraw();
        });
    }
  });

  return nome;
};
let alegaTema = function alegTema(cell) {
  let nome = 'Não encontrado';
  let processo = cell.getRow().getData().processo;
  let alegacao = cell.getRow().getData().alegaPrim;
  tabAlegacoes.forEach((t) => {
    if (t.alegacao_codigo == alegacao) {
      nome = t.tema_descricao;
      tableOrdenacao
        .updateOrAddData([{ processo: processo, alegTema: nome }], true)
        .then((row) => {
          tableOrdenacao.redraw();
        });
    }
  });

  return nome;
};

function gravaOrdenacao(registro) {
  //   $.ajax({
  //     url: '/presidente/restrito/ordena_pauta/',
  //     data: registro,
  //     type: 'POST',
  //     success: function (result) {
  //       var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
  //       M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
  //       location.href = `/suporte/restrito/portalcosup`;
  //     },
  //     error: function (result) {
  //       var toastHTML = `<span>Ocorreu um erro.</span>`;
  //       console.log(result);
  //       M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
  //       console.log(result);
  //     },
  //   });
}
