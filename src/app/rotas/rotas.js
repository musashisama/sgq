const ncRotas = require('./nc-rotas');
const arqRotas = require('./arq-rotas');
const baseRotas = require('./base-rotas');
const adminRotas = require('./admin-rotas');
const julgamentoRotas = require('./julgamento-rotas');
const pessoalRotas = require('./pessoal-rotas');
const conselheiroRotas = require('./conselheiro-rotas');
const suporteRotas = require('./suporte-rotas');

module.exports = (app) => {
  ncRotas(app);
  arqRotas(app);
  baseRotas(app);
  adminRotas(app);
  julgamentoRotas(app);
  pessoalRotas(app);
  conselheiroRotas(app);
  suporteRotas(app);
};
