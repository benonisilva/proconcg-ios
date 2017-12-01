(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('DenunciaService', DenunciaService);
        DenunciaService.$inject = ['$q','$http','$timeout',
        'DenunciaLocalDBService','$cordovaFileTransfer','ConfigService'];

    function DenunciaService($q,$http,$timeout,
      DenunciaLocalDBService,$cordovaFileTransfer,ConfigService) { 
      
      var denuncia = {
        
        saveLocal : saveLocal,
        enviar : enviar,
        getDenunciasLocal : getDenunciasLocal,
        getDenunciasRemoto : getDenunciasRemoto,
        getDenunciaLocal : getDenunciaLocal,
        updateLocal : updateLocal,
        getHistorico : getHistorico,
        getDenunciaById : getDenunciaById,
        uploadFiles : uploadFiles
      
      };

      return denuncia;

      function updateLocal(denuncia){
        DenunciaLocalDBService.update(denuncia);
      }

      function getDenunciaById(id) {
         console.log("getDenunciaById.getHistorico: ");
         var url = ConfigService.get()+'/Fato/Fato/'+id;
         return $http.get(url);
      }
      
      function getHistorico (id) {
        console.log("DenunciaService.getHistorico: ");
        var url = ConfigService.get()+'/Fato/Historico/'+id;
        return $http.get(url);
      }

      function enviar(denuncia){
            
            console.log("Denuncia.enviar: ");
            console.log(denuncia||"null");
            var url = ConfigService.get()+'/Fato/Adicionar';
            var idLocal = denuncia.Id;
            var tipos = [{TipoFatoId:1,Nome:"Denúncia"},{TipoFatoId:2,Nome:"Reclamação"}];
            
            var retVal = {
              Tipo:tipos[denuncia.TipoFatoId -1],
              Descricao : denuncia.Descricao.replace(/[^\w\s]/gi, ''),
              Data: denuncia.Data || new Date().toISOString(),
              Empresa: {
                Cnpj : denuncia.Empresa.Cnpj,
                NomeFantasia : denuncia.Empresa.NomeFantasia,
                InscricaoEstadual : denuncia.Empresa.InscricaoEstadual,
                Endereco : {
                         Rua : denuncia.Empresa.Endereco.Rua,
                         Telefone : denuncia.Empresa.Endereco.Telefone,
                         Complemento : denuncia.Empresa.Endereco.Complemento,
                         Bairro : denuncia.Empresa.Endereco.Bairro,
                         Numero : denuncia.Empresa.Endereco.Numero,
                         Cep : denuncia.Empresa.Endereco.Cep,
                         Municipio : denuncia.Empresa.Endereco.Municipio,
                }
              },
              Anexos : denuncia.Anexos
            };

            var deferred = $q.defer();
            $http.post(url, retVal).then(_successCallback, _errorCallback);

            function _successCallback(data){
                var strData = JSON.stringify(data);
                console.log("Service:_successCallback");
                console.log(strData||"null");
                if(idLocal){
                  DenunciaLocalDBService.deleta(idLocal);
                }
                console.log(data.data.novoFato.FatoId);
                var listPromiss = uploadFiles(data.data.novoFato.FatoId,retVal.Anexos);
                $q.all(listPromiss).then(_win,_fail,_progress);
                deferred.resolve(true);
            };

            function _errorCallback(data){
                var strError = JSON.stringify(data);
                console.log("Service:_errorCallback");
                console.log(strError||"null");
                deferred.reject(false);
            };

            return deferred.promise;
      };

      function uploadFiles(id,arquivos) {
        console.log("uploadFiles: " + id);

        var server = ConfigService.get()+'/Fato/AdicionarAnexo?fatoId='+id;
        var promisses = [];
        
        var options = {
          
          fileKey:'arquivo',
          fileName:"arquivoTeste",
          params:{fatoId:id}

        };
        
        for(var i=0; arquivos.length > i; i++ ){
          options.fileName = arquivos[i].split("/").pop();
          promisses.push($cordovaFileTransfer.upload(server, arquivos[i], options));
        
        }
        return promisses;
      };

      function _win(data){
          console.log("uploadFiles:_win");
          var strdata = JSON.stringify(data);
          console.log(strdata);
        };

        function _fail(error){
          console.log("uploadFiles:_fail");
          var strdata = JSON.stringify(error);
          console.log(strdata);
        };

        function _progress(res){
          console.log("res");
          console.log(res);

        }; 

      function saveLocal(denuncia){
           
           console.log("Denuncia.saveLocal: ");
           console.log(denuncia||"null");

           var deferred = $q.defer();
           DenunciaLocalDBService.insert(denuncia);

           function _successCallback(data){
               console.log("_successCallback");
               console.log(data||"null");
               deferred.resolve(true);
           };

           function _errorCallback(data){
               console.log("_errorCallback");
               console.log(data||"null");
               deferred.reject(false);
           };

           return deferred.promise;
      };

      function getDenunciasLocal(){
        return DenunciaLocalDBService.getAll();
      };

      function getDenunciasRemoto(){
          console.log("DenunciaService.getDenunciasRemoto: ");
          var url = ConfigService.get()+'/Fato/Listar';
          
          return $http.get(url).then(_successCallback, _errorCallback).
            catch(_getFailed);

          function _successCallback(response){
               //var strResp = JSON.stringify(response);
               var fatos = JSON.parse(response.data);
               console.log("getDenunciasRemoto:_successCallback");
               console.log(fatos||"null");
               return fatos;
           };

           function _errorCallback(data){
               var strResp = JSON.stringify(data);
               console.log("getDenunciasRemoto:_errorCallback");
               console.log(strResp||"null");
           };

          
          function _getFailed(_getFailed) {
            var strResp = JSON.stringify(error);
            console.log("_errorCallback");
            console.log(strResp||"null");
          };
      };

      function getDenunciaLocal(id){
          var defer = $q.defer();
          var denuncia;
          $timeout(function(){
            denuncia = DenunciaLocalDBService.get(id);
            console.log("denuncia");
            console.log(JSON.stringify(denuncia));
            defer.resolve(denuncia);
          },50);
          return defer.promise;

      };
    }    
})();
