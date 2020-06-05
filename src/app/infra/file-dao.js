class FileDao {

    constructor(db) {
        this._db = db;

    }
    
    getArq(filtro={}) {
        return new Promise((resolve, reject) => {
            this._db.arquivos
            .find(filtro)
            .sort({ _id:1 })
            .project()
            .toArray(function (erro, res) {
                if (erro) {
                    return reject(`Não foi possível listar os registros. Erro: ${erro}`);
                }
                return resolve(res);
            });
        });
    }   
    
    insereArq(registro) {
        return new Promise((resolve, reject) => {
            this._db.arquivos
            .insertOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }   
    atualizaArq(filtro, registro) {
        return new Promise((resolve, reject) => {
            this._db.arquivos.updateOne(filtro, { $set: registro }, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível atualizar o registro de eventos.');
                }
                return resolve(res);
            })
        });
    }

    excluiArq(registro) {
        return new Promise((resolve, reject) => {
            this._db.arquivos.deleteOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível removver o registro de eventos.');
                }
                return resolve(res);
            })
        });
    }    
}

module.exports = FileDao;
