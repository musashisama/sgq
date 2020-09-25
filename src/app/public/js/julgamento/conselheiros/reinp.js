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
let tableReinp,
  tableReinpDet = null;
let d3 = Plotly.d3;
let agrupado = false;

function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    formataDados();
  });
}
function formataDados() {
  let data = JSON.parse($('#idProdutividade').attr('data-reinp'));
  let dados = data[0] ? data[0] : { trimestre: { T1: 0, T2: 0, T3: 0, T4: 0 } };
  let T1 = dados.trimestre.T1 ? dados.trimestre.T1 : 0;
  let T2 = dados.trimestre.T2 ? dados.trimestre.T2 : 0;
  let T3 = dados.trimestre.T3 ? dados.trimestre.T3 : 0;
  let T4 = dados.trimestre.T4 ? dados.trimestre.T4 : 0;

  let dadosTabela = [
    {
      T1: +T1.toFixed(2),
      T2: +T2.toFixed(2),
      T3: +T3.toFixed(2),
      T4: +T4.toFixed(2),
    },
  ];
  dataTableReinp(dadosTabela);
  let arrayMes = dados.detalhamento ? dados.detalhamento : [{}];
  dataTableReinpDet(arrayMes.flat());
  document.getElementById('agrupaMes').addEventListener('click', function () {
    if (agrupadoReinp == false) {
      tableReinpDet.setGroupBy(['mes']);
      agrupadoReinp = true;
    } else {
      tableReinpDet.setGroupBy();
      agrupadoReinp = false;
    }
  });
}
function dataTableReinp(msg) {
  tableReinp = new Tabulator('#tabelaReinp', {
    data: msg,
    height: '200px',
    minHeight: '200px',
    maxHeight: '900px',
    layout: layout,
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        title: '1º Trimestre',
        field: 'T1',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
      {
        title: '2º Trimestre',
        field: 'T2',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
      {
        title: '3º Trimestre',
        field: 'T3',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
      {
        title: '4º Trimestre',
        field: 'T4',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

let formatTrimestre = function formatTrimestre(cell) {
  const valor = +cell.getValue();
  if (valor >= 378) {
    cell.getElement().style.color = 'green';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (valor < 378) {
    cell.getElement().style.color = 'red';
    cell.getElement().style.fontWeight = 'bolder';
  }
  return valor;
};

function dataTableReinpDet(msg) {
  tableReinpDet = new Tabulator('#tabelaReinpDet', {
    data: msg,
    pagination: 'local',
    height: '600px',
    minHeight: '300px',
    maxHeight: '900px',
    layout: 'fitData',
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        formatter: 'responsiveCollapse',
        width: 50,
        minWidth: 30,
        hozAlign: 'center',
        resizable: true,
        headerSort: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Processo',
        field: 'processo',
        width: 150,
        minWidth: 130,
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Mês de Indicação',
        field: 'mes',
        sorter: 'string',
        hozAlign: 'center',
        topCalc: countCalc,
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Contribuinte',
        field: 'contribuinte',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Horas Efetivas',
        field: 'horasEfetivas',
        topCalc: somaCalc,
        sorter: 'number',
        hozAlign: 'center',
        mutator: formatValorReinp,
        accessorDownload: downloadValorReinp,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Código',
        field: 'classificacao.codigo',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Descrição',
        field: 'classificacao.descricao',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

let downloadValorReinp = function (value, data, type, params, column) {
  let valor = value.toLocaleString();
  return valor.replace('.', ',');
};

let formatValorReinp = function (valor, data, type, params, column) {
  if (valor == 7.8) {
    valor = 8;
  }

  return valor;
};
