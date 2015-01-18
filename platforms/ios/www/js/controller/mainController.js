'use strict';

/* Controllers */

var mainController = angular.module('mainController', ['timer', 'angular-carousel']);

mainController.controller('mainCtrl', ['$rootScope', '$scope', '$timeout' ,'loginService', '$location', 'specialEventService','challengeService','roundService','categoryService', 'shareService','badgeDisplay',
  function($rootScope, $scope, $timeout , loginService,$location, specialEventService, challengeService,roundService, categoryService, shareService,badgeDisplay) {   
      
     $scope.user_id = _userObj.id;
     $scope.imageServerUrl = imageServerUrl;
     
     $scope.specialEvents = [];
     $scope.challenges = [];
     $scope.challengeViewAll = false;
     $scope.specialEventsEnds = "";
     $scope.show_view_all_str = 0;
    
    var challengeArr = [];

    
    function setLoginSeries(){
        var obj = localStorage.getItem('p_login_series'),
            current = moment().format('YYYYMMDD'),
            login_series = {last_login_date:current, series_count:1};
    
        if(obj){
            obj = JSON.parse(obj);
            if(current != obj.last_login_date)
            {
                var yesterday = moment().subtract('days', 1).format('YYYYMMDD');
                if(yesterday == obj.last_login_date){
                    login_series.series_count = parseInt(obj.series_count) + 1;
                }
                else
                {
                    login_series.series_count = obj.series_count;
                }
            }
            else
            {
                login_series.series_count = obj.series_count;
            }
        }
        localStorage.setItem('p_login_series', JSON.stringify(login_series));
    }
    
    setLoginSeries();
    
    if(_badgesInfo){
        badgeDisplay.display_login_series_badges().then(function(){});
    }
    else{
        $timeout(function(){
            badgeDisplay.display_login_series_badges().then(function(){}); 
        }, 5000);
        
    }
    
    
    /*get special events */
    specialEventService.getSpecialEvents({userId:_userObj.id}).success(function(r, status){
        if(r.status == 1)
        {
           $scope.specialEvents = r.data;
           if($scope.specialEvents.length)
           {
               var dt = $scope.specialEvents[0].event_expire_date,
               y = dt.substr(0,4),
               m = dt.substr(4,2),
               d = dt.substr(6,2),
               h = dt.substr(8,2),
               i = dt.substr(10,2),
               s = dt.substr(12,2);
               
                var now = moment(new Date());
                var end_time = moment(y+"-"+m+"-"+d+" "+h+":"+i+":"+s);                                
                $scope.end_time =  end_time.diff(now,'seconds');;               
           }
        }
    }).error(function(data, status) {});
    
    /*get all challenges */
    challengeService.getAllChallenges({user_id:_userObj.id, limit:1}).success(function(r, status){
        if(r.status == 1)
        {
            if(r.count > 1)
            {
                $scope.challengeViewAll = true;
            }
            
            processChallenges(r.data);
        }
    }).error(function(data, status) {});
    
    $scope.challengePlay = function(cId)
    {
        var flg = false, challengeArr = [];
        $('.css-checkbox_'+cId).each(function(){
            if($(this).is(':checked')){
                challengeArr.push($(this).attr('ch_id'));
                flg = true;                
            }
        });
        if(flg){
            challengeService.acceptChallenge({'challenge_idArr[]':challengeArr, cat_id : cId, user_id:_userObj.id, all : 1}).success(function(r, status){
            if(r.status == 1)
            {
               
//                    roundService.getChallengeRoundToPlay({catId : cId, userId : _userObj.id}).
//                            success(function(r, status){
//                            if(r.status == 1)
//                            {
//                               // $location.path('/round/'+cId+'/'+r.data.current);
//                            }
//
//                    }).error(function(data, status) {});
                
            }
            }).error(function(data, status) {});
        }
        else{
            showMessage("Please accept at least one challenge to predict");            
        }
    }
    
    
    $scope.goToSpecialEventPlay = function(rId,cId)
    {
        /*set share service parameter so when user completes the round play user will get badge on wrap up page*/
        shareService.set({come_from:'specialEvents'}); 
        $location.path('/round/'+cId+'/'+rId);
    }
    
    $scope.acceptAllChallenges = function(o){        
        var ch = [];
        challengeArr = [];
        $('.css-checkbox_'+o).each(function(){            
            $(this).prop('checked', true);
        });
    }
    
    $scope.viewAllChallenges = function(){
        $location.path('/allChallenges');
    }
    
    function processChallenges(r){        
        if(r)
        {
            $scope.challenges = r;            
        }
    }
    
    var get_fav_categories = function(){
        var params = {user_id: _userObj.id, maxLimit : 3};

        categoryService.getFavCat(params).success(function(r, status)
        {
            $scope.fav_cat_arr = r.categories;
            console.log($scope.fav_cat_arr);
            $scope.DisplayFavCatSection=0;
            if(r.categories.length>=1)
            {
                $scope.DisplayFavCatSection=1;
            }
            if(r.favCatCnt>=4)
            {
                $scope.show_view_all_str = 1;
            }

        }).error(function(data, status) {});

    }
    
    get_fav_categories();
    
        
  }]);


mainController.controller('testCtrl', ['$scope',  '$http',
  function($scope, $http) {  
      
//      $scope.end_time =  moment('2014-04-29 15:12:00').format('D-MM-YYYY');
     var now = moment(new Date());
     var end_time = moment().add('seconds', 120);
     var diff = end_time.diff(now,'seconds'); 
     
     $scope.now = moment(new Date()).format('D-MM-YYYY hh:mm:ss');
     $scope.end_time_formated = end_time.format('D-MM-YYYY hh:mm:ss');     
     $scope.diff = diff;
     $scope.diff_formated = moment(diff).format('hh:mm:ss');
     
     $scope.end_time =  diff;
    
    /* slider */    
    function addSlide(target, style) {
                var i = target.length;
                target.push({
                    label: 'slide #' + (i + 1)                   
                });
            };

            function addSlides(target, style, qty) {
                for (var i=0; i < qty; i++) {
                    addSlide(target, style);
                }
            }
            
            $scope.swipe = true;
            // 1st ngRepeat demo
            $scope.slides = [];
            $scope.slides2 = [];
            $scope.toggleSwipe = function(){
                $scope.swipe=  !$scope.swipe;                
            }
            addSlides($scope.slides, 'sports', 50);
            addSlides($scope.slides2, 'Ckicket', 5);
    
    
        /*block ui*/
//        $scope.blockUI = function(m)
//        {
//            blockUI.start(m);
//            setTimeout(function(){                
//                blockUI.stop();   
//                $scope.$apply();
//            },2000);
//        }
        
//        
//    
        $scope.testFacebook = function(){
            alert("FB Called");
//            getFBInfo();
        }
        
        $scope.testLongResponce = function(){
            var test = function(){
                var conf = {
                 method : 'jsonp',
                 url    :baseUrl+'/user/longResponce?callback=JSON_CALLBACK',                 
                };
                return $http(conf);
            };
            
            test().success(function(r, status){
                alert(r.status);
            }).error(function(data, status) {});
        }
  }]);


//////////////////////////////////////////////////
