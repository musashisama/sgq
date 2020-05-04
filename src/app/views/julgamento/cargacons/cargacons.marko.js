// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/cargacons/cargacons.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    app_scripts_css_template = require("../../components/app-scripts-css.marko"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    app_scripts_css_tag = marko_loadTag(app_scripts_css_template),
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    app_header_template = require("../../components/app-header.marko"),
    app_header_tag = marko_loadTag(app_header_template),
    app_navbar_template = require("../../components/app-navbar.marko"),
    app_navbar_tag = marko_loadTag(app_navbar_template),
    marko_escapeXml = marko_helpers.x,
    app_footer_template = require("../../components/app-footer.marko"),
    app_footer_tag = marko_loadTag(app_footer_template),
    app_scripts_js_template = require("../../components/app-scripts-js.marko"),
    app_scripts_js_tag = marko_loadTag(app_scripts_js_template),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html>");

  app_scripts_css_tag({}, out, __component, "1");

  out.w("<body>");

  component_globals_tag({}, out);

  app_header_tag({}, out, __component, "3");

  out.w("<main class=\"conteudoPrincipal\">");

  app_navbar_tag({
      id: "slide-out",
      class: "sidenav"
    }, out, __component, "5");

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Diagnóstico da Carga de Processos dos Conselheiros</h3><br><br><form id=\"formGerencial\" name=\"formGerencial\" action=\"/julgamento/restrito/diagnostico-carga\" method=\"post\"><div class=\"row\"><div class=\"col s12\"><ul class=\"tabs\"><li class=\"litab tab col s3\"><a href=\"#tabTabela\">Carga dos Conselheiros</a></li><li class=\"libox tab col s3\"><a href=\"#tabBoxplot\">Carga nas Seções de Julgamento</a></li><li class=\"libar tab col s3\"><a href=\"#tabBarras\">Carga por Seção/Conselheiro</a></li></ul></div><div id=\"tabTabela\" class=\"col s12\"><div class=\"row\"><div class=\"col s12 right-align\"><a href=\"#!\" id=\"mostraColunas\" title=\"Agrupar/Desagrupar por Turma\" class=\"waves-effect waves-yellow hoverable z-depth-3 btn-floating blue\"><i class=\"material-icons\">unfold_less</i></a></div></div><div class=\"row\"><p id=\"resultado\"></p><div class=\"tabelaCarga\"><div id=\"tabelaCarga\"></div></div><div id=\"dadosCarga\" class=\"controle\">" +
    marko_escapeXml(data.relatorio) +
    "</div></div></div><div id=\"tabBoxplot\" class=\"col s12\"><div class=\"row\"><h4 class=\"center\">Carga por Seção de Julgamento</h4><h5 id=\"CSRF\" class=\"section scrollspy\">Câmara Superior de Recursos Fiscais</h5><p><div style=\"width:75%;height:auto;\" id=\"boxPlotCSRF\"></div></p><h5 id=\"SJ1\" class=\"section scrollspy\">1ª Seção de Julgamento</h5><p><div style=\"width:75%;height:auto;\" id=\"boxPlotSJ1\"></div></p><h5 id=\"SJ2\" class=\"section scrollspy\">2ª Seção de Julgamento</h5><p><div style=\"width:75%;height:auto;\" id=\"boxPlotSJ2\"></div></p><h5 id=\"SJ3\" class=\"section scrollspy\">3ª Seção de Julgamento</h5><p><div style=\"width:75%;height:auto;\" id=\"boxPlotSJ3\"></div></p></div></div><div id=\"tabBarras\" class=\"col s12\"><div class=\"row\"><h4 class=\"center\">Carga por Seção de Julgamento</h4><h5 id=\"bCSRF\" class=\"section scrollspy\">Câmara Superior de Recursos Fiscais</h5><p><div style=\"width:100%;height:1000px;\" id=\"barrasCSRF\"></div></p><h5 id=\"bSJ1\" class=\"section scrollspy\">1ª Seção de Julgamento</h5><p><div style=\"width:100%;height:1600px;\" id=\"barrasSJ1\"></div></p><h5 id=\"bSJ2\" class=\"section scrollspy\">2ª Seção de Julgamento</h5><p><div style=\"width:100%;height:1600px;\" id=\"barrasSJ2\"></div></p><h5 id=\"bSJ3\" class=\"section scrollspy\">3ª Seção de Julgamento</h5><p><div style=\"width:100%;height:1600px;\" id=\"barrasSJ3\"></div></p></div></div></div></form></div><div id=\"scspy\" class=\"scspy col hide-on-small-only m3 l2 right\"><ul class=\"section table-of-contents\"><li><a href=\"#CSRF\">Câmara Superior de Recursos Fiscais</a></li><li><a href=\"#SJ1\">1ª Seção de Julgamento</a></li><li><a href=\"#SJ2\">2ª Seção de Julgamento</a></li><li><a href=\"#SJ3\">3ª Seção de Julgamento</a></li></ul></div><div id=\"scspy2\" class=\"scspy col hide-on-small-only m3 l2 right\"><ul class=\"section table-of-contents\"><li><a href=\"#bCSRF\">Câmara Superior de Recursos Fiscais</a></li><li><a href=\"#bSJ1\">1ª Seção de Julgamento</a></li><li><a href=\"#bSJ2\">2ª Seção de Julgamento</a></li><li><a href=\"#bSJ3\">3ª Seção de Julgamento</a></li></ul></div></main><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "88");

  app_scripts_js_tag({}, out, __component, "89");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/julgamento/cargacons.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "94");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/cargacons/cargacons.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-footer.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
