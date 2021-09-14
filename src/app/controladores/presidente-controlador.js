const conn = require('../../config/mongodb').dados;
const mongo = require('../../config/mongodb').mongo;
const url = require('../../config/mongodb').url;
const db = require('../../config/mongodb').db;
const SuporteDAO = require('../infra/suporte-dao');
const JulgamentoDAO = require('../infra/julgamento-dao');
const PessoalDAO = require('../infra/pessoal-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');
const formidable = require('formidable');
const moment = require('moment');
const get_ip = require('ipware')().get_ip;
const tz = require('moment-timezone');
let sp = 'America/Sao_Paulo';
const { ObjectID } = require('mongodb');
const CSVHandler = require('../infra/helpers/CSVHandler');
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

class PresidenteControlador {
  static rotas() {
    return {
      autenticadas: '/presidente/restrito*',
      portalpresidente: '/presidente/restrito/portalpresidente',
    };
  }

  carregaPortalPresidente() {
    return function (req, resp) {
      const pessoalDao = new PessoalDAO(conn);
      const julgamentoDao = new JulgamentoDAO(conn);
      const suporteDao = new SuporteDAO(conn);
      pessoalDao.getUsers({ cpf: req.user.cpf }).then((user) => {
        julgamentoDao
          .getCal({
            classNames: CSVHandler.semanaCores(user[0].unidade),
          })
          .then((cal) => {
            suporteDao
              .getIndicacoes({
                semana: CSVHandler.semanaCores(user[0].unidade),
              })
              .then((indicacoes) => {
                resp.marko(templates.presidente.portalpresidente, {
                  cal: JSON.stringify(cal),
                  user: user[0],
                  pauta: JSON.stringify(indicacoes[0]),
                });
              });
          });
      });
    };
  }
}
module.exports = PresidenteControlador;
