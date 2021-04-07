//使用post方式調用action，因爲如果使用get方式，那麼漢字就會變成%2x%xg這種東西，導致運行失敗
			function post(URL, PARAMS, target) {
		        var temp = document.createElement("form");
		        temp.action = URL;
		        temp.method = "post";
		        temp.target = target;
		        
		        temp.style.display = "none";
		        
		        for (var x in PARAMS) {
		            var opt = document.createElement("textarea");
		            opt.name = x;
		            opt.value = PARAMS[x];
		            temp.appendChild(opt);
		        }
		        document.body.appendChild(temp);
		        temp.submit();
		        return temp;
		    }
			
			