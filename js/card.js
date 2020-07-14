'use strict';

(function () {
  var WIDTH_PHOTOS = 45;
  var HEIGHT_PHOTOS = 40;

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');
  var cardAds = cardTemplate.cloneNode(true);
  var popupClose = cardAds.querySelector('.popup__close');
  var mapCard = document.querySelector('.map__card');
  var roomsCount = {
    one: 1,
    four: 4
  };

  var translationTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  //  Функция создающая варианты слов с различными окончаниями
  var getNumberRooms = function (rooms) {
    var optionsEnds;
    if (rooms === roomsCount.one) {
      optionsEnds = ' комната для';
    } else if (roomsCount > roomsCount.one && roomsCount <= roomsCount.four) {
      optionsEnds = ' комнаты для';
    } else {
      optionsEnds = ' комнат для';
    }
    return optionsEnds;
  };

  // Функция создающая заново список удобств в арендованных объектах
  var getFeatures = function (content, features) {
    content.innerHTML = '';
    features.forEach(function (item) {
      var itemFeatures = document.createElement('li');
      itemFeatures.classList.add('popup__feature', 'popup__feature--' + item);
      content.appendChild(itemFeatures);
    });
  };

  // Функция создающая заново список фотографий
  var getPhotos = function (content, photos) {
    content.innerHTML = '';
    photos.forEach(function (item) {
      var itemPhotos = document.createElement('img');
      itemPhotos.classList.add('popup__photo');
      itemPhotos.src = item;
      itemPhotos.width = WIDTH_PHOTOS;
      itemPhotos.height = HEIGHT_PHOTOS;
      itemPhotos.alt = 'Фотография жилья';
      content.appendChild(itemPhotos);
    });
  };

  // Функция закрывающая карточку
  var closePopup = function () {
    mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    document.removeEventListener('keydown', onPopupCloseKeydown);
  };

  var onPopupCloseKeydown = function () {
    closePopup();
  };

  // Функция создающая карточку объявления
  var render = function (card) {

    var numberGuests = card.offer.guests === 1 ? ' гостя' : ' гостей';

    filtersContainer.before(cardAds);

    cardAds.querySelector('.popup__title').textContent = card.offer.title;
    cardAds.querySelector('.popup__text--address').textContent = card.offer.address;
    cardAds.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardAds.querySelector('.popup__type').textContent = translationTypes[card.offer.type];
    cardAds.querySelector('.popup__text--capacity').textContent = card.offer.rooms + getNumberRooms(card.offer.rooms) + ' ' + card.offer.guests + numberGuests;
    cardAds.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    getFeatures(cardAds.querySelector('.popup__features'), card.offer.features);
    cardAds.querySelector('.popup__description').textContent = card.offer.description;
    getPhotos(cardAds.querySelector('.popup__photos'), card.offer.photos);
    cardAds.querySelector('.popup__avatar').src = card.author.avatar;
    popupClose.addEventListener('click', onPopupCloseKeydown);

    return cardAds;
  };

  window.card = {
    render: render,
    closePopup: closePopup,
    onPopupCloseKeydown: onPopupCloseKeydown
  };

})();
