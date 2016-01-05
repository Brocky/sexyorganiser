/**
 * oneDayOnOnePage service
 * @module Service/oneDayOnOnePage
 */

module.exports = ['calendar', function(calendar) {

  var service = {};

  service.generatePages = function(addPageCallBack, startDate, endDate){
    var currentDate = new Date(startDate.getTime());
    var numOfDays   = 1 + Math.round((endDate.getTime() - currentDate.getTime())/(1000*60*60*24));
    var hours = [];
    for (var i = 7; i <= 22; i++) {
      hours.push(i);
    }

    var i = 0;
    while (currentDate <= endDate) {
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
