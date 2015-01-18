var SimulateClickDirective = angular.module('SimulateClickDirective', []);

SimulateClickDirective.directive('simulateClick', ['$document', '$rootScope', function($document,$rootScope){
        
  return {
    restrict: 'AE',
    link: function(scope, elem, attrs) {               
      elem.bind('click', function() {  
          console.log(attrs.simulateClick);
         jQuery('#'+attrs.simulateClick).click();
      });      
    }
  };
}]);
