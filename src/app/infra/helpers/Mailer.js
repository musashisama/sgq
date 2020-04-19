const nodemailer = require('nodemailer');

class Mailer {

    constructor() {
        throw new Error('Mailer não pode ser instanciada. Utilize os métodos estáticos.');
    }
    static _remetente() {
        let remetente = nodemailer.createTransport({
            host: 'serpromail.serpro.gov.br',
            service: 'serpromail.serpro.gov.br',
            port: 465,
            secure: true,
            auth: {
                user: 'paulo.junior@carf.economia.gov.br',
                pass: 'qyi3thn3N@'
            }
        })
        return remetente;
    }

    static _mensagem(para,assunto,corpo){
        let mensagem = {
            from: 'paulo.junior@carf.economia.gov.br',
            to: para,
            subject: assunto,
            html: corpo,
            };
            return mensagem;
    }

    static enviaMail(para = '',assunto ='', corpo=''){

        Mailer._remetente().sendMail(Mailer._mensagem(para,assunto,corpo), function(error){
            if (error) {
            console.log(error);
            } else {
            console.log('Email enviado com sucesso.');
            }
            });
    }
}
module.exports = Mailer;
