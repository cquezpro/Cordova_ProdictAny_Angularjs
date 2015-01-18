'use strict';

/* Controllers */

var groupsController = angular.module('groupsController', ['chatServices', 'userServices', 'categoryServices', 'friendsServices']);

groupsController.controller('grouplistCtrl', ['$rootScope','$scope','groupService','$location','CommonCode',
  function($rootScope,$scope,groupService,$location, CommonCode) {
    
    

    
    $scope.getGroups = function()
    {
        var params = {userId : _userObj.id, name : $scope.name};
        var groups_added=0;
//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            groupService.getGroups(params).success(function(r, status)
            {
                
                 $scope.GroupList = [];
                 var ago_str = "";
                 for (var i=0; i< r.records.length; i++)
                 {
                     var obj = {}, groups_added=1;
                     
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
                     obj.username = r.records[i].username;
                     obj.id = r.records[i].id;

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
                                 
                                console.log(image_path + "/" + r.records[i].photos[k]);
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
                     else 
                     {
                         obj.photo0 = image_path + '/no_image.png';
                         obj.photo0 = replace_slashes_from_photos(obj.photo0);
                         
                         obj.photo1 = image_path + '/no_image.png';
                         obj.photo1 = replace_slashes_from_photos(obj.photo1);
                         
                         obj.photo2 = image_path + '/no_image.png';
                         obj.photo2 = replace_slashes_from_photos(obj.photo2);
                         
                         obj.photo3 = image_path + '/no_image.png';
                         obj.photo3 = replace_slashes_from_photos(obj.photo3);
                     }
                     
                     $scope.GroupList.push(obj);
                 }
                 
//                 $scope.discussion_count="1";
//                if(typeof(obj)=="undefined")
//                {
//                    $scope.discussion_count="0";
//                }

                 //console.log($scope.FriendList);
            }).error(function(data, status) {});
            
            
        }
    }
   
    var user_id = _userObj.id;
    $scope.getGroups();
  }]);
 
 
 
 groupsController.controller('groupforeditCtrl', ['$rootScope','$scope','groupService','$location','CommonCode',
  function($rootScope,$scope,groupService,$location, CommonCode) {
    
    

    
    $scope.getGroups = function()
    {
        var params = {userId : _userObj.id, name : $scope.name, created_by_me_only:1};
        var groups_added=0;
//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            groupService.getGroups(params).success(function(r, status)
            {
                
                 $scope.GroupList = [];
                 var ago_str = "";
                 for (var i=0; i< r.records.length; i++)
                 {
                     var obj = {}, groups_added=1;
                     
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
                     obj.username = r.records[i].username;
                     obj.id = r.records[i].id;

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
                                 
                                console.log(image_path + "/" + r.records[i].photos[k]);
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
                     else 
                     {
                         obj.photo0 = image_path + '/no_image.png';
                         obj.photo0 = replace_slashes_from_photos(obj.photo0);
                         
                         obj.photo1 = image_path + '/no_image.png';
                         obj.photo1 = replace_slashes_from_photos(obj.photo1);
                         
                         obj.photo2 = image_path + '/no_image.png';
                         obj.photo2 = replace_slashes_from_photos(obj.photo2);
                         
                         obj.photo3 = image_path + '/no_image.png';
                         obj.photo3 = replace_slashes_from_photos(obj.photo3);
                     }
                     
                     $scope.GroupList.push(obj);
                 }
                 
//                 $scope.discussion_count="1";
//                if(typeof(obj)=="undefined")
//                {
//                    $scope.discussion_count="0";
//                }

                 //console.log($scope.FriendList);
            }).error(function(data, status) {});
            
            
        }
    }
   
    var user_id = _userObj.id;
    $scope.getGroups();
  }]);

 groupsController.controller('groupaddCtrl', ['$rootScope','$scope','groupService','$location','CommonCode','friendsServices',
  function($rootScope,$scope,groupService,$location, CommonCode, friendsServices) {
    
    var user_id = _userObj.id, image_holder0 = "", image_holder1 = "", image_holder2 = "", image_holder3 = "";
    $scope.getFriends = function()
    {
        var params = {userId : _userObj.id, name : $scope.name}
//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            groupService.getFriends(params).success(function(r, status)
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

                     var image_path = CommonCode.getImagePath('user', 'mini');
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
                 //console.log($scope.FriendList);
            }).error(function(data, status) {});
        }
    }
    
    $scope.FriendArr = [];
    
    $scope.addFriend = function(friend_id)
    {
        var index = $scope.FriendArr.indexOf(friend_id);
        if (index > -1) 
        {
            $scope.FriendArr.splice(index, 1);
            var image_position = $("#demo_box_" + friend_id).attr("rel") - 1;
            
            if(image_position==0)
            {
                $scope.photo0 = "img/help.png"; 
                image_holder0 = 0;
            }
            else if(image_position==1)
            {
                $scope.photo1 = "img/help.png"; 
                image_holder1 = 0;
            } 
            else if(image_position==2)
            {
                $scope.photo2 = "img/help.png"; 
                image_holder2 = 0;
            }
            else if(image_position==3)
            {
                $scope.photo3 = "img/help.png"; 
                image_holder3 = 0;
            }
                
        }
        else
        {
            $scope.FriendArr.push(friend_id);
            
            if(image_holder0==0)
            {
                image_holder0 = 1;
                $scope.photo0 = $("#"+friend_id+"_image_holder").attr("src");
                $("#demo_box_" + friend_id).attr("rel", "1");
            }
            else if(image_holder1==0)
            {
                image_holder1 = 2;
                $scope.photo1 = $("#"+friend_id+"_image_holder").attr("src");
                $("#demo_box_" + friend_id).attr("rel", "2");
            }
            else if(image_holder2==0)
            {
                image_holder2 = 3;
                $scope.photo2 = $("#"+friend_id+"_image_holder").attr("src");
                $("#demo_box_" + friend_id).attr("rel", "3");
            }
            else if(image_holder3==0)
            {
                image_holder3 = 4;
                $scope.photo3 = $("#"+friend_id+"_image_holder").attr("src");
                $("#demo_box_" + friend_id).attr("rel", "4");
            } 
            
            
        }
        
        console.log($scope.FriendArr);
    }
    $scope.getFriends();
    
    
    $scope.createGroup = function()
    {
        
        if(typeof($scope.groupName)=="undefined")
        {
            showMessage("Please enter group name");
            $("#groupName").focus();
            return false;
        }
        else if($.isNumeric($scope.groupName))
        {
            showMessage("Group name can not be numeric");
            $("#groupName").focus();
            return false;
        }
        else if(!$scope.groupName.match(/^[a-z A-Z 0-9 _-]*$/))
        {
            showMessage("Allowed characters for group name are a to z, 0 to 9, -, -");
            $("#groupName").focus();
            return false;
        }
        else if(typeof $scope.FriendArr != "undefined" && $scope.FriendArr != null && $scope.FriendArr.length > 1)
        {
            var friend_ids = "";
            var comma = "";
            for (var i = 0; i < $scope.FriendArr.length; i++) 
            {
               friend_ids += comma + $scope.FriendArr[i];
               var comma = ",";
//                    showMessage($scope.FriendArr[i]);
                //Do something
            }

            var params = {name : $scope.groupName, user_id : _userObj.id, friends_ids:friend_ids};
            groupService.createGroup(params).success(function(r, status)
            {
                if(typeof(r.err)!="undefined")
                {
                    showMessage(r.err);
                    return false;
                }
                
                showMessage("Group created and friends added"); 
                $location.path("/groupslist");
                
            }).error(function(data, status) {
          });

            console.log($scope.FriendArr);
        }
        else
        {
            
           showMessage("Please add at least two friends in a group");
           return false;
        }
    }
    
    
    
    $scope.photo0 = "img/help.png";
    $scope.photo1 = "img/help.png";
    $scope.photo2 = "img/help.png";
    $scope.photo3 = "img/help.png";
    
    CommonCode.init($scope);
    
  }]);
 
 
 groupsController.controller('groupEditCtrl', ['$routeParams', '$rootScope','$scope','groupService','$location','CommonCode','friendsServices',
  function($routeParams, $rootScope,$scope,groupService,$location, CommonCode, friendsServices) {
    
    
    var group_id = $routeParams.group_id; 
    
    var user_id = _userObj.id;
    
    $scope.getFriends = function()
    {
        var params = {userId : _userObj.id, name : $scope.name}
//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            groupService.getFriends(params).success(function(r, status)
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

                     var image_path = CommonCode.getImagePath('user', 'mini');
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
                 //console.log($scope.FriendList);
            }).error(function(data, status) {});
        }
    }
    
    $scope.FriendArr = [];
    
    $scope.addFriend = function(friend_id)
    {
        var index = $scope.FriendArr.indexOf(friend_id);
        if (index > -1) 
        {
            $scope.FriendArr.splice(index, 1);
        }
        else
        {
            $scope.FriendArr.push(friend_id);
        }
        
        console.log($scope.FriendArr);
    }
    //$scope.getFriends();
    
    
    
    $scope.EditGroup = function()
    {
//        showMessage($scope.groupName);
        if(typeof($scope.groupName)=="undefined")
        {
            showMessage("Please enter group name");
            $("#groupName").focus();
            return false;
        }
        else if(!$scope.groupName.match(/^[a-z A-Z 0-9 _-]*$/))
        {
            showMessage("Allowed characters for group name are a to z, 0 to 9, -, -");
            $("#groupName").focus();
            return false;
        }
        else if(typeof $scope.FriendArr != "undefined" && $scope.FriendArr != null && $scope.FriendArr.length > 1)
        {
            var friend_ids = "";
            var comma = "";
            for (var i = 0; i < $scope.FriendArr.length; i++) 
            {
               friend_ids += comma + $scope.FriendArr[i];
               var comma = ",";
//                    showMessage($scope.FriendArr[i]);
                //Do something
            }

            var params = {name : $scope.groupName, user_id : _userObj.id, friends_ids:friend_ids, group_id : group_id};
            groupService.EditGroup(params).success(function(r, status)
            {
                
                
                if(typeof(r.err)!="undefined")
                {
                    showMessage(r.err);
                    return false;
                }
                
                showMessage("Group Edited"); 
                $location.path("/groupslist");
                
            }).error(function(data, status) {
          });

            console.log($scope.FriendArr);
        }
        else
        {
           showMessage("Please add at least two friends in a group");
           return false;
        }
        
        
    }
    $scope.load_group_info = function()
    {
        $scope.group_id = group_id;
        var params = {group_id : group_id, user_id : user_id};
        groupService.getGroupInfo(params).success(function(r, status)
        {   
            $scope.groupName = r.group.name;
            
            ////
                 $scope.FriendArr = [];
                 $scope.FriendList = [];
                 var ago_str = "";
                 for (var i=0; i< r.friends.length; i++)
                 {
                     var obj = {};

                     obj.comments = r.friends[i].comments;

                     var image_path = CommonCode.getImagePath('user', 'mini');
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
                     obj.username = r.friends[i].username;
                     obj.is_added_in_group = 0;
                     if(r.friends[i].is_added_in_group==1)
                     {
                         obj.is_added_in_group = 1;
                         $scope.FriendArr.push(r.friends[i].id);
                     }
                     
                     
                     obj.lname = r.friends[i].lname;
                     obj.id = r.friends[i].id;

                        
                     $scope.photo0 = image_path + '/no_image.png';
                     $scope.photo0 = replace_slashes_from_photos($scope.photo0);
                     
                     $scope.photo1 = image_path + '/no_image.png';
                     $scope.photo1 = replace_slashes_from_photos($scope.photo1);
                     
                     $scope.photo2 = image_path + '/no_image.png';
                     $scope.photo2 = replace_slashes_from_photos($scope.photo2);
                     
                     $scope.photo3 = image_path + '/no_image.png';
                     $scope.photo3 = replace_slashes_from_photos($scope.photo3);

//                     console.log(r.friends);
                     ////
                     
                     ////
                     
                     $scope.FriendList.push(obj);
                 }
                 
                 if(typeof(r.photos)!="undefined")
                 {
                     for(var k=0; k<4;k++)
                     {
                         if (typeof r.photos[k] !== 'undefined' && r.photos[k] !== null) 
                         {
                             if(k==0)
                             {
                                 $scope.photo0 = image_path + "/" + r.photos[k].photo;
                                 $scope.photo0 = replace_slashes_from_photos($scope.photo0);
                             }
                             else if(k==1)
                             {
                                 $scope.photo1 = image_path + "/" + r.photos[k].photo;
                                 $scope.photo1 = replace_slashes_from_photos($scope.photo1);
                             }else if(k==2)
                             {
                                 $scope.photo2 = image_path + "/" + r.photos[k].photo;
                                 $scope.photo2 = replace_slashes_from_photos($scope.photo2);
                             }else if(k==3)
                             {
                                 $scope.photo3 = image_path + "/" + r.photos[k].photo;
                                 $scope.photo3 = replace_slashes_from_photos($scope.photo3);
                             }

                            console.log(image_path + "/" + r.photos[k].photo);
                         }
                         else 
                         {
                             if(k==0)
                             {
                                 $scope.photo0 = image_path + '/no_image.png';
                                 $scope.photo0 = replace_slashes_from_photos($scope.photo0);
                             }
                             else if(k==1)
                             {
                                 $scope.photo1 = image_path + '/no_image.png';
                                 $scope.photo1 = replace_slashes_from_photos($scope.photo1);
                             }else if(k==2)
                             {
                                 $scope.photo2 = image_path + '/no_image.png';
                                 $scope.photo2 = replace_slashes_from_photos($scope.photo2);
                             }else if(k==3)
                             {
                                 $scope.photo3 = image_path + '/no_image.png';
                                 $scope.photo3 = replace_slashes_from_photos($scope.photo3);
                             }
                         }
                     }

                 }
                 else 
                 {
                     $scope.photo0 = image_path + '/no_image.png';
                     $scope.photo0 = replace_slashes_from_photos($scope.photo0);
                     
                     $scope.photo1 = image_path + '/no_image.png';
                     $scope.photo1 = replace_slashes_from_photos($scope.photo1);
                     
                     $scope.photo2 = image_path + '/no_image.png';
                     $scope.photo2 = replace_slashes_from_photos($scope.photo2);
                     
                     $scope.photo3 = image_path + '/no_image.png';
                     $scope.photo3 = replace_slashes_from_photos($scope.photo3);
                 }

            if(typeof(r.err)!="undefined")
            {
                showMessage(r.err);
                return false;
            }

        }).error(function(data, status) {
      });
    }
    
    
    $scope.delete_group = function(id)
    {
//        if(showConfirm("Are you sure you want to delete group?"))
        {
            var params = {id : id};

            groupService.deleteGroup(params).success(function(r, status)
            {   

                if(typeof(r.err)!="undefined")
                {
                    showMessage(r.err);
                    return false;
                }
                if(typeof(r.msg)!="undefined")
                {
                    showMessage(r.msg);
                }

                $location.path("/groupslist");

            }).error(function(data, status) {
          });
        }
//        else
//        {
//            $location.path("/groupslist");
//        }
        
    }
    $scope.load_group_info();
    
    CommonCode.init($scope);
    
  }]);
 
 
 groupsController.controller('groupChallengeCtrl', ['$rootScope','$scope','groupService','$location','CommonCode', 'challengeService', 'shareService',
  function($rootScope,$scope,groupService,$location, CommonCode, challengeService, shareService) {
    
     /*get data from share*/
    var share = shareService.get();
    $rootScope.round_name = share.round_info.name;
    $rootScope.category_name = share.round_info.category_name;
    
    
    console.log(share);
    
//    alert(share.round_info.name);
    /*clean share repo */
    shareService.clean();
        
    var groupArr = [], friendArr = [];
    
    $scope.image_server_url = imageServerUrl;
    $scope.image_server_path = imageCatBig;
    $scope.FriendArr = [];
    $scope.total_friends_cnt = 0;
    $scope.total_groups_cnt = 0;
    $scope.FriendArr = [];
    $rootScope.displayChallengeBtn = false;
    
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

                     $scope.FriendList.push(obj);
                 }
                 
                 if(r.friends.length){
                     $rootScope.displayChallengeBtn = true;
                 }
                 //console.log($scope.FriendList);
            }).error(function(data, status) {});
        }
    }
    
    
    $scope.getFriends();
    
    
    $scope.getGroups = function()
    {
        var params = {userId : _userObj.id, roundId : share.round_info.id}

//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            groupService.getGroupsForChallenge(params).success(function(r, status)
            {
                 $scope.total_groups_cnt = r.total_groups_count;                  
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
                     obj.username = r.records[i].username;
                     obj.id = r.records[i].id;

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
                                 
                                //console.log(image_path + "/" + r.records[i].photos[k]);
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
                     else 
                     {
                         obj.photo0 = image_path + '/no_image.png';
                         obj.photo0 = replace_slashes_from_photos(obj.photo0);
                         
                         obj.photo1 = image_path + '/no_image.png';
                         obj.photo1 = replace_slashes_from_photos(obj.photo1);
                         
                         obj.photo2 = image_path + '/no_image.png';
                         obj.photo2 = replace_slashes_from_photos(obj.photo2);
                         
                         obj.photo3 = image_path + '/no_image.png';
                         obj.photo3 = replace_slashes_from_photos(obj.photo3);
                     }
                     
                     $scope.GroupList.push(obj);
                 }
                 
                 if(r.records.length){
                     $rootScope.displayChallengeBtn = true;
                 }
                 
                 $scope.discussion_count="1";
                if(typeof(obj)=="undefined")
                {
                    $scope.discussion_count="0";
                }

                 //console.log($scope.FriendList);
            }).error(function(data, status) {});
            
            
        }
    }
   
    var user_id = _userObj.id;
    $scope.getGroups();
    
    $scope.showOverlay= function(group_id, group_name)
    {
        $scope.group_name = group_name;

	angular.element("#overlay").show();
    $("#shadow").show();
        
            var params = {userId : _userObj.id, group_id : group_id}
    //        if(!$scope.catListL1.length)
            {
                //get all main level categories
                groupService.getGroupFriends(params).success(function(r, status)
                {
                    $scope.FriendArr = [];
                     $scope.GroupFriends = [];
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

                         $scope.GroupFriends.push(obj);
                         $scope.FriendArr.push(obj.id);
                     }
                     //console.log($scope.FriendList);
                }).error(function(data, status) {});
            }

    };
    

    $(".selected-group-wrapper").click(function()
    {
            $(this).find("img").css("display","none");
            $(this).parent().find(".family-list-wrapper-selectable").removeClass("selected-group");
    });
	        
        
    $scope.hideOverlay= function()
    {
        angular.element("#overlay").hide();
        $("#overlay1").hide();
        $("#overlay2").hide();
        $("#overlay3").hide();
        $("#shadow").hide();
        window.predict_cat_id = "";
    };

    $(".family-relative-wrapper").click(function(){
            $(this).find(".family-list-wrapper-selectable").addClass("selected-group");
            $(this).find(".selected-group-wrapper").show();
    });    
    

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
    
    $scope.addGroup = function(grp_id)
    {
        var index = groupArr.indexOf(grp_id);
        if (index > -1) 
        {
            groupArr = [];
        }
        else
        {
            groupArr = [grp_id];        
        }       
    }
    
    $rootScope.WrapUp= function(){
        var d = {coinsEarned:share.coinsEarned,  totalCoins:share.totalCoins, answerList:share.answerList , publicPollAnswerList : share.publicPollAnswerList, come_from:'challenge'};
        shareService.set(d);                                                        
        $location.path('/wrapup/'+share.round_info.category_id+'/'+share.round_info.id + '/' + share.coinsEarned); 
    }
    
    $rootScope.processChallenge = function(){
        if(friendArr.length || groupArr.length)
        {
            /* send friend list to challenge*/
            challengeService.sendChallenge({'friends[]':friendArr,
                                            'groups[]':groupArr,
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
            showMessage("Select any friend or group to challenge");
        }
    }

    

  }]);
  
 