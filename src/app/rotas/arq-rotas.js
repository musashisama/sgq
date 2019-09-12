const FileControlador = require('../controladores/file-controlador');
const fileControlador = new FileControlador();

module.exports = (app) => {

    const rotasArq = FileControlador.rotas();

    app.post(rotasArq.envia, fileControlador.envia());
}