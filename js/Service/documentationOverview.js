/**
 * oneYearOnOnePage service
 * @module Service/oneDayOnOnePage
 */

module.exports = ['calendar', function(calendar) {

  var service = {};

  service.generatePages = function(addPageCallBack, ctrl) {
    var tables = [];
    var months = [];
    var currentDate = new Date(ctrl.startDate.getTime());

    while (
      currentDate.getFullYear() <= ctrl.startDate.getFullYear()
       && currentDate.getMonth() <= ctrl.startDate.getMonth()
     ) {
      months.push(calendar.getMonth(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);

      if (months.length == 6) {
        tables.push({months: months});
        months = [];
      }
    }
    if (months.lenght) {
      tables.push({months: months});
    }

    addPageCallBack(0, {tables: tables, year: ctrl.startDate.getFullYear()}, true);
    addPageCallBack(1, {year: ctrl.startDate.getFullYear()}, true);
  };

  return service;
}];
