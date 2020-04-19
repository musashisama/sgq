inicializaComponentes();

function inicializaComponentes(){
    $(document).ready(function () {   
        initToolToast();
        initCollapsible();
        initImageFadeIn();
        
    });
}

function initToolToast(){
    var toastHTML = `<span>${$('#msg').text()}</span><button class="btn-flat toast-action">Ok</button>`;     
        $('.tooltipped').tooltip();          
        if($('#toastsucesso').hasClass('ctoastsucesso')){
            M.toast({html: toastHTML});
        }

        $('.toast-action').click(function(){
            M.Toast.dismissAll();
        })
}

function initCollapsible() {
    $('.collapsible').collapsible();
}

function initImageFadeIn(){
    $('#divImage').fadeOut(1).delay(500).fadeIn(3000);
    $('#divImage');
}
            
            
     