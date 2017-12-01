(function() {
    'use strict';
    angular
        .module('starter.services')
        .factory('SeusDireitosService', SeusDireitosService);         

        function SeusDireitosService($http) {
            var direitos = {
                get : get,
                getByAssunto : getByAssunto
            };
            return direitos;

            function get() {
                return $http.get("http://189.80.19.75:8080/procon-mobile/SeusDireitos");
            }

            function getByAssunto(assunto) {
                return $http.get("http://189.80.19.75:8080/procon-mobile/SeusDireitos?assunto="+assunto);
            }
        }

})();
