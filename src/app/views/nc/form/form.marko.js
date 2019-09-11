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
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"> <link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"></head><body>");

  component_globals_tag({}, out);

  out.w("<header></header><main class=\"conteudoPrincipal\"><div class=\"container\"><h2 class=\"center-align\">Registro de Não Conformidades</h2><form action=\"/form\" method=\"post\">");

  if (data.registroNC._id) {
    out.w("<div><input type=\"hidden\" name=\"_method\" value=\"PUT\"><input type=\"hidden\" name=\"id\"" +
      marko_attr("value", data.registroNC._id) +
      "></div>");
  }

  out.w("<div class=\"form-group\"><label for=\"titulo\">Macroprocesso:</label><input type=\"text\" id=\"titulo\" name=\"titulo\"" +
    marko_attr("value", data.registroNC.Macroprocesso) +
    " placeholder=\"coloque o titulo\" class=\"form-control\"></div> <div class=\"form-group\"><label for=\"descricao\">Não Conformidade:</label><textarea cols=\"20\" rows=\"10\" id=\"descricao\" name=\"descricao\" placeholder=\"fale sobre o livro\" class=\"form-control\">" +
    marko_escapeXml(data.registroNC.desc) +
    "</textarea></div><input type=\"submit\" value=\"Salvar\" class=\"btn btn-primary\"></form></div></main><footer class=\"rodape\"></footer> <div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\">A bunch of text</p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat\">Cancela</a><a href=\"#!\" class=\"modal-close waves-effect waves-green btn-flat concorda\">Confirma</a></div></div> <script src=\"/estatico/js/jquery-3.4.1.js\"></script><script src=\"/estatico/js/materialize.js\"></script> ");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "33");

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
