'use strict';

/* Controllers */

var journalController = angular.module('journalController', [ 'commonFilter' ]);

journalController.controller('journalListCtrl', ['$rootScope','$scope', '$timeout' ,'journalServices','$location','CommonCode','$routeParams', 'purchaseService', 'shareService',
  function($rootScope,$scope, $timeout ,journalServices,$location, CommonCode, $routeParams, purchaseService,shareService) {
    
    var type = $routeParams.type; 
    
    var profile_user_id = _userObj.id;
    
    $scope.profile_user_id = profile_user_id;
//    alert($scope.profile_user_id);
    if(typeof($routeParams.user_id)!="undefined")
    {
        var profile_user_id = $routeParams.user_id;
        $scope.profile_user_id = profile_user_id;
        $scope.other_user_journal = 1;
    }
    
    
    $scope.coins_tab_active = '';
    $scope.alltime_tab_active = '';
    $scope.repredict_tab_active = '';
    $scope.re_predict_display = _config.re_predict_display;
//    $scope.recap_tab_display = false;
    var p_recap_summary = localStorage.getItem("p_recap_summary");
//    if(p_recap_summary){
//        $scope.recap_tab_display = true;
//    }
    
    var paginateList = function(list, n){
        var arr = [], temp = [], cnt = -1, size = 6;
        if(n){
            size = n;
        }
        if(list.length)
        {
            console.log(list);
            for(var i in list)
            {   
                if(i % size == 0)
                {
                    if(temp.length)
                    {
                        arr.push(temp.slice(0));
                    }                    
                    temp = [];
                }                
                temp.push(list[i]);                                
            }
            if(temp.length)
            {
                arr.push(temp.slice(0));
            }   
        }
        
        return arr;
    }  
    
    if(type=='coins')
    {
        $scope.coins_tab_active = 'active';
        
        
        var params = {userId: profile_user_id}
        {
            //get all main level categories
            journalServices.getCoins(params).success(function(r, status)
            {
                $scope.reward_total_points = parseInt(r.reward_total_points);
                $scope.prediction_total_points = parseInt(r.prediction_total_points);
                $scope.points_through_friends = parseInt(r.points_through_friends);
                
                $scope.total_coins = $scope.reward_total_points + $scope.prediction_total_points + $scope.points_through_friends;
                
            }).error(function(data, status) {});
            
            
            journalServices.getUserCoins(params).success(function(r, status)
            {
                $scope.user_coins_arr = r;
                
//                $scope.user_coins_arr = paginateList($scope.user_coins_arr)
//                console.log(r);
//                $scope.total_coins = $scope.reward_total_points + $scope.prediction_total_points + $scope.points_through_friends;
                
            }).error(function(data, status) {});
        }
//        $scope.getCatList1();
        
//        journalServices.
        
    }
    else if(type=='alltime')
    {
        
        
        var params = {userId: profile_user_id}
        $scope.alltime_tab_active = 'active';
        
        journalServices.getAlltimeJournal(params).success(function(r, status)
            {
                $scope.categories_arr = r;                
            }).error(function(data, status) {});
    }
    else if(type == 'repredict'){
        $scope.categories_arr_length = 1;
        $scope.repredict_tab_active = 'active';
        var params = {user_id: profile_user_id}        
        journalServices.getRepredictData(params).success(function(r, status)
        {
            if(r.status == 1){

                if(r.categories.length){
                    var temp = {};
                    for(var i in r.categories){
                        r.categories[i].played_date_formated = getTimeAgo(r.categories[i].played_date);
                    }
                }
                $scope.categories_arr = r.categories;
                $scope.categories_arr_length = 0;
                
                console.log($scope.categories_arr);
            }
            

        }).error(function(data, status) {});
    }
    
//    $scope.challengeToEntity = function(id,type){
//        var p = {'id' : id, 'type': type};
//        localStorage.setItem("pred_challenge_to", JSON.stringify(p));
//        $location.path('/category_l1');
//    }
//    
    /* function to get re_predict*/
    $scope.re_predict = function(obj){
        var userInfo = localStorage.getItem("predict_user_details");
        if(userInfo){
            userInfo = JSON.parse(userInfo);
        }
        
        if(!userInfo || !userInfo.coins){
            userInfo.coins = 0;
        }
        
        if(userInfo.coins > _config.re_predict)
        {
//            if(showConfirm("Are you sure you want to repredict this round?"))
            {
                purchaseService.rePredict({roundId : obj.round_id, userId : _userObj.id}).success(function(r, status){
                    if(r.status == 1)
                    {
                        /* update total coins in local storage*/
                        userInfo.coins = parseInt(userInfo.coins) - 500;
                        localStorage.setItem("predict_user_details", JSON.stringify(userInfo));    
                        
                        var d = {come_from:'repredict', set_for : 'repredict' , answerList:r.choices};
                        shareService.set(d);
                        
                        $timeout(function(){
                            $location.path('/round/'+obj.category_id+'/'+obj.round_id);
                        });
                    }
                }).error(function(data, status) {});
            }
        }
        else
        {
            showMessage("You do not have enough coins to repredict this round");
            return false;
        }

    };

    
  }]);
 
 