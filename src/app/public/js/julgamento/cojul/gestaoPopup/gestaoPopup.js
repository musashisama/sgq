let popupTexto = JSON.parse($('#dataPopups').attr('data-popup'));
let quillOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['link'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['clean'],
];
(options = {
  modules: {
    toolbar: quillOptions,
    history: {
      delay: 2500,
      userOnly: true,
    },
  },
  theme: 'snow',
}),
  (quillTitulo = new Quill('#tituloPopup', options));
quillTitulo.formatText(0, 1000, {
  bold: true,
  italic: true,
});

quillDesc = new Quill('#conteudoPopup', options);

inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    btnInsere();
    verificaUpdate();
    initModal();
    initSelect();
  });
}

function verificaUpdate() {
  if (popupTexto.tipo == 'update') {
    console.log(popupTexto);
    quillTitulo.root.innerHTML = popupTexto.titulo;
    quillDesc.root.innerHTML = popupTexto.conteudo;
    $('#rowArquivo').remove();
  }
}

function initModal() {
  $('.modal').modal();
}

function initSelect() {
  $('#secaoGC').formSelect();
}

function btnInsere() {
  $('.btn-insere').click((e) => {
    $('#aModal').addClass('modal-trigger');
    montaModal();
  });
}

function montaModal() {
  $('.hModal').text('Confirmação de inclusão de item do para o Popup do SGI');
  $('.pModal').append(
    `<p class="pModal ">
            <br/>
            Verifique se os dados abaixo estão corretos e clique em "Confirma" para efetuar o registro.<br/><br/>
            <h5>Título do Item:</h5>
            ${quillTitulo.root.innerHTML}
            <h5>Descrição do Item:</h5>
            ${quillDesc.root.innerHTML}
            <p><strong>Arquivos:</strong>${pegaArquivos(true)}</p>
           `,
  );
  $('.concorda').click(function () {
    let data = {};
    if (popupTexto.tipo == 'update') {
      data = {
        titulo: quillTitulo.root.innerHTML,
        conteudo: quillDesc.root.innerHTML,
        uniqueId: popupTexto.uniqueId,
      };
    } else {
      data = {
        dataPopup: moment().format('DD/MM/YYYY'),
        titulo: quillTitulo.root.innerHTML,
        conteudo: quillDesc.root.innerHTML,
        arquivos: pegaArquivos(),
        uniqueId: moment.now(),
      };
    }
    handlePopup(data, 'POST');
    $('.pModal').text('');
  });
  $('.cancela').click(function () {
    $('.pModal').text('');
  });
}

function handlePopup(registro, metodo) {
  $.ajax({
    url: '/julgamento/restrito/gestaopopup/atualiza',
    data: registro,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
      quillTitulo.setContents('');
      quillDesc.setContents('');
      window.location.replace('/julgamento/restrito/paginagestaopopup/');
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
