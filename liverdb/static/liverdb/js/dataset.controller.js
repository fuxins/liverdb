"use strict";

angular.module('liverdb')
    .controller('DataSetController', DataSetController);

function DataSetController($scope,$http,$routeParams,$window){
    console.log("DataSetController loaded")

    var  cell_type_name = ['Activated fibroblast', 'B cell', 'Biliary epithelial cell Ahsg_high', 'Biliary epithelial cell E030024N20Rik_high', 'Biliary epithelial cell Fos_high', 'Biliary epithelial cell Ifrd1_high', 'Biliary epithelial cell Iigp1_high', 'Biliary epithelial cell Pdpn_high', 'Biliary epithelial cell Prkdc_high', 'Biliary epithelial cell Sox7_high', 'CD4+ T cell', 'CXCR6+ T cell', 'Capillary Endothelial cell 1', 'Capillary Endothelial cell 2', 'Capillary Endothelial cell 3', 'Capillary arterial Endothelial cell', 'Capillary venous Endothelial cell', 'Central Fibroblast', 'Central artery smooth muscle cell', 'Cholangiocyte', 'Cholangiocyte 1', 'Cholangiocyte 2', 'Conventional dendritic cell 1', 'Conventional dendritic cell 2', 'Cycling cell', 'Dendritic cell', 'Dendritic cell 1', 'Dendritic cell 2', 'Dendritic cell_Siglech high', 'Dividing cell 1', 'Dividing cell 2', 'Dividing cell 3', 'Duct endothelial cell', 'Endothelial cell', 'Endothelial cell 1', 'Endothelial cell 2', 'Endothelial cell 3', 'Endothelial cell of hepatic sinusoid', 'Epiblast 1', 'Epiblast 2', 'Epithelial cell', 'Epithelial cell 1', 'Epithelial cell 2', 'Epithelial cell 3', 'Epithelial cell Gls2_high', 'Epithelial cell Mup9_high', 'Erythroblast', 'Erythroblast 1', 'Erythroblast 2', 'Erythroblast Hba-a2_high', 'Erythroblast Hbb-bs_high', 'Erythroblast Rgcc_high', 'Erythroblast Stfa2l1_high', 'Erythroblast_Hbb-bs high', 'Erythroblast_Hbb-bt high', 'ExE endoderm', 'Extrahepatic biliary epithelial cell', 'Fibroblast', 'Fibroblast 1', 'Fibroblast 2', 'Fibroblast 3', 'Fibroblast 4', 'Fibroblast 5', 'Fibroblast 6', 'Fibroblast 7', 'Granulocyte', 'Hepatic stellate cell', 'Hepatic stellate cell 1', 'Hepatic stellate cell 2', 'Hepatic stellate cell', 'Hepatoblast', 'Hepatoblast 1', 'Hepatoblast 2', 'Hepatoblast 3', 'Hepatoblast 4', 'Hepatoblast Lgr5_high 2', 'Hepatoblast to hepatocyte', 'Hepatocyte', 'Hepatocyte 1', 'Hepatocyte 2', 'Hepatocyte 3', 'Hepatocyte 4', 'Hepatocyte 5', 'Hepatocyte 6', 'Hepatocyte Lgr5_high 1', 'Hepatocyte_Fabp1 high', 'Kupffer cell', 'Kupffer cell 1', 'Kupffer cell 2', 'Kuppfer cell', 'Kuppfer cell 1', 'Kuppfer cell 2', 'Large artery Endothelial cell', 'Leukocyte', 'Liver capsule macrophages', 'Liver progenitor cell', 'Lobule layer 1 hepatocyte', 'Lobule layer 2 hepatocyte', 'Lobule layer 3 hepatocyte', 'Lobule layer 4 hepatocyte', 'Lobule layer 5 hepatocyte', 'Lobule layer 6 hepatocyte', 'Lobule layer 7 hepatocyte', 'Lobule layer 8 hepatocyte', 'M1 Macrophage', 'Macrophage', 'Mast cell', 'Megakaryocyte', 'Mesenchymal cell', 'Monocyte', 'Ms4a1+ B cell', 'Natural Killer cell', 'Natural killer cell', 'Neutrophil', 'Plasma B cell 1', 'Plasma B cell 2', 'Plasmacytoid dendritic cell', 'Portal B cell', 'Portal Hepatic stellate cell', 'Primitive Streak', 'Proliferating Endothelial cell', 'S100a4+ monocyte', 'Stem and progenitor cell', 'Stem and progenitor cell Prtn3_high', 'T cell', 'T cell 1', 'T cell 2', 'Unknown', 'Vascular endothelial cell', 'Vascular smooth muscle cell 1', 'Vascular smooth muscle cell 2', 'Vascular smooth muscle cell 3', 'Vein Endothelial cell', 'YAP target biliary epithelial cell']
         var condition_name = ['Fibrosis', 'Injured', 'NASH', 'Normal']
         var Flag=false;
         var nowchoose="";

        jQuery(document).ready(function() {
            jQuery("#tree").css({height: jQuery(window).height()-200});
             var a = getQueryVariable("conditionname");

             if(a!=false){
                str=a.replace(/%20/g," ");
                str=str.replace(/%27/g,"'");
                nowchoose=str;
                f(str);
                Flag=true;
             }
             init();
        });
        function getQueryVariable(variable){
               var query = window.location.search.substring(1);
               var vars = query.split("&");
               for (var i=0;i<vars.length;i++) {
                       var pair = vars[i].split("=");
                       if(pair[0] == variable){return pair[1];}
               }
               return(false);
        }
        function f(str){

                jQuery("#notePanel").hide();
                jQuery("#resultPanel").show();

        }

        function init() {
            builePlanTree();
        }

        //ZTREE
        function builePlanTree() {
            var setting = {
                view: {
                    dblClickExpand: true,
                    showIcon: true//设置 zTree 是否显示节点的图标。
                },
                data: {
                    simpleData: {
                    enable: true
                    }
                },
                callback: {
                    // beforeExpand: beforeExpand,
                    // onExpand: onExpand,
                    onClick: zTreeOnClick,   //用于捕获节点被点击的事件回调函数
                }

            };
         
        var zNodes =[
        {id:1, pId:0, name:"AllData", open:true},
		{id:10, pId:1, name:"Human"},
		{id:21, pId:10, name:"Adult Human"},
        {id:210, pId:21, name:"Condition"},
        {id:2100, pId:210, name:"Normal"},
        {id:2101, pId:210, name:"Hepatocellular Carcinoma"},
        {id:2104, pId:210, name:"Lymphoma"},
        {id:2105, pId:210, name:"Colorectal Cancer"},
        {id:2106, pId:210, name:"Hepatoblastoma"},
        {id:2107, pId:210, name:"Cholangiolocellular Carcinoma"},
        {id:2108, pId:210, name:"Cholangiocarcinoma"},
        {id:211, pId:21, name:"Cell Type"}, 
        {id:2110, pId:211, name:"Ito cell (hepatic stellate cell)"},
        {id:2111, pId:211, name:"Kupffer cell"},
        {id:2112, pId:211, name:"Cancer stem cell"},
        {id:2113, pId:211, name:"Hepatoblast"},
		{id:2114, pId:211, name:"Mesenchymal cell"},
		{id:2115, pId:211, name:"Endothelial cell"},
		{id:2116, pId:211, name:"Hematopoietic cell"},
		{id:2117, pId:211, name:"CD4+ T cell"},
		{id:2118, pId:211, name:"CD8+ T cell"},
		{id:2119, pId:211, name:"Monocyte"},
		{id:21110, pId:211, name:"Dendritic cell"},
		{id:21111, pId:211, name:"Natural killer cell"},
		{id:21112, pId:211, name:"B cell"},
		{id:21113, pId:211, name:"Cytotoxic T cell"},
		{id:21114, pId:211, name:"Natural killer T (NKT) cell"},
		{id:21115, pId:211, name:"T helper cell"},
		{id:21116, pId:211, name:"T cell"},
		{id:21117, pId:211, name:"Memory T cell"},
		{id:21118, pId:211, name:"Liver progenitor cell"},
		{id:21119, pId:211, name:"Hepatocyte"},
		{id:21120, pId:211, name:"Platelet"},
		{id:21121, pId:211, name:"EBV+ B lymphoma cell"},
		{id:21122, pId:211, name:"Liver stem cell"},
		{id:21123, pId:211, name:"Bile duct cell"},
		{id:21124, pId:211, name:"Migrating cancer stem cell"},
		{id:21125, pId:211, name:"Mesenchymal stem cell"},
		{id:21126, pId:211, name:"Myeloid-derived suppressor cell"},
		{id:21127, pId:211, name:"Memory B cell"},
		{id:21128, pId:211, name:"Mesenchymal stromal cell"},
		{id:21129, pId:211, name:"Progenitor cell"},
		{id:21130, pId:211, name:"Stem cell"},
		{id:21131, pId:211, name:"Regulatory T (Treg) cell"},
		{id:21132, pId:211, name:"Myofibroblast"},
		{id:21133, pId:211, name:"Mucosal-associated invariant T cell"},
		{id:21134, pId:211, name:"Exhausted CD8+ T cell"},
		{id:21135, pId:211, name:"Exhausted CD4+ T cell"},
		{id:21136, pId:211, name:"CD4+ cytotoxic T cell"},
		{id:21137, pId:211, name:"Liver bud hepatic cell"},
        {id:21138, pId:211, name:"Mucosal-associated invariant T cell"},
        {id:21139, pId:211, name:"Exhausted CD8+ T cell"},
        {id:21140, pId:211, name:"Regulatory T (Treg) cell"},
        {id:21141, pId:211, name:"Exhausted CD4+ T cell"},
        {id:21142, pId:211, name:"CD4+ cytotoxic T cell"},
        {id:21143, pId:211, name:"Liver bud hepatic cell"},
        {id:21144, pId:211, name:"Unknown"},
        {id:22, pId:10, name:" Fetal Human"},
        {id:220, pId:22, name:"Condition"},
        {id:2201, pId:220, name:"Normal"},
        {id:221, pId:22, name:"Cell Type"},
        {id:2210, pId:221, name:"Liver stem cell"},
        {id:2211, pId:221, name:"Liver progenitor cell"},
        {id:2212, pId:221, name:"Hematopoietic cell"},
        {id:2213, pId:221, name:"Hematopoietic precursor cell"},
        {id:2214, pId:221, name:"Endothelial precursor cell"},
        {id:2215, pId:221, name:"Hepatocyte"},
        {id:2216, pId:221, name:"Mesenchymal stem cell"},
        {id:2217, pId:221, name:"B cell"},
        {id:2218, pId:221, name:"Progenitor cell"},
        {id:2219, pId:221, name:"Stem cell"},
        {id:22110, pId:221, name:"T cell"},
        {id:22111, pId:221, name:"Lymphoblast"},
        {id:22112, pId:221, name:"Erythroblast"},
        {id:22113, pId:221, name:"Endothelial cell"},
        {id:22114, pId:221, name:"Kupffer cell"},
        {id:22115, pId:221, name:"Mesenchymal cell"},
        {id:22116, pId:221, name:"Unknown"},
        
        {id:11, pId:1, name:"Mouse"},
        {id:41, pId:11, name:" Adult Mouse"},
        {id:310, pId:41, name:"Condition"},
        {id:3100, pId:310, name:"Normal"},
        {id:3101, pId:310, name:"Fibrosis"},
        {id:3102, pId:310, name:"NASH"},
        {id:311, pId:41, name:"Cell Type"},
        {id:3110, pId:311, name:"B cell"},
		{id:3111, pId:311, name:"CD4+ T cell"},
		{id:3112, pId:311, name:"CXCR6+ T cell"},
		{id:3113, pId:311, name:"Capillary Endothelial cell 1"},
		{id:3114, pId:311, name:"Capillary Endothelial cell 2"},
		{id:3115, pId:311, name:"Capillary Endothelial cell 3"},
		{id:3116, pId:311, name:"Capillary arterial Endothelial cell"},
		{id:3117, pId:311, name:"Capillary venous Endothelial cell"},
		{id:3118, pId:311, name:"Central Fibroblast"},
		{id:3119, pId:311, name:"Central artery smooth muscle cell"},
		{id:3120, pId:311, name:"Cholangiocyte 1"},
		{id:3121, pId:311, name:"Cholangiocyte 2"},
		{id:3122, pId:311, name:"Conventional dendritic cell 1"},
		{id:3123, pId:311, name:"Conventional dendritic cell 2"},
		{id:3124, pId:311, name:"Dendritic cell"},
		{id:3125, pId:311, name:"Dendritic cell 1"},
		{id:3126, pId:311, name:"Dendritic cell 2"},
		{id:3127, pId:311, name:"Dendritic cell_Siglech high"},
		{id:3128, pId:311, name:"Dividing cell 1"},
		{id:3129, pId:311, name:"Dividing cell 2"},
		{id:3130, pId:311, name:"Dividing cell 3"},
		{id:3131, pId:311, name:"Duct endothelial cell"},
		{id:3132, pId:311, name:"Endothelial cell"},
		{id:3133, pId:311, name:"Endothelial cell 1"},
		{id:3134, pId:311, name:"Endothelial cell 2"},
		{id:3135, pId:311, name:"Endothelial cell 3"},
		{id:3136, pId:311, name:"Endothelial cell of hepatic sinusoid"},
		{id:3137, pId:311, name:"Epithelial cell"},
		{id:3138, pId:311, name:"Epithelial cell 1"},
		{id:3139, pId:311, name:"Epithelial cell 2"},
		{id:3140, pId:311, name:"Epithelial cell 3"},
		{id:3141, pId:311, name:"Erythroblast_Hbb-bs high"},
		{id:3142, pId:311, name:"Erythroblast_Hbb-bt high"},
		{id:3143, pId:311, name:"Fibroblast 1"},
		{id:3144, pId:311, name:"Fibroblast 2"},
		{id:3145, pId:311, name:"Fibroblast 3"},
		{id:3146, pId:311, name:"Fibroblast 4"},
		{id:3147, pId:311, name:"Fibroblast 5"},
		{id:3148, pId:311, name:"Fibroblast 6"},
		{id:3149, pId:311, name:"Fibroblast 7"},
		{id:3150, pId:311, name:"Granulocyte"},
		{id:3151, pId:311, name:"Hepatic stellate cell"},
		{id:3152, pId:311, name:"Hepatic stellate cell 1"},
		{id:3153, pId:311, name:"Hepatic stellate cell 2"},
		{id:3154, pId:311, name:"Hepatocyte"},
		{id:3155, pId:311, name:"Hepatocyte 1"},
		{id:3156, pId:311, name:"Hepatocyte 2"},
		{id:3157, pId:311, name:"Hepatocyte 3"},
		{id:3158, pId:311, name:"Hepatocyte 4"},
		{id:3159, pId:311, name:"Hepatocyte 5"},
		{id:3160, pId:311, name:"Hepatocyte 6"},
		{id:3161, pId:311, name:"Hepatocyte_Fabp1 high"},
		{id:3162, pId:311, name:"Kupffer cell"},
		{id:3163, pId:311, name:"Kupffer cell 1"},
		{id:3164, pId:311, name:"Kupffer cell 2"},
		{id:3165, pId:311, name:"Kuppfer cell"},
		{id:3166, pId:311, name:"Kuppfer cell 1"},
		{id:3167, pId:311, name:"Kuppfer cell 2"},
		{id:3168, pId:311, name:"Large artery Endothelial cell"},
		{id:3169, pId:311, name:"Leukocyte"},
		{id:3170, pId:311, name:"Liver capsule macrophages"},
		{id:3171, pId:311, name:"Lobule layer 1 hepatocyte"},
		{id:3172, pId:311, name:"Lobule layer 2 hepatocyte"},
		{id:3173, pId:311, name:"Lobule layer 3 hepatocyte"},
		{id:3174, pId:311, name:"Lobule layer 4 hepatocyte"},
		{id:3175, pId:311, name:"Lobule layer 5 hepatocyte"},
		{id:3176, pId:311, name:"Lobule layer 6 hepatocyte"},
		{id:3177, pId:311, name:"Lobule layer 7 hepatocyte"},
		{id:3178, pId:311, name:"Lobule layer 8 hepatocyte"},
		{id:3179, pId:311, name:"M1 Macrophage"},
		{id:3180, pId:311, name:"Macrophage"},
		{id:3181, pId:311, name:"Monocyte"},
		{id:3182, pId:311, name:"Ms4a1+ B cell"},
		{id:3183, pId:311, name:"Natural Killer cell"},
		{id:3184, pId:311, name:"Natural killer cell"},
		{id:3185, pId:311, name:"Neutrophil"},
		{id:3186, pId:311, name:"Plasma B cell 1"},
		{id:3187, pId:311, name:"Plasma B cell 2"},
		{id:3188, pId:311, name:"Plasmacytoid dendritic cell"},
		{id:3189, pId:311, name:"Portal B cell"},
		{id:3190, pId:311, name:"Portal Hepatic stellate cell"},
		{id:3191, pId:311, name:"Proliferating Endothelial cell"},
		{id:3192, pId:311, name:"S100a4+ monocyte"},
		{id:3193, pId:311, name:"T cell"},
		{id:3194, pId:311, name:"T cell 1"},
		{id:3195, pId:311, name:"T cell 2"},
		{id:3196, pId:311, name:"Vein Endothelial cell"},
		{id:3197, pId:311, name:"Vascular endothelial cell"},
		{id:3198, pId:311, name:"Vascular smooth muscle cell 1"},
		{id:3199, pId:311, name:"Vascular smooth muscle cell 2"},
		{id:3200, pId:311, name:"Vascular smooth muscle cell 3"},
		{id:3201, pId:311, name:"Unknown"},

        {id:42, pId:11, name:" Fetal Mouse"},
        {id:410, pId:42, name:"Condition"},
        {id:4100, pId:410, name:"Normal"},
        {id:4101, pId:410, name:"Injured"},
        {id:411, pId:42, name:"Cell Type"},
        {id:4110, pId:411, name:"Activated fibroblast"},
		{id:4111, pId:411, name:"B cell"},
		{id:4112, pId:411, name:"Biliary epithelial cell Ahsg_high"},
		{id:4113, pId:411, name:"Biliary epithelial cell E030024N20Rik_high"},
		{id:4114, pId:411, name:"Biliary epithelial cell Fos_high"},
		{id:4115, pId:411, name:"Biliary epithelial cell Ifrd1_high"},
		{id:4116, pId:411, name:"Biliary epithelial cell Iigp1_high"},
		{id:4117, pId:411, name:"Biliary epithelial cell Pdpn_high"},
		{id:4118, pId:411, name:"Biliary epithelial cell Prkdc_high"},
		{id:4119, pId:411, name:"Biliary epithelial cell Sox7_high"},
		{id:4120, pId:411, name:"Cholangiocyte"},
		{id:4121, pId:411, name:"Cholangiocyte 1"},
		{id:4122, pId:411, name:"Cholangiocyte 2"},
		{id:4123, pId:411, name:"Cycling cell"},
		{id:4124, pId:411, name:"Dendritic cell"},
		{id:4125, pId:411, name:"Endothelial cell"},
		{id:4126, pId:411, name:"Epiblast 1"},
		{id:4127, pId:411, name:"Epiblast 2"},
		{id:4128, pId:411, name:"Epithelial cell Gls2_high"},
		{id:4129, pId:411, name:"Epithelial cell Mup9_high"},
		{id:4130, pId:411, name:"Erythroblast"},
		{id:4131, pId:411, name:"Erythroblast 1"},
		{id:4132, pId:411, name:"Erythroblast 2"},
		{id:4133, pId:411, name:"Erythroblast Hba-a2_high"},
		{id:4134, pId:411, name:"Erythroblast Hbb-bs_high"},
		{id:4135, pId:411, name:"Erythroblast Rgcc_high"},
		{id:4136, pId:411, name:"Erythroblast Stfa2l1_high"},
		{id:4137, pId:411, name:"ExE endoderm"},
		{id:4138, pId:411, name:"Extrahepatic biliary epithelial cell"},
		{id:4139, pId:411, name:"Fibroblast"},
		{id:4140, pId:411, name:"Hepatoblast"},
		{id:4141, pId:411, name:"Hepatoblast 1"},
		{id:4142, pId:411, name:"Hepatoblast 2"},
		{id:4143, pId:411, name:"Hepatoblast 3"},
		{id:4144, pId:411, name:"Hepatoblast 4"},
		{id:4145, pId:411, name:"Hepatoblast Lgr5_high 2"},
		{id:4146, pId:411, name:"Hepatoblast to hepatocyte"},
		{id:4147, pId:411, name:"Hepatocyte"},
		{id:4148, pId:411, name:"Hepatocyte 1"},
		{id:4149, pId:411, name:"Hepatocyte 2"},
		{id:4150, pId:411, name:"Hepatocyte Lgr5_high 1"},
		{id:4151, pId:411, name:"Liver progenitor cell"},
		{id:4152, pId:411, name:"Macrophage"},
		{id:4153, pId:411, name:"Mast cell"},
		{id:4154, pId:411, name:"Megakaryocyte"},
		{id:4155, pId:411, name:"Mesenchymal cell"},
		{id:4156, pId:411, name:"Neutrophil"},
		{id:4157, pId:411, name:"Primitive Streak"},
		{id:4158, pId:411, name:"Stem and progenitor cell"},
		{id:4159, pId:411, name:"Stem and progenitor cell Prtn3_high"},
		{id:4160, pId:411, name:"YAP target biliary epithelial cell"},
		{id:4161, pId:411, name:"Unknown"},

        ];

        jQuery.fn.zTree.init(jQuery("#tree"), setting, zNodes);

            function zTreeOnClick(event, treeId, treeNode) {
                jQuery("#notePanel").hide();
                jQuery("#resultPanel").show();
                var initPagination = function() {
                     //var num_entries = jQuery("#hiddenresult div.result").length;
                     var p = treeNode.getParentNode().name;
                     p = p.replace(/\s+/g,"")
                     var pNode = treeNode.getParentNode().getParentNode();
                     var stage = pNode.name.split(" ")[1];
                     var species = pNode.name.split(" ")[2];
                     console.log(p)
                     nowchoose=treeNode.name;
                     
                     var Condition = "";
                     var cellType = "";
                console.log(species)
                console.log(stage)
                console.log(nowchoose)
            
				for(var i in condition_name){
                    console.log("p:")
                    console.log(p)
					var page=1;
					console.log($scope.currentPage);
                    if(nowchoose==condition_name[i]){
                      $scope.getproject2=function(page){
                            console.log("nowchoose")
                            console.log(nowchoose)
                           $http({
                               url:'/api/project2',
                               method: 'GET',
                               params: {species:species, stage:stage, condition:nowchoose, page:page}
                           }).then(function (response) {
                               console.log(response);
                               $scope.project2_list=response.data.project2_list
                               $scope.project2_count=response.data.project2_count
                               console.log($scope.project2_list);
                      })}}
                      else{
                      $scope.getproject2=function(page){
                       var celltype=nowchoose;
                       console.log("get celltype")
                       console.log(celltype)
                           $http({
                               url:'/api/project2',
                               method: 'GET',
                               params: {species:species, stage:stage, celltype:celltype,page:page}
                           }).then(function (response) {
                               console.log(response);
                               $scope.project2_list=response.data.project2_list
                               $scope.project2_count=response.data.project2_count
                               console.log($scope.project2_list);
							   console.log("page2")
							   console.log(page)
                      })
                   }}     
                          
                     };
        $scope.getproject2(page)
		/* var page=1;
		$scope.fetch_target_gain = function (page) {
			console.log("fetch_target_gain");
			$http({
				url:'/api/project2',
				method: 'GET',
				params: {species:species, stage:stage, condition:nowchoose, page:page}
				}).then(
					function (response) {
						console.log(response);
						$scope.project2_list = response.data.project2_list;
						$scope.project2_count=response.data.project2_count;
					})
				};
		$scope.fetch_target_gain(page); */

              }();
              
              
            };
        }
}