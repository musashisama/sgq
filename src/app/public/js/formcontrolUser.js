inicializaComponentes();

function inicializaComponentes() {
    $(document).ready(function () {
        initSelect();
        $('.tooltipped').tooltip();
        initDatePicker();       
        btnInsere();
        initModal();
    });
}

function initSelect() {
    $('select').formSelect();
}

function btnInsere() {
    $('.btn-insere').click(function (event) {
        event.preventDefault();        
        if (validaForm()) {
            $('#aModal').addClass('modal-trigger');
            montaModal();
        };
    });
}

function pegaChips() {    
    let data = $('.chip').text().split("close");    
    let arrayData = data.toString().split(",", data.length - 1);       
    return arrayData;
}

function initModal() {
    $('.modal').modal();
}

function insereChips() {
    
}

function montaModal() {
    
    $('.hModal').text("Confirmação de Inclusão de Usuário");    
    $('.pModal').append(
        `<p class="pModal">
            <br/>
            Verifique se os dados abaixo estão corretos e clique em "Confirma" para efetuar o registro.<br/><br/>          
           
            <strong>CPF do Usuário:</strong><br/>
            ${document.formUser.cpfUser.value} <br/>
            <strong>Nome do Usuário:</strong><br/>
            ${document.formUser.nomeUser.value}<br/>
            <strong>Endereço de e-mail do Usuário:</strong><br/>
            ${document.formUser.mailUser.value}<br/>
            <strong>Unidade de Lotação do Usuário:</strong><br/>
            ${document.formUser.unidadeLotacao.value}<br/>
            <strong>Cargo do Usuário:</strong><br/>          
            ${document.formUser.cargoUser.value}<br/>
            <strong>Perfil de acesso do Usuário:</strong><br/>
            ${document.formUser.perfilUser.value}<br/>      
            </p>`
    );
    $('.concorda').click(function () {
        $("#formUser").submit();

    });
    $('.cancela').click(function () {
        $('.pModal').text('');
        $('.docref').val('');
    })
}  

function initDatePicker() {
    $('.datepicker').click(function (event) {
        event.preventDefault();
        $('.lbdataNC').css('color', '#9e9e9e');
        $('.lbEncCorNC').css('color', '#9e9e9e');

    });
    let formato = 'dd-mm-yyyy'
    let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let mesesCurtos = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    let diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    let diasCurtos = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
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