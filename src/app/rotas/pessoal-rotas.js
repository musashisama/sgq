const PessoalControlador = require('../controladores/pessoal-controlador');
const pessoalControlador = new PessoalControlador();
const BaseControlador = require('../controladores/base-controlador')


module.exports = (app) => {

    const rotasPessoal = PessoalControlador.rotas();
    const rotasBase = BaseControlador.rotas();

    // app.use(rotasPessoal.autenticadas, function(req, resp, next){   
    //     req.session.baseUrl = req.baseUrl;
    //     if(req.isAuthenticated()){                     
    //         next();
    //     } else{
    //         resp.redirect(rotasBase.login);
    //     }
    // });
    app.route(rotasPessoal.pessoas)
        .get(pessoalControlador.carregaPaginaPessoal())
        .post(pessoalControlador.carregaPaginaPessoal());
        //.put(julgControlador.carregaRel());
        
        
    // app.route(rotasPessoal.carregacsv)
    //     .get(pessoalControlador.carregaPaginaInsereCSV())
    //     .post(pessoalControlador.carregaCSV());
}