// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/nc/form/form.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"> <link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Registro de Não Conformidades</title></head><body>");

  component_globals_tag({}, out);

  out.w("<header></header><main class=\"conteudoPrincipal\"><div class=\"container\"><h2>Registro de Não Conformidades</h2><form action=\"/form\" method=\"post\">");

  if (data.registroNC._id) {
    out.w("<div><input type=\"hidden\" name=\"_method\" value=\"PUT\"><input type=\"hidden\" name=\"id\"" +
      marko_attr("value", data.registroNC._id) +
      "></div>");
  }

  out.w("<div class=\"row\"><div class=\"form-group input-field  col s3\"><label for=\"titulo\">Documento de referência:</label><input required type=\"text\" id=\"titulo\" name=\"docRef\"" +
    marko_attr("value", data.registroNC.ssdocRef) +
    " placeholder=\"Opcional (ex.: n° do Processo)\" class=\"form-control\"></div> <div class=\"form-group input-field col s3\"><select name=\"mpProcUser\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$0 = 0;

  marko_forEach(data.mp, function(mp) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.registroNC.mprocUser) +
      ">" +
      marko_escapeXml(mp.macroprocesso) +
      "</option>");
  });

  out.w("</select><label for=\"mProcUser\">Qual o seu macroprocesso?</label></div><div class=\"form-group input-field col s3\"><select name=\"mProcOrigem\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$1 = 0;

  marko_forEach(data.mp, function(mp) {
    var $keyScope$1 = "[" + (($for$1++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.registroNC.mprocOrigem) +
      ">" +
      marko_escapeXml(mp.macroprocesso) +
      "</option>");
  });

  out.w("</select><label for=\"mProcOrigem\">Em qual macroprocesso a NC teve origem?</label></div><div class=\"form-group input-field col s3\"><label for=\"titulo\">Unidade onde ocorreu a Não Conformidade</label><input required type=\"text\" id=\"titulo\" name=\"equipeNC\"" +
    marko_attr("value", data.registroNC.equipe) +
    " placeholder=\"Opcional (ex.: Equipe CARF/Unidade)\" class=\"form-control\"></div></div><div class=\"row\"><div class=\"input-field col s6\"> <i class=\"material-icons prefix\">textsms</i><input name=\"descNC\" type=\"text\" id=\"autocomplete-input\" class=\"autocomplete\"><label for=\"autocomplete-input\">Descrição da Não Conformidade</label></div><div class=\"input-field col s6\"> <i class=\"material-icons prefix\">mode_edit</i><textarea name=\"obsParticipante\" placeholder=\"Detalhamento maior de como ocorreu a não conformidade.\" id=\"icon_prefix2\" class=\"materialize-textarea\">" +
    marko_escapeXml(data.registroNC.obs) +
    "</textarea><label for=\"icon_prefix2\">Comentários do participante (opcional):</label></div></div><div class=\"row\"><div class=\"input-field col s3\"><p><label>Ação Imediata</label></p><p><label><input name=\"acaoImediata\" type=\"radio\" value=\"Correção\" checked><span>Correção</span></label></p> <p><label><input name=\"acaoImediata\" type=\"radio\" value=\"Encaminhada para Correção\"><span>NC encaminhada para correção</span></label></p></div><div class=\"input-field col s4\"><input type=\"text\" id=\"dataNC\" name=\"dataNC\" class=\"datepicker\"><label for=\"dataNC\">Quando ocorreu a NC?</label></div> </div><div class=\"row\"><div class=\"col s6 offset-s11\"><button class=\"btn-floating btn-large waves-effect waves-light green hoverable \" type=\"submit\"><i class=\"material-icons right-align\">add</i></button></div> </div></form></div></main><footer class=\"rodape\"></footer> <div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\">A bunch of text</p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat\">Cancela</a><a href=\"#!\" class=\"modal-close waves-effect waves-green btn-flat concorda\">Confirma</a></div></div> <script src=\"/estatico/js/jquery-3.4.1.js\"></script><script src=\"/estatico/js/materialize.js\"></script><script src=\"/estatico/js/services/HttpService.js\"></script><script src=\"/estatico/js/formcontrol.js\"></script> ");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "74");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/nc/form/form.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
