// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/components/app-modal-tabela-legenda.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div id=\"modal2\" class=\"modal bottom-sheet\"><div class=\"modal-content\"><h4>Legenda da Tabela</h4><div class=\"col s3 LegEmbargo\"></div><br><div class=\"col s3 LegRetornoDilg\"></div><br><div class=\"col s3 LegRepetitivo\"></div><br><ul style=\"width:50%\"><li class=\"fc-event evCal LegPrioridade  center\">Processo Prioritário</li><li class=\"fc-event evCal LegProcessoParadigma  center\">Processo Paradigma</li><li class=\"fc-event evCal LegParadigma  center\">Lote contem Processo Paradigma</li><li class=\"fc-event evCal LegRepetitivo  center\">Repetitivos</li><li class=\"fc-event evCal LegApenso center\">Apensos sem questionamento. Não contam para verificação de prazos.</li><li class=\"fc-event evCal LegEmbargo center\">Retorno de Embargos</li><li class=\"fc-event evCal LegEmbargoSort center\">Embargos Recebidos por Sorteio</li><li class=\"fc-event evCal LegRetornoDilg center\">Retorno de Diligência</li><li class=\"fc-event evCal LegAPES749 center\">APES749 - Verificar Horas</li><li class=\"fc-event evCal LegAPES749OK center\">APES749 - Horas Utilizadas em Solicitação</li></ul></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-green btn-flat\">Fechar</a></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/components/app-modal-tabela-legenda.marko"
  };
