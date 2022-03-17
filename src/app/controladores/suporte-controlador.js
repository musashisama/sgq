const conn = require('../../config/mongodb').dados;
const mongo = require('../../config/mongodb').mongo;
const url = require('../../config/mongodb').url;
const db = require('../../config/mongodb').db;
const SuporteDAO = require('../infra/suporte-dao');
const JulgamentoDAO = require('../infra/julgamento-dao');
const PessoalDAO = require('../infra/pessoal-dao');
const BaseDao = require('../infra/base-dao');
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
      gerenciaColegiado: '/suporte/restrito/gerencia-colegiado/:id',
      editaPeriodo: '/suporte/restrito/edita-periodo/:id',
      consolidacaoPauta: '/suporte/restrito/consolida-pauta/',
      visualizaPauta: '/suporte/restrito/visualiza-pauta/:id',
    };
  }

  handlePortalCosup() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const julgamentoDao = new JulgamentoDAO(conn);
        julgamentoDao.getPortal({ portal: 'cosup' }).then((msg) => {
          resp.marko(templates.suporte.gestaoPortalCosup, {
            portal: JSON.stringify(msg),
          });
        });
      } else {
        const julgamentoDao = new JulgamentoDAO(conn);
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
      const julgamentoDao = new JulgamentoDAO(conn);
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
      suporteDAO.getPeriodosIndicacoes().then((msg) => {
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
        let id = new ObjectID(req.params.id);
        const suporteDAO = new SuporteDAO(conn);
        // const julgamentoDao = new JulgamentoDAO(conn);
        // const pessoalDao = new pessoalDAO(conn);
        suporteDAO
          .getPeriodosIndicacoes({ _id: new ObjectID(id) })
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
        suporteDAO.getPeriodosIndicacoes().then((msg) => {
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
      const suporteDAO = new SuporteDAO(conn);
      const julgamentoDAO = new JulgamentoDAO(conn);
      const pessoalDAO = new PessoalDAO(conn);
      if (req.method == 'GET') {
        pessoalDAO
          .getUsers({ $and: [{ cargo: 'Conselheiro' }, { mandatoAt: 'Sim' }] })
          .then((users) => {
            suporteDAO
              .getPeriodosIndicacoes({ _id: new ObjectID(req.params.id) })
              .then((msg) => {
                users.forEach((user) => {
                  if (
                    user.unidade == '1ª CÂMARA-1ªSEÇÃO-CARF-MF-DF' ||
                    user.unidade == '2ª CÂMARA-1ªSEÇÃO-CARF-MF-DF' ||
                    user.unidade == '3ª CÂMARA-1ªSEÇÃO-CARF-MF-DF' ||
                    user.unidade == '4ª CÂMARA-1ªSEÇÃO-CARF-MF-DF'
                  ) {
                    user.unidade = '1ª TURMA-CSRF-CARF-MF-DF';
                  }
                  if (
                    user.unidade == '1ª CÂMARA-2ªSEÇÃO-CARF-MF-DF' ||
                    user.unidade == '2ª CÂMARA-2ªSEÇÃO-CARF-MF-DF' ||
                    user.unidade == '3ª CÂMARA-2ªSEÇÃO-CARF-MF-DF' ||
                    user.unidade == '4ª CÂMARA-2ªSEÇÃO-CARF-MF-DF'
                  ) {
                    user.unidade = '2ª TURMA-CSRF-CARF-MF-DF';
                  }
                  if (
                    user.unidade == '1ª CÂMARA-3ªSEÇÃO-CARF-MF-DF' ||
                    user.unidade == '2ª CÂMARA-3ªSEÇÃO-CARF-MF-DF' ||
                    user.unidade == '3ª CÂMARA-3ªSEÇÃO-CARF-MF-DF' ||
                    user.unidade == '4ª CÂMARA-3ªSEÇÃO-CARF-MF-DF'
                  ) {
                    user.unidade = '3ª TURMA-CSRF-CARF-MF-DF';
                  }
                });
                suporteDAO
                  .getIndicacoesPauta(
                    { idIndicacao: req.params.id },
                    { processos: 0 },
                  )
                  .then((indicacoes) => {
                    suporteDAO
                      .getPautas(
                        { idIndicacao: req.params.id },
                        { _id: -1 },
                        { pauta: 0 },
                      )
                      .then((pautas) => {
                        resp.marko(templates.suporte.gerenciaPeriodo, {
                          periodo: JSON.stringify(msg),
                          cons: JSON.stringify(users),
                          indicacoes: JSON.stringify(indicacoes),
                          pautas: JSON.stringify(pautas),
                        });
                      });
                  });
              });
          });
      } else {
        if (req.method == 'POST' || req.method == 'PUT') {
          suporteDAO.criaIndicacao(req.body).then((result) => {
            resp.send(result);
          });
        } else if (req.method == 'DELETE') {
          julgamentoDAO
            .excluiPortal({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              resp.json(msg);
            });
        }
      }
    };
  }

  consolidaPauta() {
    return function (req, resp) {
      if (req.method == 'POST') {
        req.body.tipoPauta = 'Consolidada';
        req.body.usuarioSEPAJ = req.user.cpf;
        const suporteDAO = new SuporteDAO(conn);
        suporteDAO.inserePautaConsolidada(req.body).then((res) => {
          resp.send(res);
        });
        //resp.send('OK');
      }
    };
  }

  gerenciaColegiado() {
    return function (req, resp) {
      const suporteDAO = new SuporteDAO(conn);
      const julgamentoDAO = new JulgamentoDAO(conn);
      const pessoalDAO = new PessoalDAO(conn);
      const baseDAO = new BaseDao(conn);
      if (req.method == 'GET') {
        let parametros = req.params.id.split('&');
        suporteDAO
          .getIndicacoesPauta({
            $and: [
              { idIndicacao: parametros[0] },
              { colegiado: parametros[1] },
            ],
          })
          .then((pauta) => {
            baseDAO.getAlegacoes().then((alegacoes) => {
              resp.marko(templates.suporte.gerenciaPauta, {
                pauta: JSON.stringify(pauta),
                idIndicacao: JSON.stringify(parametros[0]),
                colegiado: JSON.stringify(parametros[1]),
                alega: JSON.stringify(alegacoes),
              });
            });
          });
      } else {
        if (req.method == 'POST' || req.method == 'PUT') {
          console.log(req.body);
          // suporteDAO.criaIndicacao(req.body).then((result) => {
          //   resp.send(result);
          // });
        } else if (req.method == 'DELETE') {
          julgamentoDAO
            .excluiPortal({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              resp.json(msg);
            });
        }
      }
    };
  }

  carregaVisualizaPauta() {
    return function (req, resp) {
      if (req.method == 'GET') {
        let parametros = req.params.id.split('&');
        const suporteDAO = new SuporteDAO(conn);
        suporteDAO
          .getPautas({
            $and: [
              { idIndicacao: parametros[0] },
              { colegiado: parametros[1] },
              { tipoPauta: parametros[2] },
            ],
          })
          .then((pauta) => {
            suporteDAO
              .getPeriodosIndicacoes({ _id: new ObjectID(parametros[0]) })
              .then((msg) => {
                resp.marko(templates.suporte.visualizaPauta, {
                  pauta: JSON.stringify(pauta[0]),
                  periodo: JSON.stringify(msg[0]),
                });
              });
          });
      }
    };
  }
}
module.exports = SuporteControlador;
