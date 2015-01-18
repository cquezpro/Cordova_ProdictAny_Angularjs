'use strict';

/* First of all call init module to setup necessary tables*/
_setUpApplication();

/* App Module */
var _userObj = "";
var obj_settings = "";
var _badgesInfo = "";
var _reloaded = false;
var p_recap_summary = {};
function settings()
{
    var u1 = localStorage.getItem("user_settings");

    if(u1 === null || typeof u1 == 'undefined')
    {
        obj_settings = {};
    }
    else
    {
       obj_settings = JSON.parse(u1);
    }
}
//settings();


function _getUser()
{
    var u = localStorage.getItem("user_data");
    if(localStorage.getItem( "keep_login" )==1)
    {
        var u = localStorage.getItem("user_data");
    }
    else if (localStorage.getItem( "keep_login" )==0)
    {
        var u = sessionStorage.getItem("user_data");
    }
    
    if(u === null || typeof u == 'undefined')
    {
        return false;
    }
    else
    {
        _userObj = JSON.parse(u);
    }
}

function _getUserSettings()
{
    var u1 = localStorage.getItem("user_settings");
    
    if(u1 === null || typeof u1 == 'undefined')
    {
        return false;
    }
    else
    {
       return _obj_settings = JSON.parse(u1);
    }
}

function _getUserInitialData()
{
    var u = localStorage.getItem("user_data");
    if(_userObj)
    {
        /* fetch required data of user*/
        $.getJSON(baseUrl+'/user/getUserInitialData?callback=?', {userId:_userObj.id}, function(r){
            if(r.status == 1)
            {
                localStorage.setItem("predict_user_details", JSON.stringify(r.data));
                localStorage.setItem("p_user_badges", JSON.stringify(r.badges));
                localStorage.setItem("p_user_fav_cat", JSON.stringify(r.fav_categories));
                localStorage.setItem("p_recap_summary", JSON.stringify(r.recap_summary));
                set_prediction_made_cnt(r.data.prediction_count);
            }
        });        
    }
    
    var user_login_cnt = localStorage.getItem('user_login_cnt');
    if(!user_login_cnt){
        user_login_cnt = -1;
        /* check if user is loggin first time on current device*/
//        showOverlay('#notificationModal');
    }    
    localStorage.setItem('user_login_cnt', ++user_login_cnt);
}

function _getBadgesInformation()
{
    /* fetch required data of user*/
    $.getJSON(baseUrl+'/badges/getAllBadgeJson?callback=?', {}, function(r){
        if(r.status == 1)
        {
            _badgesInfo = r.data;
        }
    });        
}

function _appBootStrap(){
    /* callers start*/
_getUser();
_getUserInitialData();
_getBadgesInformation()
/* callers end*/
}

_appBootStrap();



function toggleSlideMenu(menuSlider)
{
    menuSlider.init();
}

function showOverlay(id){
    angular.element(id).show();
	angular.element("#shadow").show();
}

function hideOverlay(id){
//    $("#" + id).hide();
    angular.element(id).hide();
    $("#shadow").hide();
}

function hideOverlayModal(id){
    $("#" + id).hide();
    $("#shadow").hide();
}


function toggleNotifications(n){
    var obj_settings = {};
    if(n == 1)
    {
        /*enable all notifications*/        
         obj_settings = {
             music : true
            ,sounds : true
            ,vibration : true
            ,challenges : true
            ,chats : true
            ,comments : true
            ,rounds : true
            ,events : true
            ,system : true
        };        
    }
    else
    {
        /*disable all notifications*/
         obj_settings = {
             music : false
            ,sounds : false
            ,vibration : false
            ,challenges : false
            ,chats : false
            ,comments : false
            ,rounds : false
            ,events : false
            ,system : false
        };     
        
    }
    localStorage.setItem('user_settings', JSON.stringify(obj_settings));    
    hideOverlay('#notificationModal');
}

var predictAnyApp = angular.module('predictAnyApp', [
  'ngRoute',
  'mainController',
  'userController',
  'predictionController',
  'discussionController',
  'userServices',
  'categoryController',
  'roundController',
  'friendsController',
  'groupsController',
  'achievementsController',
  'alertsController',
  'snap',
  'predictAnyApp.rightMenuCtrl',
  'menuSliderService',
  'alertServices',
  'timer',
  'angular-carousel',
  'commonServices',
  'friendsServices',
  'groupServices',
  'achievementsServices',
  'backDirective',
  'logoDirective',
  'CloseOverlayDirective',
  'progressPointsDirective',
  'beltDirective',
  'userinfoDirective',
  'shareServices',
  'bsSwitchDirective',
  'specialEventServices',
  'slideDownDirective',
  'challengeController',
  'journalController',
  'FavCatDirective',
  'imagePreloaderServices',
  'badgeDisplayService',
  'journalServices',
  'contributorController',
  'socialServices',
  'storeController',
  'ToggleDisplayDirective',
  'scrollDirective',
  'SimulateClickDirective',
  'disableContainerDirective',
  'recapController',
  'storeServices',
  'recapServices'
]);

predictAnyApp.config(['$routeProvider', 'snapRemoteProvider',
  function($routeProvider,snapRemoteProvider) {
//     diable left side drawer
     snapRemoteProvider.globalOptions.disable = 'left';

    $routeProvider.
    when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'mainCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
    when('/allChallenges', {
        templateUrl: 'partials/allchallenges.html',
        controller: 'showAllChallengesCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
    when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
    when('/logout', {
            templateUrl: 'partials/logout.html',
            controller: 'logoutCtrl',
            resolve : {
               data : toggleSlideMenu
            }
      }).
    when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'registerCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
    when('/signup2', {
        templateUrl: 'partials/signup2.html',
        controller: 'registerCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
	when('/trans1', {
        templateUrl: 'partials/transition1.html',
        controller: 'loginCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
	when('/trans2', {
        templateUrl: 'partials/transition2.html',
        controller: 'loginCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
    when('/terms', {
        templateUrl: 'partials/terms.html',
        controller: 'registerCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
    when('/avtar', {
        templateUrl: 'partials/avtar_list.html',
        controller: 'registerCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
              
    when('/avtar2', {
        templateUrl: 'partials/avtar_list.html',
        controller: 'editProfileCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).          
    when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'predictionCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).

    when('/league', {

        templateUrl: 'partials/league.html',
        controller: 'predictionCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).

    when('/search', {

        templateUrl: 'partials/search.html',
        controller: 'predictionCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).

    when('/eventlist', {

       templateUrl: 'partials/event_listing.html',
       controller: 'loginCtrl',
        resolve : {
           data : toggleSlideMenu
        }
     }).
    when('/category_l1', {
        templateUrl: 'partials/category_l1.html',
        controller: 'categoryL1Ctrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
    when('/category_l2/:catId', {
        templateUrl: 'partials/category_l2.html',
        controller: 'categoryL2Ctrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
    when('/category_l2/:catId/:catName', {
        templateUrl: 'partials/category_l2.html',
        controller: 'categoryL2Ctrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).      
    when('/category_l3/:catId', {
        templateUrl: 'partials/category_l3.html',
        controller: 'categoryL3Ctrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
    when('/test', {
        templateUrl: 'partials/test.html',
        controller: 'testCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
      when('/discussion/:catId', {
        templateUrl: 'partials/discussion.html',
        controller: 'discussionCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
      when('/discussion/:catId/:catName', {
        templateUrl: 'partials/discussion.html',
        controller: 'discussionCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
              
      when('/discussion', {
        templateUrl: 'partials/user_discussion.html',
        controller: 'userdiscussionCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
      when('/profile/:user_id', {
        templateUrl: 'partials/profile.html',
        controller: 'profileCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
              
      when('/profile/:user_id/:username', {
        templateUrl: 'partials/profile.html',
        controller: 'profileCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).              
      when('/round/:cat_id/:round_id', {
        templateUrl: 'partials/round.html',
        controller: 'roundCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
      when('/wrapup/:cat_id/:round_id/:coins', {
        templateUrl: 'partials/wrapup.html',
        controller: 'roundWrapupCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
      when('/groups/:type', {
        templateUrl: 'partials/groups_friends.html',
        controller: 'friendsCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).

      when('/groups/:type/:opp_user_id', {
        templateUrl: 'partials/groups_friends.html',
        controller: 'friendsCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
      when('/groupslist', {
        templateUrl: 'partials/groups.html',
        controller: 'grouplistCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
              
      when('/groupforedit', {
        templateUrl: 'partials/group_for_edit.html',
        controller: 'groupforeditCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).

        when('/groupadd', {
        templateUrl: 'partials/groupadd.html',
        controller: 'groupaddCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).

     when('/group_edit/:group_id', {
        templateUrl: 'partials/group_edit.html',
        controller: 'groupEditCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).

     when('/challenge_group', {
        templateUrl: 'partials/challenge_group.html',
        controller: 'groupChallengeCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
     when('/challenge_friend', {
        templateUrl: 'partials/challenge_friends.html',
        controller: 'friendChallengeCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).          
     when('/list_fav_cat', {
        templateUrl: 'partials/list_fav_cat.html',
        controller: 'listFavCatCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).        
          
     when('/achievements/:type', {
        templateUrl: 'partials/achievements.html',
        controller: 'listAchievementsCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).   
       
     when('/achievements/:type/:userId', {
        templateUrl: 'partials/achievements.html',
        controller: 'listAchievementsCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).      
     when('/achievements/:type/:userId/:userName', {
        templateUrl: 'partials/achievements.html',
        controller: 'listAchievementsCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).                
     when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'userSettingsCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).    
          
       when('/edit_profile', {
        templateUrl: 'partials/edit_profile.html',
        controller: 'editProfileCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).    
          
      when('/my_profile', {
        templateUrl: 'partials/my_profile.html',
        controller: 'profileCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).   
      when('/alerts', {
        templateUrl: 'partials/alerts.html',
        controller: 'alertListCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).      
      when('/groupsonly', {
        templateUrl: 'partials/groupsonly.html',
        controller: 'grouplistCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
              
      when('/friends/:userId/:userName', {
        templateUrl: 'partials/friends_of_friends.html',
        controller: 'friendsFriendsCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).        
              
      when('/journal', {
        templateUrl: 'partials/journal.html',
        controller: 'journalListCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).   
      when('/journal/:type', {
        templateUrl: 'partials/journal.html',
        controller: 'journalListCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
      when('/others_journal/:type/:user_id/:username', {
        templateUrl: 'partials/journal.html',
        controller: 'journalListCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).        
      when('/contributor/suggest_category', {
        templateUrl: 'partials/suggest_category.html',
        controller: 'suggestCatrgoryCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
      when('/store', {
        templateUrl: 'partials/store.html',
        controller: 'storeCtrl',
        resolve : {
           data : toggleSlideMenu
        }
      }).
      when('/help', {
      templateUrl: 'partials/help.html',
      controller: 'storeCtrl',
      resolve : {
              data : toggleSlideMenu
            }
      }).
      when('/recap', {
      templateUrl: 'partials/recap.html',
      controller: 'recapCtrl',
      resolve : {
              data : toggleSlideMenu
            }
      }).
//      when('/friends/:type', {
//        templateUrl: 'partials/groups_friends.html',
//        controller: 'friendsCtrl',
//        resolve : {
//           data : toggleSlideMenu
//        }
//      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

function devicereadyInternet()
            {
//              document.addEventListener("online", toggleCon, false);
                    document.addEventListener("offline", toggleCon, false);
                    
//                    alert(navigator.network.connection.type);
//                    if(navigator.network.connection.type == Connection.NONE) {
//                            //navigator.notification.alert("Sorry, you are offline.", function() {}, "Offline!");
//                            $("#no_internet_connection").show();
//                            $("#no_internet_connection").fadeOut(5000);
//                            
//                            return false;
//                    } 
                    
//                    else {
//                            alert("Net is connected");
//                    }

            }


            function toggleCon(e) {
                    console.log("Called",e.type);
                    if(e.type == "offline") {
//$("#no_internet_connection").show();
//                            $("#no_internet_connection").fadeOut(5000);
                            navigator.notification.alert("Sorry, you are offline, please connect to internet and try again.", function() {}, "Offline!");
                            return false;
                } 
            }
            
predictAnyApp.run(['$rootScope', '$location','menuSlider','$route','CommonCode','$routeParams','$timeout','userService','roundService','storeService',
  function($rootScope, $location , menuSlider, $route, CommonCode, $routeParams, $timeout, userService,roundService, storeService) {
      $rootScope.$on('$routeChangeStart', function (event,next, current) {
          
          
          if((navigator.userAgent.match(/iPhone/i)))
          {
            document.addEventListener("deviceready", devicereadyInternet, false);
          }
        
        
        $rootScope.call_confirm_function = function ()
        {
            var callback = $rootScope.callback_on_yes;
            alert(callback);
            eval(callback());
            alert("callback called");
            
        }

        $rootScope.gotoRoundUsingCatId = function(category_id)
        {
            
            if(category_id)
            {
                var category_id = category_id;
            }

            else if(window.predict_cat_id)
            {
                var category_id = window.predict_cat_id;
            }

            //if(c.total_playable_rounds  > 0)
            {        
                $("#stat_overlay").hide();
                roundService.getNextRoundToPlay({catId : category_id, userId : _userObj.id}).
                    success(function(r, status){
                        
                    // redirect to appropriate category
//                    console.log(r);
                    if(r.status == 1)
                    {
                        if(r.data.current)
                        {
                            $location.path('/round/'+category_id+'/'+r.data.current);
                        }
                        else
                        {
                            showMessage("There are no rounds to play");
                        }

                    }

                }).error(function(data, status) {});
            }

        }

          var p = $location.path();
          
          var type="photo";
          
          if(sessionStorage.getItem("photoChanged")=="1")
            {
              if(sessionStorage.getItem("photoChanged")=="1")
              {
                  type="";
                  
                  if(_userObj.id)
                  {
                      var obj = {
                      id:_userObj.id,
                      fname : _userObj.fname,
                      lname : _userObj.lname,
                      email : _userObj.email,
                      username : _userObj.username,
                      photo : localStorage.getItem( "profile_image_name_only")


                      }
                      
                    localStorage.setItem('user_data', JSON.stringify(obj));
                    localStorage.setItem("is_avatar", "0");
                    
                    $rootScope.menuIconShow = true;
                    $rootScope.customer = {
                      name: _userObj.username,
                      id: _userObj.id,
                      image: imageServerUrl + imageUserMini + localStorage.getItem( "profile_image_name_only")
                    };
                    
//                    alert($rootScope.customer.image);

                  }

              }
              
             
              var params = {user_id : _userObj.id, photo :localStorage.getItem( "profile_image_name_only"), type:type , is_avtar: 0 };
              userService.updatePhoto(params).success(function(r, status)
              {            
                  sessionStorage.setItem("photoChanged", "0");
                  
                  
                  sessionStorage.removeItem("ImageType");
//                  window.location.reload();

              }).error(function(data, status){
                  alert(status);
                  alert(data);
                  console.log(status);
                  console.log(data);
              });
            }
            
            var type="";
            
            if((sessionStorage.getItem("coverChanged")=="1"))
            {
              if(sessionStorage.getItem("coverChanged")=="1")
              {
                  type="cover";
              }
             
              var params = {user_id : _userObj.id, photo :localStorage.getItem( "profile_image_name_only"), type:type};
              userService.updatePhoto(params).success(function(r, status)
              {            
                  sessionStorage.setItem("coverChanged", "0");
                  sessionStorage.removeItem("ImageType");

              }).error(function(data, status){
                  alert(status);
                  alert(data);
                  console.log(status);
                  console.log(data);
              });
            }

          $rootScope.gotoAvtar = function(){
        
            $('#myModal').modal('hide');
            $('.modal-backdrop').remove();
            
            if(p.indexOf("/signup") > -1)
            {
                $location.path('/avtar');
            }
            else if(p.indexOf("/edit_profile") > -1)
            {
                $location.path('/avtar2');
            }
        };
        

           // $("#header").animate({left:"0"},200);
            $rootScope.config = _config;
            
            $rootScope.imageServerUrl = imageServerUrl;
            $rootScope.imageCatBig = imageServerUrl + $rootScope.config.imageCatBig;
            $rootScope.imageCatSmall = imageServerUrl + $rootScope.config.imageCatSmall;
            $rootScope.imagePredBig = imageServerUrl + $rootScope.config.imagePredBig;
            $rootScope.imageUserBig = imageServerUrl + $rootScope.config.imageUserBig;
            $rootScope.imageUserSmall = imageServerUrl + $rootScope.config.imageUserSmall;
            $rootScope.imageUserMini = imageServerUrl + $rootScope.config.imageUserMini;

            
            $rootScope.show_discussion = function(cat_id)
            {
                $location.path("/discussion/" + cat_id);
            }
    
            $rootScope.go_to_page_direct = function(page_name, id, third_param, fourth_param)
            {
               
                
                if(page_name=="discussion" && typeof(window.predict_cat_id)!="undefined" && window.predict_cat_id!="")
                {
                    id = window.predict_cat_id;
                    
                    $("#stat_overlay").hide();
                    
                    window.predict_cat_id = "";
                }
                
//                debugger;
                //if 4 parameters are passed 
                if(page_name && id && third_param && fourth_param)
                {
                    $location.path("/" + page_name + "/" + id + "/" + third_param + "/" + fourth_param);
                }
                //if 3 parameters are passed 
                else if(page_name && id && third_param)
                {
                    $location.path("/" + page_name + "/" + id + "/" + third_param);
                }
                //if 2 parameters are passed 
                else if(page_name && id)
                {
                    $location.path("/" + page_name + "/" + id);
                }
                else if(page_name)
                {
                    $location.path("/" + page_name);
                }
                //if14 parameter is passed 
                else if(page_name)
                {
                    switch(page_name) {
                        case 'settings':
                            $location.path("/settings");;
                            break;
                        case 'my_profile':
                            $location.path("/my_profile");
                            break;
                        case '/achievements/belts':
                            $location.path("/achievements/belts");
                            break;


                        default:
                            $location.path("/my_profile");
                    }
                }
                
            }
          
//          var myScroll;

//        function loaded () {
//            myScroll = new IScroll('#wrapper', {
//                scrollbars: true,
//                mouseWheel: true,
//                interactiveScrollbars: true,
//                shrinkScrollbars: 'scale',
//                fadeScrollbars: true
//            });
//        }
////
////            
//            loaded();
          
          //need to close slider if open on change in location
          menuSlider.close();
          //check user login status
          _getUser();

          /*
           *This is used to track if user is logged in or not.
           *Also used to check if to show logout option or not.
           **/
          $rootScope.isLoggedIn = false;
          if(_userObj && _userObj !== '' )
          {
            $rootScope.isLoggedIn = true;                        
            $rootScope.LogginUserId = _userObj.id;                        
          }

          /* if user is not logged in then redirect user to login page*/
          if( !$rootScope.isLoggedIn && (p !='/login' && p !='/signup' && p !='/signup2'&&  p !='/avtar' && p !='/logout' ))
          {
              $route.reload();
              $location.path('/login');
          }

          /* if user is logged in then redirect home page*/
          if($rootScope.isLoggedIn && (p =='/login' || p =='/signup' || p =='/signup2' ||  p =='/avtar'))
          {
              $route.reload();              
              $location.path('/home');
          }
          
          
          if($rootScope.isLoggedIn)
          {
//              alert(_userObj.photo);
              $rootScope.menuIconShow = true;
              $rootScope.customer = {
                name: _userObj.username,
                id: _userObj.id,
                image: imageServerUrl + imageUserMini + _userObj.photo
              };
              
              var p_recap_summary = localStorage.getItem("p_recap_summary");
              if(p_recap_summary && !_reloaded){
                  p_recap_summary = JSON.parse(p_recap_summary);
                  if(p_recap_summary && p_recap_summary.category && p_recap_summary.category.length ){                      
                        $location.path('/recap');
                        _reloaded = true;
                  }
                  //$route.reload();              
                
              }
              
          }
          else{
              $rootScope.menuIconShow = false;
              $rootScope.customer = {
                name: "User",
                id: 0,
                image: ""   
              };
          }

          
//          if(p.indexOf("/my_profile") > -1)
          {
              
//              $("#header_center").css("background", "white");
              $("#header_center").addClass("col-xs-12");
              $("#header_center").addClass("head-title-layout3");
              
              var u = localStorage.getItem("user_data");
              
//              showMessage(u);
//              if(typeof(u)!="undefined" && typeof(u)!="null" && typeof(u)!=null)
//              {
//                  u = JSON.parse(u);
//                  console.log(u);
//                  $timeout(function() {
//                      $("#header_center").html(u.fname);
//                    }, 500);
//              }
              

              
          }
//                    $("#header").animate({left:"0"},200);
                    $rootScope.show_challenge_footer=0; 
                   
                    $rootScope.menuIconShow = true;
                        $rootScope.shareIconShow = false;
                        
                        $("#back_directive_wrapper").show();
                        $("#back_replace_coins").hide();
                        $("#header").show();
                         $rootScope.show_main_header=1;
                         $rootScope.show_prediction_page=0;
                         $rootScope.show_category_header = false;
                          $rootScope.show_no_header = false;
                          
                          if(p.indexOf("/journal/repredict") > -1)
                          {
                             $("#back_directive_wrapper").hide();
                             $("#back_replace_coins").show();
                          }
                     if(p.indexOf("/wrapup") > -1)
                     {
                        $rootScope.show_challenge_footer=1;
                        $rootScope.menuIconShow = false;
                        $rootScope.show_category_header = true;
                        $("#header").hide();
                        
                     }
                     else if(p.indexOf("/challenge_group") > -1)
                     {
                        $rootScope.friend_show_challenge_footer=1;
                        $rootScope.menuIconShow = false;
                        $rootScope.show_category_header = true;
                        $("#header").hide();
                     }
                     else if (p.indexOf("/round/") > -1)
                     {
                        $rootScope.menuIconShow = false;
                        $rootScope.show_category_header = true;
                        
                        $("#header").hide();
                     }
                     else if(p.indexOf("/signup") > -1)
                     {
                        $rootScope.menuIconShow = false;
                     }
                     
                     else if(p.indexOf("/avtar") > -1)
                     {
                        $rootScope.menuIconShow = false;
                     }
                     else if(p.indexOf("/login") > -1)
                     {
                         $rootScope.show_category_header = false;
						 $rootScope.menuIconShow = false;
                        $("#header").hide();
						$rootScope.show_no_header = true;
                     }
                    else
                     {
                         $rootScope.show_challenge_footer=0;
                         $rootScope.friend_show_challenge_footer=0;
                     }
					 
					 if(p.indexOf("/badges") > -1)
                     {
                        $rootScope.show_badges_share=1;
                     }
                     else
                     {
                         $rootScope.show_badges_share=0;
                     }
                     
                     
//                    var arrayOfStrings = p.split("/");
//
//                    var page_name = arrayOfStrings[1];


                      var second_param = "";
//                     if(page_name=="discussion")
//                     {
//                         second_param = $routeParams.catId;
//                         console.log($routeParams);
//                     }
                    $timeout(delay_function, 500);
                    
                    function delay_function()
                    {
                        if(typeof($rootScope.show_this_username)!="undefined" && $rootScope.show_this_username!="")
                        {
                            second_param = $rootScope.show_this_username;
                        }
                        display_heading(p, second_param);
                    }
    
                     
                     
//          var path_name = $location.path();
//          showMessage(p.indexOf("oo") > -1);

//          if($location.path()=="")
        $rootScope.challengeToEntity = function(id,type)
        {
            var p = {'id' : id, 'type': type};
            localStorage.setItem("pred_challenge_to", JSON.stringify(p));
            $location.path('/category_l1');
        }
      });
      
      $rootScope.repredict_coins = _config.re_predict;
}]);


