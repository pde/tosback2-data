BN('Text.Tokenizer',function(){
	var TokenProcessor=function(s,e){
		var start=s||'{';
		var end = e||'}';
		var template=undefined;
		var setStart=function(sta){
			if(sta !== end){
				start=sta;
			}else{
				throw 'token start cant match token end';
			}
		};
		
		var setEnd=function(nd){
			if(nd !== start){
				end=nd;
			}else{
				throw 'token start cant match token end'; 
			}
		};
		
		var setSource= function(obj){
			template=obj;
		};
		
		var tokenize=function(str,tem){
			var sorce=tem || template;
			var arr=str.split(start);
			var temp='';
			if(sorce === undefined){
				throw 'tokenizer requires source to match against';
			}
			for(var i=1;i<arr.length;i++){
				temp=arr[i].split(end);
				arr[i]=sorce[temp[0]]+(temp[1] || '');
			}
			return arr.join('');			
		};

		return{
			setStart:setStart,
			setEnd:setEnd,
			setData:setSource,
			process:tokenize
		};
	};
	
	return {
		getTokenizer:function(s,e){
			return new TokenProcessor(s,e);
		}
	}
},true);

BN('Environment.Text',function(){
	var dataSource=BN.WL.Config.Text;
	
	//this will be removed
	var doRecursiveReplace=function(txt){
		var flatten=function(n){
		    var flatObj={};
		    var iterate=function(obj,str){
		        var myStr=str ||'';
		        for(var x in obj){
		            if(obj.hasOwnProperty(x)){
		                if(typeof obj[x] === 'string'){
		                    flatObj[myStr+x]=obj[x];
		                }else{
		                    iterate(obj[x],myStr+x+'.');
		                }
		            }
		        }
		    };
	    	iterate(n);
	    	return flatObj;
		};
		var tokenizer = BN.Text.Tokenizer.getTokenizer('|[{','}]|');
		var result = tokenizer.process(txt,flatten(dataSource));
		return result;
		
	};
	
	

	var findText=function(str,obj){
	    var pos=str.indexOf('.');
	    if(pos !== -1){
	        return findText(str.substring(pos+1),obj[str.substring(0,pos)])
	    }else{
	        if(typeof obj[str] === 'string'){
	            return obj[str];
	        }else{
	            throw str + ' is not a string. Replacement must terminate with a string';
	        }
	    }
	};
	
	var replaceText= function(txt,sorc){
		var tokenizer = BN.Text.Tokenizer.getTokenizer('|!P{','}P!|');
		return tokenizer.process(txt,sorc);
	};
	
	var locGetText=function(lookup,replaceObj){
		var result= findText(lookup,dataSource);
		if(replaceObj){
			result=replaceText(result,replaceObj);
		}
		//this does the token replacement....
		
		return doRecursiveReplace(result);
		//Following is after replacement is done in the tool.
		//return result;
	};
	
	return {getText:locGetText};	
},true);