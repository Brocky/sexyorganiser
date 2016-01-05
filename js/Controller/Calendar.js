/**
 * Created by hbrockmann on 29.12.2015.
 */

module.exports = ['$scope', 'calendar', '$mdDialog', function($scope, calendar, $mdDialog) {

    function DialogController($scope, $mdDialog, calendarController) {
        $scope.progress = calendarController.generationProgress;

        calendarController.$watch('generationProgress', function() {
            $scope.progress = calendarController.generationProgress;
            if (calendarController.generationProgress == 100) {
                $mdDialog.hide();
            }
        });
    }

    $scope.days = [];
    $scope.pages = [];
    $scope.pageSize = 'a5';
    $scope.style = 'oneDayOnOnePage';
    $scope.startDate = new Date("2016-01-01");
    $scope.endDate   = new Date("2016-01-01");
    $scope.generationProgress  = 0;

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

        console.log($scope.pages);
    };

    $scope.startGeneration = function(ev) {
        $scope.generationProgress = 0;
        $mdDialog.show({
            templateUrl: 'templates/progressDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            controller: DialogController,
            locals: {
                calendarController: $scope
            }
        });
        setTimeout($scope.generateCalendar,5);
    };

    $scope.generateCalendar();
}];
