inicializaComponentes();

function inicializaComponentes(){
    $(document).ready(function () {   
        var toastHTML = `<span>${$('#msg').text()}</span><button class="btn-flat toast-action">Ok</button>`;     
        $('.tooltipped').tooltip();          
        if($('#toastsucesso').hasClass('ctoastsucesso')){
            M.toast({html: toastHTML});
        }

        $('.toast-action').click(function(){
            M.Toast.dismissAll();
        })
        
    });
}


            
            
     