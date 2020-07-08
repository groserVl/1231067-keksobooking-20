'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');

  var filterHousingType = function (arrayAds) {
    var filterData = arrayAds;
    if (housingType.value !== 'any') {
      filterData = arrayAds.filter(function (item) {
        return item.offer.type === housingType.value;
      });
    }
    window.form.removePins();
    window.card.closePopupCard();
    window.pin.render(filterData);
  };

  window.filter = {
    filterHousingType: filterHousingType
  };

})();
