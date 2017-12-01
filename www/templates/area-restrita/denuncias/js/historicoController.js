(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('HistoricoCtrl', HistoricoCtrl);
        
        HistoricoCtrl.$inject = ['$scope', 'HistoricoService'];

    function HistoricoCtrl($scope,HistoricoService){ 

      var vm = this;
      vm.lista = [];
      
      activate();

      function activate() {
         return vm.lista = HistoricoService.getHistorico();
      };
    }
})();
