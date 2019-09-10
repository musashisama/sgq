const RiscoControlador = require('../controladores/risco-controlador');
const riscocontrolador = new RiscoControlador();

module.exports = (app) => {

    const rotasRisco = RiscoControlador.rotas();

    app.get(rotasRisco.lista, riscocontrolador.lista());
}