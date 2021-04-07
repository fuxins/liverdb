function querySearch(specificCancer, cheakFlag){
	//loading waiting figure
	document.getElementById("waitingDiv").style.display='block';
	//console.log($("#testxin").get(0).checked);
	//console.log($('#testxin').is(':checked'));
	//console.log($('#testxin').attr('checked')); 返回undefined
	
	
	
	// query search
	var speciesType = $("#speciesType").val();
	//var cancerType = $("#cancerType").val();
	var tissueType = $("#tissueType").val();
	var cellName = $("#cellName").val();
	//var cellMarker = $("#cellMarker").val();
	//console.log('speciesType'+':'+speciesType+' cancerType'+":"+cancerType+' tissueType'+':'+tissueType+' speciesType'+':'+cancerType+' cellName'+':'+cellName+' cellMarker'+':'+cellMarker);
	
	//判断有没有选定癌症
	var cellType = "";
	if($('#cancerSelect').is(':checked')){
		cellType = "Cancer cell";
	}
	
	// index页面里有两个癌症合在一起的，需要特别设定，暂时保留
	/*if(specificCancer == "Gastric Adenocarcinoma/Gastric Cancer"){
		querycancer = "Gastric Adenocarcinoma/Gastric Cancer";
	}
	if(specificCancer == "Colon Cancer/Colorectal Cancer"){
		querycancer = "Colon Cancer/Colorectal Cancer";
	}*/	
	
	//if(cancerType=="ALL"){cancerType=""};
	if(tissueType=="" | tissueType==null){
		alert("please select one tissue type.");
		document.getElementById("waitingDiv").style.display = 'none';
		return false;	//跳出函数
	}
	if(cellName=="" | cellName==null){
		alert("please select one cell type.");
		document.getElementById("waitingDiv").style.display = 'none';
		return false;	//跳出函数
	}
	
	if(tissueType=="ALL"){tissueType=""};
	if(cellName=="ALL"){cellName=""};
	
	//estimate parameter not all are the NA; OR return some error
		if(cellName.length==0 && tissueType.length==0 && speciesType.length==0){
			//alert(document.getElementById("waiting").style.display);
			document.getElementById("waitingDiv").style.display = 'none';
			
			
			if(cheakFlag=='true'){
				alert("please select some conditions.");
			}
			
		}else{
			// 隐藏div 组织-细胞数目统计
			document.getElementById("bubble3DContainer").style.display='none';
			
			
			$.ajax({
				url: "querySearch",
				type: "POST",
				data: {
					speciesType: speciesType,
					cellType: cellType,
					tissueType: tissueType,
					cellName: cellName,
					//cellMarker: cellMarker,
				},
				dataType: "json",
				success: function(returnMsg){
					if(returnMsg.reStr=="success"){
						if(returnMsg.ajaxResultTableSinglecellSequencing.length > 2 | 
						   returnMsg.ajaxResultTableExperiment.length > 2 | 
						   returnMsg.ajaxResultTableReview.length > 2 | 
						   returnMsg.ajaxResultTableCompany.length > 2){
							
							document.getElementById("resultsDiv").style.display='block';
							
							$("#results").html("<div id='results' style='width:100%;padding-top:0px'><table id='testTable'></table></div>");
							/*addTitle = "";
							$("#results").prepend(addTitle);
							var header = "<table id='testTable'><thead ><tr><th>Species</th><th>Tissue</th><th>Cell Name</th><th>Cancer</th><th style='min-width: 380px;'>Cell Markers</th><th>Method</th><th>Supported Papers</th><th style='min-width:80px;'>Details</th></thead><tbody></tbody></table>";
							$("#testTable").html(header);
							
							
							//console.log(json2table);
							json2table(returnMsg.ajaxResultTable,'#testTable');
							initTable("testTable", 2, 3, 4, 7);*/
							
							
							/*单细胞表格展示*/
								if(returnMsg.ajaxResultTableSinglecellSequencing.length > 2){
									// 显示表格
									document.getElementById("SingleCellSequencingContainer").style.display='block';
									
									$("#SingleCellSequencingresults").html("<div id='results' style='width:100%;padding-top:0px'><table id='SingleCellSequencingtestTable'></table></div>");
									addTitle = "";
									$("#SingleCellSequencingresults").prepend(addTitle);
									var header = "<table id='SingleCellSequencingtestTable'><thead ><tr><th>Species</th><th>Tissue</th><th>Cell Type</th><th>Cancer</th><th style='min-width: 380px;'>Cell Marker</th><th>Source</th><th>Supported Sources</th><th style='min-width:80px;'>Details</th></thead><tbody></tbody></table>";
									$("#SingleCellSequencingtestTable").html(header);
									
									//console.log(json2table);
									json2table(returnMsg.ajaxResultTableSinglecellSequencing,'#SingleCellSequencingtestTable');
									initTable("SingleCellSequencingtestTable", 2, 3, 4, 7);
								}else{
									// 隐藏表格
									document.getElementById("SingleCellSequencingContainer").style.display='none';
								}
								
							
							/*实验表格展示*/
								if(returnMsg.ajaxResultTableExperiment.length > 2){
									// 显示表格
									document.getElementById("ExperimentContainer").style.display='block';
									
									$("#Experimentresults").html("<div id='results' style='width:100%;padding-top:0px'><table id='ExperimenttestTable'></table></div>");
									addTitle = "";
									$("#Experimentresults").prepend(addTitle);
									var header = "<table id='ExperimenttestTable'><thead ><tr><th>Species</th><th>Tissue</th><th>Cell Type</th><th>Cancer</th><th style='min-width: 380px;'>Cell Marker</th><th>Source</th><th>Supported Sources</th><th style='min-width:80px;'>Details</th></thead><tbody></tbody></table>";
									$("#ExperimenttestTable").html(header);
									
									//console.log(json2table);
									json2table(returnMsg.ajaxResultTableExperiment,'#ExperimenttestTable');
									initTable("ExperimenttestTable", 2, 3, 4, 7);
								}else{
									// 显示表格
									document.getElementById("ExperimentContainer").style.display='none';
								}
								

							/*review表格展示*/
								if(returnMsg.ajaxResultTableReview.length > 2){
									// 显示表格
									document.getElementById("ReviewContainer").style.display='block';
									
									$("#Reviewresults").html("<div id='results' style='width:100%;padding-top:0px'><table id='ReviewtestTable'></table></div>");
									addTitle = "";
									$("#Reviewresults").prepend(addTitle);
									var header = "<table id='ReviewtestTable'><thead ><tr><th>Species</th><th>Tissue</th><th>Cell Type</th><th>Cancer</th><th style='min-width: 380px;'>Cell Marker</th><th>Source</th><th>Supported Sources</th><th style='min-width:80px;'>Details</th></thead><tbody></tbody></table>";
									$("#ReviewtestTable").html(header);
									
									//console.log(json2table);
									json2table(returnMsg.ajaxResultTableReview,'#ReviewtestTable');
									initTable("ReviewtestTable", 2, 3, 4, 7);
								}else{
									// 显示表格
									document.getElementById("ReviewContainer").style.display='none';
								}
								

							/*公司表格展示*/
								if(returnMsg.ajaxResultTableCompany.length > 2){
									// 显示表格
									document.getElementById("CompanyContainer").style.display='block';
									$("#Companyresults").html("<div id='results' style='width:100%;padding-top:0px'><table id='CompanytestTable'></table></div>");
									addTitle = "";
									$("#Companyresults").prepend(addTitle);
									var header = "<table id='CompanytestTable'><thead ><tr><th>Species</th><th>Tissue</th><th>Cell Type</th><th>Cancer</th><th style='min-width: 380px;'>Cell Marker</th><th>Source</th><th>Supported Sources</th><th style='min-width:80px;'>Details</th></thead><tbody></tbody></table>";
									$("#CompanytestTable").html(header);
									
									//console.log(json2table);
									json2table(returnMsg.ajaxResultTableCompany,'#CompanytestTable');
									initTable("CompanytestTable", 2, 3, 4, 7);
								}else{
									// 显示表格
									document.getElementById("CompanyContainer").style.display='none';
								}
								
							
							
							
							document.getElementById("waitingDiv").style.display='none';
							//alert(document.getElementById("waiting").style.display);
							// console.log(returnMsg.ajaxResultTable);
							//console.log(returnMsg.wordCloud);
							//console.log(returnMsg.wordCloud.length);
							// 只有表格能展示的时候才显示wordcloud
							if(returnMsg.wordCloud.length>2){
								// plot zingWordcloud
								document.getElementById("wordCloudContainer").style.display='block';
								
								//console.log(returnMsg.wordCloud);
								test1 = returnMsg.wordCloud;
								
								var wordsData = eval(returnMsg.wordCloud);
								
								//console.log(wordsData);
								test2 = wordsData;
								
								//console.log(wordsData);
								zingWordCloud('wordCloudChart',wordsData);
								
								$("#downloadMarkerNumber").attr('onclick','downloadMarkerNumber("'+speciesType+'","'+tissueType+'","'+cellName+'","'+cellType+'")');
								//console.log($("#downloadMarkerNumber").attr('onclick'));
								
								// 展示表格
								$("#wordCloudresults").html("<div id='wordCloudresults' class='table-responsive' style='width:100%;padding-top:0px'><table id='wordCloudtestTable'></table></div>");
								addTitle = "";
								$("#wordCloudresults").prepend(addTitle);
								var header = "<table id='wordCloudtestTable'><thead ><tr><th style=''>Cell Marker</th><th>Supported NO.</th></thead><tbody></tbody></table>";
								$("#wordCloudtestTable").html(header);
								//console.log(json2table);
								json2table(returnMsg.wordCloudTable,'#wordCloudtestTable');
								
								initWordCloudTable("wordCloudtestTable");
								
								//数据结果上移 
								document.documentElement.scrollTop = 747;
								
							}else{
								document.getElementById("wordCloudContainer").style.display='none';
							}
							
							// 不管怎样都要关掉
							document.getElementById("waitingDiv").style.display='none';
							
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
							document.getElementById("waitingDiv").style.display='none';
							//alert(document.getElementById("waiting").style.display);
							
							//没有结果，需要关闭wordcloud
							document.getElementById("wordCloudContainer").style.display='none';

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
	