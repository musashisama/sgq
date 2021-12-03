// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/conselheiros/portaldoconselheiro.marko",
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
    marko_attr = marko_helpers.a,
    marko_escapeXml = marko_helpers.x,
    app_modal_tabela_legenda_template = require("../../components/app-modal-tabela-legenda.marko"),
    app_modal_tabela_legenda_tag = marko_loadTag(app_modal_tabela_legenda_template),
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Portal do(a) Conselheiro(a)</h3><div id=\"dataCAL\"" +
    marko_attr("data-cal", "" + data.cal) +
    "></div><div id=\"dataPauta\"" +
    marko_attr("data-pauta", "" + data.pauta) +
    "></div><div class=\"row\"><div class=\"card hoverable cardAzulClaro col s12\"><div class=\"card-content\"><span class=\"card-title\"><strong>Cons.<span class=\"nomeSol\">" +
    marko_escapeXml(data.user.nome) +
    "</span></strong></span><strong>CPF:</strong><span id=\"cpfCons\">" +
    marko_escapeXml(data.user.cpf) +
    "</span><br><strong>Turma:</strong>" +
    marko_escapeXml(data.user.unidade) +
    "<br><strong>Representação:</strong>" +
    marko_escapeXml(data.user.tipo) +
    "<br><strong>Final do Mandato:</strong>" +
    marko_escapeXml(data.user.dtFimMandato) +
    "<br> Falta(m) <strong><span id=\"daps\"></span></strong> dia(s) para a próxima sessão, que será realizada em <strong><span id=\"ps\"></span></strong>.</div></div></div><div id=\"divPresidenteOrdena\"></div><div class=\"row\"><div class=\"col s12 m12\"><div class=\"desenv card hoverable cardAzulIndicacao\"><div class=\"card-content\"><span class=\"card-title\">Indicação para Pauta</span></div><div class=\"card-action linkCard\"><a id=\"linkIndicacao\" href=\"/julgamento/conselheiros/gestao-indicacoes\"><i class=\"material-icons\">send</i></a></div></div></div></div><div class=\"row\"><div class=\"col s6 m6\"><div class=\"card hoverable cardAzul\"><div class=\"card-content\"><span class=\"card-title\">REGAP</span><p>Relatório Gerencial de Acompanhamento de Prazos</p></div><div class=\"card-action linkCard\"><a href=\"/julgamento/conselheiros/regap\"><i class=\"material-icons\">send</i></a></div></div></div><div class=\"col s6 m6\"><div class=\"card hoverable cardLaranja\"><div class=\"card-content \"><span class=\"card-title\">REINP</span><p>Relatório de Indicação para Pauta. Acompanhamento da Produtividade</p><p>Este relatório será disponibilizado após ajustes a serem efetuados pela DIPAJ.</p></div><div class=\"card-action linkCard\"><a href=\"/julgamento/conselheiros/reinp\"><i class=\"material-icons\">send</i></a></div></div></div><div class=\"col s6 m6\"><div class=\"card hoverable cardFuchsiaEscuro\"><div class=\"card-content \"><span class=\"card-title\">Acompanhamento de Solicitações</span><p>Acompanhar o andamento de solicitações</p></div><div class=\"card-action linkCard\"><a href=\"/julgamento/conselheiros/acompanha-solicitacoes\"><i class=\"material-icons\">send</i></a></div></div></div><div class=\"col s6 m6\"><div class=\"card hoverable cardFuchsia\"><div class=\"card-content \"><span class=\"card-title\">Registro de Solicitação</span><p>Cadastrar solicitações</p></div><div class=\"card-action linkCard\"><a href=\"/julgamento/conselheiros/registro-solicitacoes\"><i class=\"material-icons\">send</i></a></div></div></div><div class=\"col s6 m6\"><div class=\"card hoverable cardVerde\"><div class=\"card-content \"><span class=\"card-title\">Ocorrências</span><p>Verificação de Ocorrências no Mandato do Conselheiro</p></div><div class=\"card-action linkCard\"><a href=\"/julgamento/conselheiros/ocorrencias\"><i class=\"material-icons\">send</i></a></div></div></div><div class=\"col s6 m6\"><div class=\"card hoverable cardAmarelo\"><div class=\"card-content \"><span class=\"card-title\">Gestão do Conhecimento</span><p>Acessar página de Gestão do Conhecimento da COJUL</p></div><div class=\"card-action linkCard\"><a href=\"/julgamento/gestaoconhecimento\"><i class=\"material-icons\">send</i></a></div></div></div><div class=\"col s6 m6\"><div class=\"card hoverable cardVermelho\"><div class=\"card-content \"><span class=\"card-title\">Perguntas & Respostas</span><p>Acessar página de Perguntas e Respostas da COJUL</p></div><div class=\"card-action linkCard\"><a href=\"/julgamento/faqdipaj\"><i class=\"material-icons\">send</i></a></div></div></div><div class=\"col s6 m6\"><div class=\"card hoverable cardPreto\"><div class=\"card-content \"><span class=\"card-title\">Antiga Página do(a) Conselheiro(a)</span><p>Acessar versão anterior da Página do(a) Conselheiro(a)</p></div><div class=\"card-action linkCard\"><a href=\"/julgamento/conselheiros/\"><i class=\"material-icons\">send</i></a></div></div></div></div></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "105");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda modal-close\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "114");

  app_scripts_js_tag({}, out, __component, "115");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/libs/quill.min.js\"></script><script src=\"/estatico/js/julgamento/conselheiros/portalcons.js\"></script><script src=\"/estatico/js/julgamento/conselheiros/regsolicitacoes.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "122");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/conselheiros/portaldoconselheiro.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-modal-tabela-legenda.marko",
      "../../components/app-footer.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
