inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    btnCriaIndicacao();
    tabelaIndicacoes();
    initModal();
    initSelect();
    initDatePicker();
  });
}

function initModal() {
  $('.modal').modal();
}

function initSelect() {
  $('select').formSelect();
}

function btnCriaIndicacao() {
  $('.btn-cria').click((e) => {
    $('#aModal').addClass('modal-trigger');
    montaModal();
  });
}

function renomeia(dados) {
  let formato = 'DD/MM/YYYY HH:mm';
  let inicio = ' 00:01';
  let fim = ' 23:59';
  dados = JSON.parse($('#tabelaIndicacoes').attr('data-indicacoes'));
  dados.forEach((d) => {
    if (d.tipoColegiado == 'TE') {
      d.tipoColegiado = 'Turmas Extraordinárias';
    }

    if (d.tipoColegiado == 'TOCSRF') {
      d.tipoColegiado = 'Turmas Ordinárias e Câmara Superior';
    }
  });
  return dados;
}

function tabelaIndicacoes(dados) {
  tabledata = renomeia(
    JSON.parse($('#tabelaIndicacoes').attr('data-indicacoes')),
  );
  table = new Tabulator('#tabelaIndicacoes', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitDataStretch',
    movableRows: false,
    responsiveLayout: 'collapse',
    initialSort: [
      { column: 'ano', dir: 'desc' },
      { column: 'mes', dir: 'desc' },
    ],
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        title: 'Colegiados',
        field: 'tipoColegiado',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Semana',
        field: 'semana',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
      },
      {
        title: 'Mês',
        field: 'mes',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
      },
      {
        title: 'Ano',
        field: 'ano',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
      },
      {
        title: 'Início Indicação',
        field: 'abreIndicacao',
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        sorterParams: { format: 'DD/MM/YYYY' },
      },
      {
        title: 'Fim Indicação',
        field: 'fechaIndicacao',
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        sorterParams: { format: 'DD/MM/YYYY' },
      },

      {
        title: 'Tipo de Sessão',
        field: 'tipoSessao',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
      },
      {
        title: 'Editar',
        formatter: formatEditar,
        hozAlign: 'center',
        download: false,
      },
      {
        title: 'Gerenciar',
        formatter: formatGerenciar,
        hozAlign: 'center',
        download: false,
      },
    ],
  });
}

let formatEditar = function formatEditar(cell) {
  return `
  <a class='black-text btnedita' href='/suporte/restrito/edita-periodo/${
    cell.getRow().getData()._id
  }' title='Detalhar Solicitação'><i class='material-icons'>details</i></a>
 `;
};
let formatGerenciar = function formatGerenciar(cell) {
  return `
  <a class='black-text btnedita' href='/suporte/restrito/gerencia-periodo/${
    cell.getRow().getData()._id
  }' title='Gerenciar'><i class='material-icons'>settings</i></a>
  `;
};

function montaModal() {
  $('.hModal').text('Criação de Período de Indicação para Pauta');
  $('.pModal').append(
    `<p class="pModal ">
            <br/>
           <div class='row'>
                 <div class="form-group dtJulgamento input field col s3">
                <input id="dtJulgamento" name="dtJulgamento"  type="text" class="datepicker"/>
                <i class="fas fa-calendar-check prefix"/>
                <label for="dtJulgamento">Data do Julgamento</label>
                </div>
                <div class='col s6'>
                <i class="far fa-question-circle prefix"/>
                <label for="turnoPart">Selecione o turno de participação:</label>
                <select required name="turnoPart" id="turnoPart">
                <option class="form-group" value="Manha">Manhã</option>
                <option class="form-group" value="Tarde">Tarde</option>
                </select>
                </div>
                <div><a id="btnPart" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar Participação">
                <i class="material-icons">add</i>
                </a>
                </div>
                </div>
            </p>`,
  );
  $('.concorda').click(function () {
    let data = {
      titulo: quillTitulo.root.innerHTML,
      descricao: quillDesc.root.innerHTML,
      link: quillLink.root.innerHTML,
      secaoGC: $('#secaoGC option:selected').val(),
      uniqueId: moment.now(),
      portal: 'cosup',
    };
    handleFAQ(data, 'POST');
    $('.pModal').text('');
  });
  $('.cancela').click(function () {
    $('.pModal').text('');
  });
}

function handleFAQ(registro, metodo) {
  $.ajax({
    url: '/julgamento/restrito/gestaoportalcojul',
    data: registro,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
      quillTitulo.setContents('');
      quillLink.setContents('');
      location.reload();
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
    },
  });
}

function initDatePicker() {
  let formato = 'dd/mm/yyyy';
  let meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  let mesesCurtos = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  let diasDaSemana = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  let diasCurtos = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  let diasAbrev = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  $('.datepicker').datepicker({
    autoClose: true,
    format: formato,
    i18n: {
      cancel: 'Cancelar',
      clear: 'Limpar',
      done: 'Ok',
      months: meses,
      monthsShort: mesesCurtos,
      weekdays: diasDaSemana,
      weekdaysShort: diasCurtos,
      weekdaysAbbrev: diasAbrev,
    },
  });
}
