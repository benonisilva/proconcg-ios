(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('DenunciaLocalCtrl', DenunciaLocalCtrl);
        
        DenunciaLocalCtrl.$inject = ['$scope', '$stateParams', 'DenunciaService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup',
  'ArquivosService','$ionicScrollDelegate', '$state','$q','$ionicHistory','$ionicLoading'];

    function DenunciaLocalCtrl($scope, $stateParams, DenunciaService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,
      ArquivosFactory,$ionicScrollDelegate,$state,$q,$ionicHistory,$ionicLoading){ 

      var vm = this;
      vm.status = ["","Em Andamento","Arquivado"]
      vm.denunciasLocal = [];
      vm.tipos = [{TipoFatoId:1,name:"Denúncia"},{TipoFatoId:2,name:"Reclamação"}];
      activate();

      function activate() {
        var promises = [getLocal()];
              $ionicLoading.show({
                      template: 'Carregando...',
                      duration: 1000
                    });
              return $q.all(promises).then(function() {
                console.log("activate");
                $ionicLoading.hide();
              });
      };
      function getLocal(){
        return DenunciaService.getDenunciasLocal().then(function(data){
          console.log("DenunciasCtrl.getLocal")
          vm.denunciasLocal = data;
          console.log(data||"getLocal null");
          return vm.denunciasLocal;
        });
        
      };
    }
})();
