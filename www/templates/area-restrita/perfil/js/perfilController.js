(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('PerfilCtrl', PerfilCtrl);
        
        PerfilCtrl.$inject = ['$scope','$q','$ionicModal','PerfilService','$ionicLoading'];

        function PerfilCtrl($scope,$q,$ionicModal,PerfilService,$ionicLoading){
        	
        	var vm = this;
        	console.log("init:PerfilCtrl");
            
            vm.openEditarEndereco = openEditarEndereco;
            vm.openMudarSenha = openMudarSenha;
            vm.salva = salva;
            vm.fecha = fecha;
            vm.fechaModalSenha = fechaModalSenha;
            vm.getEndereco = getEndereco;
            vm.mudarSenha = mudarSenha;
            
            vm.modal = {};
            vm.senha = {};
            vm.modalSenha = {};
            vm.endereco = {cep:"555555"};
            

            $ionicModal.
                 fromTemplateUrl('templates/area-restrita/perfil/html/editarEndereco.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                vm.modal = modal;
            });

            $ionicModal.
                 fromTemplateUrl('templates/area-restrita/perfil/html/mudarSenha.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                vm.modalSenha = modal;
            });  

        	activate();

        	function activate() {
        	  console.log("init:PerfilCtrl.activate");
              
              
              
              var promises = [initEndereco()];
        	    return $q.all(promises).then(function() {
        	       console.log("activate");
        	    });
        	}

        	function initEndereco(){
        		return PerfilService.getPerfil().then(function(data){
        			console.log(data);
        			vm.endereco = data;
        			return vm.endereco;
        		});
        	}

            function salva(endereco){
               
                $ionicLoading.show({
                      template: 'Salvando...'
                    });
                PerfilService.updatePerfil(endereco).then(function(){
                    $ionicLoading.hide();
                });

            }

            function fecha(){
                console.log("fecha");
                vm.modal.hide();
            }

            function openEditarEndereco(){
                console.log("init:PerfilCtrl.openEditarEndereco");
                //console.log(vm.endereco);
                vm.modal.show();
            }

            function openMudarSenha(){
                console.log("init:PerfilCtrl.openEditarEndereco");
                vm.modalSenha.show();
            }

            function fechaModalSenha(){
                console.log("init:PerfilCtrl.fechaModalSenha");
                vm.modalSenha.hide();
            }

            function getEndereco(cep){

            }

            function mudarSenha(senha){
                console.log(senha);
                PerfilService.mudarSenha(senha);
            }

        };
})();        