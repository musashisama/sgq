class UserDao {

    constructor(db) {
        this._db = db;
    }    

    buscaUser(cpf) {
        return new Promise((resolve, reject) => {

            this._db.usuarios
                .find({ cpf: cpf })
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Erro na base de dados. Tente novamente mais tarde.');
                    }
                    return resolve(res);
                });

        });
    }

    getUsers() {
        return new Promise((resolve, reject) => {

            this._db.usuarios
                .find()
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

            this._db.usuarios.insertOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }
}

module.exports = UserDao;