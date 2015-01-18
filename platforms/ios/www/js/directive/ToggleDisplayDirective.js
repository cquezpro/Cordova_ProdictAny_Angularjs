var ToggleDisplayDirective = angular.module('ToggleDisplayDirective', []);

ToggleDisplayDirective.directive('toggleDisplay', ['$document', '$rootScope', function($document,$rootScope){
        
  return {
    
    restrict: 'AE',
    link: function(scope, elem, attrs) {        
       
      elem.bind('click', function() {                   
         $(this).hide();
         
         $(this).parent().find('#'+attrs.toggleDisplay).show();
      });      
    }
  };
}]);
