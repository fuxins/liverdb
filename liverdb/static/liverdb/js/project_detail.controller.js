"use strict";

angular.module('liverdb')
    .controller('ProjectDetailController', ProjectDetailController);

function ProjectDetailController($scope,$http,$routeParams,$window) {
    $scope.pmid=$routeParams.pmid
    var condition={}
    console.log("ProjectDetailController loaded");
    condition['PMID']=$scope.pmid
    $scope.getproject=function(){
        $http({
            url:'/api/project',
            method:'GET',
            params:condition
        }).then(function(response){
            console.log("project_list")
            $scope.project=response.data.project_list[0]
            $scope.project_count=response.data.project_count
            console.log($scope.project_list);

        })
    }
    $scope.getproject()
}