let table = "";
let autoColumns = false;
let locale = true;
let pagination = "local";
let height = '1000px';
let minHeight = '300px';
let maxHeight = '1000px';
let layout = "fitColumns";
let initialSort = [{ column: "dtOcorrencia", dir: "desc" }];
let langs = {

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
        btnModal2();
        btnVolta();
        dataTable(); 
        initTabs();    
        $('.btn-cons-salva').toggle();
    });
}
function initTabs(){   
        $('.tabs').tabs();     
}

function btnVolta(){
    $('.btnVolta').click(function (event) {        
        
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

function btnModal2() {
    $('.btn-cons-adiciona2').click(function (event) {
        event.preventDefault();
        $('#aModal2').addClass('modal-trigger');
    });
}


function btnEdita() {
    $('.btn-cons-edita').click(function (event) {
        event.preventDefault();        
        $('input').removeAttr("disabled");
        $('select').removeAttr("disabled");
        $('.btn-cons-salva').removeAttr("disabled");
        $('.btn-cons-salva').toggle();
        initSelect();
    });
}

function btnOcorrencia() {
    $('.concorda2').click(function (event) {
        event.preventDefault();
        url = $('#formOcorrencia').attr("action");
        valores = $("#formOcorrencia").serializeArray();
        $.post(url, valores)
            .done((dados) => {
                var toastHTML = '<span>Ocorrência cadastrada com sucesso!</span>';
                M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
                $('#dtOcorrencia').val('');
                $('#ocorDet').val('');
                location.reload(true);
            }).fail(function (err) {
                var toastHTML = `<span>Ocorreu um erro.</span>`;
                M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            })
        console.log(valores);
    });
}


function btnSalva() {
    $('.btn-cons-salva').click(function (event) {
        event.preventDefault();
        url = $('#formPessoa').attr("action");
        valores = $("#formPessoa").serializeArray();
        console.log($("#formPessoa").serializeArray());
        $.post(url, valores)
            .done((dados) => {
                var toastHTML = '<span>Registro atualizado com sucesso!</span>';
                M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });                               
                $('.selectCons').prop("disabled", true);
                $(this).toggle(); 

            }).always()
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

function dataTable() {

    let tabledata = JSON.parse($('#tabelaOcorrencias').attr('data-ocorrencias'));
    //define table
    table = new Tabulator("#tabelaOcorrencias", {
        data: tabledata,
        autoColumns: autoColumns,
        locale: locale,
        langs: langs,
        pagination: pagination,
        height: height,
        minHeight: minHeight,
        layout: layout,
        initialSort: initialSort,
        resizableRows: true,
    responsiveLayout: 'collapse',
    responsiveLayoutCollapseStartOpen: false,
        columns: [
            { title: "Ocorrência", field: "tipoOcorrencia", sorter: "string", hozAlign: "left", editor: false, headerFilter: "input", bottomCalc: "count", responsive: 0 },
            { title: "Detalhes da Ocorrência", field: "ocorDet", sorter: "string", hozAlign: "left", editor: false, headerFilter: "input", responsive: 0, },
            { title: "Data da Ocorrência", field: "dtOcorrencia", sorter: "date", hozAlign: "center", editor: false, headerFilter: "input", responsive: 0 },            
            { formatter: formatEdita, cellClick: edita, width: 40, hozAlign: "center" },
            { formatter: formatDeleta, cellClick: clicaDeleta, width: 40, hozAlign: "center" },
        ],

    });
}

let formatEdita = function formatNome(cell) {
    
    return `<a class='btn-oco-edita' title='Editar' href='#modal1'><i class='material-icons orange-text'>edit</i></a>`
}

function edita(e, cell){
    e.preventDefault();      
    $('.btn-oco-edita').addClass('modal-trigger');
    $('#formOcorrencia').attr('action',`/pessoal/restrito/pessoas/ocorrencia/${cell.getRow().getData()._id}`)
    $('#editaDiv').append('<input type="hidden" name="_method" value="PUT"/>')
    $('#tipoOcorrencia').val(cell.getRow().getData().tipoOcorrencia);
    $('#ocorDet').val(cell.getRow().getData().ocorDet);
    $('#dtOcorrencia').val(cell.getRow().getData().dtOcorrencia);   
}


let formatDeleta = function formatNome(cell) {
    
    return `<a class='deletaOcorrencia' title='Excluir' href='#modal2'><i class='material-icons red-text'>cancel</i></a>`
}
function clicaDeleta(e, cell) {    
    $('.deletaOcorrencia').addClass('modal-trigger');
    montaModalDeleta(e,cell);
}

function montaModalDeleta(e,cell){
    $('.hModal2').text("Confirmação de Exclusão de Ocorrência");    
    $('.pModal2').append(
        `<p class="pModal2">
            <br/>
            Tem certeza que quer excluir o registro?
            </p>`
    );
    $('.concorda').click(function () {     
        deleta(e, cell)
    });
    $('.cancela').click(function () {
        $('.hModal2').text('');   
        $('.pModal2').text('');        
    })
}


function deleta(e, cell) {    
    $.ajax({
        url: `/pessoal/restrito/pessoas/exclui-ocorrencia/${cell.getRow().getData()._id}`,
        type: 'DELETE',
        success: function (result) {
            var toastHTML = `<span>Ocorrência removida com sucesso!</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            table.deleteRow(cell.getRow());
            location.reload(true)
        },
        error: function(result){console.log(result);}
    })
}