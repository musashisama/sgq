const fs = require('fs');
const d3 = require('d3');
const AdmZip = require('adm-zip');
const { csv } = require('d3');
const exec = require('child_process').exec;
const cmd = `mongoimport -d sgq -c processos --type csv --file src/app/arquivos/csv/Gerencial-${new Date().getFullYear()}-${new Date().getMonth().valueOf() + 1}-${new Date().getDate()}.csv --headerline`;
const path = 'src/app/arquivos/csv/';
let dados = {};
let transformado = [];
const flat = [];

class CSVHandler {

    constructor() {
        throw new Error('CSVHandler não pode ser instanciada. Utilize os métodos estáticos.');
    }

    static readCSV(arq) {
        return new Promise((resolve, reject) => {
            fs.readFile(arq, 'latin1', function (err, data) {
                dados = d3.csvParse(data);
                //Exclui as colunas que não serão utilizadas
                dados.forEach(function (d) {
                    delete d['Nome_Unidade_Atual_1'];
                    delete d['Horas_Estimadas_17'];
                    delete d['Questionamento_2_CARF_20'];
                    delete d['Questionamento_3_CARF_21'];
                    delete d['Motivo_da_Prioridade_22'];
                    delete d['Prioridade_24'];
                    //Filtra colunas pelas atividades e situaçãoes de julgamento
                    if ((Object.entries(d)[9][1] == 'Para Relatar'
                        && Object.entries(d)[7][1] == 'AGUARDANDO PAUTA')
                        || Object.entries(d)[9][1] == 'Formalizar Voto Vencedor') {
                        //Troca , por . nas colunas de HE e Valor e as transforma em números com unary plus '+'. Transforma string e null para números (null vira 0)
                        d['HORAS_ESTIMADAS_DECIMAL'] = Object.entries(d)[15][1].replace(",", ".");
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
                        if (d['Indicador_de_Processo_Apen_8'] == 'S' || d['Questionamento_1_CARF_19'] == '') {
                            d['HORAS_ESTIMADAS_DECIMAL'] = 0.0;
                        }
                        //ALTERAR PARA 3H PROCESSOS DE FORMALIZAR VOTO VENCEDOR
                        if (d['Nome_Atividade_Atual_11'] == 'Formalizar Voto Vencedor') {
                            d['HORAS_ESTIMADAS_DECIMAL'] = 3.0;
                        }
                        transformado.push(d);
                    }
                });
                //Mapeia as chaves do objeto para renomear as colunas.
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
                //Renomeia as colunas
                transformado.forEach(d => {
                    Object.entries(keysMap).forEach(entry => {
                        delete Object.assign(d, { [entry[1]]: d[entry[0]] })[entry[0]];
                    });
                });
                //Escreve o arquivo reformatado com codificação UTF-8
                let gerado = `Gerencial-${new Date().getFullYear()}-${new Date().getMonth().valueOf() + 1}-${new Date().getDate()}.csv`;
                //Calcula estatisticas do relatorio e insere na base para posterior consulta
                let csvmongo = {};
                csvmongo = d3.nest()
                    .rollup(v => {
                        return {                            
                            ParaRelatarCSRF: d3.sum(v, d => { if (d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Para Relatar' && d.Situacao == 'AGUARDANDO PAUTA') { return 1 } }),
                            FormalizarCSRF: d3.sum(v, d => { if (d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Formalizar Voto Vencedor') { return 1 } }),
                            totalHorasCSRF: +d3.sum(v, function (d) { if (d.Equipe_Atual.includes("CSRF")) { return d.HE_CARF; } }).toFixed(2),
                            totalValorCSRF: +d3.sum(v, function (d) { if (d.Equipe_Atual.includes("CSRF")) { return d.Valor; } }).toFixed(2),                            
                            ParaRelatarTOTE: d3.sum(v, d => { if (!d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Para Relatar' && d.Situacao == 'AGUARDANDO PAUTA') { return 1 } }),
                            FormalizarTOTE: d3.sum(v, d => { if (!d.Equipe_Atual.includes("CSRF") && d.Atividade == 'Formalizar Voto Vencedor') { return 1 } }),
                            totalHorasTOTE: +d3.sum(v, function (d) { if (!d.Equipe_Atual.includes("CSRF")) { return d.HE_CARF; } }).toFixed(2),
                            totalValorTOTE: +d3.sum(v, function (d) { if (!d.Equipe_Atual.includes("CSRF")) { return d.Valor; } }).toFixed(2),                           
                        }
                    })
                    .entries(transformado);
                csvmongo.dataEnvio = new Date().toISOString();
                csvmongo.caminho = gerado;
                fs.writeFile(path + gerado, d3.csvFormat(transformado), function (err) {
                    let zip = new AdmZip();
                    zip.addLocalFile(path + gerado);
                    zip.writeZip(`${path}${gerado}.zip`, error => {
                        if (error) {
                            console.log(`Erro: ${error}`);
                            return reject;
                        }
                    });
                    console.log("Arquivo comprimido!");
                    fs.unlink(arq, function (error) {
                        if (error) {
                            console.log(`Erro: ${error}`);
                            return reject;
                        }
                        console.log('Arquivo excluído!');
                    });
                    fs.unlink(`${path}${gerado}`, function (error) {
                        if (error) {
                            console.log(`Erro: ${error}`);
                            return reject;
                        }
                        console.log('Arquivo excluído!');
                    });
                    csvmongo.dataEnvio = new Date().toISOString();
                    csvmongo.caminho = `${path}${gerado}.zip`;
                    console.log(csvmongo);
                    return resolve(csvmongo);
                });
            });
        })
    };

    static pegaEstoque(arq) {
        let zip = new AdmZip(arq);
        var comprimidos = zip.getEntries();
        zip.extractEntryTo(comprimidos[0], path, false, true);
        fs.readFile(`${path}${comprimidos[0].entryName}`, 'utf8', function (err, data) {
            if (err) { console.log(err); }
            dados = d3.csvParse(data);
            let porCPF = d3.nest()
                .key(d => { return d.CPF; }).sortKeys(d3.ascending)
                .rollup(v => { return d3.sum(v, function (d) { return d.HE_CARF; }); })
                .entries(dados);
            porCPF.forEach(cpf => {
                if (cpf.key === '') {
                    flat.push({
                        CPF: '12345678910',
                        HE_CARF: +cpf.value.toFixed(2)
                    })
                } else {
                    flat.push({
                        CPF: cpf.key,
                        HE_CARF: +cpf.value.toFixed(2)
                    })
                }
            });
        });
        fs.unlink(`${path}${comprimidos[0].entryName}`, function (error) {
            if (error) {
                console.log(`Erro: ${error}`);
                return reject;
            }
            console.log('Arquivo excluído!');
        });
        return flat;
    }
}
module.exports = CSVHandler;