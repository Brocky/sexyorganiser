/**
 * oneYearOnOnePage service
 * @module Service/oneDayOnOnePage
 */

module.exports = ['calendar', function(calendar) {

  var service = {};

  service.generatePages = function(addPageCallBack, ctrl) {

    var countOfYears = ctrl.startDate.getFullYear() - ctrl.startDate.getFullYear();

    if (countOfYears <= 0) {
      countOfYears = 1;
    }

    for (var i = 0; i < countOfYears; i++) {
      addPageCallBack(i, {date: new Date(ctrl.startDate.getFullYear() + i, 0, 1)});
    }
  };

  return service;
}];