inicializaComponentes();
layout = 'fitDataFill';
let table = null;
let tabledata = '';
responsiveLayout = true;
let agrupado = false;
let agrupadoT = false;
initialSort = [{ column: 'nome', dir: 'asc' }];
function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    dataTable();
    initTabs();
    initModal();
    elementosTabela();
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

function initTabs() {
  $('.tabs').tabs();
}

function elementosTabela() {
  $('.Atividade').change(() => {
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
    downloadConfig: {
      //  columnHeaders:false, //do not include column headers in downloaded table
      //columnGroups:false, //do not include column groups in column headers for downloaded table
      //rowGroups:false, //do not include row groups in downloaded table
      columnCalcs: false, //do not include column calcs in downloaded table
      //dataTree:false, //do not include data tree in downloaded table
    },
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
        title: 'Turma',
        field: 'turma',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Câmara',
        field: 'camara',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Seção',
        field: 'setor',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: false,
        responsive: 2,
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
        editor: false,
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
      {
        title: 'Questionamento',
        field: 'Questionamento_CARF',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
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
  shapes: [],
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
