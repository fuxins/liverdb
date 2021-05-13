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
            console.log("project_list value")
            console.log(response.data)
            $scope.project=response.data.project_list[0]
            console.log($scope.project);

            $scope.project.Accession=$scope.project.Accession.replace(/\"/g,"")
            $scope.project.Protocol=$scope.project.Protocol.replace(/\"/g,"")
            $scope.project.gene_count=$scope.project.gene_count.replace(/\"/g,"")
            $scope.project.cell_count=$scope.project.cell_count.replace(/\"/g,"")
            $scope.project_count=response.data.project_count
           
        })
    }
    $scope.getproject()
}