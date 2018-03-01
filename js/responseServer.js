'use strict';

(function () {

  // Если при получении данных с сервера произошла ошибка
  window.errorHandler = function (message) {
    document.body.insertAdjacentHTML('afterbegin', '<div class="error-wrap"><div class="error-message"></div><div class="error-close">&times;</div></div>');

    var errorWrap = document.querySelector('.error-wrap');

    var errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = message;

    var errorClose = document.querySelector('.error-close');
    errorClose.tabIndex = '0';

    errorClose.addEventListener('click', function () {
      window.switchPopupVisibility.closePopup(errorWrap);
    });

    errorClose.addEventListener('keydown', function (evt) {
      window.switchPopupVisibility.isEnterEvent(evt, window.switchPopupVisibility.closePopup(errorWrap));
    });
  };

  window.cloneData = [];

  // Получаем фотки с сервера
  var successHandler = function (data) {
    window.cloneData = data;

    window.sortPhoto(window.cloneData);
  };

  window.backend.load(successHandler, window.errorHandler);

})();
