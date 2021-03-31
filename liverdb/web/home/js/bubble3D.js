function bubble3D(divID,xLables,yLables,ytitle,title,plotData,searchMarker){
	//画气泡图，
	//divID：对应块级id
	//xLables:x周标签
	//ytitle: y周标题
	//title：标题
	//plotData:堆叠数据
	
	// 数据的装换
	// 从后台传过来的都是字符串
	
	xLables = JSON.parse(xLables);
	yLables = JSON.parse(yLables);
	
	plotData = JSON.parse(plotData);
	var allz = plotData.map(d =>(d[2]));
	var maxz = d3.max(allz);
	var minz = d3.min(allz);
	if(minz ==0){minz=1}
	
	// 根据z值标化point（marker）的大小
	//var r = d3.scaleLinear().domain([0,1]).range([1,15]);
	var r = d3.scaleLinear().domain([maxz,minz]).range([8,3]);
	plotData = plotData.map(d => (d[2]>0 ? {x:d[0],y:d[1],z:d[2],marker:{radius:(r(d[2]))}}:null));
	

	var count = yLables.length,
	colcount = xLables.length,
	marginLeft = 130,
	marginRight = 130,
	pointWidth = 15,
	marginTop = 130,
	marginBottom = 5,
	groupPadding = 0,
	pointPadding = 0.1;
	
	var height = marginTop + marginBottom + ((pointWidth * count) * (1 + groupPadding + pointPadding))+20;
	width = marginRight + marginLeft + ((pointWidth * colcount) * (1 + groupPadding + pointPadding))+20;
	
	if(count < 10){
		height = marginTop + marginBottom + ((pointWidth * 10) * (1 + groupPadding + pointPadding))+20;
	}
	// legend 展示的个数
	var rangeMaxMin = maxz - minz;
	var legendCellNumber = 2;
	if(rangeMaxMin < 5){
		legendCellNumber = rangeMaxMin+1;
		if(rangeMaxMin == 0){
			legendCellNumber = legendCellNumber+1;
		}
		
	}else{
		legendCellNumber = 5;
	}
	
	
	var containerWidth = $("#"+divID+"Container").width();
	if(containerWidth > width+50){
		width = containerWidth-50;
	}
	$('#'+divID).width(width);

	$('#'+divID).highcharts({
	//Highcharts.chart(divID, {
		chart: {
			type: 'scatter',
			plotBorderWidth: 2,
			zoomType: 'xy',
			plotBorderWidth: 1,
	        marginTop: marginTop,
	        marginRight: marginRight,
	        marginBottom: marginBottom,
	        marginLeft: marginLeft,
	        height: height,
	        width:width,
	        
		},
		title: {
			//text: 'Highcharts bubble'
			text: title
		},
		xAxis: {
			//categories: ['a1','a2','a3','a4','a5','a6'],
			min: 0,
			max:xLables.length-1,
			categories: xLables,
			gridLineWidth: 0,
			tickWidth:0,
			rotation: -45,
			opposite: true, // 是否将坐标轴显示在对立面 默认是false
			title: null,
			labels:{
				//x:45,//调节x偏移
				//y:-35,//调节y偏移
				//rotation:-45,//调节倾斜角度偏移,副值是逆时针，单位是度
				rotation: -40,
				enabled: true,
			},
			crosshair: {
				width: 2,
				color: 'gray',
				dashStyle: 'shortdot',
				zIndex:0,
			},
		},
		yAxis: {
			gridLineWidth: 0,
			tickWidth:0,
			min: 0,
			max:yLables.length-1,
			startOnTick: false,
			endOnTick: false,
			// categories: ['a1','a2','a3','a4','a5','a6'],
			categories: yLables,
			reversed: true,
			title: null,
			crosshair: {
				width: 2,
				color: 'gray',
				dashStyle: 'shortdot',
				zIndex:0,
			},
		},
		plotOptions: {
			bubble: {
				//zMin: 1,
				//zMax: 5,
				//minSize: 20,
				//maxSize: 60,
			},
			 series: { 
				 turboThreshold: 0, // 设置为0，说明不限制
			 },
		},
		series: [{
			data:plotData,
			/*data: [
				[5, 5, 1],
				[2, 4, 5],
				[0, 0, -0],
			],*/
			marker: {
				fillColor: {
					radialGradient: { cx: 0.5, cy: 0.5, r: 0.6 },
					stops: [
						[0, 'rgba(255,255,255,0.5)'],
						[1, '#4682b4']
					]
				}
			}
		}],
		/*
		 *tooltip:提示信息：
		 *
		 */
		tooltip: {
			enabled: true, // false 不显示tip信息
			headerFormat: '<b>cell marker: '+searchMarker+'</b><br/>',
			pointFormatter: function () {
				// console.log('this:1');
				// console.log(this);
				return 'Entries number: <b>' + this.z 
						+'</b><br> tissue type: <b>' + this.series.yAxis.categories[this.y]
						+'</b><br> cell type: <b>' + this.category+'</b>';
			}
		},
		legend: {
	    	enabled:true,
	        align: 'right',
	        verticalAlign: 'top',
	        layout: 'horizontal',
	        marginTop: -30,
	        symbolHeight:10,
	        floating: false,
	        y:-24,
	        title:{
	        	text: ""
	        }

	    },
		credits:{
			enabled:false,
		},
	});
	
	
	// 通过D3 画legend
	//  d3.select('.highcharts-legend-item').selectAll('path').style('display','none');
	//  d3.select('.highcharts-legend-item').select('text').attr('x','12').attr('y',18);
	// legend plus
	var blueScale = d3.scaleLinear().domain([maxz,minz]).range([r.range()[0],r.range()[1]]);

	var svg = d3.select("#" + divID).select("svg");
	var transform = svg.select(".highcharts-legend").attr("transform");
	var translate = transform.substring(transform.indexOf("(")+1, transform.indexOf(")")).split(",");
	svg.select(".highcharts-legend").remove();

	blue = svg.append("g")
	  .attr("class", "legendSizeBlue")
//	  .attr("transform", "translate(1005, 0)")
	  //.attr("transform", transform)
	  .attr("transform", `translate(${+translate[0]+0},${translate[1]+70})`)
	  .attr('fill',"#4682b4");
	
	myTitleLoc = svg.append("g")
	  .attr("class", "myTitleLoc")
//	  .attr("transform", "translate(1025, 155)")
	  .attr("transform", `translate(${+translate[0]-10},${+translate[1]+150})`)
	  .attr('fill',"#666666");
	
	
	var legendSizeBlue = d3.legendSize()
	  .scale(blueScale)
	  .shape('circle')
	  .cells(legendCellNumber)	//显示的点的个数，默认是5个
	  .shapePadding(10)
	  .labelOffset(10)
	  .labelWrap(10)
	  .orient('verticle');
	
	blue.call(legendSizeBlue);
	myTitleLoc.append('text').text("Entries number");

	
	
}