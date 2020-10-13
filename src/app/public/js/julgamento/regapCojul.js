inicializaComponentes();
initialSort = [{ column: 'nome', dir: 'asc' }];
function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    dataTable();
    initTabs();
    elementosTabela();
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
      columnCalcs: false,
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
        title: 'Processo',
        field: 'Processo',
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
        field: 'Contribuinte',
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
        title: 'Observações',
        field: 'Observacoes',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Prioridade',
        field: 'Prioridade',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Assunto',
        field: 'Assunto',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },

      {
        title: 'Motivo da Prioridade',
        field: 'Motivo_Prioridade',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
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
        responsive: 2,
        download: false,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
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
