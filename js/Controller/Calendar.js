/**
 * Calendar controller
 * @module Controller/Calendar
 */

module.exports = ['$scope', 'calendar', 'session', function($scope, calendar, session) {

    var startDate = session.getValue('startDate') ? new Date(session.getValue('startDate')) : new Date();
    var endDate   = session.getValue('endDate') ? new Date(session.getValue('endDate')) : new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 1
    );

    $scope.days = [];
    $scope.pages = [];
    $scope.pageSize = session.getValue('pageSize') | 'a5';
    $scope.style = session.getValue('style') | 'oneDayOnOnePage';
    $scope.startDate = startDate;
    $scope.endDate   = endDate;
    $scope.generationProgress  = 0;
    $scope.useCropMarks = session.getValue('useCropMarks') | true;
    $scope.usePunshMarks = session.getValue('usePunshMarks') | true;

    console.log($scope.startDate);

    $scope.$watch('pageSize', function(newValue) {
        session.setValue('pageSize', newValue);
    });
    $scope.$watch('style', function(newValue) {
        session.setValue('style', newValue);
    });
    $scope.$watch('startDate', function(newValue) {
        session.setValue('startDate', newValue);
    });
    $scope.$watch('endDate', function(newValue) {
        session.setValue('endDate', newValue);
    });
    $scope.$watch('useCropMarks', function(newValue) {
        session.setValue('useCropMarks', newValue);
    });
    $scope.$watch('usePunshMarks', function(newValue) {
        session.setValue('usePunshMarks', newValue);
    });

    $scope.generateCalendar = function() {
        $scope.days = [];
        $scope.pages = [];

        var currentDate = new Date($scope.startDate.getTime());
        var numOfDays   = 1 + Math.round(($scope.endDate.getTime() - currentDate.getTime())/(1000*60*60*24));
        var hours = [];
        for (var i = 7; i <= 22; i++) {
            hours.push(i);
        }

        var i = 0;
        while (currentDate <= $scope.endDate) {
            var day = calendar.getDay(currentDate);
            if (!('hours' in day)) {
                day.hours = hours;
            }
            $scope.days.push(day);
            if ($scope.pageSize == 'personal') {
              var pageIndex  = Math.floor(i / 6) * 2;
              var even = i % 2 == 1;

              if ($scope.pages.length < pageIndex + 1) {
                $scope.pages[pageIndex] = {subPages: [], even: false};
                $scope.pages[pageIndex + 1] = {subPages: [], even: true};
              }

              if (even) {
                $scope.pages[pageIndex + 1]['subPages'].push({days: [day]});
              } else {
                $scope.pages[pageIndex]['subPages'].push({days: [day]});
              }
            } else {
              $scope.pages.push({subPages: [{days: [day]}], even: i % 2 == 1});
            }
            currentDate.setDate(currentDate.getDate() + 1);
            i++;
            $scope.generationProgress = (i / numOfDays) * 100;
        }
    };

    $scope.generateCalendar();
}];
