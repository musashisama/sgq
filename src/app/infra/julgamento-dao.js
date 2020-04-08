const { ObjectID } = require('mongodb');

class JulgamentoDao {

    constructor(db) {
        this._db = db;
    }

    insereDadosCSV(registro) {
        return new Promise((resolve, reject) => {
            this._db.relatorios.insertOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }
}
module.exports = JulgamentoDao;