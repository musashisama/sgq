// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/carregacsv/carregacsv.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Carga de Relatório do e-Processo</title></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"container-header cabecalho\"></header><main class=\"conteudoPrincipal\"><ul id=\"slide-out\" class=\"sidenav\"></ul><div class=\"container\"><h3 class=\"center-align jurema\">Carga de Relatório CSV</h3><br><br><form id=\"formCSV\" name=\"formCSV\" action=\"/julgamento/restrito/carregacsv\" method=\"post\" enctype=\"multipart/form-data\"><div class=\"row\"><div class=\"file-field ctoastsucesso input-field form-group col s6\"><div class=\"btn\"><span>Arquivo</span><input type=\"file\" name=\"filetoupload\" accept=\".csv\" onchange=\"triggerValidation(this)\" required></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\"></div></div></div><div class=\"row\"><div class=\"col s2\"><div class=\"form-group\"><p><label>Qual relatório que deseja enviar?</label></p><p><label><input class=\"with-gap\" value=\"REGAP\" id=\"REGAP\" name=\"tipoRel\" type=\"radio\"><span>REGAP</span></label></p><p><label><input class=\"with-gap\" value=\"Estoque\" id=\"Estoque\" name=\"tipoRel\" type=\"radio\" checked><span>Estoque</span></label></p><p><label><input class=\"with-gap\" value=\"REINP\" id=\"REINP\" name=\"tipoRel\" type=\"radio\" disabled><span>REINP</span></label></p><p><label><input class=\"with-gap\" value=\"REJUL\" name=\"tipoRel\" type=\"radio\" disabled><span>REJUL</span></label></p></div></div><div class=\"col s2 soregap\"><div class=\"form-group\"><p><label>Qual a semana do REGAP:</label></p><p><label><input class=\"with-gap\" value=\"Amarela\" name=\"semana\" type=\"radio\" checked><span>Amarela</span></label></p><p><label><input class=\"with-gap\" value=\"Verde\" name=\"semana\" type=\"radio\"><span>Verde</span></label></p><p><label><input class=\"with-gap\" value=\"Azul\" name=\"semana\" type=\"radio\"><span>Azul</span></label></p></div></div><div class=\"input-field dataExt col s3\"><input type=\"text\" id=\"dataExt\" name=\"dataExt\" class=\"datepicker\" required><label for=\"dataExt\" class=\"lbdataNC\">Quando o relatório foi <strong>extraído</strong>?</label></div><div class=\"form-group col s2\"><button class=\"btn waves-effect waves-light concorda right\" type=\"submit\" name=\"action\">Enviar arquivo <i class=\"material-icons right\">send</i></button></div></div></form></div></main><footer class=\"page-footer rodape\"></footer><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div><script src=\"/estatico/js/libs/jquery-3.4.1.js\"></script><script src=\"/estatico/js/libs/materialize.js\"></script><script src=\"/estatico/js/loadtemplate.js\"></script><script src=\"/estatico/js/base/navbar.js\"></script><script src=\"/estatico/js/carregaCSV.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "82");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/carregacsv/carregacsv.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
