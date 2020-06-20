layout = 'fitDataFill';
let table = null;
let tabledata = '';
responsiveLayout = true;
let agrupado = false;
let valValor,
  valDias = 0;
let agrupadoT = false;
let unidades = '';
initialSort = [{ column: 'nome', dir: 'asc' }];
inicializaComponentes();

function inicializaComponentes() {
  $(document).ready(function () {
    pegaUnidades().then((result) => {
      unidades = result;
      initSelect();
      dataTable();
      initTabs();
      initModal();
      sliderValor();
      sliderDias();
      elementosTabela();
    });
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

function sliderValor() {
  let sliderValor = document.getElementById('sliderValor');
  let formato = wNumb({
    mark: ',',
    thousand: '.',
    prefix: 'R$',
  });
  noUiSlider.create(sliderValor, {
    start: 0,
    connect: 'lower',
    step: 250000,
    orientation: 'horizontal',
    range: {
      min: 0,
      '25%': 1000000,
      max: 15000000,
    },
    pips: {
      mode: 'range',
      density: 4,
      format: formato,
    },
  });

  sliderValor.noUiSlider.on('update', () => {
    table.removeFilter('Valor_Originario', '>=', valValor);
    table.addFilter('Valor_Originario', '>=', +sliderValor.noUiSlider.get());
    valValor = +sliderValor.noUiSlider.get();
    console.log(table.getFilters());
  });
}

function sliderDias() {
  let sliderDias = document.getElementById('sliderDias');
  noUiSlider.create(sliderDias, {
    start: 0,
    connect: 'lower',
    step: 30,
    orientation: 'horizontal',
    range: {
      min: 0,
      '15%': 30,
      '30%': 60,
      '45%': 90,
      '60%': 180,
      max: 400,
    },
    pips: {
      mode: 'range',
      density: 4,
      format: wNumb({
        suffix: 'dias',
      }),
    },
  });

  sliderDias.noUiSlider.on('update', () => {
    console.log(sliderDias.noUiSlider.get());
    table.removeFilter('Dias_na_Atividade', '>=', valDias);
    table.addFilter('Dias_na_Atividade', '>=', sliderDias.noUiSlider.get());
    valDias = sliderDias.noUiSlider.get();
    console.log(table.getFilters());
  });
}

function initTabs() {
  $('.tabs').tabs();
}

function elementosTabela() {
  $('.Atividade').change(() => {
    //console.log($("select option:selected").val());
    table.setFilter('Atividade', '=', $('select option:selected').val());
    if ($('select option:selected').val() == 'Todas') {
      table.removeFilter('Atividade', '=', $('select option:selected').val());
    } else {
      table.setFilter('Atividade', '=', $('select option:selected').val());
    }
  });

  document
    .getElementById('mostraColunasAtividade')
    .addEventListener('click', function () {
      if (agrupado == false) {
        table.setGroupBy(['nome', 'Atividade', 'Situacao']);
        agrupado = true;
      } else {
        table.setGroupBy();
        agrupado = false;
      }
    });
  document
    .getElementById('mostraColunasTurma')
    .addEventListener('click', function () {
      if (agrupadoT == false) {
        table.setGroupBy(['Equipe_Atual']);
        agrupadoT = true;
      } else {
        table.setGroupBy();
        agrupadoT = false;
      }
    });
}

function initSelect() {
  $('select').formSelect();
}

function dataTable(msg) {
  let tabledata = JSON.parse($('form').attr('data-regapCojul'));
  table = new Tabulator('#tabelaRegap', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: layout,
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [{ column: 'Dias_na_Atividade', dir: 'desc' }],
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
        field: 'CPF',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        editor: false,
        responsive: 2,
        formatter: formatNome,
        download: true,
      },
      {
        title: 'Responsável Atual',
        field: 'nome',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        editor: false,
        formatter: formatNome,
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
        responsive: 0,
        download: true,
      },
      {
        title: 'Contribuinte',
        field: 'Contribuinte',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Processo',
        field: 'Processo',
        sorter: 'number',
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
        headerFilter: 'input',
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
        editor: false,
        responsive: 1,
        download: true,
      },
      {
        title: 'Dias na Atividade',
        field: 'Dias_na_Atividade',
        formatter: coloreDias,
        sorter: 'number',
        hozAlign: 'center',
        topCalc: mediaCalc,
        headerFilter: 'input',
        headerFilterPlaceholder: '>=',
        headerFilterFunc: '>=',
        editor: false,
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
        headerFilter: 'input',
        headerFilterPlaceholder: '>=',
        headerFilterFunc: '>=',
        formatter: formatDAPS,
        responsive: 0,
        download: true,
      },
      {
        title: 'Dias na Atividade em Duas Sessões',
        field: 'Dias_na_Atividade',
        sorter: 'number',
        width: 140,
        hozAlign: 'center',
        headerFilter: 'input',
        headerFilterPlaceholder: '>=',
        headerFilterFunc: '>=',
        editor: false,
        formatter: formatDAPS2,
        responsive: 0,
        download: true,
      },
      {
        title: 'Dias na Atividade em Três Sessões',
        field: 'Dias_na_Atividade',
        sorter: 'number',
        width: 140,
        hozAlign: 'center',
        editor: false,
        formatter: formatDAPS3,
        responsive: 0,
        download: true,
      },
      {
        title: 'Dias da Sessão de Julgamento',
        field: 'Dias_da_SJ',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Data da Sessão de Julgamento',
        field: 'Data_da_Sessao_Julgamento',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Dias da Última Distribuição',
        field: 'Dias_da_Dist',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
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
      {
        title: 'Valor Originário',
        field: 'Valor_Originario',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        responsive: 0,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: {
      'pt-br': {
        columns: {
          name: 'Nome', //replace the title of column name with the value "Name"
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
          default: 'filtrar coluna...', //default header filter placeholder text
          columns: {
            nome: 'Filtrar por Nome',
            CPF: 'Filtrar por CPF', //replace default header filter text for column name
          },
        },
      },
    },
  });
}

function pegaUnidades() {
  return $.ajax({
    url: '/pessoal/restrito/unidades',
    data: { tipo: 'judicante' },
    type: 'POST',
    success: function (result) {
      return result;
    },
    error: function (result) {
      console.log(result);
    },
  });
}

function calendario(dias, unidade, sessoes) {
  let calendario = JSON.parse($('#dataCAL').attr('data-cal'));
  let cor = '';
  unidades.forEach((und) => {
    if (unidade == und.unidade) {
      cor = und.semana;
    }
  });
  let datas = [];
  calendario.forEach((c) => {
    if (
      moment(c.start, 'DD/MM/YYYY').isSameOrAfter(moment()) &&
      c.classNames.includes(cor)
    ) {
      datas.push(moment(c.start, 'DD/MM/YYYY').diff(moment(), 'days'));
      c;
    }
  });
  if (sessoes == 2) {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i] === Math.min(...datas)) {
        datas.splice(i, 1);
      }
    }
  }
  if (sessoes == 3) {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i] === Math.min(...datas)) {
        datas.splice(i, 1);
      }
    }
    for (let i = 0; i < datas.length; i++) {
      if (datas[i] === Math.min(...datas)) {
        datas.splice(i, 1);
      }
    }
  }
  return +dias + Math.min(...datas);
}

function formatDAPS(cell) {
  let value = calendario(cell.getValue(), cell.getRow().getData().Equipe_Atual);
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

function formatDAPS2(cell) {
  let value = calendario(
    cell.getValue(),
    cell.getRow().getData().Equipe_Atual,
    2,
  );
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

function formatDAPS3(cell) {
  let value = calendario(
    cell.getValue(),
    cell.getRow().getData().Equipe_Atual,
    3,
  );
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

let formatNome = function formatNome(cell) {
  return `<a href='/julgamento/restrito/regap-cojul/detalha/${
    cell.getRow().getData().CPF
  }'>${cell.getValue()}</a>`;
};

let formatValor = function formatValor(cell) {
  const formato = {
    style: 'currency',
    currency: 'BRL',
    useGrouping: true,
    localeMatcher: 'best fit',
  };
  const valor = +cell.getValue();
  if (valor >= 1000000) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (valor < 1000000) {
    cell.getElement().style.color = 'rgb(63, 138, 2)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  return `${valor.toLocaleString('pt-BR', formato)}`;
};

function coloreDias(cell, formatterParams) {
  let value = cell.getValue();

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
    let elem = document.querySelector('.LegEmbargo');
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
  if (cell.getRow().getData().Observacoes.includes('.REP.')) {
    let elem = document.querySelector('.LegRepetitivo');
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
      valor += value;
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
      valor += value;
      calc++;
    }
  });

  return `|𝜲|: ${calc}`;
}

dados = JSON.parse($('form').attr('data-regapCojul'));
var layoutAtividade = {
  title: 'Processos por atividade',
  //showlegend: true,
  shapes: [
    // {
    //     type: 'line',
    //     // x-reference is assigned to the x-values
    //     xref: 'x',
    //     // y-reference is assigned to the plot paper [0,1]
    //     yref: 'paper',
    //     x0: '126',
    //     y0: 0,
    //     x1: '126',
    //     y1: 1,
    //     fillcolor: '#d11515',
    //     opacity: 0.8,
    //     line: {
    //         color: '#d11515',
    //         width: 1,
    //         dash: 'dot'
    //     }
    // },
    // {
    //     type: 'line',
    //     // x-reference is assigned to the x-values
    //     xref: 'x',
    //     // y-reference is assigned to the plot paper [0,1]
    //     yref: 'paper',
    //     x0: '252',
    //     y0: 0,
    //     x1: '252',
    //     y1: 1,
    //     fillcolor: '#b05d21',
    //     opacity: 0.6,
    //     line: {
    //         color: '#b05d21',
    //         width: 1,
    //         dash: 'dot'
    //     }
    // },
    // {
    //     type: 'line',
    //     // x-reference is assigned to the x-values
    //     xref: 'x',
    //     // y-reference is assigned to the plot paper [0,1]
    //     yref: 'paper',
    //     x0: '378',
    //     y0: 0,
    //     x1: '378',
    //     y1: 1,
    //     fillcolor: '#ebd831',
    //     opacity: 0.6,
    //     line: {
    //         color: '#ebd831',
    //         width: 1,
    //         dash: 'dot'
    //     }
    // },
    // {
    //     type: 'line',
    //     // x-reference is assigned to the x-values
    //     xref: 'x',
    //     // y-reference is assigned to the plot paper [0,1]
    //     yref: 'paper',
    //     x0: '504',
    //     y0: 0,
    //     x1: '504',
    //     y1: 1,
    //     fillcolor: '#b9eb31',
    //     opacity: 0.6,
    //     line: {
    //         color: '#b9eb31',
    //         width: 1,
    //         dash: 'dot'
    //     }
    // },
    // {
    //     type: 'line',
    //     // x-reference is assigned to the x-values
    //     xref: 'x',
    //     // y-reference is assigned to the plot paper [0,1]
    //     yref: 'paper',
    //     x0: '630',
    //     y0: 0,
    //     x1: '630',
    //     y1: 1,
    //     fillcolor: '#59b823',
    //     opacity: 0.6,
    //     line: {
    //         width: 1,
    //         color: '#59b823',
    //         dash: 'dot'
    //     }
    // },
    // {
    //     type: 'line',
    //     // x-reference is assigned to the x-values
    //     xref: 'x',
    //     // y-reference is assigned to the plot paper [0,1]
    //     yref: 'paper',
    //     x0: '756',
    //     y0: 0,
    //     x1: '756',
    //     y1: 1,
    //     fillcolor: '#0b7540',
    //     opacity: 0.6,
    //     line: {
    //         width: 1,
    //         color: '#0b7540',
    //         dash: 'dot'
    //     }
    // },
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
};

let config = { responsive: true, displaylogo: false };
let d3 = Plotly.d3;
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
