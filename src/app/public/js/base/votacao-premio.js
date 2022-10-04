let votos = JSON.parse($('#idVotos').attr('data-votos'));
let cons = votos.map(({ cons }) => cons);
let serv = votos.map(({ serv }) => serv);
let terc = votos.map(({ terc }) => terc);
$('#qtdeVotos').text(votos.length);
inicializaComponentes();

function inicializaComponentes() {
  graficos();
}
function graficos() {
  let traceCons = { y: cons.sort(), type: 'histogram', histnorm: 'percent' };
  let traceServ = { y: serv.sort(), type: 'histogram', histnorm: 'percent' };
  let traceTerc = { y: terc.sort(), type: 'histogram', histnorm: 'percent' };
  let layout = {
    title: 'Percentual de Votos',
    // autosize: false,
    margin: {
      l: 150,
      r: 150,
      b: 0.5,
      //t: 150,
      pad: 10,
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
}
