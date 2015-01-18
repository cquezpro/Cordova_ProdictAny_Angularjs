var progressPointsDirective = angular.module('progressPointsDirective', []);

progressPointsDirective.directive('progressPoints', [function(){
  return {
    restrict: 'AE',
    replace: true,
    transclude: true,
    templateUrl: 'js/directive/template/progressPoints.html',
    scope : {
        total_points : '@totalPoints',
        added_points : '@addedPoints'
    },
    
    /*link starts*/
    link: function(scope, elem, attrs) {
     showMessage(scope.total_points);
    },
    /*link end*/
    
    
    /*controller starts*/
    controller : function($scope) {
        
        }
    /*controller ends */
    };
}]);