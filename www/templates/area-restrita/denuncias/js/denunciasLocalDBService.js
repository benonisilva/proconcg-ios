(function() {
'use strict';
angular
    .module('starter')
    .factory('DenunciaLocalDBService', DenunciaLocalDBService);

DenunciaLocalDBService.$inject = ['$q','$timeout','localStorage'];

/*Def do DenunciaLocalDBService*/
function DenunciaLocalDBService($q,$timeout,localStorage) { 
	console.log("init DenunciaLocalDBService");

	var denunciasLocal = {
    	
    	getAll : getAll,
    	insert : insert,
    	deleta : deleta,
    	update : update,
    	get : get
    };

    return denunciasLocal;

    /*Def functions*/

    function insert(denuncia){
    	var key = "_denuncias";
    	var denunciaList = localStorage.get(key);
    	if (denunciaList === null) {
    	    // For first value of data.
    	    denuncia.Id = 1;
    	    var newDenunciaData = [denuncia];
    	    
    	    localStorage.set(key, newDenunciaData);
    	} 
    	else {
    	    // For up to second value of data.
    	    denuncia.Id = denunciaList.length+1;
    	    denunciaList.push(denuncia);
    	    localStorage.set(key, denunciaList);
    	}
    	return;
    }

    function getAll(){
    	var key = "_denuncias";
    	var denuncias = [];
    	var defer = $q.defer();
    	$timeout(function(){
    		denuncias = localStorage.get(key);
    		defer.resolve(denuncias);
    	},50);
    	return defer.promise;
    }

    function deleta(id){
    	var key = "_denuncias";
    	var denunciaList = localStorage.get(key);
        if(denunciaList){
            for (var i = 0; i <= denunciaList.length; i++) {
                if (denunciaList[i].Id == id) {
                    denunciaList.splice(i, 1);
                    break;
                }
            }
            localStorage.set(key, denunciaList);
        }
    }

    function update(denuncia){
    	
    	var key = "_denuncias";
    	var denunciaList = localStorage.get(key);
    	for (var i = 0; i <= denunciaList.length; i++) {
    	    if (denunciaList[i].Id == denuncia.Id) {
    	        denunciaList[i] = denuncia;
    	        break;
    	    }
    	}

    	localStorage.set(key, denunciaList);
    }

    function get(id){
    	var key = "_denuncias";
    	var denunciaList = localStorage.get(key);
    	for (var i = 0; i <= denunciaList.length; i++) {
    	    if (denunciaList[i].Id == id) {
    	        return denunciaList[i];
    	    }
    	}
    }
    /*End def.*/
}

})();
