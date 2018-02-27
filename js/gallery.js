'use strict';

(function () {

  // склонение слова
  var getDeclension = function (arrLength) {
    var commStr;
    if (arrLength % 100 >= 11 && arrLength % 100 <= 14) {
      commStr = ' комментариев';
    } else {
      switch (arrLength % 10) {
        case 1: commStr = ' комментарий';
          break;
        case 2:
        case 3:
        case 4: commStr = ' комментария';
          break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0: commStr = ' комментариев';
          break;
      }
    }
    return commStr;
  };

  // отрисовка окна открытой фотографии
  var galleryOverlay = document.querySelector('.gallery-overlay');

  var createOverlayElement = function (photo) {
    galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', photo.url);
    galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
    galleryOverlay.querySelector('.gallery-overlay-controls-comments').firstChild.textContent = photo.comments.length;
    galleryOverlay.querySelector('.gallery-overlay-controls-comments').lastChild.textContent = getDeclension(photo.comments.length);
  };

  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  // функция для рандомного выведения значений массива без повторений
  var shuffle = function (arr) {
    var randomValue = Math.floor(Math.random() * arr.length);
    return arr.splice(randomValue, 1);
  };

  // заполнение контейнера шаблонными фрагментами (фотографиями)
  var createPictureElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture-likes').textContent = photo.likes;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;

    pictureFragment.appendChild(photoElement);
  };

  var picturesListElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content;
  var pictureFragment = document.createDocumentFragment();

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

  // Получаем фотки с сервера
  window.backend.load(function (elements) {

    var lengthArr = elements.length;
    var clone = [];

    for (var i = 0; i < lengthArr; i++) {
      clone[i] = shuffle(elements)[0];
      createPictureElement(clone[i]);
    }

    picturesListElement.appendChild(pictureFragment);
    var smallImg = picturesListElement.querySelectorAll('a');

    // Показ изображения в полноэкранном режиме
    for (var j = 0; j < lengthArr; j++) {
      (function (element, photo) {
        element.addEventListener('click', function (evt) {
          if (evt.target.tagName === 'IMG') {
            evt.preventDefault();
            window.switchPopupVisibility.openPopup(galleryOverlay);
            createOverlayElement(photo);
          }
        });
        element.addEventListener('keydown', function (evt) {
          window.switchPopupVisibility.isEnterEvent(evt, window.switchPopupVisibility.openPopup(galleryOverlay));
          createOverlayElement(photo);
        });
      })(smallImg[j], clone[j]);
    }
  }, window.errorHandler);

  galleryOverlayClose.addEventListener('click', function () {
    window.switchPopupVisibility.closePopup(galleryOverlay);
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    window.switchPopupVisibility.isEnterEvent(evt, window.switchPopupVisibility.closePopup(galleryOverlay));
  });

})();
