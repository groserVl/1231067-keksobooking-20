'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');
  var cardElement = cardTemplate.cloneNode(true);
  var popupClose = cardElement.querySelector('.popup__close');
  var mapCard = document.querySelector('.map__card');
  var translationTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  //  Функция создающая варианты слов с различными окончаниями
  var getNumberRooms = function (i) {
    var optionsEnds;
    if (i === 1) {
      optionsEnds = ' комната для';
    } else if (i > 1 && i <= 4) {
      optionsEnds = ' комнаты для';
    } else {
      optionsEnds = ' комнат для';
    }
    return optionsEnds;
  };

  // Функция создающая заново список удобств в арендованных объектах
  var getFeatures = function (content, features) {
    content.innerHTML = '';
    for (var i = 0; i < features.length; i++) {
      var itemFeatures = document.createElement('li');
      itemFeatures.classList.add('popup__feature', 'popup__feature--' + features[i]);

      content.appendChild(itemFeatures);
    }
  };

  // Функция создающая заново список фотографий
  var getPhotos = function (content, photos) {
    content.innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
      var itemPhotos = document.createElement('img');
      itemPhotos.classList.add('popup__photo');
      itemPhotos.src = photos[i];
      itemPhotos.width = 45;
      itemPhotos.height = 40;
      itemPhotos.alt = 'Фотография жилья';
      content.appendChild(itemPhotos);
    }
  };

  // Функция закрывающая карточку
  var closePopupCard = function () {
    mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    document.removeEventListener('keydown', onPopupCloseKeydown);
  };

  var onPopupCloseKeydown = function () {
    closePopupCard();
  };

  // Функция создающая картачку объявления
  var renderCards = function (arr) {

    var numberGuests = arr.offer.guests === 1 ? ' гостя' : ' гостей';

    filtersContainer.before(cardElement);

    cardElement.querySelector('.popup__title').textContent = arr.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = translationTypes[arr.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + getNumberRooms(arr.offer.rooms) + ' ' + arr.offer.guests + numberGuests;
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
    getFeatures(cardElement.querySelector('.popup__features'), arr.offer.features);
    cardElement.querySelector('.popup__description').textContent = arr.offer.description;
    getPhotos(cardElement.querySelector('.popup__photos'), arr.offer.photos);
    cardElement.querySelector('.popup__avatar').src = arr.author.avatar;
    popupClose.addEventListener('click', onPopupCloseKeydown);

    return cardElement;
  };

  window.card = {
    renderCards: renderCards,
    closePopupCard: closePopupCard,
    onPopupCloseKeydown: onPopupCloseKeydown
  };

})();


