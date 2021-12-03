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
  getPeriodosIndicacoes(filtro) {
    return new Promise((resolve, reject) => {
      this._db.periodosIndicacao
        .find(filtro)
        .sort({ _id: -1 })
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
  criaIndicacaoPauta(registro) {
    return new Promise((resolve, reject) => {
      let filtro = {
        $and: [
          { cpf: registro[0].cpf },
          { idIndicacao: registro[0].idIndicacao },
        ],
      };
      let reg = registro[0];
      this._db.indicacoesPauta.updateOne(
        filtro,
        { $set: reg },
        { upsert: true },
        function (erro, res) {
          if (erro) {
            return reject('Não foi possível inserir o registro.');
          }
          return resolve(res);
        },
      );
    });
  }
  getIndicacoesPauta(filtro) {
    return new Promise((resolve, reject) => {
      this._db.indicacoesPauta
        .find(filtro)
        .sort({ _id: -1 })
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject(`Não foi possível listar o FAQ. Erro: ${erro}`);
          }
          return resolve(res);
        });
    });
  }
  inserePautaConsolidada(registro) {
    return new Promise((resolve, reject) => {
      let filtro = {
        $and: [
          { colegiado: registro.colegiado },
          { idIndicacao: registro.idIndicacao },
        ],
      };
      this._db.pautas.updateOne(
        filtro,
        { $set: registro },
        { upsert: true },
        function (erro, res) {
          if (erro) {
            return reject('Não foi possível inserir o registro.');
          }
          return resolve(res);
        },
      );
    });
  }
}
module.exports = SuporteDao;
