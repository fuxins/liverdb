"use strict";

angular.module('liverdb')
    .controller('BrowsePageController',BrowsePageController);

function BrowsePageController($scope,$http,$routeParams,$window){
    console.log("BrowsePageController loaded")

    var  cell_type_name = ['Ito cell (hepatic stellate cell)','Kupffer cell','Cancer stem cell','Hepatoblast','Mesenchymal cell','Endothelial cell','Hematopoietic cell','CD4+ T cell','CD8+ T cell','Monocyte','Dendritic cell','Natural killer cell','B cell','Cytotoxic T cell','Natural killer T (NKT) cell','T helper cell','T cell','Memory T cell','Liver progenitor cell','Hepatocyte','Platelet','EBV+ B lymphoma cell','Liver stem cell','Bile duct cell','Migrating cancer stem cell','Mesenchymal stem cell','Myeloid-derived suppressor cell','Memory B cell','Mesenchymal stromal cell','Progenitor cell','Stem cell','Regulatory T (Treg) cell','Myofibroblast','Mucosal-associated invariant T cell','Exhausted CD8+ T cell','Exhausted CD4+ T cell','CD4+ cytotoxic T cell','Liver bud hepatic cell','Hematopoietic precursor cell','Endothelial precursor cell','Lymphoblast','Erythroblast','Unknown']
         var condition_name = ['Normal','Hepatocellular Carcinoma','Lymphoma','Colorectal Cancer','Hepatoblastoma','Cholangiolocellular Carcinoma','Cholangiocarcinoma']
         var Flag=false;
         var downloadparameter="";
         var nowchoose="";

        jQuery(document).ready(function() {
            jQuery("#tree").css({height: jQuery(window).height()-200});
             var a = getQueryVariable("diseasename");

             if(a!=false){
                str=a.replace(/%20/g," ");
                str=str.replace(/%27/g,"'");
               // alert(str)
               nowchoose=str;
                f(str);
                Flag=true;
             }
             init();
        });
        var sortpage=0;
        var sortname="";
        var sortorder=0
        function dididi(){
            //alert(123)
            jQuery.ajax({

                type: "POST",
                url: "http://easybioai.com/sc2disease/tree",
                data: {
                        name:downloadparameter,
                        Sortname:sortname,
                        Sortorder:sortorder,
                        flag:1,
                },
                async: false ,
                success : function(data) {
                     // alert(data)
                },
             });
             //alert(456)
            // return false
        }

        function sortit(value){
           if(sortorder==0){
              sortorder=1
             // alert(1)
           }
           else{
              sortorder=0;
             // alert(0)
           }
            sortname=value.id;
            //alert(sortpage)
           // alert(nowchoose)
            //alert(sortname)
            f(nowchoose)
        }
        function getQueryVariable(variable)
        {
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

                 jQuery(function(){

                 var initPagination = function() {
                     //var num_entries = jQuery("#hiddenresult div.result").length;
                // 创建分页
                      var sum_count=0
              var countvalue=0
                     jQuery.ajax({
                type: "POST",
                url: "http://easybioai.com/sc2disease/getcount",
                data: {
                        name:str,
                        Condition:"",
                        Gene:"",
                        Celltype:"",
                },
                async: false ,
                success : function(data) {
                      var  newda=JSON.parse(data)

                      List= newda.rows
                     // alert(List)
                     countvalue=List[0].count
                     //alert(List[0].count)
                },
                error : function(e) {           //请求失败的回调函数
                    console.log(e);
                }
             });
             //alert(countvalue)
             //alert(sortpage)
                     jQuery("#tableL01").pagination(countvalue, {
                    prev_text : 'Previous',
                    next_text : 'Next',
                    items_per_page : 10,
                    current_page :sortpage,
                    num_display_entries : 4, // 连续分页主体部分显示的分页条目数
                    num_edge_entries : 2, // 两侧显示的首尾分页的条目数
                    callback: pageselectCallback,
                 });
              }();

            function pageselectCallback(page_index, jq){
                 sortpage=page_index
                 // alert(page_index)
                 Init(page_index);
                 //alert(page_index)
            }
             function Init(pageIndex) {
                    var nodeflag=0;
                    for(var i in disease_name){
                        if(str==disease_name[i]){
                            nodeflag=1;
                        }
                    }
                    for(var i in cell_type_name){
                        if(str==cell_type_name[i]){
                            nodeflag=-1;
                        }
                    }
                    jQuery.ajax({
                    type: "post",
                    url: "http://easybioai.com/sc2disease/tree",
                    data: {
                         name:str,
                         Page:pageIndex,
                         Sortname:sortname,
                         Sortorder:sortorder,
                    },
                    async: false ,
                    success : function(newdata) {
                          var  data=JSON.parse(newdata)
                            downloadparameter=str
                          //alert(data)
                          total = data.total
                         // alert(total)
                          var list = data.rows;
                          //alert(list)
                          var html = '<div>'
                            if(nodeflag==1){
                             var disname=list[0].disease
                             disname=disname.replace("'","");
                           //  alert(sortname)
                             if(sortname==""){
                             html +="<a href='./tables/" + disname+ ".csv' download='"+disname+".csv'  onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                             }
                             else{
                             //alert(sortorder)
                              if(sortorder==1){
                              html +="<a href='./tables/" + disname +" sort by "+ sortname+" desc.csv' download='"+disname+" sort by "+sortname+" desc.csv' onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                              }
                              else {
                               html +="<a href='./tables/" + disname +" sort by "+ sortname+" asc.csv' download='"+disname+" sort by "+sortname+" asc.csv' onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                              }                             }
                             }
                             else {
                              var disname=list[0].celltype
                              disname=disname.replace("'","");
                              if(sortname==""){
                              html +="<a href='./tables/" + disname + ".csv' download='"+disname+".csv'  onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                              }
                              else {
                              //alert(sortorder)
                              if(sortorder==1){
                              html +="<a href='./tables/" + disname +" sort by "+ sortname+" desc.csv' download='"+disname+" sort by "+sortname+" desc.csv' onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                              }
                              else {
                               html +="<a href='./tables/" + disname +" sort by "+ sortname+" asc.csv' download='"+disname+" sort by "+sortname+" asc.csv' onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                              }
                              }
                             }
//此处表格样式还要修改
                                 html += ' <tr> <td  style="font-size:16px;">  <a href="#" id="disease"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" ><a href="#" id="tissue"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="celltype"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="gene"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="variablename"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="value"  onclick="return sortit(this)"><img src="./img/sort.png"/></a>  </td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="experiment"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="PaperID"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="Platform"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" ></td>'
                                html+="</tr>"
                           html += ' <tr> <td  style="font-size:16px;">  <strong>Disease</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Tissue</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Cell Type</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Gene</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Variable Name</strong></td>'
                                html += ' <td style="font-size:16px;" > <strong>Value</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Differential Gene Expression(DEG) Comparison</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Paper ID(PMID)</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Platform</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Detail</strong></td>'
                               // alert(list[i].disease)
                                html+="</tr>"
                          for (var i = 0; i < total; i++) {
                               html += ' <tr> <td  >' + list[i].disease + '</td>'
                               html += ' <td >' + list[i].tissue + '</td>'
                               html += " <td >" + list[i].celltype + "</td>"
                               html += " <td >" + "<a href=' https://www.ncbi.nlm.nih.gov/gene/?term=" + list[i].gene + "' target = '_blank' >" + list[i].gene +"</a>"+ "</td>"
                               list[i].variablename=String(list[i].variablename)
                               if(list[i].variablename == "LogFC" || list[i].variablename == "logFC"){
                                   html +=" <td >" + "<a title='The full name of LogFC is log2(Fold change). The value logFC was generated from gene expression comparison. The subjects of comparison are described in the column Differential Gene Expression (DEG) Comparison.'>"+ list[i].variablename + "</a>"+"</td>"
                               }
                               else{
                               html += " <td >" + list[i].variablename + "</td>"
                               }
                               num = list[i].value.toFixed(2);
                               if(num=="0.00" || num=="-0.00"){
                                   num='0'
                               }
                               //alert(num.indexOf("."))
                               html += " <td > " + num + "</td>"
                               html += " <td >" + list[i].differentialGeneExpression + "</td>"
                               html += " <td >" + "<a href='https://pubmed.ncbi.nlm.nih.gov/" + list[i].PaperID + "' target = '_blank' >" + list[i].PaperID +"</a>"+ "</td>"
                               html += " <td >" + list[i].Platform + "</td>"
                               var  temp1=list[i].disease
                               var  temp2=list[i].celltype
                               temp1=temp1.replace("'","");
                               temp2=temp2.replace("'","");
                               temp2=temp2.replace("+","%2B")
                               html += " <td >" + "<a href='http://easybioai.com/sc2disease/getDetails?disease=" +temp1+ "&celltype=" + temp2 + "&gene=" + list[i].gene + "' target = '_blank' > details </a>" + "</td>"
                               // alert(list[i].disease)
                                html+="</tr>"
                           }
                           html += '</div>';
                           jQuery('#tableL').html(html)
                    },
                    error : function(e) {           //请求失败的回调函数
                        console.log(e);
                    }
                  });
             }
});
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
        {id:3101, pId:310, name:"Hepatocellular Carcinoma"},
        {id:311, pId:41, name:"Cell Type"},
        {id:3110, pId:311, name:"Liver progenitor cell"},
		{id:3111, pId:311, name:"Ito cell (hepatic stellate cell)"},
		{id:3112, pId:311, name:"Liver stem cell"},
		{id:3113, pId:311, name:"Myofibroblast"},
		{id:3114, pId:311, name:"B cell"},
		{id:3115, pId:311, name:"Cancer stem cell"},
		{id:3116, pId:311, name:"Dendritic cell"},
		{id:3117, pId:311, name:"Endothelial cell"},
		{id:3118, pId:311, name:"Hepatocyte"},
		{id:3119, pId:311, name:"Kupffer cell"},
		{id:31110, pId:311, name:"Monocyte"},
		{id:31111, pId:311, name:"Hepatoblast"},
		{id:31112, pId:311, name:"Natural killer cell"},
		{id:31113, pId:311, name:"Progenitor cell"},
		{id:31114, pId:311, name:"Stem cell"},
		{id:31115, pId:311, name:"CD4+ T cell"},
		{id:31116, pId:311, name:"Cytotoxic T cell"},
		{id:31117, pId:311, name:"Regulatory T (Treg) cell"},
		{id:31118, pId:311, name:"T cell"},
        {id:31119, pId:311, name:"Unknown"},

        {id:42, pId:11, name:" Fetal Mouse"},
        {id:410, pId:42, name:"Condition"},
        {id:4100, pId:410, name:"Normal"},
        {id:411, pId:42, name:"Cell Type"},
		{id:4110, pId:411, name:"Progenitor cell"},
        {id:4111, pId:411, name:"Unknown"},

        ];

            jQuery.fn.zTree.init(jQuery("#tree"), setting, zNodes);



            function zTreeOnClick(event, treeId, treeNode) {
                jQuery("#notePanel").hide();
                jQuery("#resultPanel").show();
                var initPagination = function() {
                     //var num_entries = jQuery("#hiddenresult div.result").length;
                     nowchoose=treeNode.name;
                // 创建分页
                      var sum_count=0
              var countvalue=0
                     jQuery.ajax({
                type: "POST",
                url: "http://easybioai.com/sc2disease/getcount",
                data: {
                        name:treeNode.name,
                        Condition:"",
                        Gene:"",
                        Celltype:"",
                },
                async: false ,
                success : function(data) {
                      var  newda=JSON.parse(data)

                      List= newda.rows
                     // alert(List)
                     countvalue=List[0].count
                     //alert(List[0].count)
                },
                error : function(e) {           //请求失败的回调函数
                    console.log(e);
                }
             });
             //alert(countvalue)

                     jQuery("#tableL01").pagination(countvalue, {
                    prev_text : 'Previous',
                    next_text : 'Next',
                    items_per_page : 10,
                    num_display_entries : 4, // 连续分页主体部分显示的分页条目数
                    num_edge_entries : 2, // 两侧显示的首尾分页的条目数
                    callback: pageselectCallback,
                 });
              }();

            function pageselectCallback(page_index, jq){
                 // alert(page_index)
                 sortpage=page_index;
                 Init(page_index);

                 //alert(page_index)
            }
             function Init(pageIndex) {

                    var nodeflag=0;
                    for(var i in disease_name){
                        if(treeNode.name==disease_name[i]){
                            nodeflag=1;
                        }
                    }
                    for(var i in cell_type_name){
                        if(treeNode.name==cell_type_name[i]){
                            nodeflag=-1;
                        }
                    }
                    downloadparameter=JSON.parse(JSON.stringify(treeNode.name));
                    jQuery.ajax({
                    type: "post",
                    url: "http://easybioai.com/sc2disease/tree",
                    data: {
                         name:treeNode.name,
                         Page:pageIndex,
                    },
                    async: false ,
                    success : function(newdata) {
                          var  data=JSON.parse(newdata)
                          //alert(data)
                          total = data.total
                         // alert(total)
                          var list = data.rows;
                          //alert(list)
                          var html = '<div>'
                            if(nodeflag==1){
                             var disname=list[0].disease
                             disname=disname.replace("'","");
                             if(sortname==""){
                              html +="<a href='./tables/" + disname + ".csv' download='"+disname+".csv'  onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                              }
                              else {
                                  if(sortorder==1){
                              html +="<a href='./tables/" + disname +" sort by "+ sortname+" desc.csv' download='"+disname+" sort by "+sortname+" desc.csv' onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                              }
                              else {
                               html +="<a href='./tables/" + disname +" sort by "+ sortname+" asc.csv' download='"+disname+" sort by "+sortname+" asc.csv' onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                              }
                                  }
                                }
                             else {
                              var disname=list[0].celltype
                              disname=disname.replace("'","");
                             if(sortname==""){
                              html +="<a href='./tables/" + disname + ".csv' download='"+disname+".csv'  onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                              }
                              else {
                                  if(sortorder==1){
                              html +="<a href='./tables/" + disname +" sort by "+ sortname+" desc.csv' download='"+disname+" sort by "+sortname+" desc.csv' onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                              }
                              else {
                               html +="<a href='./tables/" + disname +" sort by "+ sortname+" asc.csv' download='"+disname+" sort by "+sortname+" asc.csv' onclick='return dididi()'>" + "<img src='./img/download.jpg'/>" +"</a>"
                              }
                               }
                             }

                                 html += ' <tr> <td  style="font-size:16px;">  <a href="#" id="disease"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" ><a href="#" id="tissue"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="celltype"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="gene"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="variablename"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="value"  onclick="return sortit(this)"><img src="./img/sort.png"/></a>  </td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="experiment"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="PaperID"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" > <a href="#" id="Platform"  onclick="return sortit(this)"><img src="./img/sort.png"/ ></a></td>'
                                html += ' <td style="font-size:16px;" ></td>'
                                html+="</tr>"
                           html += ' <tr> <td  style="font-size:16px;">  <strong>Disease</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Tissue</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Cell Type</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Gene</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Variable Name</strong></td>'
                                html += ' <td style="font-size:16px;" > <strong>Value</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Differential Gene Expression(DEG) Comparison</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Paper ID(PMID)</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Platform</strong></td>'
                                html += ' <td style="font-size:16px;" ><strong>Detail</strong></td>'
                               // alert(list[i].disease)
                                html+="</tr>"
                          for (var i = 0; i < total; i++) {
                               html += ' <tr> <td  >' + list[i].disease + '</td>'
                               html += ' <td >' + list[i].tissue + '</td>'
                               html += " <td >" + list[i].celltype + "</td>"
                               html += " <td >" + "<a href=' https://www.ncbi.nlm.nih.gov/gene/?term=" + list[i].gene + "' target = '_blank' >" + list[i].gene +"</a>"+ "</td>"
                               list[i].variablename=String(list[i].variablename)
                               if(list[i].variablename == "LogFC" || list[i].variablename == "logFC"){
                                   html +=" <td >" + "<a title='The full name of LogFC is log2(Fold change). The value logFC was generated from gene expression comparison. The subjects of comparison are described in the column Differential Gene Expression (DEG) Comparison.'>"+ list[i].variablename + "</a>"+"</td>"
                               }
                               else{
                               html += " <td >" + list[i].variablename + "</td>"
                               }
                               num = list[i].value.toFixed(2);
                               if(num=="0.00" || num=="-0.00"){
                                   num='0'
                               }
                               //alert(num.indexOf("."))
                               html += " <td > " + num + "</td>"
                               html += " <td >" + list[i].differentialGeneExpression + "</td>"
                               html += " <td >" + "<a href='https://www.ncbi.nlm.nih.gov/pubmed/?term=" + list[i].PaperID + "' target = '_blank' >" + list[i].PaperID +"</a>"+ "</td>"
                               html += " <td >" + list[i].Platform + "</td>"
                               var  temp1=list[i].disease
                               var  temp2=list[i].celltype
                               temp1=temp1.replace("'","");
                               temp2=temp2.replace("'","");
                               temp2=temp2.replace("+","%2B")

                               html += " <td >" + "<a href='http://easybioai.com/sc2disease/getDetails?disease=" +temp1 + "&celltype=" + temp2 + "&gene=" + list[i].gene + "' target = '_blank' > details </a>" + "</td>"
                               // alert(list[i].disease)
                                html+="</tr>"
                           }
                           html += '</div>';
                           jQuery('#tableL').html(html)
                    },
                    error : function(e) {           //请求失败的回调函数
                        console.log(e);
                    }
                  });
             }


            };
        }
}