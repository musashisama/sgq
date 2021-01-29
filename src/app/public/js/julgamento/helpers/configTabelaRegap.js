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
layout = 'fitDataFill';
responsiveLayout = true;
let table = null;
let tabledata = '';
let agrupado = false;
let agrupadoT = false;
let d3 = Plotly.d3;
let minimoApto = 12000000;
function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    initModal();
    initElementos();
    initCheckboxes();
    calendario();
  });
}
function initSelect() {
  $('select').formSelect();
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
function agPauta(data) {
  return (
    data.Atividade.includes('Para Relatar') &&
    data.Situacao.includes('AGUARDANDO PAUTA')
  );
}

function retJuntada(data) {
  return data.Ind_Juntada.includes('S');
}

function returnRep(data) {
  return !data.Observacoes.includes('.REP.');
}

function initCheckboxes() {
  $(`#repetitivosCheck`).change(() => {
    if ($(`#repetitivosCheck`).prop('checked')) {
      table.addFilter(returnRep);
    } else {
      table.removeFilter(returnRep);
    }
  });
  $(`#aguardandoPauta`).change(() => {
    if ($(`#aguardandoPauta`).prop('checked')) {
      table.addFilter(agPauta);
    } else {
      table.removeFilter(agPauta);
    }
  });
  $(`#abaixoUM`).change(() => {
    if ($(`#abaixoUM`).prop('checked')) {
      table.addFilter('Valor_Originario', '<=', minimoApto);
    } else {
      table.removeFilter('Valor_Originario', '<=', minimoApto);
    }
  });
  $(`#juntadaCheck`).change(() => {
    if ($(`#juntadaCheck`).prop('checked')) {
      table.addFilter(retJuntada);
    } else {
      table.removeFilter(retJuntada);
    }
  });
  $(`#expandirCheck`).change(() => {
    if ($(`#expandirCheck`).prop('checked')) {
      let element = document.getElementById('caixa');
      element.classList.remove('container');
    } else {
      let element = document.getElementById('caixa');
      element.classList.add('container');
    }
  });
}

function initElementos() {
  document
    .getElementById('mostraColunasAtividade')
    .addEventListener('click', function () {
      if (agrupado == false) {
        table.setGroupBy(['Atividade', 'Situacao']);
        agrupado = true;
      } else {
        table.setGroupBy();
        agrupado = false;
      }
    });

  $('.Atividade').change(() => {
    table.setFilter(
      'Atividade',
      '=',
      $('#atividadeSelect option:selected').val(),
    );
    if ($('#atividadeSelect option:selected').val() == 'Todas') {
      table.removeFilter(
        'Atividade',
        '=',
        $('#atividadeSelect option:selected').val(),
      );
    } else {
      table.setFilter(
        'Atividade',
        '=',
        $('#atividadeSelect option:selected').val(),
      );
    }
  });
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
  if (valor >= minimoApto) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (valor < minimoApto) {
    cell.getElement().style.color = 'rgb(63, 138, 2)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  return `${valor.toLocaleString('pt-BR', formato)}`;
};
let downloadValor = function (value, data, type, params, column) {
  return typeof value != 'undefined' ? value.replace('.', ',') : value;
};

function coloreProc(cell, formatterParams, valor) {
  let value = cell.getValue() ? cell.getValue() : valor;

  if (
    cell.getRow().getData().Questionamento_CARF == 'EMBARGOS DE DECLARAÇÃO' &&
    cell.getRow().getData().Equipe_Ultima.includes('DIPRO') &&
    cell.getRow().getData().AtividadeUltima == 'Distribuir / Sortear'
  ) {
    let elem = document.querySelector('.LegEmbargoSort');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (
    cell.getRow().getData().Questionamento_CARF != 'EMBARGOS DE DECLARAÇÃO' &&
    cell.getRow().getData().Equipe_Ultima.includes('DIPRO') &&
    cell.getRow().getData().AtividadeUltima == 'Tratar Retorno de Processo'
  ) {
    let elem = document.querySelector('.LegRetornoDilg');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (
    cell.getRow().getData().Questionamento_CARF == 'EMBARGOS DE DECLARAÇÃO' &&
    cell.getRow().getData().Equipe_Ultima.includes('DIPRO') &&
    cell.getRow().getData().AtividadeUltima == 'Tratar Retorno de Processo'
  ) {
    let elem = document.querySelector('.LegEmbargo');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (cell.getRow().getData().Observacoes.includes('PARADIGMA')) {
    let elem = document.querySelector('.LegParadigma');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (cell.getRow().getData().Observacoes.includes('.REP.')) {
    let elem = document.querySelector('.LegRepetitivo');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (
    cell.getRow().getData().Questionamento_CARF == '' &&
    cell.getRow().getData().Ind_Apenso.includes('S') &&
    cell.getRow().getData().Situacao == ''
  ) {
    let elem = document.querySelector('.LegApenso');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (cell.getRow().getData().Assunto) {
    if (
      cell.getRow().getData().Assunto.includes('PARADIGMA') ||
      cell.getRow().getData().Assunto.includes('Paradigma') ||
      cell.getRow().getData().Assunto.includes('paradigma')
    ) {
      let elem = document.querySelector('.LegProcessoParadigma');
      let estilo = getComputedStyle(elem);
      cell.getElement().style.color = estilo.color;
      cell.getElement().style.backgroundColor = estilo.backgroundColor;
    }
  }
  if (cell.getRow().getData().Prioridade) {
    if (
      cell.getRow().getData().Prioridade.includes('MAXIMA') ||
      cell.getRow().getData().Prioridade.includes('ALTA')
    ) {
      let elem = document.querySelector('.LegPrioridade');
      let estilo = getComputedStyle(elem);
      cell.getElement().style.color = estilo.color;
      cell.getElement().style.backgroundColor = estilo.backgroundColor;
    }
  }
  return value;
}

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
function ajustaData(data, dw = false) {
  let hoje = new Date().getTime();
  let dias = 1000 * 60 * 60 * 24;
  if (dw == true) {
    const arrayMes = [
      'jan',
      'fev',
      'mar',
      'abr',
      'mai',
      'jun',
      'jul',
      'ago',
      'set',
      'out',
      'nov',
      'dez',
    ];
    const arrayData = data.split('/');
    const dataAjustada = moment(
      new Date(arrayData[2], arrayMes.indexOf(arrayData[1]), arrayData[0]),
      'DD/MM/YYYY',
    );
    return dataAjustada;
  }
  const arrayData = data.split('/');
  const dataAjustada = new Date(arrayData[2], arrayData[1] - 1, arrayData[0]);
  return dataAjustada;
}
