const conn = require('../../config/mongodb').dados;
const mongo = require('../../config/mongodb').mongo;
const url = require('../../config/mongodb').url;
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

  upload(storage) {
    multer({ storage }).single('file');
  }

  lista() {
    return function (req, resp) {
      const ncDao = new NCDao(conn);
      ncDao
        .lista()
        .then((nc) =>
          resp.marko(templates.nc.lista, {
            nc: nc,
          }),
        )
        .catch((erro) => console.log(erro));
    };
  }

  envia() {
    let gfs;
    db.once('open', () => {
      gfs = grid(db, mongo);
      gfs.collection('uploads');
    });
    const storage = new gridFsStorage({
      url: url,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          const filename = file.originalname;
          //console.log("Entrou na promise");
          //console.log(req.file);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          };
          resolve(fileInfo);
        });
      },
    });
    let envio = multer({ storage }).single('file');
    return envio;
  }
}
module.exports = FileControlador;
