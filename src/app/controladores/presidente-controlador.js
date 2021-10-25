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
      regap_consolidado: '/presidente/restrito/regap_consolidado/',
      regap_individual_presi:
        '/presidente/restrito/regap_consolidado/detalha/:id',
      reinp: '/presidente/restrito/reinp/',
      detalhareinp: '/presidente/restrito/reinp/detalha/:id',
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
                julgamentoDao
                  .getPortal({ portal: 'presidente' })
                  .then((portal) => {
                    resp.marko(templates.presidente.portalpresidente, {
                      cal: JSON.stringify(cal),
                      user: user[0],
                      pauta: JSON.stringify(indicacoes[0]),
                      portal: JSON.stringify(portal),
                    });
                  });
              });
          });
      });
    };
  }

  carregaRegapConsolidado() {
    return function (req, resp) {
      if (req.method === 'GET') {
        resp.marko(templates.presidente.regap_consolidado);
      }
      if (req.method === 'POST') {
        const julgamentoDao = new JulgamentoDAO(conn);
        let filtro, sort, projecao;
        if (req.body.get == 'listagem') {
          filtro = 'dtRel';
          projecao = {};
          sort = { dtRel: -1 };
          julgamentoDao
            .getRegapDistinct(filtro, sort, projecao)
            .then((regap) => {
              resp.json(regap);
            });
        }
        if (req.body.get == 'relatorio') {
          filtro = {
            $and: [
              { dtRel: +req.body.dtRel },
              { 'conselheiro.equipe': req.user.unidade },
            ],
          };
          projecao = {};
          sort = { 'relatorio.processo': 1 };
          julgamentoDao.getRegap(filtro, sort, projecao).then((regap) => {
            resp.json(regap);
          });
        }
      }
    };
  }

  carregaRegapConsDetalha() {
    return function (req, resp) {
      if (req.method === 'GET') {
        let params = req.params.id.split('&');
        let projecao = { relatorio: 1, _id: 0 };
        let sort = { 'relatorio.processo': 1 };
        let filtro = {
          $and: [
            { dtRel: +params[1] },
            {
              'conselheiro.cpf': params[0],
            },
          ],
        };
        const julgamentoDao = new JulgamentoDAO(conn);
        const pessoalDao = new PessoalDao(conn);
        pessoalDao.getUsers({ cpf: params[0] }).then((user) => {
          julgamentoDao
            .getCal({
              classNames: CSVHandler.semanaCores(user[0].unidade),
            })
            .then((cal) => {
              julgamentoDao.getRegap(filtro, sort, projecao).then((regap) => {
                resp.marko(templates.presidente.regap_individual_presidente, {
                  relatorio: JSON.stringify(regap[0].relatorio),
                  cal: JSON.stringify(cal),
                  user: user[0],
                });
              });
            });
        });
      }
      if (req.method === 'POST') {
        const julgamentoDao = new JulgamentoDao(conn);
        let filtro, sort, projecao;
        if (req.body.get == 'listagem') {
          filtro = 'dtRel';
          projecao = {};
          sort = { dtRel: -1 };
          julgamentoDao
            .getRegapDistinct(filtro, sort, projecao)
            .then((regap) => {
              resp.json(regap);
            });
        }
        if (req.body.get == 'relatorio') {
          req.body.semana == 'Todas'
            ? (filtro = { dtRel: +req.body.dtRel })
            : (filtro = {
                $and: [
                  { dtRel: +req.body.dtRel },
                  {
                    'conselheiro.semana': req.body.semana,
                  },
                ],
              });
          projecao = {};
          sort = { 'relatorio.processo': 1 };
          julgamentoDao.getRegap(filtro, sort, projecao).then((regap) => {
            resp.json(regap);
          });
        }
      }
    };
  }

  carregaPaginaReinp() {
    return function (req, resp) {
      if (req.method === 'GET') {
        resp.marko(templates.presidente.reinpgeral);
      }
      if (req.method === 'POST') {
        const julgamentoDao = new JulgamentoDAO(conn);
        let filtro, sort, projecao;
        if (req.body.get == 'listagem') {
          filtro = 'ano';
          projecao = {};
          sort = { ano: -1 };
          julgamentoDao.getAnosReinp(filtro, sort, projecao).then((reinp) => {
            resp.json(reinp);
          });
        }
        if (req.body.get == 'relatorio') {
          let filtro = {};
          let cpf = req.user.cpf;
          if (req.body.tipo == 'conselheiro') {
            filtro = {
              $and: [{ ano: req.body.ano }, { cpf: cpf }],
            };
          } else {
            filtro = {
              $and: [{ ano: req.body.ano }, { unidade: req.user.unidade }],
            };
          }
          projecao = {};
          sort = {};
          julgamentoDao.getReinp(filtro, sort, projecao).then((reinp) => {
            resp.json(reinp);
          });
        }
      }
    };
  }

  carregaPaginaDetalhaReinp() {
    return function (req, resp) {
      let parametros = req.params.id.split('&');
      let ano = parametros[1];
      let cpf = parametros[0];
      let filtro = {
        $and: [{ cpf: cpf }, { ano: ano }],
      };
      const julgamentoDao = new JulgamentoDAO(conn);
      julgamentoDao.getReinp(filtro).then((dados) => {
        const pessoalDao = new PessoalDAO(conn);
        pessoalDao.getUsers({ cpf: cpf }).then((user) => {
          resp.marko(templates.presidente.detalhareinp, {
            reinp: JSON.stringify(dados),
            user: JSON.stringify(user[0]),
            nome: user[0].nome,
            cpf: user[0].cpf,
            turma: user[0].turma,
            camara: user[0].camara,
            setor: user[0].setor,
            unidade: user[0].unidade,
            dtFimMandato: user[0].dtFimMandato,
            tipo: user[0].tipo,
          });
        });
      });
    };
  }

  carregaOrdenaPauta() {
    return function (req, resp) {};
  }
  carregaPautas() {
    return function (req, resp) {};
  }
}
module.exports = PresidenteControlador;
