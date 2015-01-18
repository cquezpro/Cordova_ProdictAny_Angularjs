'use strict';

/* Controllers */

var achievementsController = angular.module('achievementsController', ['achievementsServices']);

achievementsController.controller('listAchievementsCtrl', ['$routeParams', '$rootScope','$scope','achievementsService','$location','CommonCode','badgeDisplay',
  function($routeParams, $rootScope,$scope,achievementsService,$location, CommonCode, badgeDisplay) {
    
    
    var type = $routeParams.type; 
    var user_id = _userObj.id;
    if(typeof($routeParams.userId)!="undefined")
    {
        var user_id = $routeParams.userId;
        $rootScope.show_this_username = "";
        if($routeParams.userId!=_userObj.id)
        {
            $scope.different_user =1;
            $rootScope.show_this_username =$routeParams.userName;
        }
    }
    
    $scope.current_user_id = user_id;
    $scope.current_username = $routeParams.userName;
    var getBelts = function()
    {
        var params = {userId : user_id};
//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            achievementsService.getBelts(params).success(function(r, status)
            {
                
                 $scope.BeltList = [];
                 var ago_str = "";
                 for (var i=0; i< r.records.length; i++)
                 {
                     var obj = {};
                     
                     if(typeof(r.records[i].discussion_time)!="object")
                     {
                         
                         ago_str = r.records[i].discussion_time;
                         obj.created_date = ago_str;
                     }
                     else
                     {
                         obj.created_date = "NA";
                     }
                     
                     obj.name = r.records[i].name;

                     var image_path = CommonCode.getImagePath('category', 'big');
                     obj.photo = "";
                     
                     if(r.records[i].image=="" || r.records[i].image==null)
                     {
                         obj.photo = image_path + '/no_image.png';
                     }
                     else
                     {
                         obj.photo = image_path + '/' + r.records[i].image;
                     }

                     obj.photo = replace_slashes_from_photos(obj.photo);
                     obj.id = r.records[i].id;
                     obj.points = r.records[i].points;
                     
                     $scope.BeltList.push(obj);
                 }
                 
                 //console.log($scope.FriendList);
            }).error(function(data, status) {});
        }
    }
   
   
    var getCatStats = function()
    {
        var params = {userId : user_id};
        //get all main level categories
        achievementsService.getCatStats(params).success(function(r, status)
        {

//                if(r.records[i].fav_cat==0)
//                 {
//                     obj.fav_image  = "img/white-heart.png";
//                 }
//                 else
//                 {
//                     obj.fav_image  = "img/red-heart.png";
//                 }
//                 alert(obj.fav_image);

            $scope.catDetailsStats = r.records.cat;
            $scope.catTotalStats = r.records;
             console.log(r);

             //console.log($scope.FriendList);
        }).error(function(data, status) {});
    }
    
    
    $scope.BadgeList = [];
    var getBadges = function()
    {
        var user_badges = localStorage.getItem("p_user_badges");
        if(user_badges){
            user_badges = JSON.parse(user_badges);
        }
        
        if(user_badges && user_badges.length){
           for(var i in user_badges){
               $scope.BadgeList.push(_badgesInfo[user_badges[i]]);
           } 
        }
        //console.log($scope.BadgeList);
        
    }
    
    $rootScope.resolveBadgeDefer = function(){
        badgeDisplay.resolve();
    }
    
    
//    alert( $scope.BadgeList.length);

    var user_id = user_id;
    
    
    if(type=="belts")
    {
        $scope.belts_active="active";
        getBelts();
    }
    else if(type=="stats")
    {
        $scope.stats_active="active";
        getCatStats();
    }
    else if(type=="badges")
    {
        $scope.badges_active="active";
        getBadges();
    }
    
    $scope.showPredictionOverlay= function(code){        
        badgeDisplay.display_badge_popup(code);
    };

    $rootScope.hideOverlay= function(){
            angular.element("#overlay").hide();
            $("#overlay1").hide();
            $("#overlay2").hide();
            $("#overlay3").hide();
            $("#shadow").hide();
            window.predict_cat_id = "";
    };


    $rootScope.shareSocial= function(){
            $(".share").slideDown();
            //alert("shareSocial");
    };

    $rootScope.cancelShare= function(){
            $(".share").slideUp();
    };

    $rootScope.shareFacebook= function(){
            //alert("shareFacebook");
            window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null /* img */, null /* url */,
                    function() {
                          console.log('share ok');
                    },
                    function(errormsg){
                          console.log("error " + errormsg);
            });
           // $location.path("/facebook");
                                                           
    };
                                                           
   $rootScope.shareTwitter = function (){
        window.plugins.socialsharing.shareViaTwitter('Message and link via Twitter', null /* img */, 'http://www.x-services.nl');
   }
        
    $scope.showOverlay= function(cat_id)
    {
        angular.element("#overlay").show();
        $("#shadow").show();
                                                           
        var params = {userId : user_id, category_id : cat_id};
        {
            //get all main level categories
            achievementsService.getCatSingleStats(params).success(function(r, status)
            {

                $scope.catTotalStats = r.records;

                 //console.log($scope.FriendList);
            }).error(function(data, status) {});

        };   
    }
  }]);
 