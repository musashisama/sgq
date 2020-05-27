inicializaComponentes();
function inicializaComponentes() {
    $(document).ready(function () {        
        initAutoComplete();
        btnEnvia()
    });
}

function btnEnvia(){
    $('#btnEnvia').click(e => {
        e.preventDefault();
        if($('#autocomplete-input').val() != ''){       
        handleFAQ({pergunta:$('#autocomplete-input').val()})
    } else {var toastHTML = `<span>Preencha o campo antes de enviar.</span>`;
    M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });}
    })
}

function handleFAQ(registro) {
    $.ajax({
        url: '/julgamento/restrito/formfaq/',
        data: registro,
        type: 'POST',
        success: function (result) {
            var toastHTML = `<span>Pergunta enviada com sucesso!</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            console.log(result);
            $('#autocomplete-input').val('')                
        },
        error: function (result) {
            var toastHTML = `<span>Ocorreu um erro.</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });  
            console.log(result);          
        }
    })
}


function initAutoComplete() {
    let faq = JSON.parse($('#faq').attr('data-faq'));
    let data = {};
    faq.forEach((f, i) => {
        let pergunta = f.pergunta.replace(/<[^>]*>?/gm, '')
        data[pergunta] = null;
        $(`.${f.secaoFAQ}`).append(`<li>
        <div id='${f.uniqueId}' class="collapsible-header">        
          <i class="material-icons">question_answer</i><p><strong><em>${f.pergunta}</em></strong></p>
        </div>
        <div class="collapsible-body">
          <span>${f.resposta}</span>
        </div>
        </li>
        `)

    })
    $('input.autocomplete').autocomplete({
        data: data,
        minLength: 4,        
    });
}



