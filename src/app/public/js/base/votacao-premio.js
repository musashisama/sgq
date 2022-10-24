let votos = JSON.parse($('#idVotos').attr('data-votos'));
let cons = votos.map(({ cons }) => cons);
let serv = votos.map(({ serv }) => serv);
let terc = votos.map(({ terc }) => terc);
$('#qtdeVotos').text(votos.length);
inicializaComponentes();

function inicializaComponentes() {
  cons = votoBranco(cons);
  serv = votoBranco(serv);
  terc = votoBranco(terc);
  graficos();
}

function votoBranco(arrayVoto) {
  let novoArray = [];
  arrayVoto.forEach((el) => {
    if (el == '' || el == ' ') {
      novoArray.push('Voto em Branco');
    } else novoArray.push(el);
  });
  return novoArray;
}
function graficos() {
  let traceCons = { y: cons.reverse(), type: 'histogram', histnorm: 'percent' };
  let traceServ = { y: serv.reverse(), type: 'histogram', histnorm: 'percent' };
  let traceTerc = { y: terc.reverse(), type: 'histogram', histnorm: 'percent' };
  let traceConsCount = { y: cons.reverse(), type: 'histogram' };
  let traceServCount = { y: serv.reverse(), type: 'histogram' };
  let traceTercCount = { y: terc.reverse(), type: 'histogram' };
  let layout = {
    title: 'Percentual de Votos',
    autosize: false,
    height: 10 * votos.length,
    margin: {
      //l: 150,
      //r: 150,
      b: 0.1,
      //t: 150,
      //pad: 10,
    },
    yaxis: {
      automargin: true,
      tickmode: 'linear',
    },
    xaxis: {
      automargin: true,
      tickmode: 'linear',
    },
  };

  let layoutCount = {
    title: 'Contagem de Votos',
    autosize: false,
    height: 10 * votos.length,
    margin: {
      //l: 150,
      //r: 150,
      b: 0.1,
      //t: 150,
      //pad: 10,
    },
    yaxis: {
      automargin: true,
      tickmode: 'linear',
    },
    xaxis: {
      automargin: true,
      tickmode: 'linear',
    },
  };

  Plotly.newPlot(document.getElementById('grafCons'), [traceCons], layout);
  Plotly.newPlot(document.getElementById('grafServ'), [traceServ], layout);
  Plotly.newPlot(document.getElementById('grafTerc'), [traceTerc], layout);
  Plotly.newPlot(
    document.getElementById('grafConsCount'),
    [traceConsCount],
    layoutCount,
  );
  Plotly.newPlot(
    document.getElementById('grafServCount'),
    [traceServCount],
    layoutCount,
  );
  Plotly.newPlot(
    document.getElementById('grafTercCount'),
    [traceTercCount],
    layoutCount,
  );
}
