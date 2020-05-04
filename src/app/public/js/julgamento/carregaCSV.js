inicializaComponentes()
function inicializaComponentes() {
    $(document).ready(function () {
        toggleRegapRadio();
        $('.soregap').hide();
        $('.progress').hide();
        initDatePicker();
        initBtnSubmit()
    });
}

let regex = new RegExp("(.*?)\.(csv)$");
function triggerValidation(el) {
    if (el.value != '')
        if (!(regex.test(el.value.toLowerCase()))) {
            el.value = '';
            initToolToast();
        }
}
function initBtnSubmit() {
    var formularioCSV = $('#formCSV');
    formularioCSV.on('submit', function(event){    
        event.preventDefault();        
        var fd = new FormData(formCSV);
        var files = $('#file')[0].files[0];
        $('.concorda').toggle();
        $(".progress").show();
        $("body").append('<div id="overlay" style="background-color:#CCFF0000; position:absolute;top:0;left:0;height:100%;width:100%;z-index:999"></div>');
        fd.append('file', files);       
        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();                
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        $(".determinate").css('width', Math.round(percentComplete*100)+'%'); 
                                       
                    }
                }, false);
                return xhr;
            },
            type: 'POST',
            url: $('#formCSV').attr("action"),
            data: fd,
            processData: false,
            contentType: false,
            success: (dados) => {
                var toastHTML = '<p>Relatório enviado com sucesso! Redirecionando, aguarde por favor.</p>';
                $("#overlay").remove();
                M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
                $('.concorda').toggle();   
                setTimeout(function(){ location.href = '/' }, 3000); 
            },
            fail: function (err) {
                var toastHTML = `<span>Ocorreu um erro.</span>`;
                M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            }
        })
              
    })
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
