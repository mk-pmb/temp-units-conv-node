#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function verify_readme_demo () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local SELFPATH="$(readlink -m "$BASH_SOURCE"/..)"
  cd "$SELFPATH" || return $?

  local TEST_JS='tmp.readme-test.js'
  LANG=C sed -nrf readme2test.sed -- ../README.md >"$TEST_JS" || return $?
  jslint "$TEST_JS" || return $?
  nodejs "$TEST_JS" || return $?

  return 0
}



verify_readme_demo "$@"; exit $?
