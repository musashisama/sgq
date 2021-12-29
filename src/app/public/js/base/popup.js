inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    getPopups();
  });
}

function initCollapsible() {
  $(document).ready(function () {
    $('#anexos').collapsible();
  });
}

function initModal() {
  $('.modal').modal('open');
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
      </br><a class='arquivos' target='_blank' href='/arqdown/${b}' id='${b}'> Anexo ${
        i + 1
      }  <i class="material-icons prefix">attach_file</i></a>
      <br/>
      <embed src="/arqdown/${b}" type="application/pdf" width="100%" height="800px">
      </div>
      </li>
      `;
    });
  }
  return c;
}

function montaModal(msg) {
  $('.headerPopup').text('Informações e Novidades do SGI/CARF');
  msg.forEach((m) => {
    $('.conteudoPopup').append(
      `<hr class="new5">
      <h5>${'<strong>' + m.dataPopup + '</strong>' + ' ' + m.titulo}</h5>
      ${m.conteudo}
      <div class='row'>
      <ul id='anexos' class="collapsible popout col s12 m12">
      ${pegaLinks(m.arquivos)}
      </ul>
      </div>
      `,
    );
  });
  $('.conteudoPopup').append(`<button
     class="right btn waves-effect waves-light concorda modal-close"
     type="submit"
     name="action"
   >
     Fechar popup <i class="material-icons right">send</i>
   </button>`);
  initCollapsible();
  $('.concorda').click(function () {});
  $('.cancela').click(function () {});
}

function getPopups() {
  $.ajax({
    url: `/popups`,
    type: 'GET',
  })
    .done(function (msg) {
      if (msg.length > 0) {
        montaModal(msg);
        $('#popup').modal();
        $('#popup').modal({
          dismissible: false,
        });
        $('#popup').modal('open');
        initModal();
      }
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}
