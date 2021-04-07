//設置ztree，即網頁中顯示的那棵樹
var tissueSetting = {
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
		onClick: onClick
	}
};
//设置全局变量
ztreeSearched = false;

// 查找節點用的函數
// value, 搜索的值
// likely, 是否模糊匹配
function searchNode(key, value, likely, treeID) {
	// 获取树对象
	var zTree = $.fn.zTree.getZTreeObj(treeID);
	//alert("search "+key);
	var nodeList;
	//alert(key+"    "+value);
	if(likely)
		nodeList = zTree.getNodesByParamFuzzy(key, value);	//模糊搜索
	else
		nodeList = zTree.getNodesByParam(key, value);	//精確搜索
	if (nodeList.length > 0) {
		// 遍历找到的节点集合
		for (var i = 0, l = nodeList.length; i < l; i++) {
			if (nodeList[i].getParentNode()) {
				// 展开其父节点
				zTree.expandNode(nodeList[i].getParentNode(), true, false, false);
			}
			nodeList[i].highlight = true;
			// 高亮
			zTree.updateNode(nodeList[i]);
		}
	}
	zTree.refresh(); // 很重要，否则节点状态更新混乱。
	
	ztreeSearched = true;
}
// 重置节点属性，包括
// 取消所有展开
// 取消节点高亮
function resetNodeCss(treeID){
	var zTree = $.fn.zTree.getZTreeObj(treeID);
	// 获取所有节点
	var allNodes = zTree.transformToArray(zTree.getNodes());
	// API文档的例子很坑，写得很不清晰
	// zTree.getNodes()返回的是一个JSON对象，我们使用的时候还需要额外调用transformToArray
	// 将之转化为可用的array才成
	// Traverse all the nodes need to use recursion, or the use of transformToArray() method make the nodes to be a simple array.
    for(var i = 0, l = allNodes.length; i < l; i++){
    	allNodes[i].highlight = false;
        // 取消高亮
        zTree.updateNode(allNodes[i]);
    }
    // 是否展开全部
    zTree.expandAll(true); 
}

function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}



//點擊樹節點調用的函數
function onClick(event, treeId, treeNode, clickFlag) {
	// 如果点击节点后，就刷新树
	if(ztreeSearched){
		resetNodeCss("treeDemoTissue");
		resetNodeCss("treeDemoCell");
		ztreeSearched = false;
	}
	
	var zTree = $.fn.zTree.getZTreeObj("treeDemoTissue");
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
		// 不搜索Gene/Event第三层自定义的染色体等
		// 为防止gene/event 的第二层gene不能搜索
		//var tmpgeneParent = nodes[0].getParentNode();
		// console.log(tmpgeneParent);
		// console.log(parent);
		$("#tissueType").val(child);
		
		// 根据点击的组织树，刷新细胞树
		// 加载细胞下拉树	
		$("#cellName").val('');
		creatCellTree();

}
