const PessoalControlador = require('../controladores/pessoal-controlador');
const pessoalControlador = new PessoalControlador();
const BaseControlador = require('../controladores/base-controlador')
const ACL = require('../infra/helpers/ACL');


module.exports = (app) => {

    const rotasPessoal = PessoalControlador.rotas();
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
    app.use(rotasPessoal.autenticadas, function (req, resp, next) {
        req.session.baseUrl = req.baseUrl;
        if (req.isAuthenticated()) {
            next();
        } else {
            resp.redirect(rotasBase.login);
        }
    });

    app.use(rotasPessoal.autenticadas, function (req, resp, next) {
        if (ACL.checaACL(req.user.perfis, 'pessoal')) {
            next();
        } else { resp.render(403) };

    });

    app.get(rotasPessoal.agenda, pessoalControlador.carregaAgenda());

    app.get(rotasPessoal.cadastraCons, pessoalControlador.carregaPaginaCadCons());
    app.post(rotasPessoal.cadastraCons, pessoalControlador.cadastraCons())
    app.get(rotasPessoal.cadastraPess, pessoalControlador.carregaPaginaCadPess());
    app.post(rotasPessoal.cadastraPess, pessoalControlador.cadastraPess());

    app.route(rotasPessoal.pessoas)
        .get(pessoalControlador.carregaPaginaPessoal())
        .post(pessoalControlador.carregaPaginaPessoal());
    
    app.route(rotasPessoal.conselheiros)
    .get(pessoalControlador.carregaPaginaCons())
    .post(pessoalControlador.carregaPaginaCons());
  
    
    app.route(rotasPessoal.detalhaPess)
    .get(pessoalControlador.carregaPaginaDetalhaPessoal())
    .post(pessoalControlador.editaPessoa());

    app.route(rotasPessoal.detalhacons)
    .get(pessoalControlador.carregaPaginaDetCons())
    .post(pessoalControlador.editaCons());        
   

    

    app.post(rotasPessoal.insOcorrenciaPess, pessoalControlador.insereOcorrenciaPess());
    app.put(rotasPessoal.editaOcorrenciaPess,pessoalControlador.editaOcorrenciaPess());
    app.delete(rotasPessoal.excluiOcorrenciaPess,pessoalControlador.excluiOcorrenciaPess());

    app.post(rotasPessoal.insOcorrencia, pessoalControlador.insereOcorrencia());
    app.put(rotasPessoal.editaOcorrencia,pessoalControlador.editaOcorrencia());    
    app.delete(rotasPessoal.excluiOcorrencia,pessoalControlador.excluiOcorrencia());   
}