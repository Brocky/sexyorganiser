/**
 * Created by hbrockmann on 29.12.2015.
 */

module.exports = function(){
    return {
        restrict: 'E',
        require: '^ngModel',
        scope: {
            ngModel: '@'
        },
        templateUrl: "templates/threeMonth.html",
        controller: ['$scope', '$filter', 'calendar', function ($scope, $filter, calendar) {
            $scope.getMonths = function(date) {
                var prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
                var nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

                var currentMonthKey = $filter('date')(date, 'yyyyMM');

                var months = {};
                months[$filter('date')(prevMonth, 'yyyyMM')] = calendar.getMonth(prevMonth);
                months[currentMonthKey]                      = angular.copy(calendar.getMonth(date));
                months[$filter('date')(nextMonth, 'yyyyMM')] = calendar.getMonth(nextMonth);

                months[currentMonthKey]
                  ['weeks']
                  [calendar.getWeekOfYear(date)]
                  ['days']
                  [calendar.getDayOfWeek(date)]
                  ['active'] = true;
                months[currentMonthKey]
                  ['weeks']
                  [calendar.getWeekOfYear(date)]
                  ['active'] = true;
                //return angular.copy(months);
                return months;
            }
        }],
        link: function(scope, element, attributes, ngModelCtrl) {
            ngModelCtrl.$render = function(){
                scope.months = scope.getMonths(ngModelCtrl.$modelValue);
            };
        }
    };
};
