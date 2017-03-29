
$(function(){
	
	$("#btn").click(function(){
		
		var  phone = $("#number").val();    	/*获取用户的手机号码*/
		var  username = $("#name").val();		/*获取用户的输入的用户名*/
		var  password = $("#password").val();	/*获取用户输入的密码*/
		var  password_confirm =$("#password_confirm").val();		/*再次输入的密码*/
			 if(phone == "" || username == "" || password == "" || password_confirm == ""){
	 		alert("请填写完整的信息！");
	 		return
	 		}
			 if(password == password_confirm){
			 	/*调注册接口*/
	 	$.ajax({
					contentType:"application/json",
					type:"get",
					url:"http://120.27.95.22/CloudHome/index.php/Home/show/user_reg?", 
					data:{ user_name:username,
						    user_pwd:password,
						    check_pwd:password_confirm,
							phone:phone
						},
					dataType:"json",
//					jsonp:"callback",
//					jsonpCallback:"$jsoncallback",
					cache:"false",
					async:true, 
//					beforeSend: function () {
//							alert("正在处理请求，请稍后。。。。。");
//							}, 
					success: function (data){
//						alert(JSON.stringify(data))
						if(data.success=="1"){
							alert('注册成功！');
							setTimeout(function(){
								window.location.href="login.html";
							},1000)
							
							
						}else{
							alert('用户名已经存在，请重新注册！')
						}
						
				      },
					 error:function(XMLHttpRequest, textStatus, errorThrown) {
					       alert(XMLHttpRequest.status);
					       alert(XMLHttpRequest.readyState);
					       alert(textStatus);
								}
			})
			}
			 else{
				alert("两次密码输入不一致！");
			}
			})

			})
