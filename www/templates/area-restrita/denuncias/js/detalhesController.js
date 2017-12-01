(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('DetalhesCtrl', DetalhesCtrl);
        
        DetalhesCtrl.$inject = ['$scope','fato','HistoricoService'];

    function DetalhesCtrl($scope,fato,HistoricoService){ 
      
      console.log("DetalhesCtrl:init");
      var fato = fato.data;
      console.log(fato);
      var vm = this;
      vm.fato = JSON.parse(fato).fatos;
      HistoricoService.setHistorico(vm.fato.Historico);
     
    
    }
})();
