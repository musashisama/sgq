inicializaComponentes();
layout = 'fitDataFill';
responsiveLayout = true;
let table = '';
let tabledata = '';
let agrupado = false;

function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    tabelaSolicitacoes();
    initModal();
  });
}

function initSelect() {
  $('select').formSelect();
}

function initModal() {
  $('.modal').modal();
}

function tabelaSolicitacoes() {
  tabledata = JSON.parse($('#solicitacoes').attr('data-solicitacoes'));
  tableOcorrencias = new Tabulator('#tabelaSolicitacoes', {
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
        title: 'Data da Solicitação',
        field: 'dtCriacao',
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        sorterParams: { format: 'DD/MM/YYYY' },
      },
      {
        title: 'CPF',
        field: 'cpf',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
      },
      {
        title: 'Solicitação',
        field: 'tipoSolicitacao',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
      },
      {
        title: 'Detalhes da Solicitação',
        field: 'tipoAfastamento',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Horas a Deduzir',
        field: 'horasDeducao',
        sorter: 'number',
        width: 90,
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Data Início',
        field: 'dtInicio',
        sorter: 'date',
        width: 90,
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Data Fim',
        field: 'dtFim',
        sorter: 'date',
        width: 90,
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Status da Solicitação',
        field: 'status',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Observações',
        field: 'observacoes',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 1,
      },
      {
        title: 'Arquivos',
        field: 'arquivos',
        sorter: 'string',
        hozAlign: 'left',
        visible: false,
        editor: false,
        headerFilter: 'input',
        responsive: 1,
      },
    ],
  });
}

let formatNome = function formatNome(cell) {
  return `<a class='black-text btnedita' href='#modal1' title='Detalhar Solicitação'><i class='material-icons'>details</i></a>`;
};

function clickEdita(e, cell) {
  e.preventDefault();
  $('.btnedita').addClass('modal-trigger');
  pegaCadastro(cell.getRow().getData().cpf, e, cell);
  initSelect();
}

async function montaModal(e, cell, user) {
  $('.hModal').text(``);
  $('.pModal').text(``);
  $('.hModal').text(`Solicitação do Conselheiro`);
  $('.pModal').append(
    `<div class='row'>
        <p>
            <br/>
            <strongSolicitante:</strong> ${user.nome}<br/>
            <strong>CPF:</strong> ${cell.getRow().getData().cpf}<br/>
            <strong>Turma:</strong> ${user.unidade}<br/> 
            <strong>Solicitação:</strong> ${
              cell.getRow().getData().tipoSolicitacao
            } - <strong>Data da Solicitação:</strong> ${
      cell.getRow().getData().dtCriacao
    }<br/>  
            <strong>Detalhes da Solicitação/Turma de Participação:</strong> ${
              cell.getRow().getData().tipoAfastamento
            }<br/>  
            <strong>Data Início:</strong> ${
              cell.getRow().getData().dtInicio
            }<br/>
            <strong>Data Fim:</strong> ${
              cell.getRow().getData().dtFim
            }<br/>             
            <strong>Status:</strong> ${cell.getRow().getData().status}<br/>  
            <strong>Observações:</strong> ${
              cell.getRow().getData().observacoes
            }<br/> 
            <strong>Arquivos:</strong> ${pegaLinks(cell)}<br/> 
           </p>
           </div>
           <div class='row'>
           <div class='col s7'>
           <i class="material-icons prefix">live_help</i>
           <label for="statusVal">Validação SEGEP:</label> 
           <select required name="statusVal" id="statusVal">
           <option class="form-group" value='' disabled selected>Clique para selecionar</option>
           <option class="form-group" value="DocVal">Documento(s) Válido(s)</option>          
           <option class="form-group" value="DocInval">Documento(s) Inválido(s)</option>        
           </select>                   
         </div>
         </div> 
           <div class='row'>
           <div class='col s7'>
           <i class="material-icons prefix">live_help</i>
           <label for="statusApr">Solicitação aprovada ou rejeitada pela DIPAJ?</label> 
           <select required name="statusApr" id="statusApr">
           <option class="form-group" value='' disabled selected>Clique para selecionar</option>
           <option class="form-group" value="Aprovada">Aprovar</option>          
           <option class="form-group" value="Rejeitada">Rejeitar</option>        
           </select>                   
         </div>
         </div> 
         <div class='row'>          
         <div class="input-field col s12">
         <i class="material-icons prefix">mode_edit</i>        
         <textarea id="justificativas" class="materialize-textarea"></textarea>
         <label for="justificativas">Justificativas para <strong>rejeição:</strong></label>
         </div>
         </div>`,
  );
  initSelect();
  btnArq();
  $('.concorda').click(function () {
    let dados = {
      uniqueId: cell.getRow().getData().uniqueId,
      justificativas: $('#justificativas').val(),
      statusSegep: $('#statusVal').val(),
      statusDipaj: $('#statusApr').val(),
    };
    handleSOL(dados, 'POST');
  });
  $('.cancela').click(function () {
    $('.hModal').text('');
    $('.pModal').text('');
  });
}
function btnArq() {
  $('.arquivos').click((e) => {
    let a = $(e.target).attr('id');
    pegaArquivo(a);
  });
}
function pegaLinks(cell) {
  console.log(cell.getRow().getData().arquivos);
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

async function pegaCadastro(cpf, e, cell) {
  let data = { cpf: cpf };
  $.ajax({
    url: '/pessoal/restrito/getcadastro',
    data: data,
    type: 'POST',
    success: function (result) {
      montaModal(e, cell, result[0]);
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      return result;
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
