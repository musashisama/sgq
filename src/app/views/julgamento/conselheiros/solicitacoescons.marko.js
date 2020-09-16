// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/conselheiros/solicitacoescons.marko",
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Registro de Solicitação</h3><div id=\"dataCAL\"" +
    marko_attr("data-cal", "" + data.cal) +
    "></div><div class=\"row\"><div class=\"card hoverable blue-grey darken-1 col s12\"><div class=\"card-content white-text\"><span class=\"card-title\"><strong>Cons. <span class=\"nomeSol\">" +
    marko_escapeXml(data.user.nome) +
    "</span></strong> - " +
    marko_escapeXml(data.user.tipo) +
    "</span><strong>CPF:</strong><span id=\"cpfCons\">" +
    marko_escapeXml(data.user.cpf) +
    "</span><br><strong>Turma:</strong>" +
    marko_escapeXml(data.user.unidade) +
    "<br><strong>Final do Mandato:</strong>" +
    marko_escapeXml(data.user.dtFimMandato) +
    "<br> Falta(m) <strong><span id=\"daps\"></span></strong> dia(s) para a próxima sessão, que será realizada em <strong><span id=\"ps\"></span></strong>.</div></div></div><div class=\"row\"><ul class=\"collapsible col s6\"><li><div class=\"collapsible-header\"><i class=\"material-icons\">filter_drama</i>REGAP - Justificar Suspensão de Prazos Regimentais</div><div class=\"collapsible-body\"><span>Afastamentos e licenças</span><br><span>Prorrogação de Voto Vencedor - art. 45, §1º, inciso II do RICARF</span><br><span>Prorrogação de Prazo de Processo de Imunidade</span><br><span>Prorrogação de Prazo autorizada pela Presidência do CARF - art. 45, §1º, inciso II, item b do RICARF</span><br><span>Justificativa para deixar de praticar de ato processual (Art. 45, IV RICARF)</span></div></li><li><div class=\"collapsible-header\"><i class=\"material-icons\">place</i>REINP - Redução de Horas da Meta de Produtividade</div><div class=\"collapsible-body\"><span>Afastamentos e licenças</span><br><span>Mudança de Colegiado que implique em alteração do calendário da sessão de julgamento</span><br><span>Não cumprimento da meta por ausência de carga de processo</span><br><span>1º sorteio com prazo inferior a 21 dias da indicação</span><br><span>Assumir interinamente presidência de turma por no mínimo um mês</span><br><span>Participação em sessão TO/CSRF a partir de abril de 2020</span><br><span>Participação em sessão presencial ou virtual de TEX para sustentação oral</span></div></li><li><div class=\"collapsible-header\"><i class=\"material-icons\">whatshot</i>Dispensa de Sorteio</div><div class=\"collapsible-body\"><div class=\"collection\"><a href=\"#!\" class=\"collection-item\">Excesso de Horas em Lotes de Sorteio</a><a href=\"#!\" class=\"collection-item\">Distribuição de processos reflexos ou decorrentes</a><a href=\"#!\" class=\"collection-item \">Formalização de Voto Vencedor</a><a href=\"#!\" class=\"collection-item\">Participação em TO/CSRF de março de 2019 até março de 2020</a></div></div></li><li><div class=\"collapsible-header\"><i class=\"material-icons\">whatshot</i>Outras solicitações</div><div class=\"collapsible-body\"><span>Justificar faltas à sessões de julgamento</span></div></li></ul><div class=\"col s6\"><h5>Orientações</h5><p>As solicitações que constem afastamentos para redução de meta e justificativa de suspensão de prazos e faltas à sessões de julgamento deverão ser efetuadas <strong>após</strong> transcorrido o evento. Caso sejam efetuadas antes do evento, serão <strong>rejeitadas</strong>.</p></div></div></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "78");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda modal-close\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "87");

  app_scripts_js_tag({}, out, __component, "88");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/libs/quill.min.js\"></script><script src=\"/estatico/js/julgamento/conselheiros/regsolicitacoes.js\"></script>");

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
    id: "/sgq$1.0.0/src/app/views/julgamento/conselheiros/solicitacoescons.marko",
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
