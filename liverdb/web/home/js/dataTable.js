//
// 封装DataTable插件，为了更方便之使用
// 版本 1.0
// 张冠雄
//

// 添加跳转，分别为列跳转和行跳转
// 使用时，根据需要修改
// 需要postForm.js
// 添加列的响应，点击跳转
// 一定放在DataTable初始化之前
function addColLinks(id, key1, key2, addLinkCol){
	$("#"+id+" tr").each(function(){
		// 對描述列進行綁定
		var colDesc = $(this).children("td:eq("+addLinkCol+")");
		// 綁定 css 樣式
		colDesc.addClass("linkTd");
		// 綁定 click 事件
		colDesc.click(function(){
			var lnchrom_id = $(this).parent().children("td:eq(0)").text();
			var lncrna_name = $(this).parent().children("td:eq("+key1+")").text();
			var target_name = $(this).parent().children("td:eq("+key2+")").text();
			var targetType = $("#targetType").val();
			post('recordInfo.action', {lnchrom_id:lnchrom_id, lncRNA_name:lncrna_name, target_symbol:target_name, targetType:targetType}, "_blank");
		});
	});
}
//一定放在DataTable初始化之前
function addColLinksMiRNA(id, addLinkCol){
	$("#"+id+" tr").each(function(){
		// 對描述列進行綁定
		var colDesc = $(this).children("td:eq("+addLinkCol+")");
		// 綁定 css 樣式
		colDesc.addClass("linkTd");
		// 綁定 click 事件
		colDesc.click(function(){
			var cancer = $(this).parent().children("td:eq(0)").text();// 获取lncRNA name
			var miRNA = $(this).parent().children("td:eq(1)").text();// 获取target name
			var gene = $(this).parent().children("td:eq(2)").text();// 获取target name
			var targetType = $("#targetType").val();
			//alert(cancer+":"+miRNA+":"+gene);
			//var imageURL = "GBM/hsa-miR-221+10152";
			var imageURL = cancer+"/"+miRNA+"+"+gene;
			
			//var row=$('td',this).text();
			//alert(imageURL);
			enlargeImage(imageURL);
			});
	});
}

//一定放在DataTable初始化之前
function addColLinksLncRNA(id, addLinkCol){
	$("#"+id+" tr").each(function(){
		// 對描述列進行綁定
		var colDesc = $(this).children("td:eq("+addLinkCol+")");
		// 綁定 css 樣式
		colDesc.addClass("linkTd");
		// 綁定 click 事件
		colDesc.click(function(){
			var cancer = $(this).parent().children("td:eq(0)").text();// 获取lncRNA name
			var hallmark = $(this).parent().children("td:eq(1)").text();// 获取hallmark name
			var lncRNA = $(this).parent().children("td:eq(2)").text();// 获取lncRNA name
			var genes = $(this).parent().children("td:eq(3)").text();// 获取target name
			var targetType = $("#targetType").val();
			//alert(cancer+":"+miRNA+":"+gene);
			//var imageURL = "GBM/hsa-miR-221+10152";
			var imageURL = cancer+"/"+hallmark+"_"+lncRNA+"_"+genes;
			
			//var row=$('td',this).text();
			//alert(imageURL);
			enlargeLncRNAImage(imageURL);
			});
	});
}
//一定放在DataTable初始化之前
function addColLinksWeightedTtree(id, addLinkCol){
	$("#"+id+" tr").each(function(){
		// 對描述列進行綁定
		var colDesc = $(this).children("td:eq("+addLinkCol+")");
		// 綁定 css 樣式
		colDesc.addClass("linkTd");
		// 綁定 click 事件
		colDesc.click(function(){
			var cancerType = $(this).parent().children("td:eq(0)").text();
			var events = $(this).parent().children("td:eq(1)").text();
			var MutType = $(this).parent().children("td:eq(2)").text();
			
			
			//alert(cancer+':'+events+':'+timing+':'+PMID);
			post('recordWeightedTree.action', {cancerType:cancerType, events:events, MutType:MutType}, "_blank");
			
			});
			
	});
}

//一定放在DataTable初始化之前
function addColLinksEvents(id, addLinkCol){
	$("#"+id+" tr").each(function(){
		// 對描述列進行綁定
		var colDesc = $(this).children("td:eq("+addLinkCol+")");
		// 綁定 css 樣式
		colDesc.addClass("linkTd");
		// 綁定 click 事件
		colDesc.click(function(){
			var speciesType = $(this).parent().children("td:eq(0)").text();
			//var cancerType = $(this).parent().children("td:eq(1)").text();
			var tissueType = $(this).parent().children("td:eq(2)").text();
			var cellName = $(this).parent().children("td:eq(3)").text();
			var cellMarker = $(this).parent().children("td:eq(4)").text();
			var markerResource = $(this).parent().children("td:eq(5)").text();
			var PMID = $(this).parent().children("td:eq(6)").text();
			
			post('recordInfo.action', {speciesType:speciesType, tissueType:tissueType, cellName:cellName, cellMarker:cellMarker, markerResource:markerResource, PMID:PMID}, "_blank");
			});
			
	});
}
//

//一定放在DataTable初始化之前
function addColLinksEventsAddshowHidelength(id, addLinkCol, remarkShowLength){
	$("#"+id+" tr").each(function(){
		// 對描述列進行綁定
		var colDesc = $(this).children("td:eq("+addLinkCol+")");
		
		// 修改method为图形
		// 修改图形前请先给此列赋予content属性值，用于点击事件的提取
		var tmpMethod = $(this).children("td:eq(5)").text();
		$(this).children("td:eq(5)").attr("content", tmpMethod);
		if(tmpMethod =="Experiment"){
			/*$(this).children("td:eq(5)").html('<i class="fa experimentation" style="color: #999999; font-size: 1.2rem;"></i>');*/
			$(this).children("td:eq(5)").html('<img class="experimentation" src="images/userImages/experimentation.png" style="display:block; width:25px;">');
			/*设定css 用于鼠标hover指示*/
			//$(this).children("td:eq(5)").attr("class", "experimentation");
			
		}else if(tmpMethod =="Single-cell sequencing"){
			/*$(this).children("td:eq(5)").html('<i class="fa singleCell" style="color: #999999; font-size: 1.2rem;"></i>');*/
			$(this).children("td:eq(5)").html('<img class="sncRNASeq" src="images/userImages/singleCell.png" style="display:block; width:25px;">');
			// $(this).children("td:eq(5)").attr("class", "sncRNASeq");
		}else if(tmpMethod =="Review"){
			/*$(this).children("td:eq(5)").html('<i class="fa singleCell" style="color: #999999; font-size: 1.2rem;"></i>');*/
			$(this).children("td:eq(5)").html('<img class="sncRNASeq" src="images/userImages/review.png" style="display:block; width:25px;">');
			// $(this).children("td:eq(5)").attr("class", "sncRNASeq");
		}else if(tmpMethod =="Company"){
			/*$(this).children("td:eq(5)").html('<i class="fa singleCell" style="color: #999999; font-size: 1.2rem;"></i>');*/
			$(this).children("td:eq(5)").html('<img class="sncRNASeq" src="images/userImages/company.png" style="display:block; width:25px;">');
			// $(this).children("td:eq(5)").attr("class", "sncRNASeq");
		}else{
			/*$(this).children("td:eq(5)").html('<i class="fa singleCell" style="color: #999999; font-size: 1.2rem;"></i>');*/
			$(this).children("td:eq(5)").html('<img class="sncRNASeq" src="images/userImages/experimentation.png" style="display:block; width:25px;">');
			// $(this).children("td:eq(5)").attr("class", "sncRNASeq");
		}
		
		
		// 綁定 css 樣式
		colDesc.addClass("linkTd");
		// 綁定 click 事件
		colDesc.click(function(){
			var speciesType = $(this).parent().children("td:eq(0)").text();
			//var cancerType = $(this).parent().children("td:eq(1)").text();
			var tissueType = $(this).parent().children("td:eq(1)").text();
			var cellName = $(this).parent().children("td:eq(2)").text();
			
			// 元素因为超过remarkShowLength的字符串会缩短隐藏，需要判断cellmarker是否被隐藏; 可隐藏的元素都有属性isDetail设置，若true才为隐藏；
			// 能够被隐藏的td才会有属性content, 不具有隐藏资格的td isDetail是undefined
			if($(this).parent().children("td:eq(4)").attr('isDetail') == undefined ){
				var cellMarker = $(this).parent().children("td:eq(4)").text();
			}else{
				var cellMarker = $(this).parent().children("td:eq(4)").attr('content');
			}
			
			//var markerResource = $(this).parent().children("td:eq(5)").text();
			var markerResource = $(this).parent().children("td:eq(5)").attr('content');
			//var PMID = $(this).parent().children("td:eq(6)").text();
			//post('recordInfo.action', {speciesType:speciesType, tissueType:tissueType, cellName:cellName, cellMarker:cellMarker, markerResource:markerResource, PMID:PMID}, "_blank");
			post('recordInfo.action', {speciesType:speciesType, tissueType:tissueType, cellName:cellName, cellMarker:cellMarker, markerResource:markerResource}, "_blank");
			});
		
		
	});
}


//一定放在DataTable初始化之前
// showHideCol 根据指长度，超过长度的此列的td才给添加显示和隐藏
function addShowHideCol(id, showHideCol, remarkShowLength){
	$("#"+id+" tr").each(function(){
		// 對描述列進行綁定
		var colDesc = $(this).children("td:eq("+showHideCol+")");
		// console.log(colDesc.text());
		// 获得此列每个td的value
		
		
		var tdText = colDesc.text();
		
		// 特殊字符串，用于基因之间的特殊字符串
		var specialStr = ", ";
		
		// 基因个数
		var geneNum = 0;
		
		// 有时候table title没有进，需要判断；如果没有基因mathch.length就会报错
		if(tdText.indexOf(specialStr) > 0){
			geneNum = tdText.match(/, /g).length+1;
		}
		
		
		//if(tdText.length > remarkShowLength){
		// 判断基因的个数是不是大于remarkShowLength-1
		//console.log(tdText.match(specialStr).length);
		if(geneNum > remarkShowLength){
			
			// 为了以后能够获得原来的能够展示的所有字符串，需要给此td添加一个属性值，并赋予原来所有的字符串；
			colDesc.attr("content",tdText);
			//colDesc.attr("content",tdText.substring(0, strIndex+1));
			
			// 添加点击事件
			//colDesc.attr('onclick','changeShowRemarks(this);');
			// 给出flag确定为隐藏，也即是非isDetail ；false
			colDesc.attr('isDetail',false);
			colDesc.html(getPartialRemarksHtml(tdText, remarkShowLength, specialStr));
		}
			
	});
}

//addShowHideCol 需要调用的函数
	//切换显示备注信息，显示部分或者全部
	function changeShowRemarks(obj, remarkShowLength, specialStr){//obj是td
	   //console.log(obj);
	   var content = $(obj).parent().attr("content");
	   //console.log(content);
	   if(content != null && content != ''){
	      if($(obj).parent().attr("isDetail") == 'true'){//当前显示的是详细备注，切换到显示部分
	         //$(obj).removeAttr('isDetail');//remove也可以
	         $(obj).parent().attr('isDetail',false);
	         $(obj).parent().html(getPartialRemarksHtml(content, remarkShowLength, specialStr));
	      }else{//当前显示的是部分备注信息，切换到显示全部
	         $(obj).parent().attr('isDetail',true);
	         $(obj).parent().html(getTotalRemarksHtml(content, remarkShowLength, specialStr));
	      }
	   }
	}
	// 部分备注信息
	function getPartialRemarksHtml(remarks, remarkShowLength, specialStr){
	      // return remarks.substr(0,remarkShowLength) + '&nbsp;...&nbsp;&nbsp;<i class="fa fa-plus-circle" style="color: #999999;" onclick="changeShowRemarks(this, '+remarkShowLength+')"></i>';
			//获取字符的下标 
			function stringFind(str, specialStr, num){
			    var x=str.indexOf(specialStr);
			    for(var i=0;i<num-1;i++){
			        x=str.indexOf(specialStr,x+1);
			    }
			    return x;
			}
			var strIndex = stringFind(remarks, specialStr, remarkShowLength);
			//console.log(strIndex);
			//console.log(tdText.substring(0, strIndex+1));
		
	      return remarks.substr(0,strIndex+1) + '&nbsp;...&nbsp;&nbsp;<i content="@'+remarks+'@" class="fa fa-plus-circle" style="color: #999999;cursor: pointer;" onclick="changeShowRemarks(this, '+remarkShowLength+', \''+specialStr+'\')"></i>';
	}
	
	// 全部备注信息
	function getTotalRemarksHtml(remarks, remarkShowLength, specialStr){
	      return remarks + '&nbsp;&nbsp;<i class="fa fa-minus-circle" style="color: #d9534f;cursor: pointer;" onclick="changeShowRemarks(this, '+remarkShowLength+', \''+specialStr+'\')"></i>';
	}
	




// 添加行的响应，点击一行的任意位置跳转
function addRowLinks(id){
	$("#"+id+" tbody").on('click', 'tr', function () {
		var cancer = $('td', this).eq(0).text();// 获取lncRNA name
		var miRNA = $('td', this).eq(1).text();// 获取target name
		var gene = $('td', this).eq(2).text();// 获取target name
		var targetType = $("#targetType").val();
		//alert(cancer+":"+miRNA+":"+gene);
		//var imageURL = "GBM/hsa-miR-221+10152";
		var imageURL = cancer+"/"+miRNA+"+"+gene;
		
		//var row=$('td',this).text();
		//alert(imageURL);
		enlargeImage(imageURL);
		//post('recordInfo.action', {lncRNA_name:lncrna_name, target_symbol:target_name, targetType:targetType}, "_blank");
		//post('tableRowInfo.action', {rowID:ID});//将id号传入相应的action中进行数据库查询，得到对应的信息
	});
}

//添加行的响应，鼠标在上面的时候高亮，移走后恢复
function addRowHover(id){
	// DataTable也有对行列同时高亮，形成高亮十字线的例子
	// 但只实现了对列的高亮，似乎把这个代码和例子中的正合在一起即可，未测试
	$("#"+id+" tbody").on('mouseover', 'tr', function(){
		table.$('tr.highlight').removeClass('highlight');
		$(this).addClass('highlight');
	}).on('mouseleave', 'tr', function(){
		table.$('tr.highlight').removeClass('highlight');
		$(this).removeClass('highlight');
	});
}

// 初始化DataTable插件，此函数是最底层函数
// 如果没有特殊情况可以直接调用此函数，或直接使用DataTable的代码
// 输入变量
// id, 对哪一个<table>使用DataTable插件
// destory, ture/false, 这个用于是否重建DataTable
// 如果该id已经被DataTable构建过了，那么直接调用DataTable()的话会有错误
// 需要先destroy该DataTable
function initDataTable(id, destroy){
	table = $("#"+id).DataTable({
		// 是否搜索
		"searching": true,
		// 是否分页
		"paging": true,
		// 每页显示的条目数
		"lengthMenu": [[10,30,50,-1], [10,30,50,"All"]],
		// 是否使用jQueryUI的样式
		"jQueryUI": false,
		// 是否允许排序
		// 支持多列排序，参数为orderMuti
		"ordering": true,
		// 默认不排序
		"order": [],
		// 是否destroy，用于reload table
		"destroy": destroy,
		// 水平滚动
		"scrollX": true,
	    
		// 自动调整宽度
		//"responsive": true, //自动换成下一行
		///"bAutoWidth": true,
		
		// 下载插件 -- 开始
		// 如果不需要的话需要删除
		/*"dom": 'T<"clear">lfrtip',
		    "oTableTools": {
		"sSwfPath": "js/DataTables-1.10.4/extensions/TableTools/swf/copy_csv_xls.swf",
		"aButtons": ["xls"],
		"aButtons": ["copy","xls"]
		},*/
		dom: 'lBfrtip',//'Bfrtip'加上'l'才能使show entries dropdown(即Show 10 entries下拉列表)和export-tools(即datatable download csv/text/excel)共同显示
        buttons: [
            //'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            //'pdfHtml5'
        ]
		// 下载插件 -- 结束
	});
	// 解决datatable，行元素太长就会浮出div，通过"scrollX": true,设置后，table的head和内容不对齐，需要通过以下css进行校正
	$(".dataTables_scrollHead").css("width","100%");
	$(".dataTables_scrollHead table").css("width","100%");
	$(".dataTables_scrollHeadInner").css("width","100%");
	$(".dataTables_scrollBody table").css("width","100%");
	
	
}

function initTable(id,  key1, key2, showHideCol, addLinkCol){
	// 添加列链接，一定要放在DataTable初始化之前
	//addColLinks(id, key1, key2, addLinkCol);
	
	// 1)添加隐藏和显示；只有超过特定字符长度的才会有显示和隐藏项
	// 设定字符串最小显示长度
	var remarkShowLength = 6;
	addShowHideCol(id, showHideCol, remarkShowLength);
	
	//添加行连接.
	//addColLinksEvents(id, addLinkCol);
	addColLinksEventsAddshowHidelength(id, addLinkCol, remarkShowLength);
	
	//addRowLinks(id);
	// 官方文档提到：在对$("#test")进行DataTable初始化后，如果对$("#test")进行修改，并直接重新初始化会出错
	// 原因是因为环境中已有$("#test")相应的DataTable对象
	// 因此首先判断id <table> 是否被DataTable初始化过
	// 如果已经被初始化了，使用DataTable中的destroy参数，删除之前存在的DataTable对象
	
	if ($.fn.dataTable.isDataTable("#"+id)){
		initDataTable(id, true);
	}else{
		initDataTable(id, false);
	}
	// 为了完成下载功能，需要把超过6个marker和方法类型换回原来的文字；
	// 在初始化之后进行marker和方法的回对；用于下载;
	// 注意修改元素所在的列数
	
	
	var DatatableData= $('#'+id).DataTable().data();
	for(var rowDatai=0;  rowDatai < DatatableData.length; rowDatai++){
		// 根据在img里设定的content获取所有的marker；
		var theMarkersList = DatatableData[rowDatai][4].split('@');
		// 只有做了变换的行才找回虽有marker，没有变换的就是原来所有的marker
		if(theMarkersList.length == 3){
			DatatableData[rowDatai][4] = theMarkersList[1];
		}
		
		// 找回方法的名字
		var Methodhtml = DatatableData[rowDatai][5];
		if(Methodhtml.indexOf("experimentation")!=-1){
			DatatableData[rowDatai][5] = "Experiment";
		}else if(Methodhtml.indexOf("singleCell")!=-1){
			DatatableData[rowDatai][5] = "Single-cell sequencing";
		}else if(Methodhtml.indexOf("review")!=-1){
			DatatableData[rowDatai][5] = "Review";
		}else{
			DatatableData[rowDatai][5] = "Company";
		}
	}

	// 添加行样式，用以响应鼠标放上去高亮
	// 放在DataTable初始化之后
	addRowHover(id);
	
}
function initWordCloudTable(id){
	// 添加列链接，一定要放在DataTable初始化之前
	//addColLinks(id, key1, key2, addLinkCol);
	//addRowLinks(id);
	// 官方文档提到：在对$("#test")进行DataTable初始化后，如果对$("#test")进行修改，并直接重新初始化会出错
	// 原因是因为环境中已有$("#test")相应的DataTable对象
	// 因此首先判断id <table> 是否被DataTable初始化过
	// 如果已经被初始化了，使用DataTable中的destroy参数，删除之前存在的DataTable对象
	if ($.fn.dataTable.isDataTable("#"+id)){
		initDataTable(id, true);
	}else{
		initDataTable(id, false);
	}
	// 添加行样式，用以响应鼠标放上去高亮
	// 放在DataTable初始化之后
	addRowHover(id);
}

function initTableWeightedTree(id,  key1, key2, addLinkCol){
	// 添加列链接，一定要放在DataTable初始化之前
	//addColLinks(id, key1, key2, addLinkCol);
	//添加行连接.
	
	//addColLinksMiRNA(id, addLinkCol);
	// addColLinksLncRNA(id, addLinkCol);
	addColLinksWeightedTtree(id, addLinkCol);
	//addRowLinks(id);
	// 官方文档提到：在对$("#test")进行DataTable初始化后，如果对$("#test")进行修改，并直接重新初始化会出错
	// 原因是因为环境中已有$("#test")相应的DataTable对象
	// 因此首先判断id <table> 是否被DataTable初始化过
	// 如果已经被初始化了，使用DataTable中的destroy参数，删除之前存在的DataTable对象
	if ($.fn.dataTable.isDataTable("#"+id)){
		initDataTable(id, true);
	}else{
		initDataTable(id, false);
	}
	// 添加行样式，用以响应鼠标放上去高亮
	// 放在DataTable初始化之后
	addRowHover(id);
}
