const FileControlador = require('../controladores/file-controlador');
const fileControlador = new FileControlador();

module.exports = (app) => {

    const rotasArq = FileControlador.rotas();
    
    app.post(rotasArq.envia, fileControlador.envia(), function(req, res) {  
        res.redirect('/form');             
        res.end();//res = JSON.parse(res); 
        resposta = res;       
        console.log(typeof(res));
        console.log(res);        
    });
}