"use strict";

angular.module('liverdb')
    .controller('BrowseController', BrowseController);

    
function BrowseController($scope,$http,$routeParams,$window) {
    console.log("BrowseController loaded");
    var condition = {}

    $scope.getproject=function(){
        var species=$("#species option:selected").text();   
        //condition['species']=species.toLowerCase()
        condition['species']=species
        console.log("get species")
        console.log(species)
        $http({
            url:'/api/project',
            method:'GET',
            params:condition
        }).then(function(response){
            console.log("project_list")
            $scope.project_list=response.data.project_list
            $scope.project_count=response.data.project_count
            console.log($scope.project_list);
            var arr=$scope.project_list
            for ( var i = 0; i <arr.length; i++){
               arr[i].Accession=arr[i].Accession.replace(/\"/g,"")
               arr[i].Protocol=arr[i].Protocol.replace(/\"/g,"")
               arr[i].gene_count=arr[i].gene_count.replace(/\"/g,"")
               arr[i].cell_count=arr[i].cell_count.replace(/\"/g,"")
            }
            $scope.project_list=arr
        })
    }
    $scope.getproject()
    var obj = document.getElementById("species");
    obj.onchange = function(){
        var species=$("#species option:selected").text();   
        //condition['species']=species.toLowerCase()
        condition['species']=species
        console.log("get species")
        console.log(species)
        $http({
            url:'/api/project',
            method:'GET',
            params:condition
        }).then(function(response){
            console.log("project_list")
            $scope.project_list=response.data.project_list
            $scope.project_count=response.data.project_count
            console.log($scope.project_list);
            var arr=$scope.project_list
            for ( var i = 0; i <arr.length; i++){
               arr[i].Accession=arr[i].Accession.replace(/\"/g,"")
               arr[i].Protocol=arr[i].Protocol.replace(/\"/g,"")
               arr[i].gene_count=arr[i].gene_count.replace(/\"/g,"")
               arr[i].cell_count=arr[i].cell_count.replace(/\"/g,"")
            }
            $scope.project_list=arr

        })
    } 

    $scope.reloadRoute = function () {
        $window.location.reload();
    };
}
