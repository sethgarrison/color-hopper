'use strict';

angular.module('uitest')
    .directive('capstart', function(){
        var CAP_EXP = /[A-F]|[\u0080-\u024F]|[N-Z]/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.capstart = function(modelValue, viewValue) {
                    console.log(viewValue);
                    if(!viewValue){ return false; }
                    return CAP_EXP.test(viewValue[0]);
                };
            }
        };
    })
    .directive('dashrequired', function(){
        var DASH_EXP = /([A-Z]-[0-9]{4})/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.dashrequired = function(modelValue, viewValue) {
                    if(!viewValue){return false;}
                    if(viewValue.length === 1){
                        return true;
                    }
                    else{
                        return DASH_EXP.test(viewValue);
                    }
                };
            }
        };
    });