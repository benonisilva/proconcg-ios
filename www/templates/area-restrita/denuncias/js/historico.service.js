(function() {
    'use strict';
    angular
        .module('starter.services')
        .service('HistoricoService', HistoricoService);     

        function HistoricoService() {
            var historico = null;
            this.getHistorico = function () {
                return historico;
            }
            this.setHistorico = function (novoHistorico){
                historico = novoHistorico;
            }
        }

})();
