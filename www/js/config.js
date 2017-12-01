angular.module('starter.config',[]).config(
	function($stateProvider, $urlRouterProvider, 
		$ionicConfigProvider,$httpProvider) {
	$ionicConfigProvider.backButton.previousTitleText(false);
	$ionicConfigProvider.backButton.icon('ion-chevron-left');
	$ionicConfigProvider.backButton.text('Voltar');
	 $httpProvider.interceptors.push('HttpInterceptor');
});