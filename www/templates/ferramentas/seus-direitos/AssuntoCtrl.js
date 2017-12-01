(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('AssuntoCtrl', AssuntoCtrl);
        AssuntoCtrl.$inject = ['SeusDireitosService'];

        function AssuntoCtrl(SeusDireitosService){
        	var vm = this;
            vm.grupos = [
                {
                    nome:"Perda de comanda",
                    item : "É prática abusiva a cobrança de multa por perda de comanda e etcd"
                },
                {
                    nome:"Perda de comanda",
                    item : "É prática abusiva a cobrança de multa por perda de comanda e etcd"+
                    "fdsfdsf sfds fsd fs fsd fsdf sd fsd fs dfs df sd fs df sdf sd fs dfsdfsdfsdfsdfsd"
                },
                {
                    nome:"Perda de comanda",
                    item : "É prática abusiva a cobrança de multa por perda de comanda e etcd"
                }
            ];

            vm.toggleGroup = function (group) {
                group.show = !group.show;
            };

            vm.isGroupShown = function (group) {
                return group.show;
            };
        };
})();        