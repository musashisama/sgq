const fs = require('fs');
const d3 = require('d3');
const AdmZip = require('adm-zip');
const exec = require('child_process').exec;
const cmd = `mongoimport -d sgq -c processos --type csv --file src/app/arquivos/csv/Gerencial-${new Date().getFullYear()}-${new Date().getMonth().valueOf() + 1}-${new Date().getDate()}.csv --headerline`;
const path = `src/app/arquivos/csv/`;
//let gerado = `Gerencial-${new Date().getFullYear()}-${new Date().getMonth().valueOf() + 1}-${new Date().getDate()}.csv`;
let gerado = `Gerencial-`;
let semanaAzul = ["2ª TURMA-CSRF-CARF-MF-DF",
    "1ª TE-2ªSEÇÃO-2001-CARF-MF-DF",
    "2ª TE-2ªSEÇÃO-2002-CARF-MF-DF",
    "3ª TE-2ªSEÇÃO-2003-CARF-MF-DF",
    "3ª SEÇÃO - CARF - MF - DF",
    "1ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "2ª TO-2ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "1ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "2ª TO-3ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "1ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "2ª TO-4ªCÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "1ª CÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "2ª CÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "3ª CÂMARA-3ªSEÇÃO-CARF-MF-DF",
    "4ª CÂMARA-3ªSEÇÃO-CARF-MF-DF"]
let semanaVerde = ["1ª TURMA-CSRF-CARF-MF-DF",
    "1ª TE-1ªSEÇÃO-1001-CARF-MF-DF",
    "2ª TE-1ªSEÇÃO-1002-CARF-MF-DF",
    "3ª TE-1ªSEÇÃO-1003-CARF-MF-DF",
    "2ª SEÇÃO-CARF-MF-DF",
    "1ª TO-2ªCÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "2ª TO-2ªCAMARA-2ªSEÇÃO-CARF-MF-DF",
    "1ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "2ª TO-3ªCÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "1ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "2ª TO-4ªCÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "1ª CÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "2ª CÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "3ª CÂMARA-2ªSEÇÃO-CARF-MF-DF",
    "4ª CÂMARA-2ªSEÇÃO-CARF-MF-DF"]
let semanaAmarela = ["3ª TURMA-CSRF-CARF-MF-DF",
    "1ª TE-3ªSEÇÃO-3001-CARF-MF-DF",
    "2ª TE-3ªSEÇÃO-3002-CARF-MF-DF",
    "3ª TE-3ªSEÇÃO-3003-CARF-MF-DF",
    "1ª SEÇÃO-CARF-MF-DF",
    "1ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "2ª TO-2ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "1ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "2ª TO-3ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "1ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "2ª TO-4ªCÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "1ª CÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "2ª CÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "3ª CÂMARA-1ªSEÇÃO-CARF-MF-DF",
    "4ª CÂMARA-1ªSEÇÃO-CARF-MF-DF"]

//let gerado = '';
class CSVHandler {
    constructor() {
        throw new Error('CSVHandler não pode ser instanciada. Utilize os métodos estáticos.');
    }
    static wrangleCSV(arq, semana, tipo) {
        return new Promise((resolve, reject) => {
            fs.readFile(arq, 'latin1', function (err, data) {
                let dados = d3.csvParse(data);
                gerado = gerado + arq.split("/")[arq.split("/").length - 1]
                dados = CSVHandler._HorasCARF(dados)
                    .then(dados => {
                        CSVHandler._renomeiaColunas(dados)
                            .then(dados => {
                                return dados;
                            })
                            .then(dados => {
                                let parcial = [];
                                dados.forEach(dado => {
                                    if (semana == 'Amarela' && semanaAmarela.includes(dado['Equipe_Atual'])) {
                                        parcial.push(dado);
                                    }
                                    if (semana == 'Verde' && semanaVerde.includes(dado['Equipe_Atual'])) {
                                        parcial.push(dado);
                                    }
                                    if (semana == 'Azul' && semanaAzul.includes(dado['Equipe_Atual'])) {
                                        parcial.push(dado);
                                    }
                                    if (semana == 'Todas') {
                                        parcial.push(dado)
                                    }
                                })
                                console.log(dados.length + "   " + parcial.length);
                                CSVHandler._escreveZip(path + gerado, parcial)
                                    .then(() => {
                                        let csvmongo = CSVHandler._montaObjRelatorio(parcial);
                                        CSVHandler._excluiCSV(arq);
                                        CSVHandler._excluiCSV(`${path}${gerado}`);
                                        gerado = 'Gerencial-';
                                        return resolve(csvmongo);
                                    })
                            });
                    });
            });
        })
    };
    //Descompacta e lê o CSV.
    static readCSV(arq) {
        return new Promise((resolve, reject) => {
            let zip = new AdmZip(arq);
            let dados = [];
            var comprimidos = zip.getEntries();
            zip.extractEntryTo(comprimidos[0], path, false, true);
            fs.readFile(`${path}${comprimidos[0].entryName}`, 'utf8', function (err, data) {
                if (err) { return reject; }
                dados = d3.csvParse(data);
                return resolve(dados);
            })
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
            dados = this.readCSV(arq)
                .then(dados => {
                    dados.forEach(d => {
                        if ((d['Atividade'] == 'Para Relatar'
                            && d['Situacao'] == 'AGUARDANDO PAUTA')
                            || d['Atividade'] == 'Formalizar Voto Vencedor') { //||d['Ind_Apenso']=='N'||(d['Ind_Apenso']=='S' && d['Questionamento_CARF']!='')
                            parcial.push(d);
                        }
                    })
                    let porCPF = d3.nest()
                        .key(d => { return d.CPF; }).sortKeys(d3.ascending)
                        .rollup(v => {
                            return {
                                HE: d3.sum(v, function (d) { return d.HE_CARF; }),
                                qtdeProc: v.length
                            }
                        })
                        .entries(parcial);

                    porCPF.forEach(cpf => {
                        if (cpf.key === '') {
                            flat.push({
                                CPF: '12345678910',
                                HE_CARF: +cpf.value.HE.toFixed(2),
                                qtdeProc: +cpf.value.qtdeProc
                            })
                        } else {
                            flat.push({
                                CPF: cpf.key,
                                HE_CARF: +cpf.value.HE.toFixed(2),
                                qtdeProc: +cpf.value.qtdeProc
                            })
                        }
                        return resolve(flat)
                    });
                    return reject;
                })
        })
    }
    static _ajustaData(data) {

        const arrayData = data.split("/");
        // console.log(arrayData[2] + ' ' + arrayData[1] + ' ' + arrayData[0]);
        //const dataAjustada = new Date(arrayData[2], arrayData[1] - 1, arrayData[0], new Date().getHours()).toUTCString();
        const dataAjustada = new Date(arrayData[2], arrayData[1] - 1, arrayData[0]);
        //console.log('Data Ajustada: ', dataAjustada);
        return dataAjustada;
    }

    static pegaRegap(arq, tipo, CPF) {
        return new Promise((resolve, reject) => {
            let flat = [];
            let hoje = new Date().getTime();
            let dias = 1000 * 60 * 60 * 24;            
            let regap = this.readCSV(arq)
                .then(regap => {
                    let porCPF = d3.nest()
                        .key(d => { return d.CPF }).sortKeys(d3.ascending)
                        .entries(regap);
                    //console.log(porCPF[10]);
                    porCPF.forEach(cpf => {
                        cpf.values.forEach(valor => {                             
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
                                    Questionamento_CARF: valor.Questionamento_CARF,
                                    Resolucao: valor.Resolucao,
                                    Acordao: valor.Acordao,
                                    AtividadeUltima: valor.AtividadeUltima,
                                    Dias_na_Atividade: Math.floor(((hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) / dias)),
                                    Dias_da_SJ: Math.floor(((hoje - CSVHandler._ajustaData(valor.Data_da_Sessao_Julgamento)) / dias)),
                                    Dias_da_Dist: Math.floor(((hoje - CSVHandler._ajustaData(valor.Data_ultima_distribuicao)) / dias)),
                                    Retorno_Sepoj: (valor.Equipe_Ultima.includes("SEPOJ-COSUP-CARF-MF-DF") ? "Sim" : "Não")
                                })  
                        })
                    })
                    if(tipo=='COJUL'){
                        let filtro = [];
                        flat.forEach(valor => {
                            if (
                                ((valor.Ind_Apenso == 'N' || (valor.Questionamento_CARF != '' && valor.Ind_Apenso != 'S')) && (valor.Atividade == 'Para Relatar' && Math.floor(((hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) / dias)) >= 180))
                                || ((valor.Ind_Apenso == 'N' || (valor.Questionamento_CARF != '' && valor.Ind_Apenso != 'S')) && (valor.Atividade == 'Formalizar Decisao' && Math.floor(((hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) / dias)) >= 30))
                                || ((valor.Ind_Apenso == 'N' || (valor.Questionamento_CARF != '' && valor.Ind_Apenso != 'S')) && (valor.Atividade == 'Formalizar Voto Vencedor' && Math.floor(((hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) / dias)) >= 30))
                                || ((valor.Ind_Apenso == 'N' || (valor.Questionamento_CARF != '' && valor.Ind_Apenso != 'S')) && (valor.Atividade == 'Apreciar e Assinar Documento' && Math.floor(((hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) / dias)) >= 15))
                                || ((valor.Ind_Apenso == 'N' || (valor.Questionamento_CARF != '' && valor.Ind_Apenso != 'S')) && (valor.Atividade == 'Corrigir Decisão' && Math.floor(((hoje - CSVHandler._ajustaData(valor.Entrada_na_Atividade)) / dias)) >= 1))
                            ){filtro.push(valor)}
                            return resolve(filtro)
                        })
                        

                    }
                    if(CPF){
                        let filtro = []
                        flat.forEach(resp => {
                            if(resp.CPF == CPF){
                                filtro.push(resp);
                            }
                            return resolve(filtro)
                        })
                    }
                    else return resolve(flat);
                })
            return reject;
        });
    }
    static _escreveZip(arq, dados) {
        return new Promise((resolve, reject) => {
            fs.writeFile(arq, d3.csvFormat(dados), function (err) {
                let zip = new AdmZip();
                zip.addLocalFile(path + gerado);
                zip.writeZip(`${path}${gerado}.zip`, error => {
                    if (error) {
                        console.log(`Erro: ${error}`);
                        return reject;
                    }
                });
                return resolve("Arquivo comprimido!");
            })
        })
    }
    static _montaObjRelatorio(dados) {
        return new Promise((resolve, reject) => {
            //Calcula estatisticas do relatorio e insere na base para posterior consulta
            let csvmongo = {};

            csvmongo = d3.nest()
                .rollup(v => {
                    return {
                        AguardPautaCSRF: d3.sum(v, d => { if (d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Para Relatar' && d.Situacao == 'AGUARDANDO PAUTA') { return 1 } }),
                        ParaRelatarCSRF: d3.sum(v, d => { if (d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Para Relatar') { return 1 } }),
                        FormalizarCSRF: d3.sum(v, d => { if (d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Formalizar Voto Vencedor') { return 1 } }),
                        ApreciarCSRF: d3.sum(v, d => { if (d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Apreciar e Assinar Documento') { return 1 } }),
                        FormDecCSRF: d3.sum(v, d => { if (d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Formalizar Decisao') { return 1 } }),
                        CorrigirCSRF: d3.sum(v, d => { if (d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Corrigir Decisao' || d.Atividade == 'Corrigir Decisão') { return 1 } }),
                        totalHorasCSRF: +d3.sum(v, function (d) { if (d.Equipe_Atual.includes("CSRF")) { return d.HE_CARF; } }).toFixed(2),
                        totalValorCSRF: +d3.sum(v, function (d) { if (d.Equipe_Atual.includes("CSRF")) { return d.Valor; } }).toFixed(2),
                        AguardPautaTOTE: d3.sum(v, d => { if (!d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Para Relatar' && d.Situacao == 'AGUARDANDO PAUTA') { return 1 } }),
                        ParaRelatarTOTE: d3.sum(v, d => { if (!d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Para Relatar') { return 1 } }),
                        FormalizarTOTE: d3.sum(v, d => { if (!d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Formalizar Voto Vencedor') { return 1 } }),
                        ApreciarTOTE: d3.sum(v, d => { if (!d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Apreciar e Assinar Documento') { return 1 } }),
                        FormDecTOTE: d3.sum(v, d => { if (!d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Formalizar Decisao') { return 1 } }),
                        CorrigirTOTE: d3.sum(v, d => { if (!d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Corrigir Decisao' || d.Atividade == 'Corrigir Decisão') { return 1 } }),
                        totalHorasTOTE: +d3.sum(v, function (d) { if (!d.Equipe_Atual.includes("CSRF")) { return d.HE_CARF; } }).toFixed(2),
                        totalValorTOTE: +d3.sum(v, function (d) { if (!d.Equipe_Atual.includes("CSRF")) { return d.Valor; } }).toFixed(2),
                    }
                })
                .entries(dados);
            csvmongo.dataEnvio = new Date().toISOString();
            csvmongo.caminho = gerado;
            csvmongo.dataEnvio = new Date().toISOString();
            csvmongo.caminho = `${path}${gerado}.zip`;
            return resolve(csvmongo);
        });
    }

    //
    static _filtroTipo(tipoRel) {
        return new Promise((resolve, reject) => {
            if (tipoRel == 'REGAP') {
                tipoRel.forEach(d => {
                    if (d['Nome_Atividade_Atual_11'] == 'Para Relatar'
                        || d['Nome_Atividade_Atual_11'] == 'Formalizar Voto Vencedor'
                        || d['Nome_Atividade_Atual_11'] == 'Formalizar Decisao'
                        || d['Nome_Atividade_Atual_11'] == 'Apreciar e Assinar Documento'
                        || d['Nome_Atividade_Atual_11'] == 'Corrigir Decisão'
                        || d['Nome_Atividade_Atual_11'] == 'Corrigir Decisao') {
                        parcial.push(d);
                    }
                })
                return resolve(parcial);
            } else {
                tipoRel.forEach(d => {
                    if ((d['Nome_Atividade_Atual_11'] == 'Para Relatar'
                        && d['Situação_de_Julgamento_9'] == 'AGUARDANDO PAUTA')
                        || d['Nome_Atividade_Atual_11'] == 'Formalizar Voto Vencedor') {
                        parcial.push(d);
                    }
                })
                return resolve(parcial);
            }
        });
    }

    static _HorasCARF(dados) {
        return new Promise((resolve, reject) => {
            let transformado = [];
            dados.forEach(function (d) {
                if (d['Nome_Atividade_Atual_11'] == 'Para Relatar'
                    || d['Nome_Atividade_Atual_11'] == 'Formalizar Voto Vencedor'
                    || d['Nome_Atividade_Atual_11'] == 'Formalizar Decisao'
                    || d['Nome_Atividade_Atual_11'] == 'Apreciar e Assinar Documento'
                    || d['Nome_Atividade_Atual_11'] == 'Corrigir Decisão'
                    || d['Nome_Atividade_Atual_11'] == 'Corrigir Decisao') {
                    //Troca , por . nas colunas de HE e Valor e as transforma em números com unary plus '+'. Transforma string e null para números (null vira 0)                   
                    d['HORAS_ESTIMADAS_DECIMAL'] = d['HORAS_ESTIMADAS_DECIMAL'].replace(",", ".");
                    d['HORAS_ESTIMADAS_DECIMAL'] = +d['HORAS_ESTIMADAS_DECIMAL']; //
                    d['Valor_Processo_18'] = +d['Valor_Processo_18'];
                    // ALTERAR PARA 12H x (0.65 ou 0.5) ATE PUBLICACAO PORTARIA NOVA
                    if (d['Nome_Equipe_Atual_2'].includes("CSRF") && d['HORAS_ESTIMADAS_DECIMAL'] == 0) {
                        d['HORAS_ESTIMADAS_DECIMAL'] = 6;
                    } else if (!d['Nome_Equipe_Atual_2'].includes("CSRF") && d['HORAS_ESTIMADAS_DECIMAL'] == 0) {
                        d['HORAS_ESTIMADAS_DECIMAL'] = 8;
                    };
                    // ITEM III e IV e VI da PORTARIA CARF 2370-2019 
                    if (d['Questionamento_1_CARF_19'] == 'EMBARGOS DE DECLARAÇÃO' && d['Nome_Equipe_Última_23'].includes('DIPRO') && d['Nome_Atividade_Última_29'] == 'Distribuir / Sortear') {
                        d['HORAS_ESTIMADAS_DECIMAL'] = 0.45 * d['HORAS_ESTIMADAS_DECIMAL'];
                    }
                    if (d['Questionamento_1_CARF_19'] != 'EMBARGOS DE DECLARAÇÃO' && d['Nome_Equipe_Última_23'].includes('DIPRO') && d['Nome_Atividade_Última_29'] == 'Tratar Retorno de Processo') {
                        d['HORAS_ESTIMADAS_DECIMAL'] = 0.45 * d['HORAS_ESTIMADAS_DECIMAL'];
                    }
                    // INSERIR 4 HORAS EM PROCESSOS COM MENOS DE 4
                    if (d['HORAS_ESTIMADAS_DECIMAL'] < 4) {
                        d['HORAS_ESTIMADAS_DECIMAL'] = 4.0;
                    }
                    //ALTERAR HORA HE = 2 PORTARIA CARF
                    if (d['Questionamento_1_CARF_19'] == 'EMBARGOS DE DECLARAÇÃO' && d['Nome_Equipe_Última_23'].includes('DIPRO') && d['Nome_Atividade_Última_29'] == 'Tratar Retorno de Processo') {
                        d['HORAS_ESTIMADAS_DECIMAL'] = 2.0;
                    }
                    //ZERAR HORAS DE PROCESSO APENSO SEM QUESTIONAMENTO
                    if (d['Indicador_de_Processo_Apen_8'] == 'S' && d['Questionamento_1_CARF_19'] == '') {
                        d['HORAS_ESTIMADAS_DECIMAL'] = 0.0;
                    }
                    //ALTERAR PARA 3H PROCESSOS DE FORMALIZAR VOTO VENCEDOR
                    if (d['Nome_Atividade_Atual_11'] == 'Formalizar Voto Vencedor') {
                        d['HORAS_ESTIMADAS_DECIMAL'] = 3.0;
                    }
                    transformado.push(d);
                } else { return reject; }
            })
            return resolve(transformado);
        })
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
        })
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
            }
            //Renomeia as colunas e exclui as não utilizadas
            dados.forEach(d => {
                delete d['Nome_Unidade_Atual_1'];
                delete d['Horas_Estimadas_17'];
                delete d['Questionamento_2_CARF_20'];
                delete d['Questionamento_3_CARF_21'];
                delete d['Motivo_da_Prioridade_22'];
                delete d['Prioridade_24'];
                Object.entries(keysMap).forEach(entry => {
                    delete Object.assign(d, { [entry[1]]: d[entry[0]] })[entry[0]];
                });
            });
            return resolve(dados)
        })
    }
}
module.exports = CSVHandler;