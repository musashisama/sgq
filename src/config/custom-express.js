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

app.use('/estatico', express.static('src/app/public'));
app.use(favicon(path.join('../','sgq/src/app/public/imagens/favicon.ico')));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

sessaoAutenticacao(app);
rotas(app);

app.use(function (erro, req, resp, next) {
  return resp.status(403).marko(
      require('../app/views/base/erros/403.marko')
  );
});

app.use(function (req, resp, next) {
  return resp.status(404).marko(
      require('../app/views/base/erros/404.marko')
  );
});

app.use(function (erro, req, resp, next) {
  return resp.status(500).marko(
      require('../app/views/base/erros/500.marko')
  );
});

module.exports = app;