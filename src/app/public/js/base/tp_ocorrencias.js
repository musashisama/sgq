inicializaComponentes();

function inicializaComponentes() {
    $(document).ready(function () {
        initSelect();
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
        $('#aModal').addClass('modal-trigger');
        montaModal();
    });
}

function initModal() {
    $('.modal').modal();
}

function montaModal() {
    $('.hModal').text("Confirmação de inclusão de novo tipo de ocorrência");
    $('.pModal').append(
        `<p class="pModal">
            <br/>
            Verifique se os dados abaixo estão corretos e clique em "Confirma" para efetuar o registro.<br/><br/>
            <strong>Dados do novo tipo de não conformidade:</strong><br/> 
            <strong>Tipo de Ocorrência</strong><br/>
            ${document.formOco.tipoOcorrencia.value}<br/>
            <strong>Descrição detalhada do tipo de ocorrência:</strong><br/>
            ${document.formOco.descDet.value}<br/>            
            </p>`
    );
    $('.concorda').click(function () {
        $("#formOco").submit();
    });

    $('.cancela').click(function () {
        $('.pModal').text('');
        $('.docref').val('');
    })
}