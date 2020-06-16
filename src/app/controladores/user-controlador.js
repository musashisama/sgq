const conn = require('../../config/mongodb').dados;
const templates = require('../views/templates');
const UserDao = require('../infra/user-dao');
const PessoalDao = require('../infra/pessoal-dao');
const NCDao = require('../infra/nc-dao');
const BaseDao = require('../infra/base-dao');
const requestIp = require('request-ip');
const { ObjectID } = require('mongodb');

class UserControlador {
  static rotas() {
    return {
      autenticadas: '/admin*',
      userProfile: '/admin/userprofile',
      cadastro: '/admin/usuario',
      edicao: '/admin/usuario/:id',
      delecao: '/admin/usuario/delete/:id',
      perfis: '/admin/usuario/perfis',
      edita: '/admin/usuario/perfis/:id',
      ocorrencias: '/admin/ocorrencias/:id',
    };
  }

  formCadastra() {
    return function (req, resp) {
      const userDao = new UserDao(conn);
      const ncDao = new NCDao(conn);
      const baseDao = new BaseDao(conn);
      let form = [{}];
      baseDao
        .listaUnidades()
        .then((und) => {
          form[0] = und;
        })
        .then(
          baseDao.listaPerfis().then((prf) => {
            form[1] = prf;
          }),
        )
        .then(
          userDao
            .getUsers()
            .then((dadosForm) => {
              resp.marko(templates.admin.caduser, {
                registroUser: {},
                und: form[0],
                prf: form[1],
              });
            })
            .catch((erro) => console.log(erro)),
        );
    };
  }

  handleOcorrencias() {
    return function (req, resp) {
      if (req.method == 'GET') {
        const pessoalDao = new PessoalDao(conn);
        pessoalDao
          .getTipoOcorrencias()
          .then((ocorrencias) =>
            resp.marko(templates.admin.lista_ocorrencias, {
              ocorrencias: JSON.stringify(ocorrencias),
            }),
          )
          .catch((erro) => console.log(erro));
      } else {
        const pessoalDao = new PessoalDao(conn);
        if (req.method == 'POST' || req.method == 'PUT') {
          if (req.params.id == '1') {
            pessoalDao.insereTpOcorrencia(req.body).then((msg) => {
              resp.json(msg);
            });
          } else {
            const id = new ObjectID(req.params.id);
            pessoalDao.editaTipoOcorrencias(id, req.body).then((msg) => {
              resp.json(msg);
            });
          }
        } else if (req.method == 'DELETE') {
          const id = new ObjectID(req.params.id);
          const pessoalDao = new PessoalDao(conn);
          pessoalDao.excluiTipoOcorrencias(id).then((msg) => {
            resp.json(msg);
          });
        }
      }
    };
  }

  formOcorrencia() {
    return function (req, resp) {
      let id = new ObjectID(req.params.id);
      const userDao = new UserDao(conn);
      userDao
        .getOcorrencias()
        .then((ocorrencias) => {
          resp.marko(templates.admin.ocorrencias, {
            ocorrencia: '',
          });
        })
        .catch((erro) => console.log(erro));
    };
  }
  formEditaOcorrencia() {
    return function (req, resp) {
      const perfil = req.user.perfis;
      if (perfil.indexOf(role) > -1) {
        let id = new ObjectID(req.params.id);
        const userDao = new UserDao(conn);
        userDao
          .getOcorrencias({ _id: id })
          .then((ocorrencias) => {
            resp.marko(templates.admin.ocorrencias, {
              ocorrencia: ocorrencias[0],
            });
          })
          .catch((erro) => console.log(erro));
      }
    };
  }

  //Chamado pelo POST do formulário. Cadastra nova possível ocorrência.
  cadastraTpOcorrencia() {
    return function (req, resp) {
      const registro = req.body;
      const clientIp = requestIp.getClientIp(req);
      registro['horaCriacao'] = new Date().toISOString();
      registro['clientIP'] = clientIp;
      registro['cpfUsuario'] = req.user.cpf;
      const userDao = new UserDao(conn);
      userDao
        .insereTpOcorrencia(registro)
        .then(resp.redirect(UserControlador.rotas().ocorrencias))
        .catch((erro) => console.log(erro));
    };
  }

  editaOco() {
    return function (req, resp) {
      let registro = req.body;
      console.log(registro);
      const userDao = new UserDao(conn);
      userDao
        .editaOco(registro)
        .then(resp.redirect(UserControlador.rotas().ocorrencias))
        .catch((erro) => console.log(erro));
    };
  }

  removeTpOco() {
    return function (req, resp) {
      const id = new ObjectID(req.params.id);
      const userDao = new UserDao(conn);
      userDao
        .deletaTpOCo(id)
        .then((oco) => {
          resp.marko(templates.nc.lista, {
            ocorrencias: JSON.stringify(oco),
            msg: 'Tipo de Não Conformidade excluída com sucesso.',
          });
        })
        .catch((erro) => console.log(erro));
    };
  }

  formPerfis() {
    return function (req, resp) {
      const userDao = new UserDao(conn);
      const ncDao = new NCDao(conn);
      const baseDao = new BaseDao(conn);
      let form = [{}];
      baseDao
        .listaPerfis()
        .then((perfis) => {
          userDao.getUsers().then((users) => {
            resp.marko(templates.admin.perfis, {
              perfis: perfis,
              users: JSON.stringify(users),
            });
          });
        })
        .catch((erro) => console.log(erro));
    };
  }

  getUserPerfis() {
    return function (req, resp) {
      let perfis = [];
      if (req.isAuthenticated()) {
        perfis = req.user.perfis;
      }
      resp.send(perfis);
    };
  }

  cadastra() {
    return function (req, resp) {
      const registro = req.body;
      const clientIp = requestIp.getClientIp(req);
      registro['horaCriacao'] = new Date().toISOString();
      registro['clientIP'] = clientIp;
      registro['cpfCadastro'] = req.user.cpf;
      const userDao = new UserDao(conn);
      userDao
        .cadastraUser(registro)
        .then(
          resp.marko(templates.base.principal, {
            msg: 'Usuário cadastrado com sucesso!',
          }),
        )
        .catch((erro) => console.log(erro));
    };
  }

  editaPerfis() {
    return function (req, resp) {
      const userDao = new UserDao(conn);
      userDao
        .atualizaPerfis(req.body.cpf, req.body.perfil)
        .then((res) => {
          resp.marko(templates.admin.perfis);
        })
        .catch((erro) => console.log(erro));
    };
  }

  edita() {
    return function (req, resp) {
      const ncDao = new NCDao(conn); // <-ARRUMAR
      ncDao
        .atualiza(req.body) // <-ARRUMAR
        .then(resp.redirect(NCControlador.rotas().lista))
        .catch((erro) => console.log(erro));
    };
  }
}
module.exports = UserControlador;
