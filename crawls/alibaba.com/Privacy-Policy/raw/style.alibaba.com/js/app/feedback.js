function showFeedBackWindow(tag){		
	var URL = tag ? 'http://ask.alibaba.com/feedback/feedback.htm?tag=' + tag : 'http://ask.alibaba.com/feedback/feedback.htm';
	try{
		if(!window.msgBox){
			var objTransaction = YAHOO.util.Get.script("http://style.alibaba.com/js/app/msg_box.js",{ 
				onSuccess: function() {
					msgBox.xWindow(URL,[735,497],"",true);
				}
			});
		}else{
			msgBox.xWindow(URL,[735,497],"",true);
		}
		
	}catch(e){}

	var css,style=document.createElement('style');
	style.type='text/css';
	document.body.appendChild(style);
	css=document.styleSheets[document.styleSheets.length-1];
				
	if(css.addRule){
		css.addRule('.PopUpFrame','border:1px solid #CBE4F1;padding:0;background:#ffffff;');
		css.addRule('.msgBoxCloseButtonImg','position:absolute;top:5px;right:5px;width:21px;height:19px;background:url(\'http://style.alibaba.com/images/eng/feedback/ufs/close.gif\') no-repeat;_overflow:hidden;');
		css.addRule('.PopUpFrame iframe','background:#fff;width:735px;height:497px !important;');
		css.addRule('.PopUpMask','position:absolute;z-index:10;left:0;top:0;background:#000;filter: Alpha(Opacity=20);');
		css.addRule('#msgBoxContent','left:0 !important;top:0 !important;margin:0; padding: 0 !important;width:735px;');
	}else{
		css.insertRule('.PopUpFrame{border:1px solid #CBE4F1;padding:0;background:#ffffff;}',0);
		css.insertRule('.msgBoxCloseButtonImg{position:absolute;top:5px;right:5px;width:21px;height:19px;background:url(\'http://style.alibaba.com/images/eng/feedback/ufs/close.gif\') no-repeat;_overflow:hidden;}',0);
		css.insertRule('.PopUpFrame iframe{background:#fff;width:735px;height:497px !important;}',0);
		css.insertRule('.PopUpMask{position:absolute;z-index:10;left:0;top:0;background:#000;filter: Alpha(Opacity=20);}',0);
		css.insertRule('#msgBoxContent{left:0 !important;top:0 !important;margin:0; padding: 0 !important;width:735px;}',0);
	}
	
	setTimeout(function(){
		var msgBoxCloseButton = document.getElementById('msgBoxCloseButtonImg');			
		if( msgBoxCloseButton ){
			YUE.on(msgBoxCloseButton, 'click', function(){
				YUE.removeListener(msgBoxCloseButton,'click');
				style.parentNode.removeChild( style );
			}, [msgBoxCloseButton,style], true);
		}
	},50);
	
}

// bug fix
if(location.href.indexOf("http://channel.alibaba.com/complaint/postComplaint.htm") != -1){
	YUE.on(window,"load",function(){
		setTimeout(function(){
		if(get("calContainer0")){
			var calLinks = get("calContainer0").getElementsByTagName("a");
			for(var i=0; i<calLinks.length;i++){
				YUD.addClass(calLinks[i],"richinfoclass");
			}
		}},1000)
	});
}

