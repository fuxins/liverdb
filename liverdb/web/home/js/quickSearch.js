function quickSearch(quickSearchInfo){
	//loading waiting figure
	//document.getElementById("waitingDivMarker").style.display='block';
	
	// query search
	//var speciesType = $("#cellMarkerSpeciesType").val();
	//var cellMarker = $("#cellMarker").val();
	
	//estimate parameter not all are the NA; OR return some error
			$.ajax({
				url: "quickSearch",
				type: "POST",
				data: {
					quickSearchInfo: quickSearchInfo,
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
							json2table(returnMsg.ajaxResultTable,'#testTable');
							initTable("testTable", 2, 3, 4, 7);
							
							//仅仅通过 quick搜索，需要关闭wordcloud
							document.getElementById("wordCloudContainer").style.display='none';
							
							//数据结果上移 
							document.documentElement.scrollTop = 747;
							
							
						}else{
							$("#results").html("<div id='results' style='width:100%;padding-top:0px'><p id='testTable'></p></div>");
							addTitle = "";
							$("#results").prepend(addTitle);
							var htmlNOresult = "no matching records found"
							$("#testTable").html(htmlNOresult);
							//document.getElementById("waitingDivMarker").style.display='none';
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
	