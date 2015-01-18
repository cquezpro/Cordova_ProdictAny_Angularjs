var FavCatDirective = angular.module('FavCatDirective', ['categoryServices']);

FavCatDirective.directive('favCat', ['$timeout', '$rootScope', 'categoryService', function($timeout,$rootScope,categoryService){        
  return {
    restrict: 'AE',
    replace: true,    
    template : '<img src="{{img_heart}}" height="25" width="25" class="{{pull_align}}" rel="0" ng-click="updateparent()" state="isfav"   />',
    scope: {
           isfav : '@isfav',
           updateparent: '&',
           catid : '@catid',
           align : '@align'
        },
    link: function(scope, elem, attrs) {
        
      
        attrs.$observe('isfav',function(n){
            
            if(n == 1){
                elem.attr('rel', 1);    
                scope.img_heart = "img/red-heart.png"; 
            }
            else{
                scope.img_heart = "img/white-heart.png";
                elem.attr('rel', 0);  
            }
        });
        
        if(scope.isfav == 1){            
            scope.img_heart = "img/red-heart.png";
            elem.attr('rel', 1); 
        }
        else{
            scope.img_heart = "img/white-heart.png";
            elem.attr('rel', 0); 
        }
        
        if(scope.align && scope.align){
            scope.pull_align = scope.align;
        }
        else
        {
            scope.pull_align = "pull-right";
        }
            
      elem.bind('click', function() {                                 
            $timeout(function(){
                var v = elem.attr('rel');                  
                var params = {catId: scope.catid, user_id: _userObj.id};
                
                if(v == 0){                    
                    categoryService.saveAsFav(params).success(function(r, status)
                    {
                        scope.img_heart = "img/red-heart.png"; 
                        v = 1;                 
                        elem.attr('rel', v);
                        var p = localStorage.getItem("p_user_fav_cat");
                        if(p){
                                p = JSON.parse(p);                                
                                if(jQuery.inArray(scope.catid, p) == -1 ){
                                   //push fav cat to P
                                   p.push(scope.catid);
                                }
                                localStorage.setItem("p_user_fav_cat", JSON.stringify(p));
                            }
                
                    }).error(function(data, status) {});
                }
                else
                {
                    categoryService.deleteFromFav(params).success(function(r, status)
                    {
                        
                        scope.img_heart = "img/white-heart.png";                        
                        v = 0;                        
                        elem.attr('rel', v);   
                        var p = localStorage.getItem("p_user_fav_cat");
                        if(p){
                                p = JSON.parse(p);                                
                                if(jQuery.inArray(scope.catid, p) != -1 ){
                                    
                                   //pop fav cat to P
                                   p = jQuery.grep(p, function(value) {
                                        return value != scope.catid;
                                      });
                                }
                                localStorage.setItem("p_user_fav_cat", JSON.stringify(p));                                
                            }
                            
                    }).error(function(data, status) {});                    
                }
            });
      });      
      
    },
    
  };
}]);

