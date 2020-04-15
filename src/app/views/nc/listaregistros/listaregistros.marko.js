// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/nc/listaregistros/listaregistros.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    marko_attr = marko_helpers.a,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"> <link rel=\"stylesheet\" href=\"/estatico/css/libs/tabulator_materialize.min.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Registro de Não Conformidades</title></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"container-header cabecalho\"></header><main class=\"conteudoPrincipal\"><ul id=\"slide-out\" class=\"sidenav\"></ul><div class=\"container\"><div class=\"row\"><h3 class=\"center-align\">Registro de Não Conformidades</h3><div class=\"col s3 offset-s9\"><a href=\"#!\" id=\"mostraColunas\" class=\"waves-effect waves-green btn-flat blue \">Mostrar colunas ocultas</a></div><form" +
    marko_attr("data-nc", "" + data.registroNC) +
    "></form><div id=\"tabelaNC\"></div></div></div></main><footer class=\"rodape\"></footer><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\">A bunch of text</p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat\">Cancela</a><a href=\"#!\" class=\"modal-close waves-effect waves-green btn-flat concorda\">Confirma</a></div></div><script src=\"/estatico/js/libs/jquery-3.4.1.js\"></script><script src=\"/estatico/js/libs/materialize.js\"></script><script src=\"/estatico/js/loadtemplate.js\"></script><script src=\"/estatico/js/libs/moment.min.js\"></script><script src=\"/estatico/js/libs/tabulator.min.js\"></script><script src=\"/estatico/js/listaregistronc.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "34");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/nc/listaregistros/listaregistros.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
