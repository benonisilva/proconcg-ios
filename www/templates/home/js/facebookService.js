(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('FacebookAuthService', FacebookAuthService);
        
        FacebookAuthService.$inject = ['$q'];
        document.addEventListener("deviceready", FacebookAuthService, false);

    function FacebookAuthService($q) { 
    	
      var profile = {
            getInfo : getInfo,
            getLoginStatus : getLoginStatus
        };

        return profile;

        function getLoginStatus() {
            console.log("FacebooAuthkService.getLoginStatus");
            var q = $q.defer();
            //var prom;
            facebookConnectPlugin.getLoginStatus(function(resp){
              if(resp.status === 'connected'){
                console.log("Conectado");
                getInfo(resp.authResponse).then(function(data){
                    q.resolve(data);
                },function(err){
                    q.reject(err);
                });
              }
              else{
                  console.log("Conectando...");
                  facebookConnectPlugin.login(['email', 'public_profile'], function(resp){
                      console.log("Conectando...");
                      getInfo(resp.authResponse).then(function(data){
                        q.resolve(data);
                      },function(err){
                        q.reject(err);
                      });
                      
                  }, function(resp){
                      q.reject('erro desconhecido');
                      console.log("errrrrrrrrr");
                  });
              }
            },function(resp){
              console.log("erro getLoginStatus");
              q.reject('erro getLoginStatus');
            });

            return q.promise;
        
        };

        function getInfo(authResponse){
            var info = $q.defer();

           facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
               function (response) {
                  console.log("FacebookService");
                  console.log("getInfo");
                  console.log("Sucess");
                  console.log(response);
                  info.resolve(response);
              },
              function (response) {
                console.log("FacebookService");
                console.log("getInfo");
                console.log("Error");
                console.log(response);
                info.reject(response);
              }
            );
            
            return info.promise;
        };

        function _fnSuccess(resp) {
          if(resp.status === 'connected'){
            console.log("Conectado");
            return getInfo(resp.authResponse);
          }
          else{
            console.log("Conectando...")
            facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
          }
          
        };

        function _fnFail(resp) {
          console.log("get status fail");
        };

        function fbLoginSuccess(resp){
          return getInfo(resp.authResponse);
        };
    }
})();