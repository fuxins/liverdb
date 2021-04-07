function zingWordCloud(divID, wordsData){
	//画饼图，并对提供数据倒序排序；
	//divID：对应块级id
	//wordsData: 需要展示的word数据，[{"text": "time","count": "542"}, {"text": "shampoo","count": "296"}]
	   var myConfig = {
			      "graphset": [{
			        "type": "wordcloud",
			        "options": {
			          "style": {
			            "tooltip": {
			              visible: true,
			              text: '%text: %hits'
			            }
			          },
			          "max-items":100000,
			          "min-length":1,
			          "words": wordsData,
			        }
			      }]
			    };

	    zingchart.render({
	      //id: 'wordCloudChart',
	      id: divID,
	      data: myConfig,
	      height: '100%',
	      width: '100%',
	      hideprogresslogo: true, //hide zingchart loading
	    });

}


function zingWordCloudFont(divID, wordsData){
	//画饼图，并对提供数据倒序排序；
	//divID：对应块级id
	//wordsData: 需要展示的word数据，[{"text": "time","count": "542"}, {"text": "shampoo","count": "296"}]
	   var myConfig = {
			      "graphset": [{
			        "type": "wordcloud",
			        "options": {
			          "style": {
			            "tooltip": {
			              visible: true,
			              text: '%text: %hits'
			            }
			          },
			          "max-items":100000,
			          "min-length":1,
			          "words": wordsData,
			          "maxFontSize": 40,
			          "minFontSize": 8,
			        }
			      }]
			    };

	    zingchart.render({
	      //id: 'wordCloudChart',
	      id: divID,
	      data: myConfig,
	      height: '100%',
	      width: '100%',
	      hideprogresslogo: true, //hide zingchart loading
	    });

}