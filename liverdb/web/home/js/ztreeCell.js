//設置ztree，即網頁中顯示的那棵樹
var cellSetting = {
	view: {
		showIcon: false,	// 不显示图标
		fontCss: getFontCss	//用於查找節點，高亮显示字体
	},
	data: {
		simpleData: {
			enable: true    //数据是否采用简单 Array 格式，默认false 
		},
		
	
	},
	// 前边复选框, true是显示
	check: {
		enable: false,
		chkStyle: "checkbox",
		chkboxType: {  "Y" : "ps", "N" : "ps" }
	},
	
	callback: {
		onClick: onClickCell
	}
};

//點擊樹節點調用的函數
function onClickCell(event, treeId, treeNode, clickFlag) {
	// 如果点击节点后，就刷新树
	if(ztreeSearched){
		//resetNodeCss("treeDemoTissue");
		resetNodeCss("treeDemoCell");
		//ztreeSearched = false;
	}
	
	var zTree = $.fn.zTree.getZTreeObj("treeDemoCell");
	// 返回被选中节点的JSON对象，包括该结点的所有信息
	// 调用方法如alert
	// alert(JSON.stringify(zTree));
	var nodes = zTree.getSelectedNodes();
	// alert(JSON.stringify(nodes));
	// console.log(nodes);
	// alert(nodes[0].isParent);
	// 只让叶子节点有点击事件
	//console.log(nodes);
	//if(!nodes[0].isParent){
	//console.log(nodes[0].level);
		//获取root节点的信息：(所有的叶子节点都在三层)
		// console.log(nodes[0].getParentNode().getParentNode().id);
		// var BrowseType = nodes[0].getParentNode().getParentNode().id;
		
		var rootNode = nodes[0]; 
		// 自动适应树的层数
		for(var i=0; i< nodes[0].level; i++){
			rootNode = rootNode.getParentNode();
		}
		var BrowseType = rootNode.id;
		
		// 获取选中节点的id及其父节点的id
		var child = nodes[0].id;
		var parent = nodes[0].pId;
		
		// 定义变量
		var speciesType = '';
		var tissueType = '';
		var cellType = '';
		var cellName = '';
		if(BrowseType !="Cell"){
			speciesType = BrowseType;
			//判断在底基层，
			// 判断
			if(nodes[0].isParent){
				tissueType = child;
			}else{
				tissueType = parent;
				cellName = child;
			}
		}else{
			cellName = child;
		}
		// 替换自定义关键字中的特定字符
		tissueType = tissueType.replace(/\_Human|\_Mouse/g, '');
		cellName = cellName.replace(/\_Human|\_Mouse/g, '');
		
		// 不搜索Gene/Event第三层自定义的染色体等
		// 为防止gene/event 的第二层gene不能搜索
		//var tmpgeneParent = nodes[0].getParentNode();
		// console.log(tmpgeneParent);
		// console.log(parent);
		$("#cellName").val(child);
		if(speciesType!="" | tissueType!="" | cellName!=""){
		}
		

}
