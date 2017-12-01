(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('ImagensCtrl', ImagensCtrl);
        
        ImagensCtrl.$inject = ['$scope','DenunciaService','$q','Id','CameraService','$ionicLoading','$state'];

    function ImagensCtrl($scope,DenunciaService,$q,Id,CameraService,$ionicLoading,$state){ 
      var vm = this;
      vm.Anexos = [];
      vm.removePic = removePic;
      vm.id = 0;
      init();
     

      function init () {
        vm.id = Id;
        return vm.id;
      }

      vm.salvar = enviaImagem;
      
      vm.openCamera = function () {
          console.log("CameraCtrl:openAlbum:fatoId: "+vm.id); 
          CameraService.getFromAlbum().then(function(data){
             vm.Anexos.push(data);
          },function(err){
          var strData = JSON.stringify(err);
          console.log(strData);
          });  
       };
      
      function enviaImagem(id,anexos) {
        console.log("ImagensCtrl.enviaImagem");
        if(anexos.lenght===0){
          return;
        }
        $ionicLoading.show({
                content: 'Enviando...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
         });
         var promisses = DenunciaService.uploadFiles(id,anexos);
         $q.all(promisses).then(function(data){
           console.log("uploadFiles:success: ", data);
           $ionicLoading.hide();
           alert("Provas Enviadas.");
           $state.go("app.area-restrita");
         },function(err){
           console.log("uploadFiles:success: "+err);
           alert(err);
           $ionicLoading.hide();
        });
      };

      function removePic(pos){
        vm.Anexos.splice(pos,1);
      };
    
    }
})();
