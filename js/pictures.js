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

  // Почему фоток только 13, а не 25?
  var iii = 0;
  // отрисовываем все фотографии на странице
  for (var k = 0; k < urls.length; k++) {
    doubleComments = COMMENTS.slice();
    photos[k] = new Photos(urls, doubleComments);
    createPictureElement(photos[k]);
    iii++;

    // photos[i].addEventListener('click', function () {
    //   createOverlayElement(photos[i]);
    //   openPopup(galleryOverlay);
    // });

    // (function (element) {
    //   picturesListElement.addEventListener('click', function (evt) {
    //     if (evt.target.tagName === 'IMG') {
    //       evt.preventDefault();
    //       openPopup(galleryOverlay);
    //       createOverlayElement(element);
    //     }
    //   });
    // })(photos[i]);
  }

  picturesListElement.appendChild(pictureFragment);

  var smallImg = picturesListElement.querySelectorAll('a');

  var p = photos;
  var ii = iii;

  // picturesListElement.addEventListener('click', function (evt) {
  //   if (evt.target.tagName === 'IMG') {
  //     evt.preventDefault();
  //     openPopup(galleryOverlay);
  //     createOverlayElement(photos[0]);
  //   }
  // });

  // for (var j = 0; j < photos.length; j++) {
  //   (function (photo) {
  //     photo.addEventListener('click', function (evt) {
  //       if (evt.target.tagName === 'IMG') {
  //         evt.preventDefault();
  //         openPopup(galleryOverlay);
  //         createOverlayElement(photo);
  //       }
  //     });
  //   })(photos[j]);
  // }

  // Показ изображения в полноэкранном режиме
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

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

  // galleryOverlay.classList.remove('hidden');
  // createOverlayElement(photos[0]);


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
        if (index === 0) {
          effectLevel.classList.add('hidden');
        } else {
          effectLevel.classList.remove('hidden');
        }
        if (imagePreview.classList.length > 1) {
          imagePreview.classList.remove(imagePreview.classList[1]);
        }
        var classEffect = radio.id.replace('upload-', '');
        imagePreview.classList.add(classEffect);
        imagePreview.style.filter = '';
        effectPin.style.left = '100%';
        effectLevelVal.style.width = '100%';
      });
    })(radios[i], i);
  }

  var effectLevel = document.querySelector('.upload-effect-level');
  var effectLevelVal = document.querySelector('.upload-effect-level-val');
  var effectPin = document.querySelector('.upload-effect-level-pin');

  effectPin.addEventListener('mouseup', function () {
    var overallWidth = effectLevelVal.style.width;
    var styleImg = getComputedStyle(imagePreview);
    var maxLevel = styleImg.filter;
    var valueStrFilter = maxLevel.slice(maxLevel.lastIndexOf('(') + 1, maxLevel.length - 1);
    var valueNumFilter = parseInt(valueStrFilter, 10);
    var userValue = (valueNumFilter * 70 / parseInt(overallWidth, 10)).toString();
    var userLevel = maxLevel.replace(valueNumFilter.toString(), userValue);
    imagePreview.style.filter = userLevel;
  });

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

  // Валидация формы
  var inputHashtag = document.querySelector('.upload-form-hashtags');

  inputHashtag.addEventListener('input', function (evt) {
    var str = evt.target.value;
    var userHashtags = str.split(' ');
    // if (userHashtags.length > 5) {
    //   inputHashtag.style.border = '2px solid red';
    //   inputHashtag.setCustomValidity('Нельзя указать больше пяти хэш-тегов.');
    // } else {
    //   inputHashtag.style.border = '';
    //   for (i = 0; i < userHashtags.length; i++) {
    //     var strI = userHashtags[i];
    //     var strLength = userHashtags[i].length;
    //     var strCharAt = userHashtags[i].charAt(0);
    //     switch (true) {
    //       case (strCharAt !== '#'):
    //         inputHashtag.setCustomValidity('Хэш-тег должен начинаться с символа "#" и состоять из одного слова.');
    //         inputHashtag.style.border = '2px solid red';
    //         break;
    //       case (strLength < 2):
    //         inputHashtag.setCustomValidity('Хэш-тег не может состоять только из символа "#".');
    //         inputHashtag.style.border = '2px solid red';
    //         break;
    //       case (strLength > 20):
    //         inputHashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов.');
    //         inputHashtag.style.border = '2px solid red';
    //         break;
    //       default:
    //         for (var l = i + 1; l < userHashtags.length; l++) {
    //           var strJ = userHashtags[l];
    //           if (strI.toLowerCase() === strJ.toLowerCase()) {
    //             inputHashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
    //             inputHashtag.style.border = '2px solid red';
    //           } else {
    //             inputHashtag.setCustomValidity('');
    //             inputHashtag.style.border = '';
    //           }
    //         }
    //     }
    //   }
    // }


    if (userHashtags.length > 5) {
      inputHashtag.style.border = '2px solid red';
      inputHashtag.setCustomValidity('Нельзя указать больше пяти хэш-тегов.');
    } else {
      inputHashtag.style.border = '';
      for (var f = 0; f < userHashtags.length; f++) {
        if (userHashtags[f].charAt(0) !== '#') {
          inputHashtag.setCustomValidity('Хэш-тег должен начинаться с символа "#".');
        } else if (userHashtags[f].length < 2) {
          inputHashtag.setCustomValidity('Хэш-тег не может состоять только из символа "#".');
          inputHashtag.style.border = '2px solid red';
        } else if (userHashtags[f].length > 20) {
          inputHashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов.');
          inputHashtag.style.border = '2px solid red';
        } else {
          for (var l = f + 1; l < userHashtags.length; l++) {
            if (userHashtags[f].toLowerCase() === userHashtags[l].toLowerCase()) {
              inputHashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
            } else {
              inputHashtag.setCustomValidity('');
            }
          }
        }
      }
    }
  });
})();
