const { ObjectID } = require('mongodb');
class BaseDao {
  constructor(db) {
    this._db = db;
  }

  listaUnidades(filtro, ordena) {
    return new Promise((resolve, reject) => {
      this._db.unidadesCARF
        .find()
        .sort(ordena)
        .project(filtro)
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Não foi possível listar as Unidades.');
          }
          return resolve(res);
        });
    });
  }

  listaMacro(filtro, ordena) {
    return new Promise((resolve, reject) => {
      this._db.macroprocessos
        .find()
        .sort(ordena)
        .project(filtro)
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Não foi possível listar os macroprocessos.');
          }
          return resolve(res);
        });
    });
  }

  listaPerfis(filtro, ordena) {
    return new Promise((resolve, reject) => {
      this._db.perfis
        .find()
        .sort(ordena)
        .project(filtro)
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Não foi possível listar os perfis.');
          }
          return resolve(res);
        });
    });
  }

  logger(registro) {
    return new Promise((resolve, reject) => {
      this._db.registroLogs.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro de log.');
        }
        return resolve(res);
      });
    });
  }

  regVote(registro) {
    return new Promise((resolve, reject) => {
      this._db.votacaoPremio.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  getVote() {
    return new Promise((resolve, reject) => {
      this._db.votacaoPremio
        .find()
        .sort()
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Não foi possível buscar as configurações.');
          }
          return resolve(res);
        });
    });
  }

  getConfig(config) {
    return new Promise((resolve, reject) => {
      this._db.config
        .find({ config: config })
        .sort()
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Não foi possível buscar as configurações.');
          }
          return resolve(res);
        });
    });
  }

  getPopup(filtro) {
    return new Promise((resolve, reject) => {
      this._db.msgPopup
        .find(filtro)
        .sort({ _id: -1 })
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject(
              `Não foi possível listar os registros. Erro: ${erro}`,
            );
          }
          return resolve(res);
        });
    });
  }

  getAlegacoes(filtro = null) {
    return new Promise((resolve, reject) => {
      this._db.tabAlegacoes
        .find(filtro)
        .sort()
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Não foi possível buscar as configurações.');
          }
          return resolve(res);
        });
    });
  }
}
module.exports = BaseDao;
