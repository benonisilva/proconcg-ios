(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('NovaSenhaCtrl', NovaSenhaCtrl);
        NovaSenhaCtrl.$inject = ['NovaSenhaService','$ionicLoading'];

        function NovaSenhaCtrl(NovaSenhaService,$ionicLoading){
        	
        	var vm = this;
			vm.email = "";

            vm.trocarSenha = function (email) {
                $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
               NovaSenhaService.setNovaSenha(email).then(function (data) { 
                    $ionicLoading.hide();
                    alert("Sua senha foi enviada para o email indicado.")
               },function (error){
                    $ionicLoading.hide();
                    alert("Algo deu errado.")
               });
            };
        };
})();        