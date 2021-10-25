inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    verificaAbertura();
    tabelaIndicacoes();
  });
}

function initModal() {
  $('.modal').modal();
}

function initSelect() {
  $('select').formSelect();
}

function btnCriaIndicacao() {
  $('.btn-cria').click((e) => {
    $('#aModal').addClass('modal-trigger');
    montaModal();
  });
}

function verificaAbertura() {
  let pauta = JSON.parse($('#tabelaIndicacoes').attr('data-indicacoes'));
  if (
    moment(moment()).isBetween(
      moment(pauta.abreIndicacao, 'DD/MM/YYYY'),
      moment(pauta.fechaIndicacao, 'DD/MM/YYYY'),
      'day',
      [],
    )
  ) {
    $('#pautaAberta').html(`Pauta aberta para indicações.<br />
    Período das Indicações: ${pauta.abreIndicacao} a ${pauta.fechaIndicacao}.`);
  } else {
    $('#pautaAberta').text('Não há pauta aberta para indicações.');
    $('#botaoIndicaPauta').remove();
  }
}

function tabelaIndicacoes() {
  let indicaPauta = JSON.parse($('#tabelaIndicacoes').attr('data-indicaPauta'));
  tabledata = indicaPauta;
  table = new Tabulator('#tabelaIndicacoes', {
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
    responsiveLayout: 'collapse',
    initialSort: [],
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
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
        title: 'Mes',
        field: 'mesIndicacao',
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
        title: 'Ano',
        field: 'anoIndicacao',
        //formatter: coloreProc,
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'left',
        width: 150,
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
