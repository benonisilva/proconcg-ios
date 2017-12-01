
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('HomeCtrl', HomeCtrl);
        HomeCtrl.$inject = ['$scope', '$state', 
        '$ionicLoading','FacebookAuthService'];
    
    function HomeCtrl($scope, $state, $ionicLoading,FacebookAuthService) { 
    	var vm = this;
    	var status;
    	var profileInfo;
        vm.facebookSignIn = facebookSignIn;
		
		function fnSuccess(resp){
			console.log("HomeCtrl.facebookSignIn.fnSuccess:");
            console.log(resp || "");
            $state.go("app.cadastro",{profile:resp});
		};

		function fnFail(resp){
			console.log("HomeCtrl.facebookSignIn.fnFail:");
            console.log(resp || "");
		};

        function facebookSignIn () {
            console.log("HomeCtrl.facebookSignIn:");
            FacebookAuthService.getLoginStatus().then(fnSuccess,fnFail);
        };    	

    }
})();
