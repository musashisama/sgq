inicializaComponentes();

function inicializaComponentes(){
    $(document).ready(function () {   
        var toastHTML = '<span>"Não Conformidade(s) registrada(s) com sucesso!"</span><button class="btn-flat toast-action">Ok</button>';     
        $('.tooltipped').tooltip();          
        if($('#toastsucesso').hasClass('ctoastsucesso')){
            M.toast({html: toastHTML});
        }

        $('.toast-action').click(function(){
            M.Toast.dismissAll();
        })
        
    });
}


            
            
     