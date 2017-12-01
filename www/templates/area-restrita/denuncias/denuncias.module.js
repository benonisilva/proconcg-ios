(function() {
    'use strict';
    angular.module('denuncias.module',[])
      .config(routeConfig);

     function routeConfig($stateProvider) {
         $stateProvider.
        state('app.denuncias-enviadas', {
        url: '/denuncias-enviadas',
        views: {
            'menuContent': {
                templateUrl: 'templates/area-restrita/denuncias/html/denuncias-enviadas-lista.html',
                controller : 'DenunciasEnviadasCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
          }
        }).
         state('app.denuncia-detalhes',{
             url: '/denuncias-enviadas/:denunciaId',
             views: {
                 'menuContent' : {
                     templateUrl: 'templates/area-restrita/denuncias/html/denuncias-detalhes-menu.html',
                     controller: 'DetalhesCtrl as vm'
                 },
                 'fabContent': ''
             },
             resolve : {
                 fato : function ($stateParams,DenunciaService) {
                    return DenunciaService.getDenunciaById($stateParams.denunciaId);
                 }
             }
         }).
         state('app.denuncia-historico',{
           url: '/denuncias-enviadas/historico',
           views: {
              'menuContent': {
                 templateUrl: 'templates/area-restrita/denuncias/html/historico-detalhe.html',
                 controller: 'HistoricoCtrl as vm'
               },
                'fabContent': {
                 template: ''
               }
            },
         }).
          state('app.denuncia-imagens',{
             url: '/denuncia-imagens/:fatoId',
             views: {
                 'menuContent' : {
                     templateUrl: 'templates/area-restrita/denuncias/html/denuncia-imagens.html',
                     controller: 'ImagensCtrl as vm'
                 },
                 'fabContent': ''
             },
            resolve:{
              Id: ['$stateParams', function($stateParams){
                  return $stateParams.fatoId;
              }]
           }
         });
      };

})();    