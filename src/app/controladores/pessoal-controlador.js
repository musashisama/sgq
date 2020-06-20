const conn = require('../../config/mongodb').dados;
const PessoalDao = require('../infra/pessoal-dao');
const JulgamentoDao = require('../infra/julgamento-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');

class PessoalControlador {
  static rotas() {
    return {
      autenticadas: '/pessoal/restrito*',
      agenda: '/pessoal/agenda',
      unidades: '/pessoal/restrito/unidades',
      pessoas: '/pessoal/restrito/pessoas',
      detalhaPess: '/pessoal/restrito/pessoas/:id',
      getcadastro: '/pessoal/restrito/getcadastro',
      cadastraPess: '/pessoal/restrito/pessoas/cadastra',
      editaPess: '/pessoal/restrito/pessoas/edita',
      conselheiros: '/pessoal/restrito/conselheiros',
      detalhacons: '/pessoal/restrito/conselheiros/:id',
      editacons: '/pessoal/restrito/conselheiros/edita',
      insOcorrencia: '/pessoal/restrito/conselheiros/:id/ocorrencia',
      cadastraCons: '/pessoal/restrito/conselheiros/cadastra',
      editaOcorrencia: '/pessoal/restrito/conselheiros/ocorrencia/:id',
      excluiOcorrencia: '/pessoal/restrito/conselheiros/exclui-ocorrencia/:id',
      insOcorrenciaPess: '/pessoal/restrito/pessoas/:id/ocorrencia',
      editaOcorrenciaPess: '/pessoal/restrito/pessoas/ocorrencia/:id',
      excluiOcorrenciaPess: '/pessoal/restrito/pessoas/exclui-ocorrencia/:id',
      portalCogec: '/pessoal/restrito/portalcogec',
      gestaoPortalCogec: '/pessoal/restrito/gestaoportalcogec',
    };
  }

  carregaAgenda() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .getUsers(
          {},
          {
            nome: 1,
            email: 1,
            telefone: 1,
            unidade: 1,
            setor: 1,
            cargo: 1,
            funcao: 1,
          },
        )
        .then((agenda) => {
          resp.marko(templates.pessoal.agenda, {
            agenda: JSON.stringify(agenda),
          });
        })
        .catch((erro) => console.log(erro));
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

  carregaPaginaCadastro() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .getUsers()
        .then((pessoas) => {
          resp.marko(templates.pessoal.cadastra);
        })
        .catch((erro) => console.log(erro));
    };
  }
  handlePortalCogec() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const julgamentoDao = new JulgamentoDao(conn);
        julgamentoDao.getPortal({ portal: 'cogec' }).then((msg) => {
          resp.marko(templates.pessoal.gestaoPortal, {
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
                req.body.portal = 'cogec';
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
  carregaPortalCogec() {
    return function (req, resp) {
      const julgamentoDao = new JulgamentoDao(conn);
      julgamentoDao.getPortal({ portal: 'cogec' }).then((portal) => {
        resp.marko(templates.pessoal.portalCogec, {
          portal: JSON.stringify(portal),
        });
      });
    };
  }
  carregaPaginaPessoal() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .getUsers({ cargo: { $ne: 'Conselheiro' } })
        .then((pessoas) => {
          resp.marko(templates.pessoal.pessoas, {
            pessoas: JSON.stringify(pessoas),
          });
        })
        .catch((erro) => console.log(erro));
    };
  }
  carregaPaginaCons() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .getUsers({ cargo: 'Conselheiro' })
        .then((conselheiros) => {
          resp.marko(templates.pessoal.conselheiros, {
            conselheiros: JSON.stringify(conselheiros),
          });
        })
        .catch((erro) => console.log(erro));
    };
  }
  carregaPaginaCadCons() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao.getUnidades({ tipo: 'judicante' }).then((tipo) => {
        pessoalDao.getfuncoesCarf().then((funcoes) => {
          resp.marko(templates.pessoal.cadcons, {
            unidades: tipo,
            funcoes: funcoes,
          });
        });
      });
    };
  }
  carregaPaginaCadPess() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao.getUnidades().then((tipo) => {
        pessoalDao.getfuncoesCarf().then((funcoes) => {
          resp.marko(templates.pessoal.cadpess, {
            unidades: tipo,
            funcoes: funcoes,
          });
        });
      });
    };
  }
  carregaPaginaDetCons() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .getUsers({ cpf: req.params.id })
        .then((conselheiro) => {
          pessoalDao.getUnidades({ tipo: 'judicante' }).then((tipo) => {
            pessoalDao.getTipoOcorrencias().then((tpOcorrencias) => {
              pessoalDao
                .getOcorrencias({ cpf: req.params.id })
                .then((ocorrencias) => {
                  pessoalDao.getfuncoesCarf().then((funcoes) => {
                    resp.marko(templates.pessoal.detalhacons, {
                      conselheiro: conselheiro[0],
                      ddcons: JSON.stringify(conselheiro[0]),
                      unidades: tipo,
                      tipoOcorrencias: tpOcorrencias,
                      ocorrencias: JSON.stringify(ocorrencias),
                      funcoes: funcoes,
                    });
                  });
                });
            });
          });
        })
        .catch((erro) => console.log(erro));
    };
  }

  carregaPaginaDetalhaPessoal() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .getUsers({ cpf: req.params.id })
        .then((pessoa) => {
          pessoalDao.getUnidades().then((tipo) => {
            pessoalDao.getTipoOcorrencias().then((tpOcorrencias) => {
              pessoalDao
                .getOcorrencias({ cpf: req.params.id })
                .then((ocorrencias) => {
                  pessoalDao.getfuncoesCarf().then((funcoes) => {
                    resp.marko(templates.pessoal.detalhapess, {
                      pessoa: pessoa[0],
                      unidades: tipo,
                      tipoOcorrencias: tpOcorrencias,
                      ocorrencias: JSON.stringify(ocorrencias),
                      funcoes: funcoes,
                    });
                  });
                });
            });
          });
        })
        .catch((erro) => console.log(erro));
    };
  }
  handleUnidades() {
    return function (req, resp) {
      if (req.method == 'POST') {
        const pessoalDao = new PessoalDao(conn);
        pessoalDao.getUnidades({ tipo: req.body.tipo }).then((msg) => {
          resp.json(msg);
        });
      } else {
        const pessoalDao = new PessoalDao(conn);
        if (req.method == 'POST' || req.method == 'PUT') {
          pessoalDao.getUnidades({ tipo: req.body.tipo }).then((msg) => {
            if (!msg[0]) {
              req.body.portal = 'cogec';
              pessoalDao.inserePortal(req.body).then((msg) => {
                resp.json(msg);
              });
            } else {
              pessoalDao
                .atualizaPortal({ uniqueId: req.body.uniqueId }, req.body)
                .then((msg) => {
                  resp.json(msg);
                });
            }
          });
        } else if (req.method == 'DELETE') {
          console.log('delete');
          console.log(req.body);
          pessoalDao
            .excluiPortal({ uniqueId: req.body.uniqueId })
            .then((msg) => {
              resp.json(msg);
            });
        }
      }
    };
  }
  editaOcorrencia() {
    return function (req, resp) {
      const id = req.params.id;
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .editaOcorrencia(id, req.body)
        .then((conselheiro) => {
          resp.send(conselheiro);
        })
        .catch((erro) => console.log(erro));
    };
  }

  editaOcorrenciaPess() {
    return function (req, resp) {
      const id = req.params.id;
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .editaOcorrencia(id, req.body)
        .then((pessoa) => {
          resp.send(pessoa);
        })
        .catch((erro) => console.log(erro));
    };
  }

  editaCons() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .editaCons(req.body)
        .then((conselheiro) => {
          resp.send(conselheiro);
        })
        .catch((erro) => console.log(erro));
    };
  }

  editaPessoa() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      console.log(req.body);
      pessoalDao
        .editaPessoa(req.body)
        .then((pessoa) => {
          resp.send(pessoa);
        })
        .catch((erro) => console.log(erro));
    };
  }

  excluiOcorrencia() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .excluiOcorrencia(req.params.id)
        .then((conselheiro) => {
          resp.send(conselheiro);
        })
        .catch((erro) => console.log(erro));
    };
  }

  excluiOcorrenciaPess() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .excluiOcorrencia(req.params.id)
        .then((pessoa) => {
          resp.send(pessoa);
        })
        .catch((erro) => console.log(erro));
    };
  }

  insereOcorrencia() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .insereOcorrencia(req.body)
        .then((conselheiro) => {
          resp.send(conselheiro);
        })
        .catch((erro) => console.log(erro));
    };
  }
  insereOcorrenciaPess() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .insereOcorrencia(req.body)
        .then((pessoa) => {
          resp.send(pessoa);
        })
        .catch((erro) => console.log(erro));
    };
  }

  cadastraCons() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .cadastraUser(req.body)
        .then((conselheiro) => {
          resp.redirect(PessoalControlador.rotas().conselheiros);
        })
        .catch((erro) => console.log(erro));
    };
  }
  cadastraPess() {
    return function (req, resp) {
      const pessoalDao = new PessoalDao(conn);
      pessoalDao
        .cadastraUser(req.body)
        .then((pessoa) => {
          resp.redirect(PessoalControlador.rotas().pessoas);
        })
        .catch((erro) => console.log(erro));
    };
  }
}
module.exports = PessoalControlador;
