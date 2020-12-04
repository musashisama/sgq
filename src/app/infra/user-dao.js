const { ObjectID } = require('mongodb');

class UserDao {
  constructor(db) {
    this._db = db;
  }

  auth(filtro) {
    return new Promise((resolve, reject) => {
      this._db.usuarios.find(filtro).toArray(function (erro, res) {
        if (erro) {
          return reject('Erro na base de dados. Tente novamente mais tarde.');
        }
        return resolve(res);
      });
    });
  }

  atualizaSenha(filtro, valor) {
    return new Promise((resolve, reject) => {
      let novoValor = { $set: { senha: valor } };
      this._db.usuarios.updateOne(filtro, novoValor, function (erro, res) {
        if (erro) {
          return reject('Erro na base de dados. Tente novamente mais tarde.');
        }
        return resolve(res);
      });
    });
  }

  atualizaControle(filtro, valor) {
    return new Promise((resolve, reject) => {
      let novoValor = { $set: valor };
      this._db.trocasenha.updateOne(filtro, novoValor, function (erro, res) {
        if (erro) {
          return reject('Erro na base de dados. Tente novamente mais tarde.');
        }
        return resolve(res);
      });
    });
  }

  getUsers(filtro = {}, ordena = {}, projeta = {}) {
    return new Promise((resolve, reject) => {
      this._db.usuarios
        .find(filtro)
        .sort(ordena)
        .project(projeta)
        .toArray(function (erro, res) {
          if (erro) {
            return reject('Erro na base de dados. Tente novamente mais tarde.');
          }
          return resolve(res);
        });
    });
  }

  cadastraUser(registro) {
    return new Promise((resolve, reject) => {
      if (registro.cargo == 'Conselheiro') {
        registro.perfil = ['carf', 'conselheiro'];
      } else registro.Perfil = ['carf'];
      this._db.usuarios.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  buscaTrocaSenha(filtro) {
    return new Promise((resolve, reject) => {
      this._db.trocasenha.find(filtro).toArray(function (erro, res) {
        if (erro) {
          return reject('Erro na base de dados. Tente novamente mais tarde.');
        }
        return resolve(res);
      });
    });
  }

  insereTrocasenha(registro) {
    return new Promise((resolve, reject) => {
      this._db.trocasenha.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  atualizaPerfis(cpf, perfis) {
    return new Promise((resolve, reject) => {
      let comando = { $set: { perfil: perfis } };
      this._db.usuarios.updateOne(
        { cpf: cpf },
        { $set: { perfil: perfis } },
        function (erro, res) {
          if (erro) {
            return reject('Não foi possível inserir o registro.');
          }
          return resolve(res);
        },
      );
    });
  }

  atualizaTodos() {
    return new Promise((resolve, reject) => {
      this._db.usuarios.updateMany(
        { perfil: null },
        { $set: { perfil: ['carf'] } },
        function (erro, res) {
          if (erro) {
            return reject('Não foi possível inserir o registro.');
          }
          return resolve(res);
        },
      );
    });
  }

  deleteUser(filtro) {
    return new Promise((resolve, reject) => {
      this._db.usuarios.deleteOne(filtro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível excluir o registro.');
        }
        return resolve(res);
      });
    });
  }
}
module.exports = UserDao;
