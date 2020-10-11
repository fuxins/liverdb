"use strict";

angular.module('liverdb')
    .controller('HomeController', HomeController);

function HomeController($scope,$http,$routeParams,$window) {
    console.log("HomeController loaded");
}

angular.module('liverdb')
    .controller('NavController', NavController);

function NavController($scope,$http,$routeParams,$window){
    console.log("NavController loaded");

}

