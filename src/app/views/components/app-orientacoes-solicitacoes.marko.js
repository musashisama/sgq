// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/components/app-orientacoes-solicitacoes.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"col s12 m12\"><div class=\"card hoverable cardAzul\"><div class=\"card-content\"><span class=\"card-title\">Orientações:</span><ul><li><i class=\"fas fa-bullhorn\"></i> As solicitações que de <strong>Suspensão de Prazos, Redução da Meta, Justificativa de Falta à Sessões</strong> e as de <strong>Licenças e Afastamentos para Controle da COGEC</strong> deverão ser feitas <strong>separadamente</strong>, utilizando os formulários próprios de cada solicitação.</li><li><i class=\"fas fa-bullhorn\"></i> As solicitações de <strong>REINP - Redução de Horas da Meta de Produtividade</strong> poderão ter as horas aproveitadas no trimestre em que ocorreu o fato ou no trimestre imediatamente subsequente.</li><li><i class=\"fas fa-bullhorn\"></i> As solicitações que constem afastamentos para redução de meta e justificativa de suspensão de prazos e faltas à sessões de julgamento deverão ser efetuadas <strong>após iniciado</strong> o evento. Caso sejam efetuadas antes do evento, serão <strong>rejeitadas</strong>.</li><li><i class=\"fas fa-bullhorn\"></i> As solicitações de Dispensa de Sorteio só poderão ser enviadas caso o somatório total seja maior ou igual a 126 horas.</li><li><i class=\"fas fa-bullhorn\"></i> O deferimento da solicitação de Dispensa de Sorteio não implica que esta será processada no mesmo mês. Implica que os requisitos formais para a dispensa estão presentes e serão analisados no próximo ciclo de planejamento de sorteio.</li><li><i class=\"fas fa-bullhorn\"></i> Retornos de Diligência e Retorno de Embargos não são considerados como horas excedentes para fins de Dispensa de Sorteio.</li><li><i class=\"fas fa-bullhorn\"></i> Para acompanhar as solicitações anteriores a 26/11/2020, utilize a aba de <strong>«Solicitações»</strong> da <a href=\"/julgamento/conselheiros#solicitacoes\" target=\"_blank\" class=\"cardLaranja\">«Antiga Página do Conselheiro»</a></li></ul></div></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/components/app-orientacoes-solicitacoes.marko"
  };
