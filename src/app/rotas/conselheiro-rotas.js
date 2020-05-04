const JulgamentoControlador = require('../controladores/julgamento-controlador');
const julgControlador = new JulgamentoControlador();
const BaseControlador = require('../controladores/base-controlador')
const ACL = require('../infra/helpers/ACL');

module.exports = (app) => {

    const rotasJulgamento = JulgamentoControlador.rotas();
    const rotasBase = BaseControlador.rotas();

    app.use('/*', function(req,resp,next){
        if (req.isAuthenticated()) {
            resp.set('autenticado',true);           
            next();
        } else {
            resp.set('autenticado',false);
            next();
        }
    })

    app.use(rotasJulgamento.conselheiros, function (req, resp, next) {
        req.session.baseUrl = req.baseUrl;
        if (req.isAuthenticated()) {
            resp.set('autenticado',true);           
            next();
        } else {
            resp.redirect(rotasBase.login);
        }
    });
    
    app.use(rotasJulgamento.conselheiros, function (req, resp, next) {
        if (ACL.checaACL(req.user.perfis, 'conselheiro')) {
            next();
        } else { resp.render(403) };

    }); 

    app.get(rotasJulgamento.conselheiros,julgControlador.carregaPaginaConselheiros());
    app.post(rotasJulgamento.regapcons,julgControlador.carregaTabelaConselheiros());
}