const { promises } = require('fs-extra');
const { ObjectID } = require('mongodb');

class PessoalDao {
  constructor(db) {
    this._db = db;
  }

  getUsers(filtro, projecao = { senha: 0 }) {
    return new Promise((resolve, reject) => {
      this._db.usuarios
        .find(filtro)
        .project(projecao)
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        });
    });
  }

  insereOcorrencia(registro) {
    return new Promise((resolve, reject) => {
      this._db.ocorrencias.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  getUnidades(filtro) {
    return new Promise((resolve, reject) => {
      this._db.unidadesCARF
        .find(filtro)
        .sort({ sigla: 1 })
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        });
    });
  }

  getTipoOcorrencias(filtro) {
    return new Promise((resolve, reject) => {
      this._db.tipoOcorrencias
        .find(filtro)
        .project()
        .sort({ tipoOcorrencia: 1 })
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        });
    });
  }

  insereTpOcorrencia(registro) {
    return new Promise((resolve, reject) => {
      this._db.tipoOcorrencias.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  editaTipoOcorrencias(id, registro) {
    return new Promise((resolve, reject) => {
      delete registro.id;
      this._db.tipoOcorrencias.updateOne(
        { _id: id },
        { $set: registro },
        function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        },
      );
    });
  }

  excluiTipoOcorrencias(id) {
    return new Promise((resolve, reject) => {
      this._db.tipoOcorrencias.deleteOne({ _id: id }, function (erro, res) {
        if (erro) {
          return reject('Não foi possível excluir o registro.');
        }
        return resolve(res);
      });
    });
  }

  getfuncoesCarf(filtro) {
    return new Promise((resolve, reject) => {
      this._db.funcoesCarf
        .find(filtro)
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        });
    });
  }

  getOcorrencias(filtro) {
    return new Promise((resolve, reject) => {
      this._db.ocorrencias
        .find(filtro)
        .project()
        .sort({ _id: 1 })
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        });
    });
  }

  editaCons(registro) {
    return new Promise((resolve, reject) => {
      this._db.usuarios.updateOne(
        { cpf: registro.cpf },
        { $set: registro },
        function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        },
      );
    });
  }

  editaConsReinp(filtro, registro) {
    return new Promise((resolve, reject) => {
      this._db.usuarios.updateOne(filtro, { $set: registro }, function (
        erro,
        res,
      ) {
        if (erro) {
          return reject('Erro na base de dados. Tente novamente mais tarde.');
        }
        return resolve(res);
      });
    });
  }

  editaPessoa(registro) {
    return new Promise((resolve, reject) => {
      console.log(registro.cpf);
      this._db.usuarios.updateOne(
        { cpf: registro.cpf },
        { $set: registro },
        function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        },
      );
    });
  }

  editaOcorrencia(id, registro) {
    return new Promise((resolve, reject) => {
      delete registro._id;
      this._db.ocorrencias.updateOne(
        { _id: new ObjectID(id) },
        { $set: registro },
        function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        },
      );
    });
  }

  excluiOcorrencia(id) {
    return new Promise((resolve, reject) => {
      this._db.ocorrencias.deleteOne({ _id: new ObjectID(id) }, function (
        erro,
        res,
      ) {
        if (erro) {
          return reject('Não foi possível excluir o registro.');
        }
        return resolve(res);
      });
    });
  }

  cadastraUser(registro) {
    return new Promise((resolve, reject) => {
      this._db.usuarios.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  getSolicitacoes(filtro) {
    return new Promise((resolve, reject) => {
      this._db.solicitacoes
        .find(filtro)
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        });
    });
  }

  excluiSolicitacao(id) {
    return new Promise((resolve, reject) => {
      this._db.solicitacoes.deleteOne({ _id: new ObjectID(id) }, function (
        erro,
        res,
      ) {
        if (erro) {
          return reject('Não foi possível excluir o registro.');
        }
        return resolve(res);
      });
    });
  }

  cadastraSolicitacao(registro) {
    return new Promise((resolve, reject) => {
      this._db.solicitacoes.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  editaSolicitacao(registro) {
    return new Promise((resolve, reject) => {
      delete registro._id;
      this._db.solicitacoes.updateOne(
        { uniqueId: registro.uniqueId },
        { $set: registro },
        function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        },
      );
    });
  }

  gettpSolicitacoes(filtro, projecao, ordena) {
    return new Promise((resolve, reject) => {
      this._db.tpSolicitacoes
        .find(filtro)
        .project(projecao)
        .sort(ordena)
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        });
    });
  }

  excluitpSolicitacao(id) {
    return new Promise((resolve, reject) => {
      this._db.tpSolicitacoes.deleteOne({ _id: new ObjectID(id) }, function (
        erro,
        res,
      ) {
        if (erro) {
          return reject('Não foi possível excluir o registro.');
        }
        return resolve(res);
      });
    });
  }

  cadastratpSolicitacao(registro) {
    return new Promise((resolve, reject) => {
      this._db.tpSolicitacoes.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  editatpSolicitacao(registro) {
    return new Promise((resolve, reject) => {
      delete registro._id;
      this._db.tpSolicitacoes.updateOne(
        { uniqueID: registro.uniqueId },
        { $set: registro },
        function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        },
      );
    });
  }
}

module.exports = PessoalDao;
