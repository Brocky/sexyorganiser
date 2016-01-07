/**
 * oneYearOnOnePage service
 * @module Service/oneDayOnOnePage
 */

module.exports = ['calendar', function(calendar) {

  var service = {};

  service.generatePages = function(addPageCallBack, startDate, endDate) {
    var tables = [];
    var months = [];
    var currentDate = new Date(startDate.getTime());
    var index = 0;

    while (
      currentDate.getFullYear() <= endDate.getFullYear()
       && currentDate.getMonth() <= endDate.getMonth()
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

    addPageCallBack(0, {tables: tables, year: startDate.getFullYear()}, true);
    addPageCallBack(1, {year: startDate.getFullYear()}, true);
  };

  return service;
}];
