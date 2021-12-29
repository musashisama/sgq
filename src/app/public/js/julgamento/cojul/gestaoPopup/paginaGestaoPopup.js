inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initModal();
    tabelaPopups();
  });
}

function initModal() {
  $('.modal').modal();
}

function tabelaPopups() {
  tabledata = JSON.parse($('#dataPopups').attr('data-popup'));
  table = new Tabulator('#tabelaPopups', {
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
        title: 'Data do Popup',
        field: 'dataPopup',
        sorter: 'date',
        sorterParams: { format: 'DD/MM/YYYY' },
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'Título',
        field: 'titulo',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'Conteúdo',
        field: 'conteudo',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        download: true,
      },
      {
        title: 'Ativo?',
        field: 'ativo',
        formatter: 'tickCross',
        cellClick: clickAtivoPopup,
        hozAlign: 'center',
        // formatterParams: {
        //   allowEmpty: false,
        //   allowTruthy: true,
        //   tickElement: "<i class='fa fa-check'></i>",
        //   crossElement: "<i class='fa fa-times'></i>",
        // },
      },
      {
        title: 'Excluir Popup',
        formatter: formatDeletaPopup,
        cellClick: clickExcluiPopup,
        width: 140,
        hozAlign: 'center',
      },
    ],
  });
}

let formatEditaPopup = function formatEditaPopup(cell) {
  return `<a class='black-text btndetalha' href=/julgamento/restrito/gestaopopup/${
    cell.getRow().getData().uniqueId
  } title='Editar popup'><i class='material-icons'>details</i></a>`;
};

function clickEditaPopup(e, cell) {
  e.preventDefault();
  $('.btndetalha').addClass('modal-trigger');
  montaModal(e, cell, 'Detalhamento do Popup');
}

function clickAtivoPopup(e, cell) {
  e.preventDefault();
  console.log(cell.getRow().getData().ativo);
  handlePopup(
    (dados = {
      uniqueId: cell.getRow().getData().uniqueId,
      ativo:
        cell.getRow().getData().ativo == 'false' ||
        cell.getRow().getData().ativo == false
          ? true
          : false,
    }),
    'POST',
  );
}

function clickExcluiPopup(e, cell) {
  e.preventDefault();
  handlePopup(
    (dados = {
      uniqueId: cell.getRow().getData().uniqueId,
      status: 'Popup Excluído',
    }),
    'DELETE',
  );
}

let formatDeletaPopup = function formatDeletaPopup(cell) {
  return `<a id='btnDeleta' class='red-text' href='#' title='Excluir Popup'> <i class="red-text	far fa-trash-alt"/></a>`;
};

function handlePopup(registro, metodo) {
  $.ajax({
    url: '/julgamento/restrito/gestaopopup/atualiza',
    data: registro,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
      window.location.replace('/julgamento/restrito/paginagestaopopup/');
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
    },
  });
}
