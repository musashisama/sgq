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


function initScrollSpy(){   
        $('.scrollspy').scrollSpy();     
}



function initAutoComplete(){
    let faq = JSON.parse($('#faq').attr('data-faq'));
    let data = {};
    faq.forEach((f,i) => {
        let pergunta = f.pergunta.replace(/<[^>]*>?/gm, '')        
        data[pergunta]=null;
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
        minLength:4,
        onAutocomplete:function(d){   
            let faq = JSON.parse($('#faq').attr('data-faq'));
            faq.forEach(f =>{
                let pergunta = f.pergunta.replace(/<[^>]*>?/gm, '') 
                if(pergunta.includes(d)){                                           
                        $(`#${f.uniqueId}`).addClass('VerdeClara')
                        $('html, body').animate({
                            scrollTop: parseInt($(`#${f.uniqueId}`).offset().top)
                        }, 20);
                }
            }) 
        }
      });
}



