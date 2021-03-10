const { ObjectID } = require('mongodb');
class SuporteDao {
  constructor(db) {
    this._db = db;
  }
}
module.exports = SuporteDao;
