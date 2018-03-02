'use strict';

window.switchPopupVisibility = (function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var onPopupEscPress = function (evt, element) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target.tagName !== 'TEXTAREA') {
        window.switchPopupVisibility.closePopup(element);
      }
    }
  };

  return {
    openPopup: function (element) {
      element.classList.remove('hidden');
      document.addEventListener('keydown', function (evt) {
        onPopupEscPress(evt, element);
      });
    },
    closePopup: function (element) {
      element.classList.add('hidden');
      document.removeEventListener('keydown', function (evt) {
        onPopupEscPress(evt, element);
      });
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        // evt.preventDefault();
        action();
      }
    }
  };

})();
