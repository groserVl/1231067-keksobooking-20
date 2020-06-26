'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var renderPins = function (pin) {
    var pins = pinTemplate.cloneNode(true);
    pins.style.left = pin.location.x + 'px';
    pins.style.top = pin.location.y + 'px';
    pins.querySelector('img').src = pin.author.avatar;
    pins.querySelector('img').alt = pin.offer.title;

    pins.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.closePopupCard();
      window.card.renderCards(pin);
      document.addEventListener('keydown', window.card.onPopupCloseKeydown);
    });
    return pins;
  };

  var renderAds = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPins(arr[i]));
    }
    mapPins.appendChild(fragment);
    return mapPins;
  };

  window.pin = {
    renderAds: renderAds
  };

})();
