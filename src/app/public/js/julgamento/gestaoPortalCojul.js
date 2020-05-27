let
    toolbarOptions = [['bold', 'italic', 'underline', 'strike'],
    ['link'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    ['clean']];
options = {

    modules: {
        toolbar: toolbarOptions,
        'history': {
            'delay': 2500,
            'userOnly': true
        },
    },
    theme: 'snow'
},
    quillTitulo = new Quill('#editorTitulo', options),
    quillTitulo.formatText(0, 1000, {
        'bold': true,
        'italic': true
    });
quillDesc = new Quill('#editorDesc', options),
    quillLink = new Quill('#editorLink', options),

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
    $('#secaoGC').formSelect();
}

function btnInsere() {
    $('.btn-insere').click(e => {
        var valid = document.getElementById('secaoGC');
        if (valid.checkValidity()) {
            $('#aModal').addClass('modal-trigger');
            montaModal();
        } else {
            var toastHTML = `<span>Preencha todos os campos</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        }
    })
}

function montaModal() {
    $('.hModal').text("Confirmação de inclusão de item do Portal da COJUL");
    $('.pModal').append(
        `<p class="pModal ">
            <br/>
            Verifique se os dados abaixo estão corretos e clique em "Confirma" para efetuar o registro.<br/><br/>
            <h5>Título do Item:</h5>
            ${quillTitulo.root.innerHTML}
            <h5>Descrição do Item:</h5>
            ${quillDesc.root.innerHTML}
           <h5>Link:</h5>
            ${quillLink.root.innerHTML}
            </p>`
    );
    $('.concorda').click(function () {
        event.preventDefault();
        let data = {
            'titulo': quillTitulo.root.innerHTML,
            'descricao': quillDesc.root.innerHTML,
            'link': quillLink.root.innerHTML,
            'secaoGC': $('#secaoGC option:selected').val(),
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
        }
    })
}