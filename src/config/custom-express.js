require('marko/node-require').install();
require('marko/express');
var path = require('path');
var favicon = require('serve-favicon');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sessaoAutenticacao = require('./auth');
const rotas = require('../app/rotas/rotas');
const BaseDao = require('../app/infra/base-dao');
const conn = require('./mongodb').dados;

app.use('/estatico', express.static('src/app/public'));
app.use(favicon(path.join('../', 'sgq/src/app/public/imagens/favicon.ico')));

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);

sessaoAutenticacao(app);

//Logger:
app.use('/*', function (req, resp, next) {
  if (req.baseUrl != '') {
    let registro = {};
    registro.url = req.baseUrl;
    req.baseUrl == '/login'
      ? (registro.corpo = null)
      : (registro.corpo = req.body);
    registro.metodo = req.method;
    registro.timestamp = new Date().toISOString();
    req.isAuthenticated()
      ? (registro['usuarioLogado'] = req.user.cpf)
      : (registro['usuarioLogado'] = 'Não Logado');
    const requestIp = require('request-ip');
    registro['clientIP'] = requestIp.getClientIp(req);
    const baseDao = new BaseDao(conn);
    baseDao
      .logger(registro)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  next();
});

rotas(app);

app.use(function (erro, req, resp, next) {
  return resp.status(403).marko(require('../app/views/base/erros/403.marko'));
});

app.use(function (req, resp, next) {
  return resp.status(404).marko(require('../app/views/base/erros/404.marko'));
});

app.use(function (erro, req, resp, next) {
  return resp.status(500).marko(require('../app/views/base/erros/500.marko'));
});

module.exports = app;
