// 自定义的json转化为table的脚本
// 需要指定插入哪个table
// 例如，html中有<table id="test"></table>
// 则id填入test
// 注意此函数会添加，而非替换table
// 注意此函数只设置table内容，不理会table header
json2table = function(data,id){
	var jsonObj = data;
	if (typeof data === "string") {
		jsonObj = JSON.parse(data);
	}
	resultTable = "<tr>";

	for(var i=0;i<jsonObj.length;i++){
		tempRow = "";
		for(var j=0;j<jsonObj[i].length;j++){
			tempRow = tempRow+"<td>"+jsonObj[i][j]+"</td>";
		}
		resultTable = resultTable+tempRow+"</tr>";
	}
	$(id).append(resultTable);
};
