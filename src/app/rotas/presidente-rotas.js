const JulgamentoControlador = require('../controladores/julgamento-controlador');
const PresidenteControlador = require('../controladores/presidente-controlador');
const julgControlador = new JulgamentoControlador();
const presiControlador = new PresidenteControlador();
const BaseControlador = require('../controladores/base-controlador');
const ACL = require('../infra/helpers/ACL');

module.exports = (app) => {
  const rotasPresidente = PresidenteControlador.rotas();
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

  app.use(rotasPresidente.autenticadas, function (req, resp, next) {
    req.session.baseUrl = req.baseUrl;
    if (req.isAuthenticated()) {
      resp.set('autenticado', true);
      next();
    } else {
      resp.redirect(rotasBase.login);
    }
  });

  app.use(rotasPresidente.portalpresidente, function (req, resp, next) {
    req.session.baseUrl = req.baseUrl;
    if (req.isAuthenticated()) {
      resp.set('autenticado', true);
      next();
    } else {
      resp.redirect(rotasBase.login);
    }
  });

  app.get(
    rotasPresidente.portalpresidente,
    presiControlador.carregaPortalPresidente(),
  );

  app
    .route(rotasPresidente.regap_consolidado)
    .get(presiControlador.carregaRegapConsolidado())
    .post(presiControlador.carregaRegapConsolidado());

  app
    .route(rotasPresidente.regap_individual_presi)
    .get(presiControlador.carregaRegapConsDetalha())
    .post(presiControlador.carregaRegapConsDetalha());

  app
    .route(rotasPresidente.reinp)
    .get(presiControlador.carregaPaginaReinp())
    .post(presiControlador.carregaPaginaReinp());

  app.get(
    rotasPresidente.detalhareinp,
    presiControlador.carregaPaginaDetalhaReinp(),
  );

  app.get(
    rotasPresidente.paginaPeriodosIndicacao,
    presiControlador.carregaPaginaIndicacoes(),
  );
  app
    .route(rotasPresidente.paginaOrdenaPauta)
    .get(presiControlador.handleOrdenaPauta())
    .post(presiControlador.handleOrdenaPauta());
};
