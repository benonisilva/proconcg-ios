(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('LoginService', LoginService);
        LoginService.$inject = ['$q','$http','$timeout','ConfigService'];

    function LoginService($q,$http,$timeout,ConfigService) { 
    	var login;
        
        login = {
    		
            getUser : getUser,
            getLogin : getLogin
    	};

    	return login;
        function getUser(login){
            
            console.log("LoginService.getUser: ");
            console.log(login||"null");
            
            var url = ConfigService.get()+'/Account/Login';

            var deferred = $q.defer();
            $http.post(url,login)
              .then(_successCallback, _errorCallback).catch(function(e){
                console.log(e || "getUser:catch login error");
            });

            function _successCallback(data){
                var strData = JSON.stringify(data);
                console.log("_successCallback");
                console.log(strData||"null");
                if(data.data.success===true){
                    console.log("getUser:_successCallback:login:success:true");
                    var user = window.localStorage.getItem('_user');
                    if(user === null || user === undefined){
                         var userObj = {Email:login.Email,Password:login.Password};
                         window.localStorage.setItem('_user',JSON.stringify(userObj));
                    }
                    deferred.resolve(true);
                }else{
                    console.log("getUser:_successCallback:success:false");
                    deferred.resolve(false);
                }
                
            };

            function _errorCallback(data){
                var strFail = JSON.stringify(data);
                console.log("getUser:_errorCallback");
                console.log(strFail||"null");
                deferred.reject(data);
            };

            return deferred.promise;
        };

        function getLogin () {
           var deferred = $q.defer();
           var user = window.localStorage.getItem('_user');
            if(user !== null && user !== undefined){
                var userObj = JSON.parse(user);
                console.log(userObj);
                deferred.resolve(userObj);
            }else{
                var userObj = {Email:login.Email,Password:login.Password};
                deferred.resolve(userObj);
            }

             return deferred.promise;
        }
    }    
})();