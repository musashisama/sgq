const ncRotas = require('./nc-rotas');
const rotasArq = require('./arq-rotas')


module.exports = (app) => {
    ncRotas(app);
    rotasArq(app);
};