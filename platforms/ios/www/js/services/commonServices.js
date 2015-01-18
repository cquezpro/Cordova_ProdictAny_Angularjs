'use strict';

/* Services */

var commonServices = angular.module('commonServices', []);

commonServices.factory('CommonCode', ['$window', '$location', '$timeout',
  function($window,$location,  $timeout) {
//commonServices.factory('CommonCode', function ($window) {
        var root = {};
        
        root.getTimeAgo = function(datetime){
            
            var c = datetime;
             
             var year = c.substr(0, 4);
             var month = c.substr(4, 2);
             var day = c.substr(6, 2);
             var hour = c.substr(8, 2);
             var minute = c.substr(10, 2);
             var seconds = c.substr(12, 2);
             
             var ago_str = year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + seconds + "Z";
             
             return jQuery.timeago(ago_str)
             
        };
        

        //will modify this function later so that it will return image paths of categry images, prediction images, user images etc.
        root.getImagePath = function(type, subtype)
        {
            if(type=='user')
            {
                if(subtype=="big")
                {
                    return imageServerUrl + "/images/user/big/";
                }
                else if (subtype=="small")
                {
                    return imageServerUrl + "/images/user/small/";
                }
                else if (subtype=="mini")
                {
                    return imageServerUrl + "/images/user/mini/";
                }
            }
            else if(type=='category')
            {
                if(subtype=="big")
                {
                    return imageServerUrl + "/images/category/big/";
                }
                else if (subtype=="small")
                {
                    return imageServerUrl + "/images/category/small/";
                }
            }
            
            else if(type=='badges')
            {
                if(subtype=="big")
                {
//                    return imageServerUrl + "/images/badges/big/";
                    return "img/badges/big/";
                }
                else if (subtype=="small")
                {
                    return "img/badges/small/";
//                    return imageServerUrl + "/images/badges/small/";
                }
            }
            
            else if (type="cover_image")
            {
               return imageServerUrl + "/images/cover_image";
            }
        }
        
        root.show = function(){
            showMessage(1);
        };
        root.show1 = function(msg){
            showMessage(msg);
        };
        
//        root.stopBlockUI = function(){   
//        
//            blockUI.stop();             
//        }
//        root.startBlockUI = function(){   
//        
//            blockUI.start();             
//        }
        
        root.pagination = function(scope, numRows)
        {
             scope.bigTotalItems = numRows;
             scope.itmesPerPage =  config.records_per_page
             scope.totalPages = Math.ceil(numRows/config.records_per_page);         
             scope.totalItems = numRows;
             scope.currentPage = 1;         
             scope.maxSize = 3;  
             scope.bigCurrentPage = 1;
             
//             console_log("scope.bigTotalItems" + scope.bigTotalItems);
//             console_log("scope.itmesPerPage" + scope.itmesPerPage);
//             console_log("scope.totalPages" + scope.totalPages);
//             console_log("scope.totalItems" + scope.totalItems);
//             console_log("scope.currentPage" + scope.currentPage);
//             console_log("scope.maxSize" + scope.maxSize);
//             console_log("scope.bigCurrentPage" + scope.bigCurrentPage);
        }
        
        root.init = function(scope)
        {
            scope.word = /^[a-z,A-Z 0-9_ ]+$/;
            
            scope.digit = /^[0-9]*$/;    
            
            scope.gotoHome = function(){        
                $location.path('/');
            };

            scope.goTo = function(hashbang)
            {
                if(hashbang)
                {
                    $location.path("/" + hashbang);  
                }
            }
            
//            scope.stopBlockUI = function(){                         
//                blockUI.stop(); 
//                $scope.$apply();
//            }
//
//            scope.startBlockUI = function()
//            {
//                blockUI.start();   
//            }
            

        }
        
        root.sendSMS = function(number, message){
             
             if(!number || !message)
             {
                 showMessage("Mobile Number of Message is not Generated !!");
                 return false;
             }
             
             if(!confirm("Sending SMS to "+number + " Message is " + message))
             {
                 return false;
             }            
             
             if(config.mobileDevice==1)
             {
                cordova.exec(function(winParam) 
                {
                    // Use the following line if json2 library is present.
                    // Available from Douglas Crockford's github page here:
                    // https://github.com/douglascrockford/JSON-js/blob/master/json2.js
                    console_log( JSON.stringify(winParam) );

                //                    showMessage(winParam.sms_send);
                    if(winParam.sms_send==true)
                    {
                        showMessage("SMS Sent Successfully");
                    }
                    else
                    {
                        showMessage("SMS Not Sent, please Retry later");
                    }
                }
                , function(error) {
                    showMessage("An error has occurred => " + JSON.stringify(error));
                    console_log("An error has occurred");
                    // Please refer to previous comment about json2 library.
                    console_log( JSON.stringify(error) );
                }
                , "SendSms"
                 ,"SendSms"
                 , [number, message]);
              }
              else
              {
                  showMessage("Web version : SMS sent");
              }
        }
        
        root.sendEmail = function(client_email, case_id, type)
        {
            var adv_email = get_lawyer_email();
            if(config.mobileDevice==true)
            {
                var url = webserviceUrl + "diary"+config.app_version+"/case-status-email?device_id="+device.uuid + "&adv_email="+adv_email;
            }
            else
            {
                var url = webserviceUrl + "diary"+config.app_version+"/case-status-email?device_id=" + adv_email + "&adv_email="+adv_email;

                if(adv_email!="" && typeof(adv_email)!="undefined")
                {
                    var url = webserviceUrl + "diary"+config.app_version+"/case-status-email?device_id="+adv_email+ "&adv_email="+adv_email;
                }
                else if((typeof(adv_email)=="undefined" || adv_email=="" ))
                {
                    var url = webserviceUrl + "diary"+config.app_version+"/case-status-email?device_id=";
                }
            }

            url = url + "&case_id="+case_id + "&type=" + type + "&client_email=" + client_email;                
            console_log(url);
            $.ajax({ 
              url: url + "&callback=?", 
              dataType: 'json', 
              data: '', 
              async:true,
              success: ajax_callback_sendEmail, 
              timeout: 20000,
              error: function(jqXHR, status, errorThrown)
              {   
                  showMessage("Mail is not sent at this time, please try later");
                  force_unblock_ui();
              }
            });     

            function ajax_callback_sendEmail(data)
            {
                
                if(data.status=='fail')
                {
                    showMessage("Mail is not sent at this time, please try later");
                }
                if(typeof(data.status)!="undefined")
                {
                    if(data.status=='pass')
                    {
                        //showMessage(data.status);
                        showMessage("Case status mail has been sent to " + client_email);
                    }
                    else if(data.status=='case_info_not_present')
                    {
                        showMessage("Case Schedule Information is not found on server, please try later");
                    }
                    else if(data.status=='user_not_present')
                    {
                        showMessage("User details not found on server, please try later");
                    }  
                    else
                    {
                        showMessage("Mail is not sent at this time, please try later");
                    }      
                    return false;
                }
                else
                {
                    console_log("Inside ajax_callback_sendEmail");
                    return '0';
                }
            }    
        }
        
        root.alert = function(d){                        
               // blockUI.start(d);
                $timeout(function(){
                //    blockUI.stop();
                },1000);
        }
        
        root.setBackOption = function(){
            
        }
        
        root.go_to_page = function(param)
        {
            
            if(param)
            {
                $location.path(param);
            }
        }
        
        
        
        return root;
    }]);
