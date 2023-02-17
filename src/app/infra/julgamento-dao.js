const { ObjectID } = require('mongodb');

class JulgamentoDao {
  constructor(db) {
    this._db = db;
  }

  insereDadosCSV(registro) {
    return new Promise((resolve, reject) => {
      try {
        this._db.relatorios.insertOne(registro, function (erro, res) {
          if (erro) {
            return reject(erro);
          }
          return resolve(res);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
  // insereDadosCSV(registro) {
  //   try {
  //     this._db.relatorios.insertOne(registro);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  insereVariosRelatorios(registro) {
    return new Promise((resolve, reject) => {
      this._db.relatorios.insertMany(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.\n' + erro);
        }
        return resolve(res);
      });
    });
  }

  getFAQ(filtro) {
    return new Promise((resolve, reject) => {
      this._db.faq
        .find(filtro)
        .sort({ _id: 1 })
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject(`Não foi possível listar o FAQ. Erro: ${erro}`);
          }
          return resolve(res);
        });
    });
  }

  insereFAQ(registro) {
    return new Promise((resolve, reject) => {
      this._db.faq.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  atualizaFAQ(filtro, registro) {
    return new Promise((resolve, reject) => {
      this._db.faq.updateOne(filtro, { $set: registro }, function (erro, res) {
        if (erro) {
          return reject('Não foi possível atualizar o registro de eventos.');
        }
        return resolve(res);
      });
    });
  }

  excluiFAQ(registro) {
    return new Promise((resolve, reject) => {
      this._db.faq.deleteOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível removver o registro de eventos.');
        }
        return resolve(res);
      });
    });
  }

  insereCal(registro) {
    return new Promise((resolve, reject) => {
      this._db.calendario.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  getCal(filtro) {
    return new Promise((resolve, reject) => {
      this._db.calendario
        .find(filtro)
        .sort()
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject(
              `Não foi possível listar os registros de eventos Erro: ${erro}`,
            );
          }
          return resolve(res);
        });
    });
  }

  atualizaCal(filtro, registro) {
    return new Promise((resolve, reject) => {
      this._db.calendario.updateOne(
        filtro,
        { $set: registro },
        function (erro, res) {
          if (erro) {
            return reject('Não foi possível atualizar o registro de eventos.');
          }
          return resolve(res);
        },
      );
    });
  }

  excluiCal(registro) {
    return new Promise((resolve, reject) => {
      this._db.calendario.deleteOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível removver o registro de eventos.');
        }
        return resolve(res);
      });
    });
  }

  getRelatorios(filtro, sort, projecao) {
    return new Promise((resolve, reject) => {
      this._db.relatorios
        .find(filtro)
        .sort(sort)
        .project(projecao)
        .toArray(function (erro, res) {
          if (erro) {
            return reject(
              `Não foi possível listar os relatórios. Erro: ${erro}`,
            );
          }
          return resolve(res);
        });
    });
  }

  excluiRelatorio(registro) {
    return new Promise((resolve, reject) => {
      this._db.relatorios.deleteOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível removver o registro de eventos.');
        }
        return resolve(res);
      });
    });
  }

  getGC(filtro, sort) {
    return new Promise((resolve, reject) => {
      this._db.gc
        .find(filtro)
        .sort(sort)
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject(`Não foi possível listar o gc. Erro: ${erro}`);
          }
          return resolve(res);
        });
    });
  }

  insereGC(registro) {
    return new Promise((resolve, reject) => {
      this._db.gc.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  atualizaGC(filtro, registro) {
    return new Promise((resolve, reject) => {
      this._db.gc.updateOne(filtro, { $set: registro }, function (erro, res) {
        if (erro) {
          return reject('Não foi possível atualizar o registro de eventos.');
        }
        return resolve(res);
      });
    });
  }

  excluiGC(registro) {
    return new Promise((resolve, reject) => {
      this._db.gc.deleteOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível removver o registro de eventos.');
        }
        return resolve(res);
      });
    });
  }

  getPortal(filtro) {
    return new Promise((resolve, reject) => {
      this._db.portal
        .find(filtro)
        .sort({ ordem: 1 })
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject(
              `Não foi possível listar os registros. Erro: ${erro}`,
            );
          }
          return resolve(res);
        });
    });
  }

  inserePortal(registro) {
    return new Promise((resolve, reject) => {
      this._db.portal.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  atualizaPortal(filtro, registro) {
    return new Promise((resolve, reject) => {
      this._db.portal.updateOne(
        filtro,
        { $set: registro },
        function (erro, res) {
          if (erro) {
            return reject('Não foi possível atualizar o registro de eventos.');
          }
          return resolve(res);
        },
      );
    });
  }

  excluiPortal(registro) {
    return new Promise((resolve, reject) => {
      this._db.portal.deleteOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível removver o registro de eventos.');
        }
        return resolve(res);
      });
    });
  }
  insereVariosRegap(registro) {
    return new Promise((resolve, reject) => {
      try {
        this._db.regap.insertMany(registro, function (erro, res) {
          if (erro) {
            return reject(erro);
          }
          return resolve(res);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  insereRegap(registro) {
    return new Promise((resolve, reject) => {
      this._db.regap.insert(registro, function (erro, res) {
        if (erro) {
          return reject(erro);
        }
        return resolve(res);
      });
    });
  }

  getRegap(filtro, sort, projecao, limit = 0) {
    return new Promise((resolve, reject) => {
      this._db.regap
        .find(filtro)
        .limit(limit)
        .sort(sort)
        .project(projecao)
        .toArray(function (erro, res) {
          if (erro) {
            return reject(
              `Não foi possível listar os registros. Erro: ${erro}`,
            );
          }
          return resolve(res);
        });
    });
  }

  excluiRegap(registro) {
    return new Promise((resolve, reject) => {
      this._db.regap.deleteMany(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível removver o registro de eventos.');
        }
        return resolve(res);
      });
    });
  }

  getRegapDistinct(filtro) {
    return new Promise((resolve, reject) => {
      this._db.regap.distinct(filtro, function (erro, res) {
        if (erro) {
          return reject(`Não foi possível listar os registros. Erro: ${erro}`);
        }
        return resolve(res);
      });
    });
  }

  atualizaDataRegap(filtro, registro) {
    return new Promise((resolve, reject) => {
      this._db.regap.updateMany(filtro, registro, function (erro, res) {
        if (erro) {
          return reject(erro);
        }
        return resolve(res);
      });
    });
  }
  atualizaRegap(filtro, registro) {
    return new Promise((resolve, reject) => {
      this._db.regap.updateMany(filtro, registro, function (erro, res) {
        if (erro) {
          return reject(erro);
        }
        return resolve(res);
      });
    });
  }
  insereReinp(registro) {
    return new Promise((resolve, reject) => {
      this._db.reinp.insertMany(registro, function (erro, res) {
        if (erro) {
          return reject('Registros inseridos com sucesso!');
        }
        return resolve(res);
      });
    });
  }

  getAPES(filtro = {}) {
    return new Promise((resolve, reject) => {
      this._db.APES749.find(filtro).toArray(function (erro, res) {
        if (erro) {
          return reject(`Não foi possível listar os registros. Erro: ${erro}`);
        }
        return resolve(res);
      });
    });
  }

  updateAPES(arrayProc, sol) {
    return new Promise((resolve, reject) => {
      this._db.APES749.updateMany(
        { Processo: { $in: arrayProc } },
        { $set: { solicitacao: sol } },
        function (erro, res) {
          if (erro) {
            return reject('Não foi possível atualizar o registro.');
          }
          return resolve(res);
        },
      );
    });
  }

  getAnosReinp(filtro) {
    return new Promise((resolve, reject) => {
      this._db.reinp.distinct(filtro, function (erro, res) {
        if (erro) {
          return reject(`Não foi possível listar os registros. Erro: ${erro}`);
        }
        return resolve(res);
      });
    });
  }
  getReinp(filtro) {
    return new Promise((resolve, reject) => {
      this._db.reinp
        .find(filtro)
        .sort()
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject(
              `Não foi possível listar os registros. Erro: ${erro}`,
            );
          }
          return resolve(res);
        });
    });
  }
  atualizaReinp(filtro, registro) {
    return new Promise((resolve, reject) => {
      this._db.reinp.updateOne(
        filtro,
        { $set: { cpf: registro.cpf } },
        function (erro, res) {
          if (erro) {
            return reject('Não foi possível atualizar o registro.');
          }
          return resolve(res);
        },
      );
    });
  }

  getPopup(filtro) {
    return new Promise((resolve, reject) => {
      this._db.msgPopup
        .find(filtro)
        .sort()
        .project()
        .toArray(function (erro, res) {
          if (erro) {
            return reject(
              `Não foi possível listar os registros. Erro: ${erro}`,
            );
          }
          return resolve(res);
        });
    });
  }

  inserePopup(registro) {
    return new Promise((resolve, reject) => {
      this._db.msgPopup.insertOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível inserir o registro.');
        }
        return resolve(res);
      });
    });
  }

  atualizaPopup(filtro, registro) {
    return new Promise((resolve, reject) => {
      this._db.msgPopup.updateOne(
        filtro,
        { $set: registro },
        function (erro, res) {
          if (erro) {
            return reject('Não foi possível atualizar o registro de eventos.');
          }
          return resolve(res);
        },
      );
    });
  }

  excluiPopup(registro) {
    return new Promise((resolve, reject) => {
      this._db.msgPopup.deleteOne(registro, function (erro, res) {
        if (erro) {
          return reject('Não foi possível removver o registro de eventos.');
        }
        return resolve(res);
      });
    });
  }
}
module.exports = JulgamentoDao;
