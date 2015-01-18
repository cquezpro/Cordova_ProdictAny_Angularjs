'use strict';

/* Controllers */

var userController = angular.module('userController', ['chatServices', 'userServices', 'categoryServices', 'bsSwitchDirective']);

userController.controller('loginCtrl', ['$rootScope','$scope','loginService','$location','socialService','userService',
  function($rootScope,$scope,loginService,$location, socialService,userService) {

    //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    $scope.isUnchanged = function(user) {

//        if(user.txtUsername && user.txtPass)
//            return false ;
//        else
//            return true;
    };
    var fnFBLoginCallBack =  function(r){
        if(r.email){
            //make a fb login validation call
           userService.validate_fb_login({fb_email:r.email}).success(function(r,status){
               $scope.processLogin(r);
           });
        }
    };
    
    var fnTWLoginCallBack =  function(r){
       alert("twitter callback");
    };

    $scope.fbSignIn = function(){
        socialService.fbLogin(fnFBLoginCallBack);
    }
    
    $scope.twSignIn = function(){
        socialService.twLogin(fnTWLoginCallBack);
    }

    $scope.login = function(user) {
        localStorage.setItem('keep_login', 0);
        if(user.keep_login===true || typeof(user.keep_login)=="undefined")
        {
            localStorage.setItem('keep_login', 1);
        }

        loginService.jsonp_query({userId:user.txtUsername, pass:user.txtPass},$scope.processLogin);
    };


    $scope.processLogin = function(r){        
        if(r.status ===  1)
        {
            var obj = {
                id:r.user.id,
                fname : r.user.fname,
                lname : r.user.lname,
                email : r.user.email,
                username : r.user.username,
                photo : r.user.photo
            }
            
            localStorage.setItem('user_data', JSON.stringify(obj));
            sessionStorage.setItem('user_data', JSON.stringify(obj));

            _appBootStrap();
//            window.location.href= baseUrl+ '/index.html#/category_l1';
            $location.path('/category_l1');
        }
        else
        {
            showMessage(r.msg[0]);
        }
    }

    $scope.gotoRegister = function(){
        $location.path('/signup');
    };

     $scope.$watch('$viewContentLoaded', function(){
        $('#toggle-chk').bootstrapSwitch('onColor', 'success');
    });

    $rootScope.headTitle = "Sign Up";

    $scope.checked=1;

    $('#toggle-chk').on('switchChange.bootstrapSwitch', function (event, state) 
    {
        $scope.checked = state;
        if($scope.checked==1)
        {
            $scope.checked=0;
        }
        else
        {
            $scope.checked= 1;
        }
    }); 
  }]);


 userController.controller('profileCtrl', ['categoryService','$rootScope','userService', '$routeParams','$scope','getprofileService', '$location', 'CommonCode',
  function(categoryService, $rootScope,userService, $routeParams,$scope,getprofileService, $location, CommonCode)
  {
      
      if($location.path()=="/my_profile")
      {
          var params = {userId:_userObj.id};
          
      }
      else
        {
            var fromUserId = _userObj.id;
            var profile_user_id = $routeParams.user_id;
        //        _userObj.opp_user_id=100;
        //        console.log(_userObj);
            var params = {userId:profile_user_id, fromUserId:fromUserId};
            
            
        }
    
    var get_profile_data = function()
    {
        
        getprofileService.jsonp_query(params,processGetProfile);
    }

//    $scope.challengeToEntity = function(id,type){
//        var p = {'id' : id, 'type': type};
//        localStorage.setItem("pred_challenge_to", JSON.stringify(p));
//        $location.path('/category_l1');
//    }
    
     var processGetProfile = function(r)
     {
         
         $scope.fname = r.user.fname;
         $scope.lname = r.user.lname;
         $scope.username = r.user.username;
         $scope.about_me = r.user.about_me;
         $scope.country_name = r.user.country_name;
         
         var pipe = "";
         if(r.user.country_name!="")
         {
             pipe = " | ";
         }
         $scope.state_name = pipe + r.user.state;
         
         pipe = "";
         if(r.user.state!="")
         {
             pipe = " | ";
         }
         
         $scope.age = pipe + r.user.age;
         
         var cover_image_path = CommonCode.getImagePath('cover_image', 'big');
         
         
         if(r.user.cover_image=="")
         {
             $scope.cover_image = "img/black.jpg";
         }
         else
         {
             $scope.cover_image = cover_image_path + '/' + r.user.cover_image;
         }
         $scope.cover_image = replace_slashes_from_photos($scope.cover_image);
         
         $scope.profile_user_id = $scope.user_id = r.user.id;
         
         if(r.user.gender==1)
         {
             $scope.gender = "Male";
         }
         else if(r.user.gender==0)
         {
             $scope.gender = "Female";
         }
         $scope.home_city = r.user.home_city;
         $scope.friends_count = r.user.friends_count;

         $scope.unfriend_str = "";
         $scope.block_unblock = "";

//         showMessage(r.requester_id);
         
         if(r.is_friend=="1")
         {
             $scope.unfriend_str = "Unfriend";
         }
         else if(r.is_friend=="0" && _userObj.id==r.requester_id)
         {
             $scope.unfriend_str = "Pending";
         }
         else if(r.is_friend=="0" && _userObj.id!=r.requester_id)
         {
             $scope.unfriend_str = "Accept";
         }
         else if(r.is_friend=="2")
         {
             $scope.unfriend_str = "Declined";
         }
         else if(r.is_friend=="3" && _userObj.id!=r.user.id)
         {
             $scope.unfriend_str = "Make Friend";
         }

         if(r.is_blocked=="1" && _userObj.id!=r.user.id)
         {
             $scope.block_unblock = "Unblock";
         }
         else if (r.is_blocked=="0" && _userObj.id!=r.user.id)
         {
             $scope.block_unblock = "Block";
         }

         var image_path = CommonCode.getImagePath('user', 'big');
         
         
         if(r.user.photo=="")
         {
             $scope.photo = image_path + '/no_image.png';
         }
         else
         {
             $scope.photo = image_path + '/' + r.user.photo;
         }
         $scope.photo = replace_slashes_from_photos($scope.photo);
     }
     get_profile_data();

     $scope.send_to_message = function()
     {
         $location.path("/groups/messages/" + profile_user_id);
     }

     $scope.block = function()
     {
        var params = {profile_user_id: profile_user_id, from_user_id: fromUserId, block_unblock: $scope.block_unblock}
//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            userService.block(params).success(function(r, status){

                if($scope.block_unblock=="BLOCK" || $scope.block_unblock=="Block" || $scope.block_unblock=="block")
                {
                    $scope.block_unblock="UNBLOCK";
                }
                else if($scope.block_unblock=="UNBLOCK" || $scope.block_unblock=="Unblock" || $scope.block_unblock=="unblock")
                {
                    $scope.block_unblock="BLOCK";
                }


            }).error(function(data, status) {});
        }
     }



//
     $scope.friend_unfriend = function()
     {
        if($scope.unfriend_str=="Rejected")
        {
            showMessage("You can not make another request as it is rejected");
            return false;
        }
        else if($scope.unfriend_str=="Pending")
        {
            showMessage("You can not make another request as it is pending from " + $scope.username);
            return false;
        }

        var params = {profile_user_id: profile_user_id, from_user_id: fromUserId, friend_str: $scope.unfriend_str}
//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            userService.friend_unfriend(params).success(function(r, status){

                if($scope.unfriend_str=="Make Friend")
                {
                    $scope.unfriend_str = "Pending";
                }
                else if($scope.unfriend_str=="Unfriend")
                {
                    $scope.unfriend_str="Make Friend";
                }
                else if($scope.unfriend_str=="Accept")
                {
                    $scope.unfriend_str="Unfriend";
                }

            }).error(function(data, status) {});
        }
     }

     var fav_cat_arr = new Array();
    var get_fav_categories = function()
    {
        var params = {user_id: _userObj.id};

        categoryService.getFavCat(params).success(function(r, status)
        {
            if(r.categories.length>=3)
            {
                $scope.show_view_all = 1;
            }
            if(r.categories.length>=1)
            {
                
                $scope.is_fav_exist = 1;
            }
            
            $scope.fav_cat_arr = r.categories;


        }).error(function(data, status) {});
    }
    
    get_fav_categories();
        
        
     CommonCode.init($scope);

  }]);



 userController.controller('logoutCtrl', ['$scope','$location',
  function($scope,$location) {
      _userObj = "";
      localStorage.removeItem('user_data');
      sessionStorage.removeItem('user_data');
      localStorage.removeItem('profile_image');
      localStorage.removeItem('profile_image_name_only');
      
    
    
     removeSessionStorage();
     removeLocalStorage();
//      window.location.reload();
      $location.path('/login');
  }]);


userController.controller('registerCtrl', ['$scope','registerService','$location','userService', 
  function($scope,registerService,$location, userService)
  {

           
//         removeSessionStorage();
//     removeLocalStorage();
     
    $scope.$watch('myPicture', function(value) {
        if(value) {

       var myarr = value.split("/");

        if(myarr.length>=1)
        {
           var lastIndex = parseInt(myarr.length-1);
           imageNameTemp = myarr[lastIndex]
        }
        //console.log(value);
        //showMessage(value);
        //showMessage(imageNameTemp);


        //$("#profile_image").attr("src", value);

        localStorage.setItem( "profile_image", imageNameTemp );
        localStorage.setItem( "profile_image_name_only", imageNameTemp);
        
        localStorage.setItem("is_avatar", "0");
        //var image = document.getElementById('profile_image');
        //image.src = "data:image/jpeg;base64," + value;

        //myPictures.push(value);
        }
        }, true);
    $scope.master = {};
    $scope.word = /^[a-z A-Z 0-9 _-]*$/;
    $scope.nameNumber = /^[a-z A-Z 0-9]*$/;
      $scope.userName = "xe";


    $scope.isUnchanged = function(user) {
       if($scope.loginForm.$valid)
       {
           return false;
       }
       else
       {
           return true;
       }
    };

    $scope.register = function(user) {
         registerService.jsonp_query(user,$scope.processRegister);
    };



//    $scope.user.country = 2;

    $scope.countryList = countryList.countries;

//    console.log($scope.countryList);


    $scope.avtar = avatarList;
    $scope.attach_profile_image = function(av)
    {
//        if(showConfirm("Are you sure you want to have this profile image?"))
        {
            localStorage.setItem("profile_image_name_only", av.imageName);
            localStorage.setItem("profile_image", "img/avtar/" + av.imageName);
            localStorage.setItem("is_avatar", "1");
            
            $location.path("/signup");
        }

    }
    $scope.signup1 = function(user)
    {
        if(!check_valid_username(user.txtUsername))
        {
            showMessage("Allowed characters for username are a-Z, A-Z 0-9 and _");
            return false;
        }
            
//        userService.check_duplicate_user
        var params = {username : user.txtUsername};
            //get all main level categories
        userService.check_duplicate_user(params).success(function(r, status)
        {
             if(r=="1")
             {
                 showMessage("Username not available, please try different username");
                 return false;
             }
             else
             {
                 var str = user.txtDob;
                 var year = parseInt(str.substring(0, 4));
                 var month = str.substring(5, 7);
                 var day = str.substring(8, 10);


                 if(year>2002)
                 {
                     showMessage("You must be at least 13 years old in order to use this app");
                     return false;
                 }
                 
//                 alert(year);
//                 alert(month);
//                 alert(day);
//                 return false;
                sessionStorage.setItem("txtUsername", user.txtUsername);
                sessionStorage.setItem("userDob", user.txtDob);

                $location.path('/signup2');
             }
             //console.log($scope.FriendList);
        }).error(function(data, status) {});
        
//        sessionStorage.setItem("txtName", user.txtName);

        
    };

    $scope.signup2 = function(user)
    { 
        
        
        if($.trim(user.country)=="")
        {
            user.country = 224;
        }
        
           var txtEmail=document.getElementById('txtEmail').value;
           if(txtEmail=="" || txtEmail==null){
                showMessage("Email Required!");
                document.getElementsById('txtEmail').focus();
                return false;
           }
           var txtEmail=document.getElementById("txtEmail").value;
                    var atpos=txtEmail.indexOf("@");
                      var dotpos=txtEmail.lastIndexOf(".");
                         if (atpos<1 || dotpos<atpos+2 || dotpos+2>=txtEmail.length)
                      {
                         showMessage("Email not valid!");
                         document.getElementById("txtEmail").focus();
                         return false;
                        }
                        
                        var txtPass=document.getElementById('txtPass').value;
                        if(txtPass=="" || txtPass==null)
                        {
                            showMessage("Password Required!");
                            document.getElementById('txtPass').focus();
                            return false;
                        }
                        if(txtPass.length<3)
                        {
                            showMessage("Password should be at least 3 characters! ");
                            document.getElementById('txtPass').focus();
                            return false;
                        }
        user.txtUsername =  sessionStorage.getItem("txtUsername");
                                           
        user.dob  =  sessionStorage.getItem("userDob");
           
//        alert(parseInt($( "#country" ).val())+1);
        if(user.country!="224")
        {
            user.country  =  parseInt($( "#country" ).val())+1;
        }
                                           

//        showMessage(user.country);
//        return false;
        
        user.profile_image_name = localStorage.getItem( "profile_image_name_only");
                                      
        var profile_image_var  = localStorage.getItem( "profile_image" );
        
        if(typeof(localStorage.getItem( "profile_image" ))=="undefined" || typeof(profile_image_var)==="null" || profile_image_var==="null" || typeof(profile_image_var)===null )
        {
  
            user.profile_image_name = "Special_Ninja.png";
            

        }
        
//        if(!(user.country) || user.country==0)
//        {
//            showMessage("Please select country");
//            return false;
//        }
        
        var params = {profile_image_name: user.profile_image_name, txtUsername:user.txtUsername, dob:user.dob, country:user.country, txtEmail:user.txtEmail, txtPass:user.txtPass, is_avtar:localStorage.getItem("is_avatar")};   
        

        userService.register(params).success(function(r, status)
        {
             if(r.msg.length)
             {
                 var m = '';
                for(var i in r.msg)
                {
                    m += r.msg[i]+ '\n';
                }
                showMessage(m);
             }

//             
//             if(r.user_id>=1 && localStorage.getItem("is_avatar")!=1)
//             {
//                 
//                var params = {user_id : r.user_id, photo : r.user_id + "_" + localStorage.getItem("profile_image_name_only"), type:'' , is_avtar: 0 };
//                userService.updatePhoto(params).success(function(resultTemp, status)
//                {            
//                    
//                    sessionStorage.setItem("photoChanged", "0");
//
//                    sessionStorage.removeItem("ImageType");
//
//                    localStorage.setItem("profile_image_name_only", r.user_id + "_" + localStorage.getItem("profile_image_name_only"));
//                    localStorage.setItem("profile_image", r.user_id + "_" + localStorage.getItem("profile_image"));
//                    localStorage.setItem("is_avatar", "0");
//
//                }).error(function(data, status){
//                    alert(status);
//                    alert(data);
//                    console.log(status);
//                    console.log(data);
//                });
//              
//                
//             }
             
             if(r.status == 1)
             {
                sessionStorage.removeItem("txtUsername");
                sessionStorage.removeItem("txtEmail");
                sessionStorage.removeItem("txtPass");
                sessionStorage.removeItem("txtName");
                sessionStorage.removeItem("userDob");

                showMessage("Registration successful, please login with your credentials! ");
                $location.path('/login');
//                alert("With ISlam");
//                $scope.apply();
             }
             
             
        }).error(function(data, status) {});     
        
    };



    $scope.processSignup2 = function(r) {


//        showMessage($("#country_id").val());
         if(r.msg.length)
         {
             var m = '';
            for(var i in r.msg)
            {
                m += r.msg[i]+ '\n';
            }
            showMessage(m);
         }

         if(r.status == 1)
         {
            sessionStorage.removeItem("txtUsername");
            sessionStorage.removeItem("txtEmail");
            sessionStorage.removeItem("txtPass");
            sessionStorage.removeItem("txtName");
            sessionStorage.removeItem("userDob");

            showMessage("Registration successful, please login with your credentials! ");
            $location.path('/login');
         }
    };


    $scope.gotoTerms = function(user)
    {
        sessionStorage.setItem("txtUsername", user.txtUsername);
        sessionStorage.setItem("txtEmail", user.txtEmail);
        sessionStorage.setItem("txtPass", user.txtPass);

        $location.path('/terms');
    };

//    $scope.gotoAvtar = function(){
//        
//        $('#myModal').modal('hide');
//        $('.modal-backdrop').remove();
//        $location.path('/avtar');
//    };

    $scope.inProgress = function(){
        showMessage("Function in progress");
        return false;
    };


    $scope.gotoSignup2 = function(){
        $location.path('/signup2');
    };



    var init = function ()
    {
        $("#dobinfomodel").find('div.title').click(function(){
            if($("#dobinfomodel").find('div.data').is(':visible'))
            {
                $("#dobinfomodel").find('div.data').slideUp(500);
            }
            else
            {
                $("#dobinfomodel").find('div.data').slideDown(500);
            }

        });

        $("#dobinfomodel").find('div.data').click(function(){
          $(this).slideUp(500);
        });


    }

    $scope.getImagePopup = function()
    {
        $('#myModal').modal();
        sessionStorage.setItem("ImageType", "photo");
    }

    $scope.processRegister = function(r) {
         if(r.msg.length)
         {
             var m = '';
            for(var i in r.msg)
            {
                m += r.msg[i]+ '\n';
            }
            showMessage(m);
         }

         if(r.status == 1)
         {
             $location.path('/login');
         }
    };

    $scope.gotoLogin = function(){
        $location.path('/login');
    };

    init();

    $scope.user = {
        txtName:sessionStorage.getItem("txtName")?sessionStorage.getItem("txtName"):"",
        txtDob:sessionStorage.getItem("userDob")?sessionStorage.getItem("userDob"):"",
        txtUsername:sessionStorage.getItem("txtUsername")?sessionStorage.getItem("txtUsername"):"",
        txtEmail:sessionStorage.getItem("txtEmail")?sessionStorage.getItem("txtEmail"):"",
        txtPass:sessionStorage.getItem("txtPass")?sessionStorage.getItem("txtPass"):"",
//        country:$scope.countryList[2],
        profile_image:localStorage.getItem("profile_image")?localStorage.getItem("profile_image"):"img/avtar/Special_Ninja.png",
        profile_image_name : localStorage.getItem("profile_image")?localStorage.getItem("profile_image"):"img/avtar/Special_Ninja.png",
        profile_image_name_only : localStorage.getItem("profile_image_name_only")?localStorage.getItem("profile_image_name_only"):"Special_Ninja.png"
    };



  }]);



 userController.controller('userSettingsCtrl', ['$scope','$location','socialService',
  function($scope,$location, socialService) {

    var obj_settings = JSON.parse(localStorage.getItem('user_settings'));
    
    if(!obj_settings)
    {
        obj_settings =  {};
    }
    console.log(obj_settings);
    
    $scope.music = true;
    $scope.sounds = true;
    $scope.vibration = true;
    $scope.challenges = true;
    $scope.chats = true;
    $scope.comments = true;
    $scope.rounds = true;
    $scope.events = true;
    $scope.system = true;
    
    if(typeof obj_settings.music != 'undefined' )
    {
        $scope.music = obj_settings.music;
    }
    if(typeof obj_settings.sounds != 'undefined')
    {
        $scope.sounds = obj_settings.sounds;
    }
    if(typeof obj_settings.vibration != 'undefined' )
    {
        $scope.vibration = obj_settings.vibration;
    }
    if(typeof obj_settings.challenges != 'undefined')
    {
        $scope.challenges = obj_settings.challenges;
    }
    if(typeof obj_settings.chats != 'undefined' )
    {
        $scope.chats = obj_settings.chats;
    }
    if(typeof obj_settings.comments != 'undefined' )
    {
        $scope.comments =  obj_settings.comments;
    }
    if(typeof obj_settings.rounds != 'undefined' )
    {
        $scope.rounds =  obj_settings.rounds;
    }
    if(typeof obj_settings.events != 'undefined')
    {
        $scope.events = obj_settings.events;
    }
    if(typeof obj_settings.system != 'undefined')
    {
        $scope.system = obj_settings.system;
    }
    
    
    
    $scope.$watch('music', function() {
      obj_settings.music = $scope.music;            
      localStorage.setItem('user_settings', JSON.stringify(obj_settings));
    });
    
    $scope.$watch('sounds', function() {
      obj_settings.sounds = $scope.sounds;            
      localStorage.setItem('user_settings', JSON.stringify(obj_settings));
    });
    
    $scope.$watch('vibration', function() {
      obj_settings.vibration = $scope.vibration;            
      localStorage.setItem('user_settings', JSON.stringify(obj_settings));
    });
    
    $scope.$watch('challenges', function() {
      obj_settings.challenges = $scope.challenges;            
      localStorage.setItem('user_settings', JSON.stringify(obj_settings));
    });
    
    $scope.$watch('chats', function() {
      obj_settings.chats = $scope.chats;            
      localStorage.setItem('user_settings', JSON.stringify(obj_settings));
    });
    
    $scope.$watch('comments', function() {
      obj_settings.comments = $scope.comments;            
      localStorage.setItem('user_settings', JSON.stringify(obj_settings));
    });
    
    $scope.$watch('rounds', function() {
      obj_settings.rounds = $scope.rounds;            
      localStorage.setItem('user_settings', JSON.stringify(obj_settings));
    });
    
    $scope.$watch('events', function() {
      obj_settings.events = $scope.events;            
      localStorage.setItem('user_settings', JSON.stringify(obj_settings));
    });
    
    $scope.$watch('system', function() {
      obj_settings.system = $scope.system;            
      localStorage.setItem('user_settings', JSON.stringify(obj_settings));
    });
    
    $scope.music_class = "bootstrap-switch-off";
    $scope.music_chk = "checked";
    $scope.settings_active = "active";    
    
    $scope.connectToFB = function(){
        var user_settings = localStorage.getItem('user_settings');
        if(user_settings){
            user_settings = JSON.parse(user_settings);
            if(user_settings.fb_email){
                if(confirm("You have already connected with facebook email as : " + user_settings.fb_email+ " \n Do you want to change it ?")){
                    connectToFB();
                }
            }
            else{
                connectToFB();
            }
        }
    }
    
    function connectToFB(){
       
       var callback = function(params){
            
            socialService.connectToFB({user_id : _userObj.id, fb_email :params.email }).success(function(r, status){                
                if(r.status == 1){
                    var user_settings = localStorage.getItem('user_settings');
                    if(user_settings){
                        user_settings = JSON.parse(user_settings);
                        user_settings.fb_email = params.email;
                        localStorage.setItem('user_settings', JSON.stringify(user_settings));                        
                        showMesssage("Your Facebook account "+ params.name +" has been connected successfully");
                    }
                }
                else if(r.status == 2){
                    showMesssage("This Facebook account "+ params.name +" is already connected with some other account.");
                }
                
            }).error(function(data, status){});
       };
       
       socialService.getFBInfo(callback);
    }
        
  }]);


userController.controller('editProfileCtrl', ['userService', 'CommonCode', '$routeParams', '$scope','$location',
  function(userService, CommonCode, $routeParams, $scope,$location) 
  {
      
      $scope.$watch('myPicture', function(value) {
        if(value) {

        var myarr = value.split("/");

         if(myarr.length>=1)
         {
            var lastIndex = parseInt(myarr.length-1);
            imageNameTemp = myarr[lastIndex]
         }
//                                                         

         localStorage.setItem( "profile_image", _userObj.id+ "_" + imageNameTemp );
         localStorage.setItem( "profile_image_name_only", _userObj.id+ "_" + imageNameTemp);
         
         localStorage.setItem("is_avatar", "0");
         
         //var image = document.getElementById('profile_image');
         //image.src = "data:image/jpeg;base64," + value;
//                                                         alert("Last");
         //myPictures.push(value);
         }
         }, true);
                                                         
    
      
      
    $scope.profile_active = "active";
    
    $scope.showFavouriteCategories = function(){
        $location.path('/list_fav_cat');
    }
    
    var image_path = CommonCode.getImagePath('user', 'big');
    
    
     if(_userObj.photo=="")
     {
         $scope.photo = image_path + '/no_image.png';
     }
     else
     {
         $scope.photo = image_path + '/' + _userObj.photo;
     }
     
     $scope.photo = replace_slashes_from_photos($scope.photo);
//     alert($scope.photo);
     //var res = str.replace(/blue/g, "red");


     //$scope.photo = $scope.photo.replace(/\/\//g, "/");
        
    //alert($scope.photo);
    var getUserCompleteDetails = function()
    {
        var params = {userId: _userObj.id};
        
        userService.getUserCompleteDetails(params).success(function(r, status){
            
            $scope.fname = r.data.fname;
            $scope.lname = r.data.lname;
            $scope.gender = r.data.gender;
            $scope.state_name = r.data.state;
            $scope.about_me = r.data.about_me;
            $scope.city = r.data.home_city;
            $scope.fav_cats = r.cat_str;
          
            var cover_image_path = CommonCode.getImagePath('cover_image', 'big');
         
         
            if(r.data.cover_image=="")
            {
                $scope.cover_image = "img/black.jpg";
            }
            else
            {
                $scope.cover_image = cover_image_path + '/' + r.data.cover_image;
            }
            $scope.cover_image = replace_slashes_from_photos($scope.cover_image);
            
            $scope.genders = [
                {name:'Female'},
                {name:'Male'},
                {name:'Other'}
              ];
            $scope.myGender = $scope.genders[$scope.gender];
            
            
            
//            $scope.locations = r.locations[0].zip_code;
            if (typeof r.locations !== 'undefined' && r.locations.length > 0) 
            {
                $scope.locationsArr = r.locations;
                $scope.location_length = r.locations.length;
                
            }

            var year    = r.data.dob.substring(0, 4);
            var month   = r.data.dob.substring(4, 6);
            var day     = r.data.dob.substring(6, 8);
            
//            $scope.dob = month + "/" + day + "/" + year;
            $scope.dob = year + "-" + month + "-" + day;
//            $scope.dob = "2012-05-05";
            
        }).error(function(data, status) {});
    }    
    
    getUserCompleteDetails();
    
    
    $scope.update_profile = function(from_fav_cat_btn)
    {
        
        var city = $( "#city" ).val();
        var fname = $( "#txtName" ).val();
        var gender = $( "#gender" ).val();
        var dob = $( "#dob" ).val();
        var about_me = $( "#about_me" ).val();
        var state = $( "#state" ).val();
        
        var params = {userId: _userObj.id, city: city, fname: fname, gender:gender, dob:dob, about_me:about_me, state:state};
        
        userService.updateProfile(params).success(function(r, status){
            
            
            var str = $( "#txtName" ).val();
            var name = str.split(" ");
            var lname = "";
            
            if (typeof name !== 'undefined' && name.length > 0) {
                // the array is defined and has at least one element
                if(name[0])
                {
                    var fname = name[0];
                }
                
                if(typeof(name[1])!="undefined")
                {
                    var lname = name[1];
                }
                if(typeof(name[2])!="undefined")
                {
                    lname += " "+name[2];
                }
                
                    
            }
            
            var obj = {
                id:_userObj.id,
                fname : fname,
                lname : lname,
                email : _userObj.email,
                username : _userObj.username,
                photo : _userObj.photo
            }

            localStorage.setItem('user_data', JSON.stringify(obj));
            
            
//                alert(from_fav_cat_btn);
                if(from_fav_cat_btn==1)
                {
                    $location.path("/list_fav_cat");
                }
                else
                {
                    $location.path("/my_profile");
                }
        }).error(function(data, status) {});        
    }
	
	$scope.showLocation = function()
    {
        var ReverseGeocode = function () {

            //This is declaring the Global variables
            var geocoder, map, marker;

            //This is declaring the 'Geocoder' variable
            geocoder = new google.maps.Geocoder();

            function GeoCode(latlng) {

                // This is making the Geocode request
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {

                    if(status !== google.maps.GeocoderStatus.OK)
                    {
                        showMessage(status);
                    }
                    // This is checking to see if the Geoeode Status is OK before proceeding    
                    if (status == google.maps.GeocoderStatus.OK) {

//                        console.log(results);
                        var address = (results[0].formatted_address);

                        sessionStorage.setItem("user_address", address);
                        $("#myModalsLocation").modal("show");
                        $("#myModalLabelsLoc").html(address);
//                        showMessage(results[0].formatted_address);
                    }
                });
            }

            return {

                Init: function () {

                    navigator.geolocation.getCurrentPosition(function(position) {
                    $scope.position=position;
                    var latlng = new google.maps.LatLng($scope.position.coords.latitude, $scope.position.coords.longitude);
                    
                    GeoCode(latlng);
//                    showMessage($scope.position.coords.latitude);
//                    showMessage($scope.position.coords.latitude);
//                    $scope.$apply();
                    },function(e) { console.log("Error retrieving position " + e.code + " " + e.message) });
                },
            };
        } ();
        
        ReverseGeocode.Init();
	}
    
    $scope.saveAsHome = function(is_home_location)
    {
        
        if($scope.location_length>=5)
        {
            showMessage("You can add max 5 locations, please remove the added locations in order to add new one");
            return false;
        }
//        showMessage(sessionStorage.getItem("user_address"));

        var params = {user_id: _userObj.id, address: sessionStorage.getItem("user_address"), zip_code:'123456', is_home_location:is_home_location};
        userService.saveAsHome(params).success(function(r, status){
            
            $scope.locationsArr = r.locations;
            $scope.location_length = r.locations.length;
            sessionStorage.removeItem("user_address");
        }).error(function(data, status) {});   
        
    }
    
    $scope.removeLocation = function(id)
    {
        var params = {user_id: _userObj.id, id:id};
        userService.removeLocation(params).success(function(r, status)
        {
            $scope.locationsArr = r.locations;
            $scope.location_length = r.locations.length;
        }).error(function(data, status) {});          
    }
    
    $scope.getImagePopup = function()
    {
         
        $('#myModal').modal();
      
        sessionStorage.setItem("ImageType", "photo");
    }
    
    $scope.getImagePopupCover = function()
    {
       
        $('#myModalCoverImage').modal();
        sessionStorage.setItem("ImageType", "cover");
    }
    
//    $scope.gotoAvtar = function(){
//        
//        $('#myModal').modal('hide');
//        $('.modal-backdrop').remove();
//        $location.path('/avtar2');
//    };
    
    $scope.avtar = avatarList;
    $scope.attach_profile_image = function(av)
    {
//        if(showConfirm("Are you sure you want to have this profile image?"))
        {
            localStorage.setItem("profile_image_name_only", av.imageName);
            localStorage.setItem("profile_image", "img/avtar/" + av.imageName);
            
            localStorage.setItem("is_avatar", "1");
            
            var obj = {
                id:_userObj.id,
                fname : _userObj.fname,
                lname : _userObj.lname,
                email : _userObj.email,
                username : _userObj.username,
                photo : av.imageName
            }

            localStorage.setItem('user_data', JSON.stringify(obj));
            
            var params = {user_id: _userObj.id, photo: av.imageName, is_avtar:localStorage.getItem("is_avatar")};
            
            userService.update_avtar(params).success(function(r, status)
            {
                showMessage(r.msg);
                $location.path("/edit_profile");
            }).error(function(data, status) {});   


            
        }

    }
    
  }]);

