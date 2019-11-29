inicializaComponentes();

function inicializaComponentes(){
    $(document).ready(function () {        
        initSelect();
        $('.tooltipped').tooltip();    
        initDatePicker();
        initChips();                   
        btnInsere();
        initModal();                   
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

function insereChips(){      
            $("#formNC").submit();
}

function ajustaData(data){
    arrayData = data.split("-");
    console.log(arrayData[2]+' '+arrayData[1]+' '+arrayData[0]);
    dataAjustada = new Date(arrayData[2],arrayData[1]-1,arrayData[0], new Date().getHours()).toUTCString();
    console.log('dataAjustada:', dataAjustada);    
    return dataAjustada;
}

function montaModal(){
    var data = pegaChips();      
        $('.hModal').text("Confirmação de Inclusão de Registro");
        $('.docref').val(pegaChips());
        $('.pModal').append(
            `<p class="pModal">
            <br/>
            Verifique se os dados abaixo estão corretos e clique em "Confirma" para efetuar o registro.<br/><br/>
            <strong>Dados da não conformidade:</strong><br/>
            ${$('.chip').length} processo(s): ${document.formNC.docRef.value} <br/>
            <strong>Seu macroprocesso:</strong><br/>
            ${document.formNC.mpProcUser.value} <br/>
            <strong>Macroprocesso de origem da não conformidade:</strong><br/>
            ${document.formNC.mProcOrigem.value}<br/>
            <strong>Equipe onde ocorreu a não conformidade:</strong><br/>
            ${document.formNC.equipeNC.value}<br/>
            <strong>Descrição da não conformidade</strong><br/>
            ${document.formNC.descNC.value}<br/>
            <strong>Observações adicionais sobre a não conformidade:</strong><br/>
            ${document.formNC.obsParticipante.value}<br/>
            <strong>Ação imediata:</strong><br/>
            ${document.formNC.acaoImediata.value}<br/>
            <strong>Data de ocorrência da não conformidade:</strong><br/>
            ${document.formNC.dataNC.value}<br/>
            <strong>Data de encaminhamento ou correção da não conformidade:</strong><br/>
            ${document.formNC.EncCorNC.value}
            </p>`
        );
            $('.concorda').click(function(){
                if($('.chip').length>0){
                    $('.chip').each(function(index){
                        var dados = $(this).text().split("close");
                        var rm = dados.slice(0,dados.length-1).toString();
                        $('.docref').val(rm);
                        console.log(index+': '+rm);
                        console.log("Data: "+dados.toString());                    
                        insereChips();
                    });                    
                }else {
                    $("#formNC").submit();
                 }
                                   
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
