'use strict';

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
  return arr;
};

// функция для рандомного выведения значений массива без повторений
var getUrlPhotos = function (arr) {
  var randomValue = Math.floor(Math.random() * arr.length);
  return arr.splice(randomValue, 1).toString();
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

arrFilling(urls);

function Photos(arrUrls, arrComments) {
  this.url = 'photos/' + getUrlPhotos(arrUrls) + '.jpg';
  this.likes = getRandomNumber(15, 200);
  var arrComm = [getUrlPhotos(arrComments), getUrlPhotos(arrComments)];
  this.comments = arrComm;
}

var pictureTemplate = document.querySelector('#picture-template').content;
var picturesListElement = document.querySelector('.pictures');
var pictureFragment = document.createDocumentFragment();

// заполнение контейнера шаблонными фрагментами
var createPictureElement = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('img').setAttribute('src', photo.url);
  photoElement.querySelector('.picture-likes').textContent = photo.likes;
  photoElement.querySelector('.picture-comments').textContent = photo.comments.length;

  return pictureFragment.appendChild(photoElement);
};

for (var i = 0; i < urls.length; i++) {
  doubleComments = COMMENTS.slice();
  photos[i] = new Photos(urls, doubleComments);
  createPictureElement(photos[i]);
}

picturesListElement.appendChild(pictureFragment);

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');

var createOverlayElement = function (photo) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', photo.url);
  galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;

  return galleryOverlay;
};

createOverlayElement(photos[0]);
