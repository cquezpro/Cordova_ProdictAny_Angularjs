var disableContainerDirective = angular.module('disableContainerDirective', []);

disableContainerDirective.directive('disableContainer', ['$document', '$rootScope', function($document,$rootScope){
        
  return {
    restrict: 'AE',
    replace: true,    
    link: function(scope, elem, attrs) {
      
      var e = $(elem), parent= $(elem).parent(); 
      e.css({ height: parent.height() + 10, 
               width:parent.width()});
           
      elem.on('click', function(e){
//          e.preventDefalt();
      });      
    }
  };
}]);

