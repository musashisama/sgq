let faqTexto = JSON.parse($('#dataFAQ').attr('data-faq'));
let toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['link'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }],
  ['clean'],
];
(options = {
  modules: {
    toolbar: toolbarOptions,
    history: {
      // Enable with custom configurations
      delay: 2500,
      userOnly: true,
    },
  },
  theme: 'snow',
}),
  (quillPerg = new Quill('#editorPergunta', options));
quillPerg.formatText(0, 1000, {
  // unbolds 'hello' and set its color to blue
  bold: true,
  italic: true,
});
quillResp = new Quill('#editorResposta', options);
inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    btnInsere();
    verificaUpdate();
    initModal();
    initSelect();
  });
}

function initModal() {
  $('.modal').modal();
}

function initSelect() {
  $('#secaoFAQ').formSelect();
}

function verificaUpdate() {
  if (faqTexto.tipo == 'update') {
    console.log(faqTexto);
    quillPerg.root.innerHTML = faqTexto.pergunta;
    quillResp.root.innerHTML = faqTexto.resposta;
    $('#secaoFAQ').val(faqTexto.secaoFAQ);
    $('#rowArquivo').remove();
  }
}

function btnInsere() {
  $('.btn-insere').click((e) => {
    var valid = document.getElementById('secaoFAQ');
    // for demonstration purposes only, will always b "true" here, in this case, since HTML5 validation will block this "click" event if form invalid (i.e. if "required" field "foo" is empty)

    if (valid.checkValidity()) {
      $('#aModal').addClass('modal-trigger');
      montaModal();
    } else {
      var toastHTML = `<span>Preencha todos os campos</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    }
  });
}

function montaModal() {
  $('.hModal').text('Confirmação no FAQ');
  $('.pModal').append(
    `<p class="pModal ">
            <br/>
            Verifique se os dados abaixo estão corretos e clique em "Confirma" para efetuar o registro.<br/><br/>
            <h5>Pergunta:</h5>
            ${quillPerg.root.innerHTML}
           <h5>Resposta:</h5>
            ${quillResp.root.innerHTML}
            </p>
            <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
            `,
  );
  $('.concorda').click(function () {
    let data = {};
    if (faqTexto.tipo == 'update') {
      data = {
        pergunta: quillPerg.root.innerHTML,
        resposta: quillResp.root.innerHTML,
        secaoFAQ: $('#secaoFAQ option:selected').val(),
        uniqueId: faqTexto.uniqueId,
      };
    } else {
      data = {
        pergunta: quillPerg.root.innerHTML,
        resposta: quillResp.root.innerHTML,
        secaoFAQ: $('#secaoFAQ option:selected').val(),
        arquivos: pegaArquivos(),
        uniqueId: moment.now(),
      };
    }
    handleFAQ(data, 'POST');
    $('.pModal').text('');
  });
  $('.cancela').click(function () {
    $('.pModal').text('');
  });
}

function handleFAQ(registro, metodo) {
  $.ajax({
    url: '/julgamento/restrito/cadastrafaqdipaj/1',
    data: registro,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
      quillPerg.setContents('');
      quillResp.setContents('');
      window.location.replace('/julgamento/restrito/gestaoFAQ/');
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
    },
  });
}

function resetElementos() {
  $('.progress').hide();
  $('#mostraArq').hide();
}

function pegaArquivos(html) {
  let a = [];
  if (html == true) {
    $('.collection-arqs')
      .get()
      .forEach((c) => {
        a.push(
          '<br />' +
            $(c)
              .text()
              .replace(/(\r\n|\n|\r)/gm, ''),
        );
      });
  } else {
    $('.collection-arqs')
      .get()
      .forEach((c) => {
        a.push($(c).attr('data-id'));
      });
  }
  return a;
}

function montaLi(result) {
  $('.arqsUp').append(`
            <li class="collection-arqs collection-item" data-id='${result._id}' id='${result._id}'>
            <div>${result.nome}<a href="#!" class="aClick secondary-content">
           <i class="red-text	far fa-trash-alt"/>
            </a>
            </div>
            </li>`);
  $('.aClick').click((e) => {
    handleFile({ _id: result._id }, 'DELETE');
  });
}

function btnEnviaArq() {
  $('#btnEnviaArq').off();
  $('#btnEnviaArq').click((e) => {
    e.preventDefault();
    if ($('#file')[0].files[0]) {
      $('#btnEnviaArq').toggle();
      var arq = $('#file')[0].files[0];
      handleFile(arq, 'POST');
    }
  });
}

function handleFile(arquivo, metodo) {
  let fd;
  if (metodo == 'DELETE') {
    fd = arquivo;
    $.ajax({
      url: '/julgamento/conselheiros/arquivos',
      data: fd,
      type: metodo,
      success: function (result) {
        var toastHTML = `<span>Arquivo excluído com sucesso.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });

        $(`#${fd._id}`).remove();
      },
      error: function (result) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        console.log(result);
      },
    });
  } else {
    fd = new FormData();
    $('#btnEnviaArq').toggle();
    $('.progress').show();
    fd.append('file', arquivo);
    $.ajax({
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener(
          'progress',
          function (evt) {
            $('.progress').show();
            if (evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total;
              $('.determinate').css(
                'width',
                Math.round(percentComplete * 100) + '%',
              );
            }
          },
          false,
        );
        return xhr;
      },
      url: '/julgamento/conselheiros/arquivos',
      data: fd,
      processData: false,
      contentType: false,
      type: metodo,
      success: function (result) {
        var toastHTML = `<span>Arquivo enviado com sucesso.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        console.log(result);
        $('#mostraArq').show();
        montaLi(result);
        $('.btnEnviaArq').toggle();
        $('.progress').fadeOut();
        $('.file-path').val('');
      },
      error: function (result) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        console.log(result);
      },
    });
  }
}
