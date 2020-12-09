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
      resp.set('autenticado', true);
      next();
    } else {
      resp.redirect(rotasBase.login);
    }
  });

  app.use(rotasPessoal.autenticadas, function (req, resp, next) {
    if (
      ACL.checaACL(req.user.perfis, 'suporte') ||
      ACL.checaACL(req.user.perfis, 'serpro')
    ) {
      next();
    } else {
      resp.render(403);
    }
  });

  app.use(rotasPessoal.autenticadas, function (req, resp, next) {
    if (ACL.checaACL(req.user.perfis, 'suporte')) {
      next();
    } else {
      resp.render(403);
    }
  });
};
