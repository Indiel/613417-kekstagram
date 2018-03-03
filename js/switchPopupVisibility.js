'use strict';

window.switchPopupVisibility = (function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target.tagName !== 'TEXTAREA') {
        window.switchPopupVisibility.closePopup(window.switchPopupVisibility.element);
      }
    }
  };

  return {
    openPopup: function (element) {
      element.classList.remove('hidden');
      window.switchPopupVisibility.element = element;
      document.addEventListener('keydown', onPopupEscPress);
    },
    closePopup: function (element) {
      element.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    },
    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    }
  };

})();
