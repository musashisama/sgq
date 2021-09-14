inicializaComponentes();
function inicializaComponentes() {
  verificaAbertura();
}

function verificaAbertura() {
  let pauta = JSON.parse($('#dataPauta').attr('data-pauta'));
  if (
    moment(moment()).isBetween(
      moment(pauta.abreIndicacao, 'DD/MM/YYYY'),
      moment(pauta.fechaIndicacao, 'DD/MM/YYYY'),
      'day',
      [],
    )
  ) {
    $('#pautaAberta').html(`Pauta aberta para indicações.<br />
    Período das Indicações: ${pauta.abreIndicacao} a ${pauta.fechaIndicacao}.`);
  } else {
    $('#pautaAberta').text('Não há pauta aberta para indicações.');
    $('#linkIndicacao').remove();
  }
}
