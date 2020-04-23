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

    app.use(rotasJulgamento.autenticadas, function (req, resp, next) {
        req.session.baseUrl = req.baseUrl;
        if (req.isAuthenticated()) {
            resp.set('autenticado',true);           
            next();
        } else {
            resp.redirect(rotasBase.login);
        }
    });

    app.get(rotasJulgamento.calendario,julgControlador.carregaPaginaCalendario());

    app.use(rotasJulgamento.autenticadas, function (req, resp, next) {
        if (ACL.checaACL(req.user.perfis, 'julgamento') ||ACL.checaACL(req.user.perfis, 'conselheiro')) {
            next();
        } else { resp.render(403) };

    });
    app.get(rotasJulgamento.regap, julgControlador.carregaPaginaRegap());
    app.get(rotasJulgamento.detalharegap, julgControlador.carregaPaginaRegap());
    

    app.use(rotasJulgamento.autenticadas, function (req, resp, next) {
        if (ACL.checaACL(req.user.perfis, 'julgamento')) {
            next();
        } else { resp.render(403) };

    });
   
    app.get(rotasJulgamento.regapCojul, julgControlador.carregaPaginaRegapCojul());
    app.get(rotasJulgamento.escolhecsvregap, julgControlador.escolheCSVRegap());    
    app.get(rotasJulgamento.escolhecsv, julgControlador.escolheCSV());
    app.get(rotasJulgamento.detalha, julgControlador.carregaPaginaDiag())
    app.route(rotasJulgamento.carregacsv)
        .get(julgControlador.carregaPaginaInsereCSV())
        .post(julgControlador.carregaCSV());

        
}