inicializaComponentes()
function inicializaComponentes() {
    $(document).ready(function () {
        toggleRegapRadio();
        $('.soregap').hide();
        initDatePicker();
    });
}

let regex = new RegExp("(.*?)\.(csv)$");
function triggerValidation(el) {
    if (el.value != '')
        if (!(regex.test(el.value.toLowerCase()))) {
            el.value = '';
            initToolToast()
            //alert('Favor escolher um arquivo CSV');
        }
}

function initToolToast() {
    var toastHTML = `<span>Favor escolher um arquivo CSV</span><button class="btn-flat toast-action">Ok</button>`;
    $('.tooltipped').tooltip();
    M.toast({ html: toastHTML });
    $('.toast-action').click(function () {
        M.Toast.dismissAll();
    })
}

function toggleRegapRadio() {
    $("input[name='tipoRel']").change(function () {
        if (this.value == 'REGAP') {
            $('.soregap').toggle('slow');
        } else {
            $('.soregap').hide('slow');
        }
    });
}
function initDatePicker() {
    $('.datepicker').click(function (event) {
        event.preventDefault();
        $('.lbdataNC').css('color', '#9e9e9e');
        $('.lbEncCorNC').css('color', '#9e9e9e');

    });
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
