'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  var picturesListElement = document.querySelector('.pictures');

  var lastTimeout;
  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
      lastTimeout = window.setTimeout(function () {
        picturesListElement.innerHTML = '';
        fun();
        lastTimeout = false;
      }, DEBOUNCE_INTERVAL);
    } else {
      picturesListElement.innerHTML = '';
      fun();
      lastTimeout = window.setTimeout(function () {
        lastTimeout = false;
      }, DEBOUNCE_INTERVAL);
    }
  };

})();
