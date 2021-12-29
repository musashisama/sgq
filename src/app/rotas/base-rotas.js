const BaseControlador = require('../controladores/base-controlador');
const { rotas } = require('../controladores/base-controlador');
const baseControlador = new BaseControlador();

module.exports = (app) => {
  app.use('/*', function (req, resp, next) {
    if (req.isAuthenticated()) {
      resp.set('autenticado', true);
      next();
    } else {
      resp.set('autenticado', false);
      next();
    }
  });

  const rotasBase = BaseControlador.rotas();
  app.get(rotasBase.logout, baseControlador.logout());
  app.get(rotasBase.principal, baseControlador.principal());
  app.post(rotasBase.enviamail, baseControlador.enviaMail());
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
};
