inicializaComponentes();
function inicializaComponentes() {
  $(document).ready(function () {
    initTabs();
    selectRelatorios();
    grafico();
  });
}

function initTabs() {
  $('.tabs').tabs();
}
function selectRelatorios() {
  $.ajax({
    url: `/julgamento/restrito/regap_consolidado/`,
    type: 'POST',
    data: {
      get: 'indicadores',
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
          if (m.conselheiro.equipe == '3ª CÂMARA-3ªSEÇÃO-CARF-MF-DF') {
            m.conselheiro.equipe = '3ª TURMA-CSRF-CARF-MF-DF';
          }
          if (m.conselheiro.equipe == '4ª CÂMARA-2ªSEÇÃO-CARF-MF-DF') {
            m.conselheiro.equipe = '2ª TURMA-CSRF-CARF-MF-DF';
          }
          dados.push({
            cpf: m.conselheiro.cpf,
            nome: m.conselheiro.nome,
            processo: r.processo,
            contribuinte: r.contribuinte,
            equipe: m.conselheiro.equipe,
            atividade: r.atividade,
            situacao: r.situacao,
            entradaAtividade: r.entradaAtividade,
            HE: r.HE,
            valorOrig: r.valorOrig,
            Dias_na_Atividade: retornaDias(r.entradaAtividade),
            Dias_da_Dist: retornaDias(r.dtUltDist),
            Dias_da_SJ: retornaDias(r.dtSessao),
            apenso: r.apenso,
            obs: r.obs,
            prioridade: r.prioridade,
            assunto: r.assunto,
            motPrior: r.motPrior,
            alegacoes: r.alegacoes,
            dtSessao: r.dtSessao,
            ultEquipe: r.ultEquipe,
            ret_Sepoj: r.ultEquipe,
            juntada: r.juntada,
          });
        });
      });
      console.log(msg);
      $('.progressRegap').toggle();
    })
    .fail(function (jqXHR, textStatus, msg) {
      var toastHTML = `<span>Ocorreu um erro.</span>`;
      M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
    });
}
function retornaDias(atividade) {
  return +moment().diff(moment(atividade, 'DD/MM/YYYY'), 'days') + 1;
}
function grafico() {
  let ctx = $('#myChart'); //document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Custom Chart Title',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
