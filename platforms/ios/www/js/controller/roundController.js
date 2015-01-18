'use strict';

/* category controller to show category level1, level2 and level3 data  */

var roundController = angular.module('roundController', ['roundServices', 'purchaseServices', 'challengeServices', 'imagePreloaderServices']);

roundController.controller('roundCtrl', 
  ['$q','$scope','$rootScope' ,'$location','$timeout', '$interval' ,'$routeParams','roundService','snapRemote', 'imagePreloaderService', 'badgeDisplay','shareService',
  function($q,$scope, $rootScope ,$location,$timeout,$interval, $routeParams, roundService,snapRemote, imagePreloaderService, badgeDisplay, shareService) {

    var currentIndex = 0, intervalIndex = 0, answerList = [], currentPredictionObj = {}, roundInfo= {},
        round_id =  $routeParams.round_id,  predictionList = [], userAns = {}, intervalTm = 12, intervalInstance, _coins= 0;
   
   
    /* declare scope list */
    $scope.tileColor = [];
    $scope.imgLoading  = 0;
    $scope.imgLoadComplete = false;
    $scope.scrollInit = false;
    
    /*get data from share*/
    var share = shareService.get() ,rePredictedArr = [];
    /*clean share repo */
    shareService.clean();

    if(share && share.set_for && share.set_for == 'repredict'){
        rePredictedArr = share.answerList;        
    }
    
    var tileColor = ['blue','blue', 'green','green', 'light-yellow','light-yellow', 'orange','orange', 'red','red', 'red'],
     
    _afterInsert = function(tx, results){
      /*saved record*/
      answerList.push(currentPredictionObj.id);
      
      if(userAns.id != 0){
          increament_prediction_made_cnt(currentPredictionObj.id);
          badgeDisplay.display_pred_played_badges().then(function(){  
            _nextSlide();
            _setSlide();
          });
      }
      else{
            _nextSlide();
            _setSlide();
      }
     
      
      
    },
 
    _fail = function(tx, results){
        console.log('setup failed');
    },


    _saveAns = function (tx){
        if($.inArray(currentPredictionObj.id, answerList) == -1){

            if (angular.isDefined(intervalInstance)) {
                $interval.cancel(intervalInstance);
                 intervalInstance = undefined;
            }
            currentPredictionObj.title = currentPredictionObj.title.replace(/"/g, "\\'");
//            currentPredictionObj.title.replace(/'/g, "\\'");
//            alert(currentPredictionObj.title);
            var now = moment().format("YYYY-MM-DD HH:mm:ss"), exp_date = moment(roundInfo.expiry_date,"YYYY-MM-DD").format("YYYY-MM-DD") ,                    
            sql = 'INSERT INTO play_log (round_id,prediction_id,choice_id,expiry_date,create_date,question_txt,ans_text) values ('+round_id+','+currentPredictionObj.id+','+userAns.id+', "'+exp_date+'", "'+now+'", "'+currentPredictionObj.title+'", "'+userAns.choice+'" )';
            console.log(sql);
            //alert("inside _saveAns");
            tx.executeSql(sql, [], _afterInsert, _fail);
            //alert("inside _saveAns 2");
        }
    },

    _saveUnplayedAns = function(){
        if(typeof currentPredictionObj.id != 'undefined')
        {
            userAns.id = 0;
            $scope.saveAns(userAns);
        }
    },

    _getRepredictedOption = function(id){
            var opt = 0;            
            if(rePredictedArr.length){
                for(var i in rePredictedArr){                    
                    if(rePredictedArr[i].prediction_id == id){                        
                        opt = rePredictedArr[i].predicton_choice_id;
                        break;
                    }                
                }
            }        
            return opt;
    },
            
    _setSlide = function(){                
        if(currentIndex >= predictionList.length )
        {
            return;
        }

        if($scope.prediction)
        {
            currentPredictionObj = $scope.prediction;
        }

        /* if user does not play slide set result to 0 for user */
        _saveUnplayedAns();

        var p = predictionList[currentIndex];
//        p.title.length = 10;
      /*  if(p.title.length>=100)
        {
            $(".font-question").css({ 'font-size': 9 });
        }
        else if(p.title.length>=70)
        {
            $(".font-question").css({ 'font-size': 11 });
        }
        else if(p.title.length>=40)
        {
            $(".font-question").css({ 'font-size': 14 });
        }
        else if(p.title.length<40)
        {
            $(".font-question").css({ 'font-size': 16 });
        }*/
//        alert("Length=>"+p.title.length);
//        alert("Font size " + $(".font-question").css('font-size'));
        //this is to flush object
        
        var random = Math.floor(Math.random() * (10 - 1) + 1);
        
//        var getRandomNumber = getRandomNumber(random);
         $scope.prediction = {id:0, title:"", image:"", bonus_points :0, choices:[]};
         
         p.title = p.title.replace(/"/g, "'");
         
            $scope.prediction = {
                id : p.id,
                title : p.title,
                image :imageServerUrl + '/'+ p.image,                
                bonus_point : p.bonus_point,
                choices : p.choices,
                re_predict_choice : _getRepredictedOption(p.id)
            };
            $scope.clickedAns = -1;
            
            $scope.scrollInit = 'init'+ moment().format("SSS");
            console.log($scope.prediction);
          _setTimers();
    },

    _nextSlide = function(){

        currentIndex++;
        if(currentIndex >= predictionList.length )
        {
              currentPredictionObj = $scope.prediction;
              _saveUnplayedAns();
              $timeout(function(){
                  $location.path('/wrapup/'+roundInfo.category_id+'/'+roundInfo.id+'/'+ _coins);
              }, 1000);
            return;
        }
    },

    _setTimers = function(){
        $scope.tileColor = [];
        intervalIndex = 0;
        if(!angular.isDefined(intervalInstance))
        {
            intervalInstance =  $interval(function(){
                $scope.tileColor.push(tileColor[intervalIndex]);
                intervalIndex++;
                if(intervalIndex == (intervalTm-1))
                {
                    $scope.$broadcast("timeUp", "");
                }
            },1000,intervalTm);
        }
    },

    _startGame = function(){
        _setSlide();
    };

    $rootScope.resolveBadgeDefer = function(){
        badgeDisplay.resolve();
    }
    
    $scope.$on('timeUp', function(e) {
                    userAns.id=0;
                    $scope.saveAns(userAns);
    });

    $scope.clickedAns = -1;
    $scope.saveAns = function(ans, index)
    {
        currentPredictionObj = $scope.prediction;
        if($.inArray(currentPredictionObj.id, answerList) == -1){
            userAns = ans;
            if(userAns.id){
                _coins +=10;
            }
            $scope.clickedAns = index;
            var db = window.openDatabase(_config.db_name, _config.db_version, _config.inner_db_name, _config.db_storage);
            db.transaction(_saveAns, errorCB, successCB);
        }
    };

    /* make a server call*/
    roundService.getRoundData({round_id:round_id}).success(function(r, status){
        predictionList = r.data;
        roundInfo = r.roundInfo;
        $scope.round_name = roundInfo.name;
        $scope.category_name = roundInfo.category_name;
        $rootScope.round_name = roundInfo.name;
        $rootScope.category_name = roundInfo.category_name;
        
//        var d = {roundName:$scope.round_name,  category_name:$scope.category_name};
//        shareService.set(d);   
//        alert("Share set");
        /*save to local storage if required on wrapup page*/
        localStorage.setItem("p_round_info", JSON.stringify(roundInfo));
        
        var imageLocations = [];
        for(var i in predictionList){
            if(predictionList[i].image){
//                imageLocations.push($scope.imagePredBig+predictionList[i].image);
                imageLocations.push(imageServerUrl +'/'+ predictionList[i].image);
            }
        }
        console.log(imageLocations);
        
        imagePreloaderService.preloadImages(imageLocations).then(
            function handleResolve( imageLocations ) {
                $scope.imgLoadComplete = true;
                $scope.hiddenImages = imageLocations;
                _startGame();
            },
            function handleReject( imageLocation ) {
                $scope.imgLoadComplete = true;
                $scope.hiddenImages = imageLocations;
                _startGame();
            },
            function handleNotify( event ) {            
                $scope.imgLoading  = event.percent;
            }
        );
        
    }).error(function(data, status) {});

}]);




roundController.controller('roundWrapupCtrl', ['$scope', '$timeout', '$rootScope', '$location','$routeParams','roundService', 'purchaseService', 'challengeService','shareService', 'badgeDisplay',
  function($scope,$timeout, $rootScope, $location,$routeParams, roundService, purchaseService, challengeService, shareService, badgeDisplay) {
      
        $scope.image_server_url = imageServerUrl;
        $scope.image_server_path = imageUserMini;
        $scope.answerList = [];
        $scope.publicPollAnswerList = [];
        $scope.public_poll_display = _config.public_poll_display;
        $scope.re_predict_display = _config.re_predict_display;
        $scope.forfeit_display = _config.forfeit_display;
        $scope.x2_display = _config.x2_display;
        $scope.x3_display = _config.x3_display;
        $scope.x4_display = _config.x4_display;
        $rootScope.category_name = "";
        $rootScope.round_name = "";
        $scope.showChallenges = false;
        $scope.hideChallengeLoading = false;
        $scope.challengeList = [];
        $scope.round_ends = 0;
        $scope.result_in = 0;
        nextRoundId  = 0;
        $rootScope.showNextRoundBtn = false;
        $rootScope.coinsEarned = 0;
        /*get data from share*/
        var share = shareService.get();
        
        /*clean share repo */
        shareService.clean();
        
        var round_info = JSON.parse(localStorage.getItem("p_round_info")), nextRoundId , isSpecialEvent = false,
        challengeAcptArr = [],
        pushInfo = [],
        userInfo = JSON.parse(localStorage.getItem("predict_user_details")), /* get user data*/

        _deleteRoundRecords = function(tx){
            var sql = 'delete from play_log where round_id = '+round_info.id;
            tx.executeSql(sql, [], function(tx, results){}, _fail);
        },
                
        _getNextRoundToPlay = function(){
            /* get next round information */            
                roundService.getNextRoundToPlay({catId : round_info.category_id, userId : _userObj.id}).
                    success(function(r, status){
                    if(r.status == 1)
                    {
                        if(r.data.current)
                        {
                            nextRoundId =  r.data.next;
                            if(nextRoundId){
                               $rootScope.showNextRoundBtn = true 
                            }
                        }
                    }
                }).error(function(data, status) {});
        },
        
        _afterFetch = function(tx, results){
             var len = results.rows.length , _tx = tx, ans_text = "";
             for (var i=0; i<len; i++)
             {
                pushInfo.push({round_id:results.rows.item(i).round_id,
                               prediction_id:results.rows.item(i).prediction_id,
                               choice_id:results.rows.item(i).choice_id,
                               create_date:results.rows.item(i).create_date
                               });

                   if(results.rows.item(i).choice_id){
                       ans_text = results.rows.item(i).ans_text;
                   }
                   else
                   {
                       ans_text = "Not answered";
                   }
                   $scope.answerList.push({q:results.rows.item(i).question_txt, ans:ans_text, prediction_id : results.rows.item(i).prediction_id })
             }
             
            /* push round play records to server */
            roundService.pushRoundPlayResults({'records[]': pushInfo, round_id : round_info.id, user_id : _userObj.id}).success(function(r, status){
                if(r.status == 1)
                {
                    /* delete old records from play_log*/
                    //var sql = "delete from play_log where round_id = " + round_info.id;
                    db.transaction(_deleteRoundRecords, errorCB, successCB);
                        /* increment round count */
                        increament_round_played_cnt(1);
                        if(isSpecialEvent){
                            badgeDisplay.display_special_event_badges().then(function(){
                                badgeDisplay.display_round_played_badges().then(function(){});
                            });
                        }
                        else{
                            badgeDisplay.display_round_played_badges().then(function(){});
                        }
                }
                _getNextRoundToPlay();
            }).error(function(data, status) { _getNextRoundToPlay(); });

         },

         _fail = function(tx, results){},

        _getRoundRecords = function(tx){
            var sql = 'select * from play_log where round_id = '+round_info.id;
            tx.executeSql(sql, [], _afterFetch, _fail);
        },

        _acceptChallenge = function(n){
            if(challengeAcptArr.length)
            {
                challengeService.acceptChallenge({'challenge_idArr[]':challengeAcptArr, all:n }).success(function(r, status){
                    if(r.status == 1)
                    {
                        if(r.status)
                        {
                            /* do nothoing action not confired yet*/
                        }
                    }
                }).error(function(data, status) {});
            }
        };

        /* check if user redirected from challenge page */
        if(share && share.come_from && share.come_from == 'challenge')
        {   
            $scope.coinsEarned = share.coinsEarned;
            $scope.totalCoins = share.totalCoins;
            $scope.answerList = share.answerList
            $scope.publicPollAnswerList = share.publicPollAnswerList;
            
        }
        else if(share && share.come_from && share.come_from == 'specialEvents')
        {
            isSpecialEvent = true;
        }
        else
        {
            $scope.coinsEarned = $routeParams.coins;
            $scope.totalCoins = parseInt(userInfo.coins) + parseInt($scope.coinsEarned);            
        }
        
        $rootScope.category_name = round_info.category_name;
        $rootScope.round_name = round_info.name;
        $rootScope.coinsEarned = $scope.coinsEarned;
        /* update total coins in local storage*/
      
        userInfo.coins = $scope.totalCoins;
        localStorage.setItem("predict_user_details", JSON.stringify(userInfo));
        
        
        if(round_info.expiry_date && parseInt(round_info.expiry_date))
        {   
            
            var Y = round_info.expiry_date.substr(0,4),
            m = round_info.expiry_date.substr(4,2),
            d = round_info.expiry_date.substr(6,2),
            h = round_info.expiry_date.substr(8,2),
            mm = round_info.expiry_date.substr(10,2),
            ss = round_info.expiry_date.substr(12,2);            
            
            var exp = moment(Y+'-'+m+'-'+d+' '+h+':'+mm+':'+ss);
            var diff = exp.diff(moment(), 'hours');
            
            if(isNaN(diff)){
                diff = 0;
            }
            
            if(diff > 24)
            {
                diff = exp.diff(moment(), 'days') +'d';
            }
            else
            {
                diff += 'h';
            }
            
            $scope.round_ends = diff ;
            
        }
        
        
        if(round_info.result_date_time)
        {
            var Y = round_info.result_date_time.substr(0,4),
            m = round_info.result_date_time.substr(4,2),
            d = round_info.result_date_time.substr(6,2),
            h = round_info.result_date_time.substr(8,2),
            mm = round_info.result_date_time.substr(10,2),
            ss = round_info.result_date_time.substr(12,2);            
            
            var exp = moment(Y+'-'+m+'-'+d+' '+h+':'+mm+':'+ss, "YYYY-MM-DD h:mm:ss");
            var diff = exp.diff(moment(), 'hours');
            
            if(isNaN(diff))
            {
                diff = 72;
            }
            if(diff > 24)
            {
                diff = exp.diff(moment(), 'days') +'d';
                
                if(isNaN(diff))
                {
                    diff = "3d";
                }
            }
            else
            {
                diff += 'h';
            }
            
            $scope.result_in = diff ;
        }
        
        $(".blue-wrapper").click(function(){
          $(this).addClass("red-active");  
          $(this).siblings().removeClass("red-active");    
        });
        
        $(".yellow-wrapper").click(function(){
          $(this).addClass("red-active");  
          $(this).siblings().removeClass("red-active");    
        });
        
        $rootScope.gotoNextRound = function(){
            if(nextRoundId){
                $location.path("/round/"+round_info.category_id+"/"+nextRoundId);
            }
        }
        
        $rootScope.gotoHome = function(){
            if(nextRoundId){
                $location.path("/category_l1");
            }
        }
        
        /* function to get public poll*/
        $scope.public_poll = function(){
            if($scope.totalCoins > _config.public_poll)
            {
//                if(showConfirm("Are you sure you want to check public poll for this round ?"))
                {
                    purchaseService.publicPoll({roundId : round_info.id, userId : _userObj.id}).success(function(r, status){
                    if(r.status == 1)
                    {
                        /* update total coins in local storage*/
                        userInfo.coins = $scope.totalCoins - 100;
                        localStorage.setItem("predict_user_details", JSON.stringify(userInfo));
                        $scope.totalCoins = userInfo.coins;
                        console.log()
                        if(r.data.length)
                        {
                            $scope.publicPollAnswerList = [];
                            var temp = 0;
                             for (var i=0; i< $scope.answerList.length; i++)
                             {
                                 for (var j=0; j< r.data.length; j++)
                                 {
                                     if(r.data[j].prediction_id == $scope.answerList[i].prediction_id)
                                     {
                                        
                                         temp = {};
                                         temp.q = $scope.answerList[i].q;
                                         temp.user_ans = $scope.answerList[i].ans;
                                         temp.public_ans = r.data[j].choice;
                                         temp.status = 0;
                                         
                                         if(temp.public_ans == $scope.answerList[i].ans ){
                                             temp.status = 1;
                                         }
                                         
                                         $scope.publicPollAnswerList.push(temp);
                                         
                                     }
                                 }
                             }
                        }
                    }
                                                                                                        $(".content-area").animate({ scrollTop: 450 }, "slow");
                                                                                                        return false;
                }).error(function(data, status) {});

                }
            }
            else
            {
                showMessage("You do not have enough coins to see public poll");
                return false;
            }

        };

        /* function to get re_predict*/
        $scope.re_predict = function(){
            if($scope.totalCoins > _config.re_predict)
            {
//                if(showConfirm("Are you sure you want to repredict this round?"))
                {
                    purchaseService.rePredict({roundId : round_info.id, userId : _userObj.id}).success(function(r, status){
                    if(r.status == 1)
                    {                        
                        /* update total coins in local storage*/
                        userInfo.coins = $scope.totalCoins - 500;
                        localStorage.setItem("predict_user_details", JSON.stringify(userInfo));                        
                        $scope.totalCoins = userInfo.coins;
                        
                        var d = {come_from:'wrapup', set_for : 'repredict' , answerList:r.choices};
                        shareService.set(d);
                        $timeout(function(){
                            $location.path('/round/'+round_info.category_id+'/'+round_info.id);
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

        /* function to get Forfeit*/
        $scope.forfeit = function(){
            if($scope.totalCoins > _config.forfeit)
            {
//                if(showConfirm("Are you sure you want to forfeit this round?"))
                {
                    purchaseService.forfeit({roundId : round_info.id, userId : _userObj.id}).success(function(r, status){
                    if(r.status == 1)
                    {
                        /* update total coins in local storage*/
                        userInfo.coins = $scope.totalCoins - 1000;
                        localStorage.setItem("predict_user_details", JSON.stringify(userInfo));
                        $scope.totalCoins = userInfo.coins;
                        $timeout(function(){
                            $location.path('/home');
                        });
                    }
                    }).error(function(data, status) {});
                }
            }
            else
            {
                showMessage("You do not have enough coins to forfeit this round");
                return false;
            }

        };

        /* function to get X*/
        $scope.x_option = function(x){
            var x_coin_req = 0;
            if(x == 'x2')
            {
                x_coin_req = _config.X2;
            }
            else if(x == 'x3')
            {
                x_coin_req = _config.X3;
            }
            if(x == 'x4')
            {
                x_coin_req = _config.X4;
            }

            if($scope.totalCoins > x_coin_req)
            {
                purchaseService.addBonusOnRound({roundId : round_info.id, userId : _userObj.id, bonus : x }).success(function(r, status){
                if(r.status == 1)
                {
                    /* update total coins in local storage*/
                    userInfo.coins = $scope.totalCoins - x_coin_req;
                    localStorage.setItem("predict_user_details", JSON.stringify(userInfo));
                    $scope.totalCoins = userInfo.coins;
                    showMessage('You have successfully added ' + x+ ' on this round.');
                    $timeout(function(){
                        $location.path('/home');
                    });
                }
                }).error(function(data, status) {});
            }
            else
            {
                showMessage("You do not have enough coins to purchase "+ x);
                return false;
            }

        };

        $scope.acceptAllChallenges = function(){
            challengeAcptArr = [];
            jQuery('.css-checkbox').attr('checked', true);
            for(var i in $scope.challengeList)
            {
                challengeAcptArr.push($scope.challengeList[i].id);
            }
            _acceptChallenge(1);
        };

        $scope.acceptChallenge = function(ch){
            challengeAcptArr = [];
            challengeAcptArr.push(ch.id);

            _acceptChallenge(ch.id);
        };

        
        /* challege Friends or group */
        $scope.challengeGroups= function(){             
            var d = { come_from:'wrapup', round_info :round_info,coinsEarned:$scope.coinsEarned, totalCoins:$scope.totalCoins, answerList:$scope.answerList, publicPollAnswerList : $scope.publicPollAnswerList };
            shareService.set(d);            
            $location.path('/challenge_group');
        }
        
        
        $scope.challengeFriends = function(){             
            var d = { come_from:'wrapup', round_info :round_info,coinsEarned:$scope.coinsEarned, totalCoins:$scope.totalCoins, answerList:$scope.answerList, publicPollAnswerList : $scope.publicPollAnswerList };
            shareService.set(d);            
            $location.path('/challenge_friend');
        }
        
        $scope.gotoShop = function(){
            var d = { come_from:'wrapup', round_info :round_info,coinsEarned:$scope.coinsEarned, totalCoins:$scope.totalCoins, answerList:$scope.answerList,  publicPollAnswerList : $scope.publicPollAnswerList };
            shareService.set(d);            
            $location.path('/store');
        }

        /* challege Random*/
        $scope.challengeRandom = function(){
//            if(showConfirm("Are you sure you want to send challenge to any random friend ?"))
            {
                /* get challenges if any*/
                challengeService.sendChallengeRandom({
                                            user_id : _userObj.id,
                                            round_id : round_info.id,
                                            category_id : round_info.category_id 
                                        })
                .success(function(r, status){                    
                        if(r.status == 1)
                        {   
                            /* update total coins in local storage*/
                            userInfo.coins = r.totalCoins;
                            localStorage.setItem("predict_user_details", JSON.stringify(userInfo));
                            $scope.totalCoins = r.totalCoins;
                            showMessage('Challenge sent to random user from your friend list');
                        }
                        else if(r.status == 2)
                        { 
                            showMessage(r.msg);
                        }
                        else{
                            showMessage("Sorry, unable to send challenge now.");
                        }
                }).error(function(data, status) {});

            }
        }

        var db = window.openDatabase(_config.db_name, _config.db_version, _config.inner_db_name, _config.db_storage);
        db.transaction(_getRoundRecords, errorCB, successCB);

        /* get challenges if any*/
        challengeService.getChallengesOnRound({round_id : round_info.id, user_id : _userObj.id}).success(function(r, status){
                if(r.status == 1)
                {
                    $scope.hideChallengeLoading = true;
                    if(r.data.length)
                    {
                        $scope.showChallenges = true;
                        $scope.challengeList = r.data;
                    }
                    console.log($scope.challengeList);
                }

            }).error(function(data, status) {});
        
        
        /*check if any friends/group there to send challage*/
        var p = localStorage.getItem("pred_challenge_to");
        if($.trim(p) != ''){
            p = JSON.parse(localStorage.getItem("pred_challenge_to"));
        }
        
        if(p && p.id && p.type){
            var fArr = [], grpArr = [];
            if(p.type == 'group'){
                grpArr.push(p.id);
            }
            else{
                fArr.push(p.id);
            }
            challengeService.sendChallenge({'friends[]':fArr,
                                            'groups[]':grpArr,
                                            user_id : _userObj.id,
                                            round_id : round_info.id,
                                            category_id : round_info.category_id 
                                        })
                .success(function(r, status){                    
                        if(r.status == 1)
                        {   
                            showMessage("Challenge has been made to selected user or groups");
                            localStorage.setItem("pred_challenge_to", "");
                        }                    
            }).error(function(data, status) {});   
        }        
        
  }]);