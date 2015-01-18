'use strict';

/* Services */

var socialServices = angular.module('socialServices', ['ngResource']);

socialServices.factory('socialService', ['$http',
  function($http){
    
    var root = {};
   var authorizationResult = false;

     //initialize OAuth.io with public key of the application
    OAuth.initialize('T7azzUOACmnUUHg3KzVnqgw1Uhw', {cache:true});
    //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
    authorizationResult = OAuth.create('twitter');
    //alert(authorizationResult);
    var version  = OAuth.getVersion();
   // alert(version);
    function fbLogin(callback) {
//        root.getFBInfo(callback); return; //remove me
        
         /* openFB.login(
            function(response) {
                if(response.status === 'connected') {
                    alert('Facebook login succeeded, got access token: ' + response.authResponse.token);
                    root.getFBInfo(callback);
                } else {
                    alert('Facebook login failed: ' + response.error);
                }
            }, {scope: 'email,read_stream,publish_stream'});*/
        OAuth.popup('facebook').done(function(result) {
            console.log(result);
            result.me().done(function(data) {
                // do something with `data`, e.g. print data.name
                alert("facebook login success: Hello " + data.name);
            })
            // do some stuff with result
        })
    }
    

    function twLogin(callback) {

        OAuth.popup('twitter', function(err, res) {
           res.get('/1.1/account/verify_credentials.json').done(function(data) {
               console.log(data)
               alert('twitter login success: Hello ' + data.name)
           })
        })

        //Using redirection (option 2)
        OAuth.redirect('twitter', "callback/url");
    }
 
    root.data = {};
    
    root.fbLogin = function(callback){
        fbLogin(callback);
    }

    root.twLogin = function(callback) {
        twLogin(callback);
    }
    
    root.getFBInfo = function(callback) {
//        if(callback){
//            callback({email:'s.atmaramani13@gmail.com', name:'samthirteen'}); return;
//        }
        openFB.api({
            path: '/me',
            success: function(data) {                
                console.log(JSON.stringify(data));
                callback(data);
    //            alert("Got success" + data.name);
                //document.getElementById("userName").innerHTML = data.name;
                //document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
            },
            error: function(e){                
                    fbLogin();
                }
            });
    }
    // openFB.init({appId: _config.facebook_app_id});
    openFB.init({appId: 465374093524857});
     
    root.connectToFB = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/connectToFB?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);
    };
    
    
    return root;
  }]);

