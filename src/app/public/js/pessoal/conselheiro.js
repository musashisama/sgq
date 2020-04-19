inicializaComponentes();

function inicializaComponentes() {
    $(document).ready(function () {
        initDatePicker();
        initBotoes();
        btnEdita();
        btnSalva();
        btnOcorrencia();
        initSelect();
        initModal();
        btnModal();
        dataTable();
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

function btnOcorrencia() {
    $('.concorda').click(function (event) {
        event.preventDefault();        
        url = $('#formOcorrencia').attr("action");
        valores = $("#formOcorrencia").serializeArray();
        $.post(url, valores)
            .done((dados) => {
                var toastHTML = '<span>Ocorrência cadastrada com sucesso!</span>';
                M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            }).fail(function(err) {
                var toastHTML = `<span>Ocorreu um erro.}</span>`;
                M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
              })
        console.log(valores);
    });
}


function btnSalva() {
    $('.btn-cons-salva').click(function (event) {
        event.preventDefault();
        url = $('#formCons').attr("action");
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
var table = "";
var autoColumns = false;
var locale = true;
pagination = "local";
height = '1000px';
minHeight = '300px';
maxHeight = '1000px';
layout = "fitDataFill";
responsiveLayout = true;
initialSort = [{ column: "dtOcorrencia", dir: "asc" }];

var langs = {

    "pt-br": {
        "columns": {
            "name": "Nome", //replace the title of column name with the value "Name"
        },
        "ajax": {
            "loading": "Carregando", //ajax loader text
            "error": "Erro", //ajax error text
        },
        "groups": { //copy for the auto generated item count in group header
            "item": "item", //the singular  for item
            "items": "itens", //the plural for items
        },
        "pagination": {
            "page_size": "Quantidade de registros", //label for the page size select element
            "first": "Primeira", //text for the first page button
            "first_title": "Primeira Página", //tooltip text for the first page button
            "last": "Última",
            "last_title": "Última Página",
            "prev": "Anterior",
            "prev_title": "Página Anterior",
            "next": "Próxima",
            "next_title": "Próxima Página",
        },
        "headerFilters": {
            "default": "Filtrar por esta coluna", //default header filter placeholder text
            "columns": {
                "nome": "Filtrar por nome", //replace default header filter text for column name
            }
        }
    }

};

function dataTable() {

    let tabledataCons = JSON.parse($('#tabelaOcorrencias').attr('data-ocorrencias'));
    //define table
    tableCons = new Tabulator("#tabelaOcorrencias", {
        data: tabledataCons,
        autoColumns: autoColumns,
        locale: locale,
        langs: langs,
        pagination: pagination,
        height: height,
        minHeight: minHeight,        
        layout: layout,
        initialSort: initialSort,
        responsiveLayout: responsiveLayout,
        columns: [           
            { title: "Ocorrência", field: "tipoOcorrencia", sorter: "string", hozAlign: "left", editor: false, headerFilter: "input", bottomCalc: "count", responsive: 0 },            
            { title: "Detalhes da Ocorrência", field: "ocorDet", sorter: "string", hozAlign: "center", editor: false, headerFilter: "input", responsive: 1, },
            { title: "Data da Ocorrência", field: "dtOcorrencia", sorter: "date", hozAlign: "center", editor: false, headerFilter: "input", responsive: 0 },  
            { title: "Alteração de Mandato", field: "alteraDtInicio", sorter: "string", hozAlign: "center", editor: false, headerFilter: "input", responsive: 0 },         

        ],

    });
}