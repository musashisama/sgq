const conn = require('../../config/mongodb').dados;
const NCDao = require('../infra/nc-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');
const { ObjectID } = require('mongodb');
const moment = require('moment');

class NCControlador {
  static rotas() {
    return {
      autenticadas: '/qualidade/restrito*',
      lista: '/qualidade/restrito/lista-tipos',
      listaNC: '/qualidade/listaNC',
      form: '/qualidade/adiciona-nc',
      listagem: '/qualidade/listagem',
      listaRNC: '/qualidade/restrito/lista-registros-nc',
      cadastraNC: '/qualidade/restrito/cadastra-nc',
      edicao: '/qualidade/restrito/cadastra-nc/:id',
      deletaNC: '/qualidade/restrito/exclui-nc/:id',
    };
  }

  static ajustaData(data) {
    const arrayData = data.split('-');
    console.log(arrayData[2] + ' ' + arrayData[1] + ' ' + arrayData[0]);
    //const dataAjustada = new Date(arrayData[2], arrayData[1] - 1, arrayData[0], new Date().getHours()).toUTCString();
    const dataAjustada = new Date(arrayData[2], arrayData[1] - 1, arrayData[0]);
    console.log('Data Ajustada: ', dataAjustada);
    return dataAjustada;
  }
  //Lista os eventos possíves de não conformidades. Aberto.
  listagem() {
    return function (req, resp) {
      const ncDao = new NCDao(conn);
      ncDao
        .listaNC()
        .then((nc) =>
          resp.marko(templates.nc.listagem, {
            nc: JSON.stringify(nc),
          }),
        )
        .catch((erro) => console.log(erro));
    };
  }
  //Lista os eventos possíves de não conformidades. Auth.
  lista() {
    return function (req, resp) {
      const ncDao = new NCDao(conn);
      ncDao
        .listaNC()
        .then((nc) =>
          resp.marko(templates.nc.lista, {
            nc: JSON.stringify(nc),
          }),
        )
        .catch((erro) => console.log(erro));
    };
  }
  //Retorna um JSON com possíveis eventos de não conformidades.
  listaNC() {
    return function (req, resp) {
      const ncDao = new NCDao(conn);
      ncDao
        .listaNC({}, { _id: 0 })
        .then((lista) => {
          console.log(lista);
          resp.json(lista);
        })
        .catch((erro) => console.log(erro));
    };
  }
  // Carrega o formulário de registro de não conformidades. Aberto
  formularioCadastro() {
    return function (req, resp) {
      const ncDao = new NCDao(conn);
      ncDao
        .getDadosForm()
        .then((dadosForm) => {
          resp.marko(templates.nc.form, {
            registroNC: {},
            mp: dadosForm[0],
            nconf: dadosForm[1],
            und: dadosForm[2],
          });
        })
        .catch((erro) => console.log(erro));
    };
  }
  //Lista os registros de não conformidade. Auth.
  listaRNC() {
    return function (req, resp) {
      const ncDao = new NCDao(conn);
      ncDao
        .getRegistrosNC({}, {})
        .then((registroNC) => {
          resp.marko(templates.nc.listaregistros, {
            registroNC: JSON.stringify(registroNC),
          });
        })
        .catch((erro) => console.log(erro));
    };
  }
  //Chamado pelo formulário. Cadastra uma ou várias não conformidades. Loga o CPF do usuário autenticado, caso exista.
  //AJUSTAR PARA CADASTRAR ARRAY DE NC
  cadastra() {
    return function (req, resp) {
      let registro = req.body.dados;
      let cpfLogado = req.isAuthenticated() ? req.user.cpf : null;
      const clientIp = requestIp.getClientIp(req);
      registro.forEach((r, i) => {
        r['usuarioLogado'] = cpfLogado;
        r['horaCriacao'] = moment().format('DD/MM/YYYY');
        r['clientIP'] = clientIp;
      });
      const ncDao = new NCDao(conn);
      ncDao
        .insere(registro)
        .then((re) => {
          resp.send(re);
        })
        .catch((erro) => console.log(erro));
    };
  }
  //Carrega o formulário de registro de nova possível não conformidade. Auth.
  formCadastraNC() {
    return function (req, resp) {
      const ncDao = new NCDao(conn);
      ncDao
        .getDadosForm()
        .then((dadosForm) => {
          resp.marko(templates.nc.cadastranc, {
            cadastraNC: [{ nconformidade: '', descDet: '' }],
            mp: dadosForm[0],
          });
        })
        .catch((erro) => console.log(erro));
    };
  }
  //Chamado pelo POST do formulário. Cadastra nova possível não conformidade.
  cadastraNC() {
    return function (req, resp) {
      const registro = req.body;
      const clientIp = requestIp.getClientIp(req);
      registro['horaCriacao'] = new Date().toISOString();
      registro['clientIP'] = clientIp;
      registro['cpfUsuario'] = req.user.cpf;
      const ncDao = new NCDao(conn);
      ncDao
        .cadastraNC(registro)
        .then(
          resp.marko(templates.base.principal, {
            msg: 'Não Conformidade cadastrada com sucesso!',
          }),
        )
        .catch((erro) => console.log(erro));
    };
  }

  formEdicao() {
    return function (req, resp) {
      const id = new ObjectID(req.params.id);
      const ncDao = new NCDao(conn);
      ncDao
        .getFormEdicao(id)
        .then((nc) => {
          resp.marko(templates.nc.cadastranc, {
            mp: nc[0],
            cadastraNC: nc[1][0],
          });
        })
        .catch((erro) => console.log(erro));
    };
  }

  //Chamado pelo hidden PUT do formulário. Edita tipologia de não conformidade.
  edita() {
    return function (req, resp) {
      const ncDao = new NCDao(conn);
      ncDao
        .atualiza(req.body)
        .then(resp.redirect(NCControlador.rotas().lista))
        .catch((erro) => console.log(erro));
    };
  }

  removeNC() {
    return function (req, resp) {
      const id = new ObjectID(req.params.id);
      const ncDao = new NCDao(conn);
      ncDao
        .deletaTipoNC(id)
        .then((nc) => {
          resp.marko(templates.nc.lista, {
            nc: JSON.stringify(nc),
            msg: 'Tipo de Não Conformidade excluída com sucesso.',
          });
        })
        .catch((erro) => console.log(erro));
    };
  }
}
module.exports = NCControlador;
