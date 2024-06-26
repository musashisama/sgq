let colegiados = new Set();
let grupoApes, ativRegap;
AtivApes = false;
let tableMinMax = '';
let tableApes = '';
inicializaComponentes();
initialSort = [{ column: 'nome', dir: 'asc' }];
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

function returnApes(data) {
  return data.apes == true;
}

function elementosTabela() {
  $('#listaProcApes').click((e) => {
    e.preventDefault();
    getApes('cojul', dataTableApes);
  });
  $(`#apes749Check`).change(() => {
    if ($(`#apes749Check`).prop('checked')) {
      table.addFilter(returnApes);
    } else {
      table.removeFilter(returnApes);
    }
  });
  $('.Atividade').change(() => {
    table.setFilter('Atividade', '=', $('select option:selected').val());
    if ($('select option:selected').val() == 'Todas') {
      table.removeFilter('Atividade', '=', $('select option:selected').val());
    } else {
      table.setFilter('Atividade', '=', $('select option:selected').val());
    }
  });
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
  document
    .getElementById('mostraColunasAtividade')
    .addEventListener('click', function () {
      if (ativRegap == false) {
        table.setGroupBy(['atividade']);
        ativRegap = true;
      } else {
        table.setGroupBy();
        ativRegap = false;
      }
    });
  document
    .getElementById('mostraColunasAtividadeApes')
    .addEventListener('click', function () {
      if (AtivApes == false) {
        tableApes.setGroupBy(['atividade']);
        AtivApes = true;
      } else {
        tableApes.setGroupBy();
        AtivApes = false;
      }
    });
  document
    .getElementById('mostraColunasTurmaApes')
    .addEventListener('click', function () {
      if (grupoApes == false) {
        tableApes.setGroupBy(['equipe']);
        grupoApes = true;
      } else {
        tableApes.setGroupBy();
        grupoApes = false;
      }
    });
  $('#xlsxDownApes').click(() => {
    tableApes.download('xlsx', `${$('#gerApes749').text()}.xlsx`, {
      sheetName: 'Relatório',
    });
  });
  $('#consultaRegap').click((e) => {
    selectRelatorios();
  });
}

function getRelatorios() {
  $.ajax({
    url: `/julgamento/restrito/regap_consolidado/`,
    type: 'POST',
    data: {
      get: 'listagem',
    },
    beforeSend: function () {
      $('.progressRegap').toggle();
    },
  })
    .done(function (msg) {
      msg.reverse().forEach((m) => {
        $('#dataRelRegap').append(
          $('<option>', {
            value: m,
            text: moment.unix(m).format('DD/MM/YYYY'),
          }),
        );
        $('#dataRelRegap').formSelect();
      });
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}

function selectRelatorios() {
  $.ajax({
    url: `/julgamento/restrito/regap_consolidado/`,
    type: 'POST',
    data: {
      get: 'relatorio',
      dtRel: $('#dataRelRegap option:selected').val(),
      semana: $('#semanaRelRegap option:selected').val(),
    },
    beforeSend: function () {
      $('#tabelaRegap').val('');
      $('.progressRegap').toggle();
    },
  })
    .done(function (msg) {
      $('.classProcessos').show();
      let dados = [];
      msg.forEach((m) => {
        m.relatorio.forEach((r) => {
          if (
            m.conselheiro.equipe == '1ª CÂMARA-3ªSEÇÃO-CARF-MF-DF' ||
            m.conselheiro.equipe == '2ª CÂMARA-3ªSEÇÃO-CARF-MF-DF' ||
            m.conselheiro.equipe == '3ª CÂMARA-3ªSEÇÃO-CARF-MF-DF' ||
            m.conselheiro.equipe == '4ª CÂMARA-3ªSEÇÃO-CARF-MF-DF'
          ) {
            m.conselheiro.equipe = '3ª TURMA-CSRF-CARF-MF-DF';
          }
          if (
            m.conselheiro.equipe == '1ª CÂMARA-2ªSEÇÃO-CARF-MF-DF' ||
            m.conselheiro.equipe == '2ª CÂMARA-2ªSEÇÃO-CARF-MF-DF' ||
            m.conselheiro.equipe == '3ª CÂMARA-2ªSEÇÃO-CARF-MF-DF' ||
            m.conselheiro.equipe == '4ª CÂMARA-2ªSEÇÃO-CARF-MF-DF'
          ) {
            m.conselheiro.equipe = '2ª TURMA-CSRF-CARF-MF-DF';
          }
          if (
            m.conselheiro.equipe == '1ª CÂMARA-1ªSEÇÃO-CARF-MF-DF' ||
            m.conselheiro.equipe == '2ª CÂMARA-1ªSEÇÃO-CARF-MF-DF' ||
            m.conselheiro.equipe == '3ª CÂMARA-1ªSEÇÃO-CARF-MF-DF' ||
            m.conselheiro.equipe == '4ª CÂMARA-1ªSEÇÃO-CARF-MF-DF'
          ) {
            m.conselheiro.equipe = '1ª TURMA-CSRF-CARF-MF-DF';
          }
          dados.push({
            secao: retornaSecao(m.conselheiro.equipe),
            cpf: m.conselheiro.cpf,
            nome: m.conselheiro.nome,
            processo: r.processo,
            contribuinte: r.contribuinte,
            equipe: m.conselheiro.equipe,
            equipeProcesso: r.equipeProcesso,
            atividade: r.atividade,
            situacao: r.situacao,
            entradaAtividade: r.entradaAtividade,
            HE: r.HE,
            impostoProj: r.impostoProj,
            valorOrig: r.valorOrig,
            valor: r.valor,
            valorSemTJM: r.valorSemTJM,
            valorCrdLanc: r.valorCrdLanc,
            valorOriginal: r.valorOriginal,
            Dias_na_Atividade: retornaDias(r.entradaAtividade),
            Dias_da_Dist: retornaDias(r.dtUltDist),
            Dias_da_SJ: retornaDias(r.dtSessao),
            apenso: r.apenso,
            questionamento: r.questionamento,
            ultAtividade: r.ultAtividade,
            obs: r.obs,
            prioridade: r.prioridade,
            assunto: r.assunto,
            motPrior: r.motPrior,
            alegacoes: r.alegacoes,
            dtSessao: r.dtSessao,
            ultEquipe: r.ultEquipe,
            ret_Sepoj: r.ultEquipe,
            juntada: r.juntada,
            apes: r.apes,
            apesHE: r.apesHE,
            diff: +r.apesHE - +r.HE,
            paradigma: r.paradigma,
            agrupamento: r.agrupamento,
            qtdeProc: r.qtdeProc,
            dataSituacao: r.dataSituacao,
            Dias_na_Situacao:
              retornaDias(r.dataSituacao) == -1
                ? retornaDias(r.entradaAtividade)
                : retornaDias(r.dataSituacao),
          });
        });
      });
      // dados.forEach((d) => {
      //   apes.forEach((a) => {
      //     if (a.Processo == d.processo) {
      //       d.solicitacao = a.solicitacao;
      //     }
      //   });
      // });
      dataTable(dados);
      //dataTableApes(dados);
      initElementos();
      $('.progressRegap').toggle();
      montaGraficos(msg);
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}

function initSelect() {
  $('select').formSelect();
}

function retornaSecao(equipe) {
  if (equipe) {
    if (equipe.includes('1ªS') || equipe.includes('1ª TURMA')) {
      return '1ª Seção';
    }
    if (
      equipe.includes('2ªS') ||
      equipe.includes('2ª TURMA') ||
      equipe.includes('2ª TURMA')
    ) {
      return '2ª Seção';
    }
    if (equipe.includes('3ªS') || equipe.includes('3ª TURMA')) {
      return '3ª Seção';
    }
  }
}

function dataTable(msg) {
  //console.log(msg);
  let tabledata = msg;
  table = new Tabulator('#tabelaRegap', {
    data: tabledata,
    downloadComplete: function () {
      //console.log('Download OK');
    },
    pagination: 'local',
    height: '1000px',
    minHeight: '300px',
    maxHeight: '1000px',
    layout: layout,
    responsiveLayout: 'collapse',
    downloadConfig: {
      columnCalcs: false,
    },
    groupStartOpen: false,
    responsiveLayoutCollapseStartOpen: false,
    initialSort: [{ column: 'Dias_na_Atividade', dir: 'desc' }],
    columns: [
      {
        formatter: 'responsiveCollapse',
        width: 30,
        minWidth: 30,
        hozAlign: 'left',
        resizable: false,
        headerSort: false,
        responsive: 0,
        download: false,
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
        title: 'Processo',
        field: 'processo',
        formatter: coloreProc,
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      // {
      //   title: 'Equipe Atual',
      //   field: 'equipe',
      //   width: 200,
      //   sorter: 'string',
      //   hozAlign: 'left',
      //   headerFilter: 'input',
      //   topCalc: countCalc,
      //   responsive: 0,
      //   download: true,
      // },
      {
        title: 'Equipe Processo',
        field: 'equipeProcesso',
        width: 200,
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        topCalc: countCalc,
        formatter: formataTESuperior,
        responsive: 0,
        download: true,
      },
      {
        title: 'Contribuinte',
        field: 'contribuinte',
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
        title: 'Ind. Apenso',
        field: 'apenso',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Atividade',
        field: 'atividade',
        sorter: 'string',
        headerFilter: 'input',
        hozAlign: 'center',
        topCalc: countCalc,
        editor: false,
        responsive: 0,
        download: true,
      },
      {
        title: 'Situação de Julgamento',
        field: 'situacao',
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
        field: 'entradaAtividade',
        sorter: 'date',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Entrada na Situacao',
        field: 'dataSituacao',
        sorter: 'date',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Horas CARF',
        field: 'HE',
        sorter: 'number',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: somaCalc,
        accessorDownload: numberConvert,
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
        title: 'Dias na Situação',
        field: 'Dias_na_Situacao',
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
        title: 'Valor do Processo',
        field: 'valor',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        accessorDownload: numberConvert,
        responsive: 0,
        download: true,
      },
      {
        title: 'Valor Original',
        field: 'valorOriginal',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        accessorDownload: numberConvert,
        responsive: 0,
        download: true,
      },
      {
        title: 'Valor Originário Lançado/Pleiteado',
        field: 'valorOrig',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        accessorDownload: numberConvert,
        responsive: 1,
        download: true,
      },
      {
        title: 'Valor Crédito Lançado (Multa de Ofício)',
        field: 'valorCrdLanc',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        accessorDownload: numberConvert,
        responsive: 1,
        download: true,
      },
      {
        title: 'Valor Sem TJM (Atual)',
        field: 'valorSemTJM',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        accessorDownload: numberConvert,
        responsive: 1,
        download: true,
      },
      {
        title:
          'Imposto Projetado Sobre Lançamento de Reduções de Base de Cálculo e/ou de Imposto',
        field: 'impostoProj',
        sorter: 'number',
        hozAlign: 'center',
        editor: false,
        formatter: formatValor,
        accessorDownload: numberConvert,
        responsive: 1,
        download: true,
      },
      {
        title: 'Observações',
        field: 'obs',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Prioridade',
        field: 'prioridade',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Assunto',
        field: 'assunto',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Paradigma?',
        field: 'paradigma',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Nome do Lote/Agrupamento',
        field: 'agrupamento',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Qtde de Processos no Lote',
        field: 'qtdeProc',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Motivo da Prioridade',
        field: 'motPrior',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Alegações',
        field: 'alegacoes',
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
        field: 'dtSessao',
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
        field: 'ret_Sepoj',
        formatter: retornoSepoj,
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Última Equipe',
        field: 'ultEquipe',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: false,
      },
      {
        title: 'Questionamento',
        field: 'questionamento',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: true,
      },
      {
        title: 'Solicitação de Juntada?',
        field: 'juntada',
        sorter: 'string',
        hozAlign: 'center',
        editor: false,
        responsive: 2,
        download: false,
      },
      {
        title: 'Seção',
        field: 'secao',
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

function dataTableApes(msg) {
  let tabledataApes = msg;
  tableApes = new Tabulator('#tabelaApes', {
    data: tabledataApes,
    minHeight: '300px',
    maxHeight: '1000px',
    height: '900px',
    layout: 'fitDataFill',
    paginationInitialPage: 1,
    downloadConfig: {
      columnCalcs: false,
    },
    groupStartOpen: true,
    initialSort: [{ column: 'solicitacao', dir: 'desc' }],
    columns: [
      {
        title: 'Responsável',
        field: 'conselheiro',
        sorter: 'string',
        width: 200,
        hozAlign: 'left',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,

        download: true,
      },
      {
        title: 'Processo',
        field: 'processo',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        download: true,
        width: 200,
      },
      {
        title: 'Equipe Atual',
        field: 'equipe',
        width: 200,
        sorter: 'string',
        hozAlign: 'left',
        headerFilter: 'input',
        topCalc: countCalc,
        width: 200,
        download: true,
      },

      {
        title: 'Atividade',
        field: 'atividade',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        topCalc: countCalc,
        editor: false,
        width: 150,
        download: true,
      },
      {
        title: 'Situação de Julgamento',
        field: 'situacao',
        sorter: 'string',
        headerFilter: 'input',
        topCalc: countCalc,
        hozAlign: 'center',
        editor: false,
        width: 150,
      },
      {
        title: 'Diferença',
        field: 'diff',
        sorter: 'number',
        hozAlign: 'center',
        accessorDownload: numberConvert,
        headerFilter: 'input',
        topCalc: somaCalc,
        editor: false,
        width: 100,
        download: true,
      },
      {
        title: 'Solicitação',
        field: 'solicitacao',
        sorter: 'string',
        hozAlign: 'center',
        headerFilter: 'input',
        cellEdited: editaSol,
        topCalc: countCalc,
        editor: 'input',
        width: 100,
        download: true,
      },
    ],
    autoColumns: false,
    locale: true,
    langs: langs,
  });
}

let editaSol = function editaSol(cell) {
  if (cell.getValue()) {
    $.ajax({
      url: `/julgamento/apes749/`,
      type: 'PUT',
      data: {
        processo: cell.getRow().getData().processo,
        solicitacao: cell.getValue(),
      },
    })
      .done(function (msg) {
        var toastHTML = `<span>Processo atualizado com sucesso.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      })
      .fail(function (jqXHR, textStatus, msg) {
        var toastHTML = `<span>Ocorreu um erro.</span>`;
        M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
      });
  }
};

let formatDiff = function formatDiff(cell) {
  const valor = +cell.getRow().getData().diff;

  return `${valor.toFixed(2)}`;
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
