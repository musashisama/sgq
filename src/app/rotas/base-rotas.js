const BaseControlador = require('../controladores/base-controlador');
const { rotas } = require('../controladores/base-controlador');
const baseControlador = new BaseControlador();

module.exports = (app) => {

    const rotasBase = BaseControlador.rotas();
   
    // app.use(rotasBase.autenticadas, function(req, resp, next){   
    //     req.session.baseUrl = req.baseUrl;
    //     if(req.isAuthenticated()){                     
    //         next();
    //     } else{
    //         resp.redirect(rotasBase.login);
    //     }
    // });

    app.get(rotasBase.principal, baseControlador.principal());
    app.post(rotasBase.enviamail, baseControlador.enviaMail());

    app.post(rotasBase.formalterasenha,baseControlador.alteraSenha());
    
    app.get(rotasBase.trocasenhaSemID,baseControlador.login());

    app.route(rotasBase.trocasenha)
    .get(baseControlador.paginaAlteracao())
    .post(baseControlador.alteraSenha()); 

    app.route(rotasBase.login)
    .get(baseControlador.login())
    .post(baseControlador.efetuaLogin());    
}