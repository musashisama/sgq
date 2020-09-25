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
let tableRegap;
let tabledata = '';
let d3 = Plotly.d3;
let agrupado = false;
function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    formataDados();
    $('.progressRegap').toggle();
    $('.classProcessos').toggle();
    calendario();
    elementosTabelas();
    initModal();
    btnModal();
    initDatePicker();
    initCheckboxes();
  });
}

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
function initModal() {
  $('.modal').modal();
  btnLegenda();
}
function btnLegenda() {
  $('#mostraLegenda').click((e) => {
    e.preventDefault();
    $('#mostraLegenda').addClass('modal-trigger');
  });
}
function calendario(dias) {
  let calendario = JSON.parse($('#dataCAL').attr('data-cal'));
  let datas = [];
  calendario.forEach((c) => {
    if (moment(c.start, 'DD/MM/YYYY').isSameOrAfter(moment())) {
      datas.push(moment(c.start, 'DD/MM/YYYY').diff(moment(), 'days'));
    }
  });
  $('#daps').text(Math.min(...datas));
  $('#ps').text(
    moment()
      .add(Math.min(...datas) + 1, 'days')
      .format('DD/MM/YYYY'),
  );
  return +dias + Math.min(...datas);
}
//Checkboxes para situações e atividades
function initCheckboxes() {
  $(`#repetitivosCheck`).change(() => {
    if ($(`#repetitivosCheck`).prop('checked')) {
      tableRegap.addFilter(returnRep);
    } else {
      tableRegap.removeFilter(returnRep);
    }
  });
  $(`#aguardandoPauta`).change(() => {
    if ($(`#aguardandoPauta`).prop('checked')) {
      tableRegap.addFilter(agPauta);
    } else {
      tableRegap.removeFilter(agPauta);
    }
  });
  $(`#abaixoUM`).change(() => {
    if ($(`#abaixoUM`).prop('checked')) {
      tableRegap.addFilter('Valor_Originario', '<=', 8000000);
    } else {
      tableRegap.removeFilter('Valor_Originario', '<=', 8000000);
    }
  });
}
function agPauta(data) {
  return (
    data.Atividade.includes('Para Relatar') &&
    data.Situacao.includes('AGUARDANDO PAUTA')
  );
}
function returnRep(data) {
  return !data.Observacoes.includes('.REP.');
}
function elementosTabelas() {
  $('.dataRelRegap').change(() => {
    $.ajax({
      url: `/julgamento/conselheiros/${$(
        '#dataRelRegap option:selected',
      ).val()}`,
      type: 'POST',
      data: {},
      beforeSend: function () {
        $('.progressRegap').toggle();
      },
    })
      .done(function (msg) {
        $('.classProcessos').show();
        // msg.forEach((r) => {
        //   r.DAAPS = parseInt($('#daps').text()) + r.Dias_na_Atividade;
        //   console.log(r);
        // });
        //console.log(msg);
        dataTable(msg);
        grafico(msg);
        $('.progressRegap').toggle();
      })
      .fail(function (jqXHR, textStatus, msg) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      });
  });

  document
    .getElementById('mostraColunasAtividade')
    .addEventListener('click', function () {
      if (agrupadoRegap == false) {
        tableRegap.setGroupBy(['Atividade', 'Situacao']);
        agrupadoRegap = true;
      } else {
        tableRegap.setGroupBy();
        agrupadoRegap = false;
      }
    });

  $('.Atividade').change(() => {
    //console.log($("select option:selected").val());
    tableRegap.setFilter(
      'Atividade',
      '=',
      $('#atividadeSelect option:selected').val(),
    );
    if ($('#atividadeSelect option:selected').val() == 'Todas') {
      tableRegap.removeFilter(
        'Atividade',
        '=',
        $('#atividadeSelect option:selected').val(),
      );
    } else {
      tableRegap.setFilter(
        'Atividade',
        '=',
        $('#atividadeSelect option:selected').val(),
      );
    }
  });
}
//TABELA REGAP
function dataTable(dados) {
  let tabledata = dados;
  tableRegap = new Tabulator('#tabelaRegap', {
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
      { column: 'Atividade', dir: 'desc' },
      { column: 'HE_CARF', dir: 'desc' },
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
        field: 'Processo',
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
        field: 'Contribuinte',
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'center',
        width: 150,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Equipe Atual',
        field: 'Equipe_Atual',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Ind. Apenso',
        field: 'Ind_Apenso',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Atividade',
        field: 'Atividade',
        sorter: 'string',
        hozAlign: 'center',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Situação de Julgamento',
        field: 'Situacao',
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
        field: 'Entrada_na_Atividade',
        sorter: 'date',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Horas CARF',
        field: 'HE_CARF',
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
        field: 'Dias_na_Atividade',
        sorter: 'number',
        width: 140,
        hozAlign: 'center',
        editor: false,
        //mutator: formatValorDAPS,
        formatter: formatDAPS,
        accessor: downloadValorDAPS,
        accessorParams: {},
        accessorDownload: downloadValorDAPS,
        responsive: 0,
        download: false,
      },
      {
        title: 'Valor Originário',
        field: 'Valor_Originario',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        accessorDownload: downloadValor,
        responsive: 0,
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
        field: 'Data_da_Sessao_Julgamento',
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
        field: 'Equipe_Ultima',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 1,
        download: false,
      },
      {
        title: 'Alegações',
        field: 'Alegacoes_CARF',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Observações',
        field: 'Observacoes',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 1,
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
  console.log(value);
  let valor = calendario(value);
  console.log(valor);
  return valor;
};

let downloadValor = function (value, data, type, params, column) {
  return value.replace('.', ',');
};

let formatValor = function formatValor(cell) {
  const formato = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
    useGrouping: true,
    localeMatcher: 'best fit',
  };
  const valor = +cell.getValue();
  if (valor >= 8000000) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (valor < 8000000) {
    cell.getElement().style.color = 'rgb(63, 138, 2)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  return `${valor.toLocaleString('pt-BR', formato)}`;
};

function coloreDias(cell, formatterParams, valor) {
  let value = cell.getValue() ? cell.getValue() : valor;

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
  if (
    cell.getRow().getData().Questionamento_CARF == 'EMBARGOS DE DECLARAÇÃO' &&
    cell.getRow().getData().Equipe_Ultima.includes('DIPRO') &&
    cell.getRow().getData().AtividadeUltima == 'Distribuir / Sortear'
  ) {
    let elem = document.querySelector('.LegEmbargoSort');
    let estilo = getComputedStyle(elem);
    cell.getRow().getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (
    cell.getRow().getData().Questionamento_CARF != 'EMBARGOS DE DECLARAÇÃO' &&
    cell.getRow().getData().Equipe_Ultima.includes('DIPRO') &&
    cell.getRow().getData().AtividadeUltima == 'Tratar Retorno de Processo'
  ) {
    let elem = document.querySelector('.LegRetornoDilg');
    let estilo = getComputedStyle(elem);
    cell.getRow().getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (
    cell.getRow().getData().Questionamento_CARF == 'EMBARGOS DE DECLARAÇÃO' &&
    cell.getRow().getData().Equipe_Ultima.includes('DIPRO') &&
    cell.getRow().getData().AtividadeUltima == 'Tratar Retorno de Processo'
  ) {
    let elem = document.querySelector('.LegEmbargo');
    let estilo = getComputedStyle(elem);
    cell.getRow().getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (cell.getRow().getData().Observacoes.includes('PARADIGMA')) {
    let elem = document.querySelector('.LegParadigma');
    let estilo = getComputedStyle(elem);
    cell.getRow().getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (cell.getRow().getData().Observacoes.includes('.REP.')) {
    let elem = document.querySelector('.LegRepetitivo');
    let estilo = getComputedStyle(elem);
    cell.getRow().getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (
    cell.getRow().getData().Questionamento_CARF == '' &&
    cell.getRow().getData().Ind_Apenso.includes('S') &&
    cell.getRow().getData().Situacao == ''
  ) {
    let elem = document.querySelector('.LegApenso');
    let estilo = getComputedStyle(elem);
    cell.getRow().getElement().style.backgroundColor = estilo.backgroundColor;
  }
  return value;
}

function mediaCalc(values, data, calcParams) {
  var calc = 0;
  let valor = 0;
  values.forEach(function (value) {
    if (value > 0) {
      valor += value;
      calc++;
    }
  });

  return `𝛍: ${(valor / calc).toFixed(2)}`;
}

function somaCalc(values, data, calcParams) {
  var calc = 0;
  let valor = 0;
  values.forEach(function (value) {
    if (value > 0) {
      valor += +value;
      calc++;
    }
  });

  return `𝚺: ${valor.toFixed(2)}`;
}

function countCalc(values, data, calcParams) {
  var calc = 0;
  let valor = 0;
  values.forEach(function (value) {
    if (value) {
      valor += +value;
      calc++;
    }
  });

  return `|𝜲|: ${calc}`;
}
