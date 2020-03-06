const ncRotas = require('./nc-rotas');
const arqRotas = require('./arq-rotas')
const baseRotas = require('./base-rotas');
const adminRotas = require('./admin-rotas')


module.exports = (app) => {
    ncRotas(app);
    arqRotas(app);
    baseRotas(app);
    adminRotas(app);
};