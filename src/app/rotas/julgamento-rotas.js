const JulgamentoControlador = require('../controladores/julgamento-controlador');
const julgControlador = new JulgamentoControlador();
const BaseControlador = require('../controladores/base-controlador')


module.exports = (app) => {

    const rotasJulgamento = JulgamentoControlador.rotas();
    const rotasBase = BaseControlador.rotas();

    // app.use(rotasJulgamento.autenticadas, function(req, resp, next){   
    //     req.session.baseUrl = req.baseUrl;
    //     if(req.isAuthenticated()){                     
    //         next();
    //     } else{
    //         resp.redirect(rotasBase.login);
    //     }
    // });
    app.get(rotasJulgamento.regap,julgControlador.carregaPaginaRegap());
    app.get(rotasJulgamento.regapCojul,julgControlador.carregaPaginaRegapCojul());
    app.get(rotasJulgamento.escolhecsvregap,julgControlador.escolheCSVRegap());
    app.get(rotasJulgamento.escolhecsv,julgControlador.escolheCSV());
    app.get(rotasJulgamento.detalha,julgControlador.carregaPaginaDiag())
    app.route(rotasJulgamento.carregacsv)
        .get(julgControlador.carregaPaginaInsereCSV())
        .post(julgControlador.carregaCSV());
}