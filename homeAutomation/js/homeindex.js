$(function(){
	var phone = getCookie("phone");			/*获取登录时存在cookie中的手机号码*/
	var user_id = getCookie("user_id");  /*获取cookie登录时返回的data值（即user_id）*/
//	alert(phone)
//	alert($('.classfy_btn').width());
//	$('#left_list').height($(window).height());
/*
 
 * 左边栏的打开闭合*/
	
	$(window).resize(function(){
		$('#left_list').height($(window).height());
//		document.title=$(window).width();
	})
	var pronum ;
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('#accordion'), false);
	/*鼠标滑过显示退出*/
	$('#head_photo').mouseover(function(){
		$('#logout').stop(true,false).show();
	});
	$('#head_photo').mouseout(function(){
		$('#logout').stop(true,false).hide();
	})
	/*当main_bottom页面的高度小于浏览器高度时出现滚动条*/
	$('#main_bottom').height($(window).height()-126+'px');
		$(window).resize(function() {
		var winHeight =$(window).height()-126+'px';
		var bottomHeight = $('#main_con').height()-126+'px';
		if(bottomHeight > winHeight ){
			$('#main_bottom').css('overflow-y','scroll');
		}
		else{
			$('#main_bottom').css('overflow','visible');
		}
	});
	/*同步右侧点开窗帘的控制栏的显示名字*/
	function cName(){
		var aLi = $('#main_bottom ul li');
	for(var i=0;i<aLi.length;i++){
		aLi[i].id=i;
		$('#'+i).children('a').click(function(){
			var that =this;
		var index =	$(that).parent('li').attr('id');
//		alert(index);
			var num =parseInt(index)+1;
			$('.control-name p').html('窗帘'+num);
		})
	}
	}
	
	/*
	 
	 * 将用户名显示*/
	function pName(){
		$("#cname").html('');
		$("#cname").append('欢迎您，'+phone)
	}
	pName();
	
	/*
	 获取url参数
	 */
	function getQueryString(name) { 
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
			var r = window.location.search.substr(1).match(reg); 
			if (r != null) return unescape(r[2]);
			return null;
				} 
				/*
				 
				 * 调查看用户设备接口*/
	$.ajax({
					contentType:"application/json",
					type:"get",
					url:"http://120.27.95.22/CloudHome/index.php/Home/Index/pro_state?", 
					data:{ user_id:user_id},
					dataType:"json",
					cache:false,
					async:true, 
//					beforeSend: function () {
//							alert("正在处理请求，请稍后。。。。。");
//							}, 
					success: function (datac){
						
//						 alert(user_id);
//						alert(JSON.stringify(datac))
						$("#main_bottom ul li").detach();
						if(datac.success == '1'){
   							for(var i=0;i<datac.data.AABC.AASX.length;i++){
								$("#main_bottom ul").append('<li><a class="left-panel-link" href="#left-panel" id="'+datac.data.AABC.AASX[i].product_num+'"><span>窗帘'+datac.data.AABC.AASX[i].product_num+'</span><i></i></a></li>')
								$('.left-panel-link').panelslider();
								
								
							}
// 							$("#main_bottom ul li a").click(function(event){
// 								$(this).attr('href','javascript:void()')
// 								event.preventDefault();
// 							})
					
   							$("#main_bottom ul li a").click(function(){
   							
   								pronum = $(this).attr('id');
// 								alert(pronum)
								$('.control-name p').html('窗帘'+pronum);
								$(this).parent().addClass('pink-click').siblings().removeClass('pink-click');
   							});
   							
   						
// 							cName();
						}else{
							
						}
						
				      },
					 error:function(XMLHttpRequest, textStatus, errorThrown) {
					       alert(XMLHttpRequest.status);
					       alert(XMLHttpRequest.readyState);
					       alert(textStatus);
								}
			})
	/*
	 
	 * 退出用户登录*/
	function loginOut(){
		window.location.href='login.html';
	}
	$("#logout").click(function(){
		loginOut();				
	})
				/*
				 
				 * 调窗帘接口*/
	function controlCurtian(state){
		$.ajax({
					contentType:"application/json",
					type:"get",
					url:"http://120.27.95.22:21777/Control_mac?",
					data:{ user_id:user_id,
						   first_type:'AABC',
						   second_type:'AASX',
						   product_num:pronum,
//						   state:'{current_status:'+state+'}',
						   state:state,
						   info:'abcd',
						   is_manager:1
						},
					dataType:"jsonp",
					jsonp:'callback',
//					jsonpCallback:'callback',
					cache:false,
					async:true, 
//					beforeSend: function () {
//							alert("正在处理请求，请稍后。。。。。");
//							}, 
					success: function (datac){
//						var data = JSON.stringify(datac);
//					     alert(data)
						if(datac.success==1){
								alert("成功打开窗帘！")
						}else{
							alert("发生错误！")
						}
				
				      },
					 error:function(XMLHttpRequest, textStatus, errorThrown) {
					       alert(XMLHttpRequest.status);
					       alert(XMLHttpRequest.readyState);
					       alert(textStatus);
					       
								}
			})
	}
	$("#up").click(function(){
		
		controlCurtian('10_01_01');		/*窗帘上*/
		
	});
	$("#down").click(function(){
		controlCurtian('10_00_01');		/*窗帘下*/
	});
	$("#left").click(function(){
		controlCurtian('01_10_01');		/*窗帘打开*/
	});
	$("#right").click(function(){
		controlCurtian('00_10_01');		/*窗帘关闭*/
	});
	$("#stop").click(function(){
		controlCurtian('00_00_00');		/*窗帘停止*/
	})
})
