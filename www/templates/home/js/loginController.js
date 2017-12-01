(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('LoginCtrl', LoginCtrl);
        LoginCtrl.$inject = ['$scope','$ionicLoading','$state','LoginService','$ionicHistory','$q'];

    function LoginCtrl($scope,$ionicLoading,$state,LoginService,$ionicHistory,$q) { 
    	var vm = this;
        vm.user = {Email:'',Password:''};
        vm.login = login;
        active();
        function active() {
           console.log("LoginCtrl:active");
           var promises = [getLocal()];
              return $q.all(promises).then(function() {
                console.log("activate:getLocal");
           });
      };
        
        function login(user) {
            console.log("login: "+user.email);
            
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            LoginService.getUser(user).then(fnSuccess,fnFail);
        };

        function fnSuccess(arg){
            var strArg = JSON.stringify(arg);
            $ionicLoading.hide();
            if(arg===true){    
                console.log("login success: "+strArg);
                $ionicHistory.clearHistory();
                $scope.$parent.setLogged(true);
                $state.go("app.area-restrita");
                
            }else{
                alert("Email ou senha incorretos, ou não ativou a conta.");
            }
            
        };
        function fnFail(arg){
            var strFail = JSON.stringify(arg);
            console.log("login fail: "+strFail);
            $ionicLoading.hide();
            if(arg.status===-1){
                alert("Servidor Fora do Ar ou Você esta sem conexão de internet.");
            }else{
                alert("Algo Deu Errado");
            }
           
            
        };

        function getLocal () {
            return LoginService.getLogin().then(function (data) {
                console.log(data);
                return vm.user = data;
            });
        }
    }    
})();