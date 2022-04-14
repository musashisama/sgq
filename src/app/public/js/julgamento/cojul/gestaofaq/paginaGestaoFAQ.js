inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initModal();
    tabelaFAQ();
  });
}

function initModal() {
  $('.modal').modal();
}

function tabelaFAQ() {
  tabledata = JSON.parse($('#tabelaFAQ').attr('data-faq'));
  table = new Tabulator('#tabelaFAQ', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitColumns',
    responsiveLayout: 'collapse',
    initialSort: [{ column: '_id', dir: 'desc' }],
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        formatter: formatEditaPopup,
        //cellClick: clickEditaPopup,
        width: 40,
        hozAlign: 'center',
      },
      {
        title: 'id ',
        field: '_id',
        sorter: 'string',
        visible: false,
      },
      {
        title: 'Pergunta',
        field: 'pergunta',
        sorter: 'string',
        formatter: formataPergunta,
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'Resposta',
        field: 'resposta',
        formatter: formataPergunta,
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'Seção FAQ',
        field: 'secaoFAQ',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'Excluir Pergunta',
        formatter: formatDeletaPopup,
        cellClick: clickExcluiPopup,
        width: 140,
        hozAlign: 'center',
      },
    ],
  });
}

let formatEditaPopup = function formatEditaPopup(cell) {
  return `<a class='black-text btndetalha' href=/julgamento/restrito/cadastrafaqdipaj/${
    cell.getRow().getData().uniqueId
  } title='Editar Pergunta'><i class='material-icons'>details</i></a>`;
};

let formataPergunta = function formataPergunta(cell) {
  let regex = /(<([^>]+)>)/gi,
    body = cell.getValue();
  return body.replace(regex, '');
};

function clickEditaPopup(e, cell) {
  e.preventDefault();
  $('.btndetalha').addClass('modal-trigger');
  montaModal(e, cell, 'Detalhamento da Pergunta');
}

function clickExcluiPopup(e, cell) {
  e.preventDefault();
  console.log(cell.getRow().getData().uniqueId);
  handlePopup(
    (dados = {
      uniqueId: cell.getRow().getData().uniqueId,
      status: 'Pergunta Excluída',
    }),
    'DELETE',
  );
}

let formatDeletaPopup = function formatDeletaPopup(cell) {
  return `<a id='btnDeleta' class='red-text' href='#' title='Excluir Popup'> <i class="red-text	far fa-trash-alt"/></a>`;
};

function handlePopup(registro, metodo) {
  $.ajax({
    url: '/julgamento/restrito/cadastrafaqdipaj/atualiza',
    data: registro,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
      window.location.replace('/julgamento/restrito/gestaoFAQ/');
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
    },
  });
}
