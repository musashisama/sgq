let colegiados = new Set();
let tableMinMax = '';
inicializaComponentes();
initialSort = [{ column: 'HE', dir: 'desc' }];
function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    initTabs();
    elementosTabela();
    getRelatorios();
  });
}

function initTabs() {
  $('.tabs').tabs();
}

function getRelatorios() {
  $.ajax({
    url: `/julgamento/restrito/regap_consolidado/`,
    type: 'POST',
    data: {
      get: 'listagem',
    },
    beforeSend: function () {
      $('.progressEstoque').toggle();
    },
  })
    .done(function (msg) {
      msg.reverse().forEach((m) => {
        $('#dataRelEstoque').append(
          $('<option>', {
            value: m,
            text: moment.unix(m).format('DD/MM/YYYY'),
          }),
        );
        $('#dataRelEstoque').formSelect();
      });
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}

function elementosTabela() {
  document
    .getElementById('mostraColunasTurma')
    .addEventListener('click', function () {
      if (agrupadoT == false) {
        table.setGroupBy(['equipe']);
        agrupadoT = true;
      } else {
        table.setGroupBy();
        agrupadoT = false;
      }
    });
  $('#consultaEstoque').click((e) => {
    $('#tabelaEstoque').empty();

    selectRelatorios();
  });
}

function selectRelatorios() {
  $.ajax({
    url: `/julgamento/restrito/estoque_conselheiros/`,
    type: 'POST',
    data: {
      get: 'relatorio',
      dtRel: $('#dataRelEstoque option:selected').val(),
      semana: $('#semanaRelEstoque option:selected').val(),
    },
    beforeSend: function () {
      $('.progressEstoque').toggle();
    },
  })
    .done(function (msg) {
      $('.progressEstoque').toggle();
      $('.classProcessos').show();
      let parcial = [];
      msg.forEach((m) => {
        m.relatorio.forEach((r) => {
          if (m.conselheiro.equipe == '3ª CÂMARA-3ªSEÇÃO-CARF-MF-DF') {
            m.conselheiro.equipe = '3ª TURMA-CSRF-CARF-MF-DF';
          }
          if (m.conselheiro.equipe == '4ª CÂMARA-2ªSEÇÃO-CARF-MF-DF') {
            m.conselheiro.equipe = '2ª TURMA-CSRF-CARF-MF-DF';
          }
          if (
            !r.obs.includes('.REP.') &&
            r.atividade == 'Para Relatar' &&
            r.situacao == 'AGUARDANDO PAUTA'
          ) {
            parcial.push({
              cpf: m.conselheiro.cpf,
              nome: m.conselheiro.nome,
              equipe: m.conselheiro.equipe,
              semana: m.conselheiro.semana,
              HE: r.HE,
              valorOrig: r.valorOrig ? r.valorOrig : 0,
            });
          }
        });
      });
      let dados = d3
        .nest()
        .key((d) => {
          return d.cpf;
        })
        .sortKeys(d3.ascending)
        .rollup((v) => {
          return {
            HE: d3.sum(v, function (d) {
              return d.HE;
            }),
            Valor: d3.sum(v, function (d) {
              return d.valorOrig;
            }),
            qtdeProc: v.length,
          };
        })
        .entries(parcial);
      dados.forEach((dado) => {
        parcial.forEach((p) => {
          if (dado.key == p.cpf) {
            dado.cpf = dado.key;
            dado.nome = p.nome;
            dado.equipe = p.equipe;
            dado.semana = p.semana;
            dado.HE = +dado.values.HE.toFixed(2);
            dado.Valor = +dado.values.Valor.toFixed(2);
            dado.qtdeProc = dado.values.qtdeProc;
            dado.antecipado = loteAntecipado(+dado.values.HE);
            dado.sorteioNormal = sorteioNormal(+dado.values.HE);
            delete dado.key;
            delete dado.values;
          }
        });
      });

      dataTable(dados);
      initElementos();
      montaGraficos(msg);
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      console.log(msg);
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}

function loteAntecipado(HE) {
  if (HE < 100) {
    return true;
  }
  if (HE <= 135 && HE > 100) {
    return true;
  }
  if (HE >= 135) {
    return false;
  }
}

function sorteioNormal(HE) {
  if (HE < 100) {
    return '2 lotes';
  }
  if (HE <= 135 && HE > 100) {
    return '1 lote';
  }
  if (HE >= 135) {
    return 'Sorteio Normal';
  }
}

function initSelect() {
  $('select').formSelect();
}

function dataTable(msg) {
  let tabledata = msg;
  table = new Tabulator('#tabelaEstoque', {
    data: tabledata,
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: 'fitDataFill',
    responsiveLayout: 'collapse',
    downloadConfig: {
      columnCalcs: false,
    },
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [{ column: 'HE', dir: 'asc' }],
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
        title: 'CPF',
        field: 'cpf',
        sorter: 'number',
        formatter: formatNome,
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Responsável',
        field: 'nome',
        sorter: 'string',
        width: 200,
        formatter: formatNome,
        hozAlign: 'left',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Semana',
        field: 'semana',
        sorter: 'string',
        formatter: formatSemana,
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Equipe',
        field: 'equipe',
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Quantidade',
        field: 'qtdeProc',
        topCalc: somaCalc,
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Carga em horas',
        field: 'HE',
        sorter: 'number',
        topCalc: somaCalc,
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: '',
        field: 'HE',
        sorter: 'number',
        hozAlign: 'center',
        width: 40,
        formatter: 'traffic',
        formatterParams: {
          min: 0,
          max: 1000,
          color: function (value) {
            if (value <= 126) return 'red';
            if (value > 126 && value <= 252) return 'orange';
            if (value > 252) return 'green';
          },
        },
        download: false,
      },
      {
        title: 'Lote antecipado?',
        field: 'antecipado',
        sorter: 'boolean',
        hozAlign: 'center',
        editor: false,
        formatter: 'tickCross',
        responsive: 0,
        download: true,
        headerTooltip: 'Lote antecipado em sorteio Jan/2021',
      },
      {
        title: 'Sorteio',
        field: 'sorteioNormal',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        download: true,
        headerTooltip: 'Sorteio Ordinário',
      },
      {
        title: 'DIPRO',
        field: 'dipro',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 0,
        visible: false,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

let formatSemana = function formatSemana(cell) {
  const valor = cell.getValue();
  if (valor == 'Verde') {
    cell.getElement().style.color = 'rgb(0,200, 0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (valor == 'Amarela') {
    cell.getElement().style.color = 'rgb(255,211,0)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  if (valor == 'Azul') {
    cell.getElement().style.color = 'rgb(0,0,200)';
    cell.getElement().style.fontWeight = 'bolder';
  }
  return valor;
};

function preparaDadosGrafico(dados, min = 0, max = 1000000000000) {
  let dadosGrafico = [];
  let relatorio = dados;
  relatorio.forEach((e) => {
    colegiados.add(e.conselheiro.equipe);
  });
  Array.from(colegiados)
    .sort()
    .forEach((c) => {
      dadosGrafico.push({
        colegiado: c,
        detalhamento: [],
        qtdeProc: 0,
        totalHE: 0,
      });
    });
  relatorio.forEach((r) => {
    dadosGrafico.forEach((d) => {
      if (r.conselheiro.equipe == d.colegiado) {
        r.relatorio.forEach((e) => {
          if (
            e.atividade == 'Para Relatar' &&
            e.situacao == 'AGUARDANDO PAUTA' &&
            e.valorOrig >= min &&
            e.valorOrig <= max
          ) {
            d.detalhamento.push({
              processo: e.processo,
              HE: e.HE,
              atividade: e.atividade,
              situacao: e.situacao,
              valor: e.valorOrig,
            });
            d.grupo = montaGrupo(r.conselheiro.equipe);
            d.qtdeProc = d.detalhamento.length;
            d.totalHE += e.HE;
          }
        });

        //f
        d.detalhamento = d.detalhamento.flat();
      }
    });
  });

  return dadosGrafico;
}

function montaGrupo(equipe) {
  if (equipe.includes('TURMA')) {
    return 'CSRF';
  }
  if (equipe.includes('1ªSEÇÃO')) {
    return '1ª Seção';
  }
  if (equipe.includes('2ªSEÇÃO')) {
    return '2ª Seção';
  }
  if (equipe.includes('3ªSEÇÃO')) {
    return '3ª Seção';
  }
}

function calculaDadosGrafico(min, max, dados) {
  dados.forEach((d) => {
    d.detalhamento.forEach((e) => {
      console.log(e);
    });
  });
}

function montaGraficos(msg) {
  let agrupadoS = true;
  document.getElementById('agrupaSecao').addEventListener('click', function () {
    if (agrupadoS == false) {
      tableMinMax.setGroupBy(['grupo']);
      agrupadoS = true;
      // console.log(agrupadoS);
    } else {
      tableMinMax.setGroupBy();
      agrupadoS = false;
      //console.log(agrupadoS);
    }
  });
  $('#minimo').val(12), $('#maximo').val(15);
  M.updateTextFields();
  $('#btnFiltro').click((e) => {
    let dados = preparaDadosGrafico(
      msg,
      $('#minimo').val() * 1000000,
      $('#maximo').val() * 1000000,
    );
    dataTableMinMax(dados);
  });

  //console.log(dados);
  // var layoutAtividade = {
  //   title: 'Processos por atividade',
  //   shapes: [],
  //   yaxis: {
  //     showticklabels: true,
  //     tickangle: 0,
  //     tickfont: {
  //       family: 'Arial',
  //       size: 10,
  //       color: 'black',
  //     },
  //   },
  //   margin: {
  //     l: 200,
  //     r: 30,
  //     b: 50,
  //     t: 100,
  //   },
  // };
  // let config = { responsive: true, displaylogo: false };

  // let somatorio = d3
  //   .nest()
  //   .rollup((v) => {
  //     return [
  //       {
  //         y: 'Para Relatar - Aguardando Pauta',
  //         x: d3.sum(v, (d) => {
  //           if (
  //             d.Atividade == 'Para Relatar' &&
  //             d.Situacao == 'AGUARDANDO PAUTA'
  //           ) {
  //             return 1;
  //           }
  //         }),
  //       },
  //       {
  //         y: 'Para Relatar - Cancelado',
  //         x: d3.sum(v, (d) => {
  //           if (d.Atividade == 'Para Relatar' && d.Situacao == 'CANCELADO') {
  //             return 1;
  //           }
  //         }),
  //       },
  //       {
  //         y: 'Para Relatar - Retirado de Pauta',
  //         x: d3.sum(v, (d) => {
  //           if (
  //             d.Atividade == 'Para Relatar' &&
  //             d.Situacao == 'RETIRADO DE PAUTA'
  //           ) {
  //             return 1;
  //           }
  //         }),
  //       },
  //       {
  //         y: 'Para Relatar - Pedido de Vista',
  //         x: d3.sum(v, (d) => {
  //           if (
  //             d.Atividade == 'Para Relatar' &&
  //             d.Situacao == 'PEDIDO DE VISTA'
  //           ) {
  //             return 1;
  //           }
  //         }),
  //       },
  //       {
  //         y: 'Para Relatar - Indicado para Pauta',
  //         x: d3.sum(v, (d) => {
  //           if (
  //             d.Atividade == 'Para Relatar' &&
  //             d.Situacao == 'INDICADO PARA PAUTA'
  //           ) {
  //             return 1;
  //           }
  //         }),
  //       },
  //       {
  //         y: 'Para Relatar - Em Sessão',
  //         x: d3.sum(v, (d) => {
  //           if (d.Atividade == 'Para Relatar' && d.Situacao == 'EM SESSÃO') {
  //             return 1;
  //           }
  //         }),
  //       },
  //       {
  //         y: 'Para Relatar - Em Pauta',
  //         x: d3.sum(v, (d) => {
  //           if (d.Atividade == 'Para Relatar' && d.Situacao == 'EM PAUTA') {
  //             return 1;
  //           }
  //         }),
  //       },
  //       {
  //         y: 'Formalizar Voto Vencedor',
  //         x: d3.sum(v, (d) => {
  //           if (d.Atividade == 'Formalizar Voto Vencedor') {
  //             return 1;
  //           }
  //         }),
  //       },
  //       {
  //         y: 'Apreciar e Assinar Documento',
  //         x: d3.sum(v, (d) => {
  //           if (d.Atividade == 'Apreciar e Assinar Documento') {
  //             return 1;
  //           }
  //         }),
  //       },
  //       {
  //         y: 'Formalizar Decisão',
  //         x: d3.sum(v, (d) => {
  //           if (d.Atividade == 'Formalizar Decisao') {
  //             return 1;
  //           }
  //         }),
  //       },
  //       {
  //         y: 'Corrigir Decisão',
  //         x: d3.sum(v, (d) => {
  //           if (
  //             d.Atividade == 'Corrigir Decisao' ||
  //             d.Atividade == 'Corrigir Decisão'
  //           ) {
  //             return 1;
  //           }
  //         }),
  //       },
  //     ];
  //   })
  //   .entries(dados);

  // let arrayDados = [];
  // arrayDados.y = [];
  // arrayDados.x = [];
  // arrayDados.text = [];
  // arrayDados.color = [];

  // let cores = [
  //   'rgb(204, 204, 204)',
  //   'rgb(254, 181, 204)',
  //   'rgb(104,204, 204)',
  //   'rgb(124, 181, 204)',
  //   'rgb(164, 204, 204)',
  //   'rgb(184, 181, 204)',
  //   'rgb(84, 105, 119)',
  //   'rgb(144, 181, 204)',
  //   'rgb(119, 110, 84)',
  //   'rgb(134, 224, 234)',
  //   'rgb(134, 131, 224)',
  // ];
  // somatorio = somatorio.sort((a, b) => {
  //   return a.x - b.x;
  // });
  // somatorio.forEach((row, index) => {
  //   arrayDados.y.push(row.y);
  //   arrayDados.x.push(row.x);
  //   arrayDados.color.push(cores[index]);
  //   arrayDados.text.push(row.y);
  // });
  // arrayDados.type = 'bar';
  // arrayDados.orientation = 'h';
  // arrayDados.type = 'bar';
  // arrayDados.fillcolor = 'cls';
  // arrayDados.hovertemplate = `<i>Quantidade</i>: %{x:.d} processos<br>
  //                       <b>%{text}</b>`;
  // arrayDados.marker = {
  //   color: arrayDados.color,
  //   width: 4,
  //   colorscale: 'Viridis',
  //   line: {},
  // };
  // Plotly.newPlot(
  //   document.getElementById('barrasAtividade'),
  //   [arrayDados],
  //   layoutAtividade,
  //   config,
  // );
}

function dataTableMinMax(msg) {
  let tabledataMinMax = msg;
  tableMinMax = new Tabulator('#tabelaFaixaValor', {
    data: tabledataMinMax,
    // pagination: 'local', //enable local pagination.
    // paginationSize: 15,
    // cellVertAlign: 'middle',
    // cellHozAlign: 'center',
    minHeight: '300px',
    maxHeight: '1000px',
    height: '900px',
    layout: 'fitDataFill',
    paginationInitialPage: 1,
    groupBy: 'grupo',
    //responsiveLayout: 'collapse',
    initialSort: [{ column: 'totalHE', dir: 'desc' }],
    downloadConfig: {
      columnCalcs: false,
    },
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    columns: [
      {
        title: 'Colegiado',
        field: 'colegiado',
        width: 500,
        sorter: 'string',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        download: true,
      },
      {
        title: 'Qtde de Processos',
        field: 'qtdeProc',
        sorter: 'number',
        width: 100,
        topCalc: somaCalc,
        headerFilter: 'input',
        editor: false,
        download: true,
      },
      {
        title: 'Total HE',
        field: 'totalHE',
        width: 100,
        sorter: 'number',
        topCalc: somaCalc,
        formatter: (cell) => {
          return cell.getValue().toFixed(2);
        },
        headerFilter: 'input',
        editor: false,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}
