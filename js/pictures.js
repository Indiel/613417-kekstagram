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
  var urlsLength = urls.length;
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
  for (var k = 0; k < urlsLength; k++) {
    doubleComments = COMMENTS.slice();
    photos[k] = new Photos(urls, doubleComments);
    createPictureElement(photos[k]);
  }

  picturesListElement.appendChild(pictureFragment);

  // Показ изображения в полноэкранном режиме
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var smallImg = picturesListElement.querySelectorAll('a');

  for (var j = 0; j < smallImg.length; j++) {
    (function (element, photo) {
      element.addEventListener('click', function (evt) {
        if (evt.target.tagName === 'IMG') {
          evt.preventDefault();
          openPopup(galleryOverlay);
          createOverlayElement(photo);
        }
      });
    })(smallImg[j], photos[j]);
  }

  galleryOverlayClose.addEventListener('click', function () {
    closePopup(galleryOverlay);
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup(galleryOverlay);
    }
  });

  // Показ формы редактирования
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var overlayClose = document.querySelector('#upload-cancel');

  var onPopupEscPress = function (evt, element) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target.tagName !== 'TEXTAREA') {
        closePopup(element);
      }
    }
  };

  var openPopup = function (element) {
    element.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      onPopupEscPress(evt, element);
    });
  };

  var closePopup = function (element) {
    element.classList.add('hidden');
    document.removeEventListener('keydown', function (evt) {
      onPopupEscPress(evt, element);
    });
    uploadFile.value = '';
    imagePreview.classList.toggle(imagePreview.classList[1], false);
    radios[0].checked = true;
  };

  uploadFile.addEventListener('change', function () {
    openPopup(uploadOverlay);

    transformValues = copyTransformValues.slice();
    imagePreview.style.transform = 'scale(' + transformValues[0] + ')';
    resizeControlsValue.value = '100%';
    resizeButtonDec.classList.remove('upload-resize-control-inactive');
    resizeButtonInc.classList.add('upload-resize-control-inactive');

    effectLevel.classList.add('hidden');
    imagePreview.style.filter = '';
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

  for (var i = 0; i < radios.length; i++) {
    (function (radio, index) {
      radio.addEventListener('click', function () {
        var classEffect = radio.id.replace('upload-', '');
        if (index === 0) {
          effectLevel.classList.add('hidden');
        } else {
          effectLevel.classList.remove('hidden');
        }
        imagePreview.classList.toggle(imagePreview.classList[1], false);
        imagePreview.classList.toggle(classEffect);

        imagePreview.style.filter = '';
        effectPin.style.left = '100%';
        effectLevelVal.style.width = '100%';
      });
    })(radios[i], i);
  }

  // Слайдер
  var effectLevel = document.querySelector('.upload-effect-level');
  var effectLevelLine = effectLevel.querySelector('.upload-effect-level-line');
  var effectLevelVal = effectLevel.querySelector('.upload-effect-level-val');
  var effectPin = effectLevel.querySelector('.upload-effect-level-pin');

  var maxLevelFilter = {
    grayscale: 1,
    sepia: 1,
    invert: 1,
    blur: 5,
    brightness: 3
  };

  effectLevelLine.addEventListener('mouseup', function (evt) {
    var clientX = evt.clientX;
    var levelLineX = effectLevelLine.getBoundingClientRect().left;
    var overallWidth = effectLevelLine.getBoundingClientRect().width;
    if (clientX >= levelLineX && clientX <= levelLineX + overallWidth) {
      effectPin.style.left = ((100 * (clientX - levelLineX)) / overallWidth) + '%';
      effectLevelVal.style.width = ((100 * (clientX - levelLineX)) / overallWidth) + '%';
    }

    var styleImg = getComputedStyle(imagePreview);
    var currentLevel = styleImg.filter;
    var filterName = currentLevel.slice(0, currentLevel.lastIndexOf('('));
    var valueStrFilter = currentLevel.slice(currentLevel.lastIndexOf('(') + 1, currentLevel.length - 1);
    var valueNumFilter = parseFloat(valueStrFilter, 10);
    var userValue = (maxLevelFilter[filterName] * (clientX - levelLineX) / overallWidth).toString();
    var userLevel = currentLevel.replace(valueNumFilter.toString(), userValue);
    imagePreview.style.filter = userLevel;
  });

  // Редактирование размера изображения
  var resizeControlsValue = document.querySelector('.upload-resize-controls-value');
  var resizeButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var resizeButtonInc = document.querySelector('.upload-resize-controls-button-inc');
  var resizeControls = document.querySelector('.upload-resize-controls');

  var transformValues = [1, 0.75, 0.5, 0.25];
  var copyTransformValues = transformValues.slice();

  var changeScale = function (arr, target) {
    resizeButtonInc.classList.remove('upload-resize-control-inactive');
    resizeButtonDec.classList.remove('upload-resize-control-inactive');
    if (target.classList.contains('upload-resize-controls-button-dec')) {
      if (transformValues[0] !== 0.25) {
        transformIndex = arr.shift();
        arr.push(transformIndex);
      }
    } else if (target.classList.contains('upload-resize-controls-button-inc')) {
      if (transformValues[0] !== 1) {
        var transformIndex = arr.pop();
        arr.unshift(transformIndex);
      }
    }
    imagePreview.style.transform = 'scale(' + transformValues[0] + ')';
    resizeControlsValue.value = transformValues[0] * 100 + '%';
    if (transformValues[0] === 1) {
      resizeButtonInc.classList.add('upload-resize-control-inactive');
    } else if (transformValues[0] === 0.25) {
      resizeButtonDec.classList.add('upload-resize-control-inactive');
    }
  };

  resizeControls.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== resizeControls) {
      if (target.classList.contains('upload-resize-controls-button')) {
        changeScale(transformValues, target);
      } else if (target.classList.contains('upload-resize-controls-value')) {
        transformValues = copyTransformValues.slice();
        imagePreview.style.transform = 'scale(' + transformValues[0] + ')';
        resizeControlsValue.value = '100%';
        resizeButtonDec.classList.remove('upload-resize-control-inactive');
        resizeButtonInc.classList.add('upload-resize-control-inactive');
      }
      target = target.parentNode;
    }
  });
})();
