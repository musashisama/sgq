inicializaComponentes();

function inicializaComponentes(){
    $(document).ready(function () {        
        initSelect();
        $('.tooltipped').tooltip();    
        initDatePicker();
        initChips();
        initModal();         
        btnInsere();                   
    });
}

function initSelect(){
    $('select').formSelect();   
}

function btnInsere(){    
    $('.btn-insere').click(function(event){
        event.preventDefault();  
        $('docref').val(pegaChips());      
        if(validaForm()){
            $('#aModal').addClass('modal-trigger');
            montaModal();
        };           
    });
}

function pegaChips(){
    var n = $('.chip').length;
    var data = $('.chip').text().split("close");
    var rm = data.slice(0,data.length-1).toString();
    console.log(n+' '+rm.split(',')+' '+typeof(rm.split(',')));
    return rm.split(',');
}

function initModal(){    
    $('.modal').modal();     
}

function montaModal(){
    var data = pegaChips();      
        $('.hModal').text("Confirmação de Inclusão de Registro");
        $('.docref').val(pegaChips());
        $('.pModal').append(
            `<p class="pModal">
            <strong>Dados da não conformidade:</strong><br/>
            ${$('.chip').length} processo(s): ${document.formNC.docRef.value} <br/>
            <strong>Seu macroprocesso:</strong><br/>
            ${document.formNC.mpProcUser.value} <br/>
            <strong>Macroprocesso de origem da não conformidade:</strong><br/>
            ${document.formNC.mProcOrigem.value}<br/>
            <strong>Equipe onde ocorreu a não conformidade:</strong><br/>
            ${document.formNC.equipeNC.value}
            </p>`
        ); 
        console.log("Data: "+data.toString());
        $('.concorda').click(function(){    
            console.log("Clicou confirma");  
            $("#formNC").submit();     
        });
        $('.cancela').click(function(){
            $('.pModal').text('');
            $('.docref').val('');
        })
}





function initChips(){
    $('.docref').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && $('.docref').val()) {
            event.preventDefault();
            $('.areachip').append(`<div class="chip">${$('.docref').val()}<i class="close material-icons">close</i></div>`);
            $('.docref').val("")
        }
    });    
    $('.addDoc').click(function (event) {
        event.preventDefault();
        if($('.docref').val()){
            $('.areachip').append(`<div class="chip">${$('.docref').val()}<i class="close material-icons">close</i></div>`);
            $('.docref').val("");
        }
    });
}
function initDatePicker(){
    $('.datepicker').click(function(event){
        event.preventDefault();
        $('.lbdataNC').css('color','#9e9e9e');
        $('.lbEncCorNC').css('color','#9e9e9e');   

    });
    let formato = 'dd-mm-yyyy'
    let meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    let mesesCurtos = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    let diasDaSemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
    let diasCurtos = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
    let diasAbrev = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    $('.datepicker').datepicker({
        autoClose: true,
        format: formato,
        i18n:
        {
            cancel: 'Cancelar',
            clear: 'Limpar',
            done: 'Ok',
            months: meses,
            monthsShort: mesesCurtos,
            weekdays: diasDaSemana,
            weekdaysShort: diasCurtos,
            weekdaysAbbrev: diasAbrev
        }
    });
}
