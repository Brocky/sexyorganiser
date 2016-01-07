/**
 * Template controller
 * @module Controller/Template
 */

module.exports = ['$scope', '$injector', 'session', function($scope, $injector, session) {

  var startDate = session.getValue('startDate') ? new Date(session.getValue('startDate')) : new Date();
  var endDate   = session.getValue('endDate') ? new Date(session.getValue('endDate')) : new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + 1
  );

  $scope.pages               = [];
  $scope.pageSize            = session.getValue('pageSize', 'a5');
  $scope.style               = session.getValue('style', 'disney');
  $scope.startDate           = startDate;
  $scope.endDate             = endDate;
  $scope.generationProgress  = 0;
  $scope.useCropMarks        = session.getValue('useCropMarks', 'true') === 'true';
  $scope.usePunchMarks       = session.getValue('usePunchMarks', 'true') === 'true';
  $scope.template            = session.getValue('template', 'oneDayOnOnePage');

  //watch all config values and save to session on chnage
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
  $scope.$watch('usePunchMarks', function(newValue) {
      session.setValue('usePunchMarks', newValue);
  });
  $scope.$watch('template', function(newValue) {
    session.setValue('template', newValue);
  });


  $scope.addPage = function (index, page, leporello) {
    if ($scope.pageSize == 'personal') {
      var pageIndex  = Math.floor(index / 6) * 2;
      var even = index % 2 == 1;

      if ($scope.pages.length < pageIndex + 1) {
        $scope.pages[pageIndex] = {subPages: [], even: false};
        $scope.pages[pageIndex + 1] = {subPages: [], even: true};
      }

      if (even) {
        $scope.pages[pageIndex + 1]['subPages'].push(page);
      } else {
        $scope.pages[pageIndex]['subPages'].push(page);
      }
    } else {
      $scope.pages.push({subPages: [page], even: index % 2 == 1, leporello: leporello});
    }
  };


  $scope.generateTemplate = function() {
    $scope.pages = [];
    var template = $injector.get($scope.template);
    template.generatePages($scope.addPage, $scope.startDate, $scope.endDate);
  };

  $scope.generateTemplate();
}];
