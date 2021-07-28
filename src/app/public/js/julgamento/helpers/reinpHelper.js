function getRelatorios(tipo, callback) {
  $.ajax({
    url: `/julgamento/restrito/reinp/`,
    type: 'POST',
    data: {
      get: 'listagem',
    },
    beforeSend: function () {
      $('.progressReinp').toggle();
    },
  })
    .done(function (msg) {
      msg.forEach((m) => {
        $('#anosReinp').append(`
        <div class="col s12 m2">
            <div class="card hoverable cardAzul">
              <div class="card-content">
                <span class="card-title center"><a href='' id='reinp${m}' class='white-text'>${m}</a></span>
              </div>
            </div>
       `);
        callback(m);
        $(`#reinp${m}`).click((e) => {
          e.preventDefault();
          tipo ? selectRelatorios(m, tipo) : selectRelatorios(m);
        });
      });
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}

function testeCallback(valor) {
  console.log('Chamou callbak: ' + valor);
}

function selectRelatorios(ano, tipo) {
  $.ajax({
    url: `/julgamento/restrito/reinp/`,
    type: 'POST',
    data: {
      get: 'relatorio',
      ano: ano,
      tipo: tipo,
    },
    beforeSend: function () {
      $('#tabelaReinp').val('');
      $('.progressReinp').toggle();
    },
  })
    .done(function (msg) {
      montaReinp(msg);
      $('.progressReinp').toggle();
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}

function montaReinp(msg) {
  document
    .getElementById('mostraColunas')
    .addEventListener('click', function () {
      if (agrupadoT == false) {
        table.setGroupBy(['unidade']);
        agrupadoT = true;
      } else {
        table.setGroupBy();
        agrupadoT = false;
      }
    });
  let dadosTabela = [];
  msg.forEach((e) => {
    dadosTabela.push({
      ano: e.ano,
      nome: e.nome,
      cpf: e.cpf,
      unidade: e.unidade,
      T1: somaTrimestre('1', e),
      T2: somaTrimestre('2', e),
      T3: somaTrimestre('3', e),
      T4: somaTrimestre('4', e),
    });
  });
  dataTable(dadosTabela);
  dadosGrafico(msg);
}

function somaMes(mes, processos) {
  let soma = 0;
  processos.detalhamento.forEach((p) => {
    if (p.mes == mes) {
      if (p.horasEfetivas == 7.8) {
        p.horasEfetivas = 8;
      }
      soma += p.horasEfetivas;
    }
  });
  return +soma.toFixed(2);
}

function somaTrimestre(trimestre, processos) {
  let soma = 0;
  processos.detalhamento.forEach((p) => {
    if (p.trimestre == trimestre) {
      if (p.horasEfetivas == 7.8) {
        p.horasEfetivas = 8;
      }
      soma += p.horasEfetivas;
    }
  });
  return +soma.toFixed(2);
}

let formatNome = function formatNome(cell) {
  return `<a href='/julgamento/restrito/reinp/detalha/${
    cell.getRow().getData().cpf + '&' + cell.getRow().getData().ano
  }'>${cell.getValue()}</a>`;
};

let formatMes = function formatNome(cell) {
  return `${cell.getValue()}`;
};
let formatTrimestre = function formatNome(cell) {
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

function mediaCalc(values, data, calcParams) {
  var calc = 0;
  let valor = 0;
  values.forEach(function (value) {
    if (value > 0) {
      valor += +value;
      calc++;
    }
  });

  return `𝛍: ${valor / calc}`;
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

  return `𝚺: ${(+valor).toLocaleString()}`;
}

function countCalc(values, data, calcParams) {
  var calc = 0;
  let valor = 0;
  values.forEach(function (value) {
    if (value) {
      valor += value;
      calc++;
    }
  });

  return `|𝜲|: ${calc}`;
}
