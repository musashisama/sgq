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
    app.route(rotasPessoal.cadastra)
        .get(pessoalControlador.carregaPaginaCadastro())
        .post(pessoalControlador.carregaPaginaCadastro())

    app.route(rotasPessoal.conselheiros)
        .get(pessoalControlador.carregaPaginaCons())
        .post(pessoalControlador.carregaPaginaCons())

    //app.post(rotasPessoal.editacons, pessoalControlador.editaCons());

    app.route(rotasPessoal.detalhacons)
        .get(pessoalControlador.carregaPaginaDetCons())
        .post(pessoalControlador.editaCons());
    // app.route(rotasPessoal.carregacsv)
    //     .get(pessoalControlador.carregaPaginaInsereCSV())
    //     .post(pessoalControlador.carregaCSV());
}