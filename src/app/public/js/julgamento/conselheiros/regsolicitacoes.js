inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    initTabs();
    initCollapsible();
    calendario();
    controleForm();
    initDatePicker();
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

function calendario(dias) {
  let calendario = JSON.parse($('#dataCAL').attr('data-cal'));
  let datas = [];
  calendario.forEach((c) => {
    if (moment(c.start, 'DD/MM/YYYY').isSameOrAfter(moment())) {
      datas.push(moment(c.start, 'DD/MM/YYYY').diff(moment(), 'days'));
    }
  });
  $('#daps').text(Math.min(...datas));
  $('#ps').text(
    moment()
      .add(Math.min(...datas) + 1, 'days')
      .format('DD/MM/YYYY'),
  );
  return +dias + Math.min(...datas);
}

function initSelect() {
  $('select').formSelect();
}

function initTabs() {
  $('.tabs').tabs();
}

function initCollapsible() {
  $(document).ready(function () {
    $('#classesSol').collapsible();
  });
}

function initCollapsibleDisp() {
  $(document).ready(function () {
    $('#classesDisp').collapsible();
  });
}

function resetElementos() {
  $('#classesSol').off();
  $('#classesSol').fadeToggle('slow', 'linear');
  $('.progress').hide();
  $('#mostraArq').hide();
  $('#camposSol').empty();
}
function resetElementosDispensa() {
  $('#classesSol').off();
  $('#classesSol').fadeToggle('slow', 'linear');
  $('.progress').hide();
  $('#mostraArq').hide();
  $('#areaDispensa').empty();
  $('#areaBotoes').empty();
}

function initElementos() {
  initDatePicker();
  initSelect();
  initCollapsibleDisp();
  btnEnviaArq();
  $('.progress').hide();
  M.updateTextFields();
  moment.updateLocale('br', {
    workingWeekdays: [1, 2, 3, 4, 5],
  });
  $('#btn-voltar').click(() => {
    $('#camposSol').fadeOut('slow');
    resetElementos();
  });
  $('#btn-limpar').click(() => {
    $('#camposSol').fadeOut('slow');
    resetElementos();
  });
}

function arraySol(array) {
  let html = '';
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
  let arrayTurmaTO = [
    '1ª Turma CSRF',
    '2ª Turma CSRF',
    '3ª Turma CSRF',
    '1ª Turma Ordinária/2ª Câmara/ 1ª Seção',
    '1ª Turma Ordinária/3ª Câmara/ 1ª Seção',
    '2ª Turma Ordinária/3ª Câmara/ 1ª Seção',
    '1ª Turma Ordinária/4ª Câmara/ 1ª Seção',
    '2ª Turma Ordinária/4ª Câmara/ 1ª Seção',
    '1ª Turma Ordinária/2ª Câmara/ 2ª Seção',
    '2ª Turma Ordinária/2ª Câmara/ 2ª Seção',
    '1ª Turma Ordinária/3ª Câmara/ 2ª Seção',
    '1ª Turma Ordinária/4ª Câmara/ 2ª Seção',
    '2ª Turma Ordinária/4ª Câmara/ 2ª Seção',
    '1ª Turma Ordinária/2ª Câmara/ 3ª Seção',
    '1ª Turma Ordinária/3ª Câmara/ 3ª Seção',
    '2ª Turma Ordinária/3ª Câmara/ 3ª Seção',
    '1ª Turma Ordinária/4ª Câmara/ 3ª Seção',
    '2ª Turma Ordinária/4ª Câmara/ 3ª Seção',
  ];
  let arrayTurmaTex = [
    '1ª Turma Extraordinária/1ª Seção',
    '2ª Turma Extraordinária/1ª Seção',
    '3ª Turma Extraordinária/1ª Seção',
    '1ª Turma Extraordinária/2ª Seção',
    '2ª Turma Extraordinária/2ª Seção',
    '3ª Turma Extraordinária/2ª Seção',
    '1ª Turma Extraordinária/3ª Seção',
    '2ª Turma Extraordinária/3ª Seção',
    '3ª Turma Extraordinária/3ª Seção',
  ];
  let arrayFalta = [
    'Licença à gestante',
    'Licença à adotante',
    'Licença à paternidade',
    'Licença para tratamento de saúde',
    'Licença em razão de casamento',
    'Licença por motivo de falecimento (cônjuge, companheiro, pais, madastra ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos)',
    'Período de férias (marcado antes da designação para Conselheiro(a))',
    'Compromissos profissionais ou acadêmicos assumidos antes da designação para Conselheiro(a)',
  ];
  let arrayMeta = [
    'Licença à gestante',
    'Licença à adotante',
    'Licença à paternidade',
    'Licença para tratamento de saúde',
    'Licença em razão de casamento',
    'Licença por motivo de falecimento (cônjuge, companheiro, pais, madastra ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos)',
    'Período de férias (marcado perante a RFB)',
    'Participação em Seminário promovido pelo CARF',
  ];
  let arrayPrazo = [
    'Licença à gestante',
    'Licença à adotante',
    'Licença à paternidade',
    'Licença para tratamento de saúde',
    'Licença em razão de casamento',
    'Licença por motivo de falecimento (cônjuge, companheiro, pais, madastra ou padrasto, filhos, enteados, menor sob guarda ou tutela e irmãos)',
    'Participação em Seminário promovido pelo CARF',
    'Período de férias (marcado perante a RFB)',
  ];
  let arrayMudanca = [
    'Turma Extraordinária para Turma Ordinária da mesma Seção',
    'Turma Extraordinária para Turma Ordinária de Seção Diferente',
    'Turma Ordinária para Turma Ordinária da Mesma Seção',
    'Turma Ordinária para Turma Ordinária de Seção Diferente',
    'Turma Ordinária para Turma da Câmara Superior de Rcursos Fiscais',
  ];
  let arrayDispensa = [
    'Excesso de Horas em Lotes de Sorteio',
    'Formalização de Voto Vencedor',
    'Horas Recebidas em Sorteio Extraordinário',
    'Distribuição de processos reflexos ou decorrentes',
    'Participação em TO/CSRF de março de 2019 até março de 2020',
  ];

  if (array === 'turma') {
    arrayTurma.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione a Turma de Participação:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'turmaTO') {
    arrayTurmaTO.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione a Turma de Participação:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'turmaTex') {
    arrayTurmaTex.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione a Turma de Participação:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'falta') {
    arrayFalta.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione o tipo de afastamento/licença:</label>
        <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'meta') {
    arrayMeta.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione o tipo de afastamento/licença:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'prazo') {
    arrayPrazo.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione o tipo de afastamento/licença:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'mudanca') {
    arrayMudanca.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione o tipo de Mudança:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    ${html}
    </select>
    </div>
    </div>`;
    return retorno;
  }
  if (array === 'dispensa') {
    html = `<<option class="form-group" value="" selected disabled>Clique para selecionar</option>>`;
    arrayDispensa.forEach((ops, i) => {
      html += `<option class="form-group" value="${ops}">${ops}</option>`;
    });
    let retorno = `
    <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoDispensa">Selecione o tipo de Dispensa:</label>
    <select required name="tipoDispensa" id="tipoDispensa">
    ${html}
    </select>
    </div>
    <div class='col s6'>
    <div class="card hoverable cardLaranja">
              <div class="card-content ">
                <span class="card-title">Somatório de Horas da Solicitação: <span id='somatorioHoras'>0</span></span>
              </div>
            </div>
          </div>
    </div>
    </div>`;
    return retorno;
  }
}

function controleForm() {
  let botoes = `
  <div class='row valign-wrapper'>
   <div class='col s12 left-align'>
  <a id="btn-voltar" title="Voltar" class="waves-effect waves-purple hoverable z-depth-3 btn blue">
  <i class="fas fa-backspace left"/>Voltar
  </a>
  </div>
  <div class='col s12 right-align'>
  <a id="btn-limpar" title="Limpar todos os Campos" class="waves-effect waves-purple hoverable z-depth-3 btn red">
  <i class="material-icons left">cancel</i>Limpar
  </a>
  <a id="btn-enviar" title="Enviar" class="waves-effect waves-blue hoverable z-depth-3 btn green">
  <i class="material-icons left">send</i>Enviar
  </a>
  </div>
  </div>`;
  let botoesDisp = `
  <div class='row valign-wrapper'>
   <div class='col s12 left-align'>
  <a id="btn-voltar" title="Voltar" class="waves-effect waves-purple hoverable z-depth-3 btn blue">
  <i class="fas fa-backspace left"/>Voltar
  </a>
  </div>
  <div class='col s12 right-align'>
  <a id="btn-limpar" title="Limpar todos os Campos" class="waves-effect waves-purple hoverable z-depth-3 btn red">
  <i class="material-icons left">cancel</i>Limpar
  </a>
  <a id="btn-proximo" title="Proximo Passo" class="waves-effect waves-blue hoverable z-depth-3 btn green">
  <i class="material-icons left">send</i>Próximo Passo
  </a>
  </div>
  </div>`;
  let dataJulgamento = `
   <div class='row'>
  <div class="form-group dtJulgamento input field col s3">
  <input id="dtJulgamento" name="dtJulgamento"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="dtJulgamento">Data do Julgamento</label>
  </div>
  </div>
  `;
  let dataMudanca = `
   <div class='row'>
  <div class="form-group dtMudanca input field col s3">
  <input id="dtMudanca" name="dtMudanca"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="dtMudanca">Data da Mudança</label>
  </div>
  </div>
  `;
  let dataSorteio = `
   <div class='row'>
  <div class="form-group dataSorteio input field col s3">
  <input id="dataSorteio" name="dataSorteio"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="dataSorteio">Data do Sorteio</label>
  </div>
  </div>
  `;
  let dataIndicacao = `
   <div class='row'>
  <div class="form-group dataIndicacao input field col s3">
  <input id="dataIndicacao" name="dataIndicacao"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="dataIndicacao">Data da Indicação</label>
  </div>
  </div>
  `;
  let botaoAdd = `
  <div class="col s1">
  <a class="btn-floating btn-small waves-effect waves-light blue hoverable">
  <i class="material-icons addDoc tooltipped" data-position="bottom" data-tooltip="Clique aqui para incluir mais de um registro na mesma solicitação.">add</i>
  </a>
  </div>`;
  let campoPeriodo = `
  <div class='row'>
  <div class="form-group inicioAfastamento input field col s3">
  <input id="inicioAfastamento" name="inicioAfastamento"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="inicioAfastamento">Início do Afastamento</label>
  </div>
  <div class="form-group fimAfastamento input field col s3">
  <input id="fimAfastamento" name="fimAfastamento" type="text" class="datepicker"/>
  <i class="far fa-calendar-check prefix"/>
  <label for="fimAfastamento">Último dia do Afastamento</label>
  </div>
  </div>
  `;
  let campoPeriodoInterino = `
  <div class='row'>
  <div class="form-group inicioPeriodo input field col s3">
  <input id="inicioPeriodo" name="inicioPeriodo"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="inicioPeriodo">Início do Período</label>
  </div>
  <div class="form-group fimPeriodo input field col s3">
  <input id="fimPeriodo" name="fimPeriodo" type="text" class="datepicker"/>
  <i class="far fa-calendar-check prefix"/>
  <label for="fimPeriodo">Último dia do Período</label>
  </div>
  </div>
  `;
  let diasCorridos = `
  <div class="row">
  <div class ='col s5 diasCorridos'>
  <h6>Quantidade de dias: <span id='diasCorridos'/></h6>
  </div>
  </div>
  </div>
  `;
  let diasUteis = `
  <div class="row">
  <div class ='col s5 diasSessao input-field'>
  <i class=" fas fa-calendar-day prefix"/>
  <input id="diasSessao" name="diasSessao" type="number" class="validate" value=0/>
  <label for="diasSessao">Qtde de Dias de Sessão programados no período acima:</label>
  </div>
  <div class ='col s5 diasUteis'>
  <h6>Quantidade de dias úteis (excluídos os dias de sessão): <span id='diasUteis'/></h6>
  </div>
   <div class ='col s3 horasMeta'>
  Horas a serem reduzidas da meta: <span id='horasMeta'/>
  </div>
  </div>`;
  let diasProrrogacao = `
  <div class="row">
  <div class ='col s4 diasProrrogacao input-field'>
  <i class=" fas fa-calendar-day prefix"/>
  <input id="diasProrrogacao" name="diasProrrogacao" type="number" class="validate" value=0/>
  <label for="diasProrrogacao">Qtde de Dias a serem Prorrogados:</label>
  </div>
  </div>`;
  let campoObs = `
  <div class='row'>
  <div class="input-field col s12">
  <i class="material-icons prefix">mode_edit</i>
  <textarea id="observacoes" class="materialize-textarea"></textarea>
  <label for="observacoes">Observações</label>
  </div>
  </div>`;
  let campoTurno = `
  <div class='row'>
  <div class='col s4'>
  <label for="turno">Turno de Participação</label>
  <select required name="turno" id="turno">
  <option class="form-group" value="Manha">Manhã</option>
  <option class="form-group" value="Tarde">Tarde</option>
  </select>
  </div>
  </div>`;
  let msgTurno = `
  <div class='row'>
  <blockquote>
  <strong>Importante:</strong>
  Caso tenha participado de sessão de julgamento em mais de uma turma por turno, selecione <strong>apenas</strong> a primeira turma de participação.
  As solicitações deverão ser feitas individualmente para cada turno de participação, onde serão abatidas 4 horas por turno.
  </blockquote>
  </div>`;
  let turnoPart = `
   <div class='row'>
    <div class='col s6'>
    <i class="far fa-question-circle prefix"/>
    <label for="tipoAfastamento">Selecione o tipo de afastamento/licença:</label>
    <select required name="tipoAfastamento" id="tipoAfastamento">
    <option class="form-group" value="Manha">Manhã</option>
    <option class="form-group" value="Tarde">Tarde</option>
    </select>
    </div>
    </div>
    `;
  let nomeLote = `
  <div class='row'>
  <div class ='col s3 nomeLote input-field'>
  <i class="fas fa-th prefix"/>
  <input id="nomeLote" name="nomeLote" type="text" class="validate"/>
  <label for="nomeLote">Nome do Lote:</strong></label>
  </div>
  <div class ='col s3 mesSorteio input-field'>
  <i class="far fa-calendar-minus prefix"/>
  <input id="mesSorteio" name="mesSorteio" type="text" class="validate"/>
  <label for="mesSorteio">Mês do Sorteio:</strong></label>
  </div>
  <div class ='col s3 horasLote input-field'>
  <i class="far fa-hourglass prefix"/>
  <input id="horasLote" name="horasLote" type="text" class="validate"/>
  <label for="horasLote">Quantidade de Horas do Lote:</strong></label>
  </div>
  </div>`;
  let partSessoes = `
  <div class='row'>
  <div class="form-group dataSessao input field col s3 ">
  <input id="dataSessao" name="dataSessao"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-alt prefix"/>
  <label for="dataSessao">Data da Sessão de Julgamento</label>
  </div>
  <div class ='col s6 sessoes input-field'>
  <input id="sessoes" name="sessoes" type="number" class="validate"/>
  <label for="sessoes">Quantidade de sessões:</strong></label>
  </div>
  </div>`;
  let camposArq = `
  <div class="row">
  <div class="file-field left ctoastsucesso input-field form-group col s6">
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
  </div>
  </div>
  <div class="row valign-wrapper">
  <div id="mostraArq" class="col s6">
  <ul class="collection arqsUp"/>
  </div>
  <div id="enviaArq" class="col s6 valign-wrapper"/>
  </div>
  `;
  let msgCogec = `
  <div class="row">
  <blockquote>
  <strong>Importante:</strong> Os afastamentos são aplicáveis <strong>apenas</strong> para efeitos de cálculo das <strong>Metas de Produtividade</strong>. Dúvidas relativas aos <strong>efeitos financeiros</strong> devem ser tratadas diretamente com a <strong>COGEC</strong>.</blockquote>
  </div>`;
  let dtDistribuicao = `
  <div class='row'>
  <div class="form-group dtDist input field col s3">
  <input id="dtDist" name="dtDist"  type="text" class="datepicker"/>
  <i class="fas fa-calendar-check prefix"/>
  <label for="dtDist">Data da Distribuição</label>
  </div>

  `;
  let processos = `
<div class='row'>
<div class ='col s3 numProc input-field'>
<i class=" fas fa-calendar-day prefix"/>
<input id="numProc" placeholder="Nº do Processo. Somente números" name="numProc"type="text" class="validate">
<label for="numProc">Número do Processo:</label>
</div>
<div><a id="btnProc" class="btn-floating btn-small green waves-effect waves-light hoverable z-depth-3" title="Adicionar processo">
<i class="material-icons">add</i>
</a>
</div>
</div>
<div class='row'>
<div id="mostraProcessos" class="col s3">
<ul class="collection ulProcessos"/>
</div>
</div>`;
  //REGAP - Justificar Suspensão de Prazos Regimentais
  //Afastamentos e Licenças
  $('#aflp').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#aflp').text()}</h5><br/>
      ${arraySol('prazo')}
      ${campoPeriodo}
      ${diasCorridos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('body').click(() => {
        let diff = moment(
          $('#fimAfastamento').val(),
          'DD/MM/YYYY',
        ).businessDiff(moment($('#inicioAfastamento').val(), 'DD/MM/YYYY'));
        $('#diasCorridos').html(diff);
      });
    });
  });
  //Prorrogação de Voto Vencedor -  art. 45, §1º, inciso II do RICARF
  //Número de dias de prorrogação - Número dos processos
  $('#pvv').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#pvv').text()}</h5><br/>
      ${diasProrrogacao}
      ${processos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnProc').click(() => {
        montaLiProc($('#numProc').val());
        $('#numProc').val('');
      });
    });
  });
  //Prorrogação de Prazo de Processo de Imunidade
  //Suspensão de 90 dias - Número dos Processos
  $('#ppi').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#ppi').text()}</h5><br/>
      ${diasProrrogacao}
      ${processos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnProc').click(() => {
        montaLiProc($('#numProc').val());
        $('#numProc').val('');
      });
    });
  });
  //Prorrogação de Prazo autorizada pela Presidência do CARF - art. 45, §1º, inciso II, item b do RICARF
  // Número de dias de prorrogação e número dos processos - Presi ou COJUL?
  $('#ppa').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#ppa').text()}</h5><br/>
      ${diasProrrogacao}
      ${processos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnProc').click(() => {
        montaLiProc($('#numProc').val());
        $('#numProc').val('');
      });
    });
  });
  //Justificativa para deixar de praticar de ato processual (Art. 45, IV RICARF)
  $('#dpa').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#dpa').text()}</h5><br/>
      ${processos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnProc').click(() => {
        montaLiProc($('#numProc').val());
        $('#numProc').val('');
      });
    });
  });
  //Processo Objeto de Retificação de Ata
  //Data do Julgamento e Número do processo.
  $('#ora').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#ora').text()}</h5><br/>
      ${dataJulgamento}
      ${processos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('#btnProc').click(() => {
        montaLiProc($('#numProc').val());
        $('#numProc').val('');
      });
    });
  });
  //REINP - Redução de Horas da Meta de Produtividade
  //Afastamentos e Licença
  $('#aflm').click(() => {
    resetElementos();
    $('#camposSol').show('', () => {
      $('#camposSol').append(`
      <h5>${$('#aflm').text()}</h5><br/>
      ${arraySol('prazo')}
      ${campoPeriodo}
      ${diasUteis}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('body').click(() => {
        let diff = moment(
          $('#fimAfastamento').val(),
          'DD/MM/YYYY',
        ).businessDiff(moment($('#inicioAfastamento').val(), 'DD/MM/YYYY'));
        $('#diasUteis').html(diff - $('#diasSessao').val());
        $('#horasMeta').html(+$('#diasUteis').html() * 8);
      });
    });
  });
  //Mudança de Colegiado que implique em alteração do calendário da sessão de julgamento
  $('#mcc').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#mcc').text()}</h5><br/>
      ${arraySol('mudanca')}
      ${dataMudanca}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
    });
  });
  //Não cumprimento da meta por ausência de carga de processo
  $('#acp').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#acp').text()}</h5><br/>
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
    });
  });
  //Assumir interinamente Presidência de Turma por no mínimo um mês
  $('#presi').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#presi').text()}</h5><br/>
      ${arraySol('turma')}
      ${campoPeriodoInterino}
      ${diasCorridos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('body').click(() => {
        let diff = moment($('#fimPeriodo').val(), 'DD/MM/YYYY').businessDiff(
          moment($('#inicioPeriodo').val(), 'DD/MM/YYYY'),
        );
        $('#diasCorridos').html(diff);
      });
    });
  });
  //Participação em sessão TO/CSRF a partir de abril de 2020
  $('#ptoa').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#ptoa').text()}</h5><br/>
      ${arraySol('turmaTO')}
      ${dataJulgamento}
      ${campoPeriodo}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
    });
  });
  //Participação em sessão presencial ou virtual de TEX para sustentação oral
  $('#pptex').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#pptex').text()}</h5><br/>
      ${arraySol('turmaTex')}
      ${dataJulgamento}
      ${campoPeriodo}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $;
    });
  });
  //1º sorteio com prazo inferior a 21 dias da indicação
  $('#s21').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#s21').text()}</h5><br/>
      ${dataSorteio}
      ${dataIndicacao}
      ${diasCorridos}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
      $('body').click(() => {
        let diff = moment($('#dataIndicacao').val(), 'DD/MM/YYYY').businessDiff(
          moment($('#dataSorteio').val(), 'DD/MM/YYYY'),
        );
        $('#diasCorridos').html(diff);
      });
    });
  });
  //Dispensa de Sorteio
  //Excesso de Horas em Lotes de Sorteio - Nome do lote - Mes e Tamanho
  //Formalização de Voto Vencedor - Número do Processo - Número do Acórdão - HE (Se DtSessao for depois de set/2019 e antes de set/2020 - HE = 3,0. Se DtSessao for depois de set/2020 - 30% >2 e <8) - Data da Sessão
  //Horas Recebidas em Sorteio Extraordinário//Excesso de Horas em Lotes de Sorteio - Nome do lote - Mes e Tamanho
  //Distribuição de processos reflexos ou decorrentes - Numero do processo - Data da distribuição e HE
  //Participação em TO/CSRF de março de 2019 até março de 2020 - DtSessao - Turma - Turno - 4 horas por turno (Vários na mesma)
  $('#dds').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#dds').text()}</h5><br/>
      <div id='areaDispensa'>
      <div class='col s6 offset-s3'>
    <div class="card hoverable cardLaranja">
              <div class="card-content ">
                <span class="card-title">Somatório de Horas da Solicitação: <span id='somatorioHoras'>0</span></span>
              </div>
            </div>
          </div>
    </div>
      <ul id="classesDisp" class="collapsible popout col s6 m12">
            <li>
              <div class="collapsible-header">
                <i class="fas fa-hockey-puck"/>Excesso de Horas em Lotes de Sorteio
              </div>
              <div class="collapsible-body">
                 ${nomeLote}
              </div>
            </li>
            <li>
              <div class="collapsible-header">
                <i class="fas fa-feather-alt"/>Formalização de Voto Vencedor
              </div>
              <div class="collapsible-body">
                 ${processos}
              </div>
            </li>
            <li>
              <div class="collapsible-header">
                <i class="far fa-clock"/>Horas Recebidas em Sorteio Extraordinário
              </div>
              <div class="collapsible-body">
                 ${nomeLote}
              </div>
            </li>
            <li>
              <div class="collapsible-header">
                <i class="fas fa-link"/>Distribuição de processos reflexos ou decorrentes
              </div>
              <div class="collapsible-body">
                 ${processos}
                 ${dtDistribuicao}
              </div>
            </li>
            <li>
              <div class="collapsible-header">
                <i class="fas fa-retweet"/>Participação em TO/CSRF de março de 2019 até março de 2020
              </div>
              <div class="collapsible-body">
                 ${dataJulgamento}
                 ${turnoPart}
                 ${msgTurno}
              </div>
            </li>
            </ul>
            </div>
      <div id='areaSolicitacoes'/>

            <div id='areaBotoes'/>
      `);
      $('#areaBotoes').append(`
          ${campoObs}
          ${camposArq}
          ${botoes}
          `);
      initElementos();
      $('#btnProc').click(() => {
        montaLiProc($('#numProc').val());
        $('#numProc').val('');
      });
    });
  });
  //Outras solicitações
  //Justificar faltas à sessões de julgamento - arrayFalta - período do afastamento
  $('#fsj').click(() => {
    resetElementos();
    $('#camposSol').fadeIn('slow', () => {
      $('#camposSol').append(`
      <h5>${$('#fsj').text()}</h5><br/>
      ${arraySol('falta')}
      ${campoPeriodo}
      ${campoObs}
      ${camposArq}
      ${botoes}
      `);
      initElementos();
    });
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
  $('#btnEnviaArq').off();
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
function montaLiProc(processo) {
  $('.ulProcessos').append(`
            <li class="collection-item" id='${processo}'>
            <div>${processo}<a href="#!" class="removeProc${processo} secondary-content">
            <i class="material-icons red-text">cancel</i>
            </a>
            </div>
            </li>`);
  $(`.removeProc${processo}`).click((e) => {
    $(`#${processo}`).remove();
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
        $('#mostraArq').show();
        montaLi(result);
        $('.btnEnviaArq').toggle();
        $('.progress').fadeOut();
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
