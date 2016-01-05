/**
 * Month overview directive
 * @module Directive/ThreeMonth
 */

module.exports = function(){
  return {
    restrict: 'E',
    require: '^ngModel',
    scope: {
        ngModel: '@'
    },
    templateUrl: "templates/monthOverview.html",
    controller: ['$scope', '$filter', 'calendar', function ($scope, $filter, calendar) {
      $scope.getMonths = function(date, prevCount, nextCount) {
        var months = {};

        if (!prevCount) {
          prevCount = 1;
        }
        if (!nextCount) {
          nextCount = 1;
        }

        while (prevCount > 0) {
          var monthdate = new Date(date.getFullYear(), date.getMonth() - prevCount, 1);
          months[$filter('date')(monthdate, 'yyyyMM')] = calendar.getMonth(monthdate);
          prevCount--;
        }

        var currentMonthKey = $filter('date')(date, 'yyyyMM');

        months[currentMonthKey] = angular.copy(calendar.getMonth(date));

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

        for (var i = 0; i <= nextCount; i++) {
          var monthdate = new Date(date.getFullYear(), date.getMonth() + i, 1);
          months[$filter('date')(monthdate, 'yyyyMM')] = calendar.getMonth(monthdate);
        }

        return months;
      }
    }],
    link: function(scope, element, attributes, ngModelCtrl) {
      ngModelCtrl.$render = function(){
        scope.months = scope.getMonths(ngModelCtrl.$modelValue, attributes.prevCount, attributes.nextCount);
      };
    }
  };
};
