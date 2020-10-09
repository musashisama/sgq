inicializaComponentes();
let toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['link'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['clean'],
];
let options = {
  modules: {
    toolbar: toolbarOptions,
    history: {
      delay: 2500,
      userOnly: true,
    },
  },
  theme: 'snow',
};
layout = 'fitDataFill';
let responsiveLayout = true;
let tableOcorrencias,
  tableReinp,
  tableReinpDet = null;
let d3 = Plotly.d3;
let agrupadoRegap = false;
let agrupadoReinp = false;

function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    formataDados();
    tabelaOcorrencias();
    tabelaSolicitacoes();
    initTabs();
    $('.progressRegap').toggle();
    $('.classProcessos').toggle();
    elementosTabelas();
    graficoReinp();
    elementosModal();
    downloadCons();
    btnModal();
    initDatePicker();
  });
}

function downloadCons() {
  $('.dropdownDownloadCons').dropdown({
    coverTrigger: false,
    hover: false,
    constrainWidth: false,
  });
  $('.csvDownRegap').click(() => {
    table.download('csv', `REGAP.csv`);
  });
  $('.xlsxDownRegap').click(() => {
    table.download('xlsx', `REGAP.xlsx`, { sheetName: 'Relatório' });
  });
  $('.csvDownReinp').click(() => {
    tableReinpDet.download('csv', `REINP.csv`);
  });
  $('.xlsxDownReinp').click(() => {
    let sheets = {
      Reinp: true,
      'Processos Reinp': tableReinpDet,
    };
    tableReinp.download('xlsx', `REINP.xlsx`, { sheets: sheets });
  });
}

function initDatePicker() {
  let formato = 'dd/mm/yyyy';
  let meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  let mesesCurtos = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  let diasDaSemana = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  let diasCurtos = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  let diasAbrev = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  $('.datepicker').datepicker({
    autoClose: true,
    format: formato,
    i18n: {
      cancel: 'Cancelar',
      clear: 'Limpar',
      done: 'Ok',
      months: meses,
      monthsShort: mesesCurtos,
      weekdays: diasDaSemana,
      weekdaysShort: diasCurtos,
      weekdaysAbbrev: diasAbrev,
    },
  });
}

function initSelect() {
  $('select').formSelect();
}

function initTabs() {
  $('.tabs').tabs();
}

function agPauta(data) {
  return (
    data.Atividade.includes('Para Relatar') &&
    data.Situacao.includes('AGUARDANDO PAUTA')
  );
}

function returnRep(data) {
  return !data.Observacoes.includes('.REP.');
}

function elementosTabelas() {
  $('.dataRelRegap').change(() => {
    $.ajax({
      url: `/julgamento/conselheiros/${$(
        '#dataRelRegap option:selected',
      ).val()}`,
      type: 'POST',
      data: {},
      beforeSend: function () {
        $('.progressRegap').toggle();
      },
    })
      .done(function (msg) {
        $('.classProcessos').show();
        msg.forEach((r) => {
          r.DAAPS = parseInt($('#daps').text()) + r.Dias_na_Atividade;
        });
        dataTable(msg);
        grafico(msg);
        $('.progressRegap').toggle();
      })
      .fail(function (jqXHR, textStatus, msg) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      });
  });

  // document
  //   .getElementById('mostraColunasAtividadeCons')
  //   .addEventListener('click', function () {
  //     if (agrupadoRegap == false) {
  //       tableRegap.setGroupBy(['Atividade', 'Situacao']);
  //       agrupadoRegap = true;
  //     } else {
  //       tableRegap.setGroupBy();
  //       agrupadoRegap = false;
  //     }
  //   });

  // $('.AtividadeCons').change(() => {
  //   //console.log($("select option:selected").val());
  //   tableRegap.setFilter(
  //     'AtividadeCons',
  //     '=',
  //     $('#atividadeSelect option:selected').val(),
  //   );
  //   if ($('#atividadeSelect option:selected').val() == 'Todas') {
  //     tableRegap.removeFilter(
  //       'AtividadeCons',
  //       '=',
  //       $('#atividadeSelect option:selected').val(),
  //     );
  //   } else {
  //     tableRegap.setFilter(
  //       'AtividadeCons',
  //       '=',
  //       $('#atividadeSelect option:selected').val(),
  //     );
  //   }
  // });
}

function formataDados() {
  let data = JSON.parse($('#idProdutividade').attr('data-reinp'));
  let dados = data[0] ? data[0] : { trimestre: { T1: 0, T2: 0, T3: 0, T4: 0 } };
  let T1 = dados.trimestre.T1 ? dados.trimestre.T1 : 0;
  let T2 = dados.trimestre.T2 ? dados.trimestre.T2 : 0;
  let T3 = dados.trimestre.T3 ? dados.trimestre.T3 : 0;
  let T4 = dados.trimestre.T4 ? dados.trimestre.T4 : 0;

  let dadosTabela = [
    {
      T1: +T1.toFixed(2),
      T2: +T2.toFixed(2),
      T3: +T3.toFixed(2),
      T4: +T4.toFixed(2),
    },
  ];
  dataTableReinp(dadosTabela);

  let arrayMes = dados.detalhamento ? dados.detalhamento : [{}];
  // dados.forEach((d) => {
  //   arrayMes.push(d.detalhamento);
  // });
  dataTableReinpDet(arrayMes.flat());
  document.getElementById('agrupaMes').addEventListener('click', function () {
    if (agrupadoReinp == false) {
      tableReinpDet.setGroupBy(['mes']);
      agrupadoReinp = true;
    } else {
      tableReinpDet.setGroupBy();
      agrupadoReinp = false;
    }
  });
}

function dataTableReinp(msg) {
  tableReinp = new Tabulator('#tabelaReinp', {
    data: msg,
    height: '200px',
    minHeight: '200px',
    maxHeight: '900px',
    layout: layout,
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        title: '1º Trimestre',
        field: 'T1',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
      {
        title: '2º Trimestre',
        field: 'T2',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
      {
        title: '3º Trimestre',
        field: 'T3',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
      {
        title: '4º Trimestre',
        field: 'T4',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatTrimestre,
        responsive: 0,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

let formatTrimestre = function formatTrimestre(cell) {
  const valor = +cell.getValue();
  if (valor >= 378) {
    cell.getElement().style.color = 'green';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (valor < 378) {
    cell.getElement().style.color = 'red';
    cell.getElement().style.fontWeight = 'bolder';
  }
  return valor;
};

function dataTableReinpDet(msg) {
  tableReinpDet = new Tabulator('#tabelaReinpDet', {
    data: msg,
    pagination: 'local',
    height: '600px',
    minHeight: '300px',
    maxHeight: '900px',
    layout: 'fitData',
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        formatter: 'responsiveCollapse',
        width: 50,
        minWidth: 30,
        hozAlign: 'center',
        resizable: true,
        headerSort: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Processo',
        field: 'processo',
        width: 150,
        minWidth: 130,
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Mês de Indicação',
        field: 'mes',
        sorter: 'string',
        hozAlign: 'center',
        topCalc: countCalc,
        headerFilter: 'input',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Contribuinte',
        field: 'contribuinte',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Horas Efetivas',
        field: 'horasEfetivas',
        topCalc: somaCalc,
        sorter: 'number',
        hozAlign: 'center',
        mutator: formatValorReinp,
        accessorDownload: downloadValorReinp,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Código',
        field: 'classificacao.codigo',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Descrição',
        field: 'classificacao.descricao',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

let downloadValorReinp = function (value, data, type, params, column) {
  let valor = value.toLocaleString();
  return valor.replace('.', ',');
};

let formatValorReinp = function (valor, data, type, params, column) {
  if (valor == 7.8) {
    valor = 8;
  }

  return valor;
};

function tabelaOcorrencias() {
  let tabledata = JSON.parse($('#tabelaOcorrencias').attr('data-ocorrencias'));
  //define table
  tableOcorrencias = new Tabulator('#tabelaOcorrencias', {
    data: tabledata,
    autoColumns: false,
    locale: true,
    langs: langs,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitColumns',
    initialSort: [{ column: 'dtOcorrencia', dir: 'desc' }],
    resizableRows: true,
    responsiveLayout: 'collapse',
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        title: 'Ocorrência',
        field: 'tipoOcorrencia',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
      },
      {
        title: 'Detalhes da Ocorrência',
        field: 'ocorDet',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Data da Ocorrência',
        field: 'dtOcorrencia',
        sorter: 'date',
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
    ],
  });
}
function btnModal() {
  $('#btnSolModal').click(function (event) {
    event.preventDefault();
    $('#btnSolModal').addClass('modal-trigger');
  });
}
//Mudar Abatimento para Redução
// Dipensa de sorteio - De março 19 até março 20
// Dispensa de Sorteio - Horas de processos recebidos por decorrência ou reflexo. (Número dos processos no campo de observação e número de horas no campo igual ao do excesso) Campos: Total de horas, Nº dos Processos Recebidos por decorrência e reflexo. Anexar despacho de deferimento.

function elementosModal() {
  $('.arqsUp').hide();
  let arrayTurma = [
    '1ª Turma CSRF',
    '2ª Turma CSRF',
    '3ª Turma CSRF',
    '1ª Turma Extraordinária/1ª Seção',
    '2ª Turma Extraordinária/1ª Seção',
    '3ª Turma Extraordinária/1ª Seção',
    '1ª Turma Ordinária/2ª Câmara/ 1ª Seção',
    '1ª Turma Ordinária/3ª Câmara/ 1ª Seção',
    '2ª Turma Ordinária/3ª Câmara/ 1ª Seção',
    '1ª Turma Ordinária/4ª Câmara/ 1ª Seção',
    '2ª Turma Ordinária/4ª Câmara/ 1ª Seção',
    '1ª Turma Extraordinária/2ª Seção',
    '2ª Turma Extraordinária/2ª Seção',
    '3ª Turma Extraordinária/2ª Seção',
    '1ª Turma Ordinária/2ª Câmara/ 2ª Seção',
    '2ª Turma Ordinária/2ª Câmara/ 2ª Seção',
    '1ª Turma Ordinária/3ª Câmara/ 2ª Seção',
    '1ª Turma Ordinária/4ª Câmara/ 2ª Seção',
    '2ª Turma Ordinária/4ª Câmara/ 2ª Seção',
    '1ª Turma Extraordinária/3ª Seção',
    '2ª Turma Extraordinária/3ª Seção',
    '3ª Turma Extraordinária/3ª Seção',
    '1ª Turma Ordinária/2ª Câmara/ 3ª Seção',
    '1ª Turma Ordinária/3ª Câmara/ 3ª Seção',
    '2ª Turma Ordinária/3ª Câmara/ 3ª Seção',
    '1ª Turma Ordinária/4ª Câmara/ 3ª Seção',
    '2ª Turma Ordinária/4ª Câmara/ 3ª Seção',
  ];
  let arrayFalta = [
    'Compromisso assumido antes da designação para Conselheiro(a)',
    'Licença à gestante',
    'Licença à adotante',
    'Licença à paternidade',
    'Licença para tratamento de saúde',
    'Licença em razão de casamento',
    'Licença por motivo de falecimento (cônjuge, companheiro, pais, madastra ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos)',
    'Período de férias (marcado antes da designação para Conselheiro(a))',
  ];
  let arrayMeta = [
    'Licença à gestante',
    'Licença à adotante',
    'Licença à paternidade',
    'Licença para tratamento de saúde',
    'Licença em razão de casamento',
    'Licença por motivo de falecimento (cônjuge, companheiro, pais, madastra ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos)',
    'Participação em Seminário promovido pelo CARF',
    'Período de férias (marcado perante a RFB)',
  ];

  // REGAP - Justificar Suspensão de Prazo
  let arrayPrazo = [
    'Licença à gestante',
    'Licença à adotante',
    'Licença à paternidade',
    'Licença para tratamento de saúde',
    'Licença em razão de casamento',
    'Licença por motivo de falecimento (cônjuge, companheiro, pais, madastra ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos)',
    'Participação em Seminário promovido pelo CARF',
    'Período de férias (marcado perante a RFB)',
    'Processo objeto de retificação de ata', //Data do Julgamento e Número do processo.
    'Prorrogação de Voto Vencedor -  art. 45, §1º, inciso II do RICARF', //Número de dias de prorrogação - Número dos processos
    'Prorrogação de Prazo de Processo de Imunidade', //Suspensão de 90 dias - Número dos Processos
    'Prorrogação de Prazo autorizada pela COJUL', // Número de dias de prorrogação e número dos processos
  ];
  let arrayMudanca = [
    'Turma Extraordinária para Turma Ordinária da mesma Seção',
    'Turma Extraordinária para Turma Ordinária de Seção Diferente',
    'Turma Ordinária para Turma Ordinária da Mesma Seção',
    'Turma Ordinária para Turma Ordinária de Seção Diferente',
    'Turma Ordinária para Turma da Câmara Superior de Rcursos Fiscais',
  ];
  let html = '';
  $('#tipoSolicitacao').change((e) => {
    initDatePicker();
    let dadosForm = {};
    html = '';
    $('#divTipo').text('');
    $('#enviaArq').text('');
    if (
      $('#tipoSolicitacao option:selected').val() ==
      'Mudança de colegiado que implique em alteração de calendário da sessão de julgamento'
    ) {
      html = '';
      $('#divTipo').text('');
      $('#enviaArq').text('');
      arrayMudanca.forEach((ops, i) => {
        html += `<option class="form-group" value="${ops}">${ops}</option>`;
      });
      $('#divTipo').append(`
            <div class='row'>
                    <div class='col s7'>
                    <label for="tipoAfastamento">Selecione o tipo de afastamento:</label> 
                    <select required name="tipoAfastamento" id="tipoAfastamento">
                                 ${html}
                    </select>                   
                    </div>
          </div>
          <div class='row'>
            <div class="form-group inicioAfastamento input field col s3 ">
            <input id="inicioAfastamento" name="inicioAfastamento"  type="text" class="datepicker"/>                      
            <label for="inicioAfastamento">Data da Mudança</label>
            </div> 
          </div>
          <div class='row'>          
            <div class="input-field col s12">            
            <i class="material-icons prefix">mode_edit</i>
            <textarea id="observacoes" class="materialize-textarea"></textarea>
            <label for="observacoes">Observações</label>
            </div>
          </div>
            <br />`);
      $('#enviaArq').append(`${formArq()}`);
      $('.progress').toggle();
      initDatePicker();
      initSelect();
      btnEnviaArq();
      $('.concorda').click((e) => {
        dadosForm = {
          tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
          tipoAfastamento: $('#tipoSolicitacao option:selected').val(),
          horasDeducao: '',
          dtInicio: $('#inicioAfastamento').val(),
          dtFim: '',
          status: 'Enviado para análise',
          observacoes: ``,
          arquivos: pegaArquivos(),
          statusSegep: 'DocVal',
        };
        handleSOL(dadosForm, 'POST', 'dipaj');
      });
    }
    if (
      $('#tipoSolicitacao option:selected').val() ==
      'Justificar Suspensão de Prazos Regimentais'
    ) {
      html = '';
      $('#divTipo').text('');
      $('#enviaArq').text('');
      arrayPrazo.forEach((ops, i) => {
        html += `<option class="form-group" value="${ops}">${ops}</option>`;
      });
      $('#divTipo').append(`
            <div class='row'>
                    <div class='col s7'>
                    <label for="tipoAfastamento">Selecione o tipo de afastamento:</label> 
                    <select required name="tipoAfastamento" id="tipoAfastamento">
                                 ${html}
                    </select>                   
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
            <label for="diasUteis">Quantidade de Dias a Suspender</label>
            </div>
          </div>
          <div class='row'>          
            <div class="input-field col s12">            
            <i class="material-icons prefix">mode_edit</i>
            <textarea id="observacoes" class="materialize-textarea"></textarea>
            <label for="observacoes">Observações</label>
            </div>
          </div>
            <br />`);
      $('#enviaArq').append(`${formArq()}`);
      $('.progress').toggle();
      initDatePicker();
      initSelect();
      btnEnviaArq();
      $('.concorda').click((e) => {
        dadosForm = {
          tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
          tipoAfastamento: $('#tipoAfastamento option:selected').val(),
          dtInicio: $('#inicioAfastamento').val(),
          dtFim: $('#fimAfastamento').val(),
          status: 'Enviado para análise',
          observacoes: `Dias úteis: ${$('#diasUteis').val()}, Observações: ${$(
            '#observacoes',
          ).val()}`,
          arquivos: pegaArquivos(),
          statusSegep: 'DocVal',
        };
        handleSOL(dadosForm, 'POST', 'dipaj');
      });
    }
    if (
      $('#tipoSolicitacao option:selected').val() ==
      'Justificar Faltas à Sessões de Julgamento'
    ) {
      html = '';
      $('#divTipo').text('');
      $('#enviaArq').text('');
      arrayFalta.forEach((ops, i) => {
        html += `<option class="form-group" value="${ops}">${ops}</option>`;
      });
      $('#divTipo').append(`
            <div class='row'>
                    <div class='col s7'>
                    <label for="tipoAfastamento">Selecione o tipo de afastamento:</label> 
                    <select required name="tipoAfastamento" id="tipoAfastamento">
                                 ${html}
                    </select>                   
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
            <label for="diasUteis">Quantidade de Dias de Sessão de Julgamento</label>
            </div>
          </div>
          <div class='row'>          
            <div class="input-field col s12">            
            <i class="material-icons prefix">mode_edit</i>
            <textarea id="observacoes" class="materialize-textarea"></textarea>
            <label for="observacoes">Observações</label>
            </div>
          </div>
            <br />`);
      $('#enviaArq').append(`${formArq()}`);
      $('.progress').toggle();
      initDatePicker();
      initSelect();
      btnEnviaArq();
      $('.concorda').click((e) => {
        dadosForm = {
          tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
          tipoAfastamento: $('#tipoAfastamento option:selected').val(),
          dtInicio: $('#inicioAfastamento').val(),
          dtFim: $('#fimAfastamento').val(),
          status: 'Enviado para análise',
          observacoes: `Dias úteis: ${$('#diasUteis').val()}, Observações: ${$(
            '#observacoes',
          ).val()}`,
          arquivos: pegaArquivos(),
          statusSegep: 'DocVal',
        };
        handleSOL(dadosForm, 'POST', 'dipaj');
      });
    }
    if (
      $('#tipoSolicitacao option:selected').val() ==
      'Redução de Horas da Meta de Produtividade - Afastamento'
    ) {
      html = '';
      $('#divTipo').text('');
      $('#enviaArq').text('');
      arrayMeta.forEach((ops, i) => {
        html += `<option class="form-group" value="${ops}">${ops}</option>`;
      });
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
            <br />`);
      $('#enviaArq').append(`${formArq()}`);
      $('.progress').toggle();
      initDatePicker();
      initSelect();
      btnEnviaArq();
      $('.concorda').click((e) => {
        dadosForm = {
          tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
          tipoAfastamento: $('#tipoAfastamento option:selected').val(),
          horasDeducao: $('#horasDeducao').val(),
          dtInicio: $('#inicioAfastamento').val(),
          dtFim: $('#fimAfastamento').val(),
          status: 'Enviado para análise',
          observacoes: `Dias úteis: ${$('#diasUteis').val()}, Observações: ${$(
            '#observacoes',
          ).val()}`,
          arquivos: pegaArquivos(),
          statusSegep: 'DocVal',
        };
        handleSOL(dadosForm, 'POST', 'dipaj');
      });
    }

    if (
      $('#tipoSolicitacao option:selected').val() ==
      'Redução de Horas da Meta de Produtividade - Participação em Sessão Presencial ou por Videoconferência de TEX'
    ) {
      html = '';
      $('#divTipo').text('');
      $('#enviaArq').text('');
      arrayTurma.forEach((ops, i) => {
        html += `<option class="form-group" value="${ops}">${ops}</option>`;
      });
      $('#divTipo').append(`
            <div class='row'>
            <div class='col s7'>
            <label for="tipoAfastamento">Selecione a turma de participação:</label> 
            <select required name="tipoAfastamento" id="tipoAfastamento">
                                 ${html}
            </select>                   
          </div>           
          <div class ='col s4 horasDeducao input-field'> 
          <input id="horasDeducao" name="horasDeducao" value=4 type="number" class="active validate"/>
           <label for="horasDeducao">Total de horas a deduzir da Meta de Produtividade:</label>
           </div>
          </div>
          <div class='row'>
            <div class="form-group inicioAfastamento input field col s3 ">
            <input id="inicioAfastamento" name="inicioAfastamento"  type="text" class="datepicker"/>                      
            <label for="inicioAfastamento">Data da Sessão de Julgamento</label>
            </div>
            <div class='col s7'>
            <label for="turno">Turno de Participação</label> 
            <select required name="turno" id="turno">
            <option class="form-group" value="Manha">Manhã</option>
            <option class="form-group" value="Tarde">Tarde</option>
            </select>                   
          </div>                  
        </div>
        <div class='row'> 
        <blockquote>
                    <strong>Importante:</strong>
                    Caso tenha participado de sessão de julgamento em mais de uma turma por turno, selecione <strong>apenas</strong> a primeira turma de participação.
                    As solicitações deverão ser feitas individualmente para cada turno de participação, onde serão abatidas 4 horas por turno.                    
                  </blockquote>  
        </div>
        <div class='row'>          
        <div class="input-field col s12">
        <i class="material-icons prefix">mode_edit</i>        
        <textarea id="observacoes" class="materialize-textarea"></textarea>
        <label for="observacoes">Observações</label>
        </div>
        </div>
            <br />`);
      $('#enviaArq').append(`${formArq()}`);
      $('.progress').toggle();
      initDatePicker();
      initSelect();
      btnEnviaArq();
      $('.concorda').click((e) => {
        dadosForm = {
          tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
          tipoAfastamento: $('#tipoAfastamento option:selected').val(),
          horasDeducao: $('#horasDeducao').val(),
          dtInicio: $('#inicioAfastamento').val(),
          dtFim: '',
          status: 'Enviado para análise',
          observacoes: `Observações: ${$('#observacoes').val()}`,
          arquivos: pegaArquivos(),
          statusSegep: 'DocVal',
        };
        handleSOL(dadosForm, 'POST', 'dipaj');
      });
    }
    if (
      $('#tipoSolicitacao option:selected').val() ==
      'Redução de Horas da Meta de Produtividade - Participação em TO/CSRF (A partir de Abr/2020)'
    ) {
      html = '';
      $('#divTipo').text('');
      $('#enviaArq').text('');
      arrayTurma.forEach((ops, i) => {
        html += `<option class="form-group" value="${ops}">${ops}</option>`;
      });
      $('#divTipo').append(`
            <div class='row'>
            <div class='col s7'>
            <label for="tipoAfastamento">Selecione a turma de participação:</label> 
            <select required name="tipoAfastamento" id="tipoAfastamento">
                                 ${html}
            </select>                   
          </div>           
          <div class ='col s4 horasDeducao input-field'> 
          <input id="horasDeducao" name="horasDeducao" value=4 type="number" class="active validate"/>
           <label for="horasDeducao">Total de horas a deduzir da Meta de Produtividade:</label>
           </div>
          </div>
          <div class='row'>
            <div class="form-group inicioAfastamento input field col s3 ">
            <input id="inicioAfastamento" name="inicioAfastamento"  type="text" class="datepicker"/>                      
            <label for="inicioAfastamento">Data da Sessão de Julgamento</label>
            </div>
            <div class='col s7'>
            <label for="turno">Turno de Participação</label> 
            <select required name="turno" id="turno">
            <option class="form-group" value="Manha">Manhã</option>
            <option class="form-group" value="Tarde">Tarde</option>
            </select>                   
          </div>                  
        </div>
        <div class='row'> 
        <blockquote>
                    <strong>Importante:</strong>
                    Caso tenha participado de sessão de julgamento em mais de uma turma por turno, selecione <strong>apenas</strong> a primeira turma de participação.
                    As solicitações deverão ser feitas individualmente para cada turno de participação, onde serão abatidas 4 horas por turno.                    
                  </blockquote>  
        </div>
        <div class='row'>          
        <div class="input-field col s12">
        <i class="material-icons prefix">mode_edit</i>        
        <textarea id="observacoes" class="materialize-textarea"></textarea>
        <label for="observacoes">Observações</label>
        </div>
        </div>
            <br />`);
      $('#enviaArq').append(`${formArq()}`);
      $('.progress').toggle();
      initDatePicker();
      initSelect();
      btnEnviaArq();
      $('.concorda').click((e) => {
        dadosForm = {
          tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
          tipoAfastamento: $('#tipoAfastamento option:selected').val(),
          horasDeducao: $('#horasDeducao').val(),
          dtInicio: $('#inicioAfastamento').val(),
          dtFim: '',
          status: 'Enviado para análise',
          observacoes: `Observações: ${$('#observacoes').val()}`,
          arquivos: pegaArquivos(),
          statusSegep: 'DocVal',
        };
        handleSOL(dadosForm, 'POST', 'dipaj');
      });
    }
    if (
      $('#tipoSolicitacao option:selected').val() ==
      'Dispensa de Sorteio - Excesso de Horas em Lotes de Sorteio - A partir de setembro de 2019 (Portaria 2370/19)'
    ) {
      html = '';
      $('#divTipo').text('');
      $('#enviaArq').text('');
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
            <br />`);
      $('#enviaArq').append(`${formArq()}`);
      $('.progress').toggle();
      initDatePicker();
      initSelect();
      btnEnviaArq();
      $('.concorda').click((e) => {
        dadosForm = {
          tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
          tipoAfastamento: $('#tipoSolicitacao option:selected').val(),
          horasDeducao: $('#horasDeducao').val(),
          dtInicio: '',
          dtFim: '',
          status: 'Enviado para análise',
          observacoes: `Mês do Sorteio: ${$(
            '#mesSorteio',
          ).val()}, Dias úteis: ${$('#diasUteis').val()}, Nome do Lote: ${$(
            '#nomeLote',
          ).val()}, Observações: ${$('#observacoes').val()}`,
          arquivos: pegaArquivos(),
          statusSegep: 'DocVal',
        };
        handleSOL(dadosForm, 'POST', 'dipaj');
      });
    }
    if (
      $('#tipoSolicitacao option:selected').val() ==
      'Dispensa de Sorteio - Participação em TO/CSRF (De março de 2019 até março de 2020)'
    ) {
      html = '';
      $('#divTipo').text('');
      $('#enviaArq').text('');
      arrayTurma.forEach((ops, i) => {
        html += `<option class="form-group" value="${ops}">${ops}</option>`;
      });
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
            <br />`);
      $('#enviaArq').append(`${formArq()}`);
      $('.progress').toggle();
      initDatePicker();
      initSelect();
      btnEnviaArq();
      $('.concorda').click((e) => {
        dadosForm = {
          tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
          tipoAfastamento: $('#tipoAfastamento option:selected').val(),
          horasDeducao: $('#horasDeducao').val(),
          dtInicio: $('#dataSessao').val(),
          dtFim: $('#dataSessao').val(),
          status: 'Enviado para análise',
          observacoes: `Sessões: ${$('#sessoes').val()}, Observações: ${$(
            '#observacoes',
          ).val()}`,
          arquivos: pegaArquivos(),
          statusSegep: 'DocVal',
        };
        handleSOL(dadosForm, 'POST', 'dipaj');
      });
    }
    if (
      $('#tipoSolicitacao option:selected').val() ==
      'Dispensa de Sorteio - Formalização de Voto Vencedor'
    ) {
      html = '';
      $('#divTipo').text('');
      $('#enviaArq').text('');
      arrayTurma.forEach((ops, i) => {
        html += `<option class="form-group" value="${ops}">${ops}</option>`;
      });
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
            <br/>
            `);
      $('#enviaArq').append(`${formArq()}`);
      $('.progress').toggle();
      initDatePicker();
      initSelect();
      btnEnviaArq();
      $('.concorda').click((e) => {
        dadosForm = {
          tipoSolicitacao: $('#tipoSolicitacao option:selected').val(),
          tipoAfastamento: $('#tipoAfastamento option:selected').val(),
          horasDeducao: $('#horasDeducao').val(),
          dtInicio: $('#dataSessao').val(),
          dtFim: $('#dataSessao').val(),
          status: 'Enviado para análise',
          observacoes: `Número do Processo: ${$(
            '#numeroProcesso',
          ).val()}, Número do Acórdão: ${$(
            '#numeroAcordao',
          ).val()}, Observações: ${$('#observacoes').val()}`,
          arquivos: pegaArquivos(),
          statusSegep: 'DocVal',
        };
        handleSOL(dadosForm, 'POST', 'dipaj');
      });
    }
  });
}
function pegaArquivos() {
  let a = [];
  $('.collection-item')
    .get()
    .forEach((c) => {
      a.push($(c).attr('data-id'));
    });
  return a;
}
function btnEnviaArq() {
  $('#btnEnviaArq').click((e) => {
    e.preventDefault();
    if ($('#file')[0].files[0]) {
      $('#btnEnviaArq').toggle();
      var arq = $('#file')[0].files[0];
      handleFile(arq, 'POST');
    }
  });
}
function handleSOL(registro, metodo, setor) {
  registro.setor = setor;
  registro.cpf = $('#cpfCons').text();
  registro.uniqueId = moment.now();
  registro.dtCriacao = moment().format('DD/MM/YYYY');
  registro.nome = $('.nomeSol').text();
  $.ajax({
    url: '/julgamento/conselheiros/solicitacoes',
    data: registro,
    type: metodo,
    success: function (result) {
      var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      setTimeout((a) => {
        location.reload();
      }, 1100);
    },
    error: function (result) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      console.log(result);
    },
  });
}
function formArq() {
  return `    
        <div class="file-field left ctoastsucesso input-field form-group col s11">
            <div class="btn">
                <span>Arquivo</span>
                <input type="file" name="filetoupload" id='file' accept=".pdf" onchange="" required/>
            </div>            
            <div class="file-path-wrapper">
                <input class="file-path validate" type="text"/>
            </div>           
            <div class="hidden progress">
                <div class="determinate"/>
            </div>           
        </div>    
        <div><a id="btnEnviaArq" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Enviar arquivo">
        <i class="material-icons">add</i>
      </a>  
    </div>`;
}
function montaLi(result) {
  $('.arqsUp').append(`
            <li class="collection-item" data-id='${result._id}' id='${result._id}'>
            <div>${result.nome}<a href="#!" class="aClick secondary-content">
            <i class="material-icons red-text">cancel</i>
            </a>
            </div>
            </li>`);
  $('.aClick').click((e) => {
    handleFile({ _id: result._id }, 'DELETE');
  });
}
function handleFile(arquivo, metodo) {
  let fd;
  if (metodo == 'DELETE') {
    fd = arquivo;
    $.ajax({
      url: '/julgamento/conselheiros/arquivos',
      data: fd,
      type: metodo,
      success: function (result) {
        var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        console.log(result);
        $(`#${fd._id}`).remove();
      },
      error: function (result) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        console.log(result);
      },
    });
  } else {
    fd = new FormData();
    $('#btnEnviaArq').toggle();
    $('.progress').show();
    fd.append('file', arquivo);
    $.ajax({
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener(
          'progress',
          function (evt) {
            $('.progress').show();
            if (evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total;
              $('.determinate').css(
                'width',
                Math.round(percentComplete * 100) + '%',
              );
            }
          },
          false,
        );
        return xhr;
      },
      url: '/julgamento/conselheiros/arquivos',
      data: fd,
      processData: false,
      contentType: false,
      type: metodo,
      success: function (result) {
        var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        console.log(result);
        $('.arqsUp').show();
        montaLi(result);
        $('.btnEnviaArq').toggle();
        $('.progress').hide();
        $('.file-path').val('');
      },
      error: function (result) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        console.log(result);
      },
    });
  }
}
function tabelaSolicitacoes() {
  tabledata = JSON.parse($('#tabelaSolicitacoes').attr('data-solicitacoes'));
  tableOcorrencias = new Tabulator('#tabelaSolicitacoes', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitData',
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    initialSort: [{ column: 'dtCriacao', dir: 'desc' }],
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        formatter: 'responsiveCollapse',
        width: 50,
        minWidth: 30,
        hozAlign: 'left',
        resizable: false,
        headerSort: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Data da Solicitação',
        field: 'dtCriacao',
        sorter: 'date',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
        sorterParams: { format: 'DD/MM/YYYY' },
      },
      {
        title: 'Status da Solicitação',
        field: 'status',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 0,
      },
      {
        title: 'Solicitação',
        field: 'tipoSolicitacao',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        topCalc: 'count',
        responsive: 0,
      },
      {
        title: 'Detalhes da Solicitação',
        field: 'tipoAfastamento',
        sorter: 'string',
        hozAlign: 'left',
        editor: false,
        headerFilter: 'input',
        responsive: 1,
      },
      {
        title: 'Horas a Deduzir',
        field: 'horasDeducao',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 1,
      },
      {
        title: 'Data Início',
        field: 'dtInicio',
        sorter: 'date',
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 1,
        sorterParams: { format: 'DD/MM/YYYY' },
      },
      {
        title: 'Data Fim',
        field: 'dtFim',
        sorter: 'date',
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 1,
        sorterParams: { format: 'DD/MM/YYYY' },
      },
      {
        title: 'Observações',
        field: 'observacoes',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 1,
      },
      {
        title: 'Justificativas para Rejeição',
        field: 'justificativas',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        headerFilter: 'input',
        responsive: 1,
      },
    ],
  });
}
//TABELA REGAP
function dataTable(dados) {
  let tabledata = dados;
  table = new Tabulator('#tabelaRegap', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitData',
    responsiveLayout: 'collapse',
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [
      { column: 'Dias_na_Atividade', dir: 'desc' },
      { column: 'Atividade', dir: 'desc' },
      { column: 'HE_CARF', dir: 'desc' },
    ],
    downloadConfig: {
      columnCalcs: false,
    },
    columns: [
      {
        formatter: 'responsiveCollapse',
        width: 30,
        minWidth: 30,
        hozAlign: 'left',
        resizable: false,
        headerSort: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Processo',
        field: 'Processo',
        formatter: coloreProc,
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Contribuinte',
        field: 'Contribuinte',
        formatter: coloreProc,
        headerFilter: 'input',
        sorter: 'string',
        hozAlign: 'center',
        width: 150,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Equipe Atual',
        field: 'Equipe_Atual',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Ind. Apenso',
        field: 'Ind_Apenso',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Atividade',
        field: 'Atividade',
        sorter: 'string',
        hozAlign: 'center',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Situação de Julgamento',
        field: 'Situacao',
        sorter: 'string',
        headerFilter: 'input',
        topCalc: countCalc,
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Entrada na Atividade',
        field: 'Entrada_na_Atividade',
        sorter: 'date',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Horas CARF',
        field: 'HE_CARF',
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: somaCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Dias na Atividade',
        field: 'Dias_na_Atividade',
        sorter: 'number',
        hozAlign: 'center',
        width: 140,
        topCalc: mediaCalc,
        editor: false,
        formatter: coloreDias,
        responsive: 0,
        download: true,
      },
      {
        title: 'Dias na Atividade na Próxima Sessão',
        field: 'DAAPS',
        sorter: 'number',
        width: 140,
        hozAlign: 'center',
        editor: false,
        formatter: coloreDias,
        responsive: 0,
        download: true,
      },
      {
        title: 'Valor Originário',
        field: 'Valor_Originario',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        accessorDownload: downloadValor,
        responsive: 0,
        download: true,
      },
      {
        title: 'Observações',
        field: 'Observacoes',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Prioridade',
        field: 'Prioridade',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Assunto',
        field: 'Assunto',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },

      {
        title: 'Motivo da Prioridade',
        field: 'Motivo_Prioridade',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Alegações',
        field: 'Alegacoes_CARF',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },

      {
        title: 'Dias da Sessão de Julgamento',
        field: 'Dias_da_SJ',
        sorter: 'number',
        width: 150,
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: false,
      },
      {
        title: 'Data da Sessão de Julgamento',
        field: 'Data_da_Sessao_Julgamento',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: false,
      },
      {
        title: 'Dias da Última Distribuição',
        field: 'Dias_da_Dist',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: false,
      },
      {
        title: 'Retorno Sepoj?',
        field: 'Retorno_Sepoj',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Última Equipe',
        field: 'Equipe_Ultima',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: false,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}
let formatValorDAPS = function (value, data, type, params, column) {
  let valor = calendario(value);
  return valor;
};
function formatDAPS(cell) {
  let value = calendario(cell.getValue());
  if (
    cell.getRow().getData().Atividade == 'Para Relatar' &&
    cell.getRow().getData().Situacao == 'AGUARDANDO PAUTA'
  ) {
    if (value >= 180) {
      cell.getElement().style.color = '#D8000C';
      cell.getElement().style.fontWeight = 'bolder';
    }
    if (value < 180 && value >= 140) {
      cell.getElement().style.color = 'rgb(245, 131, 0)';
      cell.getElement().style.fontWeight = 'bolder';
    }
    if (value < 140) {
      cell.getElement().style.color = 'rgb(63, 138, 2)';
      cell.getElement().style.fontWeight = 'bolder';
    }
  }

  if (
    cell.getRow().getData().Atividade == 'Formalizar Decisao' &&
    value >= 30
  ) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (cell.getRow().getData().Atividade == 'Formalizar Decisao' && value < 30) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (
    cell.getRow().getData().Atividade == 'Formalizar Voto Vencedor' &&
    value >= 30
  ) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (
    cell.getRow().getData().Atividade == 'Formalizar Voto Vencedor' &&
    value < 30
  ) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }

  if (
    cell.getRow().getData().Atividade == 'Apreciar e Assinar Documento' &&
    value >= 15
  ) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (
    cell.getRow().getData().Atividade == 'Apreciar e Assinar Documento' &&
    value < 15
  ) {
    cell.getElement().style.color = 'rgb(245, 131, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (cell.getRow().getData().Atividade == 'Corrigir Decisão' && value >= 1) {
    cell.getElement().style.color = '#D8000C';
    cell.getElement().style.fontWeight = 'bolder';
  }
  return value;
}
let downloadValorDAPS = function (value, data, type, params, column) {
  let valor = calendario(value);
  return valor;
};
function grafico(dados) {
  var layoutAtividade = {
    //title: 'Carga de Horas por atividade',
    shapes: [],
    yaxis: {
      showticklabels: true,
      tickangle: 0,
      tickfont: {
        family: 'Arial',
        size: 10,
        color: 'black',
      },
    },
    margin: {
      l: 200,
      r: 50,
      b: 50,
      t: 50,
    },
  };
  let config = { responsive: true, displaylogo: false };
  let somatorio = d3
    .nest()
    .rollup((v) => {
      return [
        {
          y: 'Para Relatar - Aguardando Pauta',
          x: d3.sum(v, (d) => {
            if (
              d.Atividade == 'Para Relatar' &&
              d.Situacao == 'AGUARDANDO PAUTA'
            ) {
              return d.HE_CARF;
            }
          }),
        },
        {
          y: 'Para Relatar - Cancelado',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Para Relatar' && d.Situacao == 'CANCELADO') {
              return d.HE_CARF;
            }
          }),
        },
        {
          y: 'Para Relatar - Retirado de Pauta',
          x: d3.sum(v, (d) => {
            if (
              d.Atividade == 'Para Relatar' &&
              d.Situacao == 'RETIRADO DE PAUTA'
            ) {
              return d.HE_CARF;
            }
          }),
        },
        {
          y: 'Para Relatar - Pedido de Vista',
          x: d3.sum(v, (d) => {
            if (
              d.Atividade == 'Para Relatar' &&
              d.Situacao == 'PEDIDO DE VISTA'
            ) {
              return d.HE_CARF;
            }
          }),
        },
        {
          y: 'Para Relatar - Indicado para Pauta',
          x: d3.sum(v, (d) => {
            if (
              d.Atividade == 'Para Relatar' &&
              d.Situacao == 'INDICADO PARA PAUTA'
            ) {
              return d.HE_CARF;
            }
          }),
        },
        {
          y: 'Para Relatar - Em Sessão',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Para Relatar' && d.Situacao == 'EM SESSÃO') {
              return d.HE_CARF;
            }
          }),
        },
        {
          y: 'Para Relatar - Em Pauta',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Para Relatar' && d.Situacao == 'EM PAUTA') {
              return d.HE_CARF;
            }
          }),
        },
        {
          y: 'Formalizar Voto Vencedor',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Formalizar Voto Vencedor') {
              return d.HE_CARF;
            }
          }),
        },
        {
          y: 'Apreciar e Assinar Documento',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Apreciar e Assinar Documento') {
              return d.HE_CARF;
            }
          }),
        },
        {
          y: 'Formalizar Decisão',
          x: d3.sum(v, (d) => {
            if (d.Atividade == 'Formalizar Decisao') {
              return d.HE_CARF;
            }
          }),
        },
        {
          y: 'Corrigir Decisão',
          x: d3.sum(v, (d) => {
            if (
              d.Atividade == 'Corrigir Decisao' ||
              d.Atividade == 'Corrigir Decisão'
            ) {
              return d.HE_CARF;
            }
          }),
        },
      ];
    })
    .entries(dados);

  let arrayDados = [];
  arrayDados.y = [];
  arrayDados.x = [];
  arrayDados.text = [];
  arrayDados.color = [];

  let cores = [
    'rgb(204, 204, 204)',
    'rgb(254, 181, 204)',
    'rgb(104,204, 204)',
    'rgb(124, 181, 204)',
    'rgb(164, 204, 204)',
    'rgb(184, 181, 204)',
    'rgb(84, 105, 119)',
    'rgb(144, 181, 204)',
    'rgb(119, 110, 84)',
    'rgb(134, 224, 234)',
    'rgb(134, 131, 224)',
  ];
  somatorio = somatorio.sort((a, b) => {
    return a.x - b.x;
  });
  somatorio.forEach((row, index) => {
    arrayDados.y.push(row.y);
    arrayDados.x.push(row.x);
    arrayDados.color.push(cores[index]);
    arrayDados.text.push(row.y);
  });
  arrayDados.type = 'bar';
  arrayDados.orientation = 'h';
  arrayDados.type = 'bar';
  arrayDados.fillcolor = 'cls';
  arrayDados.hovertemplate = `<i>Carga</i>: %{x:.d} Horas CARF<br>                         
                            <b>%{text}</b>`;
  arrayDados.marker = {
    color: arrayDados.color,
    width: 4,
    colorscale: 'Viridis',
    line: {},
  };

  Plotly.newPlot(
    document.getElementById('barrasAtividade'),
    [arrayDados],
    layoutAtividade,
    config,
  );
}
//GRÁFICO REINP
function dadosGrafico(dados) {
  let arrayMes = [];
  dados.forEach((elem) => {
    elem.detalhamento.forEach((ele) => {
      arrayMes.push(ele);
    });
  });
  return d3
    .nest()
    .rollup((v) => {
      return {
        Jan: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-01`) {
            return d.horasEfetivas;
          }
        }),
        Fev: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-02`) {
            return d.horasEfetivas;
          }
        }),
        Mar: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-03`) {
            return d.horasEfetivas;
          }
        }),
        Abr: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-04`) {
            return d.horasEfetivas;
          }
        }),
        Mai: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-05`) {
            return d.horasEfetivas;
          }
        }),
        Jun: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-06`) {
            return d.horasEfetivas;
          }
        }),
        Jul: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-07`) {
            return d.horasEfetivas;
          }
        }),
        Ago: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-08`) {
            return d.horasEfetivas;
          }
        }),
        Set: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-09`) {
            return d.horasEfetivas;
          }
        }),
        Out: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-10`) {
            return d.horasEfetivas;
          }
        }),
        Nov: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-11`) {
            return d.horasEfetivas;
          }
        }),
        Dez: d3.sum(v, (d) => {
          if (d.mes == `${new Date().getFullYear()}-12`) {
            return d.horasEfetivas;
          }
        }),
      };
    })
    .entries(arrayMes);
}
//GRÁFICO REINP DETALHADO
function dadosGrafico2(dados) {
  let T1 = 0;
  let T2 = 0;
  let T3 = 0;
  let T4 = 0;
  dados.forEach((d) => {
    if (d.trimestre == `T1${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T1 += e.horasEfetivas;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `T2${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T2 += e.horasEfetivas;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `T3${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T3 += e.horasEfetivas;
      });
    }
  });
  dados.forEach((d) => {
    if (d.trimestre == `T4${new Date().getFullYear()}`) {
      d.detalhamento.forEach((e) => {
        T4 += e.horasEfetivas;
      });
    }
  });

  return {
    T1: T1.toFixed(2),
    T2: T2.toFixed(2),
    T3: T3.toFixed(2),
    T4: T4.toFixed(2),
  };
}

function graficoReinp() {
  dados = JSON.parse($('#idProdutividade').attr('data-reinp'));
  let graf = dadosGrafico(dados);
  let graf2 = dadosGrafico2(dados);
  let cores = [
    'rgb(204, 204, 204)',
    'rgb(254, 181, 204)',
    'rgb(104,204, 204)',
    'rgb(124, 181, 204)',
    'rgb(164, 204, 204)',
    'rgb(184, 181, 204)',
    'rgb(84, 105, 119)',
    'rgb(144, 181, 204)',
    'rgb(119, 110, 84)',
    'rgb(134, 224, 234)',
    'rgb(134, 131, 224)',
    'rgba(204,204,204,1)',
    'rgba(222,45,38,0.8)',
    'rgba(204,204,204,1)',
    'rgba(204,204,204,1)',
  ];
  var layoutMes = {
    title: 'Indicações por mês',
    shapes: [
      {
        type: 'line',
        xref: 'paper',
        y0: 126.0,
        x0: 0,
        y1: 126.0,
        x1: 100,
        line: {
          color: 'rgb(229, 43, 80)',
          width: 2,
          dash: 'dot',
        },
      },
    ],
    yaxis: {
      showticklabels: true,
      tickangle: 0,
      tickfont: {
        family: 'Arial',
        size: 10,
        color: 'black',
      },
    },
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
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
          dash: 'dot',
        },
      },
    ],
    yaxis: {
      showticklabels: true,
      tickangle: 0,
      tickfont: {
        family: 'Arial',
        size: 10,
        color: 'black',
      },
    },
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
    },
    bargap: 0.05,
  };
  let config = { responsive: true, displaylogo: false };
  var trace1 = {
    x: Object.keys(graf),
    y: Object.values(graf),
    type: 'bar',
    marker: {
      color: cores,
    },
    text: Object.values(graf).map(String),
    textposition: 'auto',
    hoverinfo: 'none',
  };
  var trace2 = {
    x: ['1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre'],
    y: Object.values(graf2),
    type: 'bar',
    marker: {
      color: cores,
    },
    text: Object.values(graf2).map(String),
    textposition: 'auto',
    hoverinfo: 'none',
  };
  trace1.color = cores;
  Plotly.newPlot(
    document.getElementById('barrasReinpMensal'),
    [trace1],
    layoutMes,
    config,
  );
  Plotly.newPlot(
    document.getElementById('barrasReinpTrimestral'),
    [trace2],
    layoutTrimestre,
    config,
  );
}
