const NCControlador = require('../controladores/nc-controlador');
const ncControlador = new NCControlador();
const BaseControlador = require('../controladores/base-controlador')
const baseControlador = new BaseControlador();
const ACL = require('../infra/helpers/ACL');

module.exports = (app) => {

    const rotasNC = NCControlador.rotas();
    const rotasBase = BaseControlador.rotas();

    app.use('/*', function (req, resp, next) {
        if (req.isAuthenticated()) {
            resp.set('autenticado', true);
            next();
        } else {
            resp.set('autenticado', false);
            next();
        }
    })

    app.use(rotasNC.autenticadas, function (req, resp, next) {
        req.session.baseUrl = req.baseUrl;
        if (req.isAuthenticated()) {
            resp.set('autenticado', true);
            next();
        } else {
            resp.redirect(rotasBase.login);
        }
    });

    app.use(rotasNC.autenticadas, function (req, resp, next) {
        console.log(req.user.perfis);
        if (ACL.checaACL(req.user.perfis, 'qualidade')) {
            next();
        } else { resp.render(403) };
    });

    app.get(rotasNC.listagem, ncControlador.listagem());
    app.get(rotasNC.listaNC, ncControlador.listaNC());

    app.route(rotasNC.form)
        .get(ncControlador.formularioCadastro())
        .post(ncControlador.cadastra());

    app.get(rotasNC.listaRNC, ncControlador.listaRNC());
    app.get(rotasNC.lista, ncControlador.lista());


    app.route(rotasNC.cadastraNC)
        .get(ncControlador.formCadastraNC())
        .post(ncControlador.cadastraNC())
        .put(ncControlador.edita());

    app.delete(rotasNC.deletaNC, ncControlador.removeNC())

    app.get(rotasNC.edicao, ncControlador.formEdicao());
}
