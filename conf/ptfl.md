---
title: Portfolio
published: 2016-01-01
collection:
  - pages
  - posts
layout: page-portfolio.html
icon: ico-portfolio
order: 2
js:
{% for (var chunk in o.htmlWebpackPlugin.files.chunks) { %}
- "{%=o.htmlWebpackPlugin.files.chunks[chunk].entry %}"
{% } %}
{% if (o.htmlWebpackPlugin.options.production) { %}
css: "app.{%=o.webpack.hash%}.css"
{% } %}
excerpt:
  text: "Ce site n'est pas géré par une base de données, mais il est tout à fait possible de s'en passer !"
  photo: img/Maq_CA_08-08-2_Extrait.jpg
  photoAlt: Maquette pour un catalogue voyage.
---


<div id="my-scroll">
  <div id="app"></div>
</div>
