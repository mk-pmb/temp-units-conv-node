#!/usr/bin/env node
/* -*- coding: UTF-8, tab-width: 2 -*- */
/*jslint indent: 2, maxlen: 80, continue: true, node: true */
/*globals define:true */
'use strict';

var Temperature = require('./conversions').Temperature;

function argln(arg) {
  var temp = new Temperature(arg);
  console.log(String(temp) +
    ['F', 'C', 'K'].map(function (destUnit) {
      var conv  = temp['to' + destUnit];
      if (destUnit === temp.unit.id) { return ''; }
      conv = ('function' === typeof conv ? conv.call(temp) : '?');
      return '\t= ' + String(conv);
    }).join(''));
}

module.exports = argln;
if (require.main === module) { process.argv.slice(2).forEach(argln); }
