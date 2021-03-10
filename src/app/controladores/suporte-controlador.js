const conn = require('../../config/mongodb').dados;
const mongo = require('../../config/mongodb').mongo;
const url = require('../../config/mongodb').url;
const db = require('../../config/mongodb').db;

class SuporteControlador {
  static rotas() {
    return {
      gestaoIndicacao: '/gestao-indicacao',
    };
  }
}
module.exports = SuporteControlador;
