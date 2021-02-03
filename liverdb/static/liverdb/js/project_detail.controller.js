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
            $scope.project.Accession=$scope.project.Accession.replace(/\"/,"")
            $scope.project.Protocol=$scope.project.Protocol.replace(/\"/,"")
            $scope.project.gene_count=$scope.project.gene_count.replace(/\"/,"")
            $scope.project.cell_count=$scope.project.cell_count.replace(/\"/,"")
            $scope.project_count=response.data.project_count
            console.log($scope.project);

        })
    }
    $scope.getproject()
}