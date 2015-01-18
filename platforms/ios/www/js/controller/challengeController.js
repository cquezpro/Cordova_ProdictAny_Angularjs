'use strict';

/* Controllers */

var challengeController = angular.module('challengeController', ['timer', 'angular-carousel']);

challengeController.controller('showAllChallengesCtrl', ['$scope','$location','challengeService',
  function($scope,$location, challengeService) {   
      
     $scope.user_id = _userObj.id;          
     $scope.challenges = [];     
     $scope.imageServerUrl = imageServerUrl;     
   
     /*get all challenges */
    challengeService.getAllChallenges({user_id:_userObj.id}).success(function(r, status){
        if(r.status == 1)
        {
            if(r.count > 1)
            {
                $scope.challengeViewAll = true;
            }
            
            processChallenges(r.data);
        }
    }).error(function(data, status) {});
    
    $scope.goToRoundPlay = function(cId)
    {
        var flg = false;
        $('.css-checkbox_'+cId).each(function(){
            if($(this).is(':checked')){
                flg = true;                
            }
        });
        if(flg){
            roundService.getNextRoundToPlay({catId : cId, userId : _userObj.id}).
                success(function(r, status){
                // redirect to appropriate category
                console.log(r);
                if(r.status == 1)
                {
                    $location.path('/round/'+cId+'/'+r.data.current);
                }

            }).error(function(data, status) {});
        }
        else{
            showMessage("Please accept at least one challenge to predict");            
        }
    }
    
    $scope.acceptAllChallenges = function(o)
    {        
        var ch = [];
        $('.css-checkbox_'+o).each(function(){
            ch.push($(this).attr('ch_id'));
            $(this).prop('checked', true);
        });
       acceptChallenge(ch,1);         
    }
    
    $scope.acceptChallenge = function(o)
    {        
        /*send individual req*/
        acceptChallenge([o],0);
    }
    
    $scope.viewAllChallenges = function(){
        $location.path('/allChallenges');
    }
    
    function acceptChallenge(chArr, all){
         challengeService.acceptChallenge({'challenge_idArr[]':chArr, all:all }).success(function(r, status){
            if(r.status == 1)
            {
                if(r.status)
                {
                    console.log("Challenge accepted");
                    /* do nothoing action not confired yet*/
                }
            }
        }).error(function(data, status) {});
    }
    
    function processChallenges(r){        
        if(r)
        {
            $scope.challenges = r;
            console.log($scope.challenges);
        }
    }
        
  }]);


//////////////////////////////////////////////////
