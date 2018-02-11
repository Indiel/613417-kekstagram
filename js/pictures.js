'use strict';

(function () {
  var COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var doubleComments = [];
  var urls = new Array(25);
  var photos = [];

  // функция заполнения массива
  var arrFilling = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i] = i + 1;
    }
  };

  // функция для рандомного выведения значений массива без повторений
  var shuffle = function (arr) {
    var randomValue = Math.floor(Math.random() * arr.length);
    return arr.splice(randomValue, 1).toString();
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // заполнение свойств фотографий
  var Photos = function (arrUrls, arrComments) {
    this.url = 'photos/' + shuffle(arrUrls) + '.jpg';
    this.likes = getRandomNumber(15, 200);
    var arrComm = [];
    var numberOfComments = getRandomNumber(1, 50);
    var numberOfSentence = getRandomNumber(1, 3);
    for (var i = 0; i < numberOfComments; i++) {
      arrComm.push(shuffle(arrComments));
      for (var j = 0; j < numberOfSentence; j++) {
        arrComm[i] += shuffle(arrComments);
      }
    }
    this.comments = arrComm;
  };

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

    // заполнение контейнера шаблонными фрагментами (фотографиями)
  var createPictureElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture-likes').textContent = photo.likes;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    pictureFragment.appendChild(photoElement);
  };

  // отрисовка окна открытой фотографии
  var galleryOverlay = document.querySelector('.gallery-overlay');

  var createOverlayElement = function (photo) {
    galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', photo.url);
    galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
    galleryOverlay.querySelector('.gallery-overlay-controls-comments').firstChild.textContent = photo.comments.length;
    galleryOverlay.querySelector('.gallery-overlay-controls-comments').lastChild.textContent = getDeclension(photo.comments.length);
  };

  var pictureTemplate = document.querySelector('#picture-template').content;
  var picturesListElement = document.querySelector('.pictures');
  var pictureFragment = document.createDocumentFragment();

  arrFilling(urls);

  // отрисовываем все фотографии на странице
  for (var i = 0; i < urls.length; i++) {
    doubleComments = COMMENTS.slice();
    photos[i] = new Photos(urls, doubleComments);
    createPictureElement(photos[i]);

    // (function (photos[i]) {
    //   pictureFragment.addEventListener('click', function () {
    //     createOverlayElement(photos[i]);
    //     openPopup(galleryOverlay);
    //   });
    // })();

    // photos[i].addEventListener('click', function () {
    //   createOverlayElement(photos[i]);
    //   openPopup(galleryOverlay);
    // });

    // (function (i) {
    //   picturesListElement.addEventListener('click', function (evt) {
    //     if (evt.target.tagName === 'IMG') {
    //       createOverlayElement(photos[i]);
    //       openPopup(galleryOverlay);
    //     }
    //   });
    // })();
  }

  picturesListElement.appendChild(pictureFragment);

  // Показ изображения в полноэкранном режиме

  // galleryOverlay.classList.remove('hidden');
  // createOverlayElement(photos[0]);


  // picturesListElement.addEventListener('click', function (evt) {
  //   if (evt.target.tagName === 'IMG') {
  //     openPopup(galleryOverlay);
  //     createOverlayElement(photos[0]);
  //   }
  // });

  // Показ формы редактирования
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var overlayClose = document.querySelector('#upload-cancel');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target.tagName !== 'TEXTAREA') {
        closePopup(uploadOverlay);
      }
    }
  };

  var openPopup = function (element) {
    element.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function (element) {
    element.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFile.value = '';
    if (imagePreview.classList.length > 1) {
      imagePreview.classList.remove(imagePreview.classList[1]);
    }
    radios[0].checked = true;
  };

  uploadFile.addEventListener('change', function () {
    openPopup(uploadOverlay);
    imagePreview.style.transform = 'scale(1)';
    resizeControls.value = '100%';
    resizeButtonInc.classList.add('hidden');
  });

  overlayClose.addEventListener('click', function () {
    closePopup(uploadOverlay);
  });

  overlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup(uploadOverlay);
    }
  });

  // Применение эффекта для изображения
  var imagePreview = document.querySelector('.effect-image-preview');
  var radios = document.querySelectorAll('[name = "effect"]');

  for (i = 0; i < radios.length; i++) {
    radios[i].addEventListener('click', function () {
      if (imagePreview.classList.length > 1) {
        imagePreview.classList.remove(imagePreview.classList[1]);
      }
      var classEffect = this.id.replace('upload-', '');
      imagePreview.classList.add(classEffect);
    });
  }

  // var effectPin = document.querySelector('.upload-effect-level-pin');

  // effectPin.addEventListener('mouseup', function () {
  //   // effectPin.
  // });

  // Редактирование размера изображения
  var resizeControls = document.querySelector('.upload-resize-controls-value');
  var resizeButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var resizeButtonInc = document.querySelector('.upload-resize-controls-button-inc');

  var getScale = function () {
    var scale = imagePreview.style.transform;
    scale = Number(scale.slice(6, scale.length - 1));

    return scale;
  };

  resizeButtonDec.addEventListener('click', function () {
    var scale = getScale();
    if (scale > 0.25) {
      scale -= 0.25;
      imagePreview.style.transform = 'scale(' + scale + ')';
      resizeControls.value = scale * 100 + '%';
      resizeButtonInc.classList.remove('hidden');
    } if (scale === 0.25) {
      resizeButtonDec.classList.add('hidden');
    }
  });

  resizeButtonInc.addEventListener('click', function () {
    var scale = getScale();
    if (scale < 1) {
      scale += 0.25;
      imagePreview.style.transform = 'scale(' + scale + ')';
      resizeControls.value = scale * 100 + '%';
      resizeButtonDec.classList.remove('hidden');
    } if (scale === 1) {
      resizeButtonInc.classList.add('hidden');
    }
  });
})();
