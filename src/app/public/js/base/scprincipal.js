inicializaComponentes();

function inicializaComponentes(){
    $(document).ready(function () {   
       
        initCollapsible();
        initImageFadeIn();
        
    });
}


function initCollapsible() {
    $('.collapsible').collapsible();
}

function initImageFadeIn(){
    $('#divImage').fadeOut(1).delay(500).fadeIn(3000);
    $('#divImage');
}
            
            
     