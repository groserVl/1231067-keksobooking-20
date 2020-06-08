'use strict';

// Константы
var NUMBER_ADS = 8;
var HIGHEST_Y = 630;
var LOWEST_Y = 130;
var LOWEST_X = 0;
var PRICE_MAX = 10000;
var PRICE_MIN = 500;
var TYPE_BUILDING = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MAX = 5;
var ROOMS_MIN = 1;
var GUESTS_MAX = 5;
var GUESTS_MIN = 1;
var CHEKING_TIME = ['12: 00', '13: 00', '14: 00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var offsetWidth = document.querySelector('.map__pins').offsetWidth;
var mapPins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');

// Временное скрытие класса
document.querySelector('.map').classList.remove('map--faded');

// Функция округления и генерации случайных чисел в диапазоне
var getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * Math.floor(max - min + 1));
};

// Функция вычисления случайной длинны массива
var getRandomLength = function (arr) {
  var randomLength = arr.slice(getRandomNumber(0, arr.length - 1));
  return randomLength;
};

// Функция создания массива объявлений
var creatMockAds = function (lengthArray) {
  var mockAds = [];
  for (var i = 0; i < lengthArray; i++) {
    mockAds.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'title': 'Заголовок предложения',
            'address': getRandomNumber(LOWEST_X, offsetWidth) + ', ' + getRandomNumber(LOWEST_Y, HIGHEST_Y),
            'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
            'type': TYPE_BUILDING[getRandomNumber(0, 3)],
            'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
            'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
            'checkin': CHEKING_TIME[getRandomNumber(0, 2)],
            'features': getRandomLength(FEATURES),
            'description': 'Описание',
            'photos': getRandomLength(PHOTOS)
          },
          'location': {
            'x': getRandomNumber(LOWEST_X, offsetWidth),
            'y': getRandomNumber(LOWEST_Y, HIGHEST_Y)
          }
        }
    );
  }
  return mockAds;
};

// Создаём дом элементы и переносим данные из массива
var renderPins = function (pin) {
  var pins = template.cloneNode(true);
  pins.style.left = pin.location.x + 'px';
  pins.style.top = pin.location.y + 'px';
  pins.querySelector('img').src = pin.author.avatar;
  pins.querySelector('img').alt = pin.offer.title;
  return pins;
};

var renderAds = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPins(arr[i]));
  }
  mapPins.appendChild(fragment);
};

renderAds(creatMockAds(NUMBER_ADS));
