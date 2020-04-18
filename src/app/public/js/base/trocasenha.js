inicializaComponentes();

function inicializaComponentes() {
    $(document).ready(function () {        
        btnInsere();
    });
}


function btnInsere() {
    $('.btn-trocasenha').click(function (event) {
        event.preventDefault();
        if(($('#pwd').val()==$('#pwdConf').val())&&$('#pwdConf').val()!=''){
            $('form').submit();
        }else console.log("noppers");
        
    });
}
