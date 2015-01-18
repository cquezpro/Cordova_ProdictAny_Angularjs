'use strict';

/* Controllers */

var friendsController = angular.module('friendsController', ['chatServices', 'userServices', 'categoryServices', 'friendsServices']);


 
 friendsController.controller('friendsCtrl', ['$rootScope','$routeParams','$scope','friendsServices', '$location', 'CommonCode','groupService','filterFilter',
  function($rootScope,$routeParams,$scope,friendsServices, $location, CommonCode, groupService, filterFilter) 
  {
      $scope.no_group_message = 1;
      $scope.hide_show_group = function(id)
      {
          $("#group_" + id).toggleClass("collapse-group");
		  $("#group_" + id).toggleClass("expand-group");
      };
	  
	  $scope.hide_show_group_chat= function(id)
      {
          //$("#group_Chat_" + id).find("#send-message").slideToggle();
          $("#send_message_"+ id).slideToggle();
      };
      
//     $(".reply").click(function(){
//       
////       $(this).find(".collapse-group").toggleClass("expand-group");
//   });
    var user_id = _userObj.id;

    var type = $routeParams.type; 
    var opp_user_id = $routeParams.opp_user_id; 
    
    $scope.show_send_msg_html = 0;
    $scope.show_send_message_temp = 0;
    if(opp_user_id>0)
    {
        $scope.show_send_msg_html = 1;
        $scope.show_send_message_temp = 1;
    }
   
    
    var processGetChat = function(r)
    {
         $scope.ItemList = [];
         var ago_str = "";
         for (var i=0; i< r.length; i++)
         {
             var obj = {};
//             ago_str = CommonCode.getTimeAgo(r[i].created_date);
             ago_str = r[i].created_date;

//             alert(ago_str);
//             obj.created_date = jQuery.timeago(ago_str);
             obj.created_date = ago_str;
             obj.comments = r[i].comments;
             
             var image_path = CommonCode.getImagePath('user', 'big');
             obj.photo = "";
             if(r[i].photo=="" || r[i].photo==null)
             {
                 obj.photo = image_path + '/no_image.png';
             }
             else
             {
                 obj.photo = image_path + '/' + r[i].photo;
             }
             obj.photo = replace_slashes_from_photos(obj.photo);
             obj.fname = r[i].fname;
             obj.lname = r[i].lname;
             obj.id = r[i].id;

             $scope.ItemList.push(obj);
         }
         console.log($scope.ItemList);
     };
    
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
    }  
    
    $scope.getFriends = function()
    {   
        var params = {userId : user_id, name : name}
        //get all main level categories
        friendsServices.getFriends(params).success(function(r, status){
            $scope.list = r.friends;                
            //This will display the friends list in friends tab
            $scope.list = filterFilter($scope.list, $scope.txtFriends);
            
            $scope.list = paginateList($scope.list)
            
            $scope.image_server_url = imageServerUrl;
            $scope.image_server_path = imageUserSmall;
            
        }).error(function(data, status) {
      });
    };
   
    $scope.getMessages = function()
    {   
        $scope.user_id = user_id;
        var params = {userId : user_id, opp_user_id : opp_user_id, type : type}
        //get all main level categories
        friendsServices.getMessages(params).success(function(r, status){

            
             $scope.messageList = [];
             var ago_str = "";
             
//             alert(r.friends.length);
//             if(typeof(r.friends.length)=="undefined")
//             {
//                 
//             }
             if (r.friends instanceof Array)
             {
                for (var i=0; i< r.friends.length; i++)
                {

                    var obj = {};
   //                 ago_str = CommonCode.getTimeAgo(r.friends[i].created_date);
                    ago_str = r.friends[i].created_date;

       //             obj.created_date = jQuery.timeago(ago_str);
                    obj.created_date = ago_str;
   //                 obj.comments = r.friends[i].comments;
                    obj.comments = wordwrap(r.friends[i].comments, 15, '\n', 1);

                    obj.photo = r.friends[i].photo;

                    var image_path = CommonCode.getImagePath('user', 'mini');
                    if(r.friends[i].photo=="")
                    {
                        obj.photo = image_path + '/no_image.png';
                    }
                    else
                    {
                        obj.photo = image_path + '/' + r.friends[i].photo;
                    }


                    obj.photo = replace_slashes_from_photos(obj.photo);
                    
                    obj.fname = r.friends[i].fname;
                    obj.id = r.friends[i].id;
                    obj.username = r.friends[i].username;
                    $scope.messageList.push(obj);
                }
            

            // console.log($scope.messageList);
            $scope.opp_user_id = r.friends.opp_user_id;
            //$scope.messageList = r.friends;    
            $scope.image_server_url = imageServerUrl;
            $scope.image_server_path = imageUserMini;
            }
            
        }).error(function(data, status) {
      });
    };
    
    
    $scope.getAllGroupsShort = function()
    {           
        $scope.user_id = user_id;
        var params = {userId : user_id}
        //get all main level categories
        groupService.getAllGroupsShort(params).success(function(r, status)
        {
            
            console.log(r);
             $scope.groupShortList = [];
             var ago_str = "";
             for (var i=0; i< r.groups.length; i++)
             {
                 
                 var obj = {};
//                 ago_str = CommonCode.getTimeAgo(r.friends[i].created_date);
//                 
//                 obj.photo = r.friends[i].photo;
//
//                 var image_path = CommonCode.getImagePath('user', 'mini');
//                 if(r.friends[i].photo=="")
//                 {
//                     obj.photo = image_path + '/no_image.png';
//                 }
//                 else
//                 {
//                     obj.photo = image_path + '/' + r.friends[i].photo;
//                 }

                 obj.name = r.groups[i].name;
                 obj.id = r.groups[i].id;
                 obj.friends = wordwrap(r.groups[i].friends, 80, '\n', true);
                 obj.comments = r.groups[i].comments;
                 
                 
                var image_path = CommonCode.getImagePath('user', 'small');
                if(r.groups[i].photo=="")
                {
                    obj.photo = image_path + '/no_image.png';
                }
                else
                {
                    obj.photo = image_path + '/' + r.groups[i].photo;
                }


                obj.photo = replace_slashes_from_photos(obj.photo);

                 obj.created_date = r.groups[i].created_date;
                 $scope.groupShortList.push(obj);
             }

//            // console.log($scope.messageList);
//            $scope.opp_user_id = r.friends.opp_user_id;
//            //$scope.messageList = r.friends;    
//            $scope.image_server_url = imageServerUrl;
//            $scope.image_server_path = imageUserMini;
            
        }).error(function(data, status) {
      });
    };
    
    $scope.getRequests = function()
    {   
        $scope.user_id = user_id;
        var params = {userId : user_id}
        
        $scope.accept_challenge = "Accept";
        //get all main level categories
        friendsServices.getRequests(params).success(function(r, status)
        {
             $scope.requestList = [];
             var ago_str = "";
             for (var i=0; i< r.friends.length; i++)
             {   
                 var obj = {};
//                 ago_str = CommonCode.getTimeAgo(r.friends[i].created_date);
//
//    //             obj.created_date = jQuery.timeago(ago_str);
//                 obj.created_date = ago_str;
                 obj.comments = r.friends[i].comments;
                 obj.photo = r.friends[i].photo;

                 var image_path = CommonCode.getImagePath('user', 'mini');
                 if(r.friends[i].photo=="")
                 {
                     obj.photo = image_path + '/no_image.png';
                 }
                 else
                 {
                     obj.photo = image_path + '/' + r.friends[i].photo;
                 }

                 obj.photo = replace_slashes_from_photos(obj.photo);
                 
                 obj.fname = r.friends[i].fname;
                 obj.id = r.friends[i].id;
                 obj.username = r.friends[i].username;
                 
                 obj.accept_class = "";
                 if(r.friends[i].status=="0")
                 {
                    obj.accept_challenge ="Accept";
                    obj.accept_class = "request-accept";
                 }
                 else if(r.friends[i].status=="1")
                 {
                    obj.accept_challenge ="Challenge";
                 }


                console.log(obj);
                $scope.requestList.push(obj);
             }

            //This will display the friends list in friends tab
            $scope.requestList = filterFilter($scope.requestList, $scope.txtFriends);
            $scope.requestList = paginateList($scope.requestList);
            
            $scope.opp_user_id = r.friends.opp_user_id;
            //$scope.messageList = r.friends;    
            $scope.image_server_url = imageServerUrl;
            $scope.image_server_path = imageUserMini;
            
        }).error(function(data, status) {
      });
    };
    
    $scope.getInvitableFriends = function()
    {
        $scope.user_id = user_id;
        var params = {userId : user_id}
        
        $scope.accept_challenge = "Accept";
        //get all main level categories
        friendsServices.getInvitableFriends(params).success(function(r, status)
        {
            
             $scope.inviteList = [];
             var ago_str = "";
             for (var i=0; i< r.friends.length; i++)
             {   
                 var obj = {};
                 obj.comments = r.friends[i].comments;
                 obj.photo = r.friends[i].photo;

                 var image_path = CommonCode.getImagePath('user', 'small');
                 if(r.friends[i].photo=="")
                 {
                     obj.photo = image_path + '/no_image.png';
                 }
                 else
                 {
                     obj.photo = image_path + '/' + r.friends[i].photo;
                 }
                 obj.photo = replace_slashes_from_photos(obj.photo);
                 
//                 console.log(obj.photo);
                 obj.fname = r.friends[i].fname;
                 obj.username = r.friends[i].username;
                 obj.id = r.friends[i].id;
                 $scope.inviteList.push(obj);
             }

            $scope.opp_user_id = r.friends.opp_user_id;
            //$scope.messageList = r.friends;    
            $scope.image_server_url = imageServerUrl;
            $scope.image_server_path = imageUserMini;
            
            //This will display the friends list in friends tab
            $scope.inviteList = filterFilter($scope.inviteList, $scope.txtFriends);
            $scope.inviteList = paginateList($scope.inviteList)

        }).error(function(data, status) {
      });
    }
    

    $scope.iniitialise = function()
    {
        $scope.type = type;
        $scope.friends_class='';
    
        if(type=="friends")
        {
            if($scope.friends_class!="active")
            {
                $scope.friends_class='active';
                $scope.getFriends();
                $scope.getGroups($scope.txtFriends);
            }
        }
        else if(type=="messages")
        {
            $scope.no_group_message=0;
            if($scope.messages_class!="active")
            {
                $scope.messages_class='active';
                $scope.getMessages(opp_user_id);
                
                $scope.getAllGroupsShort(_userObj.id);
                
            }
        }
        else if(type=="request")
        {
            $scope.request_class='active';
            $scope.getRequests(user_id);
        }
        else if(type=="invite")
        {
            $scope.invite_class='active';
            $scope.getInvitableFriends(user_id);
        }
        else if(type=="group_message")
        {
            
            if($scope.messages_class!="active")
            {
                $scope.messages_class='active';

                var group_id = opp_user_id;
                $scope.getMessages(group_id);
            }
        }
    }
     
    $scope.send_direct_group_message = function(group_id)
    {
        
        if($.trim($("#direct_message_" + group_id).val())=="")
        {
            showMessage("Please enter some content");
            return false;
        }
        var params = {userId : user_id, msg : $("#direct_message_" + group_id).val(), group_id:group_id, type:'group_message'}
        //get all main level categories
        friendsServices.sendGroupMessage(params).success(function(r, status)
        {
             $("#direct_message_" + group_id).val( '' );
             $("#send_message_" + group_id).slideToggle();
             
//             $( ".forappend" ).append("<div class='row inner-category-send-wrapper'><div class='message-head-sect'><div class='col-xs-6 noPadding pull-left'>"+_userObj.username+"</div><div class='col-xs-6 right paddingR'>"+ago_str+"</div></div><div class='row noMargin'><div class='col-xs-11 nopad'><span class='discussion-name-right sent-text'>"+msg.messageTxt+"</span></div><div class='col-xs-1 noPadding'><img class='img-responsive pull-right margin5'  ng-click='go_to_page_direct('profile', "+_userObj.id+")' src='"+image_path+"'></div></div></div>");
//             
        }).error(function(data, status) {
      });
      
    }
    $scope.send_message = function(msg, opp_user_id_hidden)
    {   
        
        if(typeof(msg)=="undefined" )
        {
            showMessage("Please enter chat content");
            return false;
        }
        else
        {
            if(msg.messageTxt=="")
            {
                showMessage("Please enter chat content");
                return false;
            }
        }
         var opponent_id =0;
        opponent_id = opp_user_id_hidden ? opp_user_id_hidden : opp_user_id;
        var params = {userId : user_id, msg : msg.messageTxt, opp_user_id:opponent_id};
        
        
        //get all main level categories
        friendsServices.sendMessage(params).success(function(r, status)
        {
            
             var ago_str =  jQuery.timeago(new Date());
             var image_path = imageServerUrl + imageUserMini + _userObj.photo;
             
             
             $( ".forappend" ).append("<div class='row inner-category-send-wrapper'><div class='message-head-sect'><div class='col-xs-6 noPadding pull-left'>"+_userObj.username+"</div><div class='col-xs-6 right paddingR'>"+ago_str+"</div></div><div class='row noMargin'><div class='col-xs-11 nopad'><span class='discussion-name-right sent-text'>"+msg.messageTxt+"</span></div><div class='col-xs-1 noPadding'><img class='img-responsive pull-right margin5'  ng-click='go_to_page_direct('profile', "+_userObj.id+")' src='"+image_path+"'></div></div></div>");
         
//             $( ".forappend" ).append("<div class='row inner-category-send-wrapper'><div class='row noMargin'><div class='col-xs-11 nopad'><span class='discussion-name-right'>"+$scope.txtChat+"</span></div><div class='col-xs-1 noPadding'><img class='img-responsive pull-right margin5' src='"+image_path+"'></div><div class='time-stamp-left'>"+_userObj.fname+" | "+ago_str+"</div></div></div>" );

             msg.messageTxt="";
        }).error(function(data, status) {
      });
    };
    
    
    $scope.send_group_message = function(msg, opp_user_id_hidden)
    {   
        var type = $routeParams.type; 
        var group_id = $routeParams.opp_user_id; 
        
        
        if(typeof(msg)=="undefined" )
        {
            showMessage("Please enter chat content");
            return false;
        }
        else
        {
            if(msg.messageTxt=="")
            {
                showMessage("Please enter chat content");
                return false;
            }
        }

        var params = {userId : user_id, msg : msg.messageTxt, group_id:group_id, type:type}
        //get all main level categories
        friendsServices.sendGroupMessage(params).success(function(r, status)
        {
             var ago_str =  jQuery.timeago(new Date());
             var image_path = imageServerUrl + imageUserMini + _userObj.photo;
//             console.log(_userObj);
             $( ".forappend" ).append("<div class='row inner-category-send-wrapper'><div class='message-head-sect'><div class='col-xs-6 noPadding pull-left'>"+_userObj.username+"</div><div class='col-xs-6 right paddingR'>"+ago_str+"</div></div><div class='row noMargin'><div class='col-xs-11 nopad'><span class='discussion-name-right sent-text'>"+msg.messageTxt+"</span></div><div class='col-xs-1 noPadding'><img class='img-responsive pull-right margin5'  ng-click='go_to_page_direct('profile', "+_userObj.id+")' src='"+image_path+"'></div></div></div>");
         
//             $( ".forappend" ).append("<div class='row inner-category-send-wrapper'><div class='row noMargin'><div class='col-xs-11 nopad'><span class='discussion-name-right'>"+$scope.txtChat+"</span></div><div class='col-xs-1 noPadding'><img class='img-responsive pull-right margin5' src='"+image_path+"'></div><div class='time-stamp-left'>"+_userObj.fname+" | "+ago_str+"</div></div></div>" );

             msg.messageTxt="";
        }).error(function(data, status) {
      });
    };
    
    $scope.accept_challenge_fn = function(opp_user_id)
    {
        
        
        var params = {opp_user_id : opp_user_id, accept_challenge_str : $("#accept_challenge_str_"+opp_user_id).html(), user_id : user_id}
        
        
        if($("#accept_challenge_str_"+opp_user_id).html()=="CHALLENGE" || $("#accept_challenge_str_"+opp_user_id).html()=="Challenge")
        {
            $scope.challengeToEntity(opp_user_id,'user');
            $location.path("/category_l1");
        }
        else
        {
            friendsServices.acceptChallengeFn(params).success(function(r, status)
            {
    //            requestList[0].accept_challenge = "Challenge";
    //            $scope.accept_challenge = "Challenge";

                $("#accept_challenge_str_"+opp_user_id).html("Challenge");

                $("#accept_challenge_str_"+opp_user_id).removeClass("request-accept");

                $("#close_icon_" + opp_user_id).remove();

            
            }).error(function(data, status) {
          });
        }
    }
    
    $scope.reject = function(opp_user_id)
    {
        var params = {opp_user_id : opp_user_id, user_id : user_id}
        
        friendsServices.rejectFn(params).success(function(r, status)
        {

            $("#request_" + opp_user_id).remove();
            
        }).error(function(data, status) {
      });
    }
    CommonCode.init($scope);
     
    $scope.getGroups = function(nm)
    {
        if(!nm){
            nm = '';
        }
        var params = {userId : _userObj.id, name : nm, created_by_me_only:1}
//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            groupService.getGroups(params).success(function(r, status)
            {
                 $scope.GroupList = [];
                 var ago_str = "";
                 for (var i=0; i< r.records.length; i++)
                 {
                     var obj = {};

                     obj.name = r.records[i].name;

                     var image_path = CommonCode.getImagePath('user', 'mini');
                     obj.photo = "";
                     if(r.records[i].photo=="" || r.records[i].photo==null)
                     {
                         obj.photo = image_path + '/no_image.png';
                     }
                     else
                     {
                         obj.photo = image_path + '/' + r.records[i].photo;
                     }

                     obj.photo = replace_slashes_from_photos(obj.photo);
                     
                     obj.fname = r.records[i].fname;
                     obj.lname = r.records[i].lname;
                     obj.id = r.records[i].id;
                         
                     obj.photo0 = image_path + '/no_image.png';
                     obj.photo0 = replace_slashes_from_photos(obj.photo0);
                     obj.photo1 = image_path + '/no_image.png';
                     obj.photo1 = replace_slashes_from_photos(obj.photo1);
                     
                     obj.photo2 = image_path + '/no_image.png';
                     obj.photo2 = replace_slashes_from_photos(obj.photo2);
                     obj.photo3 = image_path + '/no_image.png';
                     obj.photo3 = replace_slashes_from_photos(obj.photo3);
                         
                     if(typeof(r.records[i].photos)!="undefined")
                     {
                         for(var k=0; k<4;k++)
                         {
                             if (typeof r.records[i].photos[k] !== 'undefined' && r.records[i].photos[k] !== null) 
                             {
                                 if(k==0)
                                 {
                                     obj.photo0 = image_path + "/" + r.records[i].photos[k];
                                     obj.photo0 = replace_slashes_from_photos(obj.photo0);
                                 }
                                 else if(k==1)
                                 {
                                     obj.photo1 = image_path + "/" + r.records[i].photos[k];
                                     obj.photo1 = replace_slashes_from_photos(obj.photo1);
                                 }else if(k==2)
                                 {
                                     obj.photo2 = image_path + "/" + r.records[i].photos[k];
                                     obj.photo2 = replace_slashes_from_photos(obj.photo2);
                                 }else if(k==3)
                                 {
                                     obj.photo3 = image_path + "/" + r.records[i].photos[k];
                                     obj.photo3 = replace_slashes_from_photos(obj.photo3);
                                 }
                                 
//                                console.log(image_path + "/" + r.records[i].photos[k]);
                             }
                             else 
                             {
                                 if(k==0)
                                 {
                                     obj.photo0 = image_path + '/no_image.png';
                                      obj.photo0 = replace_slashes_from_photos(obj.photo0);
                                 }
                                 else if(k==1)
                                 {
                                     obj.photo1 = image_path + '/no_image.png';
                                      obj.photo1 = replace_slashes_from_photos(obj.photo1);
                                 }else if(k==2)
                                 {
                                     obj.photo2 = image_path + '/no_image.png';
                                      obj.photo2 = replace_slashes_from_photos(obj.photo2);
                                 }else if(k==3)
                                 {
                                     obj.photo3 = image_path + '/no_image.png';
                                     obj.photo3 = replace_slashes_from_photos(obj.photo3);
                                 }
                             }
                         }
                     }
                     
                     $scope.GroupList.push(obj);                     
                 }
                 $scope.GroupList = paginateList($scope.GroupList,3);                                 
            }).error(function(data, status) {});
        }
    }
    
    
    
    var user_id = _userObj.id;
    $scope.getGroups();
    $scope.iniitialise();
    
  }]);
  
  
   friendsController.controller('friendChallengeCtrl', ['$rootScope','$scope','groupService','$location','CommonCode', 'challengeService', 'shareService',
  function($rootScope,$scope,groupService,$location, CommonCode, challengeService, shareService) {
    
     /*get data from share*/
    var share = shareService.get();
    $rootScope.round_name = share.round_info.name;
    $rootScope.category_name = share.round_info.category_name;
    
    /*clean share repo */
    shareService.clean();
        
    var friendArr = [];
    
    $scope.image_server_url = imageServerUrl;
    $scope.image_server_path = imageCatBig;
    $scope.FriendArr = [];
    $scope.total_friends_cnt = 0;    
    $scope.FriendArr = [];
    $rootScope.displayChallengeBtn = false;
    var user_id = _userObj.id;
    
    $scope.getFriends = function()
    {
        
        var params = {userId : _userObj.id, roundId : share.round_info.id}
//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            groupService.getFriendsForChallenge(params).success(function(r, status)
            {
                 $scope.total_friends_cnt = r.total_friends_cnt;
                 $scope.FriendList = [];
                 var ago_str = "";
                 for (var i=0; i< r.friends.length; i++)
                 {
                     var obj = {};
                     obj.comments = r.friends[i].comments;
                     var image_path = CommonCode.getImagePath('user', 'small');                     
                     
                     obj.photo = "";
                     if(r.friends[i].photo=="" || r.friends[i].photo==null)
                     {
                         obj.photo = image_path + '/no_image.png';
                     }
                     else
                     {
                         obj.photo = image_path + '/' + r.friends[i].photo;
                     }

                    obj.photo = replace_slashes_from_photos(obj.photo);
                    
                     obj.fname = r.friends[i].fname;
                     obj.lname = r.friends[i].lname;
                     obj.username = r.friends[i].username;
                     obj.id = r.friends[i].id;

                     $scope.FriendList.push(obj);
                 }
                 
                 if(r.friends.length){
                     $rootScope.displayChallengeBtn = true;
                 }
                 
                 console.log($scope.FriendList);
            }).error(function(data, status) {});
        }
    }
    
    $scope.getFriends();
//    
//    $(".selected-group-wrapper").click(function()
//    {
//            $(this).find("img").css("display","none");
//            $(this).parent().find(".family-list-wrapper-selectable").removeClass("selected-group");
//    });
//	        
//        
//    $scope.hideOverlay= function()
//    {
//        angular.element("#overlay").hide();
//        $("#overlay1").hide();
//        $("#overlay2").hide();
//        $("#overlay3").hide();
//    };

//    $(".family-relative-wrapper").click(function(){
//            $(this).find(".family-list-wrapper-selectable").addClass("selected-group");
//            $(this).find(".selected-group-wrapper").show();
//    });    
    

    $scope.addFriend = function(friend_id)
    {
        var index = friendArr.indexOf(friend_id);
        
        if (index > -1) 
        {
            friendArr = [];
        }
        else
        {
            friendArr = [friend_id];
        }    
    }

    $rootScope.WrapUp= function(){
        var d = {coinsEarned:share.coinsEarned,  totalCoins:share.totalCoins, answerList:share.answerList,publicPollAnswerList : share.publicPollAnswerList , come_from:'challenge'};
        shareService.set(d);                                                        
        $location.path('/wrapup/'+share.round_info.category_id+'/'+share.round_info.id + '/' + share.coinsEarned); 
    }
    
    $rootScope.processChallenge = function(){
        if(friendArr.length)
        {
            /* send friend list to challenge*/
            challengeService.sendChallenge({'friends[]':friendArr,
                                            'groups[]': [],
                                            user_id : _userObj.id,
                                            round_id : share.round_info.id,
                                            category_id : share.round_info.category_id 
                                        })
                .success(function(r, status){                      
                        if(r.status == 1)
                        {   
                            var totalCoins = share.totalCoins;
                            if(r.totalCoins){
                                totalCoins = r.totalCoins;
                            }
                            
                            var d = {challenge_set:0, challenged_friends:0, challenged_group:0, coinsEarned:share.coinsEarned,  totalCoins:totalCoins, answerList:share.answerList, publicPollAnswerList : share.publicPollAnswerList , come_from:'challenge'};
                            shareService.set(d);                                                        
                            $location.path('/wrapup/'+share.round_info.category_id+'/'+share.round_info.id + '/' + share.coinsEarned); 
                        }                    
                }).error(function(data, status) {});
        }
        else
        {
            showMessage("Select any friend to challenge");
        }
    }

  }]);
  

userController.controller('friendsFriendsCtrl', ['$rootScope','$scope','friendsServices','$location','$routeParams','CommonCode','userService',
  function($rootScope,$scope,friendsServices,$location, $routeParams, CommonCode, userService) 
  {
//    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    
    var getFriends = function()
    {
        $scope.logged_in_user_id = _userObj.id;
        var params = {userId : $routeParams.userId, LoggedInUserId:_userObj.id}
//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            friendsServices.getFriends(params).success(function(r, status)
            {
                 $scope.FriendList = [];
                 var ago_str = "";
                 for (var i=0; i< r.friends.length; i++)
                 {
                     var obj = {};
//                     ago_str = CommonCode.getTimeAgo(r.friends[i].created_date);
//
//        //             obj.created_date = jQuery.timeago(ago_str);
//                     obj.created_date = ago_str;
                     obj.comments = r.friends[i].comments;

                     var image_path = CommonCode.getImagePath('user', 'small');
                     obj.photo = "";
                     if(r.friends[i].photo=="" || r.friends[i].photo==null)
                     {
                         obj.photo = image_path + '/no_image.png';
                     }
                     else
                     {
                         obj.photo = image_path + '/' + r.friends[i].photo;
                     }
                     
                     obj.photo = replace_slashes_from_photos(obj.photo);
                     
                     obj.fname = r.friends[i].fname;
                     obj.lname = r.friends[i].lname;
                     obj.username = r.friends[i].username;
                     obj.id = r.friends[i].id;
                     obj.status = r.friends[i].status;

                     obj.status_str = "FRIEND";
                     
                     if(r.friends[i].status==-1)
                     {
                         obj.status_str = "FRIEND";
                     }
                     else if(r.friends[i].status==1)
                     {
                         obj.status_str = "UNFRIEND";
                     }
                     else if(r.friends[i].status==0)
                     {
                         obj.status_str = "PENDING";
                     }
                     else if(r.friends[i].status==2)
                     {
                         obj.status_str = "DECLINED";
                     }
                     $scope.FriendList.push(obj);
                 }
                 //console.log($scope.FriendList);
            }).error(function(data, status) {});
        }
    }

     getFriends();
     
    
     var makeFriend = function(from_user_id, to_user_id)
     {
         var params = {profile_user_id: to_user_id, from_user_id: from_user_id, friend_str: 'make friend' }
        userService.friend_unfriend(params).success(function(r, status)
        {
            $("#" + to_user_id + "_frnd_unfrnd").html("PENDING");
            $("#" + to_user_id + "_frnd_unfrnd").attr("rel", 1);
        });
     }
     
     var unFriend = function(from_user_id, to_user_id)
     {
         var params = {profile_user_id: to_user_id, from_user_id: from_user_id, friend_str: 'UNFRIEND' }
        userService.friend_unfriend(params).success(function(r, status)
        {
            $("#" + to_user_id + "_frnd_unfrnd").html("DECLINED");
            $("#" + to_user_id + "_frnd_unfrnd").attr("rel", 1);
        });
     }
     
     $scope.friend_unfriend = function(status, to_user_id)
     {
         if($("#" + to_user_id + "_frnd_unfrnd").attr("rel")==0)
         {
            if(status==-1)
            {
                makeFriend(_userObj.id, to_user_id);
            }
            
            if(status==1)
            {
                unFriend(_userObj.id, to_user_id);
            }
        }
     }
     
  }]);  