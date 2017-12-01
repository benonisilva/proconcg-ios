(function () {
  'use strict';
  angular.module('starter.services', [])

.factory('FactoryHistorico', ['$q','$http',function($q,$http) {
  // Might use a resource here that returns a JSON array
  var urlHistorico = "http://192.168.56.1:8088/Home/Historico"
  // Some fake testing data
  var historicos = [
    
    {
      id: 0,
      empresa: 'Cagepa',
      motivo: 'SERVIÇO INCOMPLETO',
      parecer: 'EM ANDAMENTO'
    },
    {
      id: 1,
      empresa: 'TIM',
      motivo: 'PLANO MENTIROSO',
      parecer: 'PROCEDENTE'
    }, 
    {
      id: 2,
      empresa: 'OI/TELEMAR',
      motivo: 'SINAL PESSIMO',
      parecer: 'PROCEDENTE'
    }, 
  ];

  return {
    all: function() {
      return historicos;
    },
    remove: function(historico) {
      historicos.splice(historicos.indexOf(historico), 1);
    },
    add: function(reclamacao) {
      historicos.push(reclamacao);
    },
    
    get: function(reclamacaoId) {
      for (var i = 0; i < historicos.length; i++) {
        if (historicos[i].id === parseInt(reclamacaoId)) {
          return historicos[i];
        }
      }
      return null;
    }, 
    getHistorico : function(pesquisa){
      return $http.post(urlHistorico,pesquisa);
    }
  };
}]).factory('FactoryBuscaEndereco',function($q,$http){
    return {
      getEndereco : function(cep) {
        console.log(cep);
        var deferred = $q.defer();
        var url = 'https://viacep.com.br/ws/'+cep+'/json'
        $http.get(url,{timeout:3000}).success(function(data){

        deferred.resolve(data);
        //console.log("data" + data);               
          }).error(function(data, status,headers,config) {
            console.log("Erro-FactoryBuscaEndereco.getEndereco");
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
          deferred.reject("Error: " + status); 
        });
        
        return deferred.promise;

      }
    };
 }).factory('FactoryOpcoes', function($q,$http){

    return { 
      getOpcoes : function(tipo){
        var url = 'js/'+tipo+'.json'
        return $http.get(url);
      },

      postReclamacao : function(url,data){
          return $http.post(url,data);
      },

      postRequerente : function(url,data){
        return $http.post(url,data);
      }

    };  
 }).factory('FactoryLogin',function($q,$http){
    return {
      getLogin : function(login) {
        console.log(login);
        var url = 'teste';
        return $http.post(url,login);
        //return deferred.promise;
      }
    };
 }).service('localDBService', ['$window', function($window){

      this.saveLocal = function(key,value){
        $window.localStorage[key] = value;
      };

 }]).provider('localStorageProvider', function(){

    this.$get = ['$window', function($window){
      return {

          getLocalStorage : function(){

              return $window.localStorage;

          }

      };

    }];

 });
})();

