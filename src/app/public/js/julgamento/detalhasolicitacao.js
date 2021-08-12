inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    montaSolicitacao();
    initCollapsible();
  });
}

function montaSolicitacao() {
  let html = JSON.parse($('#dadosSolicitacao').attr('data-solicitacao')).html;
  let arquivos = JSON.parse($('#dadosSolicitacao').attr('data-solicitacao'))
    .dados.arquivos;
  $('#solicitacao').append(`
  <div class='row'>
  <p><strong>Número da Solicitação:</strong> ${
    JSON.parse($('#dadosSolicitacao').attr('data-solicitacao')).uniqueId
  }</p>
  <p><strong>Nome:</strong> ${
    JSON.parse($('#dadosSolicitacao').attr('data-solicitacao')).nome
  }</p>
  <p><strong>CPF:</strong> ${
    JSON.parse($('#dadosSolicitacao').attr('data-solicitacao')).cpf
  }</p>
  <p><strong>Unidade:</strong> ${
    JSON.parse($('#dadosSolicitacao').attr('data-solicitacao')).unidade
  }</p>
<p><strong>Data de Criação:</strong> ${
    JSON.parse($('#dadosSolicitacao').attr('data-solicitacao')).dtCriacao
  }</p>
  <p><strong>Status:</strong> ${
    JSON.parse($('#dadosSolicitacao').attr('data-solicitacao')).status
  }</p>
  </div>
  ${html} <br />
  <div class='row'>
  <ul id='anexos' class="collapsible popout col s12 m12">
  ${pegaLinks(arquivos)}
  </ul>
  </div>
  <div class='row'>
  <div class="input-field col s12">
  <i class="material-icons prefix">mode_edit</i>
  <textarea id="justificativas" class="materialize-textarea active">${
    JSON.parse($('#dadosSolicitacao').attr('data-solicitacao')).justificativas
      ? JSON.parse($('#dadosSolicitacao').attr('data-solicitacao'))
          .justificativas
      : ''
  }</textarea>
  <label for="justificativas" class='active'>Justificativas/Observações para Rejeição:</label>
  </div>
  </div>
  <div class='row'>
  <div class='col s12 offset-s12 right'>
  <button id='aprovar' class="btn waves-effect waves-light green right">
  Aprovar <i class='far fa-thumbs-up' />
  </button>
  <button id='rejeitar' class="btn waves-effect waves-light red right">
  Rejeitar <i class="far fa-thumbs-down right" />
  </button>
  </div>
  </div>
  `);
  initCollapsible();
  M.textareaAutoResize($('#justificativas'));
  $('#rejeitar').click((e) => {
    if (!$('#justificativas').val()) {
      var toastHTML = `<span>Caso a solicitação seja rejeitada, é obrigatório po preenchimento do campo
«Justificativas/Observações para Rejeição».</span>`;
      M.toast({
        html: toastHTML,
        classes: 'rounded',
        timeRemaining: 500,
      });
    } else {
      let dados = {
        uniqueId: JSON.parse($('#dadosSolicitacao').attr('data-solicitacao'))
          .uniqueId,
        status: 'Rejeitada',
        justificativas: $('#justificativas').val(),
      };
      handleSOL(dados);
    }
  });
  $('#aprovar').click((e) => {
    let dados = {
      uniqueId: JSON.parse($('#dadosSolicitacao').attr('data-solicitacao'))
        .uniqueId,
      status: 'Aprovada',
      justificativas: $('#justificativas').val()
        ? $('#justificativas').val()
        : 'Solicitação Aprovada.',
    };
    handleSOL(dados);
  });
}

function initCollapsible() {
  $(document).ready(function () {
    $('#anexos').collapsible();
  });
}

function pegaLinks(arquivos) {
  let a = typeof arquivos !== 'undefined' ? arquivos : [];
  let c = '';
  if (a.length > 0) {
    a.forEach((b, i) => {
      c += `
      <li>
      <div  class="collapsible-header">
                <i class="far fa-file-pdf"/>Anexo ${i + 1}
              </div>
      <div class="collapsible-body">
      </br><a class='arquivos' target='_blank' href='/julgamento/restrito/arqdown/${b}' id='${b}'> Anexo ${
        i + 1
      }  <i class="material-icons prefix">attach_file</i></a>
      <br/>
      <embed src="/julgamento/restrito/arqdown/${b}" type="application/pdf" width="100%" height="800px">
      </div>
      </li>
      `;
    });
  }
  return c;
}

function handleSOL(registro) {
  registro.dtAproveReject = moment().format('DD/MM/YYYY - HH:mm');
  $.ajax({
    url: `/julgamento/restrito/detalhasolicitacao/${registro.uniqueId}`,
    data: registro,
    type: 'POST',
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      setInterval(() => {
        location.replace('/julgamento/restrito/gestaoregsolicitacoes');
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
