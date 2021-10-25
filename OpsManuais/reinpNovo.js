const fs = require('fs');
const d3 = require('d3');

let reinp2020,
  conselheiros = [];
reinp2020 = fs.readFileSync('./relatorios/REINPCOMPLETO.csv', 'utf8');
conselheiros = fs.readFileSync('./relatorios/usuarios.csv', 'utf8');

let rel = d3.csvParse(reinp2020);
let cons = d3.csvParse(conselheiros);

rel.forEach((r) => {
  cons.forEach((c) => {
    if (r.cpf == c.cpf) {
      r.unidade = c.unidade;
      r.funcao = c.funcao;
    }
  });
});

rel.forEach((r) => {
  r.he = +r.he + +r.apes749;
  if (r.apes749 != '') {
    r.obs = `Apuração Especial 749: Somadas ${r.apes749} horas às ${
      r.he - r.apes749
    } anteriores.`;
  }
  if (r.mes.includes('2020')) {
    r.ano = '2020';
  }
  if (r.mes.includes('2021')) {
    r.ano = '2021';
  }
});

fs.writeFileSync(
  './relatorios/REINP_COMPLETO_FORMATADO.csv',
  d3.csvFormat(rel),
);
