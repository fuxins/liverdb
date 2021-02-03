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
            .when("/browse",{
                templateUrl:"/static/liverdb/pages/browse.html",
                controller:"BrowseController"
            })
            .when("/search",{
                templateUrl:"/static/liverdb/pages/search.html",
                controller:"SearchController"
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
            .when("/project_detail",{
                templateUrl:"//static/liverdb/pages/projectDetail.html",
                controller:"ProjectDetailController"
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
