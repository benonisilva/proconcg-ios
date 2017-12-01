(function() {
    'use strict';
    angular
        .module('starter.services')
        .factory('ConfigService', ConfigService);         

        function ConfigService() {
            var config = {
                set : set,
                get : get
            };
            return config;

            function set(url) {
                var key = "_url";
                return;
            }

            function get() {
                return "http://191.253.16.179:8080/procon-mobile";
            }
        }

})();
