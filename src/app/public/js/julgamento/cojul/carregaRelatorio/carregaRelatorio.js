inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    toggleRegapRadio();
    toggleReinpRadio();
    $('.soregap').hide();
    $('.soreinp').hide();
    $('.progress').hide();
    initDatePicker();
    initBtnSubmit();
  });
}

let regex = new RegExp('(.*?).(csv|json)$');
function triggerValidation(el) {
  if (el.value != '')
    if (!regex.test(el.value.toLowerCase())) {
      el.value = '';
    }
}
function initBtnSubmit() {
  $('#btnEnviaRel').click(() => {
    $('#btnEnviaRel').toggle();
    $('#statusRelatorio').text('Recebendo Relatorio');
    let files = $('#file')[0].files[0];
    let reader = new FileReader();
    reader.onload = function (event) {
      let relatorioFiltrado = [];
      let relatorio = d3.csvParse(event.target.result);
      relatorio.forEach((r) => {
        if (
          r['Nome_Atividade_Atual_11'] == 'Para Relatar' ||
          r['Nome_Atividade_Atual_11'] == 'Formalizar Voto Vencedor' ||
          r['Nome_Atividade_Atual_11'] == 'Formalizar Decisao' ||
          r['Nome_Atividade_Atual_11'] == 'Apreciar e Assinar Documento' ||
          r['Nome_Atividade_Atual_11'] == 'Corrigir Decisão' ||
          r['Nome_Atividade_Atual_11'] == 'Corrigir Decisao'
        ) {
          relatorioFiltrado.push(r);
        }
      });

      let dadosRel = {
        dataExt: $('#dataExt').val(),
        tipoRel: $('#novoREGAP').val(),
        processado: true,
        relatorio: relatorioFiltrado,
      };
      $.ajax({
        xhr: function () {
          var xhr = new window.XMLHttpRequest();
          xhr.upload.addEventListener(
            'progress',
            function (evt) {
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
        type: 'POST',
        url: '/julgamento/restrito/carrega-relatorio',
        data: JSON.stringify(dadosRel),
        //processData: false,
        contentType: 'application/json',
        beforeSend: function () {
          // setting a timeout
          $('#statusRelatorio').text(
            'Enviando Relatório. Aguarde redirecionamento.',
          );
          $('#preLoader').append(`
              <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
          `);
        },
        success: (dados) => {
          var toastHTML = `<p>Relatório enviado com sucesso! Redirecionando, aguarde por favor.</p>
            ${JSON.stringify(dados.result)}`;
          $('#overlay').remove();
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
          console.log(dados.result);
          $('.concorda').toggle();
          setTimeout(function () {
            location.href = `/julgamento/restrito/portalcojul`;
          }, 1500);
        },
        fail: function (err) {
          var toastHTML = `<span>Ocorreu um erro.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        },
      });
    };
    reader.onerror = function (event) {
      console.error(
        'Não foi possível ler o arquivo! Código: ' + event.target.error.code,
      );
    };

    reader.readAsText(files, 'latin1');
  });
  // var formularioCSV = $('#formCSV');
  // formularioCSV.on('submit', function (event) {
  //   event.preventDefault();
  //   var fd = new FormData(formCSV);
  //   var files = $('#file')[0].files[0];
  //   $('.concorda').toggle();
  //   $('.progress').show();
  //   fd.append('file', files);
  //   $.ajax({
  //     xhr: function () {
  //       var xhr = new window.XMLHttpRequest();
  //       xhr.upload.addEventListener(
  //         'progress',
  //         function (evt) {
  //           if (evt.lengthComputable) {
  //             var percentComplete = evt.loaded / evt.total;
  //             $('.determinate').css(
  //               'width',
  //               Math.round(percentComplete * 100) + '%',
  //             );
  //           }
  //         },
  //         false,
  //       );
  //       return xhr;
  //     },
  //     type: 'POST',
  //     url: $('#formCSV').attr('action'),
  //     data: fd,
  //     processData: false,
  //     contentType: false,
  //     success: (dados) => {
  //       var toastHTML = `<p>Relatório enviado com sucesso! Redirecionando, aguarde por favor.</p>
  //         ${JSON.stringify(dados.result)}`;
  //       $('#overlay').remove();
  //       M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
  //       console.log(dados.result);
  //       $('.concorda').toggle();
  //       setTimeout(function () {
  //         location.href = `/julgamento/restrito/portalcojul`;
  //       }, 1500);
  //     },
  //     fail: function (err) {
  //       var toastHTML = `<span>Ocorreu um erro.</span>`;
  //       M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
  //     },
  //   });
  // });
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
function toggleReinpRadio() {
  $("input[name='tipoRel']").change(function () {
    if (this.value == 'REINP') {
      $('.soreinp').toggle('slow');
    } else {
      $('.soreinp').hide('slow');
    }
  });
}
function initDatePicker() {
  $('.datepicker').click(function (event) {
    event.preventDefault();
    $('.lbdataNC').css('color', '#9e9e9e');
    $('.lbEncCorNC').css('color', '#9e9e9e');
  });
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
  $('#dataExt').val(moment().format('DD/MM/YYYY'));
  M.updateTextFields();
}
