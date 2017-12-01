(function() {
    'use strict';
    angular.module('ferramentas.module')
      .config(routeConfig);

     function routeConfig($stateProvider) {
       $stateProvider.
         state('app.seus-direitos', {
         url: '/seus-direitos',
         views: {
            'menuContent': {
                templateUrl: 'templates/ferramentas/seus-direitos/seus-direitos.html',
                controller : 'SeusDireitosCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
          }
        }).
        state('app.assunto', {
         url: '/assunto/:id',
         views: {
            'menuContent': {
                templateUrl: 'templates/ferramentas/seus-direitos/assunto.html',
                controller : 'AssuntoCtrl as vm'
            },
            'fabContent': {
                template: ''
            }
          }
        })
        ;
      };

})();
