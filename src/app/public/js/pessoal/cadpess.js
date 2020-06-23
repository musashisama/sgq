inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initDatePicker();
    initBotoes();

    btnSalva();
    initSelect();
    initModal();
    btnModal();
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

function btnSalva() {
  $('.btn-cons-salva').click(function (event) {
    event.preventDefault();
    if ($('#cpf').val() == '' || !validarCPF($('#cpf').val())) {
      $('#cpf').append(
        M.toast({
          html: 'Favor preencher o CPF corretamente. Use somente números.',
          classes: 'rounded',
          displayLength: 2000,
        }),
      );
      $('#cpf > .input#titulo.form-control.tooltiped').css(
        'border-bottom',
        '1px solid red',
      );
      $('#cpf').focus();
      return false;
    } else {
      url = $('#formCadPess').attr('action');
      valores = $('#formCadPess').serializeArray();
      console.log($('#formCadPess').serializeArray());
      $.post(url, valores)
        .done((dados) => {
          if (dados.id == 0) {
            var toastHTML = `<span>${dados.msg}</span>`;
            M.toast({
              html: toastHTML,
              classes: 'rounded',
              timeRemaining: 500,
            });
          } else {
            var toastHTML = '<span>Registro atualizado com sucesso!</span>';
            M.toast({
              html: toastHTML,
              classes: 'rounded',
              timeRemaining: 500,
            });
            setTimeout(location.reload(true), 5000);
          }
        })
        .fail(function (err) {
          var toastHTML = `<span>Ocorreu um erro.</span>`;
          M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
        })
        .always();
    }
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

function initBotoes() {
  $('.fixed-action-btn').floatingActionButton({
    direction: 'left',
    hoverEnabled: false,
  });
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  )
    return false;
  // Valida 1o digito
  add = 0;
  for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
  return true;
}
