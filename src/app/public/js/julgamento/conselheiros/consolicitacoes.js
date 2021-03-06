inicializaComponentes();
layout = 'fitDataFill';
responsiveLayout = true;
let table = '';
let tabledata = null;
let agrupado = false;

function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    tabelaSolicitacoes();
    initModal();
    initOpcoes();
    initElementos();
  });
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
}

function initSelect() {
  $('select').formSelect();
}

function initModal() {
  $('.modal').modal();
}

function initOpcoes() {
  $('.status').change(() => {
    table.setFilter('status', '=', $('#status option:selected').val());
    if ($('#status option:selected').val() == 'Todas') {
      table.removeFilter('status', '=', $('#status option:selected').val());
    } else {
      table.setFilter('status', '=', $('#status option:selected').val());
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
        cellClick: clickEdita,
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
        editor: false,
        headerFilter: 'input',
        responsive: 0,
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
        title: 'Excluir Solicitação',
        formatter: formatDeleta,
        cellClick: clickDeleta,
        width: 140,
        hozAlign: 'center',
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
    ],
  });
}

function colore(cell, formatterParams, valor) {
  let value = cell.getValue() ? cell.getValue() : valor;

  if (cell.getRow().getData().status.includes('Aprovada')) {
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

let formatNome = function formatNome(cell) {
  return `<a class='black-text btndetalha' href='#modal1' title='Detalhar Solicitação'><i class='material-icons'>details</i></a>`;
};

let formatDeleta = function formatDeleta(cell) {
  if (cell.getRow().getData().status.includes('Encaminhada para Análise')) {
    return `<a id='btnDeleta' class='red-text' href='#modal1' title='Excluir Solicitação'> <i class="red-text	far fa-trash-alt"/></a>`;
  } else {
    return ``;
  }
};

function clickEdita(e, cell) {
  e.preventDefault();
  $('.btndetalha').addClass('modal-trigger');
  montaModal(e, cell, 'Detalhamento da Solicitação');
}

function clickDeleta(e, cell) {
  e.preventDefault();
  if (!cell.getRow().getData().status.includes('Encaminhada para Análise')) {
    var toastHTML = `<span>Solicitações já aprovadas ou rejeitadas não podem ser excluídas.</span>`;
    M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
  } else {
    handleSOL(
      (dados = {
        uniqueId: cell.getRow().getData().uniqueId,
        status: 'Solicitação Excluída pelo Usuário',
      }),
      'DELETE',
    );
  }
}

function montaModal(e, cell, titulo) {
  $('.hModal').text(``);
  $('.pModal').text(``);
  $('.hModal').text(titulo);
  $('.pModal').append(`
  ${cell.getRow().getData().html}
  <div class='row'>
  <p><strong>Status:</strong> ${cell.getRow().getData().status}</p>
  <p><strong>Justificativas:</strong> ${
    cell.getRow().getData().justificativas
      ? cell.getRow().getData().justificativas
      : ''
  }</p>
  </div>
  `);

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

function handleSOL(registro, metodo) {
  $.ajax({
    url: '/julgamento/conselheiros/registro-solicitacoes',
    data: registro,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Solicitação nº ${result} excluída com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });

      setTimeout((a) => {
        location.reload();
      }, 2500);
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro na exclusão da solicitação. Tente novamente mais tarde.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    },
  });
}
