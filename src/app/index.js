'use strict';

angular.module('uitest', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial', 'ngMessages'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl',
                resolve: {
                    rows: function ($http) {
                        return $http.get('app/rows.json').then(function(res){
                            console.log(res);
                            return res.data;
                        });
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    })

    .directive('myclick', function(){
        return function(scope, elem, attrs){
            elem.bind('touchstart click', function(event){
                event.preventDefault();
                event.stopPropagation();
                scope.$apply(attrs['myclick']);
            });
        }
    })

    .run(function($http){

        //TODO: If you try running this code from the public github repo, you will get an error because this file is not present.
        //It's only purpose is to load the necessary api keys to persist and load row data from parse, so commenting it out will allow you to
        //run all other parts of the app
        $http.get('app/parse.json').then(function(res){
            var keys = res.data.keys;
            Parse.initialize(keys[0], keys[1]);
        });

    })

;
