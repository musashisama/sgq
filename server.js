const app = require('./src/config/custom-express');


let porta = 3010;
app.set('trust proxy', true);
app.listen(porta, function(){
    console.log(`Servidor rodando na porta: ${porta}.`);
});
