inicializaComponentes();
layout = 'fitDataFill';
responsiveLayout = true;
let table = '';
let tabledata = null;
let agrupado = false;

function inicializaComponentes() {
  $(document).ready(function () {
    tabelaRelatorios();
    initModal();

    initElementos();
  });
}

function initElementos() {
  document.getElementById('agrupaRel').addEventListener('click', function () {
    if (agrupado == false) {
      table.setGroupBy(['tipoRel']);
      agrupado = true;
    } else {
      table.setGroupBy();
      agrupado = false;
    }
  });
}

function initModal() {
  $('.modal').modal();
}

function tabelaRelatorios() {
  tabledata = JSON.parse($('#relatorios').attr('data-relatorios'));
  table = new Tabulator('#tabelaRelatorios', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitColumns',
    responsiveLayout: 'collapse',
    initialSort: [{ column: 'dtRel', dir: 'desc' }],
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
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
        title: 'id',
        field: 'dtRel',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        //sorterParams: { format: 'DD/MM/YYYY' },
      },
      {
        title: 'Data do Envio',
        field: 'dtEnvio',
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        sorterParams: { format: 'DD/MM/YYYY' },
      },
      {
        title: 'Data da Extração',
        field: 'dtExtracao',
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        sorterParams: { format: 'DD/MM/YYYY' },
      },
      {
        title: 'Tipo Relatório',
        field: 'tipoRel',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
      },
      // {
      //   title: 'Semana',
      //   field: 'semana',
      //   sorter: 'string',
      //   hozAlign: 'left',
      //   editor: false,
      //   headerFilter: 'input',
      //   topCalc: 'count',
      //   responsive: 0,
      // },
      {
        title: 'Enviado por:',
        field: 'nomeUsuarioLogado',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
      },
      {
        formatter: formatDeleta,
        cellClick: clickDeleta,
        width: 40,
        responsive: 0,
        hozAlign: 'center',
      },
    ],
  });
}

function colore(cell, formatterParams, valor) {
  let value = cell.getValue() ? cell.getValue() : valor;

  if (cell.getRow().getData().tipoRel.includes('Estoque')) {
    let elem = document.querySelector('.solAprovada');
    let estilo = getComputedStyle(elem);
    cell.getRow().getElement().style.backgroundColor = estilo.backgroundColor;
    cell.getRow().getElement().style.color = estilo.color;
  }
  if (cell.getRow().getData().tipoRel.includes('REGAP')) {
    let elem = document.querySelector('.solRejeitada');
    let estilo = getComputedStyle(elem);
    cell.getRow().getElement().style.backgroundColor = estilo.backgroundColor;
    cell.getRow().getElement().style.color = estilo.color;
  }
  if (cell.getRow().getData().tipoRel.includes('novoREGAP')) {
    let elem = document.querySelector('.solEncaminhada');
    let estilo = getComputedStyle(elem);
    cell.getRow().getElement().style.backgroundColor = estilo.backgroundColor;
    cell.getRow().getElement().style.color = estilo.color;
  }
  if (cell.getRow().getData().tipoRel.includes('REINP')) {
    let elem = document.querySelector('.solEncaminhada');
    let estilo = getComputedStyle(elem);
    cell.getRow().getElement().style.backgroundColor = estilo.backgroundColor;
    cell.getRow().getElement().style.color = estilo.color;
  }
  if (cell.getRow().getData().tipoRel.includes('REJUL')) {
    let elem = document.querySelector('.solEncaminhada');
    let estilo = getComputedStyle(elem);
    cell.getRow().getElement().style.backgroundColor = estilo.backgroundColor;
    cell.getRow().getElement().style.color = estilo.color;
  }
  return value;
}

let formatDeleta = function formatNome(cell) {
  return `<a class='btn-rel-deleta' title='Excluir' href='#modal1'><i class='material-icons red-text'>cancel</i></a>`;
};

function clickDeleta(e, cell) {
  e.preventDefault();
  $('.btn-rel-deleta').addClass('modal-trigger');
  montaModal(e, cell);
  //initSelect();
}

function montaModal(e, cell) {
  $('.hModal').text(`Exclusão de Relatório`);
  $('.pModal').append(
    `<p class="pModal">
      <h6>Confirma exclusão do seguinte relatório?</h6>
              <br/>
              <strong>id:</strong> ${cell.getRow().getData().dtRel}<br />
              <strong>Tipo:</strong> ${cell.getRow().getData().tipoRel}<br/>
              <strong>Data de Extração:</strong> ${
                cell.getRow().getData().dtExtracao
              }<br/>
              <strong>Semana:</strong> ${
                cell.getRow().getData().semana
                  ? cell.getRow().getData().semana
                  : 'N/D'
              }<br/>
             </p>`,
  );

  $('.concorda').click(function () {
    exclui(e, cell);
  });
  $('.cancela').click(function () {
    $('.hModal').text('');
    $('.pModal').text('');
  });
}

function exclui(e, cell) {
  let id = cell.getRow().getData().dtRel;
  $.ajax({
    type: 'DELETE',
    url: `/julgamento/restrito/relatorios/`,
    //data: { id: id },
    data: { id: id },
    success: function (result) {
      console.log(result);
      var toastHTML = `<span>${result.msg.deletedCount} Relatório excluído com sucesso! Este relatório continha ${result.regap.deletedCount} conselheiros. Aguarde a recarga da página.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      setInterval(() => {
        location.reload();
      }, 3000);
    },
    error: function (result) {
      console.log(`Erro: ${result}`);
    },
  });
}
