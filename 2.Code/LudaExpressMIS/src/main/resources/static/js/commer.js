toastr.options = {  
    closeButton: false,                                            // 是否显示关闭按钮，（提示框右上角关闭按钮）
    debug: false,                                                    // 是否使用deBug模式
    progressBar: true,                                            // 是否显示进度条，（设置关闭的超时时间进度条）
    positionClass: "toast-top-center",              // 设置提示款显示的位置
    onclick: null,                                                     // 点击消息框自定义事件 
    showDuration: "300",                                      // 显示动画的时间
    hideDuration: "1000",                                     //  消失的动画时间
    timeOut: "2000",                                             //  自动关闭超时时间 
    extendedTimeOut: "1000",                             //  加长展示时间
    showEasing: "swing",                                     //  显示时的动画缓冲方式
    hideEasing: "linear",                                       //   消失时的动画缓冲方式
    showMethod: "fadeIn",                                   //   显示时的动画方式
    hideMethod: "fadeOut"                                   //   消失时的动画方式
};


//添加点击事件，设置返回顶部的时间为1s
$("#go_up a").click(function() {
	if ($('html').scrollTop()) {
		$('html').animate({
			scrollTop: 0
		}, 1000);
		return false;
	}
	$('body').animate({
		scrollTop: 0
	}, 1000);
	return false;
});



/*******************监听滚动条***********************/

function getDocumentTop() {
	var scrollTop = 0,
	bodyScrollTop = 0,
	documentScrollTop = 0;
	if (document.body) {
		bodyScrollTop = document.body.scrollTop;
	}
	if (document.documentElement) {
		documentScrollTop = document.documentElement.scrollTop;
	}
	scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	return scrollTop;
}

function getWindowHeight() {
	var windowHeight = 0;
	if (document.compatMode == "CSS1Compat") {
		windowHeight = document.documentElement.clientHeight;
	} else {
		windowHeight = document.body.clientHeight;
	}
	return windowHeight;
}

function getScrollHeight() {
	var scrollHeight = 0,
	bodyScrollHeight = 0,
	documentScrollHeight = 0;
	if (document.body) {
		bodyScrollHeight = document.body.scrollHeight;
	}
	if (document.documentElement) {
		documentScrollHeight = document.documentElement.scrollHeight;
	}
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	return scrollHeight;
}



window.onscroll = function() {
	//回到顶部出现和消失
	if(getDocumentTop()>150){
		$("#go_up").fadeIn(100);
		$("#go_up").css("opacity","1");
	}else{
		$("#go_up").fadeOut(500);
	}
	
}

