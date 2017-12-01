(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('PerfilService', PerfilService);
        
        PerfilService.$injetc = ['$q','$http','constantConfig'];
    
    function PerfilService($q,$http,constantConfig) { 

      var perfil = {
        
        updatePerfil : updatePerfil,
        getPerfil : getPerfil,
        mudarSenha : mudarSenha

      }

      return perfil;

      function getPerfil(){
      	var q = $q.defer();
      	var user = window.localStorage.getItem('_user');
        var userObj = JSON.parse(user);
        console.log(user);
      	q.resolve(userObj);
      	return q.promise;
      }

      function mudarSenha(senha){
      	var q = $q.defer();
      }

      function updatePerfil(endereco){
        var q = $q.defer();
        var user = {
                   
                   Nome: null,
                   Cpf: null,
                   Endereco: endereco.logradouro,
                   Bairro : endereco.bairro,
                   Complemento: endereco.complemento,
                   Cidade: endereco.localidade,
                   Cep: endereco.cep,
                   UfId : 15, //LightBase
                   Telefone: endereco.telefone,
                   //TipoDoDocumentoId: user.tipoDocumento,
                   Email: null,
                   FacebookUserId: null,
                   Rg: null

        };
        var url = constantConfig.url + '/Home/Update'
        $http.post(url,user)
          .then(_successCallback, _errorCallback).catch(function(e){
            console.log(e || "catch login error");
        });

        function _successCallback(data){
          _updateLocal(endereco);
          q.resolve(data);
        }

        function _errorCallback(err){
            q.reject(err);
        }

        function _updateLocal(user){
        	var strData = JSON.stringify(user);
        	window.localStorage.setItem('_user',strData);
        }

        return q.promise;  
      }
      
    };

})();