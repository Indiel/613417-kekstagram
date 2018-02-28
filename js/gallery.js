'use strict';

(function () {

  // Если при получении данных с сервера произошла ошибка
  window.errorHandler = function (message) {
    document.body.insertAdjacentHTML('afterbegin', '<div class="error-wrap"><div class="error-message"></div><div class="error-close">&times;</div></div>');

    var errorWrap = document.querySelector('.error-wrap');
    errorWrap.style = 'z-index: 100; position: fixed; width: 100%; min-height: 100%; background-color: rgba(0, 0, 0, 0.5); position: fixed;';

    var errorMessage = document.querySelector('.error-message');
    errorMessage.style = 'z-index: 110; position: absolute; width: 460px; margin: auto 50%; top: 40%; padding: 20px; border: 2px solid #CF3C21; background-color: #F7D712; text-align: center; font-size: 24px; color: #CF3C21;';
    errorMessage.style.left = '-230px';
    errorMessage.textContent = message;

    var errorClose = document.querySelector('.error-close');
    errorClose.style = 'z-index: 120; position: fixed; left: 80%; width: 50px; font-size: 45px; text-align: center; color: rgb(255, 255, 255); cursor: pointer;';
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
