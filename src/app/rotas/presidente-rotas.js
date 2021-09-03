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
      if (!req.user.cargo.includes('Vice', 0)) {
        if (
          req.user.cargo.includes('Presidente de TO', 0) ||
          req.user.cargo.includes('Presidente de TO Substituto', 0) ||
          req.user.cargo.includes('Presidente de TE', 0) ||
          req.user.cargo.includes('Presidente de TE Substituto', 0) ||
          req.user.cargo.includes('Presidente de Seção de Julgamento', 0) ||
          req.user.cargo.includes(
            'Presidente de Seção de Julgamento Substituto',
            0,
          )
        ) {
          req.user.perfis.push('presidente');
        }
      }
      console.log(req.user);
      next();
    } else {
      resp.redirect(rotasBase.login);
    }
  });

  app.get(
    rotasPresidente.portalpresidente,
    presiControlador.carregaPortalPresidente(),
  );
};
