const conn = require('../../config/mongodb').dados;
const Binary = require('mongodb').Binary;
const JulgamentoDao = require('../infra/julgamento-dao');
const FileDao = require('../infra/file-dao');
const PessoalDao = require('../infra/pessoal-dao');
const BaseDao = require('../infra/base-dao');
const SuporteDao = require('../infra/suporte-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');
const formidable = require('formidable');
const moment = require('moment');
const get_ip = require('ipware')().get_ip;
const tz = require('moment-timezone');
let sp = 'America/Sao_Paulo';
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
const ACL = require('../infra/helpers/ACL');
const fs = require('fs');
const fse = require('fs-extra');
const d3 = require('d3');
const CSVHandler = require('../infra/helpers/CSVHandler');
const regapHandler = require('../infra/helpers/regapHandler');
const { ObjectID } = require('mongodb');
const path = 'src/app/arquivos/csv/';
let registro = {};
const url = require('url');
const pessoal = require('../views/pessoal');
let dados = [];
let nome = '';
let newpath = '';

class JulgamentoControlador {
  static rotas() {
    return {
      autenticadas: '/julgamento/restrito*',
      calendario: '/julgamento/restrito/calendario/:id',
      calendarioView: '/julgamento/calendario',
      faqdipaj: '/julgamento/faqdipaj',
      gestaoconhecimento: '/julgamento/gestaoconhecimento',
      formFAQ: '/julgamento/restrito/formfaq',
      portalCojul: '/julgamento/restrito/portalcojul',
      gestaoPortalCojul: '/julgamento/restrito/gestaoportalcojul',
      gestaosolicitacoes: '/julgamento/restrito/gestaosolicitacoes',
      gestaoregsolicitacoes: '/julgamento/restrito/gestaoregsolicitacoes',
      detalhasolicitacao: '/julgamento/restrito/detalhasolicitacao/:id',
      cadastrafaqdipaj: '/julgamento/restrito/cadastrafaqdipaj/:id',
      gestaoGC: '/julgamento/restrito/gestaoGC/:id',
      arqdown: '/julgamento/restrito/arqdown/:id',
      //RELATORIOS COJUL
      estoque: '/julgamento/restrito/diagnostico-carga',
      estoque_conselheiros: '/julgamento/restrito/estoque_conselheiros',
      carregacsv: '/julgamento/restrito/carrega-csv',
      escolhecsv: '/julgamento/restrito/escolhe-csv',
      escolhecsvregap: '/julgamento/restrito/escolhe-csv-regap',
      escolhecsvreinp: '/julgamento/restrito/escolhe-csv-reinp',
      escolhecsvanaliseestoque:
        '/julgamento/restrito/escolhe-csv-analiseEstoque',
      reinp: '/julgamento/restrito/reinp/',
      enviacorrigereinp: '/julgamento/restrito/corrigereinp/envia',
      corrigereinp: '/julgamento/restrito/corrigereinp/:id',
      detalhareinp: '/julgamento/restrito/reinp/detalha/:id',
      escolhecsvcons: '/julgamento/restrito/escolhe-csv-cons',
      detalhaestoque: '/julgamento/restrito/diagnostico-carga/:id',
      regapCojul: '/julgamento/restrito/regap-cojul/:id',
      analiseEstoque: '/julgamento/restrito/analise-estoque/:id',
      detalhaAnEstoque: '/julgamento/restrito/analise-estoque/detalha/:id',
      detalharegap: '/julgamento/restrito/regap-cojul/detalha/:id',
      regap: '/julgamento/restrito/regap/:id',
      regap_individual_cojul:
        '/julgamento/restrito/regap_consolidado/detalha/:id',
      regap_consolidado: '/julgamento/restrito/regap_consolidado/',
      indicasdores_cig: '/julgamento/restrito/indicadores_cig/',
      gestaorelatorios: '/julgamento/restrito/relatorios/',
      relatorios_antigos: '/julgamento/restrito/relatorios_antigos/',
      //CONSELHEIROS
      portalconselheiros: '/julgamento/conselheiros/portalconselheiros',
      conselheiros: '/julgamento/conselheiros',
      solicitacoes: '/julgamento/conselheiros/solicitacoes',
      ocorrencias: '/julgamento/conselheiros/ocorrencias',
      regsolicitacoes: '/julgamento/conselheiros/registro-solicitacoes',
      consolicitacoes: '/julgamento/conselheiros/acompanha-solicitacoes',
      arquivos: '/julgamento/conselheiros/arquivos',
      regapindividual: '/julgamento/conselheiros/regap',
      pegaAlegacao: '/julgamento/conselheiros/pega-alegacao',
      reinpindividual: '/julgamento/conselheiros/reinp',
      listaregapindividual: '/julgamento/conselheiros/listaregap',
      regapcons: '/julgamento/conselheiros/:id',
      indicapauta: '/julgamento/conselheiros/indicacao-pauta/:id',
      gravaIndicacao: '/julgamento/conselheiros/grava-indicacao-pauta/',
      paginaIndicacoes: '/julgamento/conselheiros/gestao-indicacoes',
      //PRESIDENTES
      gestaoportalpresidente: '/julgamento/restrito/gestaoportalpresidente',
      //APURAÇÕES ESPECIAIS
      apes749: '/julgamento/apes749/',
    };
  }

  apes749() {
    return function (req, resp) {
      if (req.method == 'POST') {
        if (req.body.apes == 'apes749') {
          if (req.body.tipo == 'cojul') {
            const julgamentoDao = new JulgamentoDao(conn);
            julgamentoDao.getAPES().then((apes) => {
              resp.json(apes);
            });
          }
          if (req.body.tipo == 'cons') {
            const julgamentoDao = new JulgamentoDao(conn);
            julgamentoDao.getAPES({ cpf: req.user.cpf }).then((apes) => {
              resp.json(apes);
            });
          }
        }
      }
      if (req.method == 'PUT') {
        const julgamentoDao = new JulgamentoDao(conn);
        julgamentoDao
          .updateAPES([req.body.processo], req.body.solicitacao)
          .then((apes) => {
            resp.json(apes);
          });
      }
    };
  }

  handleIndicadores() {
    return function (req, resp) {
      resp.marko(templates.julgamento.indicadores_CIG);
    };
  }

  handlePortalCojul() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const julgamentoDao = new JulgamentoDao(conn);
        julgamentoDao.getPortal({ portal: 'cojul' }).then((msg) => {
          resp.marko(templates.julgamento.gestaoPortal, {
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

  carregaPortalCojul() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      julgamentoDao.getPortal({ portal: 'cojul' }).then((portal) => {
        resp.marko(templates.julgamento.portalCojul, {
          portal: JSON.stringify(portal),
        });
      });
    };
  }

  carregaPortalConselheiro() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      julgamentoDao.getPortal({ portal: 'conselheiro' }).then((portal) => {
        resp.marko(templates.julgamento.portaldoconselheiro, {
          portal: JSON.stringify(portal),
        });
      });
    };
  }

  handlePortalPresidente() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const julgamentoDao = new JulgamentoDao(conn);
        julgamentoDao.getPortal({ portal: 'presidente' }).then((msg) => {
          resp.marko(templates.presidente.gestaoportalpresidente, {
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

  handleFAQDipaj() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const julgamentoDao = new JulgamentoDao(conn);
        julgamentoDao.getFAQ().then((msg) => {
          resp.marko(templates.julgamento.cadastrafaqdipaj, {
            faq: JSON.stringify(msg),
          });
        });
      } else {
        const julgamentoDao = new JulgamentoDao(conn);
        if (req.method == 'POST' || req.method == 'PUT') {
          julgamentoDao.getFAQ({ uniqueId: req.body.uniqueId }).then((msg) => {
            if (!msg[0]) {
              julgamentoDao.insereFAQ(req.body).then((msg) => {
                resp.json(msg);
              });
            } else {
              julgamentoDao
                .atualizaFAQ({ uniqueId: req.body.uniqueId }, req.body)
                .then((msg) => {
                  resp.json(msg);
                });
            }
          });
        } else if (req.method == 'DELETE') {
          console.log('delete');
          console.log(req.body);
          julgamentoDao
            .excluiFAQ({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              resp.json(msg);
            });
        }
      }
    };
  }

  carregaFAQDipaj() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      julgamentoDao.getFAQ().then((faq) => {
        resp.marko(templates.julgamento.faqdipaj, { faq: JSON.stringify(faq) });
      });
    };
  }

  carregaFormFAQDipaj() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const julgamentoDao = new JulgamentoDao(conn);
        julgamentoDao.getFAQ().then((faq) => {
          resp.marko(templates.julgamento.formFAQ, {
            faq: JSON.stringify(faq),
          });
        });
      } else {
        if (req.method == 'POST') {
          let corpo = `Pergunta enviada em ${moment().format(
            'DD/MM/YYYY HH:mm',
          )}  por ${req.user.nome}, CPF: ${req.user.cpf}<br/>
                    <strong>Pergunta:</strong><br/>
                    <em>${req.body.pergunta}</em>`;
          const Mailer = require('../infra/helpers/Mailer');
          Mailer.enviaMail(
            'dipaj@carf.economia.gov.br',
            '[SGI-CARF] Sugestão de pergunta para o FAQ',
            corpo,
          );
          resp.json('Ok');
        }
      }
    };
  }

  handleGC() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const julgamentoDao = new JulgamentoDao(conn);
        julgamentoDao.getGC().then((msg) => {
          resp.marko(templates.julgamento.gestaoGC, {
            gc: JSON.stringify(msg),
          });
        });
      } else {
        const julgamentoDao = new JulgamentoDao(conn);
        if (req.method == 'POST' || req.method == 'PUT') {
          julgamentoDao.getGC({ uniqueId: req.body.uniqueId }).then((msg) => {
            if (!msg[0]) {
              julgamentoDao.insereGC(req.body).then((msg) => {
                resp.json(msg);
              });
            } else {
              julgamentoDao
                .atualizaGC({ uniqueId: req.body.uniqueId }, req.body)
                .then((msg) => {
                  resp.json(msg);
                });
            }
          });
        } else if (req.method == 'DELETE') {
          console.log('delete');
          console.log(req.body);
          julgamentoDao
            .excluiGC({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              resp.json(msg);
            });
        }
      }
    };
  }

  carregaGestaoConhecimento() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      julgamentoDao.getGC({ portal: 'cojul' }, { uniqueId: -1 }).then((msg) => {
        resp.marko(templates.julgamento.gestaoconhecimento, {
          gc: JSON.stringify(msg),
        });
      });
    };
  }

  carregaPaginaConselheiros() {
    return function (req, resp) {
      let semana = CSVHandler.semanaCores(req.user.unidade);
      const pessoalDao = new PessoalDao(conn);
      pessoalDao.getUsers({ cpf: req.user.cpf }).then((user) => {
        const julgamentoDao = new JulgamentoDao(conn);
        julgamentoDao
          .getRelatorios({
            $and: [{ tipoRel: 'REGAP' }, { semana: semana }],
          })
          .then((dados) => {
            dados.forEach((dado) => {
              dado.id = dado._id;
              dado.semana = dado.semana;
              dado.dataEnvio = dado.dataEnvio;
              dado.dtExtracao = dado.dtExtracao;
            });
            julgamentoDao
              .getReinp({ 'conselheiro.cpf': req.user.cpf })
              .then((reinp) => {
                julgamentoDao
                  .getCal({
                    classNames: CSVHandler.semanaCores(user[0].unidade),
                  })
                  .then((cal) => {
                    const pessoalDao = new PessoalDao(conn);
                    pessoalDao
                      .getSolicitacoes({ cpf: req.user.cpf })
                      .then((solicitacoes) => {
                        pessoalDao
                          .gettpSolicitacoes({}, {}, { tipoSolicitacao: 1 })
                          .then((tpSol) => {
                            pessoalDao
                              .getOcorrencias({ cpf: req.user.cpf })
                              .then((ocorrencias) => {
                                resp.marko(
                                  templates.julgamento.paginadoconselheiro,
                                  {
                                    user: user[0],
                                    cal: JSON.stringify(cal),
                                    reinp: JSON.stringify(reinp),
                                    dados: dados,
                                    ocorrencias: JSON.stringify(ocorrencias),
                                    solicitacoes: JSON.stringify(solicitacoes),
                                    tpSol: tpSol,
                                  },
                                );
                              });
                          });
                      });
                  });
              });
          });
      });
    };
  }

  carregaTabelaConselheiros() {
    return function (req, resp) {
      let CPF = req.user.cpf;
      let id = new ObjectID(req.params.id);
      const julgamentoDao = new JulgamentoDao(conn);
      julgamentoDao.getRelatorios({ _id: id }).then((rel) => {
        let caminho = rel[0].caminho;
        if (rel[0].tipoRel == 'REGAP' || rel[0].tipoRel == 'Estoque') {
          dados = CSVHandler.pegaRegap(`${caminho}`, 'CONS', CPF).then(
            (dados) => {
              resp.send(dados);
            },
          );
        } else if (rel[0].tipoRel == 'REINP') {
          dados = CSVHandler.pegaReinp(`${caminho}`, CPF).then((dados) => {
            resp.send(dados);
          });
        }
      });
    };
  }

  handleSolicitacoes() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const pessoalDao = new PessoalDao(conn);
        if (
          req.user.perfis.includes('julgamento') &&
          req.session.baseUrl == '/julgamento/restrito/gestaosolicitacoes'
        ) {
          pessoalDao.getSolicitacoes({}).then((msg) => {
            resp.marko(templates.julgamento.gestaosolicitacoes, {
              solicitacoes: JSON.stringify(msg),
            });
          });
        }
        if (
          req.user.perfis.includes('conselheiro') &&
          req.session.baseUrl == '/julgamento/conselheiros'
        ) {
          let cpf = req.user.cpf;
          pessoalDao.getSolicitacoes({ cpf: cpf }).then((msg) => {
            resp.json(msg);
          });
        }
      } else {
        const pessoalDao = new PessoalDao(conn);
        if (req.method == 'POST' || req.method == 'PUT') {
          pessoalDao
            .getSolicitacoes({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              if (!msg[0]) {
                req.body.status == 'Aprovada' || req.body.status == 'Rejeitada'
                  ? (req.body.cpfDipaj = req.user.cpf)
                  : '';
                let URL = url.parse(
                  (req.headers.referrer || req.headers.referer).replace(
                    '/login',
                    '',
                  ),
                );
                pessoalDao.cadastraSolicitacao(req.body).then((msg) => {
                  let endereco =
                    req.body.setor == 'dipaj'
                      ? 'dipaj@carf.economia.gov.br'
                      : 'segep@carf.economia.gov.br';
                  let urlMail =
                    req.body.setor == 'dipaj' ? 'julgamento' : 'pessoal';
                  Mailer.enviaMail(
                    endereco,
                    `[SGI] Novo status de solicitação - ${req.body.nome}`,
                    `<strong>Solicitação:</strong> ${req.body.tipoSolicitacao}<br/>
                    <strong>Detalhes:</strong> ${req.body.tipoAfastamento}<br/>
                    <strong>Status:</strong> ${req.body.status}<br/>
                    <strong>Observações:</strong> ${req.body.observacoes}<br/>
                    <strong>Data de Criação:</strong> ${req.body.dtCriacao}<br/>
                    <strong>Nome do Solicitante:</strong> ${req.body.nome}<br/>
                    <strong>CPF do Solicitante:</strong> ${req.body.cpf}<br/>

                    <p><a href="http://${URL.host}/${urlMail}/restrito/gestaosolicitacoes"><strong>Gerenciar Solicitações</strong></a></p>
                    `,
                  );
                  resp.json(msg);
                });
              } else {
                req.body.status == 'Aprovada' || req.body.status == 'Rejeitada'
                  ? (req.body.cpfDipaj = req.user.cpf)
                  : '';
                pessoalDao.editaSolicitacao(req.body).then((msg) => {
                  resp.json(msg);
                });
              }
            });
        } else if (req.method == 'DELETE') {
          pessoalDao
            .getSolicitacoes({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              if (msg[0].status == 'Enviado para análise') {
                pessoalDao
                  .excluiSolicitacao({ uniqueId: req.body.uniqueId })
                  .then((msg) => {
                    resp.json(msg);
                  });
              } else {
                resp.send(
                  'Não foi possível excluir. Já está em análise. Entre em contato com a DIPAJ/COJUL.',
                );
              }
            });
        }
      }
    };
  }

  handleRegSolicitacoes() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const pessoalDao = new PessoalDao(conn);
        const julgamentoDao = new JulgamentoDao(conn);
        pessoalDao.getUsers({ cpf: req.user.cpf }).then((user) => {
          julgamentoDao
            .getCal({
              classNames: CSVHandler.semanaCores(user[0].unidade),
            })
            .then((cal) => {
              resp.marko(templates.julgamento.solicitacoescons, {
                cal: JSON.stringify(cal),
                user: JSON.stringify(user[0]),
              });
            });
        });
      }
      if (req.method == 'DELETE') {
        const pessoalDao = new PessoalDao(conn);
        pessoalDao
          .excluiRegSolicitacao({ uniqueId: req.body.uniqueId })
          .then((res) => {
            resp.send(req.body.uniqueId);
          });
      }
      if (req.method == 'POST') {
        const pessoalDao = new PessoalDao(conn);
        pessoalDao.cadastraRegSolicitacao(req.body).then((res) => {
          let URL = url.parse(
            (req.headers.referrer || req.headers.referer).replace('/login', ''),
          );
          let endereco =
            req.body.setor == 'DIPAJ'
              ? 'dipaj@carf.economia.gov.br'
              : 'segep@carf.economia.gov.br';
          let urlMail = req.body.setor == 'DIPAJ' ? 'julgamento' : 'pessoal';
          Mailer.enviaMail(
            endereco,
            `[SGI] Nova solicitação - ${req.body.nome}`,
            `<br/>
            ${req.body.html}
                    <p><a href="http://${URL.host}/${urlMail}/restrito/detalhasolicitacao/${req.body.uniqueId}"><strong>Gerenciar Solicitações</strong></a></p>
                    `,
          );
          resp.send(req.body.uniqueId);
        });
      }
    };
  }

  handleRegSolicitacoesDipaj() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const pessoalDao = new PessoalDao(conn);
        pessoalDao.getRegSolicitacoes().then((solicitacoes) => {
          resp.marko(templates.julgamento.gestaoregsolicitacoes, {
            solicitacoes: JSON.stringify(solicitacoes),
          });
        });
      }
      if (req.method == 'POST') {
        const pessoalDao = new PessoalDao(conn);
        pessoalDao.cadastraRegSolicitacao(req.body).then((res) => {
          resp.send(req.body.uniqueId);
        });
      }
    };
  }

  handleDetalhaSolicitacoesDipaj() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const pessoalDao = new PessoalDao(conn);
        pessoalDao
          .getRegSolicitacoes({ uniqueId: req.params.id })
          .then((solicitacao) => {
            resp.marko(templates.julgamento.detalhasolicitacao, {
              solicitacao: JSON.stringify(solicitacao[0]),
            });
          });
      }
      if (req.method == 'POST') {
        const pessoalDao = new PessoalDao(conn);
        req.body.servDipaj = req.user.cpf;
        pessoalDao.editaRegSolicitacao(req.body).then((res) => {
          resp.send(res);
        });
      }
    };
  }

  handleConsSolicitacoes() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const pessoalDao = new PessoalDao(conn);
        const julgamentoDao = new JulgamentoDao(conn);
        pessoalDao.getUsers({ cpf: req.user.cpf }).then((user) => {
          julgamentoDao
            .getCal({
              classNames: CSVHandler.semanaCores(user[0].unidade),
            })
            .then((cal) => {
              pessoalDao
                .getRegSolicitacoes({ cpf: req.user.cpf })
                .then((solicitacoes) => {
                  resp.marko(templates.julgamento.consolicitacoes, {
                    cal: JSON.stringify(cal),
                    user: JSON.stringify(user[0]),
                    solicitacoes: JSON.stringify(solicitacoes),
                  });
                });
            });
        });
      }
      if (req.method == 'POST') {
        console.log(req.body);
      }
    };
  }

  handleTabAlegacoes() {
    return function (req, resp) {
      const http = require('http');
      http
        .get(
          `http://dispe.carf/tab-alegacoes/alegacoes/${req.body.idAlegacao}.json`,
          (response) => {
            let data = '';
            response.on('data', (chunk) => {
              data += chunk;
            });
            response.on('end', () => {
              resp.send(JSON.parse(data));
            });
          },
        )
        .on('error', (err) => {
          resp.send('Erro' + err.message);
        });
    };
  }

  handleIndicaPauta() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const pessoalDao = new PessoalDao(conn);
        const julgamentoDao = new JulgamentoDao(conn);
        const suporteDao = new SuporteDao(conn);
        const baseDAO = new BaseDao(conn);
        let filtro, sort, projecao, limit;
        filtro = { 'conselheiro.cpf': req.user.cpf };
        projecao = {};
        sort = { dtRel: -1 };
        limit = -1;
        pessoalDao.getUsers({ cpf: req.user.cpf }).then((user) => {
          julgamentoDao
            .getCal({
              classNames: CSVHandler.semanaCores(user[0].unidade),
            })
            .then((cal) => {
              julgamentoDao
                .getRegap(filtro, sort, projecao, limit)
                .then((regap) => {
                  suporteDao
                    .getPeriodosIndicacoes({
                      semana: CSVHandler.semanaCores(user[0].unidade),
                    })
                    .then((indicacoes) => {
                      baseDAO.getAlegacoes().then((alegacoes) => {
                        resp.marko(templates.julgamento.indicapauta, {
                          relatorio: JSON.stringify(regap[0].relatorio),
                          cal: JSON.stringify(cal),
                          user: JSON.stringify(user[0]),
                          pauta: JSON.stringify(indicacoes[0]),
                          alegacoes: JSON.stringify(alegacoes),
                        });
                      });
                    });
                });
            });
        });
      }
      if (req.method == 'POST') {
        let dados = [req.body];
        console.log(dados);
        const suporteDao = new SuporteDao(conn);
        suporteDao.criaIndicacaoPauta(dados).then((resposta) => {
          resp.send(resposta);
        });
      }
    };
  }

  carregaPaginaIndicacoes() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      const julgamentoDao = new JulgamentoDao(conn);
      const suporteDao = new SuporteDao(conn);
      let cor = CSVHandler.semanaCores(req.user.unidade);
      suporteDao
        .getPeriodosIndicacoes({ semana: cor }, { _id: -1 })
        .then((indicacoes) => {
          suporteDao
            .getIndicacoesPauta({
              $and: [
                { cpf: req.user.cpf },
                // {
                //   idIndicacao: indicacoes[0]
                //     ? indicacoes[0]._id.toString()
                //     : '',
                // },
              ],
            })
            .then((indicaPauta) => {
              resp.marko(templates.julgamento.paginaIndicacoes, {
                indicacoes: JSON.stringify(indicacoes[0]),
                indicaPauta: JSON.stringify(indicaPauta),
              });
            });
        });
    };
  }

  carregaPortalConselheiros() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      const julgamentoDao = new JulgamentoDao(conn);

      let cor = CSVHandler.semanaCores(req.user.unidade);
      pessoalDao.getUsers({ cpf: req.user.cpf }).then((user) => {
        julgamentoDao
          .getCal({
            classNames: CSVHandler.semanaCores(user[0].unidade),
          })
          .then((cal) => {
            resp.marko(templates.julgamento.portaldoconselheiro, {
              cal: JSON.stringify(cal),
              user: user[0],
            });
          });
      });
    };
  }

  carregaRelAntigos() {
    return function (req, resp) {
      resp.marko(templates.julgamento.relatorios_antigos);
    };
  }

  listaRegapIndividual() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      let filtro, sort, projecao;
      if (req.body.get == 'listagem') {
        filtro = { 'conselheiro.cpf': req.user.cpf };
        projecao = { dtRel: 1, _id: -1 };
        sort = { dtRel: -1 };
      }
      if (req.body.get == 'relatorio') {
        filtro = {
          $and: [
            { 'conselheiro.cpf': req.user.cpf },
            { _id: new ObjectID(req.body.idRel) },
          ],
        };
        projecao = { relatorio: 1, _id: 0 };
        sort = { 'relatorio.processo': 1 };
      }
      julgamentoDao.getRegap(filtro, sort, projecao).then((regap) => {
        resp.json(regap);
      });
    };
  }

  carregaRegapConsolidado() {
    return function (req, resp) {
      if (req.method === 'GET') {
        resp.marko(templates.julgamento.regap_consolidado);
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
        const julgamentoDao = new JulgamentoDao(conn);
        const pessoalDao = new PessoalDao(conn);
        pessoalDao.getUsers({ cpf: params[0] }).then((user) => {
          julgamentoDao
            .getCal({
              classNames: CSVHandler.semanaCores(user[0].unidade),
            })
            .then((cal) => {
              julgamentoDao.getRegap(filtro, sort, projecao).then((regap) => {
                resp.marko(templates.julgamento.regap_individual_cojul, {
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

  handleRelatorios() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      if (req.method == 'GET') {
        julgamentoDao.getRelatorios().then((rel) => {
          resp.marko(templates.julgamento.gestaorelatorios, {
            relatorios: JSON.stringify(rel),
          });
        });
      }
      if (req.method == 'DELETE') {
        julgamentoDao
          .excluiRelatorio({ _id: new ObjectID(req.body.id) })
          .then((msg) => {
            resp.json(msg);
          });
      }
    };
  }

  carregaRegapIndividual() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      const julgamentoDao = new JulgamentoDao(conn);
      pessoalDao.getUsers({ cpf: req.user.cpf }).then((user) => {
        julgamentoDao
          .getCal({
            classNames: CSVHandler.semanaCores(user[0].unidade),
          })
          .then((cal) => {
            resp.marko(templates.julgamento.regap_individual, {
              cal: JSON.stringify(cal),
              user: user[0],
            });
          });
      });
    };
  }

  carregaReinpIndividual() {
    return function (req, resp) {
      if (req.method === 'GET') {
        resp.marko(templates.julgamento.reinp_individual);
      }
    };
  }

  carregaOcorrenciasCons() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      const julgamentoDao = new JulgamentoDao(conn);
      pessoalDao.getOcorrencias({ cpf: req.user.cpf }).then((ocorrencias) => {
        pessoalDao.getUsers({ cpf: req.user.cpf }).then((user) => {
          julgamentoDao
            .getCal({
              classNames: CSVHandler.semanaCores(user[0].unidade),
            })
            .then((cal) => {
              resp.marko(templates.julgamento.ocorrencias, {
                ocorrencias: JSON.stringify(ocorrencias),
                cal: JSON.stringify(cal),
                user: user[0],
              });
            });
        });
      });
    };
  }

  getCadastro() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .getUsers({ cpf: req.body.cpf })
        .then((pessoas) => {
          resp.json(pessoas);
        })
        .catch((erro) => console.log(erro));
    };
  }

  carregaCSV() {
    return function (req, resp) {
      let form = formidable.IncomingForm({ keepExtensions: true });
      form.parse(req, function (err, fields, files) {
        if (err) {
          console.log(err);
        }
        registro['nome'] = files.file.name;
        let oldpath = files.file.path;
        if (fields.tipoRel == 'novoREGAP') {
          fs.readFile(files.file.path, 'latin1', (err, data) => {
            const pessoalDao = new PessoalDao(conn);
            pessoalDao.getUsers({ cargo: 'Conselheiro' }).then((cons) => {
              let dataRel = moment().unix();
              regapHandler.montaRegap(data, cons, dataRel).then((regap) => {
                const julgamentoDao = new JulgamentoDao(conn);
                julgamentoDao.insereVariosRegap(regap).then((respo) => {
                  if (req.isAuthenticated()) {
                    registro['usuarioLogado'] = req.user.cpf;
                  }
                  let ip =
                    (req.headers['x-forwarded-for'] || '')
                      .split(',')
                      .pop()
                      .trim() ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;
                  const clientIPWare = get_ip(req);
                  const clientIp = requestIp.getClientIp(req);
                  registro['clientIP'] = [clientIp, clientIPWare, ip];
                  registro['tipoRel'] = fields.tipoRel;
                  registro['dtExtracao'] = moment(
                    fields.dataExt,
                    'DD/MM/YYYY',
                  ).format('DD/MM/YYYY');
                  registro['dtEnvio'] = moment().format('DD/MM/YYYY');
                  julgamentoDao.insereDadosCSV(registro).then((dados) => {
                    resp.send(respo);
                  });
                });
              });
            });
          });
        } else {
          if (fields.tipoRel == 'Estoque' || fields.tipoRel == 'REJUL') {
            fields.semana = 'Todas';
          }
          newpath = path + fields.semana + '-' + files.file.name;
          fse
            .move(oldpath, newpath, { overwrite: true })
            .then(() => {
              registro = CSVHandler.wrangleCSV(
                newpath,
                fields.semana,
                fields.tipoRel,
              ).then((registro) => {
                if (req.isAuthenticated()) {
                  registro['usuarioLogado'] = req.user.cpf;
                }
                const clientIp = requestIp.getClientIp(req);
                registro['clientIP'] = clientIp;
                registro['tipoRel'] = fields.tipoRel;
                registro['semana'] = fields.semana;
                registro['dtExtracao'] = moment(
                  fields.dataExt,
                  'DD/MM/YYYY',
                ).format('DD/MM/YYYY');
                const julgamentoDao = new JulgamentoDao(conn);
                julgamentoDao
                  .insereDadosCSV(registro)
                  .then(resp.send('OK'))
                  .catch((erro) => console.log(erro));
              });
            })
            .catch((err) => console.error(err));
        }
      });
    };
  }

  calendarioView() {
    return function (req, resp, next) {
      const julgamentoDao = new JulgamentoDao(conn);
      julgamentoDao.getCal().then((msg) => {
        resp.marko(templates.julgamento.calendarioView, {
          cal: JSON.stringify(msg),
        });
      });
    };
  }

  handleCalendario() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const julgamentoDao = new JulgamentoDao(conn);
        julgamentoDao.getCal().then((msg) => {
          resp.marko(templates.julgamento.calendario, {
            cal: JSON.stringify(msg),
          });
        });
      } else {
        const julgamentoDao = new JulgamentoDao(conn);
        if (req.method == 'POST' || req.method == 'PUT') {
          julgamentoDao.getCal({ uniqueId: req.body.uniqueId }).then((msg) => {
            if (!msg[0]) {
              julgamentoDao.insereCal(req.body).then((msg) => {
                resp.json(msg);
              });
            } else {
              julgamentoDao
                .atualizaCal({ uniqueId: req.body.uniqueId }, req.body)
                .then((msg) => {
                  resp.json(msg);
                });
            }
          });
        } else if (req.method == 'DELETE') {
          julgamentoDao
            .excluiCal({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              resp.json(msg);
            });
        }
      }
    };
  }
  escolheCSVReinp() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      julgamentoDao
        .getRelatorios({ tipoRel: 'REINP' })
        .then((dados) => {
          dados.forEach((dado) => {
            dado.dataEnvio = dado.dataEnvio;
            dado.dias = moment(dado.dtExtracao, 'DD/MM/YYYY').tz(sp).fromNow();
            dado.caminho = dado.caminho.split('/');
            dado.caminho = dado.caminho[4];
          });
          resp.marko(templates.julgamento.escolhecsvreinp, { dados: dados });
        })
        .catch((erro) => console.log(erro));
    };
  }
  escolheCSVAnaliseEstoque() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      let options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        weekday: 'long',
      };
      const formato = {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL',
      };
      julgamentoDao
        .getRelatorios({ $or: [{ tipoRel: 'Estoque' }] })
        .then((dados) => {
          dados.forEach((dado) => {
            dado.semana = dado.semana;
            dado.dataEnvio = moment(dado.dataEnvio).format('DD/MM/YYYY');
            dado.dias = moment(dado.dtExtracao, 'DD/MM/YYYY').fromNow();
            dado.caminho = dado.caminho.split('/');
            dado.caminho = dado.caminho[4];
            dado.totalCSRF = dado.ParaRelatarCSRF + dado.FormalizarCSRF;
            dado.totalTOTE = dado.ParaRelatarTOTE + dado.FormalizarTOTE;
            dado.total = dado.totalCSRF + dado.totalTOTE;
            dado.totalHoras = dado.totalHorasTOTE + dado.totalHorasCSRF;
            dado.totalValorCSRF = dado.totalValorCSRF.toLocaleString(
              'pt-BR',
              formato,
            );
            dado.totalValorTOTE = dado.totalValorTOTE.toLocaleString(
              'pt-BR',
              formato,
            );
          });
          resp.marko(templates.julgamento.escolhecsvanaliseestoque, {
            dados: dados,
          });
        })
        .catch((erro) => console.log(erro));
    };
  }
  escolheCSVRegap() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      let options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        weekday: 'long',
      };
      const formato = {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL',
      };
      julgamentoDao
        .getRelatorios({ $or: [{ tipoRel: 'REGAP' }, { tipoRel: 'Estoque' }] })
        .then((dados) => {
          dados.forEach((dado) => {
            dado.semana = dado.semana;
            dado.dataEnvio = moment(dado.dataEnvio).format('DD/MM/YYYY');
            dado.dias = moment(dado.dtExtracao, 'DD/MM/YYYY').fromNow();
            dado.caminho = dado.caminho.split('/');
            dado.caminho = dado.caminho[4];
            dado.totalCSRF = dado.ParaRelatarCSRF + dado.FormalizarCSRF;
            dado.totalTOTE = dado.ParaRelatarTOTE + dado.FormalizarTOTE;
            dado.total = dado.totalCSRF + dado.totalTOTE;
            dado.totalHoras = dado.totalHorasTOTE + dado.totalHorasCSRF;
            dado.totalValorCSRF = dado.totalValorCSRF.toLocaleString(
              'pt-BR',
              formato,
            );
            dado.totalValorTOTE = dado.totalValorTOTE.toLocaleString(
              'pt-BR',
              formato,
            );
          });
          resp.marko(templates.julgamento.escolhecsvregap, { dados: dados });
        })
        .catch((erro) => console.log(erro));
    };
  }
  escolheCSV() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      let options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        weekday: 'long',
      };
      julgamentoDao
        .getRelatorios({ tipoRel: 'Estoque' })
        .then((dados) => {
          dados.forEach((dado) => {
            dado.dataEnvio = moment(dado.dataEnvio).format('DD/MM/YYYY');
            dado.dtExtracao = moment(dado.dtExtracao, 'DD/MM/YYYY').format(
              'DD/MM/YYYY',
            );
            dado.dias = moment(dado.dtExtracao, 'DD/MM/YYYY').fromNow();
            dado.caminho = dado.caminho.split('/');
            dado.caminho = dado.caminho[4];
            dado.totalCSRF =
              dado.ParaRelatarCSRF +
              dado.FormalizarCSRF +
              +dado.AguardPautaCSRF +
              +dado.ApreciarCSRF +
              +dado.FormDecCSRF +
              +dado.CorrigirCSRF;
            dado.totalTOTE =
              dado.ParaRelatarTOTE +
              dado.FormalizarTOTE +
              +dado.AguardPautaTOTE +
              +dado.ApreciarTOTE +
              +dado.FormDecTOTE +
              +dado.CorrigirTOTE;
            dado.total = dado.totalCSRF + dado.totalTOTE;
            dado.totalHoras = dado.totalHorasTOTE + dado.totalHorasCSRF;
            const formato = {
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL',
            };
            dado.totalValorCSRF = dado.totalValorCSRF.toLocaleString(
              'pt-BR',
              formato,
            );
            dado.totalValorTOTE = dado.totalValorTOTE.toLocaleString(
              'pt-BR',
              formato,
            );
          });
          resp.marko(templates.julgamento.escolhecsv, { dados: dados });
        })
        .catch((erro) => console.log(erro));
    };
  }
  carregaPaginaInsereCSV() {
    return function (req, resp) {
      resp.marko(templates.julgamento.carregacsv, { dados: '' });
    };
  }
  //ESTOQUE
  carregaPaginaEstoque() {
    return function (req, resp) {
      if (req.method === 'GET') {
        resp.marko(templates.julgamento.estoque_conselheiros);
      }
      if (req.method === 'POST') {
        const julgamentoDao = new JulgamentoDao(conn);
        let filtro, sort, projecao;
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
  carregaPaginaDiag() {
    return function (req, resp) {
      let caminho = req.params.id;
      dados = CSVHandler.pegaEstoque(`${path}${caminho}`).then((dados) => {
        const pessoalDao = new PessoalDao(conn);
        pessoalDao.getUsers().then((users) => {
          dados.forEach((dado) => {
            users.forEach((user) => {
              if (dado.CPF == user.cpf) {
                dado.nome = user.nome;
                dado.setor = user.setor;
                dado.camara = user.camara;
                dado.turma = user.turma;
                dado._id = new ObjectID(user._id);
                dado.unidade = user.unidade;
              }
            });
          });
          resp.marko(templates.julgamento.estoque, {
            relatorio: JSON.stringify(dados),
          });
        });
      });
    };
  }

  carregaPaginaReinp() {
    return function (req, resp) {
      if (req.method === 'GET') {
        resp.marko(templates.julgamento.reinpgeral);
      }
      if (req.method === 'POST') {
        const julgamentoDao = new JulgamentoDao(conn);
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
              ano: req.body.ano,
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
      const julgamentoDao = new JulgamentoDao(conn);
      julgamentoDao.getReinp(filtro).then((dados) => {
        const pessoalDao = new PessoalDao(conn);
        pessoalDao.getUsers({ cpf: cpf }).then((user) => {
          resp.marko(templates.julgamento.detalhareinp, {
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
  carregaPaginaAnaliseEstoque() {
    return function (req, resp) {
      let caminho = req.params.id;
      req.session.caminho = caminho;
      dados = CSVHandler.pegaRegap(`${path}${caminho}`, 'COJUL').then(
        (dados) => {
          const pessoalDao = new PessoalDao(conn);
          pessoalDao.getUsers().then((users) => {
            dados.forEach((dado) => {
              users.forEach((user) => {
                if (dado.CPF == user.cpf) {
                  dado.nome = user.nome;
                  dado.setor = user.setor;
                  dado.camara = user.camara;
                  dado.turma = user.turma;
                  dado._id = new ObjectID(user._id);
                  dado.dtFimMandato = user.dtFimMandato;
                }
              });
            });
            const julgamentoDao = new JulgamentoDao(conn);
            julgamentoDao.getCal().then((cal) => {
              resp.marko(templates.julgamento.analiseEstoque, {
                relatorio: JSON.stringify(dados),
                cal: JSON.stringify(cal),
              });
            });
          });
        },
      );
    };
  }
  carregaPaginaRegapCojul() {
    return function (req, resp) {
      let caminho = req.params.id;
      req.session.caminho = caminho;
      dados = CSVHandler.pegaRegap(`${path}${caminho}`, 'COJUL').then(
        (dados) => {
          const pessoalDao = new PessoalDao(conn);
          pessoalDao.getUsers().then((users) => {
            dados.forEach((dado) => {
              users.forEach((user) => {
                if (dado.CPF == user.cpf) {
                  dado.nome = user.nome;
                  dado.setor = user.setor;
                  dado.camara = user.camara;
                  dado.turma = user.turma;
                  dado._id = new ObjectID(user._id);
                  dado.dtFimMandato = user.dtFimMandato;
                }
              });
            });
            const julgamentoDao = new JulgamentoDao(conn);
            julgamentoDao.getCal().then((cal) => {
              resp.marko(templates.julgamento.regapCojul, {
                relatorio: JSON.stringify(dados),
                cal: JSON.stringify(cal),
              });
            });
          });
        },
      );
    };
  }
  carregaPaginaRegap() {
    return function (req, resp) {
      let cpf = req.params.id;
      let caminho = (req.headers.referrer || req.headers.referer).split('/');
      caminho = req.session.caminho;
      if (!caminho) {
        resp.render(404);
      }
      dados = CSVHandler.pegaRegap(`${path}${caminho}`, 'CONS', cpf).then(
        (dados) => {
          const pessoalDao = new PessoalDao(conn);
          pessoalDao.getUsers().then((users) => {
            dados.forEach((dado) => {
              users.forEach((user) => {
                if (dado.CPF == user.cpf) {
                  dado.nome = user.nome;
                  dado.setor = user.setor;
                  dado.camara = user.camara;
                  dado.turma = user.turma;
                  dado.unidade = user.unidade;
                  dado.diasAtividade = new Date() - dado.Entrada_na_Atividade;
                  dado._id = new ObjectID(user._id);
                  dado.dtFimMandato = user.dtFimMandato;
                  dado.tipo = user.tipo;
                }
              });
            });
            const julgamentoDao = new JulgamentoDao(conn);
            julgamentoDao
              .getCal({
                classNames: CSVHandler.semanaCores(dados[0].unidade),
              })
              .then((cal) => {
                julgamentoDao
                  .getRelatorios({ caminho: `${path}${caminho}` })
                  .then((dataEnvio) => {
                    resp.marko(templates.julgamento.regap, {
                      relatorio: JSON.stringify(dados),
                      cal: JSON.stringify(cal),
                      user: dados[0].nome,
                      cpf: dados[0].CPF,
                      turma: dados[0].turma,
                      camara: dados[0].camara,
                      setor: dados[0].setor,
                      caminho: caminho,
                      dataEnvio: dataEnvio[0].dtExtracao,
                      dtFimMandato: dados[0].dtFimMandato,
                      tipo: dados[0].tipo,
                    });
                  });
              });
          });
        },
      );
    };
  }
  arquivoDown() {
    return function (req, resp) {
      let id = new ObjectID(req.params.id);
      const fileDao = new FileDao(conn);
      fileDao.getArq({ _id: id }).then((arq) => {
        resp.writeHead(200, {
          'Content-Type': 'application/pdf',
          //'Content-Disposition': 'attachment; filename="' + arq[0].nome + '"'
        });
        resp.end(new Buffer.from(arq[0].file_data.buffer, 'binary'));
      });
    };
  }

  handleArquivos() {
    return function (req, resp) {
      if (req.method == 'DELETE') {
        const fileDao = new FileDao(conn);
        fileDao.excluiArq({ _id: new ObjectID(req.body._id) }).then((msg) => {
          resp.json(msg);
        });
      } else if (req.method == 'GET') {
        fileDao.getArq({ _id: new ObjectID(req.body._id) }).then((msg) => {
          resp.json(msg);
        });
      } else {
        let form = formidable.IncomingForm({ keepExtensions: true });
        form.parse(req, function (err, fields, files) {
          if (err) {
            console.log(err);
          }
          let data = fs.readFileSync(files.file.path);
          let registro = {};
          registro.arquivo = files.file;
          registro.nome = files.file.name;
          registro.file_data = Binary(data);
          const fileDao = new FileDao(conn);
          {
            if (req.method == 'POST' || req.method == 'PUT') {
              fileDao
                .getArq({ _id: new ObjectID(req.body._id) })
                .then((msg) => {
                  if (!msg[0]) {
                    fileDao.insereArq(registro).then((msg) => {
                      resp.json({ nome: msg.ops[0].nome, _id: msg.ops[0]._id });
                    });
                  } else {
                    delete req.body._id;
                    fileDao
                      .atualizaArq(
                        { _id: new ObjectID(req.body._id) },
                        req.body,
                      )
                      .then((msg) => {
                        resp.json(msg);
                      });
                  }
                });
            }
          }
        });
      }
    };
  }
  handleCorrigeReinp() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const julgamentoDao = new JulgamentoDao(conn);
        julgamentoDao.getReinp({ trimestre: req.params.id }).then((msg) => {
          resp.marko(templates.julgamento.corrigeReinp, {
            reinp: JSON.stringify(msg),
          });
        });
      } else {
        const julgamentoDao = new JulgamentoDao(conn);
        if (req.method == 'POST' || req.method == 'PUT') {
          julgamentoDao
            .getReinp({ _id: new ObjectID(req.body.id) })
            .then((msg) => {
              if (!msg[0]) {
                julgamentoDao.insereReinp(req.body).then((msg) => {
                  resp.json(msg);
                });
              } else {
                julgamentoDao
                  .atualizaReinp({ _id: new ObjectID(req.body.id) }, req.body)
                  .then((msg) => {
                    let pessoalDao = new PessoalDao(conn);
                    pessoalDao
                      .editaConsReinp(
                        { cpf: req.body.cpf },
                        { nomeReinp: req.body.nome },
                      )
                      .then((res) => {
                        resp.json({ reinp: msg, cons: res });
                      });
                  });
              }
            });
        }
      }
    };
  }
}
module.exports = JulgamentoControlador;
