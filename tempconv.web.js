/* -*- coding: UTF-8, tab-width: 2 -*- */
/*jslint indent: 2, maxlen: 80, continue: true, unparam: true, browser: true */
(function () {
  'use strict';

  var Temperature = window.module.exports.Temperature,
    inField = document.getElementById('orig'),
    outDest = document.getElementById('results');

  outDest.set = function (err, text) {
    outDest.innerHTML = '';
    outDest.appendChild(document.createTextNode(String(err || text)));
  };

  inField.convertNow = function () {
    var temp = String(inField.value);
    try {
      temp = new Temperature(temp);
      temp = 'CFK'.replace(/\S/g, function (destUnit) {
        var conv  = temp['to' + destUnit];
        // if (destUnit === temp.unit.id) { return ''; }
        conv = ('function' === typeof conv ? conv.call(temp) : '?');
        return ' = ' + String(conv);
      });
    } catch (err) {
      return outDest.set(err);
    }
    return outDest.set(null, temp);
  };

  inField.onchange  = inField.convertNow;
  inField.onkeydown = inField.convertNow;
  inField.onkeyup   = inField.convertNow;

  document.forms[0].onsubmit = function () {
    inField.convertNow();
    inField.select();
    return false;
  };

  inField.convertNow();
  setTimeout(function () { inField.focus(); inField.select(); }, 500);
}());
