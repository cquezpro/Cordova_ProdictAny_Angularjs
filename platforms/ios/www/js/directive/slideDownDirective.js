var slideDownDirective = angular.module('slideDownDirective', []);

slideDownDirective.directive('slideDown', ['$document', '$rootScope', function($document,$rootScope){        
  return {
    restrict: 'AE',
    replace: true,    
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {                        
         $(this).closest(".slide-down-container").find(".viewAll").slideToggle();
      });      
    }
  };
}]);

