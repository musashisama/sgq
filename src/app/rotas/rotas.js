const ncRotas = require('./nc-rotas');
const arqRotas = require('./arq-rotas')
const baseRotas = require('./base-rotas');
const adminRotas = require('./admin-rotas');
const julgamentoRotas = require('./julgamento-rotas')
const pessoalRotas = require('./pessoal-rotas');


module.exports = (app) => {
    ncRotas(app);
    arqRotas(app);
    baseRotas(app);
    adminRotas(app);
    julgamentoRotas(app);
    pessoalRotas(app);
};