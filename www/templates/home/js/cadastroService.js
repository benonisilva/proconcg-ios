(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('CadastroService', CadastroService);
        CadastroService.$inject = ['$q','$http','$timeout','ConfigService'];

    function CadastroService($q,$http,$timeout,ConfigService) { 
    	var cadastro = {
    		save : save
    	};

    	return cadastro;


        function save(cadastro){
            
            console.log("CadastroService.save: ");
            console.log(cadastro||"null");
            var url = ConfigService.get()+'/Account/Register';
            console.log(url||"null");
            var deferred = $q.defer();
            $http.post(url, cadastro).then(_successCallback, _errorCallback);

            function _successCallback(data){
                console.log("_successCallback");
                var strDados = JSON.stringify(data.data);
                console.log(strDados||"null");
                deferred.resolve(data.data);
            };

            function _errorCallback(error){
                console.log("_errorCallback");
                var strDados = JSON.stringify(error);
                console.log(strDados||"null");
                deferred.reject(error);
            };

            return deferred.promise;
        };
    }    
})();