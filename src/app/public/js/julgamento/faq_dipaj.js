inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initCollapsible();
    initScrollSpy();
    initAutoComplete();
  });
}

function initCollapsible() {
  $('.collapsible').collapsible();
}

function initScrollSpy() {
  $('.scrollspy').scrollSpy();
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

function initAutoComplete() {
  let faq = JSON.parse($('#faq').attr('data-faq'));
  let data = {};
  faq.forEach((f, i) => {
    let pergunta = f.pergunta.replace(/<[^>]*>?/gm, '');
    data[pergunta] = null;
    // $(`.${f.secaoFAQ}`).append(`<li>
    //     <div id='${f.uniqueId}' class="collapsible-header">
    //       <i class="material-icons">question_answer</i><p><strong><em>${f.pergunta}</em></strong></p>
    //     </div>
    //     <div class="collapsible-body">
    //       <span>${f.resposta}</span>

    //     </div>
    //     </li>
    //     `);
    $(`.${f.secaoFAQ}`).append(`
    <hr class="new4">
    <div>
        <h6 id='${f.uniqueId}'>
          <strong><em>${f.pergunta}</em></strong>
        </h6>
          <span>${f.resposta}</span>
         <div class="row">
  <ul id="anexos" class="collapsible popout col s12 m12">
    ${pegaLinks(f.arquivos)}
  </ul>
</div>
        </div>
        `);
  });
  initCollapsible();
  $('input.autocomplete').autocomplete({
    data: data,
    minLength: 4,
    onAutocomplete: function (d) {
      $('#autocomplete-input').val('');
      let faq = JSON.parse($('#faq').attr('data-faq'));
      faq.forEach((f) => {
        let pergunta = f.pergunta.replace(/<[^>]*>?/gm, '');
        if (pergunta.includes(d)) {
          $(`#${f.uniqueId}`).addClass('VerdeClara');
          $('html, body').animate(
            {
              scrollTop: parseInt($(`#${f.uniqueId}`).offset().top),
            },
            20,
          );
        }
      });
    },
  });
}
