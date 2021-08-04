const fs = require('fs');
const d3 = require('d3');
const xlsx = require('node-xlsx').default;
const moment = require('moment');
const AdmZip = require('adm-zip');
const exec = require('child_process').exec;
const cmd = `mongoimport -d sgq -c processos --type csv --file src/app/arquivos/csv/Gerencial-${new Date().getFullYear()}-${
  new Date().getMonth().valueOf() + 1
}-${new Date().getDate()}.csv --headerline`;
const path = `src/app/arquivos/csv/`;
let gerado = `Gerencial-`;
let semanaAzul = [
  '2ª TURMA-CSRF-CARF-MF-DF',
  '1ª TE-2ªSEÇÃO-2001-CARF-MF-DF',
  '2ª TE-2ªSEÇÃO-2002-CARF-MF-DF',
  '3ª TE-2ªSEÇÃO-2003-CARF-MF-DF',
  '3ª SEÇÃO-CARF-MF-DF',
  '1ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '2ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '1ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '2ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '1ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '2ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '1ª CÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª CÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '3ª CÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '4ª CÂMARA-2ªSEÇÃO-CARF-MF-DF',
];
let semanaVerde = [
  '1ª TURMA-CSRF-CARF-MF-DF',
  '1ª TE-1ªSEÇÃO-1001-CARF-MF-DF',
  '2ª TE-1ªSEÇÃO-1002-CARF-MF-DF',
  '3ª TE-1ªSEÇÃO-1003-CARF-MF-DF',
  '2ª SEÇÃO-CARF-MF-DF',
  '1ª TO-2ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '1ª TO-2ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª TO-2ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª TO-2ªCAMARA-2ªSEÇÃO-CARF-MF-DF',
  '1ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '1ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '1ª CÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '2ª CÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '3ª CÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '4ª CÂMARA-1ªSEÇÃO-CARF-MF-DF',
];
let semanaAmarela = [
  '3ª TURMA-CSRF-CARF-MF-DF',
  '1ª TE-3ªSEÇÃO-3001-CARF-MF-DF',
  '2ª TE-3ªSEÇÃO-3002-CARF-MF-DF',
  '3ª TE-3ªSEÇÃO-3003-CARF-MF-DF',
  '1ª SEÇÃO-CARF-MF-DF',
  '1ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '2ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '1ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '2ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '1ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '2ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '1ª CÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '2ª CÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '3ª CÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '4ª CÂMARA-3ªSEÇÃO-CARF-MF-DF',
];
let perVerde = {
  inicioT1: moment('06/12/2019', 'DD/MM/YYYY'),
  fimT1: moment('05/03/2020', 'DD/MM/YYYY'),
  inicioT2: moment('06/03/2020', 'DD/MM/YYYY'),
  fimT2: moment('04/06/2020', 'DD/MM/YYYY'),
  inicioT3: moment('05/06/2020', 'DD/MM/YYYY'),
  fimT3: moment('03/09/2020', 'DD/MM/YYYY'),
  inicioT4: moment('04/09/2020', 'DD/MM/YYYY'),
  fimT4: moment('03/12/2020', 'DD/MM/YYYY'),
};
let perAmarela = {
  inicioT1: moment('13/12/2019', 'DD/MM/YYYY'),
  fimT1: moment('12/03/2020', 'DD/MM/YYYY'),
  inicioT2: moment('13/03/2020', 'DD/MM/YYYY'),
  fimT2: moment('18/06/2020', 'DD/MM/YYYY'),
  inicioT3: moment('19/06/2020', 'DD/MM/YYYY'),
  fimT3: moment('18/09/2020', 'DD/MM/YYYY'),
  inicioT4: moment('19/09/2020', 'DD/MM/YYYY'),
  fimT4: moment('10/12/2020', 'DD/MM/YYYY'),
};
let perAzul = {
  inicioT1: moment('19/12/2019', 'DD/MM/YYYY'),
  fimT1: moment('19/03/2020', 'DD/MM/YYYY'),
  inicioT2: moment('20/03/2020', 'DD/MM/YYYY'),
  fimT2: moment('25/06/2020', 'DD/MM/YYYY'),
  inicioT3: moment('26/06/2020', 'DD/MM/YYYY'),
  fimT3: moment('24/09/2020', 'DD/MM/YYYY'),
  inicioT4: moment('25/09/2020', 'DD/MM/YYYY'),
  fimT4: moment('16/12/2020', 'DD/MM/YYYY'),
};
//let gerado = '';
class CSVHandler {
  constructor() {
    throw new Error(
      'CSVHandler não pode ser instanciada. Utilize os métodos estáticos.',
    );
  }

  static semanaCores(turma) {
    if (semanaAmarela.includes(turma)) {
      return 'Amarela';
    }
    if (semanaVerde.includes(turma)) {
      return 'Verde';
    }
    if (semanaAzul.includes(turma)) {
      return 'Azul';
    }
  }

  static periodos(semana) {
    if (semana == 'Verde') {
      return perVerde;
    }
    if (semana == 'Azul') {
      return perAzul;
    }
    if (semana == 'Amarela') {
      return perAmarela;
    }
  }

  static wrangleCSV(arq, semana, tipo) {
    return new Promise((resolve, reject) => {
      if (tipo == 'Estoque' || tipo == 'REGAP') {
        fs.readFile(arq, 'latin1', function (err, data) {
          let dados = d3.csvParse(data);
          gerado = gerado + arq.split('/')[arq.split('/').length - 1];
          dados = CSVHandler._HorasCARF(dados).then((dados) => {
            CSVHandler._renomeiaColunas(dados)
              .then((dados) => {
                return dados;
              })
              .then((dados) => {
                let parcial = [];
                dados.forEach((dado) => {
                  if (
                    semana == 'Amarela' &&
                    semanaAmarela.includes(dado['Equipe_Atual'])
                  ) {
                    parcial.push(dado);
                  }
                  if (
                    semana == 'Verde' &&
                    semanaVerde.includes(dado['Equipe_Atual'])
                  ) {
                    parcial.push(dado);
                  }
                  if (
                    semana == 'Azul' &&
                    semanaAzul.includes(dado['Equipe_Atual'])
                  ) {
                    parcial.push(dado);
                  }
                  if (
                    semana == 'Todas' &&
                    (semanaAzul.includes(dado['Equipe_Atual']) ||
                      semanaVerde.includes(dado['Equipe_Atual']) ||
                      semanaAmarela.includes(dado['Equipe_Atual']))
                  ) {
                    parcial.push(dado);
                  }
                });
                //console.log(dados.length + "   " + parcial.length);
                CSVHandler._escreveZip(path + gerado, parcial).then(() => {
                  let csvmongo = CSVHandler._montaObjRelatorio(parcial, tipo);
                  CSVHandler._excluiCSV(arq);
                  CSVHandler._excluiCSV(`${path}${gerado}`);
                  gerado = 'Gerencial-';
                  return resolve(csvmongo);
                });
              });
          });
        });
      } else {
        // if (tipo == 'REINP') {
        //   fs.readFile(arq, 'utf8', function (err, data) {
        //     data = data.replace(/;"Métrica";/gi, ';');
        //     data = data.replace(/;;/gi, ';');
        //     let dados = d3.csvParse(data);
        //     gerado = gerado + arq.split('/')[arq.split('/').length - 1];
        //     let rex2 = /([0-9])([0-9]ª)/gi;
        //     let rex3 = /( )([0-9])/gi;
        //     CSVHandler._renomeiaReinp(dados).then((dados) => {
        //       CSVHandler._horas_Reinp(dados).then((dados) => {
        //         dados.forEach((dado) => {
        //           dado.Equipe = dado.Equipe.replace(rex3, '$2');
        //           dado.Equipe = dado.Equipe.replace(rex2, '$2');
        //           dado.Data = moment(
        //             CSVHandler._ajustaData(dado.Data_Situacao, true),
        //           ).format('DD/MM/YYYY');
        //           delete dado.Data_Situacao;
        //         });
        //         CSVHandler._escreveZip(path + gerado, dados).then(() => {
        //           let csvmongo = CSVHandler._montaObjRelatorio(dados, tipo);
        //           CSVHandler._excluiCSV(arq);
        //           CSVHandler._excluiCSV(`${path}${gerado}`);
        //           gerado = 'Gerencial-';
        //           return resolve(csvmongo);
        //         });
        //       });
        //     });
        //   });
        // }
        // if (tipo == 'REINP') {
        //   let jsonT1 = JSON.parse(fs.readFileSync('REINP03.json', 'utf8'));
        //   let jsonT2 = JSON.parse(fs.readFileSync('REINP06.json', 'utf8'));
        //   let cons = JSON.parse(fs.readFileSync('cons.json', 'utf8'));
        //   fs.readFile(arq,'utf8', function(err,data){
        //     let json = JSON.parse(data)
        //     console.log(json);
        //   })
        //   jsonT1.forEach((element) => {
        //     cons.forEach((cons) => {
        //       element.conselheiro.trimestre = 'T1';
        //       if (
        //         removerAcentos(element.conselheiro.nome.toLowerCase()) ==
        //         removerAcentos(cons.nome).toLowerCase()
        //       ) {
        //         element.conselheiro.cpf = cons.cpf.toString();
        //       }
        //     });
        //   });
        //   //fs.writeFileSync('T1.json', JSON.stringify(json));
        // }
      }
    });
  }
  //Descompacta e lê o CSV.
  static readCSV(arq) {
    return new Promise((resolve, reject) => {
      let zip = new AdmZip(arq);
      let dados = [];
      var comprimidos = zip.getEntries();
      zip.extractEntryTo(comprimidos[0], path, false, true);
      fs.readFile(
        `${path}${comprimidos[0].entryName}`,
        'utf8',
        function (err, data) {
          if (err) {
            return reject;
          }
          dados = d3.csvParse(data);
          return resolve(dados);
        },
      );
      fs.unlink(`${path}${comprimidos[0].entryName}`, function (error) {
        if (error) {
          console.log(`Erro: ${error}`);
          return reject;
        }
      });
    });
  }

  static pegaEstoque(arq) {
    return new Promise((resolve, reject) => {
      let flat = [];
      let dados = {};
      let parcial = [];
      dados = this.readCSV(arq).then((dados) => {
        dados.forEach((d) => {
          if (
            (d['Atividade'] == 'Para Relatar' &&
              d['Situacao'] == 'AGUARDANDO PAUTA') ||
            d['Atividade'] == 'Formalizar Voto Vencedor'
          ) {
            //||d['Ind_Apenso']=='N'||(d['Ind_Apenso']=='S' && d['Questionamento_CARF']!='')
            parcial.push(d);
          }
        });
        let porCPF = d3
          .nest()
          .key((d) => {
            return d.CPF;
          })
          .sortKeys(d3.ascending)
          .rollup((v) => {
            return {
              HE: d3.sum(v, function (d) {
                return d.HE_CARF;
              }),
              qtdeProc: v.length,
            };
          })
          .entries(parcial);

        porCPF.forEach((cpf) => {
          if (cpf.key === '') {
            flat.push({
              CPF: '12345678910',
              HE_CARF: +cpf.value.HE.toFixed(2),
              qtdeProc: +cpf.value.qtdeProc,
            });
          } else {
            flat.push({
              CPF: cpf.key,
              HE_CARF: +cpf.value.HE.toFixed(2),
              qtdeProc: +cpf.value.qtdeProc,
            });
          }
          return resolve(flat);
        });
        return reject;
      });
    });
  }

  static pegaRegap(arq, tipo, CPF) {
    return new Promise((resolve, reject) => {
      let flat = [];
      let hoje = new Date().getTime();
      let dias = 1000 * 60 * 60 * 24;
      let regap = this.readCSV(arq).then((regap) => {
        let porCPF = d3
          .nest()
          .key((d) => {
            return d.CPF;
          })
          .sortKeys(d3.ascending)
          .entries(regap);
        porCPF.forEach((cpf) => {
          cpf.values.forEach((valor) => {
            flat.push({
              Observacoes: valor.Observacoes,
              CPF: cpf.key,
              Processo: valor.Processo,
              Contribuinte: valor.Contribuinte,
              Ind_Apenso: valor.Ind_Apenso,
              Equipe_Atual: valor.Equipe_Atual,
              Situacao: valor.Situacao,
              Entrada_na_Atividade: valor.Entrada_na_Atividade,
              Atividade: valor.Atividade,
              Data_ultima_distribuicao: valor.Data_ultima_distribuicao,
              HE_CARF: +valor.HE_CARF,
              redator: valor.Redator1 + valor.Redator2 + valor.Redator3,
              Data_da_Sessao_Julgamento: valor.Data_da_Sessao_Julgamento,
              Equipe_Ultima: valor.Equipe_Ultima,
              Relator: valor.Relator,
              Alegacoes_CARF: valor.Alegacoes_CARF,
              Questionamento_CARF: `${valor.Questionamento_CARF}${
                valor.Questionamento_2_CARF_20
                  ? '/ ' + valor.Questionamento_2_CARF_20
                  : ''
              } ${
                valor.Questionamento_3_CARF_21
                  ? '/ ' + valor.Questionamento_3_CARF_21
                  : ''
              }`,
              Resolucao: valor.Resolucao,
              Acordao: valor.Acordao,
              Valor: valor.Valor,
              Valor_Originario: valor.Valor_Originario,
              Valor_Sem_TJM: valor.Valor_Sem_TJM,
              Valor_Credito_Lancado: valor.Valor_Credito_Lancado,
              AtividadeUltima: valor.AtividadeUltima,
              Dias_na_Atividade: Math.floor(
                (hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) /
                  dias,
              ),
              Dias_da_SJ: Math.floor(
                (hoje -
                  CSVHandler._ajustaData(valor.Data_da_Sessao_Julgamento)) /
                  dias,
              ),
              Dias_da_Dist: Math.floor(
                (hoje -
                  CSVHandler._ajustaData(valor.Data_ultima_distribuicao)) /
                  dias,
              ),
              Retorno_Sepoj: valor.Equipe_Ultima.includes(
                'SEPOJ-COSUP-CARF-MF-DF',
              )
                ? 'Sim'
                : 'Não',
              Prioridade: valor.Prioridade,
              Motivo_Prioridade: valor.Motivo_Prioridade,
              Assunto: valor.Assunto,
              Ind_Juntada: valor.Ind_Juntada,
            });
          });
        });
        if (tipo == 'COJUL') {
          let filtro = [];
          flat.forEach((valor) => {
            if (valor.Ind_Apenso == 'N') {
              filtro.push(valor);
            }
            if (
              !CSVHandler._isEmpty(valor.Questionamento_CARF) &&
              valor.Ind_Apenso == 'S' &&
              valor.Atividade == 'Para Relatar' &&
              Math.floor(
                (hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) /
                  dias,
              ) >= 0
            ) {
              filtro.push(valor);
            }
            if (
              !CSVHandler._isEmpty(valor.Questionamento_CARF) &&
              valor.Ind_Apenso == 'S' &&
              valor.Atividade == 'Formalizar Decisao' &&
              Math.floor(
                (hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) /
                  dias,
              ) >= 0
            ) {
              filtro.push(valor);
            }
            if (
              !CSVHandler._isEmpty(valor.Questionamento_CARF) &&
              valor.Ind_Apenso == 'S' &&
              valor.Atividade == 'Formalizar Voto Vencedor' &&
              Math.floor(
                (hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) /
                  dias,
              ) >= 0
            ) {
              filtro.push(valor);
            }
            if (
              !CSVHandler._isEmpty(valor.Questionamento_CARF) &&
              valor.Ind_Apenso == 'S' &&
              valor.Atividade == 'Apreciar e Assinar Documento' &&
              Math.floor(
                (hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) /
                  dias,
              ) >= 0
            ) {
              filtro.push(valor);
            }
            if (
              !CSVHandler._isEmpty(valor.Questionamento_CARF) &&
              valor.Ind_Apenso == 'S' &&
              valor.Atividade == 'Corrigir Decisão' &&
              Math.floor(
                (hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) /
                  dias,
              ) >= 0
            ) {
              filtro.push(valor);
            }
            return resolve(filtro);
          });
        }
        if (CPF) {
          let filtro = [];
          flat.forEach((resp) => {
            if (resp.CPF == CPF) {
              filtro.push(resp);
            }
          });
          return resolve(filtro);
        } else return resolve(flat);
      });
      return reject;
    });
  }

  static pegaReinp(arq, CPF) {
    return new Promise((resolve, reject) => {
      let flatVerde = [];
      let flatAmarela = [];
      let flatAzul = [];
      this.readCSV(arq)
        .then((reinp) => {
          reinp.forEach((valores) => {
            valores.mes =
              moment(valores.Data, 'DD/MM/YYYY').month() +
              1 +
              '/' +
              moment(valores.Data, 'DD/MM/YYYY').year();
            if (semanaVerde.includes(valores.Equipe)) {
              valores.semana = 'Verde';
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perVerde.inicioT1,
                  perVerde.fimT1,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T1';
                flatVerde.push(valores);
              }
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perVerde.inicioT2,
                  perVerde.fimT2,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T2';
                flatVerde.push(valores);
              }
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perVerde.inicioT3,
                  perVerde.fimT3,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T3';
                flatVerde.push(valores);
              }
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perVerde.inicioT4,
                  perVerde.fimT4,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T4';
                flatVerde.push(valores);
              }
            }
            if (semanaAmarela.includes(valores.Equipe)) {
              valores.semana = 'Amarela';
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perAmarela.inicioT1,
                  perAmarela.fimT1,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T1';
                flatAmarela.push(valores);
              }
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perAmarela.inicioT2,
                  perAmarela.fimT2,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T2';
                flatAmarela.push(valores);
              }
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perAmarela.inicioT3,
                  perAmarela.fimT3,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T3';
                flatAmarela.push(valores);
              }
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perAmarela.inicioT4,
                  perAmarela.fimT4,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T4';
                flatAmarela.push(valores);
              }
            }
            if (semanaAzul.includes(valores.Equipe)) {
              valores.semana = 'Azul';
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perAzul.inicioT1,
                  perAzul.fimT1,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T1';
                flatAzul.push(valores);
              }
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perAzul.inicioT2,
                  perAzul.fimT2,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T2';
                flatAzul.push(valores);
              }
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perAzul.inicioT3,
                  perAzul.fimT3,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T3';
                flatAzul.push(valores);
              }
              if (
                moment(valores.Data, 'DD/MM/YYYY').isBetween(
                  perAzul.inicioT4,
                  perAzul.fimT4,
                  undefined,
                  '[]',
                )
              ) {
                valores.trimestre = 'T4';
                flatAzul.push(valores);
              }
            }
          });
          if (CPF) {
            let filtro = [];
            reinp.forEach((resp) => {
              if (resp.CPF == CPF) {
                filtro.push(resp);
              }
            });
            return resolve(filtro);
          } else
            return resolve([
              Array.from(new Set(flatVerde)),
              Array.from(new Set(flatAmarela)),
              Array.from(new Set(flatAzul)),
            ]);
        })
        .catch((erro) => {
          return reject(erro);
        });
    });
  }

  static _isEmpty(str) {
    return !str || 0 === str.length;
  }

  static _ajustaData(data, dw = false) {
    if (dw == true) {
      const arrayMes = [
        'jan',
        'fev',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez',
      ];
      const arrayData = data.split('/');
      const dataAjustada = moment(
        new Date(arrayData[2], arrayMes.indexOf(arrayData[1]), arrayData[0]),
        'DD/MM/YYYY',
      );
      return dataAjustada;
    }
    const arrayData = data.split('/');
    const dataAjustada = new Date(arrayData[2], arrayData[1] - 1, arrayData[0]);
    return dataAjustada;
  }

  static _escreveZip(arq, dados) {
    return new Promise((resolve, reject) => {
      fs.writeFile(arq, d3.csvFormat(dados), function (err) {
        let zip = new AdmZip();
        zip.addLocalFile(path + gerado);
        zip.writeZip(`${path}${gerado}.zip`, (error) => {
          if (error) {
            console.log(`Erro: ${error}`);
            return reject;
          }
        });
        return resolve('Arquivo comprimido!');
      });
    });
  }
  static _montaObjRelatorio(dados, tipo) {
    return new Promise((resolve, reject) => {
      //Calcula estatisticas do relatorio e insere na base para posterior consulta
      let csvmongo = {};
      if (tipo == 'Estoque' || tipo == 'REGAP') {
        csvmongo = d3
          .nest()
          .rollup((v) => {
            return {
              AguardPautaCSRF: d3.sum(v, (d) => {
                if (
                  d.Equipe_Atual.includes('CSRF') &&
                  d.Atividade == 'Para Relatar' &&
                  d.Situacao == 'AGUARDANDO PAUTA'
                ) {
                  return 1;
                }
              }),
              ParaRelatarCSRF: d3.sum(v, (d) => {
                if (
                  d.Equipe_Atual.includes('CSRF') &&
                  d.Atividade == 'Para Relatar'
                ) {
                  return 1;
                }
              }),
              FormalizarCSRF: d3.sum(v, (d) => {
                if (
                  d.Equipe_Atual.includes('CSRF') &&
                  d.Atividade == 'Formalizar Voto Vencedor'
                ) {
                  return 1;
                }
              }),
              ApreciarCSRF: d3.sum(v, (d) => {
                if (
                  d.Equipe_Atual.includes('CSRF') &&
                  d.Atividade == 'Apreciar e Assinar Documento'
                ) {
                  return 1;
                }
              }),
              FormDecCSRF: d3.sum(v, (d) => {
                if (
                  d.Equipe_Atual.includes('CSRF') &&
                  d.Atividade == 'Formalizar Decisao'
                ) {
                  return 1;
                }
              }),
              CorrigirCSRF: d3.sum(v, (d) => {
                if (
                  (d.Equipe_Atual.includes('CSRF') &&
                    d.Atividade == 'Corrigir Decisao') ||
                  d.Atividade == 'Corrigir Decisão'
                ) {
                  return 1;
                }
              }),
              totalHorasCSRF: +d3
                .sum(v, function (d) {
                  if (d.Equipe_Atual.includes('CSRF')) {
                    return d.HE_CARF;
                  }
                })
                .toFixed(2),
              totalValorCSRF: +d3
                .sum(v, function (d) {
                  if (d.Equipe_Atual.includes('CSRF')) {
                    return d.Valor;
                  }
                })
                .toFixed(2),
              totalValorOriCSRF: +d3
                .sum(v, function (d) {
                  if (d.Equipe_Atual.includes('CSRF')) {
                    return d.Valor_Originario;
                  }
                })
                .toFixed(2),
              AguardPautaTOTE: d3.sum(v, (d) => {
                if (
                  !d.Equipe_Atual.includes('CSRF') &&
                  d.Atividade == 'Para Relatar' &&
                  d.Situacao == 'AGUARDANDO PAUTA'
                ) {
                  return 1;
                }
              }),
              ParaRelatarTOTE: d3.sum(v, (d) => {
                if (
                  !d.Equipe_Atual.includes('CSRF') &&
                  d.Atividade == 'Para Relatar'
                ) {
                  return 1;
                }
              }),
              FormalizarTOTE: d3.sum(v, (d) => {
                if (
                  !d.Equipe_Atual.includes('CSRF') &&
                  d.Atividade == 'Formalizar Voto Vencedor'
                ) {
                  return 1;
                }
              }),
              ApreciarTOTE: d3.sum(v, (d) => {
                if (
                  !d.Equipe_Atual.includes('CSRF') &&
                  d.Atividade == 'Apreciar e Assinar Documento'
                ) {
                  return 1;
                }
              }),
              FormDecTOTE: d3.sum(v, (d) => {
                if (
                  !d.Equipe_Atual.includes('CSRF') &&
                  d.Atividade == 'Formalizar Decisao'
                ) {
                  return 1;
                }
              }),
              CorrigirTOTE: d3.sum(v, (d) => {
                if (
                  (!d.Equipe_Atual.includes('CSRF') &&
                    d.Atividade == 'Corrigir Decisao') ||
                  d.Atividade == 'Corrigir Decisão'
                ) {
                  return 1;
                }
              }),
              totalHorasTOTE: +d3
                .sum(v, function (d) {
                  if (!d.Equipe_Atual.includes('CSRF')) {
                    return d.HE_CARF;
                  }
                })
                .toFixed(2),
              totalValorTOTE: +d3
                .sum(v, function (d) {
                  if (!d.Equipe_Atual.includes('CSRF')) {
                    return d.Valor;
                  }
                })
                .toFixed(2),
              totalValorOriTOTE: +d3
                .sum(v, function (d) {
                  if (!d.Equipe_Atual.includes('CSRF')) {
                    return d.Valor_Originario;
                  }
                })
                .toFixed(2),
            };
          })
          .entries(dados);
      }
      if (tipo == 'REINP') {
        csvmongo = d3
          .nest()
          .rollup((v) => {
            return {
              TotalProcessos: d3.sum(v, (d) => {
                {
                  return 1;
                }
              }),
              TotalHoras: d3.sum(v, (d) => {
                {
                  return d.HE_CARF;
                }
              }),
            };
          })
          .entries(dados);
      }

      csvmongo.dataEnvio = new Date().toISOString();
      csvmongo.caminho = `${path}${gerado}.zip`;
      return resolve(csvmongo);
    });
  }

  //
  static _filtroTipo(tipoRel) {
    return new Promise((resolve, reject) => {
      if (tipoRel == 'REGAP') {
        tipoRel.forEach((d) => {
          if (
            d['Nome_Atividade_Atual_11'] == 'Para Relatar' ||
            d['Nome_Atividade_Atual_11'] == 'Formalizar Voto Vencedor' ||
            d['Nome_Atividade_Atual_11'] == 'Formalizar Decisao' ||
            d['Nome_Atividade_Atual_11'] == 'Apreciar e Assinar Documento' ||
            d['Nome_Atividade_Atual_11'] == 'Corrigir Decisão' ||
            d['Nome_Atividade_Atual_11'] == 'Corrigir Decisao'
          ) {
            parcial.push(d);
          }
        });
        return resolve(parcial);
      } else {
        tipoRel.forEach((d) => {
          if (
            (d['Nome_Atividade_Atual_11'] == 'Para Relatar' &&
              d['Situação_de_Julgamento_9'] == 'AGUARDANDO PAUTA') ||
            d['Nome_Atividade_Atual_11'] == 'Formalizar Voto Vencedor'
          ) {
            parcial.push(d);
          }
        });
        return resolve(parcial);
      }
    });
  }

  static _horas_Reinp(dados) {
    return new Promise((resolve, reject) => {
      let transformado = [];
      let regex = /Paradigma|PARADIGMA|paradigma/gi;
      dados.forEach(function (d) {
        d['HE_CARF'] = d['HE_CARF'].replace(',', '.');

        if (d['Equipe'].includes('CSRF') && d['HE_CARF'] == 0) {
          d['HE_CARF'] = 6;
        } else if (!d['Equipe'].includes('CSRF') && d['HE_CARF'] == 0) {
          d['HE_CARF'] = 8;
        }
        // d['HE_CARF'] == 0
        //   ? (d['HE_CARF'] = 12)
        //   : (d['HE_CARF'] = (+d['HE_CARF']).toFixed(2));
        d['Repetitivo'] == 'NÃO INFORMADO' ||
        d['Repetitivo'] == '' ||
        regex.test(d['Paradigma'])
          ? transformado.push(d)
          : null;
        delete d['Repetitivo'];
        delete d['Paradigma'];
      });

      return resolve(transformado);
    });
  }

  static _HorasCARF(dados) {
    return new Promise((resolve, reject) => {
      let transformado = [];
      dados.forEach(function (d) {
        if (
          d['Nome_Atividade_Atual_11'] == 'Para Relatar' ||
          d['Nome_Atividade_Atual_11'] == 'Formalizar Voto Vencedor' ||
          d['Nome_Atividade_Atual_11'] == 'Formalizar Decisao' ||
          d['Nome_Atividade_Atual_11'] == 'Apreciar e Assinar Documento' ||
          d['Nome_Atividade_Atual_11'] == 'Corrigir Decisão' ||
          d['Nome_Atividade_Atual_11'] == 'Corrigir Decisao'
        ) {
          //Troca , por . nas colunas de HE e Valor e as transforma em números com unary plus '+'. Transforma string e null para números (null vira 0)
          d['HORAS_ESTIMADAS_DECIMAL'] = d['HORAS_ESTIMADAS_DECIMAL'].replace(
            ',',
            '.',
          );
          d['HORAS_ESTIMADAS_DECIMAL'] = +d['HORAS_ESTIMADAS_DECIMAL']; //
          d['Valor_Processo_18'] = +d['Valor_Processo_18'];
          // ALTERAR PARA 12H x (0.65 ou 0.5) ATE PUBLICACAO PORTARIA NOVA
          if (
            d['Nome_Equipe_Atual_2'].includes('CSRF') &&
            d['HORAS_ESTIMADAS_DECIMAL'] == 0
          ) {
            d['HORAS_ESTIMADAS_DECIMAL'] = 6;
          } else if (
            !d['Nome_Equipe_Atual_2'].includes('CSRF') &&
            d['HORAS_ESTIMADAS_DECIMAL'] == 0
          ) {
            d['HORAS_ESTIMADAS_DECIMAL'] = 8;
          }
          // ITEM III e IV e VI da PORTARIA CARF 2370-2019
          if (
            (d['Questionamento_1_CARF_19'] == 'EMBARGOS DE DECLARAÇÃO' ||
              d['Questionamento_1_CARF_19'] == 'EMBARGO DE DECLARAÇÃO') &&
            d['Nome_Equipe_Última_23'].includes('DIPRO') &&
            d['Nome_Atividade_Última_29'] == 'Distribuir / Sortear'
          ) {
            d['HORAS_ESTIMADAS_DECIMAL'] = 0.45 * d['HORAS_ESTIMADAS_DECIMAL'];
          }
          if (
            d['Questionamento_1_CARF_19'] != 'EMBARGO DE DECLARAÇÃO' &&
            d['Nome_Equipe_Última_23'].includes('DIPRO') &&
            d['Nome_Atividade_Última_29'] == 'Tratar Retorno de Processo'
          ) {
            d['HORAS_ESTIMADAS_DECIMAL'] = 0.45 * d['HORAS_ESTIMADAS_DECIMAL'];
          }
          // INSERIR 4 HORAS EM PROCESSOS COM MENOS DE 4
          if (d['HORAS_ESTIMADAS_DECIMAL'] < 4) {
            d['HORAS_ESTIMADAS_DECIMAL'] = 4.0;
          }
          //ALTERAR HORA HE = 2 PORTARIA CARF
          if (
            d['Questionamento_1_CARF_19'] == 'EMBARGOS DE DECLARAÇÃO' &&
            d['Nome_Equipe_Última_23'].includes('DIPRO') &&
            d['Nome_Atividade_Última_29'] == 'Tratar Retorno de Processo'
          ) {
            d['HORAS_ESTIMADAS_DECIMAL'] = 2.0;
          }
          if (
            d['Questionamento_1_CARF_19'] == 'EMBARGO DE DECLARAÇÃO' &&
            d['Nome_Equipe_Última_23'].includes('DIPRO') &&
            d['Nome_Atividade_Última_29'] == 'Tratar Retorno de Processo'
          ) {
            d['HORAS_ESTIMADAS_DECIMAL'] = 2.0;
          }
          //ZERAR HORAS DE PROCESSO APENSO SEM QUESTIONAMENTO
          if (
            d['Indicador_de_Processo_Apen_8'] == 'S' &&
            d['Questionamento_1_CARF_19'] == ''
          ) {
            d['HORAS_ESTIMADAS_DECIMAL'] = 0.0;
          }
          //30% - Limitados a mínimo 2 e máximo 8 horas
          if (d['Nome_Atividade_Atual_11'] == 'Formalizar Voto Vencedor') {
            d['HORAS_ESTIMADAS_DECIMAL'] = d['HORAS_ESTIMADAS_DECIMAL'] * 0.3;
            if (d['HORAS_ESTIMADAS_DECIMAL'] <= 2.0) {
              d['HORAS_ESTIMADAS_DECIMAL'] = 2;
            }
            if (d['HORAS_ESTIMADAS_DECIMAL'] >= 8) {
              d['HORAS_ESTIMADAS_DECIMAL'] = 8;
            }
          }
          transformado.push(d);
        } else {
          return reject;
        }
      });
      return resolve(transformado);
    });
  }

  static _excluiCSV(arq) {
    return new Promise((resolve, reject) => {
      fs.unlink(arq, function (error) {
        if (error) {
          console.log(`Erro: ${error}`);
          return reject;
        }
        return resolve('Arquivo excluído!');
      });
    });
  }

  static _renomeiaReinp(dados) {
    return new Promise((resolve, reject) => {
      let keysMap = {
        '05. Dia Início Situação Julgamento': 'Data_Situacao',
        '03. Equipe Nível 5 Hist.': 'Equipe',
        'CPF Relator e-Processo Hist.': 'CPF',
        'PF Relator - Nome Hist.': 'Relator',
        'Nome Lote Hist.': 'Repetitivo',
        'Número Processo/Dossiê Hist.': 'Processo',
        'Hora Estimada Situação Julgamento': 'HE_CARF',
        'Assuntos/Objetos Hist.': 'Paradigma',
      };
      dados.forEach((d) => {
        Object.entries(keysMap).forEach((entry) => {
          delete Object.assign(d, { [entry[1]]: d[entry[0]] })[entry[0]];
        });
      });
      return resolve(dados);
    });
  }

  static _renomeiaColunas(dados) {
    return new Promise((resolve, reject) => {
      let keysMap = {
        Nome_Lote_Atual_3: 'Observacoes',
        CPF_Responsável_Atual_4: 'CPF',
        Nome_Responsável_5: 'Nome',
        Número_Processo_6: 'Processo',
        Nome_Contribuinte_7: 'Contribuinte',
        Indicador_de_Processo_Apen_8: 'Ind_Apenso',
        Nome_Equipe_Atual_2: 'Equipe_Atual',
        Situação_de_Julgamento_9: 'Situacao',
        Data_Entrada_Atividade_10: 'Entrada_na_Atividade',
        Nome_Atividade_Atual_11: 'Atividade',
        HORAS_ESTIMADAS_DECIMAL: 'HE_CARF',
        Valor_Processo_18: 'Valor',
        Questionamento_1_CARF_19: 'Questionamento_CARF',
        Nome_Equipe_Última_23: 'Equipe_Ultima',
        Nome_Relator_CARF_25: 'Relator',
        Número_Resolução_CARF_26: 'Resolucao',
        Número_Acórdão_CARF_27: 'Acordao',
        Nome_Atividade_Última_29: 'AtividadeUltima',
        Nome_Redator_Designado_CAR_13: 'Redator1',
        Nome_Redator_Designado_CAR_14: 'Redator2',
        Nome_Redator_Designado_CAR_15: 'Redator3',
        Alegações_no_Recurso_para__28: 'Alegacoes_CARF',
        Data_Sessão_CARF_16: 'Data_da_Sessao_Julgamento',
        Data_Distribuição_Última_12: 'Data_ultima_distribuicao',
        'Valor_Originário_Lançado/P_30': 'Valor_Originario',
        Valor_do_Processo_sem_TJM__33: 'Valor_Sem_TJM',
        'Valor_do_Crédito_Lançado_(_34': 'Valor_Credito_Lancado',
        'Assuntos/Objetos_31': 'Assunto',
        Prioridade_24: 'Prioridade',
        Motivo_da_Prioridade_22: 'Motivo_Prioridade',
        Indicador_de_Solicitação_d_32: 'Ind_Juntada',
      };
      //Renomeia as colunas e exclui as não utilizadas
      dados.forEach((d) => {
        delete d['Nome_Unidade_Atual_1'];
        delete d['Horas_Estimadas_17'];
        Object.entries(keysMap).forEach((entry) => {
          delete Object.assign(d, { [entry[1]]: d[entry[0]] })[entry[0]];
        });
      });
      return resolve(dados);
    });
  }

  static _removerAcentos(s) {
    let mapa = {
      â: 'a',
      Â: 'A',
      à: 'a',
      À: 'A',
      á: 'a',
      Á: 'A',
      ã: 'a',
      Ã: 'A',
      ê: 'e',
      Ê: 'E',
      è: 'e',
      È: 'E',
      é: 'e',
      É: 'E',
      î: 'i',
      Î: 'I',
      ì: 'i',
      Ì: 'I',
      í: 'i',
      Í: 'I',
      õ: 'o',
      Õ: 'O',
      ô: 'o',
      Ô: 'O',
      ò: 'o',
      Ò: 'O',
      ó: 'o',
      Ó: 'O',
      ü: 'u',
      Ü: 'U',
      û: 'u',
      Û: 'U',
      ú: 'u',
      Ú: 'U',
      ù: 'u',
      Ù: 'U',
      ç: 'c',
      Ç: 'C',
    };
    return s.replace(/[\W\[\] ]/gi, function (a) {
      return mapa[a] || a;
    });
  }
}
module.exports = CSVHandler;
