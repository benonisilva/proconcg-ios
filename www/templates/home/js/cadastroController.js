(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('CadastroCtrl', CadastroCtrl);
        CadastroCtrl.$inject = ['$scope','$state','$stateParams','$ionicLoading','CadastroService','EnderecoService'];

    function CadastroCtrl($scope,$state,$stateParams,
        $ionicLoading,CadastroService,EnderecoService) { 
    	var vm = this;
    	vm.user = {
            name: "",
            rg:"",
            cpf:"",
            telefone:"",
            email:"",
            endereco:{
                logradouro:"",
                localidade:"",
                uf:"",
                cep:"",
                bairro:""

            }
        };
    	vm.buscarEndereco = buscarEndereco;
    	vm.cadastraUser = cadastraUser;
        console.log("FBProfile");
        var profileFBId = $stateParams.profile || "";
        console.log(JSON.stringify(profileFBId));
    	vm.user.name = profileFBId.name;
        vm.user.email = profileFBId.email;
        
        function buscarEndereco (cep) {
    		console.log("CadastroCtrl.buscarEndereco: "+cep);
    		EnderecoService.getEndereco(cep).then(_fnBuscaEnderecoSuccess,_fnBuscaEnderecoFail);
    	};

    	function _fnBuscaEnderecoSuccess(resp){
    		showLoading("Buscando...");
    		console.log("CadastroCtrl.buscarEndereco.fnBuscaEnderecoSuccess: ");
    		console.log(resp);
    		vm.user.endereco = resp;
    	};

    	function _fnBuscaEnderecoFail(resp){
    		console.log("CadastroCtrl.buscarEndereco.fnBuscaEnderecoFail: ");
    		console.log(resp);
            if(resp===-1){
               alert("Servidor Fora do Ar ou Você esta sem conexão de internet.");
            }else{
                  alert("Algo Deu Errado");
            }
    	};

    	function cadastraUser (user) {
    		
    		console.log("CadastroCtrl.cadastraUser.fnBuscaEnderecoSuccess: ");
            if(vm.formUser.$error.cpf) {
                console.log(vm.formUser);
                return;
            }
            console.log(user);
            
            var requerente = {
                
                "Nome": user.name,
                "Documentos[0].Numero": user.cpf,
                "Documentos[0].Tipo" : "CPF",
                "Documentos[1].Numero": user.rg+','+user.emissor,
                "Documentos[1].Tipo" : "RG",
                "Endereco.Rua": user.endereco.logradouro,
                "Endereco.Bairro" : user.endereco.bairro,
                "Endereco.Complemento": user.endereco.complemento,
                "Endereco.Cidade": user.endereco.localidade,
                "Endereco.Cep": user.endereco.cep,
                "Endereco.Estado" : "PB",
                "Endereco.Telefone":user.telefone,
                "Email": user.email,
                "Endereco.Numero" : "00"

            };
    		showLoading("Salvando...",100000);
            CadastroService.save(requerente).then(_fnSucessCadastro,_fnFailCadastro);

    	};

    	function _fnSucessCadastro (resp) {
    		console.log("CadastroCtrl.cadastraUser.fnSucessCadastro: "+ resp);
            
            if(resp.success===true){
                console.log("CadastroCtrl.cadastraUser.fnSucessCadastro: ");
                $state.go('app.home');
                alert("Link de confirmação foi enviado para seu email");
                hideLoading();

            }else{
                alert(resp.errors);
                hideLoading();
            }

    
    	};

    	function _fnFailCadastro (resp) {
    		console.log("CadastroCtrl.cadastraUser.fnFailCadastro: ");
            hideLoading();
    		console.log(resp || "");
            if(error.status===-1){
               alert("Servidor Fora do Ar ou Você esta sem conexão de internet.");
            }else{
                  alert("Algo Deu Errado");
            }
    		
    	};

    	function showLoading (text,time) {
    		$ionicLoading.show({
    		    content: 'Loading',
    		    animation: 'fade-in',
    		    showBackdrop: true,
    		    maxWidth: 200,
    		    showDelay: 0,
    		    duration:time || 1500,
    		    template:text || "..."
    		});	
    	};

    	function hideLoading () {
    		$ionicLoading.hide();	
    	};
    }	
})();