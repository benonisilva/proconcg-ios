(function() {
    'use strict';

    angular
        .module('stater.services.user',[])
        .provider('UserLocal', UserLocal);
       
    
    function UserLocal() { 

      var user = {};

      this.setUser = function(user_data) {
        window.localStorage.setItem('_user',JSON.stringify(user_data));
        user = user_data;
      };

      function User() {
          this.user = function() {
            return window.localStorage.getItem('_user');
          }
        }

      this.$get = function(){
        return new User();
      };
    }

})();