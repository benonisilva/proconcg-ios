(function () {
    'use strict';
    angular.module('starter.controllers')
    .controller('ConfigCtrl',ConfigCtrl);
    ConfigCtrl.$inject = ['ConfigService'];
    function ConfigCtrl(ConfigService) {
        var vm = this;
        //vm.server = 'http://187.33.231.170:8080/procon-mobile';

        vn.server = "http://localhost:1119"
        vm.setup = setup;

        function setup(server) {
            ConfigService.set(server);
            console.log(server);
        }
    }
})();