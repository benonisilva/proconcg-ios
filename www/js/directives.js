angular.module('starter.directives', ['ionic'])
.directive('onValidSubmit', ['$parse', '$timeout', function($parse, $timeout) {
    return {
      require: '^form',
      restrict: 'A',
      link: function(scope, element, attrs, form) {
        form.$submitted = false;
        var fn = $parse(attrs.onValidSubmit);
        element.on('submit', function(event) {
          scope.$apply(function() {
            element.addClass('ng-submitted');
            form.$submitted = true;
            if (form.$valid) {
              if (typeof fn === 'function') {
                fn(scope, {$event: event});
              }
            }
          });
        });
      }
    }
 
  }])
.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-7.2191022,-35.8804302),
          zoom: 20,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
})
  .directive('validated', ['$parse', function($parse) {
    return {
      restrict: 'AEC',
      require: '^form',
      link: function(scope, element, attrs, form) {
        var inputs = element.find("*");
        for(var i = 0; i < inputs.length; i++) {
          (function(input){
            var attributes = input.attributes;
            if (attributes.getNamedItem('ng-model') != void 0 && attributes.getNamedItem('name') != void 0) {
              var field = form[attributes.name.value];
              if (field != void 0) {
                scope.$watch(function() {
                  return form.$submitted + "_" + field.$valid;
                }, function() {
                  if (form.$submitted !== true) return;
                  var inp = angular.element(input);
                  if (inp.hasClass('ng-invalid')) {
                    element.removeClass('has-success');
                    element.addClass('has-error');
                  } else {
                    element.removeClass('has-error').addClass('has-success');
                  }
                });
              }
            }
          })(inputs[i]);
        }
      }
    }
  }])
;

angular.module('ionicSelect', [])
 .directive('ionSelect', function($timeout, $ionicScrollDelegate, $location) {
  return {
    restrict: 'EAC',
    scope: {
      label: '@',
      labelField: '@',
      provider: '=',
      scrollto:'@',
      ngModel: '=?',
      ngValue: '=?',

    },
    require: '?ngModel',
    transclude: false,
    replace: false,
    template:   '<label class="item-input" id="'+'{{scrollto}}'+'">' +'<span class="input-label">{{label}}</span>'+
    '<input id="filtro" type="search"  ng-model="ngModel" ng-value="ngValue" ng-keydown="onKeyDown()"/>' +
    '</label>'+
     '<div class="optionList" ng-show="showHide">' + '<ion-scroll>' +
    '<ul class="list">' + '<li class="item" ng-click="selecionar(item)" ng-repeat="item in provider | dynamicFilter:[labelField,ngModel]">{{item[labelField]}}</li>' +
    '</ul>' + '</ion-scroll>' + '</div>',

    link: function(scope, element, attrs, ngModel) {
      scope.ngValue = scope.ngValue !== undefined ? scope.ngValue : "item";
      //console.log(scope.ngValue);
      scope.selecionar = function(item) {
        ngModel.$setViewValue(item);
        scope.showHide = false;
      };

      element.bind('click', function() {
        //element.find('input').focus();
      });

      scope.scrollToMe = function(){
        // $ionicScrollDelegate.scrollBottom();
        //console.log();
        var location = $location.hash(scope.scrollto);
        $timeout( function(){
          $ionicScrollDelegate.anchorScroll("#"+location);
        });
      };

      scope.open = function() {
        scope.ngModel = undefined;
        $timeout(function() {
          scope.scrollToMe();
          return scope.showHide = !scope.showHide;

        }, 150);
      };
      scope.onKeyDown = function() {
        scope.showHide = true;
        scope.scrollToMe();
      };

      scope.$watch('ngModel', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          if (scope.showHide === false) {
            element.find('input').val(newValue[scope.labelField]);
            scope.scrollToMe();
          }
        }
        if (!scope.ngModel) {
          scope.showHide = false;
          //scope.scrollToMe();
        }
      });

    }
  };
}).filter('dynamicFilter', ["$filter", function ($filter) {
    return function (array, keyValuePairs) {
        var obj = {}, i;
        for (i = 0; i < keyValuePairs.length; i += 2) {
            if (keyValuePairs[i] && keyValuePairs[i+1]) {
                obj[keyValuePairs[i]] = keyValuePairs[i+1];
            }
        }
        return $filter('filter')(array, obj);
    };
}]);