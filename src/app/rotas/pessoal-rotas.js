const PessoalControlador = require('../controladores/pessoal-controlador');
const pessoalControlador = new PessoalControlador();
const BaseControlador = require('../controladores/base-controlador');
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
  });

  app.use(rotasPessoal.autenticadas, function (req, resp, next) {
    req.session.baseUrl = req.baseUrl;
    if (req.isAuthenticated()) {
      next();
    } else {
      resp.redirect(rotasBase.login);
    }
  });

  app.use(rotasPessoal.autenticadas, function (req, resp, next) {
    if (
      ACL.checaACL(req.user.perfis, 'pessoal') ||
      ACL.checaACL(req.user.perfis, 'serpro')
    ) {
      next();
    } else {
      resp.render(403);
    }
  });

  app.get(rotasPessoal.agenda, pessoalControlador.carregaAgenda());
  app.get(rotasPessoal.cadastraCons, pessoalControlador.carregaPaginaCadCons());
  app.get(rotasPessoal.cadastraPess, pessoalControlador.carregaPaginaCadPess());
  app.get(rotasPessoal.pessoas, pessoalControlador.carregaPaginaPessoal());
  app.get(rotasPessoal.conselheiros, pessoalControlador.carregaPaginaCons());
  app.get(
    rotasPessoal.detalhaPess,
    pessoalControlador.carregaPaginaDetalhaPessoal(),
  );
  app.get(rotasPessoal.detalhacons, pessoalControlador.carregaPaginaDetCons());
  app.get(rotasPessoal.portalCogec, pessoalControlador.carregaPortalCogec());
  app.post(rotasPessoal.getcadastro, pessoalControlador.getCadastro());

  app.use(rotasPessoal.autenticadas, function (req, resp, next) {
    if (ACL.checaACL(req.user.perfis, 'pessoal')) {
      next();
    } else {
      resp.render(403);
    }
  });

  app
    .route(rotasPessoal.gestaoPortalCogec)
    .get(pessoalControlador.handlePortalCogec())
    .post(pessoalControlador.handlePortalCogec())
    .put(pessoalControlador.handlePortalCogec())
    .delete(pessoalControlador.handlePortalCogec());

  app.post(rotasPessoal.cadastraPess, pessoalControlador.cadastraPess());
  app.post(rotasPessoal.cadastraCons, pessoalControlador.cadastraCons());
  app.post(rotasPessoal.detalhaPess, pessoalControlador.editaPessoa());
  app.post(rotasPessoal.detalhacons, pessoalControlador.editaCons());
  app.post(rotasPessoal.pessoas, pessoalControlador.carregaPaginaPessoal());
  app.post(rotasPessoal.conselheiros, pessoalControlador.carregaPaginaCons());
  app.post(
    rotasPessoal.insOcorrenciaPess,
    pessoalControlador.insereOcorrenciaPess(),
  );
  app.put(
    rotasPessoal.editaOcorrenciaPess,
    pessoalControlador.editaOcorrenciaPess(),
  );
  app.delete(
    rotasPessoal.excluiOcorrenciaPess,
    pessoalControlador.excluiOcorrenciaPess(),
  );
  app.post(rotasPessoal.insOcorrencia, pessoalControlador.insereOcorrencia());
  app.put(rotasPessoal.editaOcorrencia, pessoalControlador.editaOcorrencia());
  app.delete(
    rotasPessoal.excluiOcorrencia,
    pessoalControlador.excluiOcorrencia(),
  );
};
