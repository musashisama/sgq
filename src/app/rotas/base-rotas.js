const BaseControlador = require('../controladores/base-controlador')
const baseControlador = new BaseControlador();

module.exports = (app) => {

    const rotasBase = BaseControlador.rotas();

    app.use(rotasBase.autenticadas, function(req, resp, next){
        if(req.isAuthenticated()){
            next();
        } else{
            resp.redirect(rotasBase.login);
        }
    });

    app.get(rotasBase.principal, baseControlador.principal());

    app.route(rotasBase.login)
    .get(baseControlador.login())
    .post(baseControlador.efetuaLogin());    
}