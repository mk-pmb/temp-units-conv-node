#!/bin/sed -nurf
# -*- coding: UTF-8, tab-width: 2 -*-

s~^.*$~\
  /*jslint indent: 2, maxlen: 80, node: true */\
  'use strict';\
  var tu = require('./test-util');\
  ~
s~(^|\n)  ~\1~g
p;n

: readme
  /^`{3}/{
    s~^`{3}~~
    /^javascript$/{
      s~^.*$~(function () \{\n  /*jslint vars:true */~
      b test_js
    }
    /^bash$/{
      s~^.*$~tu.test_cli([~
      b test_bash
    }
    s~^~E_UNKNOWN_TEST_LANG! ~;q
  }
  $s~^.*$~console.log('+OK readme2test passed');~p
  n
b readme


: test_js
  p;n

  /^`{3}$/{
    s~^.*$~}());\n~
    p;n
    b readme
  }

  /\S/s~^~  ~
  \|; +// |{
    s~^\s+~&tu.cmp(~
    s~;( +)// ~,\1\f~
    s~\f([0-9]*\.([0-9]+))…~"\1", "digits", "\2"~
    s~\f((func)tion .+)$~"\1", "\2"~
    s~\f~~
    s~$~);~
  }


b test_js


: test_bash
  p;n
  /^\$\s*$/n

  /^`{3}$/{
    s~^.*$~]);\n~
    p;n
    b readme
  }

  s~^~  "~
  s~$~",~
b test_bash







# scroll
