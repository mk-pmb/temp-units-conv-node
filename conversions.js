/* -*- coding: UTF-8, tab-width: 2 -*- */
/*jslint indent: 2, maxlen: 80, continue: true, node: true */
/*globals define:true */
'use strict';

var EX = { /* exports namespace */ },
  CF,  /* constructor function for this file's pseudo-class */
  PT,  /* prototype alias */
  getContext = function () { return this; },
  gen; /* temporary multi-purpose function factory slot */


EX.tempRgx = /(\-?[0-9]*(?:\.[0-9]*|)[0-9])\s*(?:°|deg|degrees?|)\s*(C|F|K)/i;

CF = EX.Temperature = function Temperature(temp, unit) {
  var self = this;
  if (('string' === typeof temp) && (!unit)) {
    unit = EX.tempRgx.exec(temp);
    if (unit && (unit[0] === temp)) {
      temp = unit[1];
      unit = unit[2];
    } else {
      throw new Error('unable to understand temperature string: ' + temp);
    }
  }
  self.temp = Number(temp);
  self.unit = EX.getUnitDescr(unit);
  return self;
};
PT = CF.prototype;

PT.toString = function () {
  return Number(this.temp).toFixed(2) + ' ' + this.unit.nameShort;
};

PT.toUnit = function (destUnitName) {
  var self = this, OrigUnit = self.unit,
    DestUnit = EX.getUnitDescr(destUnitName), conv;
  if (DestUnit === OrigUnit) { return self; }
  conv = EX[String(OrigUnit.id + '2' + destUnitName).toLowerCase()];
  if ('function' !== typeof conv) {
    throw new Error('no idea how to convert ' + OrigUnit.nameShort +
      ' into ' + DestUnit.nameShort);
  }
  return new DestUnit(conv(self.temp));
};

EX.getUnitDescr = function (allegedUnitDescr) { return allegedUnitDescr; };
/* ^-- for the time until the unitDescrs are established,
       just pass anything through without checks. */

gen = function (receipe) {
  var UnitCF, UnitPT;
  PT['to' + receipe.id] = getContext;
  gen.toThisUnit(receipe.id);
  EX[receipe.id] = UnitCF = receipe.Ctor;
  UnitCF.id = receipe.id;
  UnitCF.nameShort = receipe.nameShort;
  UnitCF.nameLong = receipe.nameLong;
  UnitPT = UnitCF.prototype = new EX.Temperature(0, UnitCF);
  UnitPT.unit = UnitCF;
  return UnitCF;
};
gen.toThisUnit = function (destUnit) {
  PT['to' + destUnit] = function () { return this.toUnit(destUnit); };
};

gen({ id: 'C', nameShort: '°C', nameLong: 'degrees Celsius',
  Ctor: function Celsius(c) { return CF.call(this, c, 'C'); } }
  ).offsetK = 273.15;
gen({ id: 'F', nameShort: '°F', nameLong: 'degrees Fahrenheit',
  Ctor: function Fahrenheit(f) { return CF.call(this, f, 'F'); } });
gen({ id: 'K', nameShort: 'K', nameLong: 'Kelvin',
  Ctor: function Kelvin(k) { return CF.call(this, k, 'K'); } });

EX.getUnitDescr = function (id) {
  var descr = EX[id];
  if ('function' === typeof descr) {
    if (descr.prototype.constructor === CF) {
      return descr;
    }
  }
  throw new Error('unsupported unit of temperature: ' + String(id));
};

gen = function (orig, dest, formula) {
  EX[orig.toLowerCase() + 'To' + dest] = formula;
  orig = orig.substr(0, 1);
  dest = dest.substr(0, 1);
  EX[(orig + '2' + dest).toLowerCase()] = formula;
};
gen('Celsius',    'Fahrenheit', function (c) { return ((c * 9) / 5) + 32; });
gen('Celsius',    'Kelvin',     function (c) { return c + EX.C.offsetK; });
gen('Fahrenheit', 'Celsius',    function (f) { return ((f - 32) * 5) / 9; });
gen('Fahrenheit', 'Kelvin',     function (f) { return EX.c2k(EX.f2c(f)); });
gen('Kelvin',     'Celsius',    function (k) { return k - EX.C.offsetK; });
gen('Kelvin',     'Fahrenheit', function (k) { return EX.c2f(EX.k2c(k)); });

gen = undefined;  /* save memory */

/* <doug65536> if you want to go crazy with it:
      http://en.wikipedia.org/wiki/Conversion_of_units_of_temperature */


if (('function' === typeof define) && define.amd) { define(EX); }
if (('object' === typeof module) && module) { module.exports = EX; }
