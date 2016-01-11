/**
 * oneDayOnOnePage service
 * @module Service/oneDayOnOnePage
 */

module.exports = ['calendar', function(calendar) {

  var service = {};

  service.generatePages = function(addPageCallBack,  ctrl) {

    var currentDate = new Date(ctrl.startDate.getTime());
    var hours = [];
    for (var i = 7; i <= 22; i++) {
      hours.push(i);
    }

    var i = 0;
    while (currentDate <= ctrl.endDate) {
      var day = calendar.getDay(currentDate);
      if (!('hours' in day)) {
        day.hours = hours;
      }

      addPageCallBack(i, {days: [day]});
      currentDate.setDate(currentDate.getDate() + 1);
      i++;
      //$scope.generationProgress = (i / numOfDays) * 100;
    }
  };

  return service;
}];
