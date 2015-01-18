'use strict';

/* Controllers */

var discussionController = angular.module('discussionController', ['chatServices', 'userServices', 'categoryServices']);


 
 discussionController.controller('discussionCtrl', ['$rootScope','$routeParams','$scope','addchatService', 'getchatService', '$location', 'CommonCode',
  function($rootScope,$routeParams,$scope,addchatService, getchatService, $location, CommonCode) {
    

    var catId = $routeParams.catId; 
    
    var user_id = _userObj.id;
    
    $scope.user_id = user_id;
    
    var processGetChat = function(r)
     {
            
             
         $scope.ItemList = [];
         var ago_str = "";
         for (var i=0; i< r.length; i++)
         {
             var obj = {};

             ago_str = r[i].created_date;
             
//             obj.created_date = jQuery.timeago(ago_str);
             obj.created_date = ago_str;
//             obj.comments = r[i].comments;
             obj.comments = wordwrap(r[i].comments, 15, '\n', 1);
             
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
//             obj.fname = r[i].fname;
//             obj.lname = r[i].lname;
             obj.username = r[i].username;
             obj.id = r[i].id;

             $scope.ItemList.push(obj);
         }
         console.log($scope.ItemList);

     },
     
    get_discussion = function()
    {
        getchatService.jsonp_query({userId:user_id, catId: catId},processGetChat);
    }
    
     
//     
    $scope.save_discussion = function()
    {
        if(typeof($scope.txtChat)=="undefined" )
        {
            showMessage("Please enter content");
            return false;
        }
        else
        {
            if($scope.txtChat=="")
            {
                showMessage("Please enter content");
                return false;
            }
        }
        
        addchatService.jsonp_query({userId:user_id, catId: catId, chat:$scope.txtChat},$scope.processChatInsert);
    }
    
    $scope.processChatInsert = function(r)
     {
         var ago_str =  jQuery.timeago(new Date());
         var image_path = imageServerUrl + "/images/user/big/" + _userObj.photo;
         
        $( ".forappend" ).append("<div class='row inner-category-send-wrapper'><div class='row noMargin'><div class='col-xs-11 nopad'><span class='discussion-name-right'>"+$scope.txtChat+"</span></div><div class='col-xs-1 noPadding'><img class='img-responsive pull-right margin5' src='"+image_path+"'></div><div class='time-stamp-left'>"+_userObj.username+" | "+ago_str+"</div></div></div>" );
        
         $scope.txtChat="";
//         showMessage(r.msg);
     }
     get_discussion();
     
     CommonCode.init($scope);
     
  }]);
 
 
 
 
///
discussionController.controller('userdiscussionCtrl', ['$rootScope','$routeParams','$scope','categoryService', '$location', 'CommonCode',
  function($rootScope,$routeParams,$scope,categoryService, $location, CommonCode) {
    
    
    
    var user_id = $scope.user_id = _userObj.id;
    
    
    
    var processGetUserDiscussion = function(r)
     {
         $scope.ItemList = [];
         var ago_str = "";
         for (var i=0; i< r.length; i++)
         {
             var obj = {};
             ago_str = r[i].discussion_time;
//             alert(ago_str);
//             obj.created_date = jQuery.timeago(ago_str);
             obj.user_discussion_time = ago_str;
//             obj.comments = r[i].comments;
             obj.comments = wordwrap(r[i].comments, 15, '\n', 1);
             
             var image_path = CommonCode.getImagePath('user', 'big');
             if(r[i].photo=="")
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
             obj.points = r[i].points;

             $scope.ItemList.push(obj);
         }
         console.log($scope.ItemList);

     },
     
    get_user_discussion = function()
    {
        categoryService.getuserdiscussionService({userId:user_id}).success(function(r, status){
                $scope.ItemList = [];
         var ago_str = "";
         
         $scope.imageServerUrl  = imageServerUrl;
         $scope.imageCatBig     = imageCatBig;
         
         $scope.discussion_count=0;
         for (var i=0; i< r.length; i++)
         {
             
             var obj = {};
             ago_str = r[i].discussion_time;

             obj.user_discussion_time = ago_str;
//             obj.comments = r[i].comments;
             obj.comments = wordwrap(r[i].comments, 15, '\n', 1);
             
             var image_path = CommonCode.getImagePath('user', 'big');
             if(r[i].photo=="")
             {
                 obj.photo = image_path + '/no_image.png';
             }
             else
             {
                 obj.photo = image_path + '/' + r[i].photo;
             }
             
             obj.photo = replace_slashes_from_photos(obj.photo);
             
             obj.id = r[i].id;
             obj.name = r[i].name;
             obj.image = r[i].image;
             obj.points = r[i].points;
             $scope.ItemList.push(obj);
             $scope.discussion_count=1;
         }
         
//         alert($scope.discussion_count);
         if(typeof(obj)=="undefined")
         {
             
             $scope.discussion_count=0;
         }
        
        }).error(function(data, status) {});
            
//        categoryService.jsonp_query({userId:user_id},processGetUserDiscussion);
    }
    
     
//     
    $scope.save_discussion = function()
    {
        if(typeof($scope.txtChat)=="undefined" )
        {
            showMessage("Please enter content");
            return false;
        }
        else
        {
            if($scope.txtChat=="")
            {
                showMessage("Please enter content");
                return false;
            }
        }
        
        addchatService.jsonp_query({userId:user_id, catId: catId, chat:$scope.txtChat},$scope.processChatInsert);
    }
    
    $scope.processChatInsert = function(r)
     {
         
         var ago_str =  jQuery.timeago(new Date());
         var image_path = imageServerUrl + imageUserBig + _userObj.photo;
         
         $( ".forappend" ).append("<div class='row inner-category-send-wrapper'><div class='row noMargin'><div class='col-xs-11 nopad'><span class='discussion-name-right'>"+$scope.txtChat+"</span></div><div class='col-xs-1 noPadding'><img class='img-responsive pull-right margin5' src='"+image_path+"'></div><div class='time-stamp-left'>"+_userObj.fname+" | "+ago_str+"</div></div></div>" );
        
         $scope.txtChat="";
         showMessage(r.msg);
     }
     get_user_discussion();
     
     CommonCode.init($scope);
     
    
    $scope.block_cat = function(cat_id)
    {
        if(confirm("Do you really want to block this category?"))
        {
            categoryService.block_category({userId:user_id, catId:cat_id}).success(function(r, status)
            {
//                showMessage(r.msg);
                $("#" + cat_id).hide();
            }).error(function(data, status) 
            {
                //Error function implementation to be here
            });
        }
    }
    
  }]);