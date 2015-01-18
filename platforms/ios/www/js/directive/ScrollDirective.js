var scrollDirective = angular.module('scrollDirective', []);

scrollDirective.directive('predictScroll', ['$document', '$rootScope', '$timeout', function($document,$rootScope, $timeout){

  return {
    restrict: 'AE',    
    link: function(scope, elem, attrs) {            
            var opt = {suppressScrollX :true }
             $container = $(elem);
            $container.perfectScrollbar(opt);            
            $container.scroll(function(e) {

              if($container.scrollTop() === 0) {
                console.log('it reaches the top!');
              }
              else if ($container.scrollTop() === $container.prop('scrollHeight') - $container.height()) {
                console.log('it reaches the end!');
              } 
            });
                            
                scope.$watch(elem.attr('rel'), function(v){
                    $container.perfectScrollbar('update');
                });
    }
  };
}]);

