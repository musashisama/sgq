let
    toolbarOptions = [['bold', 'italic', 'underline', 'strike'],
    ['link'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['clean']];
options = {

    modules: {
        toolbar: toolbarOptions,
        'history': {          // Enable with custom configurations
            'delay': 2500,
            'userOnly': true
        },
    },
    theme: 'snow'
},
    quillPerg = new Quill('#editorPergunta', options),
    quillPerg.formatText(0, 1000, {                   // unbolds 'hello' and set its color to blue
    'bold': true,
    'italic': true
  });
    quillResp = new Quill('#editorResposta', options),

    inicializaComponentes();
function inicializaComponentes() {
    $(document).ready(function () {
        btnInsere();
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

function btnInsere() {
    $('.btn-insere').click(e => {
        var valid = document.getElementById('secaoFAQ');
         // for demonstration purposes only, will always b "true" here, in this case, since HTML5 validation will block this "click" event if form invalid (i.e. if "required" field "foo" is empty)
        
        if(valid.checkValidity()){
        $('#aModal').addClass('modal-trigger');
        montaModal();} else {
            var toastHTML = `<span>Preencha todos os campos</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            }
    })
}

function montaModal() {
    $('.hModal').text("Confirmação no FAQ");
    $('.pModal').append(
        `<p class="pModal ">
            <br/>
            Verifique se os dados abaixo estão corretos e clique em "Confirma" para efetuar o registro.<br/><br/>
            <h5>Pergunta:</h5>
            ${quillPerg.root.innerHTML}
           <h5>Resposta:</h5>
            ${quillResp.root.innerHTML}
            </p>`
    );
    $('.concorda').click(function () {
        event.preventDefault();
        let data = {
            'pergunta': quillPerg.root.innerHTML,
            'resposta': quillResp.root.innerHTML,
            'secaoFAQ': $('#secaoFAQ option:selected').val(),
            'uniqueId': moment.now()
        }
        handleFAQ(data, 'POST')
        $('.pModal').text('');
    });
    $('.cancela').click(function () {
        $('.pModal').text('');
    })
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
            location.reload();
        },
        error: function (result) {
            var toastHTML = `<span>Ocorreu um erro.</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            console.log(result);
        }
    })
}