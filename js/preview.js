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

  var picturesListElement = document.querySelector('.pictures');

  // Показ изображения в полноэкранном режиме
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var smallImg = picturesListElement.querySelectorAll('a');

  for (var j = 0; j < window.photos.length; j++) {
    (function (photo) {
      photo.addEventListener('click', function (evt) {
        if (evt.target.tagName === 'IMG') {
          evt.preventDefault();
          window.switchPopupVisibility.openPopup(galleryOverlay);
          createOverlayElement(photo);
        }
      });
      photo.addEventListener('keydown', function (evt) {
        window.switchPopupVisibility.isEnterEvent(evt, window.switchPopupVisibility.openPopup(galleryOverlay));
        createOverlayElement(photo);
      });
    })(window.photos[j]);
  }

  galleryOverlayClose.addEventListener('click', function () {
    window.switchPopupVisibility.closePopup(galleryOverlay);
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    window.switchPopupVisibility.isEnterEvent(evt, window.switchPopupVisibility.closePopup(galleryOverlay));
  });

})();
