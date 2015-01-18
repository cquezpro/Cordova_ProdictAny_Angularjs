'use strict';

/* Services */

var recapServices = angular.module('recapServices', ['ngResource']);

recapServices.factory('recapService', ['$http',
  function($http){
    var root = {};      
    
    root.getCategoryRecapData = function(params){
        var conf = {
         method : 'jsonp',
         params : params,
         url    :baseUrl+'/recap/getCategoryRecapData?callback=JSON_CALLBACK'
        };        
        return $http(conf);
    };
    
    
    root.makeRecapPages = function(scope){
        var paginateList = function(list, n){
            var arr = [], temp = [], cnt = -1, size = 6;
            if(n){
                size = n;
            }
            if(list.length)
            {            
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
        };   
        
        var p_recap_summary = localStorage.getItem("p_recap_summary");
                              localStorage.removeItem('p_recap_summary');
        if(!p_recap_summary){        
            $location.path('/');
        }
        else{
            p_recap_summary = JSON.parse(p_recap_summary);
        }
        
        var categories = p_recap_summary.category, 
        correct = p_recap_summary.correct, 
        challenge = p_recap_summary.challenge,
        coins = p_recap_summary.coins;


    //alert(badges_arr.counter);
        scope.user_id = _userObj.id;
        scope.totalRounds = 0;
        scope.categories = categories;
        scope.correct = correct;
        scope.challenge = challenge;
        scope.coins = coins;    
        scope.badges_arr = p_recap_summary.badges_arr.arr;    
        scope.swipe = true;    
        scope.swipeRound = true;    
        scope.slides = [];
        scope.slides2 = [];
        scope.image_server_url = imageServerUrl
        scope.badges_counter = p_recap_summary.badges_arr.counter;

        for(var i in categories){        
            scope.totalRounds += categories[i].round_id.length;
        }

        if(categories){
            var catArr = [];
            for(var i in categories){
                catArr.push(categories[i].id);
            }

            scope.slides.push({}); /*this is required to show summary page on start*/
            /* get category data */

            root.getCategoryRecapData({userId: _userObj.id, 'catArr[]':catArr}).success(function(r, status){
                if(r.status == 1){

                    for(var i in r.recap_pages){

                        console.log('r.recap_pages[i]' + i);
                        console.log(r.recap_pages[i]);
                        if(r.recap_pages[i].friends_ranking && r.recap_pages[i].friends_ranking.length){                        
                            r.recap_pages[i].friends_ranking = paginateList(r.recap_pages[i].friends_ranking, 3);
                        }
                        scope.slides.push(r.recap_pages[i]);                    
                    }
                    console.log(scope.slides);
                }
            }).error(function(data, status) {});
        }

        /*test data start */
        function addSlide(target, style) {
            var i = target.length;
            target.push({
                label: 'slide #' + (i + 1)                   
            });
        }

        function addSlides(target, style, qty) {
            for (var i=0; i < qty; i++) {
                addSlide(target, style);
            }
        }

        scope.toggleSwipe = function(){
            scope.swipe=  !scope.swipe;                
        }

        scope.toggleSwipeParents = function(){
            scope.swipe =  !scope.swipe;                
            scope.swipeRound =  !scope.swipeRound;                        
        }
        
        scope.showPredictionOverlay= function(code){        
            badgeDisplay.display_badge_popup(code);
        };
    
        //addSlides(scope.slides, 'sports', 50);
        addSlides(scope.slides2, 'Ckicket', 5);
    };
    
    return root;
  }]);


