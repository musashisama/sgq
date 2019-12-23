// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/gestao/listaregistros/listaregistros.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Registro de Não Conformidades</title></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"container-header cabecalho\"></header><main class=\"conteudoPrincipal\"><div class=\"container\"><div class=\"row\"><h3 class=\"center-align\">Registro de Não Conformidades</h3><table class=\"striped centered highlight z-depth-3 responsive-table\"><thead><tr><th>Documento de Referência</th><th>Macroprocesso do Usuário</th><th>Macroprocesso de Origem</th><th>Equipe</th><th>Descrição da Não Conformidade</th><th>Observações</th><th>Ação Imediata</th><th>Data de Ocorrência</th><th>Data de Encaminhamento/Correção</th></tr></thead><tbody>");

  var $for$0 = 0;

  marko_forEach(data.registroNC, function(registroNC) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<tr" +
      marko_attr("id", "" + registroNC._id) +
      "><td class=\"docref\">" +
      marko_escapeXml(registroNC.docRef) +
      "</td><td class=\"mpprocuser\">" +
      marko_escapeXml(registroNC.mpProcUser) +
      "</td><td class=\"mpprocorigem\">" +
      marko_escapeXml(registroNC.mProcOrigem) +
      "</td><td class=\"equipenc\">" +
      marko_escapeXml(registroNC.equipeNC) +
      "</td><td class=\"descnc\">" +
      marko_escapeXml(registroNC.descNC) +
      "</td><td class=\"obs\">" +
      marko_escapeXml(registroNC.obsParticipante) +
      "</td><td class=\"acao\">" +
      marko_escapeXml(registroNC.acaoImediata) +
      "</td><td class=\"datanc\">" +
      marko_escapeXml(registroNC.dataNC) +
      "</td><td class=\"dataenccor\">" +
      marko_escapeXml(registroNC.EncCorNC) +
      "</td></tr>");
  });

  out.w("</tbody></table></div></div></main><footer class=\"rodape\"></footer><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\">A bunch of text</p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat\">Cancela</a><a href=\"#!\" class=\"modal-close waves-effect waves-green btn-flat concorda\">Confirma</a></div></div><script src=\"/estatico/js/jquery-3.4.1.js\"></script><script src=\"/estatico/js/materialize.js\"></script><script src=\"/estatico/js/loadtemplate.js\"></script><script src=\"/estatico/js/formcontrol.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "49");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/gestao/listaregistros/listaregistros.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
