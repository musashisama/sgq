let anoEscolhido;
let dadosPlot;
function getRelatorios(tipo, callback) {
  $.ajax({
    url: `/presidente/restrito/reinp/`,
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
          anoEscolhido = m;
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
  //console.log('Chamou callbak: ' + valor);
}

function selectRelatorios(ano, tipo) {
  $.ajax({
    url: `/presidente/restrito/reinp/`,
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
  let cpfs = new Set();
  msg.forEach((m) => {
    cpfs.add(m.cpf);
  });
  let relatorio = [];
  cpfs.forEach((c) => {
    relatorio.push({ cpf: c });
  });
  relatorio.forEach((r) => {
    msg.forEach((m) => {
      if (r.cpf == m.cpf) {
        r.nome = m.nome;
        r.unidade = m.unidade;
        r.processos = [];
      }
    });
  });
  msg.forEach((m) => {
    relatorio.forEach((r) => {
      if (r.cpf == m.cpf) {
        r.processos.push({
          processo: m.processo,
          contribuinte: m.contribuinte,
          tipo: m.tipo,
          mes: m.mes,
          trimestre: m.trimestre,
          ano: m.ano,
          he: m.he,
          retorno: m.retorno,
          obs: m.obs,
        });
      }
    });
  });
  //console.log(relatorio);
  relatorio.forEach((e) => {
    dadosTabela.push({
      ano: anoEscolhido,
      nome: e.nome,
      cpf: e.cpf,
      unidade: e.unidade,
      T1: somaTrimestre('1', e.processos),
      T2: somaTrimestre('2', e.processos),
      T3: somaTrimestre('3', e.processos),
      T4: somaTrimestre('4', e.processos),
    });
  });
  dataTable(dadosTabela);
}

function somaMes(mes, processos) {
  let soma = 0;
  processos.forEach((p) => {
    if (p.mes == mes && p.retorno == 'NÃO') {
      if (p.he == 7.8) {
        p.he = 8;
      }
      soma += p.he;
    }
  });
  return +soma.toFixed(2);
}

function somaTrimestre(trimestre, processos) {
  let soma = 0;
  processos.forEach((p) => {
    if (p.trimestre == trimestre && p.retorno == 'NÃO') {
      if (p.he == 7.8) {
        p.he = 8;
      }
      soma += p.he;
    }
  });
  return +soma.toFixed(2);
}

let formatNome = function formatNome(cell) {
  return `<a href='/presidente/restrito/reinp/detalha/${
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
