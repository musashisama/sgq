const UserControlador = require('../controladores/user-controlador');
const userControlador = new UserControlador();
const BaseControlador = require('../controladores/base-controlador');
const ACL = require('../infra/helpers/ACL');

module.exports = (app) => {

    const rotasUser = UserControlador.rotas();
    const rotasBase = BaseControlador.rotas();
    
    app.get(rotasUser.userProfile, userControlador.getUserPerfis())

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

    app.route(rotasUser.ocorrencias)
        .get(userControlador.handleOcorrencias())
        .post(userControlador.handleOcorrencias())
        .put(userControlador.handleOcorrencias())
        .delete(userControlador.handleOcorrencias());
   
    app.route(rotasUser.perfis)
        .get(userControlador.formPerfis())
        .post(userControlador.formPerfis());
    app.put(rotasUser.edita, userControlador.editaPerfis());
    app.route(rotasUser.cadastro)
        .get(userControlador.formCadastra())
        .post(userControlador.cadastra())
        .put(userControlador.edita());


}


