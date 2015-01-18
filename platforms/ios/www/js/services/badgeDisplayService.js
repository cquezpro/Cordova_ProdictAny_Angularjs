'use strict';

/* Services */

var badgeDisplayService = angular.module('badgeDisplayService', []);

badgeDisplayService.factory('badgeDisplay', [ '$q','$rootScope','$http','$timeout',
  function($q,$rootScope,$http,$timeout){
      
      var root = {};
      root.deferred = $q.defer();
      
      root.sendinfoToServer = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/badges/saveBadge?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    root.display_pred_played_badges = function(){   
           root.deferred = $q.defer();
            var p_cnt_today = get_todays_prediction_made_cnt();                        
            var p_cnt = get_total_prediction_made_cnt();                        
            
            //the first prediction made by user
            if(p_cnt == 1){
               display_badge('B76');
            }
            else if(p_cnt == 50){
               // 50 predictions made in same day 
               display_badge('B77');
            }
            else if(p_cnt == 100){
               // 100 predictions made in same day 
               display_badge('B78');
            }
            else if(p_cnt == 250){
               // 250 predictions made in same day 
               display_badge('B79');
            }
            else if(p_cnt == 1000){
               // 1000 predictions made in same day 
               display_badge('B80');
            }
            else if(p_cnt == 5000){
               // 5000 predictions made in same day 
               display_badge('B81');
            }
            else if(p_cnt == 10000){
               // 5000 predictions made in same day 
               display_badge('B82');
            }
            else{
                 release();
            }
            return root.deferred.promise;
     };
    
    root.display_round_played_badges = function(){            
            var p_cnt_today = get_todays_round_played_cnt();                        
            
            //the first prediction made by user
            if(p_cnt_today == 5){
               display_badge('B57');
            }
            else if(p_cnt_today == 25){               
               display_badge('B58');
            }
            else if(p_cnt_today == 50){               
               display_badge('B59');
            }
            else if(p_cnt_today == 100){               
               display_badge('B60');
            }
            else{
                 release();
            }
            return root.deferred.promise;
     };
     
    root.display_login_series_badges = function(){            
            var cnt = get_login_series_cnt();
            //the first prediction made by user
            if(cnt == 2){
               display_badge('B83');
            }
            else if(cnt == 3){               
               display_badge('B84');
            }
            else if(cnt == 4){               
               display_badge('B85');
            }
            else if(cnt == 5){               
               display_badge('B86');
            }
            else if(cnt == 6){               
               display_badge('B87');
            }
            else if(cnt == 7){               
               display_badge('B88');
            }
            else{
                 release();
            }
            return root.deferred.promise;
     };
    
    /* display badge when user plays first special event */
    root.display_special_event_badges = function(){            
        //the first prediction made by user
        display_badge('B61');        
        return root.deferred.promise;
     };
     
     /* display badge when user contribute  */
    root.display_contributor_badge = function(){            
        //the first prediction made by user
        display_badge('B55');        
        return root.deferred.promise;
     };
     
     
     root.resolve = function(){         
         root.deferred.resolve();
     };
     
     root.display_badge_popup = function(code){          
            setBadge(_badgesInfo[code]);                       
            showOverlay('#badge_overlay');
      };
     
     function setBadge(b){
          $rootScope.badge_title = b.name;
          $rootScope.badge_image = "img/badges/big/"+b.image;
          $rootScope.badge_description = b.details;
      }
      
      function release(){
        $timeout(function(){            
            root.resolve();
        },1000);
      }
      
      function display_badge(code){          
           //display badge for 1st prediction                                
            var user_badges = localStorage.getItem("p_user_badges");
            if(user_badges){
                user_badges = JSON.parse(user_badges);
            }
            
            if(!user_badges || !user_badges.length || $.inArray(code, user_badges) == -1 )
            {
                root.sendinfoToServer({badgeCode:code, user_id:_userObj.id}).success(function(r, status){                    
                    setBadge(_badgesInfo[code]);                       
                    showOverlay('#badge_overlay');
                    user_badges.push(code);
                    localStorage.setItem("p_user_badges", JSON.stringify(user_badges));
                    
                }).error(function(data, status) {                    
                    release();
                });
            }
            else{
                release();
            }
      }
      
    return root;
  }]);