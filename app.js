;(function(window){
  angular.module('peopleApp',[])

  .controller('PeopleListCtrl', function ($scope, $http){
    $http.get('json/people.json').success(function(data) {
      $scope.peoples = data;
    });
  })

  .directive('tab', function(){
    return {
      restrict: 'E',
      transclude: true,
      template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
      require: '^tabset',
      scope: {
        heading: '@', //@ symbol tells the scope that the heading is a string
       },
      link: function(scope, elem, attr, tabsetCtrl) {
        scope.active = false;
        tabsetCtrl.addTab(scope);
      }
    }
  })
  .directive('tabset', function(){
    return {
      restrict: 'E',
      transclude: true,
      scope: { },
      templateUrl: 'tabset.html',
      bindToControllers: true,
      controllerAs: 'tabset',
      controller: function(){
        var self = this;
        self.tabs = [];
        self.addTab = function addTab(tab){
          self.tabs.push(tab);

          if(self.tabs.length === 1){
            tab.active = true;
          }
        }
        self.select = function(selectedTab){
          angular.forEach(self.tabs, function(tab) {
            if(tab.active && tab !== selectedTab){
              tab.active = false;
            }
          })

          selectedTab.active = true;
        }
      },
    }
  })
})(window);
