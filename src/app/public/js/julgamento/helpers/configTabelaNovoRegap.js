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
  let calendario = $('#dataCAL').attr('data-cal')
    ? JSON.parse($('#dataCAL').attr('data-cal'))
    : [{}];
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
    data.atividade.includes('Para Relatar') &&
    data.situacao.includes('AGUARDANDO PAUTA')
  );
}

function retJuntada(data) {
  return data.juntada.includes('S');
}

function returnRep(data) {
  return !data.obs.includes('.REP.');
}

let retornoSepoj = function retornoSepoj(cell) {
  if (cell.getRow().getData().ultEquipe.includes('SEPOJ-COSUP-CARF-MF-DF')) {
    return 'Sim';
  } else return 'Não';
};

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
      table.addFilter('valorOrig', '<=', 8000000);
    } else {
      table.removeFilter('valorOrig', '<=', 8000000);
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
  if ($('#mostraColunasAtividade').length > 0) {
    document
      .getElementById('mostraColunasAtividade')
      .addEventListener('click', function () {
        if (agrupado == false) {
          table.setGroupBy(['atividade', 'situacao']);
          agrupado = true;
        } else {
          table.setGroupBy();
          agrupado = false;
        }
      });

    $('.Atividade').change(() => {
      table.setFilter(
        'atividade',
        '=',
        $('#atividadeSelect option:selected').val(),
      );
      if ($('#atividadeSelect option:selected').val() == 'Todas') {
        table.removeFilter(
          'atividade',
          '=',
          $('#atividadeSelect option:selected').val(),
        );
      } else {
        table.setFilter(
          'atividade',
          '=',
          $('#atividadeSelect option:selected').val(),
        );
      }
    });
  }
}

let formatNome = function formatNome(cell) {
  return `<a href='/julgamento/restrito/regap_consolidado/detalha/${
    cell.getRow().getData().cpf
  }&${
    $('#dataRelRegap option:selected').val()
      ? $('#dataRelRegap option:selected').val()
      : $('#dataRelEstoque option:selected').val()
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
let downloadValor = function (value, data, type, params, column) {
  return value.replace('.', ',');
};

function coloreProc(cell, formatterParams, valor) {
  let value = cell.getValue() ? cell.getValue() : valor;

  if (
    cell.getRow().getData().questionamento == 'EMBARGOS DE DECLARAÇÃO' &&
    cell.getRow().getData().ultEquipe.includes('DIPRO') &&
    cell.getRow().getData().ultAtividade == 'Distribuir / Sortear'
  ) {
    let elem = document.querySelector('.LegEmbargoSort');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (
    cell.getRow().getData().questionamento != 'EMBARGOS DE DECLARAÇÃO' &&
    cell.getRow().getData().ultEquipe.includes('DIPRO') &&
    cell.getRow().getData().ultAtividade == 'Tratar Retorno de Processo'
  ) {
    let elem = document.querySelector('.LegRetornoDilg');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (
    cell.getRow().getData().questionamento == 'EMBARGOS DE DECLARAÇÃO' &&
    cell.getRow().getData().ultEquipe.includes('DIPRO') &&
    cell.getRow().getData().ultAtividade == 'Tratar Retorno de Processo'
  ) {
    let elem = document.querySelector('.LegEmbargo');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (cell.getRow().getData().obs.includes('PARADIGMA')) {
    let elem = document.querySelector('.LegParadigma');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (cell.getRow().getData().obs.includes('.REP.')) {
    let elem = document.querySelector('.LegRepetitivo');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (
    cell.getRow().getData().questionamento == '' &&
    cell.getRow().getData().apenso.includes('S') &&
    cell.getRow().getData().situacao == ''
  ) {
    let elem = document.querySelector('.LegApenso');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
  }
  if (cell.getRow().getData().assunto) {
    if (
      cell.getRow().getData().assunto.includes('PARADIGMA') ||
      cell.getRow().getData().assunto.includes('Paradigma') ||
      cell.getRow().getData().assunto.includes('paradigma')
    ) {
      let elem = document.querySelector('.LegProcessoParadigma');
      let estilo = getComputedStyle(elem);
      cell.getElement().style.color = estilo.color;
      cell.getElement().style.backgroundColor = estilo.backgroundColor;
    }
  }
  if (cell.getRow().getData().prioridade) {
    if (
      cell.getRow().getData().prioridade.includes('MAXIMA') ||
      cell.getRow().getData().prioridade.includes('ALTA')
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
    cell.getRow().getData().atividade == 'Para Relatar' &&
    cell.getRow().getData().situacao == 'AGUARDANDO PAUTA'
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
    cell.getRow().getData().atividade == 'Formalizar Decisao' &&
    value >= 30
  ) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (cell.getRow().getData().atividade == 'Formalizar Decisao' && value < 30) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (
    cell.getRow().getData().atividade == 'Formalizar Voto Vencedor' &&
    value >= 30
  ) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (
    cell.getRow().getData().atividade == 'Formalizar Voto Vencedor' &&
    value < 30
  ) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }

  if (
    cell.getRow().getData().atividade == 'Apreciar e Assinar Documento' &&
    value >= 15
  ) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (
    cell.getRow().getData().atividade == 'Apreciar e Assinar Documento' &&
    value < 15
  ) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (cell.getRow().getData().atividade == 'Corrigir Decisão' && value >= 1) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  return value;
}

function retornaDias(atividade) {
  return +moment().diff(moment(atividade, 'DD/MM/YYYY'), 'days') + 1;
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
