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
    let gc = JSON.parse($('#gc').attr('data-gc'));
    let data = {};
    gc.forEach((f,i) => {
        let cor, icone;
        f.secaoGC == 'manuais'?(cor='green-text text-lighten-1',icone='description'):
        f.secaoGC == 'legis'?(cor='orange-text text-darken-1',icone='gavel'):
        (cor='light-blue-text text-darken-3',icone='widgets');
        let titulo = f.titulo.replace(/<[^>]*>?/gm, '')    
        let link = f.link.replace(/<[^>]*>?/gm, '');
        data[titulo]=null;
        $(`.${f.secaoGC}`).append(`<li>
        <div id='${f.uniqueId}' class="collapsible-header valign-wrapper">        
        <i class="material-icons ${cor}">${icone}</i><strong><em>${f.titulo}</em></strong>
        </div>
        <div class="collapsible-body">
          <span>${f.descricao}<a href='${link}' target="_blank" class="secondary-content">
          <i class="material-icons ${cor}">send</i></a></span>
        </div>
        </li>
        `)
    
    })    
    $('input.autocomplete').autocomplete({
        data: data,
        minLength:4,
        onAutocomplete:function(d){   
            let gc = JSON.parse($('#gc').attr('data-gc'));
            gc.forEach(f =>{
                let titulo = f.titulo.replace(/<[^>]*>?/gm, '') 
                let descricao = f.descricao.replace(/<[^>]*>?/gm, '') 
                if(titulo.includes(d)||descricao.includes(d)){                                           
                        $(`#${f.uniqueId}`).addClass('VerdeClara')
                        $('html, body').animate({
                            scrollTop: parseInt($(`#${f.uniqueId}`).offset().top)
                        }, 20);
                }
            }) 
        }
      });
}