const ncRotas = require('./nc-rotas');
const rotasArq = require('./arq-rotas')
const baseRotas = require('./base-rotas');
const gestaoRotas = require('./gestao-rotas')


module.exports = (app) => {
    ncRotas(app);
    rotasArq(app);
    baseRotas(app);
    gestaoRotas(app);
};