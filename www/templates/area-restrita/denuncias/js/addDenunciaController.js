(function() {
    
    'use strict';

    angular
        .module('starter.controllers')
        .controller('AddDenunciaCtrl', AddDenunciaCtrl);
        AddDenunciaCtrl.$inject = ['$scope', '$stateParams', 'DenunciaService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup',
  '$ionicScrollDelegate', '$state','$ionicLoading','$q','Id','CameraService','EnderecoService'];

    function AddDenunciaCtrl($scope, $stateParams, DenunciaService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,$ionicScrollDelegate,
      $state,$ionicLoading,$q,Id,CameraService,EnderecoService){ 
      
      console.log("AddDenunciaCtrl:Init");
      console.log(Id||"Id null");
      var vm = this;
      vm.openAlbum = openAlbum;
      vm.removePic = removePic;
      vm.openCamera = openCamera;   
      vm.denuncia = {
        FatoId : -1,
        Descricao : "",
        Empresa:{
          Cnpj:"",
          InscricaoEstadual:"",
          NomeFantasia:"",
          Endereco : {
              Cep:"",
              Rua : null,
              Bairro: null,
              Complemento:null,
              Telefone : "",
              Municipio : "Campina Grande",
              Estado : "PB",
            },
          },
        TipoFatoId:1,
        Data : "",
        Anexos : [],
        Tipo : {}
      };
      vm.logado = $scope.$parent.$parent.logged;
      vm.tipos = [{TipoFatoId:1,Nome:"Denúncia"},{TipoFatoId:2,Nome:"Reclamação"}];
      
      vm.myActiveSlide = 0;
      vm.showConfirm = showConfirm;
      vm.showConfirmEnviar = showConfirmEnviar;
      vm.nextSlide = nextSlide;
      vm.slideChanged = slideChanged;
      vm.previousSlide = previousSlide;
      vm.slideIndex = 0;
      vm.buscarEndereco = buscarEndereco;

      active(Id);

      function removePic(pos){
        vm.denuncia.Anexos.splice(pos,1);
      }

      function openCamera () {
        console.log("CameraCtrl:openCamera"); 
        CameraService.getFromCamera().then(function(data){
           vm.denuncia.Anexos.push(data);
        },function(err){
          var strData = JSON.stringify(err);
          console.log(strData);
       });  
      }

      function openAlbum(){
        console.log("CameraCtrl:openAlbum"); 
        CameraService.getFromAlbum().then(function(data){
           vm.denuncia.Anexos.push(data);
        },function(err){
          var strData = JSON.stringify(err);
          console.log(strData);
       });  
      }

      function fnFail(arg){
        console.log("showConfirmEnviar fail: "+arg);
        $ionicLoading.hide();
        alert("Falha no servidor");
     };
     
     function fnSuccess(arg){
       $ionicLoading.hide();
        console.log("fnSuccess success: "+arg);
       if(arg===true){    
          console.log("showConfirmEnviar success: "+arg);
          $state.go("app.area-restrita");
       }
    };

      /*Definicao de funcoes de escopo */
      function showConfirm(denuncia) {
      
        var confirmPopup = $ionicPopup.confirm({
          title: 'Salvar no celular',
          template: 'Deseja salvar a denúncia para posterior envio?',
          buttons: [
            { text: 'Não' },
            { text: 'Sim', type: 'button-positive', 
              onTap: function(e) {
              //e.preventDefault();
              return true;
            }
          }]
        });

        confirmPopup.then(function(res) {
          console.log('Res: ' +res);
          if(res) {
            console.log('denuncia adicionada-local');
            console.log(JSON.stringify(denuncia));
            if(denuncia.Id){
              console.log("Ja existe. Id: "+denuncia.Id);
              DenunciaService.updateLocal(denuncia);
            }else{
              
              DenunciaService.saveLocal(denuncia);
            }
            
            $state.go('app.denuncias-local');
          } else {
            console.log('');
          }
        });
      };

      function showConfirmEnviar(denuncia) {
      
        var confirmPopup = $ionicPopup.confirm({
          title: 'Enviar Denuncia',
          template: 'Deseja enviar a denúncia para o ProconCG?',
          buttons: [
            { text: 'Não' },
            { text: 'Sim', type: 'button-positive', 
              onTap: function(e) {
              //e.preventDefault();
              return true;
            }
          }]
        });

        confirmPopup.then(function(res) {
          console.log('Res: ' +res);
          if(res) {
            console.log('denuncia enviar para servidor');
            console.log(denuncia||"");
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            DenunciaService.enviar(denuncia).then(fnSuccess,fnFail);
          } else {
            console.log('You are not sure');
          }
        });
      };

      function slideChanged(index) {
        vm.slideIndex = index;
        console.log(vm.form);
      };

      function nextSlide() {
        console.log("click next index: "+vm.slideIndex);
        //console.log($scope);
        if(vm.form.$error.cnpj){
         alert('Cnpj inválido. Deixe em branco se não souber.');
         return;
        }
        
        if(vm.slideIndex===2 && vm.form.nome.$error.required){
          alert('Nome da empresa é obrigatório');
            return;
        }
        if(vm.slideIndex===4 && vm.form.descricao.$error.required){
          alert('Insira uma descrição do ocorrido.');
            return;
        }
        
        $timeout( function() {
          
          $ionicSlideBoxDelegate.next(500);
          $ionicScrollDelegate.scrollTop(true);
        }, 50);
      };

      function previousSlide() {
        $ionicSlideBoxDelegate.previous(500);
      };

      function getLocal(id){
        if(id){
          return DenunciaService.getDenunciaLocal(id).then(function(data){
            vm.denuncia = data;
            vm.denuncia.Data = new Date(data.Data);
            
            return vm.denuncia;
          });
        }else{
          return vm.denuncia;
        }
        
      };

      function _fnBuscaEnderecoSuccess(data){
        console.log(data);
        vm.denuncia.Empresa.Endereco =  {
              Cep : data.cep,
              Rua : data.logradouro,
              Bairro: data.bairro,
              Complemento:data.complemento,
              Municipio : data.localidade,
        }
      };

      function _fnBuscaEnderecoFail(error){
        console.log(error);
      };

      function buscarEndereco(cep){
        console.log("CadastroCtrl.buscarEndereco: "+cep);
        EnderecoService.getEndereco(cep).then(_fnBuscaEnderecoSuccess,_fnBuscaEnderecoFail);
      };

      function active(id) {
        console.log("Id:");
        console.log(id||"id null");
        var promises = [getLocal(id)];
              return $q.all(promises).then(function() {
                console.log("activate:getLocal");
              });
      };
    }  
})();