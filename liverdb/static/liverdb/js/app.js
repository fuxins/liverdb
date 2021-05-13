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
                //templateUrl:"/static/liverdb/pages/liver_browsePage.html",
                //controller:"BrowsePageController"
            })
            .when("/search",{
                templateUrl:"/static/liverdb/pages/search.html",
                controller:"SearchController"
            })
            .when("/dataset",{
                templateUrl:"/static/liverdb/pages/DataSet.html",
                controller:"DataSetController"
            })
            .when("/download", {
                templateUrl: "/static/liverdb/pages/download.html",
                //controller: "HomeController"
            })
            .when("/contact", {
                templateUrl: "/static/liverdb/pages/Contact Us.html",
                //controller: "HomeController"
            })
            .when("/help", {
                templateUrl: "/static/liverdb/pages/help.html",
                //controller: "HomeController"
            })
            .when("/test",{
                templateUrl:"/static/liverdb/lib/fornac/dist/test.html",
            })
            .when("/project_detail",{
                templateUrl:"/static/liverdb/pages/projectDetail.html",
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
