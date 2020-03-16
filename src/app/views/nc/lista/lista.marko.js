// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/nc/lista/lista.marko",
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

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"container-header cabecalho\"></header><main class=\"conteudoPrincipal\"><div class=\"container\"><h2 class=\"center-align\">Lista de Não Conformidades</h2><table id=\"naoconformidades\" class=\"striped highlight z-depth-3 responsive-table\"><thead class=\"white-text grey darken-4 colunas\"><tr> <th>Macroprocesso</th><th>Não conformidade</th><th>Editar</th><th>Remover</th></tr></thead><tbody>");

  var $for$0 = 0;

  marko_forEach(data.nc, function(nc) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<tr" +
      marko_attr("id", "" + nc._id) +
      "><td class=\"mp\">" +
      marko_escapeXml(nc.Macroprocesso) +
      "</td><td><details><summary>" +
      marko_escapeXml(nc.nconformidade) +
      "</summary><p>" +
      marko_escapeXml(nc.nconformidade) +
      "</p></details></td><td class=\"td-edit\"><a" +
      marko_attr("href", "/gestao/cadastranc/" + nc._id) +
      "><i class=\"small material-icons icones center-align\">edit</i></a></td><td class=\"td-remove\"><a class=\"modal-trigger\" href=\"#modal1\"><i class=\"aRemove small material-icons icones iconeRemove\"" +
      marko_attr("data-ref", "" + nc._id) +
      " data-type=\"remocao\">remove_circle</i></a></td></tr>");
  });

  out.w("</tbody></table><a class=\"btn-floating btn-large waves-effect waves-light green addListaNC\" href=\"/gestao/cadastranc\"><i class=\"material-icons\">add</i></a></div></main><footer class=\"rodape\"></footer><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat\">Cancela</a><a href=\"#!\" class=\"modal-close waves-effect waves-green btn-flat concorda\">Confirma</a></div></div><script src=\"/estatico/js/jquery-3.4.1.js\"></script><script src=\"/estatico/js/materialize.js\"></script><script src=\"/estatico/js/loadtemplate.js\"></script><script src=\"/estatico/js/gestaoNC.js\"></script><div id=\"macroprocessos\" class=\"controle\">");

  marko_forEach(data.mp, function(mp) {
    out.w("\"" +
      marko_escapeXml(mp.macroprocesso) +
      "\"");
  });

  out.w("<br></div>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "48");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/nc/lista/lista.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
