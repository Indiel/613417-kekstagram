'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
      lastTimeout = window.setTimeout(function () {
        fun();
        lastTimeout = false;
      }, DEBOUNCE_INTERVAL);
    } else {
      fun();
      lastTimeout = window.setTimeout(function () {
        lastTimeout = false;
      }, DEBOUNCE_INTERVAL);
    }
  };

})();
