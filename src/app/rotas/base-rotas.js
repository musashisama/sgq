const BaseControlador = require('../controladores/base-controlador');
//const { rotas } = require('../controladores/base-controlador');
const baseControlador = new BaseControlador();
const ACL = require('../infra/helpers/ACL');

module.exports = (app) => {
  const rotasBase = BaseControlador.rotas();
  app.use('/*', function (req, resp, next) {
    if (req.isAuthenticated()) {
      resp.set('autenticado', true);
      next();
    } else {
      resp.set('autenticado', false);
      next();
    }
  });

  app.use(rotasBase.autenticadas, function (req, resp, next) {
    req.session.baseUrl = req.baseUrl;
    if (req.isAuthenticated()) {
      resp.set('autenticado', true);
      next();
    } else {
      resp.redirect(rotasBase.login);
    }
  });

  app.get(rotasBase.logout, baseControlador.logout());
  app.get(rotasBase.principal, baseControlador.principal());
  app.post(rotasBase.enviamail, baseControlador.enviaMail());
  app.post(rotasBase.alegaRetorno, baseControlador.alegacoesRetorno());
  app.get(rotasBase.alegacoes, baseControlador.tabAlegacoes());
  app.post(rotasBase.formalterasenha, baseControlador.alteraSenha());
  app.get(rotasBase.trocasenhaSemID, baseControlador.login());
  app
    .route(rotasBase.trocasenha)
    .get(baseControlador.paginaAlteracao())
    .post(baseControlador.alteraSenha());
  app
    .route(rotasBase.premio)
    .get(baseControlador.carregaPremio())
    .post(baseControlador.carregaPremio());
  app.get(rotasBase.arqdown, baseControlador.arquivoDown());
  app.get(rotasBase.popups, baseControlador.popups());
  app
    .route(rotasBase.login)
    .get(baseControlador.login())
    .post(baseControlador.efetuaLogin());

  app.use(rotasBase.autenticadas, function (req, resp, next) {
    //console.log(ACL.checaACL(req.user.perfis, 'premio'));
    if (ACL.checaACL(req.user.perfis, 'premio')) {
      next();
    } else {
      resp.render(403);
    }
  });
  app.route(rotasBase.votacaopremio).get(baseControlador.votacaoPremio());
};
