const nodemailer = require('nodemailer');
const BaseDao = require('../base-dao');
const conn = require('../../../config/mongodb').dados;

class Mailer {
  constructor() {
    throw new Error(
      'Mailer não pode ser instanciada. Utilize os métodos estáticos.',
    );
  }

  static enviaMail(para = '', assunto = '', corpo = '') {
    let baseDao = new BaseDao(conn);
    new Promise((resolve, reject) => {
      return resolve(baseDao.getConfig('mail'));
    })
      .then((conf) => {
        // let mail = {
        //   host: conf[0].host,
        //   service: conf[0].service,
        //   port: +conf[0].port,
        //   secure: true,
        //   auth: {
        //     user: conf[0].user,
        //     pass: conf[0].pass,
        //   },
        let mail = {
          host: 'mail-apl.serpro.gov.br',
          service: 'mail-apl.serpro.gov.br',
          port: +25,
          //secure: true,
        };
        let cabecalho = '<h2>Sistema de Gestão Integrada do CARF</h2>';
        let rodape =
          '<p><em>Este e-mail foi enviado de forma automática. Favor não respondê-lo.</em></p>';
        let mensagem = {
          from: 'sgi.carf@economia.gov.br',
          to: para,
          subject: assunto,
          html: cabecalho.concat(corpo, rodape),
        };
        let msg = { mail: mail, mensagem: mensagem };
        return msg;
      })
      .then((msg) => {
        nodemailer
          .createTransport(msg.mail)
          .sendMail(msg.mensagem, function (error) {
            if (error) {
              console.log(error);
            } else {
              //console.log('Email enviado com sucesso.');
            }
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
module.exports = Mailer;
