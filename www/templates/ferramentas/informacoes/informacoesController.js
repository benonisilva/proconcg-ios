(function () {
    'use strict';
    angular.module('starter.controllers')
    .controller('InfoCtrl',InfoCtrl);
    InfoCtrl.$inject = ['$ionicSlideBoxDelegate','$timeout'];
    function InfoCtrl($ionicSlideBoxDelegate,$timeout) {
        var vm = this;
        //console.log("InfoCtrl");
        vm.myActiveSlide = 0;
        $timeout(function() {$ionicSlideBoxDelegate.$getByHandle('sliderBan').update();}, 1500);
     vm.slideChanged = function (index) {
        vm.slideIndex = index;
        //console.log("proximaimagem");
      };
    vm.imagens = function () {
        var indices = [];
        for (var index = 1; index <= 24; index++) {
            var uri = "img/manual/manual-"+index;
            indices.push(uri+".jpg");
            
        }
        return indices;
    };
    }
})();