// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/components/app-header.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<header class=\"container-header cabecalho\"><nav class=\"cabecalho tituloNav\"><div class=\"nav-wrapper \"><a href=\"/\" class=\"titulo-sistema\">Sistema de Gestão Integrada</a><ul class=\"right hide-on-med-and-down valign-wrapper\"><li><a class=\"dropdown-trigger\" href=\"#!\" data-target=\"dropdownAcervo\">Acervo<i class=\"material-icons left\">work</i></a></li><li><a class=\"dropdown-trigger\" href=\"#!\" data-target=\"dropdownJulg\">Julgamento<i class=\"material-icons left\">account_balance</i></a></li><li><a class=\"dropdown-trigger\" href=\"#!\" data-target=\"dropdownQualidade\">Qualidade<i class=\"material-icons left\">check_circle</i></a></li><li><a class=\"dropdown-trigger\" href=\"#!\" data-target=\"dropdownRiscos\">Riscos<i class=\"material-icons left\">trending_down</i></a></li><li><a class=\"dropdown-trigger\" href=\"#!\" data-target=\"dropdownPessoas\">Pessoas<i class=\"material-icons left\">people</i></a></li><li><a class=\"loginout\" href=\"/login\">Login<i class=\"material-icons left\">radio_button_unchecked</i></a></li></ul></div></nav><div class=\"nav-wrapper baixoNav\"> </div></header>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/components/app-header.marko"
  };
