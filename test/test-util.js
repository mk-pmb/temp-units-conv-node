/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var tu = {}, eq = require('assert').deepStrictEqual,
  cli_argln = require('../tempconv.cli.js');

function isStr(x, no) { return (((typeof x) === 'string') || no); }


tu.cmp = function (ac, ex, fx, arg) {
  if (fx === 'digits') {
    ac = (+ac).toFixed(arg.length + 1).slice(0, -1);
  }
  if (fx === 'func') {
    ac = String(ac).split(/\{/)[0] + '{…}';
  }
  eq(ac, ex);
  return true;
};


tu.test_cli = function (expected) {
  var origLog = console.log, actual = [];
  console.log = function (x) { actual.push(x); };
  expected.forEach(function (ln) {
    if (ln.substr(0, 1) !== '$') { return; }
    actual.push(ln);
    ln.split(/\s+/).slice(2).forEach(cli_argln);
  });
  function multispace2tab(s) { return s.replace(/\s{2,}=/g, '\t='); }
  eq(actual, expected.map(multispace2tab));
  console.log = origLog;
};




















module.exports = tu;
