(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('SeusDireitosCtrl', SeusDireitosCtrl);
        SeusDireitosCtrl.$inject = ['SeusDireitosService','$ionicLoading'];

        function SeusDireitosCtrl(SeusDireitosService,$ionicLoading){
        	var vm = this;
            vm.direitos = ["Bares e Restaurantes",
            "Bancos e Financeiras","Lojas e Magazines",""];
        };
})();        