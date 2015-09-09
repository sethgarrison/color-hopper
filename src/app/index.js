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

    .run(function(){

        //TODO: for now, i'm hiding this so i can push to my public repo, to really run this, switch these out
        Parse.initialize("hidingthis", "fromgithub");

    })

;
