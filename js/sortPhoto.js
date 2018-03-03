'use strict';

(function () {

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

  var filtersPhoto = document.querySelector('.filters');
  var filtersRadio = filtersPhoto.querySelectorAll('[name = "filter"]');

  [].forEach.call(filtersRadio, function (radio) {
    radio.addEventListener('click', function () {
      window.debounce(window.updatePhoto);
    });
  });

  window.sortPhoto = function (arr) {
    window.updatePhoto = function () {
      var photos = arr.slice();

      var checkSelectedRadio = [].filter.call(filtersRadio, function (radio) {
        return radio.checked;
      });

      var depictPage = function (updateArr) {
        picturesListElement.appendChild(pictureFragment);
        window.showOverlay(updateArr, updateArr.length);
      };

      if (checkSelectedRadio[0].value === 'random') {
        var clonePhotos = [];
        var length = photos.length;

        for (var i = 0; i < length; i++) {
          clonePhotos[i] = shuffle(photos)[0];
          createPictureElement(clonePhotos[i]);
        }
        depictPage(clonePhotos);

      } else {
        if (checkSelectedRadio[0].value === 'popular') {
          photos.sort(function (left, right) {
            return right.likes - left.likes;
          });
        } else if (checkSelectedRadio[0].value === 'discussed') {
          photos.sort(function (left, right) {
            return right.comments.length - left.comments.length;
          });
        }
        photos.forEach(function (element) {
          createPictureElement(element);
        });
        depictPage(photos);
      }
    };
    window.updatePhoto();
    filtersPhoto.classList.remove('filters-inactive');
  };

})();
