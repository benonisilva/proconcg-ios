(function() {
'use strict';

angular.module('starter.services')
  .factory('localStorage',['$filter', '$window', 
    function ($filter, $window) {
    return {
        get: get,
        set: set,
        removeAll: removeAll
    };
    
    // Get data from localStorage it will use data key for getting the data.
    // Parameter :  
    // key = reference of object in localStorage.
    function get(key){
        return JSON.parse($window.localStorage[key] || "null");
    }
    
    // Add data to localStorage it will use data key 
    // by input data key and value for setting data to localStorage.
    // Parameter :  
    // key = reference of object in localStorage.
    // value = data that will store in localStorage.
    function set(key,value){
        console.log("localStorage:set");
        console.log("key: "+key);
        console.log("value: "+value);
        $window.localStorage[key] = JSON.stringify(value);
    }

    function removeAll(){
        window.localStorage.clear(); 
    }
}])
 .factory('DenunciaDB', function (localStorage) {
    return {
        //  Get all data from localStorage.
        selectAll: function () {
            //localDenuncia is the key of object that store in localStorage.
            var retVal = localStorage.get("localDenuncias");
            //console.log("all= " + retVal);
            return retVal;
        },

        // Add new note data to localStorage.
        // It will receive note data from controller to store in localStorage.
        // Parameter :  
        // note = data that will store in localStorage.
        insert: function (denuncia) {
            var denunciaList = localStorage.get("localDenuncias");
            if (denunciaList === null) {
                // For first value of data.
                denuncia.Id = 1;
                var newDenunciaData = [denuncia];
                
                localStorage.set("localDenuncias", newDenunciaData);
            } 
            else {
                // For up to second value of data.
                denuncia.Id = denunciaList.length+1;
                denunciaList.push(denuncia);
                localStorage.set("localDenuncias", denunciaList);
            }
        },

        // Update note data to localStorage.
        // It will receive note data from controller to store in localStorage.
        // Parameter :  
        // note = data that will update to localStorage.
        update: function (denuncia) {
            var denunciaList = localStorage.get("localDenuncias");

            for (var i = 0; i <= denunciaList.length; i++) {
                if (denunciaList[i].Id == denuncia.Id) {
                    denunciaList[i] = denuncia;
                    break;
                }
            }

            localStorage.set("localDenuncias", denunciaList);
        },

        // Remove data from localStorage it will receive note data
        // from controller to remove data from localStorage.
        // Parameter :  
        // note = data that will delete from localStorage.
        delete: function (denuncia) {
            var denunciaList = localStorage.get("localDenuncias");

            for (var i = 0; i <= denunciaList.length; i++) {
                if (denunciaList[i].Id == denuncia.Id) {
                    denunciaList.splice(i, 1);
                    break;
                }
            }

            localStorage.set("localDenuncias", denunciaList);
        },

        get: function (id) {
            var denunciaList = localStorage.get("localDenuncias");

            for (var i = 0; i <= denunciaList.length; i++) {
                if (denunciaList[i].id == id) {
                    return denunciaList[i];
                }
            }
        },

        // Remove All data from localStorage.
        clear: function () {
            localStorage.removeAll();
        },
        
        // Get number of notes.
        count: function () {
            var denunciaList = localStorage.get("localDenuncias");
            return (denunciaList == null ? 0 : denunciaList.length);
        }
    };
  });//End NoteDB service.
})();
