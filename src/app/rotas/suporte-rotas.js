const BaseControlador = require('../controladores/base-controlador');
const ACL = require('../infra/helpers/ACL');
const SuporteControlador = require('../controladores/suporte-controlador');
const supControlador = new SuporteControlador();

module.exports = (app) => {
  const rotasBase = BaseControlador.rotas();
  const rotasSuporte = SuporteControlador.rotas();

  app.use('/*', function (req, resp, next) {
    if (req.isAuthenticated()) {
      resp.set('autenticado', true);
      next();
    } else {
      resp.set('autenticado', false);
      next();
    }
  });

  app.use(rotasSuporte.autenticadas, function (req, resp, next) {
    req.session.baseUrl = req.baseUrl;
    if (req.isAuthenticated()) {
      resp.set('autenticado', true);
      next();
    } else {
      resp.redirect(rotasBase.login);
    }
  });
  app.get(rotasSuporte.portalCosup, supControlador.carregaPortalCosup());
  app.get(rotasSuporte.gestaoPortalCosup, supControlador.handlePortalCosup());

  app.use(rotasSuporte.autenticadas, function (req, resp, next) {
    if (
      ACL.checaACL(req.user.perfis, 'suporte') ||
      ACL.checaACL(req.user.perfis, 'serpro')
    ) {
      next();
    } else {
      resp.render(403);
    }
  });

  app.use(rotasSuporte.autenticadas, function (req, resp, next) {
    if (ACL.checaACL(req.user.perfis, 'suporte')) {
      next();
    } else {
      resp.render(403);
    }
  });

  app.get(
    rotasSuporte.gestaoIndicacao,
    supControlador.carregaGestaoIndicacao(),
  );

  app.get(rotasSuporte.criaIndicacao, supControlador.carregaCriaIndicacao());
  app
    .route(rotasSuporte.consolidacaoPauta)
    .post(supControlador.consolidaPauta())
    .delete(supControlador.consolidaPauta());
  app
    .route(rotasSuporte.editaPeriodo)
    .get(supControlador.carregaEditaIndicacao())
    .post(supControlador.carregaEditaIndicacao());
  app
    .route(rotasSuporte.gerenciaPeriodo)
    .get(supControlador.gerenciaPeriodo())
    .post(supControlador.gerenciaPeriodo());
  app
    .route(rotasSuporte.gerenciaColegiado)
    .get(supControlador.gerenciaColegiado())
    .post(supControlador.gerenciaColegiado());
  app
    .route(rotasSuporte.handle_periodo)
    .get(supControlador.handlePeriodo())
    .post(supControlador.handlePeriodo())
    .delete(supControlador.handlePeriodo());

  app.get(rotasSuporte.visualizaPauta, supControlador.carregaVisualizaPauta());
};
