const UserControlador = require('../controladores/user-controlador');
const userControlador = new UserControlador();
const BaseControlador = require('../controladores/base-controlador');
const ACL = require('../infra/helpers/ACL');

module.exports = (app) => {

    const rotasUser = UserControlador.rotas();
    const rotasBase = BaseControlador.rotas();

    app.use(rotasUser.autenticadas, function (req, resp, next) {
        req.session.baseUrl = req.baseUrl;
        if (req.isAuthenticated()) {
            next();
        } else {
            resp.redirect(rotasBase.login);
        }
    });

    app.use(rotasUser.autenticadas, function (req, resp, next) {
        if (ACL.checaACL(req.user.perfis, 'admin')) {
            next();
        } else { resp.render(403) };

    });
     

    app.get(rotasUser.ocorrencias, userControlador.listaOcorrencias());

    app.route(rotasUser.cadastraOco)
        .get(userControlador.formOcorrencia())
        .post(userControlador.cadastraTpOcorrencia())
        .put(userControlador.editaOco());

    app.get(rotasUser.edicaoOco, userControlador.formEditaOcorrencia())

    app.delete(rotasUser.deletaOco, userControlador.removeTpOco());


    app.route(rotasUser.perfis)
        .get(userControlador.formPerfis())
        .post(userControlador.formPerfis());

    app.put(rotasUser.edita, userControlador.editaPerfis());

    app.route(rotasUser.cadastro)
        .get(userControlador.formCadastra())
        .post(userControlador.cadastra())
        .put(userControlador.edita());


}


