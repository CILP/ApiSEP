angular.module('CedulaApp', ['ngResource'])
  .constant(
    'API_BASE',
    'http://localhost:3000/cedula?q=:q'
  )
  .factory('CedulaService', ['$resource','API_BASE',
    function($resource, API_BASE){
      return $resource(
        API_BASE,
        {q: '@q'},
        {
          get: { method: 'GET', isArray: false }
        }
      );
    }
  ])
  .controller('MainController', ['$scope', 'CedulaService',
    function($scope, CedulaService){
      $scope.cedulas = [];
      $scope.byOption = { checked: 'license' };
      $scope.input = { text: '' };

      $scope.getCedulas = function(){
        CedulaService.get({q: $scope.input.text.trim()}).$promise
        .then(function(result){
          $scope.cedulas = result.response.docs || [];
        });
      }
      $scope.getCedulas();
    }
]);
