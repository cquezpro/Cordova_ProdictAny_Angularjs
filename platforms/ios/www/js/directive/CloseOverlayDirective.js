var CloseOverlayDirective = angular.module('CloseOverlayDirective', []);

CloseOverlayDirective.directive('closeOverlay', ['$document', '$rootScope', function($document,$rootScope){
        
  return {
      
    restrict: 'AE',
    replace: true,    
    link: function(scope, elem, attrs) {
     
      elem.on('click', function() {
                var p = $(this).attr('parent');
                if(p){
                    
                    if($(this).find('.close_wrapper').is(':hidden')){
                        $('#'+p).find('.close_wrapper').hide();
                        $('#'+p).find('.selected-image').hide();
                        $(this).find('.close_wrapper').show();
                        $(this).find('.selected-image').show();
                    }
                    else{
                         $('#'+p).find('.close_wrapper').hide();
                        $('#'+p).find('.selected-image').hide();                        
                    }
                }
      });      
    }
  };
}]);

