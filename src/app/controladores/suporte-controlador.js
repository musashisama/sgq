const conn = require('../../config/mongodb').dados;
const mongo = require('../../config/mongodb').mongo;
const url = require('../../config/mongodb').url;
const db = require('../../config/mongodb').db;
const SuporteDAO = require('../infra/suporte-dao');
const JulgamentoDao = require('../infra/julgamento-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');
const formidable = require('formidable');
const moment = require('moment');
const get_ip = require('ipware')().get_ip;
const tz = require('moment-timezone');
let sp = 'America/Sao_Paulo';
const { ObjectID } = require('mongodb');
moment.updateLocale('en', {
  relativeTime: {
    future: 'em %s',
    past: 'há %s',
    s: 'poucos segundos',
    ss: '%d segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    w: 'uma semana',
    ww: '%d semanas',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos',
  },
});
const Mailer = require('../infra/helpers/Mailer');

class SuporteControlador {
  static rotas() {
    return {
      autenticadas: '/suporte/restrito*',
      gestaoIndicacao: '/suporte/restrito/gestao-indicacao',
      criaIndicacao: '/suporte/restrito/cria-indicacao',
      handle_periodo: '/suporte/restrito/handle-periodo',
      portalCosup: '/suporte/restrito/portalcosup',
      gestaoPortalCosup: '/suporte/restrito/gestaoportalcosup',
      gerenciaPeriodo: '/suporte/restrito/gerencia-periodo/:id',
      editaPeriodo: '/suporte/restrito/edita-periodo/:id',
    };
  }

  handlePortalCosup() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const julgamentoDao = new JulgamentoDao(conn);
        julgamentoDao.getPortal({ portal: 'cosup' }).then((msg) => {
          resp.marko(templates.suporte.gestaoPortalCosup, {
            portal: JSON.stringify(msg),
          });
        });
      } else {
        const julgamentoDao = new JulgamentoDao(conn);
        if (req.method == 'POST' || req.method == 'PUT') {
          julgamentoDao
            .getPortal({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              if (!msg[0]) {
                julgamentoDao.inserePortal(req.body).then((msg) => {
                  resp.json(msg);
                });
              } else {
                julgamentoDao
                  .atualizaPortal({ uniqueId: req.body.uniqueId }, req.body)
                  .then((msg) => {
                    resp.json(msg);
                  });
              }
            });
        } else if (req.method == 'DELETE') {
          console.log('delete');
          console.log(req.body);
          julgamentoDao
            .excluiPortal({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              resp.json(msg);
            });
        }
      }
    };
  }

  carregaPortalCosup() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      julgamentoDao.getPortal({ portal: 'cosup' }).then((portal) => {
        resp.marko(templates.suporte.portalCosup, {
          portal: JSON.stringify(portal),
        });
      });
    };
  }

  carregaGestaoIndicacao() {
    return function (req, resp) {
      const suporteDAO = new SuporteDAO(conn);
      suporteDAO.getIndicacoes().then((msg) => {
        resp.marko(templates.suporte.gestaoIndicacao, {
          indicacoes: JSON.stringify(msg),
        });
      });
    };
  }

  carregaCriaIndicacao() {
    return function (req, resp) {
      resp.marko(templates.suporte.criaIndicacao);
    };
  }

  carregaEditaIndicacao() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const suporteDAO = new SuporteDAO(conn);
        suporteDAO
          .getIndicacoes({ _id: new ObjectID(req.params.id) })
          .then((indicacao) => {
            resp.marko(templates.suporte.editaIndicacao, {
              indicacao: JSON.stringify(indicacao),
            });
          });
      } else if (req.method == 'POST') {
        let id = new ObjectID(req.body._id);
        delete req.body._id;
        const suporteDAO = new SuporteDAO(conn);
        suporteDAO.atualizaPeriodo({ _id: id }, req.body).then((result) => {
          resp.send(result);
        });
      }
    };
  }

  handlePeriodo() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const suporteDAO = new SuporteDAO(conn);
        suporteDAO.getIndicacoes().then((msg) => {
          resp.marko(templates.suporte.gestaoIndicacao, {
            indicacoes: JSON.stringify(msg),
          });
        });
      } else {
        if (req.method == 'POST' || req.method == 'PUT') {
          const suporteDAO = new SuporteDAO(conn);
          suporteDAO.criaIndicacao(req.body).then((result) => {
            resp.send(result);
          });
        } else if (req.method == 'DELETE') {
          julgamentoDao
            .excluiPortal({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              resp.json(msg);
            });
        }
      }
    };
  }
  gerenciaPeriodo() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const suporteDAO = new SuporteDAO(conn);
        suporteDAO
          .getIndicacoes({ _id: new ObjectID(req.params.id) })
          .then((msg) => {
            console.log(msg);
            resp.marko(templates.suporte.gerenciaPeriodo, {
              periodo: JSON.stringify(msg),
            });
          });
      } else {
        if (req.method == 'POST' || req.method == 'PUT') {
          const suporteDAO = new SuporteDAO(conn);
          suporteDAO.criaIndicacao(req.body).then((result) => {
            resp.send(result);
          });
        } else if (req.method == 'DELETE') {
          julgamentoDao
            .excluiPortal({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              resp.json(msg);
            });
        }
      }
    };
  }
}
module.exports = SuporteControlador;
