const fs = require('fs');
const moment = require('moment');
const d3 = require('d3');

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
  '1ª CÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '2ª CÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '3ª CÂMARA-3ªSEÇÃO-CARF-MF-DF',
  '4ª CÂMARA-3ªSEÇÃO-CARF-MF-DF',
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
  '1ª CÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '2ª CÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '3ª CÂMARA-2ªSEÇÃO-CARF-MF-DF',
  '4ª CÂMARA-2ªSEÇÃO-CARF-MF-DF',
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
  '1ª CÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '2ª CÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '3ª CÂMARA-1ªSEÇÃO-CARF-MF-DF',
  '4ª CÂMARA-1ªSEÇÃO-CARF-MF-DF',
];

class regapHandler {
  constructor() {
    throw new Error(
      'CSVHandler não pode ser instanciada. Utilize os métodos estáticos.',
    );
  }

  static montaRegap(relatorio, conselheiros, dataRel) {
    return new Promise((resolve, reject) => {
      let cpfs = new Set();
      let cons = conselheiros;
      let saida = [{}];
      let parcial = [];
      let regap = [];
      let entrada = d3.csvParse(relatorio);
      regapHandler.HorasCARF(entrada).then((horasAjustadas) => {
        regapHandler.renomeiaColunas(horasAjustadas).then((parcial) => {
          parcial.forEach((p) => {
            cons.forEach((c) => {
              if (p.cpf == c.cpf) {
                if (
                  regapHandler.semanaCores(p.Equipe_Atual) === 'Verde' ||
                  regapHandler.semanaCores(p.Equipe_Atual) === 'Amarela' ||
                  regapHandler.semanaCores(p.Equipe_Atual) === 'Azul'
                ) {
                  cpfs.add(p.cpf);
                }
              }
            });
          });
          cpfs.forEach((c) => {
            regap.push({ conselheiro: { cpf: c } });
          });
          regap.forEach((r) => {
            r.relatorio = [];
            r.dtRel = dataRel;
            parcial.forEach((p) => {
              if (r.conselheiro.cpf == p.cpf) {
                r.conselheiro.nome = p.Nome;
                r.conselheiro.equipe = p.Equipe_Atual;
                r.conselheiro.semana = regapHandler.semanaCores(p.Equipe_Atual);
                r.relatorio.push({
                  dtRel: dataRel,
                  processo: p.Processo,
                  contribuinte: p.Contribuinte,
                  situacao: p.Situacao,
                  atividade: p.Atividade,
                  HE: +p.HE_CARF,
                  valor: +p.Valor,
                  obs: p.Observacoes,
                  apenso: p.Ind_Apenso,
                  entradaAtividade: p.Entrada_na_Atividade,
                  questionamento: p.Questionamento_CARF,
                  ultEquipe: p.Equipe_Ultima,
                  relator: p.Relator,
                  numReso: p.Resolucao,
                  numAco: p.Acordao,
                  ultAtividade: p.AtividadeUltima,
                  red: [p.Redator1, p.Redator2, p.Redator3],
                  alegacoes: p.Alegacoes_CARF,
                  dtSessao: p.Data_da_Sessao_Julgamento,
                  dtUltDist: p.Data_ultima_distribuicao,
                  valorOrig: +p.Valor_Originario,
                  assunto: p.Assunto,
                  prioridade: p.Prioridade,
                  motPrior: p.Motivo_Prioridade,
                });
              }
            });
          });
          return resolve(regap);
        });
      });
    });
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

  static renomeiaColunas(dados) {
    return new Promise((resolve, reject) => {
      let keysMap = {
        Nome_Lote_Atual_3: 'Observacoes',
        CPF_Responsável_Atual_4: 'cpf',
        Nome_Responsável_5: 'Nome',
        Número_Processo_6: 'Processo',
        Nome_Contribuinte_7: 'Contribuinte',
        Indicador_de_Processo_Apen_8: 'Ind_Apenso',
        Nome_Equipe_Atual_2: 'Equipe_Atual',
        Situação_de_Julgamento_9: 'Situacao',
        Data_Entrada_Atividade_10: 'Entrada_na_Atividade',
        Nome_Atividade_Atual_11: 'Atividade',
        HORAS_ESTIMADAS_DECIMAL: 'HE_CARF',
        Valor_do_Processo_18: 'Valor',
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
        'Assuntos/Objetos_31': 'Assunto',
        Prioridade_24: 'Prioridade',
        Motivo_da_Prioridade_22: 'Motivo_Prioridade',
      };
      //Renomeia as colunas e exclui as não utilizadas
      dados.forEach((d) => {
        delete d['Nome_Unidade_Atual_1'];
        delete d['Horas_Estimadas_17'];
        delete d['Questionamento_2_CARF_20'];
        delete d['Questionamento_3_CARF_21'];
        Object.entries(keysMap).forEach((entry) => {
          delete Object.assign(d, { [entry[1]]: d[entry[0]] })[entry[0]];
        });
      });
      return resolve(dados);
    });
  }

  static HorasCARF(dados) {
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
          d['Valor_do_Processo_18'] = +d['Valor_do_Processo_18'];
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
          //Formalizar voto vencedor - 30% - Limitados a mínimo 2 e máximo 8 horas
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
}

module.exports = regapHandler;
