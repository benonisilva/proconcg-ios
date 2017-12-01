(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('NovaSenhaService', NovaSenhaService);
        NovaSenhaService.$injetc = ['$q','$http','ConfigService'];
    function NovaSenhaService($q,$http,ConfigService) { 

      var NovaSenha = {
        setNovaSenha : setNovaSenha
      }

      return NovaSenha;

      function setNovaSenha(email){
        var q = $q.defer();
        var url = ConfigService.get() + '/Account/NovaSenha'
        $http.post(url,{email:email})
          .then(_successCallback, _errorCallback).catch(function(e){
            console.log(e || "catch login error");
        });

        function _successCallback(data){
          q.resolve(data);
        }

        function _errorCallback(err){
            q.reject(err);
        }

        return q.promise;  
      }
      
    };

})();