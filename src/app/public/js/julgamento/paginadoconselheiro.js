inicializaComponentes();
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
let toolbarOptions = [['bold', 'italic', 'underline', 'strike'],
['link'],
[{ 'color': [] }, { 'background': [] }],
[{ 'align': [] }],
[{ 'list': 'ordered' }, { 'list': 'bullet' }],
[{ 'script': 'sub' }, { 'script': 'super' }],
[{ 'indent': '-1' }, { 'indent': '+1' }],
['clean']];
let options = {

    modules: {
        toolbar: toolbarOptions,
        'history': {
            'delay': 2500,
            'userOnly': true
        },
    },
    theme: 'snow'
}

let layout = "fitDataFill";
let responsiveLayout = true;
let tableRegap, tableOcorrencias, tableReinp, tableReinpDet;
let tabledata = "";
let d3 = Plotly.d3;
let agrupado = false;
let agrupadoRegap = false;
let agrupadoReinp = false;
let agrupadoT = false;
function inicializaComponentes() {
    $(document).ready(function () {
        initSelect();
        tabelaOcorrencias();
        tabelaSolicitacoes();
        initTabs();
        $(".progressRegap").toggle();
        $(".progressReinp").toggle();
        calendario();
        elementosTabelas();
        elementosModal();
        initModal();
        downloadCons();
        btnModal();
        initDatePicker();
    });
}

function downloadCons() {
    $('.dropdownDownloadCons').dropdown({ coverTrigger: false, hover: false, constrainWidth: false });
    $('.csvDownRegap').click(() => {
        tableRegap.download("csv", `REGAP.csv`);
    });
    $('.xlsxDownRegap').click(() => {
        tableRegap.download("xlsx", `REGAP.xlsx`, { sheetName: "Relatório" });
    })
    $('.csvDownReinp').click(() => {
        tableReinpDet.download("csv", `REINP.csv`);
    });
    $('.xlsxDownReinp').click(() => {
        let sheets = {
            "Reinp": true,
            "Processos Reinp": tableReinpDet, //third tab with table set to DOM Node
        };
        tableReinp.download("xlsx", `REINP.xlsx`, { sheets: sheets });
    })
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

function initModal() {
    $('.modal').modal();
}

function calendario(dias) {
    let calendario = JSON.parse($('#dataCAL').attr('data-cal'));
    let datas = [];
    calendario.forEach(c => {
        if (moment(c.start, 'DD/MM/YYYY').isSameOrAfter(moment())) {
            datas.push(moment(c.start, 'DD/MM/YYYY').diff(moment(), 'days'));
        }
    })
    $('#daps').text(Math.min(...datas))
    $('#ps').text(moment().add(Math.min(...datas) + 1, 'days').format('DD/MM/YYYY'))
    return +dias + Math.min(...datas);
}

function initSelect() {
    $('select').formSelect();

}

function initTabs() {
    $('.tabs').tabs();
}

function elementosTabelas() {

    $('.dataRelRegap').change(() => {
        console.log($("#dataRelRegap option:selected").val());
        $.ajax({
            url: `/julgamento/conselheiros/${$("#dataRelRegap option:selected").val()}`,
            type: 'POST',
            data: {},
            beforeSend: function () {
                $(".progressRegap").toggle();
            }
        })
            .done(function (msg) {
                dataTable(msg);
                grafico(msg);
                $(".progressRegap").toggle();
            })
            .fail(function (jqXHR, textStatus, msg) {
                var toastHTML = `<span>Ocorreu um erro.</span>`;
                M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            });

    })

    $('.dataRelReinp').change(() => {
        console.log($("#dataRelReinp option:selected").val());
        $.ajax({
            url: `/julgamento/conselheiros/${$("#dataRelReinp option:selected").val()}`,
            type: 'POST',
            data: {},
            beforeSend: function () {
                $(".progressReinp").toggle();
            }
        })
            .done(function (msg) {
                formataDados(msg);
                dataTableReinpDet(msg);
                graficoReinp(msg);
                $(".progressReinp").toggle();
            })
            .fail(function (jqXHR, textStatus, msg) {
                var toastHTML = `<span>Ocorreu um erro.</span>`;
                M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            });

    })

    document.getElementById("agrupaMes").addEventListener("click", function () {
        if (agrupadoReinp == false) {
            tableReinpDet.setGroupBy(["trimestre", "mes"]);
            agrupadoReinp = true;
        }
        else {
            tableReinpDet.setGroupBy();
            agrupadoReinp = false;
        };
    });

    document.getElementById("mostraColunasAtividade").addEventListener("click", function () {
        if (agrupadoRegap == false) {
            tableRegap.setGroupBy(["Atividade", "Situacao"]);
            agrupadoRegap = true;
        }
        else {
            tableRegap.setGroupBy();
            agrupadoRegap = false;
        };
    });

    $('.Atividade').change(() => {
        //console.log($("select option:selected").val());
        table.setFilter("Atividade", "=", $("#atividadeSelect option:selected").val())
        if ($("#atividadeSelect option:selected").val() == 'Todas') {
            table.removeFilter("Atividade", "=", $("#atividadeSelect option:selected").val())
        } else { table.setFilter("Atividade", "=", $("#atividadeSelect option:selected").val()) }
    })
}

function formataDados(msg) {
    let flat = [];
    let b = d3.nest()
        .key(d => { return d.CPF })
        .rollup(v => {
            return {
                jan: d3.sum(v, d => { if (d.mes == '12/2019' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                fev: d3.sum(v, d => { if (d.mes == '1/2020' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                mar: d3.sum(v, d => { if ((d.mes == '2/2020' && d.trimestre == 'T1') || (d.mes == '3/2020' && d.trimestre == 'T1')) { return +d.HE_CARF } }),
                abr: d3.sum(v, d => { if (d.mes == '3/2020' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                mai: d3.sum(v, d => { if (d.mes == '4/2019' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                jun: d3.sum(v, d => { if ((d.mes == '5/2019' && d.trimestre == 'T2') || (d.mes == '6/2019' && d.trimestre == 'T2')) { return +d.HE_CARF } }),
                jul: d3.sum(v, d => { if (d.mes == '6/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                ago: d3.sum(v, d => { if (d.mes == '7/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                set: d3.sum(v, d => { if ((d.mes == '8/2019' && d.trimestre == 'T3') || (d.mes == '9/2019' && d.trimestre == 'T3')) { return +d.HE_CARF } }),
                out: d3.sum(v, d => { if (d.mes == '9/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                nov: d3.sum(v, d => { if (d.mes == '10/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                dez: d3.sum(v, d => { if ((d.mes == '11/2019' && d.trimestre == 'T4') || (d.mes == '12/2020' && d.trimestre == 'T4')) { return +d.HE_CARF } })
            }
        })
        .entries(msg)
    b.forEach(d => {
        flat.push(
            {

                jan: d.values.jan.toFixed(2),
                fev: d.values.fev.toFixed(2),
                mar: d.values.mar.toFixed(2),
                t1: (d.values.jan + d.values.fev + d.values.mar).toFixed(2),
                abr: d.values.abr.toFixed(2),
                mai: d.values.mai.toFixed(2),
                jun: d.values.jun.toFixed(2),
                t2: (d.values.abr + d.values.mai + d.values.jun).toFixed(2),
                jul: d.values.jul.toFixed(2),
                ago: d.values.ago.toFixed(2),
                set: d.values.set.toFixed(2),
                t3: (d.values.jul + d.values.ago + d.values.set).toFixed(2),
                out: d.values.out.toFixed(2),
                nov: d.values.nov.toFixed(2),
                dez: d.values.dez.toFixed(2),
                t4: (d.values.out + d.values.nov + d.values.dez).toFixed(2),
            })
    })
    dataTableReinp(flat)
}

function dataTableReinp(msg) {
    let tabledata = msg;
    tableReinp = new Tabulator("#tabelaReinp", {
        data: tabledata,
        // pagination: "local",
        height: "200px",
        minHeight: '200px',
        maxHeight: '900px',
        layout: 'fitColumns',
        responsiveLayout: 'collapse',
        groupStartOpen: false,
        responsiveLayoutCollapseStartOpen: false,
        initialSort: [{}],
        columns: [
            { formatter: "responsiveCollapse", width: 50, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false, responsive: 0, download: true, },
            { title: "Turma", field: "Equipe", sorter: "string", hozAlign: "center", editor: false, responsive: 0, download: true, },
            { title: "1º Trimestre", field: "t1", sorter: "number", hozAlign: "center", editor: false, formatter: formatTrimestre, responsive: 0, download: true, },
            { title: "2º Trimestre", field: "t2", sorter: "number", hozAlign: "center", editor: false, formatter: formatTrimestre, responsive: 0, download: true, },
            { title: "3º Trimestre", field: "t3", sorter: "number", hozAlign: "center", editor: false, formatter: formatTrimestre, responsive: 0, download: true, },
            { title: "4º Trimestre", field: "t4", sorter: "number", hozAlign: "center", editor: false, formatter: formatTrimestre, responsive: 0, download: true, },
        ],
        autoColumns: false,
        locale: true,
        langs: langs,
    });
}

let formatNome = function formatNome(cell) {
    return `<a href='/julgamento/restrito/reinp/detalha/${cell.getRow().getData().cpf}'>${cell.getValue()}</a>`
}

let formatMes = function formatNome(cell) {

    return `${cell.getValue()}`
}

let formatTrimestre = function formatNome(cell) {
    const valor = +cell.getValue();
    if (valor >= 378) { cell.getElement().style.color = 'green'; cell.getElement().style.fontWeight = 'bolder' }
    if (valor < 378) { cell.getElement().style.color = 'red'; cell.getElement().style.fontWeight = 'bolder'; }
    return valor
}

function dataTableReinpDet(msg) {
    let tabledata = msg.flat();
    tableReinpDet = new Tabulator("#tabelaReinpDet", {
        data: tabledata,
        pagination: "local",
        height: "600px",
        minHeight: '300px',
        maxHeight: '900px',
        layout: 'fitData',
        responsiveLayout: 'collapse',
        groupStartOpen: false,
        responsiveLayoutCollapseStartOpen: false,
        initialSort: [{}],
        columns: [
            { formatter: "responsiveCollapse", width: 50, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false, responsive: 0, download: true, },
            { title: "Processo", field: "Processo", sorter: "number", hozAlign: "center", topCalc: countCalc, editor: false, responsive: 0, download: true, },
            { title: "Horas Estimadas", field: "HE_CARF", sorter: "number", hozAlign: "center", topCalc: somaCalc, editor: false, responsive: 0, download: true, },
            { title: "Data de Indicação", field: "Data", sorter: "date", hozAlign: "center", editor: false, responsive: 0, download: true, },
            { title: "Trimestre", field: "trimestre", sorter: "string", hozAlign: "center", editor: false, download: true, },
            { title: "Turma", field: "Equipe", sorter: "string", hozAlign: "center", editor: false, responsive: 0, download: true, },
        ],
        autoColumns: false,
        locale: true,
        langs: langs,
    });
}

function tabelaOcorrencias() {

    let tabledata = JSON.parse($('#tabelaOcorrencias').attr('data-ocorrencias'));
    //define table
    tableOcorrencias = new Tabulator("#tabelaOcorrencias", {
        data: tabledata,
        autoColumns: false,
        locale: true,
        langs: langs,
        pagination: 'local',
        height: '1000px',
        minHeight: '300px',
        maxHeight: '1000px',
        layout: "fitColumns",
        initialSort: [{ column: "dtOcorrencia", dir: "desc" }],
        resizableRows: true,
        responsiveLayout: 'collapse',
        responsiveLayoutCollapseStartOpen: false,
        columns: [
            { title: "Ocorrência", field: "tipoOcorrencia", sorter: "string", hozAlign: "left", editor: false, headerFilter: "input", topCalc: "count", responsive: 0 },
            { title: "Detalhes da Ocorrência", field: "ocorDet", sorter: "string", hozAlign: "left", editor: false, headerFilter: "input", responsive: 0, },
            { title: "Data da Ocorrência", field: "dtOcorrencia", sorter: "date", hozAlign: "center", editor: false, headerFilter: "input", responsive: 0 },

        ],

    });
}

function btnModal() {
    $('#btnSolModal').click(function (event) {
        event.preventDefault();
        $('#btnSolModal').addClass('modal-trigger');
    });
}

function elementosModal() {
    $('#tipoSolicitacao').change(e => {
        initDatePicker();
        let dadosForm = {};
        $('#divTipo').text('');
        if ($("#tipoSolicitacao option:selected").val() == 'Abatimento de Horas da Meta de Produtividade - Afastamento') {
            $('#divTipo').text('');
            let arrayMeta = ['Compromissos profissionais ou acadêmicos (firmados antes da designação para o mandato)', 'Licença à gestante', 'Licença à adotante',
                'Licença à paternidade', 'Licença para tratamento de saúde (homologado)', 'Licença em razão de casamento',
                'Licença por motivo de falecimento (cônjuge, companheiro, pais, madastra ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos)',
                'Mudança de colegiado (implique em alteração de calendário da sessão de julgamento)', 'Participação em Seminário - CARF',
                'Período de férias (marcado perante a entidade pública)', 'Outros'];
            let html = '';
            arrayMeta.forEach((ops, i) => {
                html += `<option class="form-group" value="${ops}">${ops}</option>`
            })
            $('#divTipo').append(`
            <div class='row'>
                    <div class='col s7'>
                    <label for="tipoAfastamento">Selecione o tipo de afastamento:</label> 
                    <select required name="tipoAfastamento" id="tipoAfastamento">
                                 ${html}
                    </select>                   
                    </div>           
                    <div class ='col s4 horasDeducao input-field'> 
                    <input id="horasDeducao" name="horasDeducao" type="number" class="validate"/>
                    <label for="horasDeducao">Total de horas a deduzir da Meta de Produtividade:</label>
                    </div>
          </div>
          <div class='row'>
            <div class="form-group inicioAfastamento input field col s3 ">
            <input id="inicioAfastamento" name="inicioAfastamento"  type="text" class="datepicker"/>                      
            <label for="inicioAfastamento">Início do Afastamento</label>
            </div>
            <div class="form-group fimAfastamento input field col s3">
            <input id="fimAfastamento" name="fimAfastamento" type="text" class="datepicker"/>            
            <label for="fimAfastamento">Fim do Afastamento</label>
            </div>
            <div class ='col s6 diasUteis input-field'>           
            <input id="diasUteis" name="diasUteis" type="number" class="validate"/>
            <label for="diasUteis">Dias úteis do Período <strong>(excluídos os dias das Sessões de Julgamento):</strong></label>
            </div>
          </div>
          <div class='row'>          
            <div class="input-field col s12">            
            <i class="material-icons prefix">mode_edit</i>
            <textarea id="observacoes" class="materialize-textarea"></textarea>
            <label for="observacoes">Observações</label>
            </div>
          </div>
            <br />`)
            initDatePicker();
            initSelect()

            $('.concorda').click(e => {
                dadosForm = {
                    tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
                    tipoAfastamento: $('#tipoAfastamento option:selected').val(),
                    horasDeducao: $('#horasDeducao').val(),
                    dtInicio: $('#inicioAfastamento').val(),
                    dtFim: $('#fimAfastamento').val(),
                    status: 'Enviado para análise',
                    observacoes: `Dias úteis: ${$('#diasUteis').val()}, Observações: ${$('#observacoes').val()}`,
                };
                handleSOL(dadosForm, 'POST');
            })

        }
        if ($("#tipoSolicitacao option:selected").val() == 'Abatimento de Horas da Meta de Produtividade - Participação em TO/CSRF') {
            $('#divTipo').text('');
            let arrayTurma = ["1ª Turma CSRF", "2ª Turma CSRF", "3ª Turma CSRF",
                "1ª Turma Extraordinária/1ª Seção", "2ª Turma Extraordinária/1ª Seção", "3ª Turma Extraordinária/1ª Seção",
                "1ª Turma Ordinária/2ª Câmara/ 1ª Seção", "1ª Turma Ordinária/3ª Câmara/ 1ª Seção", "2ª Turma Ordinária/3ª Câmara/ 1ª Seção",
                "1ª Turma Ordinária/4ª Câmara/ 1ª Seção", "2ª Turma Ordinária/4ª Câmara/ 1ª Seção", "1ª Turma Extraordinária/2ª Seção",
                "2ª Turma Extraordinária/2ª Seção", "3ª Turma Extraordinária/2ª Seção", "1ª Turma Ordinária/2ª Câmara/ 2ª Seção",
                "2ª Turma Ordinária/2ª Câmara/ 2ª Seção", "1ª Turma Ordinária/3ª Câmara/ 2ª Seção", "1ª Turma Ordinária/4ª Câmara/ 2ª Seção",
                "2ª Turma Ordinária/4ª Câmara/ 2ª Seção", "1ª Turma Extraordinária/3ª Seção", "2ª Turma Extraordinária/3ª Seção",
                "3ª Turma Extraordinária/3ª Seção", "1ª Turma Ordinária/2ª Câmara/ 3ª Seção", "1ª Turma Ordinária/3ª Câmara/ 3ª Seção",
                "2ª Turma Ordinária/3ª Câmara/ 3ª Seção", "1ª Turma Ordinária/4ª Câmara/ 3ª Seção", "2ª Turma Ordinária/4ª Câmara/ 3ª Seção"];
            let html = '';
            arrayTurma.forEach((ops, i) => {
                html += `<option class="form-group" value="${ops}">${ops}</option>`
            })
            $('#divTipo').append(`
            <div class='row'>
            <div class='col s7'>
            <label for="tipoAfastamento">Selecione a turma de participação:</label> 
            <select required name="tipoAfastamento" id="tipoAfastamento">
                                 ${html}
            </select>                   
          </div>           
          <div class ='col s4 horasDeducao input-field'> 
          <input id="horasDeducao" name="horasDeducao" type="number" class="validate"/>
           <label for="horasDeducao">Total de horas a deduzir da Meta de Produtividade:</label>
           </div>
          </div>
          <div class='row'>
            <div class="form-group inicioAfastamento input field col s3 ">
            <input id="inicioAfastamento" name="inicioAfastamento"  type="text" class="datepicker"/>                      
            <label for="inicioAfastamento">Início do Afastamento</label>
            </div>
            <div class="form-group fimAfastamento input field col s3">
            <input id="fimAfastamento" name="fimAfastamento" type="text" class="datepicker"/>            
            <label for="fimAfastamento">Fim do Afastamento</label>
            </div>
            <div class ='col s6 diasUteis input-field'>           
            <input id="diasUteis" name="diasUteis" type="number" class="validate"/>
            <label for="diasUteis">Dias úteis do Período <strong>(excluídos os dias das Sessões de Julgamento):</strong></label>
            </div>
        </div>
        <div class='row'>          
        <div class="input-field col s12">
        <i class="material-icons prefix">mode_edit</i>
        
        <textarea id="observacoes" class="materialize-textarea"></textarea>
        <label for="observacoes">Observações</label>
        </div>
        </div>
            <br />`)
            initDatePicker();
            initSelect();

            $('.concorda').click(e => {
                dadosForm = {
                    tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
                    tipoAfastamento: $('#tipoAfastamento option:selected').val(),
                    horasDeducao: $('#horasDeducao').val(),
                    dtInicio: $('#inicioAfastamento').val(),
                    dtFim: $('#fimAfastamento').val(),
                    status: 'Enviado para análise',
                    observacoes: `Dias úteis: ${$('#diasUteis').val()}, Observações: ${$('#observacoes').val()}`,
                };
                handleSOL(dadosForm, 'POST');
            })

        }
        if ($("#tipoSolicitacao option:selected").val() == 'Dispensa de Sorteio - Excesso de Horas') {
            $('#divTipo').append(`
            <div class='row'>            
            <div class ='col s4 horasDeducao input-field'> 
            <input id="horasDeducao" name="horasDeducao" type="number" class="validate"/>
           <label for="horasDeducao">Horas CARF (REGAP):</label>
           </div>
          </div>
          <div class='row'>
          <div class ='col s3 nomeLote input-field'>           
          <input id="nomeLote" name="nomeLote" type="text" class="validate"/>
          <label for="nomeLote">Nome do Lote:</strong></label>
          </div>
            <div class ='col s3 mesSorteio input-field'>           
            <input id="mesSorteio" name="mesSorteio" type="text" class="validate"/>
            <label for="mesSorteio">Mês do Sorteio:</strong></label>
            </div>           
        </div>
        <div class='row'>          
        <div class="input-field col s12">
        <i class="material-icons prefix">mode_edit</i>        
        <textarea id="observacoes" class="materialize-textarea"></textarea>
        <label for="observacoes">Observações</label>
        </div>
        </div>
            <br />`)
            initDatePicker();
            initSelect();

            $('.concorda').click(e => {
                dadosForm = {
                    tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
                    tipoAfastamento: $('#tipoSolicitacao option:selected').val(),
                    horasDeducao: $('#horasDeducao').val(),
                    dtInicio: '',
                    dtFim: '',
                    status: 'Enviado para análise',
                    observacoes: `Mês do Sorteio: ${$('#mesSorteio').val()}, Dias úteis: ${$('#diasUteis').val()}, Nome do Lote: ${$('#nomeLote').val()}, Observações: ${$('#observacoes').val()}`,
                };
                handleSOL(dadosForm, 'POST');
            })
        }
        if ($("#tipoSolicitacao option:selected").val() == 'Dispensa de Sorteio - Participação em TO/CSRF') {
            let arrayTurma = ["1ª Turma CSRF", "2ª Turma CSRF", "3ª Turma CSRF",
                "1ª Turma Extraordinária/1ª Seção", "2ª Turma Extraordinária/1ª Seção", "3ª Turma Extraordinária/1ª Seção",
                "1ª Turma Ordinária/2ª Câmara/ 1ª Seção", "1ª Turma Ordinária/3ª Câmara/ 1ª Seção", "2ª Turma Ordinária/3ª Câmara/ 1ª Seção",
                "1ª Turma Ordinária/4ª Câmara/ 1ª Seção", "2ª Turma Ordinária/4ª Câmara/ 1ª Seção", "1ª Turma Extraordinária/2ª Seção",
                "2ª Turma Extraordinária/2ª Seção", "3ª Turma Extraordinária/2ª Seção", "1ª Turma Ordinária/2ª Câmara/ 2ª Seção",
                "2ª Turma Ordinária/2ª Câmara/ 2ª Seção", "1ª Turma Ordinária/3ª Câmara/ 2ª Seção", "1ª Turma Ordinária/4ª Câmara/ 2ª Seção",
                "2ª Turma Ordinária/4ª Câmara/ 2ª Seção", "1ª Turma Extraordinária/3ª Seção", "2ª Turma Extraordinária/3ª Seção",
                "3ª Turma Extraordinária/3ª Seção", "1ª Turma Ordinária/2ª Câmara/ 3ª Seção", "1ª Turma Ordinária/3ª Câmara/ 3ª Seção",
                "2ª Turma Ordinária/3ª Câmara/ 3ª Seção", "1ª Turma Ordinária/4ª Câmara/ 3ª Seção", "2ª Turma Ordinária/4ª Câmara/ 3ª Seção"];
            let html = '';
            arrayTurma.forEach((ops, i) => {
                html += `<option class="form-group" value="${ops}">${ops}</option>`
            })
            $('#divTipo').append(`
            <div class='row'>
            <div class='col s7'>
            <label for="tipoAfastamento">Selecione a turma de participação:</label> 
            <select required name="tipoAfastamento" id="tipoAfastamento">
                                 ${html}
            </select>                   
          </div>           
          <div class ='col s4 horasDeducao input-field'> 
          <input id="horasDeducao" name="horasDeducao" type="number" class="validate"/>
           <label for="horasDeducao">Total de horas a deduzir da Meta de Produtividade:</label>
           </div>
          </div>
          <div class='row'>
            <div class="form-group dataSessao input field col s3 ">
            <input id="dataSessao" name="dataSessao"  type="text" class="datepicker"/>                      
            <label for="dataSessao">Data da Sessão de Julgamento</label>
            </div>    
            <div class ='col s6 sessoes input-field'>           
            <input id="sessoes" name="sessoes" type="number" class="validate"/>
            <label for="sessoes">Quantidade de sessões:</strong></label>
            </div>
        </div>
        <div class='row'>          
        <div class="input-field col s12">
        <i class="material-icons prefix">mode_edit</i>        
        <textarea id="observacoes" class="materialize-textarea"></textarea>
        <label for="observacoes">Observações</label>
        </div>
        </div>
            <br />`)
            initDatePicker();
            initSelect();

            $('.concorda').click(e => {
                dadosForm = {
                    tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
                    tipoAfastamento: $('#tipoAfastamento option:selected').val(),
                    horasDeducao: $('#horasDeducao').val(),
                    dtInicio: $('#dataSessao').val(),
                    dtFim: $('#dataSessao').val(),
                    status: 'Enviado para análise',
                    observacoes: `Sessões: ${$('#sessoes').val()}, Observações: ${$('#observacoes').val()}`,
                };
                handleSOL(dadosForm, 'POST');
            })
        }
        if ($("#tipoSolicitacao option:selected").val() == 'Dispensa de Sorteio - Formalização de Voto Vencedor') {
            let arrayTurma = ["1ª Turma CSRF", "2ª Turma CSRF", "3ª Turma CSRF",
                "1ª Turma Extraordinária/1ª Seção", "2ª Turma Extraordinária/1ª Seção", "3ª Turma Extraordinária/1ª Seção",
                "1ª Turma Ordinária/2ª Câmara/ 1ª Seção", "1ª Turma Ordinária/3ª Câmara/ 1ª Seção", "2ª Turma Ordinária/3ª Câmara/ 1ª Seção",
                "1ª Turma Ordinária/4ª Câmara/ 1ª Seção", "2ª Turma Ordinária/4ª Câmara/ 1ª Seção", "1ª Turma Extraordinária/2ª Seção",
                "2ª Turma Extraordinária/2ª Seção", "3ª Turma Extraordinária/2ª Seção", "1ª Turma Ordinária/2ª Câmara/ 2ª Seção",
                "2ª Turma Ordinária/2ª Câmara/ 2ª Seção", "1ª Turma Ordinária/3ª Câmara/ 2ª Seção", "1ª Turma Ordinária/4ª Câmara/ 2ª Seção",
                "2ª Turma Ordinária/4ª Câmara/ 2ª Seção", "1ª Turma Extraordinária/3ª Seção", "2ª Turma Extraordinária/3ª Seção",
                "3ª Turma Extraordinária/3ª Seção", "1ª Turma Ordinária/2ª Câmara/ 3ª Seção", "1ª Turma Ordinária/3ª Câmara/ 3ª Seção",
                "2ª Turma Ordinária/3ª Câmara/ 3ª Seção", "1ª Turma Ordinária/4ª Câmara/ 3ª Seção", "2ª Turma Ordinária/4ª Câmara/ 3ª Seção"];
            let html = '';
            arrayTurma.forEach((ops, i) => {
                html += `<option class="form-group" value="${ops}">${ops}</option>`
            })
            $('#divTipo').append(`
            <div class='row'>
            <div class='col s7'>
            <label for="tipoAfastamento">Selecione a turma de participação:</label> 
            <select required name="tipoAfastamento" id="tipoAfastamento">
                                 ${html}
            </select>                   
          </div>           
          <div class ='col s4 horasDeducao input-field'> 
          <input id="horasDeducao" name="horasDeducao" type="number" class="validate"/>
           <label for="horasDeducao">Total de horas a deduzir da Meta de Produtividade:</label>
           </div>
          </div>
          <div class='row'>
            <div class="form-group dataSessao input-field col s3 ">
            <input id="dataSessao" name="dataSessao"  type="text" class="datepicker"/>                      
            <label for="dataSessao">Data da Sessão de Julgamento</label>
            </div>    
            <div class ='col s3 numeroAcordao input-field'>           
            <input id="numeroAcordao" name="numeroAcordao" type="text" class="validate"/>
            <label for="numeroAcordao">Número do Acórdão:</strong></label>
            </div>
            <div class ='col s6 numeroProcesso input-field'>           
            <input id="numeroProcesso" name="numeroProcesso" type="text" class="validate"/>
            <label for="numeroProcesso">Número do Processo:</strong></label>
            </div>
        </div>
        <div class='row'>          
        <div class="input-field col s12">
        <i class="material-icons prefix">mode_edit</i>        
        <textarea id="observacoes" class="materialize-textarea"></textarea>
        <label for="observacoes">Observações</label>
        </div>
        </div>
            <br />`)
            initDatePicker();
            initSelect();

            $('.concorda').click(e => {
                dadosForm = {
                    tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
                    tipoAfastamento: $('#tipoAfastamento option:selected').val(),
                    horasDeducao: $('#horasDeducao').val(),
                    dtInicio: $('#dataSessao').val(),
                    dtFim: $('#dataSessao').val(),
                    status: 'Enviado para análise',
                    observacoes: `Número do Processo: ${$('#numeroProcesso').val()}, Número do Acórdão: ${$('#numeroAcordao').val()}, Observações: ${$('#observacoes').val()}`
                };
                handleSOL(dadosForm, 'POST');
            })
        }
    })
}

function handleSOL(registro, metodo) {
    registro.uniqueId = moment.now();
    registro.dtCriacao = moment().format('DD/MM/YYYY')
    $.ajax({
        url: '/julgamento/conselheiros/solicitacoes',
        data: registro,
        type: metodo,
        success: function (result) {
            var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            console.log(result);
        },
        error: function (result) {
            var toastHTML = `<span>Ocorreu um erro.</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            console.log(result);
        }
    })
}

function tabelaSolicitacoes() {
    tabledata = JSON.parse($('#tabelaSolicitacoes').attr('data-solicitacoes'));
    tableOcorrencias = new Tabulator('#tabelaSolicitacoes', {
        data: tabledata,
        pagination: "local",
        height: "1000px",
        minHeight: '300px',
        maxHeight: '1000px',
        layout: "fitColumns",
        responsiveLayout: 'collapse',
        groupStartOpen: false,
        responsiveLayoutCollapseStartOpen: false,
        columns: [
            { formatter: "responsiveCollapse", width: 50, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false, responsive: 0, download: true, },
            { title: "Solicitação", field: "tipoSolicitacao", sorter: "string", hozAlign: "left", editor: false, headerFilter: "input", topCalc: "count", responsive: 0 },
            { title: "Detalhes da Solicitação", field: "tipoAfastamento", sorter: "string", hozAlign: "left", editor: false, headerFilter: "input", responsive: 0, },
            { title: "Horas a Deduzir", field: "horasDeducao", sorter: "number", width: 90, hozAlign: "center", editor: false, headerFilter: "input", responsive: 0 },
            { title: "Data Início", field: "dtInicio", sorter: "date", width: 90, hozAlign: "center", editor: false, headerFilter: "input", responsive: 0 },
            { title: "Data Fim", field: "dtFim", sorter: "date", width: 90, hozAlign: "center", editor: false, headerFilter: "input", responsive: 0 },
            { title: "Status da Solicitação", field: "status", sorter: "string", hozAlign: "center", editor: false, headerFilter: "input", responsive: 0 },
            { title: "Observações", field: "observacoes", sorter: "string", hozAlign: "center", editor: false, headerFilter: "input", responsive: 1 },
        ],
    });
}

function dataTable(dados) {
    let tabledata = dados;
    tableRegap = new Tabulator("#tabelaRegap", {
        data: tabledata,
        pagination: "local",
        height: "1000px",
        minHeight: '300px',
        maxHeight: '1000px',
        layout: 'fitDataFill',
        responsiveLayout: 'collapse',
        groupStartOpen: false,
        responsiveLayoutCollapseStartOpen: false,
        initialSort: [{ column: "Atividade", dir: "desc" }, { column: "Dias_na_Atividade", dir: "desc" }, { column: "HE_CARF", dir: "desc" }],
        columns: [
            { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false, responsive: 0, download: true, },
            { title: "Processo", field: "Processo", sorter: "number", hozAlign: "center", headerFilter: "input", topCalc: countCalc, editor: false, responsive: 0, download: true, },
            { title: "Contribuinte", field: "Contribuinte", sorter: "string", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Turma", field: "turma", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2, download: true, },
            { title: "Câmara", field: "camara", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2, download: true, },
            { title: "Seção", field: "setor", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2, download: true, },
            { title: "Equipe Atual", field: "Equipe_Atual", sorter: "string", hozAlign: "center", headerFilter: "input", editor: false, responsive: 2, download: true, },
            { title: "Ind. Apenso", field: "Ind_Apenso", sorter: "string", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Atividade", field: "Atividade", sorter: "string", hozAlign: "center", topCalc: countCalc, editor: false, responsive: 0, download: true, },
            { title: "Situação de Julgamento", field: "Situacao", sorter: "string", headerFilter: "input", topCalc: countCalc, hozAlign: "center", editor: false, responsive: 0, download: true, },
            { title: "Entrada na Atividade", field: "Entrada_na_Atividade", sorter: "date", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Horas CARF", field: "HE_CARF", sorter: "number", hozAlign: "center", headerFilter: "input", topCalc: somaCalc, editor: false, responsive: 0, download: true, },
            { title: "Dias na Atividade", field: "Dias_na_Atividade", sorter: "number", hozAlign: "center", topCalc: mediaCalc, editor: false, formatter: coloreDias, responsive: 0, download: true },
            { title: "Dias na Atividade na Próxima Sessão", field: "Dias_na_Atividade", sorter: "number", width: 150, hozAlign: "center", editor: false, formatter: formatDAPS, responsive: 0, download: true, },
            { title: "Valor Originário", field: "Valor_Originario", sorter: "number", hozAlign: "center", editor: false, formatter: formatValor, responsive: 0, download: true, },
            { title: "Dias da Sessão de Julgamento", field: "Dias_da_SJ", sorter: "number", width: 150, hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Data da Sessão de Julgamento", field: "Data_da_Sessao_Julgamento", sorter: "number", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Dias da Última Distribuição", field: "Dias_da_Dist", sorter: "number", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Retorno Sepoj?", field: "Retorno_Sepoj", sorter: "string", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Última Equipe", field: "Equipe_Ultima", sorter: "string", hozAlign: "center", editor: false, responsive: 1, download: true, },
            { title: "Alegações", field: "Alegacoes_CARF", sorter: "string", hozAlign: "center", editor: false, responsive: 2, download: true, },
            { title: "Valor do Processo", field: "Valor", sorter: "number", hozAlign: "center", editor: false, formatter: formatValor, responsive: 2, download: true, },
            { title: "Observações", field: "Observacoes", sorter: "string", hozAlign: "center", editor: false, responsive: 1, download: true, },

        ],
        autoColumns: false,
        locale: true,
        langs: langs
    });
}

function formatDAPS(cell) {
    let value = calendario(cell.getValue())
    if (cell.getRow().getData().Atividade == 'Para Relatar' && cell.getRow().getData().Situacao == 'AGUARDANDO PAUTA') {
        if (value >= 180) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
        if (value < 180 && value >= 140) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder'; }
        if (value < 140) { cell.getElement().style.color = 'rgb(63, 138, 2)'; cell.getElement().style.fontWeight = 'bolder' }
    }

    if (cell.getRow().getData().Atividade == 'Formalizar Decisao' && value >= 30) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Formalizar Decisao' && value < 30) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Formalizar Voto Vencedor' && value >= 30) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Formalizar Voto Vencedor' && value < 30) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }

    if (cell.getRow().getData().Atividade == 'Apreciar e Assinar Documento' && value >= 15) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Apreciar e Assinar Documento' && value < 15) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Corrigir Decisão' && value >= 1) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
    return value;

}

let formatValor = function formatValor(cell) {
    const formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true, localeMatcher: "best fit" }
    const valor = +cell.getValue();
    if (valor >= 1000000) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }
    if (valor < 1000000) { cell.getElement().style.color = 'rgb(63, 138, 2)'; cell.getElement().style.fontWeight = 'bolder'; }
    return `${valor.toLocaleString('pt-BR', formato)}`
}

function coloreDias(cell, formatterParams, valor) {
    let value = cell.getValue() ? cell.getValue() : valor;

    if (cell.getRow().getData().Atividade == 'Para Relatar' && cell.getRow().getData().Situacao == 'AGUARDANDO PAUTA') {
        if (value >= 180) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
        if (value < 180 && value >= 140) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder'; }
        if (value < 140) { cell.getElement().style.color = 'rgb(63, 138, 2)'; cell.getElement().style.fontWeight = 'bolder' }
    }

    if (cell.getRow().getData().Atividade == 'Formalizar Decisao' && value >= 30) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Formalizar Decisao' && value < 30) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Formalizar Voto Vencedor' && value >= 30) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Formalizar Voto Vencedor' && value < 30) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }

    if (cell.getRow().getData().Atividade == 'Apreciar e Assinar Documento' && value >= 15) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Apreciar e Assinar Documento' && value < 15) { cell.getElement().style.color = 'rgb(245, 131, 0)'; cell.getElement().style.fontWeight = 'bolder' }
    if (cell.getRow().getData().Atividade == 'Corrigir Decisão' && value >= 1) { cell.getElement().style.color = '#D8000C'; cell.getElement().style.fontWeight = 'bolder' }

    return value
}

function mediaCalc(values, data, calcParams) {
    var calc = 0;
    let valor = 0;
    values.forEach(function (value) {
        if (value > 0) {
            valor += value;
            calc++;
        }
    });

    return `𝛍: ${(valor / calc)}`;
}

function somaCalc(values, data, calcParams) {
    var calc = 0;
    let valor = 0;
    values.forEach(function (value) {
        if (value > 0) {
            valor += +value;
            calc++;
        }
    });

    return `𝚺: ${(valor)}`;
}

function countCalc(values, data, calcParams) {
    var calc = 0;
    let valor = 0;
    values.forEach(function (value) {
        if (value) {
            valor += +value;
            calc++;
        }
    });

    return `|𝜲|: ${(calc)}`;
}

function grafico(dados) {
    var layoutAtividade = {
        title: 'Processos por atividade',
        shapes: [
        ],
        yaxis: {
            showticklabels: true,
            tickangle: 0,
            tickfont: {
                family: 'Arial',
                size: 10,
                color: 'black'
            },
        },
        margin: {
            l: 150,
            r: 150,
            b: 50,
            t: 50
        },

    };
    let config = { responsive: false, displaylogo: false }
    let somatorio = d3.nest().rollup(v => {
        return [
            { y: 'Para Relatar - Aguardando Pauta', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'AGUARDANDO PAUTA') { return 1 } }), },
            { y: 'Para Relatar - Cancelado', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'CANCELADO') { return 1 } }) },
            { y: 'Para Relatar - Retirado de Pauta', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'RETIRADO DE PAUTA') { return 1 } }) },
            { y: 'Para Relatar - Pedido de Vista', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'PEDIDO DE VISTA') { return 1 } }) },
            { y: 'Para Relatar - Indicado para Pauta', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'INDICADO PARA PAUTA') { return 1 } }) },
            { y: 'Para Relatar - Em Sessão', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'EM SESSÃO') { return 1 } }) },
            { y: 'Para Relatar - Em Pauta', x: d3.sum(v, d => { if (d.Atividade == 'Para Relatar' && d.Situacao == 'EM PAUTA') { return 1 } }) },
            { y: 'Formalizar Voto Vencedor', x: d3.sum(v, d => { if (d.Atividade == 'Formalizar Voto Vencedor') { return 1 } }) },
            { y: 'Apreciar e Assinar Documento', x: d3.sum(v, d => { if (d.Atividade == 'Apreciar e Assinar Documento') { return 1 } }) },
            { y: 'Formalizar Decisão', x: d3.sum(v, d => { if (d.Atividade == 'Formalizar Decisao') { return 1 } }) },
            { y: 'Corrigir Decisão', x: d3.sum(v, d => { if (d.Atividade == 'Corrigir Decisao' || d.Atividade == 'Corrigir Decisão') { return 1 } }) }
        ]
    }).entries(dados)

    let arrayDados = [];
    arrayDados.y = [];
    arrayDados.x = [];
    arrayDados.text = [];
    arrayDados.color = [];

    let cores = ['rgb(204, 204, 204)', 'rgb(254, 181, 204)', 'rgb(104,204, 204)',
        'rgb(124, 181, 204)', 'rgb(164, 204, 204)', 'rgb(184, 181, 204)', 'rgb(84, 105, 119)', 'rgb(144, 181, 204)'
        , 'rgb(119, 110, 84)', 'rgb(134, 224, 234)', 'rgb(134, 131, 224)'];
    somatorio = somatorio.sort((a, b) => { return a.x - b.x })
    somatorio.forEach((row, index) => {
        arrayDados.y.push(row.y)
        arrayDados.x.push(row.x)
        arrayDados.color.push(cores[index]);
        arrayDados.text.push(row.y)

    })
    arrayDados.type = 'bar'
    arrayDados.orientation = 'h';
    arrayDados.type = 'bar';
    arrayDados.fillcolor = 'cls';
    arrayDados.hovertemplate = `<i>Quantidade</i>: %{x:.d} processos<br>                         
                            <b>%{text}</b>`;
    arrayDados.marker = {
        color: arrayDados.color,
        width: 4,
        'colorscale': 'Viridis',
        line: {
        }
    }

    Plotly.newPlot(document.getElementById('barrasAtividade'), [arrayDados], layoutAtividade, config);
}

function dadosGrafico(dados) {
    let flat = [];
    let b = d3.nest()
        .key(d => { return d.CPF })
        .rollup(v => {
            return {
                jan: d3.sum(v, d => { if (d.mes == '12/2019' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                fev: d3.sum(v, d => { if (d.mes == '1/2020' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                mar: d3.sum(v, d => { if ((d.mes == '2/2020' && d.trimestre == 'T1') || (d.mes == '3/2020' && d.trimestre == 'T1')) { return +d.HE_CARF } }),
                abr: d3.sum(v, d => { if (d.mes == '3/2020' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                mai: d3.sum(v, d => { if (d.mes == '4/2019' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                jun: d3.sum(v, d => { if ((d.mes == '5/2019' && d.trimestre == 'T2') || (d.mes == '6/2019' && d.trimestre == 'T2')) { return +d.HE_CARF } }),
                jul: d3.sum(v, d => { if (d.mes == '6/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                ago: d3.sum(v, d => { if (d.mes == '7/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                set: d3.sum(v, d => { if ((d.mes == '8/2019' && d.trimestre == 'T3') || (d.mes == '9/2019' && d.trimestre == 'T3')) { return +d.HE_CARF } }),
                out: d3.sum(v, d => { if (d.mes == '9/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                nov: d3.sum(v, d => { if (d.mes == '10/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                dez: d3.sum(v, d => { if ((d.mes == '11/2019' && d.trimestre == 'T4') || (d.mes == '12/2020' && d.trimestre == 'T4')) { return +d.HE_CARF } })
            }
        })
        .entries(dados)
    b.forEach(d => {
        flat.push(
            {
                jan: d.values.jan.toFixed(2),
                fev: d.values.fev.toFixed(2),
                mar: d.values.mar.toFixed(2),
                abr: d.values.abr.toFixed(2),
                mai: d.values.mai.toFixed(2),
                jun: d.values.jun.toFixed(2),
                jul: d.values.jul.toFixed(2),
                ago: d.values.ago.toFixed(2),
                set: d.values.set.toFixed(2),
                out: d.values.out.toFixed(2),
                nov: d.values.nov.toFixed(2),
                dez: d.values.dez.toFixed(2),
            })
    })
    return flat;
}

function dadosGrafico(dados) {
    let flat = [];
    let b = d3.nest()
        .key(d => { return d.CPF })
        .rollup(v => {
            return {
                jan: d3.sum(v, d => { if (d.mes == '12/2019' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                fev: d3.sum(v, d => { if (d.mes == '1/2020' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                mar: d3.sum(v, d => { if ((d.mes == '2/2020' && d.trimestre == 'T1') || (d.mes == '3/2020' && d.trimestre == 'T1')) { return +d.HE_CARF } }),
                abr: d3.sum(v, d => { if (d.mes == '3/2020' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                mai: d3.sum(v, d => { if (d.mes == '4/2019' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                jun: d3.sum(v, d => { if ((d.mes == '5/2019' && d.trimestre == 'T2') || (d.mes == '6/2019' && d.trimestre == 'T2')) { return +d.HE_CARF } }),
                jul: d3.sum(v, d => { if (d.mes == '6/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                ago: d3.sum(v, d => { if (d.mes == '7/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                set: d3.sum(v, d => { if ((d.mes == '8/2019' && d.trimestre == 'T3') || (d.mes == '9/2019' && d.trimestre == 'T3')) { return +d.HE_CARF } }),
                out: d3.sum(v, d => { if (d.mes == '9/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                nov: d3.sum(v, d => { if (d.mes == '10/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                dez: d3.sum(v, d => { if ((d.mes == '11/2019' && d.trimestre == 'T4') || (d.mes == '12/2020' && d.trimestre == 'T4')) { return +d.HE_CARF } })
            }
        })
        .entries(dados)
    b.forEach(d => {
        flat.push(
            {
                jan: d.values.jan.toFixed(2),
                fev: d.values.fev.toFixed(2),
                mar: d.values.mar.toFixed(2),
                abr: d.values.abr.toFixed(2),
                mai: d.values.mai.toFixed(2),
                jun: d.values.jun.toFixed(2),
                jul: d.values.jul.toFixed(2),
                ago: d.values.ago.toFixed(2),
                set: d.values.set.toFixed(2),
                out: d.values.out.toFixed(2),
                nov: d.values.nov.toFixed(2),
                dez: d.values.dez.toFixed(2),
            })
    })
    return flat;
}

function dadosGrafico2(dados) {
    let flat = [];
    let b = d3.nest()
        .key(d => { return d.CPF })
        .rollup(v => {
            return {
                jan: d3.sum(v, d => { if (d.mes == '12/2019' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                fev: d3.sum(v, d => { if (d.mes == '1/2020' && d.trimestre == 'T1') { return +d.HE_CARF } }),
                mar: d3.sum(v, d => { if ((d.mes == '2/2020' && d.trimestre == 'T1') || (d.mes == '3/2020' && d.trimestre == 'T1')) { return +d.HE_CARF } }),
                abr: d3.sum(v, d => { if (d.mes == '3/2020' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                mai: d3.sum(v, d => { if (d.mes == '4/2019' && d.trimestre == 'T2') { return +d.HE_CARF } }),
                jun: d3.sum(v, d => { if ((d.mes == '5/2019' && d.trimestre == 'T2') || (d.mes == '6/2019' && d.trimestre == 'T2')) { return +d.HE_CARF } }),
                jul: d3.sum(v, d => { if (d.mes == '6/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                ago: d3.sum(v, d => { if (d.mes == '7/2019' && d.trimestre == 'T3') { return +d.HE_CARF } }),
                set: d3.sum(v, d => { if ((d.mes == '8/2019' && d.trimestre == 'T3') || (d.mes == '9/2019' && d.trimestre == 'T3')) { return +d.HE_CARF } }),
                out: d3.sum(v, d => { if (d.mes == '9/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                nov: d3.sum(v, d => { if (d.mes == '10/2019' && d.trimestre == 'T4') { return +d.HE_CARF } }),
                dez: d3.sum(v, d => { if ((d.mes == '11/2019' && d.trimestre == 'T4') || (d.mes == '12/2020' && d.trimestre == 'T4')) { return +d.HE_CARF } })
            }
        })
        .entries(dados)
    b.forEach(d => {
        flat.push(
            {
                t1: (d.values.jan + d.values.fev + d.values.mar).toFixed(2),
                t2: (d.values.abr + d.values.mai + d.values.jun).toFixed(2),
                t3: (d.values.jul + d.values.ago + d.values.set).toFixed(2),
                t4: (d.values.out + d.values.nov + d.values.dez).toFixed(2),
            })
    })
    return flat;
}

function graficoReinp(msg) {
    dados = msg.flat();
    let graf = dadosGrafico(dados);
    let graf2 = dadosGrafico2(dados);
    let cores = ['rgb(204, 204, 204)', 'rgb(254, 181, 204)', 'rgb(104,204, 204)',
        'rgb(124, 181, 204)', 'rgb(164, 204, 204)', 'rgb(184, 181, 204)', 'rgb(84, 105, 119)',
        'rgb(144, 181, 204)', 'rgb(119, 110, 84)', 'rgb(134, 224, 234)', 'rgb(134, 131, 224)',
        'rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)'];
    var layoutMes = {
        title: 'Indicações por mês',
        shapes: [{
            type: 'line',
            xref: 'paper',
            y0: 126.0,
            x0: 0,
            y1: 126.0,
            x1: 100,
            line: {
                color: 'rgb(229, 43, 80)',
                width: 2,
                dash: 'dot'
            }
        },
        ],
        yaxis: {
            showticklabels: true,
            tickangle: 0,
            tickfont: {
                family: 'Arial',
                size: 10,
                color: 'black'
            },
        },
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50
        },
        bargap: 0.05,

    };
    var layoutTrimestre = {
        title: 'Indicações Trimestre',
        shapes: [
            {
                type: 'line',
                xref: 'paper',
                y0: 378.0,
                x0: 0,
                y1: 378.0,
                x1: 100,
                line: {
                    color: 'rgb(229, 43, 80)',
                    width: 2,
                    dash: 'dot'
                }
            },
        ],
        yaxis: {
            showticklabels: true,
            tickangle: 0,
            tickfont: {
                family: 'Arial',
                size: 10,
                color: 'black'
            },
        },
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50
        },
        bargap: 0.05,

    };
    let config = { responsive: true, displaylogo: false }
    var trace1 = {
        x: Object.keys(graf[0]),
        y: Object.values(graf[0]),
        type: 'bar',
        marker: {
            color: cores
        },
        text: Object.values(graf[0]).map(String),
        textposition: 'auto',
        hoverinfo: 'none',
    }
    var trace2 = {
        x: ['1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre'],
        y: Object.values(graf2[0]),
        type: 'bar',
        marker: {
            color: cores
        },
        text: Object.values(graf2[0]).map(String),
        textposition: 'auto',
        hoverinfo: 'none',
    }
    trace1.color = cores;
    Plotly.newPlot(document.getElementById('barrasReinpMensal'), [trace1], layoutMes, config);
    Plotly.newPlot(document.getElementById('barrasReinpTrimestral'), [trace2], layoutTrimestre, config);
}