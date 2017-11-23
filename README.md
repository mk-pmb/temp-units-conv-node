
<!--#echo json="package.json" key="name" underline="=" -->
temp-units-conv
===============
<!--/#echo -->

![unit conversions](https://github.com/mk-pmb/temp-units-conv-node/raw/master/img/units-rccl-215px.png)

<!--#echo json="package.json" key="description" -->
Convert temperature units (Kelvin, Celsius, Fahrenheit), lib + CLI. Based on
snippets by doug65536 and jesus666 on #Node.js
<!--/#echo -->

Try it live:
[Web Demo](https://mk-pmb.github.io/temp-units-conv-node/tempconv.web.html)


simple
------

```javascript
var tuc = require('temp-units-conv');
tuc.c2f(100);     // 212
tuc.f2k(212);     // 373.15
tuc.k2c(373.15);  // 100
tuc.fahrenheitToCelsius(451);   // 232.77…
tuc.celsiusToKelvin(232.77);    // 505.9…
```

objective
---------

```javascript
var tuc = require('temp-units-conv'),
  waterboil = new tuc.Temperature(100, 'C');
String(waterboil);  // '100.00 °C'
waterboil.unit;     // function Celsius(c) {…}

var americanWaterBoil = waterboil.toF();
String(americanWaterBoil);  // '212.00 °F'
americanWaterBoil.temp;     // 212
americanWaterBoil.unit.nameLong;  // 'degrees Fahrenheit'
americanWaterBoil.unit.nameShort; // '°F'

(new tuc.F(451)).toUnit('K').toString();  // '505.93 K'

var tempFromString = new tuc.Temperature('0 K');
tempFromString.toUnit('C').toString();    // '-273.15 °C'
```

shelly
------

```bash
$ tempconv 100C 451F 0K
100.00 °C       = 212.00 °F     = 373.15 K
451.00 °F       = 232.78 °C     = 505.93 K
0.00 K  = -459.67 °F    = -273.15 °C
```





<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
MIT
<!--/#echo -->
