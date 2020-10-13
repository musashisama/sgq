const JulgamentoControlador = require('../controladores/julgamento-controlador');
const julgControlador = new JulgamentoControlador();
const BaseControlador = require('../controladores/base-controlador');
const ACL = require('../infra/helpers/ACL');
const { gestaoconhecimento } = require('../views/julgamento');
const PessoalControlador = require('../controladores/pessoal-controlador');

module.exports = (app) => {
  const rotasJulgamento = JulgamentoControlador.rotas();
  const rotasBase = BaseControlador.rotas();
  const rotasPessoal = PessoalControlador.rotas();

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

  app.get(rotasJulgamento.faqdipaj, julgControlador.carregaFAQDipaj());
  app.get(rotasJulgamento.calendarioView, julgControlador.calendarioView());
  app.get(
    rotasJulgamento.gestaoconhecimento,
    julgControlador.carregaGestaoConhecimento(),
  );
  app
    .route(rotasJulgamento.formFAQ)
    .get(julgControlador.carregaFormFAQDipaj())
    .post(julgControlador.carregaFormFAQDipaj());

  app.use(rotasJulgamento.autenticadas, function (req, resp, next) {
    if (
      ACL.checaACL(req.user.perfis, 'julgamento') ||
      ACL.checaACL(req.user.perfis, 'serpro')
    ) {
      next();
    } else {
      resp.render(403);
    }
  });

  app.get(rotasJulgamento.regap, julgControlador.carregaPaginaRegap());
  app.get(rotasJulgamento.detalharegap, julgControlador.carregaPaginaRegap());
  app.get(
    rotasJulgamento.regapCojul,
    julgControlador.carregaPaginaRegapCojul(),
  );
  app.get(
    rotasJulgamento.analiseEstoque,
    julgControlador.carregaPaginaAnaliseEstoque(),
  );
  app.get(rotasJulgamento.reinp, julgControlador.carregaPaginaReinp());
  app.get(
    rotasJulgamento.detalhareinp,
    julgControlador.carregaPaginaDetalhaReinp(),
  );
  app.get(rotasJulgamento.escolhecsvregap, julgControlador.escolheCSVRegap());
  app.get(rotasJulgamento.escolhecsvreinp, julgControlador.escolheCSVReinp());
  app.get(rotasJulgamento.escolhecsv, julgControlador.escolheCSV());
  app.get(
    rotasJulgamento.escolhecsvanaliseestoque,
    julgControlador.escolheCSVAnaliseEstoque(),
  );
  app.get(rotasJulgamento.detalhaestoque, julgControlador.carregaPaginaDiag());
  app.get(rotasJulgamento.carregacsv, julgControlador.carregaPaginaInsereCSV());
  app.get(rotasJulgamento.portalCojul, julgControlador.carregaPortalCojul());
  app.post(rotasPessoal.getcadastro, julgControlador.getCadastro());

  app.use(rotasJulgamento.autenticadas, function (req, resp, next) {
    if (ACL.checaACL(req.user.perfis, 'julgamento')) {
      next();
    } else {
      resp.render(403);
    }
  });

  app
    .route(rotasJulgamento.cadastrafaqdipaj)
    .get(julgControlador.handleFAQDipaj())
    .post(julgControlador.handleFAQDipaj())
    .put(julgControlador.handleFAQDipaj())
    .delete(julgControlador.handleFAQDipaj());

  app
    .route(rotasJulgamento.arquivos)
    .get(julgControlador.handleArquivos())
    .post(julgControlador.handleArquivos())
    .put(julgControlador.handleArquivos())
    .delete(julgControlador.handleArquivos());

  app.get(rotasJulgamento.arqdown, julgControlador.arquivoDown());

  app
    .route(rotasJulgamento.gestaoPortalCojul)
    .get(julgControlador.handlePortalCojul())
    .post(julgControlador.handlePortalCojul())
    .put(julgControlador.handlePortalCojul())
    .delete(julgControlador.handlePortalCojul());

  app
    .route(rotasJulgamento.gestaoGC)
    .get(julgControlador.handleGC())
    .post(julgControlador.handleGC())
    .put(julgControlador.handleGC())
    .delete(julgControlador.handleGC());

  app
    .route(rotasJulgamento.gestaosolicitacoes)
    .get(julgControlador.handleSolicitacoes())
    .post(julgControlador.handleSolicitacoes());

  app
    .route(rotasJulgamento.enviacorrigereinp)
    .post(julgControlador.handleCorrigeReinp());

  app
    .route(rotasJulgamento.corrigereinp)
    .get(julgControlador.handleCorrigeReinp())
    .post(julgControlador.handleCorrigeReinp());

  app
    .route(rotasJulgamento.gestaorelatorios)
    .get(julgControlador.handleRelatorios())
    .delete(julgControlador.handleRelatorios());

  app.post(rotasJulgamento.carregacsv, julgControlador.carregaCSV());
  app
    .route(rotasJulgamento.calendario)
    .get(julgControlador.handleCalendario())
    .post(julgControlador.handleCalendario())
    .put(julgControlador.handleCalendario())
    .delete(julgControlador.handleCalendario());
};
