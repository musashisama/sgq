class FileDao {

    constructor(db) {
        this._db = db;

    }   

    upload(registro) {

        return new Promise((resolve, reject) => {
                        
            this._db.registroNC.insertOne(registro, function(erro, res){
                if(erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }

}

module.exports = FileDao;
