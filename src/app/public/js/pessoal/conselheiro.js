inicializaComponentes();

function inicializaComponentes() {
    $(document).ready(function () {
        initDatePicker();
        initBotoes();
        btnEdita();
        btnSalva();
        initSelect();
        initModal();
        btnModal()
    });
}

function initSelect() {
    $('select').formSelect();

}

function initModal() {
    $('.modal').modal();
}

function btnModal() {
    $('.btn-cons-adiciona').click(function (event) {
        event.preventDefault();
        $('#aModal').addClass('modal-trigger');
        montaModal()
    });
}
function btnEdita() {
    $('.btn-cons-edita').click(function (event) {
        event.preventDefault();
        console.log('cliquei');
        $('input').removeAttr("disabled");
        $('select').removeAttr("disabled");
        $('.btn-cons-salva').removeAttr("disabled");
        initSelect();
    });
}

function montaModal() {

    $('.hModal').text("Inclusão de Ocorrência");
    $('.pModal').append(
        `<p class="pModal">
            <br/>
            
            </p>`
    );
}

function btnSalva() {
    $('.btn-cons-salva').click(function (event) {
        event.preventDefault();
        url = $('form').attr("action");
        valores = $("#formCons").serializeArray();
        $.post(url, valores)
            .done((dados) => {
                var toastHTML = '<span>Registro atualizado com sucesso!</span>';
                M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
                $('.btn-cons-salva').prop("disabled", true);
                $('input').prop("disabled", true);
                $('select').prop("disabled", true);

            })
        console.log(valores);
    });
}

function initDatePicker() {


    let formato = 'dd/mm/yyyy'
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

function initBotoes() {
    $('.fixed-action-btn').floatingActionButton({
        direction: 'left',
        hoverEnabled: false
    });
}