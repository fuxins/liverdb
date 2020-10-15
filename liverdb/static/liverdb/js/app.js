"use strict";

angular.module('liverdb', ['ui.bootstrap', 'ngRoute', 'pageslide-directive', 'ui.bootstrap-slider', 'bw.paging','tableSort'])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/static/liverdb/pages/home.html",
                controller: "HomeController"
            })
            .when("/home",{
                templateUrl: "/static/liverdb/pages/home.html",
                controller: "HomeController"
            })
            .when("/document", {
                templateUrl: "/static/liverdb/pages/document.html",
                //controller: "HomeController"
            })
            .when("/contact", {
                templateUrl: "/static/liverdb/pages/contact.html",
                //controller: "HomeController"
            })
            .when("/test",{
                templateUrl:"/static/liverdb/lib/fornac/dist/test.html",
            })
            .otherwise({
                redirectTo: "/404.html"
            });
    })
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })
.service('liverdbService',function(){
    this.getAPIBaseUrl=function () {
        return "/liverdb"
    }
});
