const conn = require('../../config/mongodb').dados;
const mongo = require('../../config/mongodb').mongo;
const url = require('../../config/mongodb').url;
const dbo = require('../../config/mongodb').dbo;
const db = require('../../config/mongodb').db;
const FileDao = require('../infra/file-dao');
const path = require('path');
const multer = require('multer');
const gridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');

class FileControlador {

    static rotas() {
        return {
            
            envia: '/upload',
           
            
        };
    }

    lista() {
        return function(req, resp) {
            const ncDao = new NCDao(conn);            
            ncDao.lista()
                    .then(nc => resp.marko(
                        templates.nc.lista,
                        {
                            nc: nc
                        }
                    ))
                    .catch(erro => console.log(erro));
        };
    }
   
    envia() {
        return function(req, resp) {
            const fileDao = new FileDao(conn);                     
            let gfs = grid(db, mongo);
            gfs.collection('uploads');

            const storage = new gridFsStorage({
                url: url,
                file: (req, file) => {
                  return new Promise((resolve, reject) => {
                      const filename = file.originalname;
                      console.log("Entrou na promise");
                      const fileInfo = {
                        filename: filename,
                        bucketName: 'uploads'
                      };
                      resolve(fileInfo);
                  });
                }
            });
            const upload = multer({ storage });


            console.log('Req Body:' +req.body);
            const registro = req.body;
            fileDao.upload(registro)
                .then(console.log("Registro: "+registro))
                .catch(erro => console.log(erro));
        }
    }
}

module.exports = FileControlador;