(function() {
    'use strict';
    angular.module('ferramentas.module',[])
      .config(routeConfig);

     function routeConfig($stateProvider) {
       $stateProvider.
         state('app.nova-senha', {
         url: '/nova-senha',
         views: {
            'menuContent': {
                templateUrl: 'templates/ferramentas/nova-senha/html/nova-senha.html',
                controller : 'NovaSenhaCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
          }
        })
        ;
      };

})();
