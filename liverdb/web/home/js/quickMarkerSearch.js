function quickMarkerSearch(specificCancer, cheakFlag){
	//loading waiting figure
	document.getElementById("waitingDivMarker").style.display='block';
	
	// query search
	var speciesType = $("#cellMarkerSpeciesType").val();
	var cellMarker = $("#cellMarker").val();
	
	//estimate parameter not all are the NA; OR return some error
		if(cellMarker.length==0){
			//alert(document.getElementById("waiting").style.display);
			document.getElementById("waitingDivMarker").style.display = 'none';
			if(cheakFlag=='true'){
				alert("please input a cell marker information.");
			}
			
		}else{
			$.ajax({
				url: "quickMarkerSearch",
				type: "POST",
				data: {
					speciesType: speciesType,
					cellMarker: cellMarker,
				},
				dataType: "json",
				success: function(returnMsg){
					if(returnMsg.reStr=="success"){
						if(returnMsg.ajaxResultTable.length > 2){
							document.getElementById("resultsDiv").style.display='block';
							$("#results").html("<div id='results' style='width:100%;padding-top:0px'><table id='testTable'></table></div>");
							addTitle = "";
							$("#results").prepend(addTitle);
							var header = "<table id='testTable'><thead ><tr><th>Species</th><th>Tissue</th><th>Cell Type</th><th>Cancer</th><th style='min-width: 380px;'>Cell Marker</th><th>Source</th><th>Supported Sources</th><th style='min-width:80px;'>Details</th></thead><tbody></tbody></table>";
							$("#testTable").html(header);
							
							document.getElementById("waitingDivMarker").style.display='none';
							/*console.log(json2table);*/
							json2table(returnMsg.ajaxResultTable,'#testTable');
							initTable("testTable", 2, 3, 4, 7);
							//alert(document.getElementById("waiting").style.display);
							// console.log(returnMsg.ajaxResultTable);
							
							//仅仅通过marker 搜索，需要关闭wordcloud
							document.getElementById("wordCloudContainer").style.display='none';
							
							
							// 画bubble图
							var divID = 'bubble3D';
							/*var xLables = ['a1','a2','a3','a4','a5','a6'];
							var yLables = ['a1','a2','a3','a4','a5','a6'];*/
							
							var ytitle = "";
							var title = "";
							/*var plotData = [[5, 5, 1],
											[2, 4, 5],
											[0, 0, -0],];*/
							var xLables = returnMsg.xLables,
							yLables = returnMsg.yLables,
							plotData = returnMsg.plotData;
							
							var searchMarker = cellMarker;
							// 显示div 组织-细胞数目统计
							document.getElementById("bubble3DContainer").style.display='block';
							
							bubble3D(divID,xLables,yLables,ytitle,title,plotData,searchMarker);
							
							//数据结果上移 
							document.documentElement.scrollTop = 747;
							
							
							
							document.getElementById("SingleCellSequencingContainer").style.display='none';
							document.getElementById("ExperimentContainer").style.display='none';
							document.getElementById("ReviewContainer").style.display='none';
							document.getElementById("CompanyContainer").style.display='none';
							
							
						}else{
							document.getElementById("resultsDiv").style.display='block';
							$("#results").html("<div id='results' style='width:100%;padding-top:0px'><p id='testTable'></p></div>");
							addTitle = "";
							//addTitle = "<h5 style='width:97%;margin-top:30px'>Result<span id='targetTypeBtnDiv'><a id='tarTypeHelp'><span class='icon-help' style='margin-right:3px;'></span></a>Target gene type:&nbsp;&nbsp;<button class='targetType awesome' onclick='querySearch(\"promoter\")'>P</button><button class='targetType awesome' onclick='querySearch(\"boundary\")'>B</button><button class='targetType awesome' onclick='querySearch(\"b10kb\")'>10</button><button class='targetType awesome' onclick='querySearch(\"closest\")'>C</button></span></h5>";
							$("#results").prepend(addTitle);
							var htmlNOresult = "no matching records found"
							$("#testTable").html(htmlNOresult);
							//var header = "<table id='testTable'><thead><tr><th>ID</th><th>Species</th><th>LncRNA</th><th>Target gene</th><th>Associated Factors</th><th>Epigenetic Marks</th><th>PMID</th><th>Details</th></tr></thead><tbody></tbody></table>";
									//alert(document.getElementById("waiting").style.display);
							document.getElementById("waitingDivMarker").style.display='none';
							//alert(document.getElementById("waiting").style.display);
							
							//没有结果，需要关闭wordcloud
							document.getElementById("wordCloudContainer").style.display='none';
							// 隐藏div 组织-细胞数目统计
							document.getElementById("bubble3DContainer").style.display='none';
							
							
							document.getElementById("SingleCellSequencingContainer").style.display='none';
							document.getElementById("ExperimentContainer").style.display='none';
							document.getElementById("ReviewContainer").style.display='none';
							document.getElementById("CompanyContainer").style.display='none';
							
							
							
							

						}

						/*添加 method qtip start*/
						/*$(".experimentation").each(function(){
							$(this).qtip({
									content: {
							            text: 'Its method is experimentation.',
							            //title: 'immune signatures',
							        },
							        position: {
							            at: 'right center',
							            my: 'left center',
							            target: true
							        },
							        style: {
							        	def:false, // 把默认效果设置为 false;
							        	classes: 'qtip-light qtip-bootstrap qtip-shadow qtip-rounded',
							            width: '150px',
							            //height: '100px',
							            //特效
							            effect: true,  
							            blur: true,  
							            escape: true,
							        },	
								});
						});
						
						
						$(".sncRNASeq").each(function(){
							$(this).qtip({
								content: {
									text: 'Its method is sncRNA Seq.',
									//title: 'immune signatures',
								},
								position: {
									at: 'right center',
									my: 'left center',
									target: true
								},
								style: {
									def:false, // 把默认效果设置为 false;
									classes: 'qtip-light qtip-bootstrap qtip-shadow qtip-rounded',
									width: '150px',
									//height: '100px',
									//特效
									effect: true,  
									blur: true,  
									escape: true,
								},	
							});
						});*/
				/*添加 method qtip start*/
						
						
					}
					if(returnMsg.reStr=="noInput"){
						alert("Nothing input");
					}
					if(returnMsg.reStr=="error"){
						alert("Error. Please try later.");
					}
				}
			});
		}

	

}
	