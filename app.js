;(function(window){
  angular.module('peopleApp',['ngRoute'])

  .config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/people.html',
        controller: 'PeopleListCtrl'
      }).
      when('/:id', {
        templateUrl: 'views/person-detail.html',
        controller: 'PersonDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  })

  .factory('people', function($http){
    return{
      list: function(callback){
        $http({
          method: 'GET',
          url: 'json/people.json',
          cache: true
        }).success(callback)
      },
    }
  })

  .controller('PeopleListCtrl', function ($scope,people){
    people.list(function(people){
      $scope.peoples = people;
    })
  })

  .controller('PersonDetailCtrl', function($scope,$routeParams,people){
    $scope.id = $routeParams.id;
    people.list(function(people){
      $scope.person = people.filter(function(entry){
        if(entry.index == $scope.id){
          return entry;
        }
      })[0];
    })
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
