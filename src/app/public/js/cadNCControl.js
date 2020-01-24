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
    $('.hModal').text("Confirmação dsazdcase Inclusão de Registro");
    $('.pModal').append(
        `<p class="pModal">
            <br/>
            Verifique se os dados abaixo estão corretos e clique em "Confirma" para efetuar o registro.<br/><br/>
            <strong>Dados da não conformidade:</strong><br/>            
            <strong>Seu macroprocesso:</strong><br/>
            ${document.formCadNC.Macroprocesso.value} <br/>            
            <strong>Descrição da não conformidade</strong><br/>
            ${document.formCadNC.nconformidade.value}<br/>
            <strong>Observações adicionais sobre a não conformidade:</strong><br/>
            ${document.formCadNC.descDet.value}<br/>            
            </p>`
    );
    $('.concorda').click(function () {
        $("#formCadNC").submit();
    });

    $('.cancela').click(function () {
        $('.pModal').text('');
        $('.docref').val('');
    })
}