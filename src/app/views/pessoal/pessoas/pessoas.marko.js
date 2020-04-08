// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/pessoal/pessoas/pessoas.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/tabulator_materialize.min.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Relação de Pessoal do CARF</title></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"container-header cabecalho\"></header><main class=\"conteudoPrincipal\"><div class=\"container\"><h3 class=\"center-align\">Relação de Pessoal do CARF</h3><br><div class=\"row\"><div class=\"col s12\"><ul class=\"tabs\"><li class=\"tab col s3\"><a href=\"#tabCons\">Conselheiros</a></li><li class=\"tab col s3\"><a href=\"#tabColab\">Colaboradores</a></li><li class=\"tab col s3\"><a href=\"#tabServ\">Servidores</a></li><li class=\"tab col s3\"><a href=\"#tabTerc\">Terceirizados</a></li></ul></div><div id=\"tabCons\" class=\"col s12\"><div class=\"row\"><div class=\"row\"><div class=\"tabelaCons\"><div id=\"tabelaCons\"></div></div></div></div></div><div id=\"tabColab\" class=\"col s12\"><div class=\"row\"><div class=\"row\"><div class=\"tabelaCol\"><div id=\"tabelaCol\"></div></div></div></div></div><div id=\"tabServ\" class=\"col s12\"><div class=\"row\"><div class=\"row\"><div class=\"tabelaServ\"><div id=\"tabelaServ\"></div></div></div></div></div><div id=\"tabTerc\" class=\"col s12\"><div class=\"row\"><div class=\"row\"><div class=\"tabelaTerc\"><div id=\"tabelaTerc\"></div></div></div></div></div></div></div><div id=\"dadosCons\" class=\"controle\">" +
    marko_escapeXml(data.cons) +
    "</div><div id=\"dadosCol\" class=\"controle\">" +
    marko_escapeXml(data.col) +
    "</div><div id=\"dadosServ\" class=\"controle\">" +
    marko_escapeXml(data.serv) +
    "</div><div id=\"dadosTerc\" class=\"controle\">" +
    marko_escapeXml(data.terc) +
    "</div></main><footer class=\"page-footer rodape\"></footer><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div><script src=\"/estatico/js/libs/jquery-3.4.1.js\"></script><script src=\"/estatico/js/libs/materialize.js\"></script><script src=\"/estatico/js/libs/tabulator.min.js\"></script><script src=\"/estatico/js/loadtemplate.js\"></script><script src=\"/estatico/js/pessoas.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "64");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/pessoal/pessoas/pessoas.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
