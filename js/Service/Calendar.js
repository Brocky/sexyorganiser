/**
 * Calendar service
 * @module Service/Calendar
 */

module.exports = ['$filter','holidays', function($filter, holidays) {

    var calendarService = {
        years: {},
        daysOfWeek: [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday'
        ]
    };

    calendarService.getWeekOfYear = function (date) {
        var week  = $filter('date')(date, 'w');
        /* start week on monday */
        if (date.getDay() == 0) {
            week--;
        }
        if (week == -1) {
            week = 52;
        }
        return week;
    };

    calendarService.getDayOfWeek = function(date) {
        return date.getDay() == 0 ? 6 : date.getDay() - 1;
    };

    calendarService.getDay = function (date) {
        var year  = date.getFullYear();
        var month = date.getMonth();
        var week  = calendarService.getWeekOfYear(date);
        var day   = calendarService.getDayOfWeek(date);

        if (!(year in this.years)) {
            calendarService.years[year] = {};
        }

        if (!(month in this.years[year])) {
            calendarService.years[year][month] = {
                name: $filter('date')(date, 'MMMM'),
                weeks: {}
            };
        }

        if (!(week in this.years[year][month]['weeks'])) {
            calendarService.years[year][month]['weeks'][week] = {
                number: week == 0 ? 53 : week,
                days: {0:{},1:{},2:{},3:{},4:{},5:{},6:{}}
            };
        }

        if (angular.equals({}, this.years[year][month]['weeks'][week]['days'][day])) {
            calendarService.years[year][month]['weeks'][week]['days'][day] = {
                date: new Date(date.getTime()),
                holidayName: holidays.getHolidayName(date),
                holiday: !!holidays.getHolidayName(date),
                dayOfWeek: this.daysOfWeek[date.getDay()],
                weekOfYear: week == 0 ? 53 : week
            };
        }

        return calendarService.years[year][month]['weeks'][week]['days'][day];
    };

    calendarService.getMonth = function (date) {
        var year  = date.getFullYear();
        var month = date.getMonth();

        var currentDate = new Date(year, month, 1);
        var endDate     = new Date(year, month + 1, 0);

        while (currentDate <= endDate) {
            calendarService.getDay(currentDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return calendarService.years[year][month];
    };

    return calendarService;
}];
