"use strict";

angular.module('liverdb')
    .controller('SearchController', SearchController);

function SearchController($scope,$http,$routeParams,$window) {
    console.log("SearchController loaded");
}