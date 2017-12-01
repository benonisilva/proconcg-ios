(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('EnderecoService', EnderecoService);
        EnderecoService.$inject = ['$q','$http'];

    function EnderecoService($q,$http) { 
    	var service = {
    		getEndereco : getEndereco
    	};

        return service;

        function getEndereco(cep) {
    		console.log(cep);
    		var deferred = $q.defer();
    		var url = 'https://viacep.com.br/ws/'+cep+'/json'
    		$http.get(url,{timeout:5000}).success(function(data){
    			console.log("EnderecoService.endereco.getEndereco:get:succes:data"+data);
    			deferred.resolve(data);             
    		  }).error(function(data, status,headers,config) {
    		    console.log("FactoryBuscaEndereco.endereco.getEndereco:fail");
    		    console.log(data);
    		    console.log(status);
    		    console.log(headers);
    		    console.log(config);
    		  deferred.reject(status); 
    		});
    		
    		return deferred.promise;
    	};
    }    
})();