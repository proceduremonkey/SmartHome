$(function(){
	
	$("#btn").click(function(){
		var  phone = $("#phone").val();       /*获取用户输入的手机号码*/
		var  password = $("#pwd").val();		/*获取用户输入的密码*/
		var  $form = $("#loginFrom");			/*获取表单id*/
		setCookie("phone",phone,365);	/*将手机号码设置cookie存在浏览器中方便获取使用*/
//		alert("手机："+phone+"用户名："+username+"密码："+password+"再次输入密码："+password_confirm);
			 if(phone == "" || password == ""){
	 		alert("请填写手机号和密码！");
	 		return
	 		}else{
	 			/*调登录接口*/
	 	$.ajax({
					contentType:"application/json",
					type:"get",
					url:$form.prop('action'), 
					data: $form.serialize(),
					dataType:"json",
					cache:false,
					async:true, 
//					beforeSend: function () {
//							alert("正在处理请求，请稍后。。。。。");
//							}, 
					success: function (json){
						
//						alert(JSON.stringify(json));
						if(json.success == '1'){
							alert('登录成功，欢迎使用云智联创smarthome！');
							user_id = json.data;
							setCookie("user_id",user_id,365);
							
//							alert(user_id)
							setTimeout(function(){
								window.location.href="index.html";
							},1000)
							return false;
							
						}else{
							alert('用户名和密码错误，请重新输入！');
							return false;
						}
						
				      },
					 error:function(XMLHttpRequest, textStatus, errorThrown) {
					       alert(XMLHttpRequest.status);
					       alert(XMLHttpRequest.readyState);
					       alert(textStatus);
								}
			})
			}
			})
				
			})
