(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('DenunciasEnviadasCtrl', DenunciasEnviadasCtrl);
        
        DenunciasEnviadasCtrl.$inject = ['$scope', '$stateParams', 'DenunciaService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup',
  'ArquivosService','$ionicScrollDelegate', '$state','$q','$ionicHistory','$ionicLoading'];

    function DenunciasEnviadasCtrl($scope, $stateParams, DenunciaService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,
      ArquivosFactory,$ionicScrollDelegate,$state,$q,$ionicHistory,$ionicLoading){ 

      var vm = this;
      vm.status = ["","Recebido","Processado","Falta Documento","Arquivado","Em Análise","Constatado"]
      vm.denunciasRemotas = [];
      vm.tipos = [{TipoFatoId:1,name:"Denúncia"},{TipoFatoId:2,name:"Reclamação"}];
      
      activate();
      
      function activate() {
        var promises = [initDenuncias()];
              $ionicLoading.show({
                      template: 'Carregando...'
                    });
              return $q.all(promises).then(function() {
                console.log("activate");
                $ionicLoading.hide();
              });
      };

      function initDenuncias(){
        return DenunciaService.getDenunciasRemoto().then(function(data){
          vm.denunciasRemotas = data.fatos;
          return vm.denunciasRemotas;
        });
      };
    }
})();
