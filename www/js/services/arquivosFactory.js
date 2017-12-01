(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('ArquivosService', ArquivosService);

    ArquivosService.$inject = ['$q'];

    document.addEventListener("deviceready", ArquivosService, false);
    function ArquivosService($q) { 

        //console.log(cordova.file.cacheDirectory);
        // window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
        //     console.log('file system open: ' + dirEntry.name);
        //     //var isAppend = true;
        //     //createFile(dirEntry, "fileToAppend.txt", isAppend);
        // }, _onErrorLoadFs);
    	
        var arquivos = {
    		
            getFiles : getFiles,
            saveFile : saveFile,
            deleteFile : deleteFile,
            createDir :  createDir,
            deleteDir : deleteDir,
            copyFiles : copyFiles
    	};

    	return arquivos;

        function copyFiles(from,to){

        };

        function _onErrorLoadFs(err){
            console.log("_onErrorLoadFs");
        };

    	function getFiles(dir){
    		
    	};

        function saveFile(dir,fileName,data){
            
        };

        function deleteFile(dir,fileName){

        };

        function deleteDir(dir,fileName){

        };

        function createDir(base,dir){

          return $cordovaFile.createDir(base, dir, false);
        };

    }
})();