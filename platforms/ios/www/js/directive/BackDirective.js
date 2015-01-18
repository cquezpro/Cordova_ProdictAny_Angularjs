var backDirective = angular.module('backDirective', []);




backDirective.directive('backButton', ['$document', '$rootScope', function($document,$rootScope){


        

  return {

      

    restrict: 'AE',

    replace: true,

    template: '<img src="img/Back_Arrow.png" class="img-responsive-back-arrow" />',


    link: function(scope, elem, attrs) {

      elem.bind('click', function() {                   


         history.back();         

      });      

    }

  };

}]);





backDirective.directive('takephoto', function() {


              return {

              restrict: 'A',

              require: 'ngModel',

              link: function(scope, elm, attrs, ctrl) {

              

              

              elm.on('click', function() {

                    

                     navigator.camera.getPicture(function (imageURI) {

                                                 


                                                 scope.$apply(function() {

                                                              

                                                              ctrl.$setViewValue(imageURI);

                                                              });

                                                 

                                                if(sessionStorage.getItem("ImageType")=="cover")
                                                {
                                                    sessionStorage.setItem("coverChanged", "1");
                                                    $("#cover_image_id").attr("src", imageURI);
                                                }
                                                else if(sessionStorage.getItem("ImageType")=="photo")
                                                {
                                                    sessionStorage.setItem("photoChanged", "1");
                                                    $("#profile_image").attr("src", imageURI);
                                                }
                                                 uploadPhoto(imageURI);

                                                 }, function (err) {

                                                 ctrl.$setValidity('error', false);


                                                 }, {

                                                 quality : 50,

                                                 //destinationType : Camera.DestinationType.DATA_URL,


                                                 destinationType : Camera.DestinationType.FILE_URI,

                                                 sourceType : Camera.PictureSourceType.CAMERA,

                                                 //sourceType : Camera.PictureSourceType.PHOTOLIBRARY,


                                                 allowEdit : true,

                                                 encodingType: Camera.EncodingType.JPEG,

                                                 targetWidth: 1000,

                                                 targetHeight: 1000,

                                                 popoverOptions: CameraPopoverOptions,

                                                 saveToPhotoAlbum: false 

                                                 })

                     });  

              }

              };

              });







backDirective.directive('choosephoto', function() {


                        return {

                        restrict: 'A',

                        require: 'ngModel',

                        link: function(scope, elm, attrs, ctrl) {

                        

                        

                        elm.on('click', function() {


                               

                               navigator.camera.getPicture(function (imageURI) {

                                                           //uploadPhoto(imageURI);

                                                           

                                                           scope.$apply(function() {

                                                                        

                                                           ctrl.$setViewValue(imageURI);

                                                                      }

                                                                      );

                                                           

                                                            if(sessionStorage.getItem("ImageType")=="cover")
                                                            {
                                                                sessionStorage.setItem("coverChanged", "1");
                                                                $("#cover_image_id").attr("src", imageURI);
                                                            }
                                                            else if(sessionStorage.getItem("ImageType")=="photo")
                                                            {
                                                                sessionStorage.setItem("photoChanged", "1");
                                                                $("#profile_image").attr("src", imageURI);
                                                            }


                                                           uploadPhoto(imageURI);

                                                           }, function (err) {

                                                           ctrl.$setValidity('error', false);


                                                           }, {

                                                           quality : 50,

                                                           //destinationType : Camera.DestinationType.DATA_URL,


                                                           destinationType : Camera.DestinationType.FILE_URI,

                                                           

                                                           sourceType : Camera.PictureSourceType.PHOTOLIBRARY,

                                                           allowEdit : true,

                                                           encodingType: Camera.EncodingType.JPEG,

                                                           targetWidth: 1000,

                                                           targetHeight: 1000,

                                                           popoverOptions: CameraPopoverOptions,

                                                           saveToPhotoAlbum: false 

                                                           })

                               });  

                        }

                        };

                        });



function uploadPhoto(imageURI) 
{
    
    localStorage.setItem("is_avatar", "0");
    var options = new FileUploadOptions();

    options.fileKey="file";

    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);


    options.mimeType="image/jpeg";

    var params = {};

    params.value1 = "test";

    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();

    var user_id = 0;
    if(_userObj.id)
    {
        var user_id = _userObj.id;
    }
    ft.upload(imageURI, encodeURI("http://dev.predictany.com/index/fileupload/type/" + sessionStorage.getItem("ImageType") + "/user_id/" + user_id ), win, fail, options);


    
}

function win(r) {

    console.log("Code = " + r.responseCode);

    console.log("Response = " + r.response);

    console.log("Sent = " + r.bytesSent);

}

function fail(error) {

    showMessage("An error has occurred: Code = " + error.code);


    console.log("upload error source " + error.source);

    console.log("upload error target " + error.target);

}