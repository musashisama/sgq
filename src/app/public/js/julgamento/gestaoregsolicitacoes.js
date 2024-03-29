inicializaComponentes();
layout = 'fitDataFill';
responsiveLayout = true;
let table = '';
let tabledata = null;
let agrupado = false;
let agrupadoC = false;

function inicializaComponentes() {
  $(document).ready(function () {
    tabelaSolicitacoes();
    initOpcoes();
    initElementos();
    initSelect();
  });
}

function initSelect() {
  $('select').formSelect();
}

function initElementos() {
  document.getElementById('agrupaSol').addEventListener('click', function () {
    if (agrupado == false) {
      table.setGroupBy(['tipo']);
      agrupado = true;
    } else {
      table.setGroupBy();
      agrupado = false;
    }
  });
  document.getElementById('agrupaCons').addEventListener('click', function () {
    if (agrupadoC == false) {
      table.setGroupBy(['nome']);
      agrupadoC = true;
    } else {
      table.setGroupBy();
      agrupadoC = false;
    }
  });
}

function initOpcoes() {
  $('.status').change(() => {
    table.setFilter('status', 'like', $('#status option:selected').val());
    if ($('#status option:selected').val() == 'Todas') {
      table.removeFilter('status', 'like', $('#status option:selected').val());
    } else {
      table.setFilter('status', 'like', $('#status option:selected').val());
    }
  });
}

function tabelaSolicitacoes() {
  tabledata = JSON.parse($('#solicitacoes').attr('data-solicitacoes'));
  table = new Tabulator('#tabelaSolicitacoes', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitColumns',
    responsiveLayout: 'collapse',
    initialSort: [{ column: 'dtCriacao', dir: 'desc' }],
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        formatter: formatNome,
        width: 40,
        hozAlign: 'center',
      },
      {
        formatter: 'responsiveCollapse',
        width: 50,
        minWidth: 30,
        hozAlign: 'left',
        resizable: false,
        headerSort: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Id da Solicitação',
        field: 'uniqueId',
        sorter: 'string',
        hozAlign: 'left',
        formatter: coloreID,
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'Conselheiro',
        field: 'nome',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'Unidade',
        field: 'unidade',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        visible: false,
        download: true,
      },
      {
        title: 'Data da Solicitação',
        field: 'dtCriacao',
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        sorterParams: { format: 'DD/MM/YYYY - HH:mm' },
        download: true,
      },
      {
        title: 'Tipo da Solicitação',
        field: 'tipo',
        sorter: 'string',
        hozAlign: 'left',
        formatter: coloreID,
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'Status da Solicitação',
        field: 'status',
        sorter: 'string',
        formatter: colore,
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'html',
        field: 'html',
        sorter: 'string',
        formatter: colore,
        hozAlign: 'left',
        editor: false,
        visible: false,
        headerFilter: 'input',
        responsive: 0,
        download: false,
      },
      {
        title: 'Tratada por',
        field: 'servDipaj',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        visible: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'Data da Aprovação/Rejeição',
        field: 'dtAproveReject',
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        sorterParams: { format: 'DD/MM/YYYY - HH:mm' },
        download: true,
        visible: false,
      },
      {
        title: 'Justificativas',
        field: 'justificativas',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        visible: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
    ],
  });
}

function colore(cell, formatterParams, valor) {
  let value = cell.getValue() ? cell.getValue() : valor;
  if (cell.getRow().getData().status.includes('Aprovada com')) {
    let elem = document.querySelector('.solAprovada');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
    cell.getElement().style.color = estilo.color;
  }
  if (cell.getRow().getData().status.includes('Aprovada sem')) {
    let elem = document.querySelector('.solAprovadaSem');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
    cell.getElement().style.color = estilo.color;
  }
  if (cell.getRow().getData().status == 'Aprovada') {
    let elem = document.querySelector('.solAprovada');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
    cell.getElement().style.color = estilo.color;
  }
  if (cell.getRow().getData().status.includes('Rejeitada')) {
    let elem = document.querySelector('.solRejeitada');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
    cell.getElement().style.color = estilo.color;
  }
  if (cell.getRow().getData().status.includes('Encaminhada')) {
    let elem = document.querySelector('.solEncaminhada');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
    cell.getElement().style.color = estilo.color;
  }
  return value;
}

function coloreID(cell, formatterParams, valor) {
  let value = cell.getValue() ? cell.getValue() : valor;

  if (cell.getRow().getData().tipo.includes('COGEC')) {
    let elem = document.querySelector('.solRejeitada');
    let estilo = getComputedStyle(elem);
    cell.getElement().style.backgroundColor = estilo.backgroundColor;
    cell.getElement().style.color = estilo.color;
  }

  return value;
}

let formatNome = function formatNome(cell) {
  return `<a class='black-text btndetalha' href=${`/julgamento/restrito/detalhasolicitacao/${
    cell.getRow().getData().uniqueId
  }`} title='Detalhar Solicitação'><i class='material-icons'>details</i></a>`;
};

function montaModal(e, cell, user) {
  $('.hModal').text(``);
  $('.pModal').text(``);
  $('.hModal').text(`Detalhamento da Solicitação`);
  $('.pModal').append(`${cell.getRow().getData().html}`);
  console.log(cell.getRow().getData().html);
  btnArq();
  $('.concorda').click(function () {
    $('.hModal').text('');
    $('.pModal').text('');
    $('.hModal').empty();
    $('.pModal').empty();
  });
  $('.cancela').click(function () {
    $('.hModal').text('');
    $('.pModal').text('');
    $('.hModal').empty();
    $('.pModal').empty();
  });
}
function btnArq() {
  $('.arquivos').click((e) => {
    let a = $(e.target).attr('id');
    pegaArquivo(a);
  });
}
function pegaLinks(cell) {
  let a =
    typeof cell.getRow().getData().arquivos !== 'undefined'
      ? cell.getRow().getData().arquivos
      : [];
  let c = '';
  a.forEach((b, i) => {
    c += `</br><a class='arquivos' href='#' id='${b}'> Anexo ${
      i + 1
    }  <i class="material-icons prefix">attach_file</i></a>`;
  });
  return c;
}
async function pegaArquivo(arquivo) {
  $.ajax({
    url: `/julgamento/restrito/arqdown/${arquivo}`,
    type: 'GET',
    xhrFields: {
      responseType: 'blob',
    },
    success: function (data) {
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(data);
      a.href = url;
      a.download = arquivo;
      document.body.append(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      return result;
    },
  });
}

function carregaSol(registro, metodo) {
  registro.dtAproveReject = moment().format('DD/MM/YYYY, HH:mm:ss');
  $.ajax({
    url: '/julgamento/restrito/detalhasolicitacao',
    data: registro,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      setInterval(() => {
        location.reload();
      }, 1000);
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      setInterval(() => {
        location.reload();
      }, 1000);
    },
  });
}

function handleSOL(registro, metodo) {
  registro.dtAproveReject = moment().format('DD/MM/YYYY, HH:mm:ss');
  $.ajax({
    url: '/julgamento/restrito/gestaosolicitacoes',
    data: registro,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      setInterval(() => {
        location.reload();
      }, 1000);
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      setInterval(() => {
        location.reload();
      }, 1000);
    },
  });
}
