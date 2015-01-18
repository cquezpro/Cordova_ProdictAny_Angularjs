'use strict';

var storeController = angular.module('storeController', ['storeServices']);

storeController.controller('storeCtrl', ['$scope','$rootScope', 'shareService','storeService',
    function($scope, $rootScope, shareService, storeService) {
    
    $rootScope.purchase_coins_confirmed = function()
    {

        $("#confirmModal").hide();
        $("#shadow").hide();
        
        var params = {userId : _userObj.id, coins:$scope.num_coins, amount:$scope.amount};
            //get all main level categories
        storeService.purchase(params).success(function(r, status)
        {
            var userInfo = JSON.parse(localStorage.getItem("predict_user_details"));

            userInfo.coins = parseInt(userInfo.coins) + parseInt($scope.num_coins);   

            localStorage.setItem("predict_user_details", JSON.stringify(userInfo));

            
            $scope.total_coins = parseInt(userInfo.coins);
    
             if(typeof(r.msg)!="undefined")
             {
                 showMessage(r.msg);
             }
             console.log(r);

             //console.log($scope.FriendList);
        }).error(function(data, status) {});
        
//        if(confirm("You are about to purchase " +num_coins + " and $" + amount + " will be deducted from your account "))
//        {
//            var params = {userId : _userObj.id, coins:num_coins, amount:amount};
//            //get all main level categories
//            storeService.purchase(params).success(function(r, status)
//            {
//                 if(typeof(r.msg)!="undefined")
//                 {
//                     alert(r.msg);
//                 }
//                 console.log(r);
//
//                 //console.log($scope.FriendList);
//            }).error(function(data, status) {});
//        
//            
//        }
    }
    
    $rootScope.purchase_coins = function(num_coins, amount)
    {
        $scope.num_coins = num_coins;
        $scope.amount = amount;
        
        $("#myConfirmModalLabels").html("PredictAny coins purchase");
        $("#myConfirmModalContent").html("You are about to purchase " +num_coins + " coins and $" + amount + " will be deducted from your account ");
        
//        $rootScope.callback_on_yes = "purchase_coins_confirmed()";
        showOverlay("#confirmModal");
        
    }
    
    /*get data from share*/
    var share = shareService.get();
    
    /* keep it to go back to wrap up page */
    if(share && typeof(share.come_from)!='undefined')
    {
        if(share.come_from == 'wrapup')
        {
            var d = {coinsEarned:share.coinsEarned,  totalCoins:share.totalCoins, answerList:share.answerList,publicPollAnswerList : share.publicPollAnswerList , come_from:'challenge'};
            shareService.set(d);
        }
    }
    
    var userInfo = JSON.parse(localStorage.getItem("predict_user_details"));
    localStorage.setItem("predict_user_details", JSON.stringify(userInfo));
    $scope.total_coins = parseInt(userInfo.coins);        
    
}]);
