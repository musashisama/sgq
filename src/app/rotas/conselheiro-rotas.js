const JulgamentoControlador = require('../controladores/julgamento-controlador');
const julgControlador = new JulgamentoControlador();
const BaseControlador = require('../controladores/base-controlador');
const ACL = require('../infra/helpers/ACL');

module.exports = (app) => {
  const rotasJulgamento = JulgamentoControlador.rotas();
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

  app.use(rotasJulgamento.autenticadas, function (req, resp, next) {
    req.session.baseUrl = req.baseUrl;
    if (req.isAuthenticated()) {
      resp.set('autenticado', true);
      next();
    } else {
      resp.redirect(rotasBase.login);
    }
  });

  app.use(rotasJulgamento.conselheiros, function (req, resp, next) {
    req.session.baseUrl = req.baseUrl;
    if (req.isAuthenticated()) {
      resp.set('autenticado', true);
      next();
    } else {
      resp.redirect(rotasBase.login);
    }
  });

  app
    .route(rotasJulgamento.arquivos)
    .get(julgControlador.handleArquivos())
    .post(julgControlador.handleArquivos())
    .put(julgControlador.handleArquivos())
    .delete(julgControlador.handleArquivos());

  app.use(rotasJulgamento.portalconselheiros, function (req, resp, next) {
    if (ACL.checaACL(req.user.perfis, 'conselheiro')) {
      next();
    } else {
      resp.render(403);
    }
  });

  app
    .route(rotasJulgamento.pegaAlegacao)
    .post(julgControlador.handleTabAlegacoes());

  app
    .route(rotasJulgamento.solicitacoes)
    .get(julgControlador.handleSolicitacoes())
    .post(julgControlador.handleSolicitacoes())
    .delete(julgControlador.handleSolicitacoes());

  app
    .route(rotasJulgamento.regsolicitacoes)
    .get(julgControlador.handleRegSolicitacoes())
    .post(julgControlador.handleRegSolicitacoes())
    .delete(julgControlador.handleRegSolicitacoes());

  app
    .route(rotasJulgamento.consolicitacoes)
    .get(julgControlador.handleConsSolicitacoes())
    .post(julgControlador.handleConsSolicitacoes())
    .delete(julgControlador.handleConsSolicitacoes());

  app
    .route(rotasJulgamento.indicapauta)
    .get(julgControlador.handleIndicaPauta())
    .delete(julgControlador.handleIndicaPauta());
  app.post(rotasJulgamento.gravaIndicacao, julgControlador.handleIndicaPauta());

  app.get(
    rotasJulgamento.conselheiros,
    julgControlador.carregaPortalConselheiros(),
  );

  app.get(
    rotasJulgamento.portalconselheiros,
    julgControlador.carregaPortalConselheiros(),
  );

  app.get(
    rotasJulgamento.paginaIndicacoes,
    julgControlador.carregaPaginaIndicacoes(),
  );

  app.get(
    rotasJulgamento.visualizaIndicacao,
    julgControlador.carregaPaginaVisualizaIndicacao(),
  );

  app.get(
    rotasJulgamento.regapindividual,
    julgControlador.carregaRegapIndividual(),
  );

  app.get(
    rotasJulgamento.reinpindividual,
    julgControlador.carregaReinpIndividual(),
  );

  //app.get(rotasJulgamento.listaregaps, julgControlador.listagemRegaps());

  app
    .route(rotasJulgamento.pegareinpindividual)
    .get(julgControlador.carregaPaginaReinp())
    .post(julgControlador.carregaPaginaReinp());

  app
    .route(rotasJulgamento.novoReinp)
    .get(julgControlador.carregaPaginaNovoReinp())
    .post(julgControlador.carregaPaginaNovoReinp());

  app.get(
    rotasJulgamento.ocorrencias,
    julgControlador.carregaOcorrenciasCons(),
  );

  app.post(
    rotasJulgamento.listaregapindividual,
    julgControlador.listaRegapIndividual(),
  );

  app.post(
    rotasJulgamento.regapcons,
    julgControlador.carregaTabelaConselheiros(),
  );
};
