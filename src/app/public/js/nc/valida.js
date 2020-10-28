function validaForm() {
  if (document.formNC.cpfUser.value == '' || !validarCPF($('.cpfuser').val())) {
    $('.cpfUser').append(
      M.toast({
        html: 'Favor preencher seu CPF corretamente. Use somente números.',
        classes: 'rounded',
        displayLength: 2000,
      }),
    );
    $('.cpfUser > .input#titulo.form-control.tooltiped').css(
      'border-bottom',
      '1px solid red',
    );
    document.formNC.cpfUser.focus();
    return false;
  }
  if (document.formNC.mProcUser.value == '') {
    $('.mpProcUser').append(
      M.toast({
        html: 'Favor selecionar o seu macroprocesso.',
        classes: 'rounded',
        displayLength: 2000,
      }),
    );
    $('.mpProcUser > .select-wrapper input.select-dropdown').css(
      'border-bottom',
      '1px solid red',
    );
    document.formNC.mpProcUser.focus();
    return false;
  }
  if (document.formNC.mProcOrigem.value == '') {
    $('.mProcOrigem').append(
      M.toast({
        html: 'Favor selecionar o macroprocesso de origem.',
        classes: 'rounded',
        displayLength: 2000,
      }),
    );
    $('.mProcOrigem > .select-wrapper input.select-dropdown').css(
      'border-bottom',
      '1px solid red',
    );
    document.formNC.mProcOrigem.focus();
    return false;
  }
  if (document.formNC.equipeNC.value == '') {
    $('.equipeNC').append(
      M.toast({
        html: 'Favor selecionar a unidade onde ocorreu a não conformidade.',
        classes: 'rounded',
        displayLength: 2000,
      }),
    );
    $('.equipeNC > .select-wrapper input.select-dropdown').css(
      'border-bottom',
      '1px solid red',
    );
    document.formNC.equipeNC.focus();
    return false;
  }
  if (document.formNC.descNC.value == '') {
    $('.descNC').append(
      M.toast({
        html: 'Favor selecionar a não conformidade.',
        classes: 'rounded',
        displayLength: 2000,
      }),
    );
    $('.descNC > .select-wrapper input.select-dropdown').css(
      'border-bottom',
      '1px solid red',
    );
    document.formNC.descNC.focus();
    return false;
  }
  if (document.formNC.dataNC.value == '') {
    $('.dataNC').append(
      M.toast({
        html: 'Favor selecionar a data de ocorrência da não conformidade.',
        classes: 'rounded',
        displayLength: 2000,
      }),
    );
    $('.lbdataNC').css('color', 'red');
    return false;
  }
  if (document.formNC.EncCorNC.value == '') {
    $('.EncCorNC').append(
      M.toast({
        html:
          'Favor selecionar data em que a não conformidade foi corrigida ou encaminhada para correção.',
        classes: 'rounded',
        displayLength: 2000,
      }),
    );
    $('.lbEncCorNC').css('color', 'red');
    return false;
  }
  return true;
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
