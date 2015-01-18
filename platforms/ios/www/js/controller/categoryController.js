'use strict';

/* category controller to show category level1, level2 and level3 data  */

var categoryController = angular.module('categoryController', ['categoryServices']);

categoryController.controller('categoryL1Ctrl', ['$scope','$location', 'categoryService','snapRemote', 'roundService',
  function($scope,$location, categoryService,snapRemote, roundService) {

    $scope.catListL1 = [];
    $scope.searchList = [];
    $scope.user_id = _userObj.id;
    
    $scope.categorySearch = function(){
       categoryService.getSearchResults({catname : $scope.txtCatname, user_id : _userObj.id}).success(function(r, status){
           if(r.status == 1){
               $scope.searchList = r.categories;
           }
           else{
               $scope.searchList = [];
           }
       }).error(function(data, status) {});
    }
    
    $scope.gotoRound = function(c)
    {
        if(c.total_playable_rounds  > 0)
        {            
            roundService.getNextRoundToPlay({catId : c.id, userId : _userObj.id}).
                success(function(r, status){
                    
                // redirect to appropriate category                
                if(r.status == 1)
                {
                    
                    if(r.data.current)
                    {
                        $location.path('/round/'+c.id+'/'+r.data.current);
                    }
                    else
                    {
                        showMessage("There are no rounds to play");
                    }
                }

            }).error(function(data, status) {});
        }
        else
        {
            showMessage("You don't have any round to play with this category");
        }
    }
    
    if($scope.config.getCatOnline==1)
    {
        $scope.getCatList1 = function()
        {
            var params = {catName: $scope.txtCatname}
    //        if(!$scope.catListL1.length)
            {
                //get all main level categories
                categoryService.getCategoriesL1($scope.txtCatname).success(function(r, status){
                    $scope.catListL1 = r.categories;
                    console.log($scope.catListL1);
                    $scope.image_server_url = imageServerUrl;
                    $scope.image_server_path = imageCatBig;
                }).error(function(data, status) {});
            }
        }
        $scope.getCatList1();
    }
    else
    {
        $scope.catListL1 = catL1List.categories;
    }

    $scope.suggestCategory = function(){
        $location.path('/contributor/suggest_category');
    }
//    $scope.image_server_url = imageServerUrl;
//    $scope.image_server_path = imageCatBig;

    
    
    
//    console.log($scope.catListL1);
    
    $scope.getCatList2 = function(c)
    {
        $location.path('/category_l2/'+c.id + '/' + c.name);
    }
    //init with getting main categories
//    

}]);

categoryController.controller('categoryL2Ctrl', ['$scope','$location', 'categoryService','$routeParams','snapRemote','roundService',
  function($scope,$location, categoryService,$routeParams,snapRemote,roundService) {



    var catId = $routeParams.catId;
    var catName = $routeParams.catName;

    $scope.catListL2 = [];
    
    $scope.searchList = [];
    $scope.user_id = _userObj.id;
    
    $scope.categorySearch = function(){
       categoryService.getSearchResults({catname : $scope.txtCatname, user_id : _userObj.id}).success(function(r, status){
           if(r.status == 1){
               $scope.searchList = r.categories;
           }
           else{
               $scope.searchList = [];
           }
       }).error(function(data, status) {});
    }
    
    $scope.gotoRound = function(c)
    {
        if(c.total_playable_rounds  > 0)
        {            
            roundService.getNextRoundToPlay({catId : c.id, userId : _userObj.id}).
                success(function(r, status){
                // redirect to appropriate category                
                if(r.status == 1)
                {
                    
                    if(r.data.current)
                    {
                        $location.path('/round/'+c.id+'/'+r.data.current);
                    }
                    else
                    {
                        showMessage("There are no rounds to play");
                    }
                }

            }).error(function(data, status) {});
        }
        else
        {
            showMessage("You don't have any round to play with this category");
        }
    }
    
//    showMessage($scope.config.getCatOnline);
    if($scope.config.getCatOnline==1)
    {
        $scope.getCatList2 = function()
        {
            var params = {catId : catId, catName: $scope.txtCatname}
            //get all main level categories
            categoryService.getCategoriesL2(params).success(function(r, status){
                $scope.catListL2 = r.categories;
                $scope.image_server_url = imageServerUrl;
                $scope.image_server_path = imageCatBig;
            }).error(function(data, status) {
          });
        }
        
        $scope.getCatList2(catId);
    }
    else
    {
        $scope.catListL2 = catL2List[catId];
    }


    
    $scope.getCatList3 = function(c)
    {
        $location.path('/category_l3/'+c.id);
    }

    
    

//    console.log(catName);
    //init with getting main categories
//    
}]);

categoryController.controller('categoryL3Ctrl', ['$rootScope', '$scope','$location', 'categoryService', 'roundService' ,'$routeParams',
  function($rootScope, $scope,$location, categoryService, roundService ,$routeParams) {

    var catId = $routeParams.catId;
    $scope.searchList = [];
    $scope.user_id = _userObj.id;
    
    $scope.categorySearch = function(){
       categoryService.getSearchResults({catname : $scope.txtCatname, user_id : _userObj.id}).success(function(r, status){
           if(r.status == 1){
               $scope.searchList = r.categories;
           }
           else{
               $scope.searchList = [];
           }
       }).error(function(data, status) {});
    }
    
    
    $scope.getCatList = function()
    {
        var params = {catId : catId, userId : _userObj.id}
        //get all main level categories        
        categoryService.getCategoriesForRound(params).success(function(r, status){
            $scope.catList = r.categories;
            $scope.image_server_url = imageServerUrl;
            $scope.image_server_path = imageCatBig;

        }).error(function(data, status) {
      });
    }

    $scope.gotoRound = function(c)
    {
        if(c.total_playable_rounds  > 0)
        {            
            roundService.getNextRoundToPlay({catId : c.id, userId : _userObj.id}).
                success(function(r, status){
//                    alert(r.status);
//                    alert(r.data.current);
                // redirect to appropriate category
                console.log(r);
                if(r.status == 1)
                {
                    if(r.data.current)
                    {
                        $location.path('/round/'+c.id+'/'+r.data.current);
                    }
                    else
                    {
                        showMessage("There are no rounds to play");
                    }
                    
                }

            }).error(function(data, status) {});
        }
        else
        {
            showMessage("You don't have any round to play with this category");
        }
    }

    $scope.catList = [];
    $scope.cat_id=catId;
    //init with getting main categories
    $scope.getCatList(catId);

    $scope.suggest_cat = function()
    {
        showMessage("Implemntation pending");
    };
    
//        $rootScope.gotoRoundUsingCatId = function(){
//        alert("2");
//        
//    };
    
    
}]);



categoryController.controller('listFavCatCtrl', ['$scope','$location', '$timeout', 'categoryService', 'roundService' ,'$routeParams',
  function($scope,$location, $timeout, categoryService, roundService ,$routeParams) {

    $scope.catListL1 = [];
    if($scope.config.getCatOnline==1)
    {
        $scope.getCatList1 = function()
        {
            var params = {catName: $scope.txtCatname}
    //        if(!$scope.catListL1.length)
            {
                //get all main level categories
                categoryService.getCategoriesL1($scope.txtCatname).success(function(r, status){
                    $scope.catListL1 = r.categories;                    
                    $scope.image_server_url = imageServerUrl;
                    $scope.image_server_path = imageCatBig;
                }).error(function(data, status) {});
            }
        }
        $scope.getCatList1();
    }
    else
    {
        $scope.catListL1 = catL1List.categories;
        console.log($scope.catListL1);
    }
    
    var is_L2_shown = 0, last_level1_id = 0;
    
    $scope.Level1ClickedShow = function(level1_id)
    {
        if(last_level1_id!=level1_id)
        {   
            is_L2_shown = 0;
        }
        
        $(".secondary-category").hide();
        if(is_L2_shown==0)
        {
            $scope.getCatList2 = function()
            {
                var params = {catId : level1_id}
                //get all main level categories
                categoryService.getCategoriesL2(params).success(function(r, status){
                    $scope.level2catlist = r.categories;
                    
                    $("#" + level1_id).show();
                    is_L2_shown = 1;
                }).error(function(data, status) {
              });
            }
            
            $scope.getCatList2();
            
        }
        else
        {
            $("#" + level1_id).hide();
            $scope.level2catlist = "";
            is_L2_shown = 0;
        }
        
        last_level1_id = level1_id;
    }
    
    
    
    var is_L3_shown = 0, last_level2_id = 0, fav_cat_downloaded = 0 , fav_cat_arr = new Array();
    
    $scope.level3catlist = [];
    $scope.showTertiaryCat = 0;
    
    var get_fav_categories = function()
    {
        if(fav_cat_downloaded!=1)
        {
            var params = {user_id: _userObj.id};
            
            categoryService.getFavCat(params).success(function(r, status)
            {
                fav_cat_downloaded = 1;
                fav_cat_arr = r.categories;
            }).error(function(data, status) {});
        }
    }
    
    
    get_fav_categories();

    
    $scope.Level2ClickedShow = function(level2_id)
    {           
        if(last_level2_id!=level2_id)
        {
            is_L3_shown = 0;
        }
        $(".tertiary-category").hide();        
        if(is_L3_shown==0)
        {
            $scope.getCatList2 = function()
            {
                var params = {catId : level2_id}
                //get all main level categories
                categoryService.getCategoriesL2(params).success(function(r, status){
//                    $scope.level2catlist = r.categories;
                    
                    $scope.showTertiaryCat = level2_id;            
                    var arr = r.categories;
                    arr[0].isFav = 0; // initialize it with 0
                    $scope.level3catlist = arr;            
                    is_L3_shown = 1;

                    $timeout(function(){
                        check_favorite_cat();
                    });
                }).error(function(data, status) {
              });
            }
            
            $scope.getCatList2();
            
//            $("#" + level2_id).show();
//            $scope.showTertiaryCat = level2_id;            
//            var arr = catL3List[level2_id];
//            arr[0].isFav = 0; // initialize it with 0
//            $scope.level3catlist = arr;            
//            is_L3_shown = 1;
//            
//            $timeout(function(){
//                check_favorite_cat();
//            });
            
        }
        else
        {
            $("#" + level2_id).hide();
            $scope.level3catlist = [];
            is_L3_shown = 0;
        }
        
//        showMessage(is_L3_shown);
        last_level2_id = level2_id;
        
        
        
    }
    
    function check_favorite_cat()
    {
        if(typeof(fav_cat_arr)!="undefined")
        {
            if(fav_cat_arr.length>=1)
            {
                console.log('fav_cat_arr');
                console.log(fav_cat_arr);
                
                for (var k=0; k<fav_cat_arr.length;k++)
                {
//                    showMessage(fav_cat_arr[k].category_id);
                    
                    if(typeof($scope.level3catlist)!="undefined")
                    {
                        for(var l=0; l<$scope.level3catlist.length; l++)
                        {
                            if(fav_cat_arr[k].category_id == $scope.level3catlist[l].id)
                              {
                                 $scope.$apply(function(){                                  
                                    $scope.level3catlist[l].isFav = 1; 
                                    console.log("$scope.level3catlist[l].isFav" + $scope.level3catlist[l].isFav);
                                });
                              }
                              
                        }
                    }
                }                
            }
        }
        
    }
    
}]);

