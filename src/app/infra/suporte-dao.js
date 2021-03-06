const { ObjectID } = require('mongodb');
class SuporteDao {
  constructor(db) {
    this._db = db;
  }

  criaIndicacao(registro) {
    return new Promise((resolve, reject) => {
      this._db.periodosIndicacao.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }
  getIndicacoes(filtro) {
    return new Promise((resolve, reject) => {
      this._db.periodosIndicacao
        .find(filtro)
        .sort({ _id: 1 })
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject(`Não foi possível listar o FAQ. Erro: ${erro}`);
          }
          return resolve(res);
        });
    });
  }
  atualizaPeriodo(filtro, registro) {
    return new Promise((resolve, reject) => {
      this._db.periodosIndicacao.updateOne(
        filtro,
        { $set: registro },
        function (erro, res) {
          if (erro) {
            return reject('Não foi possível atualizar o registro de eventos.');
          }
          return resolve(res);
        },
      );
    });
  }
}
module.exports = SuporteDao;
