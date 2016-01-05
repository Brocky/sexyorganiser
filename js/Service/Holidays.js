/**
 * Created by hbrockmann on 29.12.2015.
 */

module.exports = ['$filter', function($filter) {

    var holidayService = {
        fixedHolidays: {
            '0101' : 'Neujahr',
            '0501' : 'Tag der Arbeit',
            '1003' : 'Tag der Deutschen Einheit',
            '1225' : '1. Weihnachtsfeiertag',
            '1226' : '2. Weihnachtsfeiertag'
        },
        flexibleHolidays: {}
    };

    holidayService.getEasterDate = function (year) {
        year = parseFloat(year);

        var K = year / 100.0;
        var M = 15.0 + (3.0*K + 3.0) / 4.0 - (8.0*K + 13.0) / 25.0;
        var S = 2.0 - (3.0*K + 3.0) / 4.0;
        var A = year % 19.0;
        var D = (19.0 * A + M) % 30.0;
        var R = (D + A / 11.0) / 29.0;
        var OG = 21.0 + D - R;
        var SZ = 7.0 - (year + year / 4.0 + S) % 7.0;
        var OE = 7.0 - (OG - SZ) % 7.0;

        easter = new Date();
        easter.setYear(year);
        easter.setMonth(2);
        easter.setDate(Math.floor(OG + OE));

        return easter;
    };

    holidayService.getFlexHolidays = function (year) {
        if (!(year in this.flexibleHolidays)) {
            var holidays = {};

            var date = this.getEasterDate(year);
            holidays[$filter('date')(date, 'MMdd')] = 'Ostersonntag';
            date.setDate(date.getDate() - 2);
            holidays[$filter('date')(date, 'MMdd')] = 'Karfeitag';
            date.setDate(date.getDate() + 3);
            holidays[$filter('date')(date, 'MMdd')] = 'Ostermontag';
            date.setDate(date.getDate() + 38);
            holidays[$filter('date')(date, 'MMdd')] = 'Christi Himmelfahrt';
            date.setDate(date.getDate() + 11);
            holidays[$filter('date')(date, 'MMdd')] = 'Pfingstmontag';

            this.flexibleHolidays[year] = holidays;
        }

        return this.flexibleHolidays[year];
    };

    holidayService.getHolidayName = function (date) {
        var holidayKey = $filter('date')(date, 'MMdd');
        if (holidayKey in this.fixedHolidays) {
            return this.fixedHolidays[holidayKey];
        }

        var flexibleHolidays = this.getFlexHolidays($filter('date')(date, 'yyyy'));

        if (holidayKey in flexibleHolidays) {
            return flexibleHolidays[holidayKey];
        }
    };

    return holidayService;
}];