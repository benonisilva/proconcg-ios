(function() {
    'use strict';
    angular.module('area-restrita.module',['denuncias.module'])
      .config(routeConfig);

     function routeConfig($stateProvider) {
       $stateProvider.
         state('app.area-restrita', {
         url: '/area-restrita',
         views: {
            'menuContent': {
                templateUrl: 'templates/area-restrita/area-restrita.menu.html'
            },
            'fabContent': {
                template: ''
            }
          }
        }).
        state('app.add-denuncia', {
         url: '/add/denuncia/:Id',
         views: {
            'menuContent': {
                templateUrl: 'templates/area-restrita/denuncias/html/add-denuncia.html',
                controller : 'AddDenunciaCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
          },
          resolve:{
              Id: ['$stateParams', function($stateParams){
                  return $stateParams.Id;
              }]
           }
        }).
        state('app.denuncias-local', {
            url: '/denuncias-local',
            views: {
                'menuContent': {
                    templateUrl: 'templates/area-restrita/denuncias/html/denuncia-local.html',
                    controller : 'DenunciaLocalCtrl as vm'
                },
                'fabContent': {
                    template: ''
                }
            }
        })  
        ;
      };

})();
