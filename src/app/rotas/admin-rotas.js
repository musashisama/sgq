const UserControlador = require('../controladores/user-controlador');
const userControlador = new UserControlador();
const BaseControlador = require('../controladores/base-controlador');

module.exports = (app) => {

    const rotasUser = UserControlador.rotas();
    const rotasBase = BaseControlador.rotas();
    // app.get(rotasNC.listaRNC, ncControlador.listaRNC());
    // app.get(rotasNC.lista, ncControlador.lista());
    app.use(rotasUser.autenticadas, function (req, resp, next) {
        req.session.baseUrl = req.baseUrl;
        if (req.isAuthenticated()) {
            next();
        } else {
            resp.redirect(rotasBase.login);
        }
    });

    app.route(rotasUser.cadastro)
        .get(userControlador.formCadastra())
        .post(userControlador.cadastra())
        .put(userControlador.edita());
}


