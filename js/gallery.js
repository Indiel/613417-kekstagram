'use strict';

(function () {
  // var COMMENTS = ['Всё отлично!',
  //   'В целом всё неплохо. Но не всё.',
  //   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  //   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  //   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  //   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  // var doubleComments = [];
  // var urls = new Array(25);
  // var urlsLength = urls.length;
  // window.photos = [];

  // // функция заполнения массива
  // var arrFilling = function (arr) {
  //   for (var i = 0; i < arr.length; i++) {
  //     arr[i] = i + 1;
  //   }
  // };

  // // функция для рандомного выведения значений массива без повторений
  // var shuffle = function (arr) {
  //   var randomValue = Math.floor(Math.random() * arr.length);
  //   return arr.splice(randomValue, 1).toString();
  // };

  // var getRandomNumber = function (min, max) {
  //   return Math.floor(Math.random() * (max - min) + min);
  // };

  // // заполнение свойств фотографий
  // var Photos = function (arrUrls, arrComments) {
  //   this.url = 'photos/' + shuffle(arrUrls) + '.jpg';
  //   this.likes = getRandomNumber(15, 200);
  //   var arrComm = [];
  //   var numberOfComments = getRandomNumber(1, 50);
  //   var numberOfSentence = getRandomNumber(1, 3);
  //   for (var i = 0; i < numberOfComments; i++) {
  //     arrComm.push(shuffle(arrComments));
  //     for (var j = 0; j < numberOfSentence; j++) {
  //       arrComm[i] += shuffle(arrComments);
  //     }
  //   }
  //   this.comments = arrComm;
  // };

  // // заполнение контейнера шаблонными фрагментами (фотографиями)
  // var createPictureElement = function (photo) {
  //   var photoElement = pictureTemplate.cloneNode(true);

  //   photoElement.querySelector('img').setAttribute('src', photo.url);
  //   photoElement.querySelector('.picture-likes').textContent = photo.likes;
  //   photoElement.querySelector('.picture-comments').textContent = photo.comments.length;

  //   pictureFragment.appendChild(photoElement);
  // };

  // var pictureTemplate = document.querySelector('#picture-template').content;
  // var picturesListElement = document.querySelector('.pictures');
  // var pictureFragment = document.createDocumentFragment();

  // arrFilling(urls);

  // // отрисовываем все фотографии на странице
  // for (var k = 0; k < urlsLength; k++) {
  //   doubleComments = COMMENTS.slice();
  //   window.photos[k] = new Photos(urls, doubleComments);
  //   createPictureElement(window.photos[k]);
  // }

  // picturesListElement.appendChild(pictureFragment);

  // window.backend.load(function (photos) {
  //   // var lengthArr = photos.length;
  //   for (var i = 0; i < photos.length; i++) {
  //     // shuffle(photos);
  //     var photoElement = pictureTemplate.cloneNode(true);

  //     photoElement.querySelector('img').setAttribute('src', photos[i].url);
  //     photoElement.querySelector('.picture-likes').textContent = photos[i].likes;
  //     photoElement.querySelector('.picture-comments').textContent = photos[i].comments.length;

  //     pictureFragment.appendChild(photoElement);
  //   }

  //   picturesListElement.appendChild(pictureFragment);
  // });

})();
