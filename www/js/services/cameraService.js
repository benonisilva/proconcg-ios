(function() {
    'use strict';
    angular
        .module('starter.services')
        .factory('CameraService', CameraService);
        
        CameraService.$inject = ['$q'];
        document.addEventListener("deviceready", CameraService, false);

    function CameraService($q){
    	
    	console.log("CameraService:Ready");
    	
    	var camera = {
    		
			getFromAlbum : getFromAlbum,
    		getFromCamera : getFromCamera
    	};

    	return camera;

    	/*function onDeviceReady() {
    	  console.log(navigator.camera);
    	}*/

    	function getFromAlbum(){
    		
			var q = $q.defer();
    		var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    		var options = _setOptions(srcType);
    		
    		navigator.camera.getPicture(function(data){
    			q.resolve(data);
    		},function(err){
    			q.reject(err);
    		},options);

    		return q.promise;
    	}

    	function getFromCamera(){
    		var q = $q.defer();
			var srcType = Camera.PictureSourceType.CAMERA;
			var options = _setOptions(srcType);
			navigator.camera.getPicture(function(data){
    			q.resolve(data);
    		},function(err){
    			q.reject(err);
    		},options);

    		return q.promise;
    	}


     function _setOptions(srcType) {
    	    var options = {
    	        quality: 50,
    	        destinationType: Camera.DestinationType.FILE_URI,
    	        sourceType: srcType,
    	        encodingType: Camera.EncodingType.JPEG,
    	        mediaType: Camera.MediaType.PICTURE,
    	        allowEdit: false,
    	        correctOrientation: true
    	    }
    	    return options;
    	}


    	function _success(data){

    	}

    	function _error(error){

    	}



    }

})();
