const fs = require('fs');
const d3 = require('d3');

let reinp2020,
  conselheiros = [];
reinp2020 = fs.readFileSync(
  './relatorios/Reinp_2021_total_Atualizado.csv',
  'utf8',
);
conselheiros = fs.readFileSync('./relatorios/usuarios-novo.csv', 'utf8');
let formato = d3.dsvFormat(';');
//let rel = d3.csvParse(reinp2020);
rel = formato.parse(reinp2020);
let cons = d3.csvParse(conselheiros);

rel.forEach((r) => {
  r.he = r.he.replace(',', '.');
  r.he = +r.he;
  r.apes749 = r.apes749.replace(',', '.');
  r.apes749 = +r.apes749;

  if (r.multiplicador != '1' || r.multiplicador != 1) {
    r.obs += '. Multiplicador 2/3 aplicado.';
  }
  if (r.apes749 != 0) {
    r.obs += `. Apuração Especial 749: Somadas ${r.apes749} horas às ${
      r.he - r.apes749
    } anteriores.`;
  }
  if (r.tipo.includes('SGI')) {
    r.retorno = 'NÃO';
  }
  if (r.mes.includes('2020')) {
    r.ano = '2020';
  }
  if (r.mes.includes('2021')) {
    r.ano = '2021';
  }
  delete r.heregap;
  delete r.multiplicador;
  delete r.apes749;
  cons.forEach((c) => {
    if (r.cpf == c.cpf) {
      r.unidade = c.unidade;
      r.funcao = c.funcao;
    }
  });
});

fs.writeFileSync(
  './relatorios/REINP_COMPLETO_FORMATADO_2021.csv',
  d3.csvFormat(rel),
);
