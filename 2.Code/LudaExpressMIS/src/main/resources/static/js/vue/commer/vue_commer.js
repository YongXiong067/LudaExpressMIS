var rol = '';
//自定义顶部导航栏
Vue.component('n-nav-top', {
	data: function () {
		return {

			/**
        	 * 修改密码模态框
        	 */
			pwdModel: {
				oldpwd: '',
				newpwd: '',
				newpwd_: ''
			},
			/**
         	 * 系统消息列表
         	 */
			news: [
				{},
				{},
				{},
			],


		}
	},
	props: ['cancellation', 'user'],
	template: `
	<header class="main-header">
		<!-- Logo -->
		<a href="index.html" class="logo">
			<!-- mini logo for sidebar mini 50x50 pixels -->
			<span class="logo-mini"><i class="fa fa-envelope-o"></i></span>
			<span class="logo-lg">路达快递管理系统</span>
		</a>

		<!-- 顶部导航 -->
		<nav class="navbar navbar-static-top" role="navigation">
			<!-- Sidebar toggle button-->
			<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
				<span class="sr-only">Toggle navigation</span>
			</a>
			<!-- 消息提示栏 -->
			<div class="navbar-custom-menu">
				<ul class="nav navbar-nav">

					<li class="dropdown messages-menu">


					<!-- 系统管理 -->
					<!-- <li class="dropdown tasks-menu ">
						<a href="###" class="dropdown-toggle" data-toggle="dropdown">
							<i class="fa fa-gear"></i>
						</a>
						<ul class="dropdown-menu" style="width: 200px;">
							<li class="header text-center" style="background-color: #B0E0E6;"><b>系统管理</b></li>
							<li>
								<ul class="menu">
									<li>
										<a href="systemManage.html">
											<div class="row">
												<div class="col-md-2">
													<i class="fa fa-gear"></i>
												</div>
												<div class="col-md-10">
													<span>系统设置</span>
												</div>
											</div>
										</a>
									</li>
									<li>
										<a href="fileManage.html">
											<div class="row">
												<div class="col-md-2">
													<i class="fa fa-folder-open"></i>
												</div>
												<div class="col-md-10">
													<span>系统文件</span>
												</div>
											</div>
										</a>
									</li>
									<li>
										<a href="Recycle.html">
											<div class="row">
												<div class="col-md-2">
													<i class="fa  fa-trash"></i>
												</div>
												<div class="col-md-10">
													<span>回收站</span>
												</div>
											</div>
										</a>
									</li>
								</ul>
							</li>
							
						</ul>
					</li> -->

					<!-- 个人中心 -->
					<li class="dropdown user user-menu">
						<!-- 个人中心图标按钮 -->
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<!-- 用户图片显示 -->
							<img :src="user.img_src" class="user-image" alt="User Image">
							<!-- 用户名显示 -->
							<span class="hidden-xs">{{user.username}}</span>
						</a>

						<!-- 个人中心下拉框内容 -->
						<ul class="dropdown-menu">
							<li class="user-header">
								<!-- 用户图片显示 -->
								
								<img :src="user.img_src" class="img-circle" alt="User Image">
								<p>
									账号：{{user.userid}}
									<small>最近登录：{{user.last_logintime}}</small>
								</p>
							</li>
							<!-- Menu Body -->
							<li class="user-body" style="padding:0px; margin:0px;">
								<div class="col-xs-6 text-center" style="padding:0px;">
									<button class="btn btn-block btn-info" data-toggle="modal" data-target="#modelPwd" 
										style="border-radius:0; height: 45px; font-size:15px;" >修改密码</button>
								</div>
								<div class="col-xs-6 text-center" style="padding:0px;">
									<button v-on:click="$emit('cancellation')" class="btn btn-block btn-info" style="border-radius:0; height: 45px; font-size:15px;" >注销登录</button>
								</div>
								
							</li>

							
						</ul>
					</li>

					<!-- 系统设置 -->
					
				</ul>
			</div>
		</nav>
		
	</header>
		`,
});



//自定义左侧导航栏
Vue.component('n-nav-left', {
	data: function () {
		return {
			/**
         	* 账号权限资料
         	*/
			rol: {
				id: 1,
				list: [
					{
						id: 1,
						parent_id: '',
						name: '账号',
						icon_cls: 'fa fa-edit',
						left: 0,
						url: '',
						li: [
							{
								id: 12,
								parent_id: 1,
								name: '用户管理',
								icon_cls: '',
								left: 1,
								url: 'user.html',
							}
						]
					},
					{
						id: 2,
						parent_id: '',
						name: '公司',
						icon_cls: 'fa fa-windows',
						left: 0,
						url: '',
						li: [
							{
								id: 21,
								parent_id: 2,
								name: '企业文化管理',
								icon_cls: '',
								left: 1,
								url: 'companyCulture.html',
							},
							{
								id: 22,
								parent_id: 2,
								name: '公告管理',
								icon_cls: '',
								left: 1,
								url: 'notice.html',
							},
							{
								id: 23,
								parent_id: 2,
								name: '留言板管理',
								icon_cls: '',
								left: 1,
								url: 'leaving.html',
							},
							{
								id: 24,
								parent_id: 2,
								name: '网点管理',
								icon_cls: '',
								left: 1,
								url: 'userAccount.html',
							}
						]
					},
					{
						id: 3,
						parent_id: '',
						name: '快递',
						icon_cls: 'fa fa-suitcase',
						left: 0,
						url: '',
						li: [
							{
								id: 31,
								parent_id: 3,
								name: '订单管理',
								icon_cls: '',
								left: 1,
								url: 'orders.html',
							},
							{
								id: 32,
								parent_id: 3,
								name: '预约寄件',
								icon_cls: '',
								left: 1,
								url: 'appointment.html',
							},
							{
								id: 33,
								parent_id: 3,
								name: '揽件管理',
								icon_cls: '',
								left: 1,
								url: 'ordersLj.html',
							},
							{
								id: 34,
								parent_id: 3,
								name: '仓储发货管理',
								icon_cls: '',
								left: 1,
								url: 'acceptance.html',
							}
						]
					},
					{
						id: 4,
						parent_id: '',
						name: '财务',
						icon_cls: 'fa fa-cny',
						left: 0,
						url: '',
						li: [
							{
								id: 41,
								parent_id: 4,
								name: '财务管理',
								icon_cls: '',
								left: 1,
								url: 'payment.html',
							}
						]
					}
				]
			},
			user_rol: [
				{
					id: 1,
					user_id: 1,
					role: 1,
					role_id: 1
				}
			]

		}
	},
	mounted() {
		axios.get('api/user/getUser')
			.then(
				(res) => {
					if (res.data.userId == 0) {
						window.location.href = "login.html";
					} else {
						if (res.data.rolu == '0') {
							this.rol = {
								id: 1,
								list: [
									{
										id: 1,
										parent_id: '',
										name: '账号',
										icon_cls: 'fa fa-edit',
										left: 0,
										url: '',
										li: [
											{
												id: 12,
												parent_id: 1,
												name: '用户管理',
												icon_cls: '',
												left: 1,
												url: 'user.html',
											}
										]
									},
									{
										id: 2,
										parent_id: '',
										name: '公司',
										icon_cls: 'fa fa-windows',
										left: 0,
										url: '',
										li: [
											{
												id: 21,
												parent_id: 2,
												name: '企业文化管理',
												icon_cls: '',
												left: 1,
												url: 'companyCulture.html',
											},
											{
												id: 22,
												parent_id: 2,
												name: '公告管理',
												icon_cls: '',
												left: 1,
												url: 'notice.html',
											},
											{
												id: 23,
												parent_id: 2,
												name: '留言板管理',
												icon_cls: '',
												left: 1,
												url: 'leaving.html',
											},
											{
												id: 24,
												parent_id: 2,
												name: '网点管理',
												icon_cls: '',
												left: 1,
												url: 'userAccount.html',
											}
										]
									},
									{
										id: 3,
										parent_id: '',
										name: '快递',
										icon_cls: 'fa fa-suitcase',
										left: 0,
										url: '',
										li: [
											{
												id: 31,
												parent_id: 3,
												name: '订单管理',
												icon_cls: '',
												left: 1,
												url: 'orders.html',
											},
											{
												id: 34,
												parent_id: 3,
												name: '仓储发货管理',
												icon_cls: '',
												left: 1,
												url: 'acceptance.html',
											}
										]
									},
									{
										id: 4,
										parent_id: '',
										name: '财务',
										icon_cls: 'fa fa-cny',
										left: 0,
										url: '',
										li: [
											{
												id: 41,
												parent_id: 4,
												name: '财务管理',
												icon_cls: '',
												left: 1,
												url: 'payment.html',
											}
										]
									}
								]
							}
						} else if (res.data.rolu == '1') {
							this.rol = {
								id: 1,
								list: [

									{
										id: 2,
										parent_id: '',
										name: '公司',
										icon_cls: 'fa fa-windows',
										left: 0,
										url: '',
										li: [
											{
												id: 21,
												parent_id: 2,
												name: '企业文化',
												icon_cls: '',
												left: 1,
												url: 'companyCulture_.html',
											},
											{
												id: 22,
												parent_id: 2,
												name: '信息公告',
												icon_cls: '',
												left: 1,
												url: 'notice_.html',
											},
											{
												id: 23,
												parent_id: 2,
												name: '留言板',
												icon_cls: '',
												left: 1,
												url: 'leaving.html',
											}
										]
									},
									{
										id: 3,
										parent_id: '',
										name: '快递',
										icon_cls: 'fa fa-suitcase',
										left: 0,
										url: '',
										li: [
											{
												id: 31,
												parent_id: 3,
												name: '订单查询',
												icon_cls: '',
												left: 1,
												url: 'orderSearch.html',
											},
											{
												id: 32,
												parent_id: 3,
												name: '预约寄件',
												icon_cls: '',
												left: 1,
												url: 'appointment.html',
											}
										]
									}
								]	
							}
						} else {
							this.rol = {
								id: 1,
								list: [
									
									{
										id: 3,
										parent_id: '',
										name: '快递',
										icon_cls: 'fa fa-suitcase',
										left: 0,
										url: '',
										li: [
											{
												id: 31,
												parent_id: 3,
												name: '订单管理',
												icon_cls: '',
												left: 1,
												url: 'orders.html',
											},
											{
												id: 33,
												parent_id: 3,
												name: '揽件管理',
												icon_cls: '',
												left: 1,
												url: 'ordersLj.html',
											}
										]
									}
								]
							}
						}
					}
				}
			)
			.catch(
				(error) => { console.log(error); }
			);
	},
	props: ['user', 'page'],
	template: `
	<aside class="main-sidebar">
		<section class="sidebar">

			<!-- 左侧用户资料显示 -->
			<div class="user-panel">
				<div class="pull-left image">
					<!-- 用户图片显示 -->
					<img :src="user.img_src" class="img-circle" alt="User Image">
				</div>
				<div class="pull-left info">
					<!-- 用户名显示 -->
					<p>{{user.username}}</p>
					<a href="#"><i class="fa fa-circle text-success"></i> 在线</a>
				</div>
			</div>

			<!-- 左侧导航栏目 -->
			<ul class="sidebar-menu">
				<li class="header">EXPRESS-MIS</li>
				<li class="active" v-if="page.title == 'HOME'">
					<a href="index.html"><i class="fa fa-home"></i> <span>首页</span></a>
				</li>
				<li v-else>
					<a href="index.html"><i class="fa fa-home"></i> <span>首页</span></a>
				</li>
				
				<li class="treeview active" v-for="(item, i) in rol.list"  v-if="page.parent_id == item.id">
					
					<a href="javaScript:void(0);">
						<i :class="item.icon_cls"></i> <span>{{item.name}}</span>
						<i class="fa fa-angle-left pull-right"></i>
					</a>
					<ul class="treeview-menu">
						<li class="active" v-for="l in item.li" v-if="page.id == l.id"><a :href="l.url">{{l.name}}</a></li>
						<li v-else><a :href="l.url">{{l.name}}</a></li>
					</ul>
				</li>
				<li class="treeview" v-else>
					<a href="javaScript:void(0);">
						<i :class="item.icon_cls"></i> <span>{{item.name}}</span>
						<i class="fa fa-angle-left pull-right"></i>
					</a>
					<ul class="treeview-menu">
						<li v-for="l in item.li"><a :href="l.url">{{l.name}}</a></li>
					</ul>
				</li>

			</ul><!-- /.sidebar-menu -->
		</section>
		<!-- /.sidebar -->
	</aside>
		`,
});


//自定义内容页面标题栏
Vue.component('n-page-nav', {
	props: ['page'],
	template: `
	<!-- 内容页面标题栏导航 -->
	<section class="content-header">
		<h1>
			{{page.title}}
			<small>{{page.text}}</small>
		</h1>
		<ol class="breadcrumb">
			<small>当前位置：</small>
			<li v-for="(item, index) in page.position">
				<a :href="item.url"><i :class="item.img"></i> <b>{{item.name}}</b></a>
			</li>
		</ol>
	</section>
		`,
});

//自定义底部导航栏
Vue.component('n-nav-footer', {
	props: [],
	template: `
	<footer class="main-footer">
		<!-- To the right -->
		<div class="pull-right hidden-xs" >
			版权所有 © 2019-2019 <a href="http://www.hnjzt.net/" target="block">XXXX有限公司</a>
		</div>
		<!-- Default to the left -->
		<span></span>
	</footer>

		`,
});

//自定义回到顶部
Vue.component('n-nav-gotop', {
	data: function () {
		return {

		}
	},
	template: `
	<div id="go_up" class="navbar-fixed-bottom"
			style="bottom: 20px; left: 10px; position: fixed; opacity: 0;">
		<a href="#"> <img src="images/go_up.png" width="54" height="54">
		</a>
	</div>
		`,
});

//自定义横向柱状卡片
Vue.component('n-card-xbox', {
	props: ['data'],
	template: `
	<div class="col-md-6 col-xs-12">
		<div class="box box-info">
			<div class="box-header with-border">
				<h3 class="box-title">{{data.title}} </h3>
				<div class="box-tools pull-right">
					<div class="btn-group">
						<button class="btn btn-box-tool" data-toggle="dropdown"><i
								class="fa fa-bars"></i></button>
						<ul class="dropdown-menu pull-right" role="menu">
							<li><a href="javascript:void(0);" v-on:click="$emit('canv_change', 1)">竖向显示</a></li>
							<li><a href="javascript:void(0);" v-on:click="$emit('canv_change', 2)">横向显示</a></li>
						</ul>
					</div>
					<button class="btn btn-box-tool" data-widget="collapse"><i
							class="fa fa-minus"></i></button>
					<button class="btn btn-box-tool" data-widget="remove"><i
							class="fa fa-times"></i></button>
				</div>
			</div>
			<div class="box-body" style="padding-top: 20px; padding-bottom: 25px;">
				<a :href="item.url" :title="item.year+data.x+':'+item.num" v-for="(item, index) in data.arr">
					<div class="row" style="text-align: center; padding-top: 5px; padding-bottom: 5px;">
						<div class="col-md-2 col-xs-2"><b>{{item.year}}{{data.x}}</b></div>
						<div class="col-md-8 col-xs-8">
							<div class="progress">
								<div class="progress-bar progress-bar-aqua" role="progressbar"
									aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"
									:style="'width: '+item.width+'%;'">
									<span class="sr-only"></span>
								</div>
							</div>
						</div>
						<div class="col-md-2 col-xs-2"><b> {{item.num}} {{data.y}}</b></div>
					</div>
				</a>
			</div>
		</div>
	</div>
		`,
});


//自定义竖向柱状卡片
Vue.component('n-card-ybox', {
	props: ['data'],
	template: `
	<div class="col-md-6 col-xs-12">
		<div class="box box-warning">
			<div class="box-header with-border">
				<h3 class="box-title">{{data.title}} </h3>
				<div class="box-tools pull-right">
					<div class="btn-group">
						<button class="btn btn-box-tool" data-toggle="dropdown"><i
								class="fa fa-bars"></i></button>
						<ul class="dropdown-menu pull-right" role="menu">
							<li><a href="javascript:void(0);" v-on:click="$emit('canv_change', 1)">竖向显示</a></li>
							<li><a href="javascript:void(0);" v-on:click="$emit('canv_change', 2)">横向显示</a></li>
						</ul>
					</div>
					<button class="btn btn-box-tool" data-widget="collapse"><i
							class="fa fa-minus"></i></button>
					<button class="btn btn-box-tool" data-widget="remove"><i
							class="fa fa-times"></i></button>
				</div>
			</div>
			<div class="box-body text-center">
				<div class="row">
					<div class="col-md-1 col-xs-1"></div>
					<a :href="item.url" :title="item.year+data.x+':'+item.num" v-for="(item, index) in data.arr">
						<div class="col-md-2 col-xs-2">
							<div
								style="margin:5px; padding-left: -5px; width: 50px; text-align: center;">
								<b>{{item.num}} {{data.y}} &nbsp;&nbsp;</b>
							</div>
							<div class="progress vertical" style="width: 25px;">
								<div class="progress-bar progress-bar-aqua" role="progressbar"
									aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
									:style="'height: '+item.width+'%;'">
									<span class="sr-only">40%</span>
								</div>
							</div>
							<div>
								<b>{{item.year}}{{data.x}}</b>
							</div>
						</div>
					</a>
					<div class="col-md-1 col-xs-1"></div>
				</div>
			</div>
		</div>
	</div>
		`,
});


//自定义顶部密码模态框
Vue.component('n-nav-pwdmodel', {
	props: ['user', 'model'],
	template: `
	<!-- 添加模态框 -->
	<div class="modal fade" id="modelPwd" tabindex="-1" role="dialog" aria-labelledby="modelPwdTit"
		aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="modelPwdTit">修改密码 <i class="fa fa-cog"></i></h4>
				</div>
				<div class="modal-body">
					<div class="form-group ">
						<div class="row">
							<div class="col-md-1"></div>
							<div class="col-md-10">
								<div class="input-group">
									<span class="input-group-addon">账号</span>
									<input type="text" :value="user.userid" class="form-control" placeholder="请填写该字段" disabled>
								</div>
							</div>
							<div class="col-md-1"></div>
						</div>
					</div>
					<div class="form-group">
						<div class="row">
							<div class="col-md-1"></div>
							<div class="col-md-10">
								<div class="input-group">
									<span class="input-group-addon">原密码</span>
									<input type="password" v-model="model.oldpwd" class="form-control" placeholder="请填写该字段" required>
								</div>
							</div>
							<div class="col-md-1"></div>
						</div>
					</div>
					<div class="form-group">
						<div class="row">
							<div class="col-md-1"></div>
							<div class="col-md-10">
								<div class="input-group">
									<span class="input-group-addon">新密码</span>
									<input type="password" v-model="model.newpwd" class="form-control" placeholder="请填写该字段" required>
								</div>
							</div>
							<div class="col-md-1"></div>
						</div>
					</div>
					<div class="form-group">
						<div class="row">
							<div class="col-md-1"></div>
							<div class="col-md-10">
								<div class="input-group">
									<span class="input-group-addon">再次确认密码</span>
									<input type="password" v-model="model.newpwd_" class="form-control" placeholder="请填写该字段" required>
								</div>
							</div>
							<div class="col-md-1"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
					<button type="button" v-on:click="$emit('updatepwd')" class="btn btn-primary" data-dismiss="modal">确认</button>
				</div>
			</div>
		</div>
	</div>
		`,
});


//自定义项目详情右侧内容页面
Vue.component('n-content-project', {
	props: ['return', 'list', 'project', 'modelht', 'htlist', 'listdata'],
	template: `
	<div class="row">
		<div class="col-xs-12">
			<div class="box">
				<div class="box-header">
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-flat bg-purple" v-on:click="$emit('return')"> 返回列表 </button>
						</div>

					</div>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<div class="box box-widget widget-user">
								<div class="widget-user-header bg-aqua-active" style="height: 100%;">
									<h3 class="widget-user-username">{{project.p_name}} &nbsp; <!--<a href="#"
										 title="修改" data-toggle="modal"
											data-target="#modelUpdatePro"><i class="fa fa-edit"></i></a>-->
									</h3>
									<div class="row py-2" style=" background-color: #f1f4f8cc;">
										<div class="col-md-4 col-xs-6">
											<h5 class="widget-user-desc">
											<b><p>项目状态：{{project.p_tagle}}</p></b>
											</h5>
											<h5 class="widget-user-desc"><p>归属处室：{{project.position}}</p></h5>
											<h5 class="widget-user-desc" style="color:#00a65a;">
												<p>申报金额：{{project.declare_money}}<i class="fa fa-cny"></i></p>
											</h5>
											
											<h5 class="widget-user-desc"><p>入库时间：{{project.warehousing_time}}</p></h5>
											<h5 class="widget-user-desc">
												<p>入库资料：
													<a :href="'api/v2/db/dowlond?fileurl='+project.warehousing_fileUrl"
													target="_blank" title="点击下载文件">
														<i class="fa fa-paperclip"></i> &nbsp; {{project.warehousing_fileName}}
													</a>
												</p>
											</h5>
											<h5 class="widget-user-desc" style="color:#dd4b39;">
												<p>审核金额：{{project.examine_money}}<i class="fa fa-cny"></i></p>
											</h5>
											<h5 class="widget-user-desc">
												<p>立项时间：{{project.approval_time}}</p>
											</h5>
											
											<h5 class="widget-user-desc">
												<p>立项资料： 
													
													<a :href="'api/v2/db/dowlond?fileurl='+project.approval_fileUrl"
													target="_blank" title="点击下载文件">
														<i class="fa fa-paperclip"></i> &nbsp; {{project.approval_fileName}}
													</a>
												</p>
												
											</h5>
											<h5 class="widget-user-desc"><p>统筹类型：<b>{{project.overall_type}}</b></p></h5>
											<h5 class="widget-user-desc">
												<p>市州人防办(中标单位)：{{project.contractor}}</p>
											</h5>
										</div>
										<div class="col-md-4 col-xs-6">
											
											
											<h5 class="widget-user-desc">
												<p>中标金额：{{project.bid_money}}<i class="fa fa-cny"></i></p>
											</h5>
											<h5 class="widget-user-desc">
												<p>中标时间：{{project.bid_time}}</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>中标资料：
													
													<a :href="'api/v2/db/dowlond?fileurl='+project.bid_fileUrl"
													target="_blank" title="点击下载文件">
														<i class="fa fa-paperclip"></i> &nbsp; {{project.bid_fileName}}
													</a>
												</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>预验收初步意见：{{project.acceBefore_opinion}}</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>预验收时间：{{project.acceBefore_time}}</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>预验收资料：
													
													<a :href="'api/v2/db/dowlond?fileurl='+project.acceBefore_fileUrl"
													target="_blank" title="点击下载文件">
														<i class="fa fa-paperclip"></i> &nbsp; {{project.acceBefore_fileName}}
													</a>
												</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>是否同意验收：
													<b class="color-success" v-if="project.is_acceBefore == 1">同意</b>
													<b class="color-danger" v-else>不同意</b>
												</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>验收时间：{{project.acce_time}}</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>用户方意见：{{project.acce_user_opinion}}</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>建设方意见：{{project.acce_build_opinion}}</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>组织方意见：{{project.acce_organ_opinion}}</p>
											</h5>
											
										</div>
										<div class="col-md-4 col-xs-6">
											<h5 class="widget-user-desc">
												<p>验收报告资料：
													<a :href="'api/v2/db/dowlond?fileurl='+project.acceBefore_fileUrl"
													target="_blank" title="点击下载文件">
														<i class="fa fa-paperclip"></i> &nbsp; {{project.acceBefore_fileName}}
													</a>
												</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>验收结论：
													<b class="color-success" v-if="project.acce_result == 1">通过验收</b>
													<b class="color-danger" v-else>不通过验收</b>
												</p>
											</h5>
											
											<h5 class="widget-user-desc">
												<p class="color-success">应付款：{{project.payable_money}}<i class="fa fa-cny"></i></p>
											</h5>
											<h5 class="widget-user-desc">
												<p class="color-danger">已付款：{{project.payment_money}}<i class="fa fa-cny"></i></p>
											</h5>
											<h5 class="widget-user-desc">
												<p>项目付款状态：{{project.planning_type}}</p>
											</h5>
											<h5 class="widget-user-desc">
												<p><b>付款进度：{{project.progress}}%</b></p>
											</h5>
											<h5 class="widget-user-desc">
												<p>付款约定信息：{{project.payment_agreement}}</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>补进付款信息：{{project.supplementary_Payment}}</p>
											</h5>
											<h5 class="widget-user-desc">
												<p>付款附件：
													<a :href="'api/v2/db/dowlond?fileurl='+project.payment_fileUrl"
													target="_blank" title="点击下载文件">
														<i class="fa fa-paperclip"></i> &nbsp; {{project.payment_fileName}}
													</a>
												</p>
											</h5>
										</div>
									</div>

								</div>
								
									<div class="row">
										<!-- 选项卡 -->
										<div class="col-md-12">
											<div class="nav-tabs-custom" style="background-color:rgba(211, 211, 211, 0.322);">
												<ul class="nav nav-tabs">
													<li class="active"><a href="#l1" data-toggle="tab">呈批件</a></li>
													<li><a href="#l2" data-toggle="tab">指标</a></li>
													<li><a href="#l3" data-toggle="tab">合同</a></li>
													<li><a href="#l4" data-toggle="tab">督办情况</a></li>
													<li><a href="#l5" data-toggle="tab">付款记录</a></li>
													<li><a href="#l6" data-toggle="tab">市州人防办</a></li>
												</ul>
												<div class="tab-content">

													<!-- 呈批件 -->
													<div class="active tab-pane" id="l1">
														<div class="box-footer" >
															<div class="col-md-12">
																<div class="row">
																	<div class="col-md-2">
																		<h4 class="box-title">相关呈批件</h4>
																	</div>
																	<div class="col-md-4">
																		<div class="row">
																			<div class="col-md-6 col-xs-12 p-0">
																				<div class="btn-group">
																					
																					<!--<a href="javascript:;" title="关联呈批件" data-toggle="modal" v-on:click="$emit('projectht', project)"
																						data-target="#modelHT">
																						<button class="btn btn-default btn-sm" style="padding: 5px 8px 5px 8px;">
																							<i class="fa fa-exchange"></i>
																						</button>
																					</a>-->
																					<a href="javaScript:void(0);" v-on:click="$emit('refresh')" title="刷新">
																						<button class="btn btn-default btn-sm">
																							<i class="fa fa-refresh"></i>
																						</button>
																					</a>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div class="col-md-4"></div>
																</div>
																<table class="table table-hover">
																	<thead>
																		<tr>
																			<th scope="col">ID</th>
																			<th scope="col">呈批件名称</th>
																			<th scope="col">申请时间</th>
																			<th scope="col">申请资料</th>
																			<th scope="col">备注</th>
																			<th scope="col">操作</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(item, index) in listdata.submitList" >
																			<th scope="row">{{item.sub_id}}</th>
																			<td>{{item.sub_name}}</td>
																			<td>{{item.sub_time}}</td>
																			<td>
																				
																				<a :href="'api/v2/db/dowlond?fileurl='+item.sub_fileUrl"
																				target="_blank" title="点击下载文件">
																					<i class="fa fa-paperclip"></i> &nbsp; {{item.sub_fileName}}
																				</a>
																			</td>
																			<td>{{item.remarks}}</td>
																			<td></td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>

													<!-- 指标 -->
													<div class="tab-pane" id="l2">
														<div class="box-footer" >
															<div class="col-md-12">
																<div class="row">
																	<div class="col-md-2">
																		<h4 class="box-title">相关指标</h4>
																	</div>
																	<div class="col-md-4">
																		<div class="row">
																			<div class="col-md-6 col-xs-12 p-0">
																				<div class="btn-group">
																					
																					<!--<a href="javascript:;" title="关联指标" data-toggle="modal" v-on:click="$emit('projectht', project)"
																						data-target="#modelHT">
																						<button class="btn btn-default btn-sm" style="padding: 5px 8px 5px 8px;">
																							<i class="fa fa-exchange"></i>
																						</button>
																					</a>-->
																					<a href="javaScript:void(0);" v-on:click="$emit('refresh')" title="刷新">
																						<button class="btn btn-default btn-sm">
																							<i class="fa fa-refresh"></i>
																						</button>
																					</a>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div class="col-md-4"></div>
																</div>
																<table class="table table-hover">
																	<thead>
																		<tr>
																			<th scope="col">ID</th>
																			<th scope="col">指标名称</th>
																			<th scope="col">指标来源</th>
																			<th scope="col">支出功能科目</th>
																			<th scope="col">支出经济科目</th>
																			<th scope="col">指标说明</th>
																			<th scope="col">指标金额</th>
																			<th scope="col">应下达时间</th>
																			<th scope="col">实际下达时间</th>
																			<th scope="col">操作</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(item, index) in listdata.signList" >
																			<th scope="row">{{item.sign_id}}</th>
																			<td>{{item.sign_name}}</td>
																			<td>{{item.sign_from}}</td>
																			<td>{{item.functional_subjects}}</td>
																			<td>{{item.economic_subjects}}</td>
																			<td>{{item.remarks}}</td>
																			<td style="color: green;">{{item.sign_money}} <i class="fa fa-cny"></td>
																			<td>{{item.delivery_time}}</td>
																			<td>{{item.actual_delivery_time}}</td>
																			<td></td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>

													<!-- 合同 -->
													<div class="tab-pane" id="l3">
														<div class="box-footer" >
															<div class="col-md-12">
																<div class="row">
																	<div class="col-md-2">
																		<h4 class="box-title">相关合同</h4>
																	</div>
																	<div class="col-md-4">
																		<div class="row">
																			<div class="col-md-6 col-xs-12 p-0">
																				<div class="btn-group">
																					
																					<!--<a href="javascript:;" title="关联合同" data-toggle="modal" v-on:click="$emit('projectht', project)"
																						data-target="#modelHT">
																						<button class="btn btn-default btn-sm" style="padding: 5px 8px 5px 8px;">
																							<i class="fa fa-exchange"></i>
																						</button>
																					</a>-->
																					<a href="javaScript:void(0);" v-on:click="$emit('refresh')" title="刷新">
																						<button class="btn btn-default btn-sm">
																							<i class="fa fa-refresh"></i>
																						</button>
																					</a>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div class="col-md-4"></div>
																</div>
																<table class="table table-hover">
																	<thead>
																		<tr>
																			<th scope="col">ID</th>
																			<th scope="col">名称</th>
																			<th scope="col">签订机构</th>
																			<th scope="col">合同金额</th>
																			<th scope="col">签订日期</th>
																			<th scope="col">合同年限</th>
																			<th scope="col">合同资料</th>
																			<th scope="col">合同状态</th>
																			<th scope="col">操作</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(item, index) in listdata.htList" >
																			<th scope="row">{{item.c_id}}</th>
																			<td>{{item.c_name}}</td>
																			<td>{{item.position}}</td>
																			<td>{{item.signed_money}} <i class="fa fa-cny"></td>
																			<td>{{item.signed_time}}</td>
																			<td>{{item.years}} 年</td>
																			<td>
																				<a :href="'api/v2/db/dowlond?fileurl='+item.fileUrl"
																				target="_blank" title="点击下载文件">
																					<i class="fa fa-paperclip"></i> &nbsp; {{item.fileName}}
																				</a>
																			</td>
																			<td v-if="item.tagle == '1'" style="color: green;">正常</td>
																			<td v-if="item.tagle == '0'" style="color: red;">终止</td>
																			<td></td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>

													<!-- 项目督办 -->
													<div class="tab-pane" id="l4">
														<div class="box-footer" >
															<div class="col-md-12">
																<div class="row">
																	<div class="col-md-2">
																		<h4 class="box-title">相关督办情况</h4>
																	</div>
																	<div class="col-md-4">
																		<div class="row">
																			<div class="col-md-6 col-xs-12 p-0">
																				<div class="btn-group">
																					
																					<!--<a href="javascript:;" title="关联呈批件" data-toggle="modal" v-on:click="$emit('projectht', project)"
																						data-target="#modelHT">
																						<button class="btn btn-default btn-sm" style="padding: 5px 8px 5px 8px;">
																							<i class="fa fa-plus"></i>
																						</button>
																					</a>-->
																					<a href="javaScript:void(0);" v-on:click="$emit('refresh')" title="刷新">
																						<button class="btn btn-default btn-sm">
																							<i class="fa fa-refresh"></i>
																						</button>
																					</a>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div class="col-md-4"></div>
																</div>
																<table class="table table-hover">
																	<thead>
																		<tr>
																			<th scope="col">ID</th>
																			<th scope="col">督办人</th>
																			<th scope="col">督办内容</th>
																			<th scope="col">督办时间</th>
																			<th scope="col">项目进度情况</th>
																			<th scope="col">反馈人</th>
																			<th scope="col">反馈内容</th>
																			<th scope="col">操作</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(item, index) in listdata.superviseList" >
																			<th scope="row">{{item.id}}</th>
																			<td>{{item.sup_person}}</td>
																			<td>{{item.sup_text}}</td>
																			<td>{{item.sup_time}}</td>
																			<td>{{item.project_situation}}</td>
																			<td>{{item.feedback_person}}</td>
																			<td>{{item.feedback_text}}</td>
																			<td></td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>

													<!-- 付款记录 -->
													<div class="tab-pane" id="l5">
														<div class="box-footer" >
															<div class="col-md-12">
																<div class="row">
																	<div class="col-md-2">
																		<h4 class="box-title">付款情况</h4>
																	</div>
																	<div class="col-md-4">
																		<div class="row">
																			<div class="col-md-6 col-xs-12 p-0">
																				<div class="btn-group">
																					
																					<!--<a href="javascript:;" title="关联呈批件" data-toggle="modal" v-on:click="$emit('projectht', project)"
																						data-target="#modelHT">
																						<button class="btn btn-default btn-sm" style="padding: 5px 8px 5px 8px;">
																							<i class="fa fa-plus"></i>
																						</button>
																					</a>-->
																					<a href="javaScript:void(0);" v-on:click="$emit('refresh')" title="刷新">
																						<button class="btn btn-default btn-sm">
																							<i class="fa fa-refresh"></i>
																						</button>
																					</a>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div class="col-md-4"></div>
																</div>
																<table class="table table-hover">
																	<thead>
																		<tr>
																			<th scope="col">ID</th>
																			<th scope="col">付款批次</th>
																			<th scope="col">付款金额</th>
																			<th scope="col">付款说明</th>
																			<th scope="col">付款日期</th>
																			<th scope="col">合同名称</th>
																			<th scope="col">当前已付金额</th>
																			<th scope="col">付款资料</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(item, index) in listdata.paymentList" >
																			<th scope="row">{{item.pay_id}}</th>
																			<td>{{item.batch}}</td>
																			<td>{{item.pay_money}} <i class="fa fa-cny"></td>
																			<td>{{item.pay_explain}}</td>
																			<td>{{item.pay_time}}</td>
																			<td>{{item.c_id.c_name}}</td>
																			<td>{{item.p_money}} <i class="fa fa-cny"></td>
																			<td>
																				<a :href="'api/v2/db/dowlond?fileurl='+item.pay_fileUrl"
																				target="_blank" title="点击下载文件">
																					<i class="fa fa-paperclip"></i> &nbsp; {{item.pay_fileName}}
																				</a>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>

													<!-- 市州人防办 -->
													<div class="tab-pane" id="l6">
														<div class="box-footer" >
															<div class="col-md-12">
																<div class="row">
																	<div class="col-md-2">
																		<h4 class="box-title">市州人防办账号</h4>
																	</div>
																	<div class="col-md-4">
																		<div class="row">
																			<div class="col-md-6 col-xs-12 p-0">
																				<div class="btn-group">
																					
																					<!--<a href="javascript:;" title="关联账号" data-toggle="modal" v-on:click="$emit('projectht', project)"
																						data-target="#modelHT">
																						<button class="btn btn-default btn-sm" style="padding: 5px 8px 5px 8px;">
																							<i class="fa fa-plus"></i>
																						</button>
																					</a>-->
																					<a href="javaScript:void(0);" v-on:click="$emit('refresh')" title="刷新">
																						<button class="btn btn-default btn-sm">
																							<i class="fa fa-refresh"></i>
																						</button>
																					</a>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div class="col-md-4"></div>
																</div>
																<table class="table table-hover">
																	<thead>
																		<tr>
																			<th scope="col">ID</th>
																			<th scope="col">用户名</th>
																			<th scope="col">姓名</th>
																			<th scope="col">所在公司</th>
																			<th scope="col">职务</th>
																			<th scope="col">联系方式</th>
																			<th scope="col">邮箱</th>
																			<th scope="col">备注</th>
																			<th scope="col">操作</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(item, index) in listdata.supplierList" >
																			<th scope="row">{{item.id}}</th>
																			<td>{{item.username}}</td>
																			<td>{{item.name}}</td>
																			<td>{{item.sup_id.sup_name}}</td>
																			<td>{{item.post}}</td>
																			<td>{{item.phone}}</td>
																			<td>{{item.email}}</td>
																			<td>{{item.remarks}}</td>
																			<td></td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										

									</div>
								


							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 关联合同模态框 -->
			<div class="modal fade" id="modelHT" tabindex="-1" role="dialog"
				aria-labelledby="modelHTTit" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="modelHTTit">关联合同 <i class="fa fa-plus"></i>
							</h4>
						</div>
						<div class="modal-body">
							<div class="form-group ">
								<div class="row">
									<div class="col-md-1"></div>
									<div class="col-md-10">
										<div class="input-group">
											<span class="input-group-addon">项目名称</span>
											<input type="text" class="form-control"
												:value="project.p_name" placeholder="请填写该字段" disabled>
										</div>
									</div>
									<div class="col-md-1"></div>
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-md-1"></div>
									<div class="col-md-10">
										<div class="input-group">
											<span class="input-group-addon">选择合同</span>
											<select class="form-control" v-model="modelht.c_id">
												<option selected="selected" value="0">---选择合同---
												</option>
												<option v-for="item in htlist" :value="item.c_id">{{item.c_name}}</option>
												
											</select>
										</div>
									</div>
									<div class="col-md-1"></div>
								</div>
							</div>
							
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="$emit('projecthtsumbit')"
								>提交</button>
						</div>
					</div>
				</div>
			</div>

			<!-- 修改项目模态框 -->
			<div class="modal fade" id="modelUpdatePro" tabindex="-1" role="dialog"
				aria-labelledby="modelProTit" aria-hidden="true">
				<div class="modal-dialog" role="document" style="width: 85%;">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="modelProTit">修改项目 <i class="fa fa-edit"></i>
							</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">项目名称</span>
													<input type="text" class="form-control"
														:value="project.p_name" placeholder="请填写该字段">
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-12">
												<div class="input-group">
													<span class="input-group-addon">市州人防办</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">是否同意验收</span>
													<select class="form-control">
														<option selected="selected" value="0">---归属处室---
														</option>
														<option v-for="item in list" :value="item.id">{{item.name}}</option>
													</select>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">项目状态</span>
													<input type="text" class="form-control"
														:value="project.p_name" placeholder="请填写该字段">
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-12">
												<div class="input-group">
													<span class="input-group-addon">负责人</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">验收结论</span>
													<select class="form-control">
														<option selected="selected" value="0">---归属处室---
														</option>
														<option v-for="item in list" :value="item.id">{{item.name}}</option>
													</select>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">归属处室</span>
													<select class="form-control">
														<option selected="selected" value="0">---归属处室---
														</option>
														<option v-for="item in list" :value="item.id">{{item.name}}</option>
													</select>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-12">
												<div class="input-group">
													<span class="input-group-addon">中标金额</span>
													<input type="text" class="form-control"
														:value="project.bid_money" placeholder="请填写该字段">
													<span class="input-group-addon"><i class="fa fa-cny"></i></span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">应付款</span>
													<input type="text" class="form-control"
														:value="project.payable_money" placeholder="请填写该字段">
													<span class="input-group-addon"><i class="fa fa-cny"></i></span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">申报金额</span>
													<input type="text" class="form-control"
														:value="project.declare_money" placeholder="请填写该字段">
													<span class="input-group-addon"><i class="fa fa-cny"></i></span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-12">
												<div class="input-group">
													<span class="input-group-addon">中标时间</span>
													<input type="datetime-local"
                                                        v-model="project.bid_time" class="form-control" />
                                                    <span class="input-group-addon">
														<i class="fa fa-calendar"></i>
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
												<span class="input-group-addon">已付款</span>
												<input type="text" class="form-control"
													:value="project.payment_money" placeholder="请填写该字段">
												<span class="input-group-addon"><i class="fa fa-cny"></i></span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">入库时间</span>
													<input type="datetime-local"
                                                        v-model="project.warehousing_time" class="form-control" />
                                                    <span class="input-group-addon">
														<i class="fa fa-calendar"></i>
													</span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-12">
												<div class="input-group">
													<span class="input-group-addon">市州人防办</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">归属处室</span>
													<select class="form-control">
														<option selected="selected" value="0">---归属处室---
														</option>
														<option v-for="item in list" :value="item.id">{{item.name}}</option>
													</select>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">审核金额</span>
													<input type="text" class="form-control"
														:value="project.examine_money" placeholder="请填写该字段">
													<span class="input-group-addon"><i class="fa fa-cny"></i></span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-12">
												<div class="input-group">
													<span class="input-group-addon">中标时间</span>
													<input type="datetime-local"
														v-model="project.bid_time" class="form-control" />
													<span class="input-group-addon">
														<i class="fa fa-calendar"></i>
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
												<span class="input-group-addon">已付款</span>
												<input type="text" class="form-control"
													:value="project.payment_money" placeholder="请填写该字段">
												<span class="input-group-addon"><i class="fa fa-cny"></i></span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">立项时间</span>
													<input type="datetime-local"
                                                        v-model="project.approval_time" class="form-control" />
                                                    <span class="input-group-addon">
														<i class="fa fa-calendar"></i>
													</span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-12">
												<div class="input-group">
													<span class="input-group-addon">市州人防办</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-4 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">归属处室</span>
													<select class="form-control">
														<option selected="selected" value="0">---归属处室---
														</option>
														<option v-for="item in list" :value="item.id">{{item.name}}</option>
													</select>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>
							
							
							
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal"
								>提交</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
		`,
});


//自定义合同详情右侧内容页面
Vue.component('n-content-contract', {
	props: ['return', 'list', 'project', 'modelht', 'prolist'],
	template: `
	<div class="row">
		<div class="col-xs-12">
			<div class="box">
				<div class="box-header">
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-flat bg-purple" v-on:click="$emit('return')"> 返回列表 </button>
						</div>

					</div>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<div class="box box-widget widget-user ">
								<div class="widget-user-header bg-aqua-active" style="height: 100%;">
									<h3 class="widget-user-username">{{project.c_name}} &nbsp; <!--<a href="#"
											 title="修改" data-toggle="modal"
											data-target="#modelUpdatePro"><i class="fa fa-edit"></i></a>-->
									</h3>
									<div class="row">
										<div class="col-md-4 col-xs-6">
											<h5 class="widget-user-desc"><b><p>采购编号：{{project.c_no}}</p></b></h5>
											<!--<h5 class="widget-user-desc"><p>归属处室：{{project.position}}</p></h5>-->
											<h5 class="widget-user-desc"><p class="color-success">签订金额：{{project.signed_money}} <i class="fa fa-cny"></i></p></h5>
											<h5 class="widget-user-desc"><p class="color-danger">已付款金额：{{project.payment_money}} <i class="fa fa-cny"></i></p></h5>
											<h5 class="widget-user-desc"><p>付款方式：</p></h5>
											<h5 class="widget-user-desc pl-2" v-for="(item, i) in project.paylist">
												<p>{{i+1}}. {{item.name}} ---> {{item.per*100}} %  
													<b v-if="project.mode > i"> --->已付款</b>
													<b v-else> --->未付款</b>
												</p>
											</h5>
										</div>
										<div class="col-md-4 col-xs-6">
											<h5 class="widget-user-desc"><p>签订机构：{{project.supplier}}</p></h5>
											<h5 class="widget-user-desc"><p>负责人：{{project.person}}</h5>
											<h5 class="widget-user-desc"><p>联系方式：{{project.phone}}</h5>
											<h5 class="widget-user-desc"><p>签订时间：{{project.signed_time}}</p></h5>
											<h5 class="widget-user-desc"><p>合同年限：{{project.years}} 年</h5>
											
										</div>

										<div class="col-md-4 col-xs-6">

											<h5 class="widget-user-desc">
												<p>合同资料：
													<a :href="'api/v2/db/dowlond?fileurl='+project.fileUrl" target="_blank" title="点击下载文件">
														<i class="fa fa-paperclip"></i> &nbsp;{{project.fileName}}
													</a>
												</p>
											</h5>
											<h5 class="widget-user-desc" v-if="project.tagle == '1'" style="color: #00a65a;"><p>合同状态：正常</p></h5>
											<h5 class="widget-user-desc" v-if="project.tagle == '0'" style="color: #dd4b39;"><p>合同状态：终止</p></h5>
										</div>
										
									</div>

								</div>

								<div class="box-footer"
									style="background-color:rgba(211, 211, 211, 0.322);">
									<div class="row">
										<div class="col-md-12">
											<div class="row">
												<div class="col-md-2">
													<h4 class="box-title">关联的项目</h4>
												</div>
												<div class="col-md-4">
													<div class="row">
														<div class="col-md-6 col-xs-12 p-0">
															<div class="btn-group">
																<a href="" v-on:click="$emit('projectht', project)"
																	title="关联项目" data-toggle="modal"
																	data-target="#modelHT">
																	<button class="btn btn-default btn-sm">
																		<i class="fa fa-plus"></i>
																	</button>
																</a>
																<a href="javaScript:void(0);" v-on:click="$emit('refresh')" title="刷新">
																	<button class="btn btn-default btn-sm">
																		<i class="fa fa-refresh"></i>
																	</button>
																</a>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-4"></div>
											</div>
											<table class="table table-hover">
												<thead>
													<tr>
														<th scope="col">ID</th>
														<th scope="col">项目名称</th>
														<th scope="col">归属处室</th>
														<th scope="col">申报金额</th>
														<th scope="col">审核金额</th>
														<th scope="col">入库时间</th>
														<th scope="col">统筹类型</th>
														<th scope="col">项目状态</th>
														<th scope="col">操作</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(item, index) in list" >
														<th scope="row">{{item.p_id}}</th>
														<td>{{item.p_name}}</td>
														<td>{{item.position}}</td>
														<td ><span class="color-success">{{item.declare_money}}</span> <i class="fa fa-cny"></i></td>
														<td><span class="color-danger">{{item.examine_money}}</span> <i class="fa fa-cny"></i></td>
														<td>{{item.warehousing_time}}</td>
														<td>{{item.overall_type}}</td>
														<td><b>{{item.p_tagle}}</b></td>
														<td><a href="javascript:;" v-on:click="$emit('removeht', item.p_id, project.c_id)" title="移除该项目"> <i class="fa fa-trash-o"></i></a></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 添加合同模态框 -->
			<div class="modal fade" id="modelHT" tabindex="-1" role="dialog"
				aria-labelledby="modelHTTit" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="modelHTTit">关联合同 <i class="fa fa-plus"></i>
							</h4>
						</div>
						<div class="modal-body">
							<div class="form-group ">
								<div class="row">
									<div class="col-md-1"></div>
									<div class="col-md-10">
										<div class="input-group">
											<span class="input-group-addon">项目名称</span>
											<input type="text" class="form-control"
												:value="project.c_name" placeholder="请填写该字段" disabled>
										</div>
									</div>
									<div class="col-md-1"></div>
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-md-1"></div>
									<div class="col-md-10">
										<div class="input-group">
											<span class="input-group-addon">选择项目</span>
											<select class="form-control" v-model="modelht.p_id">
												<option selected="selected" value="0">---选择项目---
												</option>
												<option v-for="item in prolist" :value="item.p_id">{{item.p_name}}</option>
												
											</select>
										</div>
									</div>
									<div class="col-md-1"></div>
								</div>
							</div>
							
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="$emit('projecthtsumbit')"
								>提交</button>
						</div>
					</div>
				</div>
			</div>

			<!-- 修改项目模态框 -->
			<div class="modal fade" id="modelUpdatePro" tabindex="-1" role="dialog"
				aria-labelledby="modelProTit" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="modelProTit">修改项目 <i class="fa fa-edit"></i>
							</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">项目名称</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">归属处室</span>
													<select class="form-control">
														<option selected="selected" value="0">---归属处室---
														</option>
														<option v-for="item in list" :value="item.id">{{item.name}}</option>
													</select>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">申报金额</span>
													<input type="text" 
														class="form-control" placeholder="" required>
													<span class="input-group-addon">
														<i class="fa fa-cny"></i>
													</span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-7 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">入库时间</span>
													<input type="datetime-local"
														class="form-control" />
													<span class="input-group-addon">
														<i class="fa fa-calendar"></i>
													</span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">项目名称</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">项目名称</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>
							
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal"
								>提交</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
		`,
});

//自定义呈批件关联页面
Vue.component('n-connect-submit', {
	props: ['return', 'list', 'project', 'model', 'prolist'],
	template: `
	<div class="row">
		<div class="col-xs-12">
			<div class="box">
				<div class="box-header">
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-flat bg-purple" v-on:click="$emit('return')"> 返回列表 </button>
						</div>

					</div>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-1"></div>
						<div class="col-md-10">
							<div class="modal-content">
								<div class="modal-header">
									<h4 class="modal-title" id="modelAddTit">添加呈批件信息 <i class="fa fa-plus"></i>
									</h4>
								</div>
								<div class="modal-body">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">呈批件名称<b
															class="color-danger">*</b></span>
													<input type="text" v-model="model.sub_name"
														class="form-control" placeholder="请填写该字段"
														 > <!--v-on:blur="$emit('inputText')" -->
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">备注</span>
													<input type="text" v-model="model.remarks"
														class="form-control" placeholder="请填写该字段" required>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">申请时间<b
															class="color-danger">*</b></span>
													<input type="date" v-model="model.sub_time"
														class="form-control" />
													<span class="input-group-addon">
														<i class="fa fa-calendar"></i>
													</span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon"><i
															class="fa fa-file"></i></span>
													<input type="file" name="file" id="uploadFile"
														 class="form-control"><!--@change="fileUpload('uploadFile')" -->
												</div>
												<div>
													<p>须知：上传文件大小不超过20MB; 下载模板：<a
															:href="'api/v2/db/dowlond?fileurl=File/model/呈批件模板.doc'"
															target="_blank" title="点击下载文件">呈批件模板.doc</a></p>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
									<div class="footer text-center">
										<button type="button" class="btn btn-secondary"
											data-dismiss="modal">取消</button>
										<button type="button" class="btn btn-primary" data-dismiss="modal"
											>提交</button> <!-- @click="addSubmit()" -->
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-1"></div>
						
					</div>
				</div>
			</div>

		</div>
	</div>
		`,
});


//自定义供应商详情右侧内容页面
Vue.component('n-content-supplier', {
	props: ['return', 'list', 'project', 'moldepro', 'prolist'],
	template: `
	<div class="row">
		<div class="col-xs-12">
			<div class="box">
				<div class="box-header">
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-flat bg-purple" v-on:click="$emit('return')"> 返回列表 </button>
						</div>

					</div>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<div class="box box-widget widget-user ">
								<div class="widget-user-header bg-aqua-active" style="height: 100%;">
									<h3 class="widget-user-username">{{project.sup_name}} &nbsp; <!--<a href="#"
											 title="修改" data-toggle="modal"
											data-target="#modelUpdatePro"><i class="fa fa-edit"></i></a>-->
									</h3>
									<div class="row">
										<div class="col-md-6 col-xs-6">
											<h5 class="widget-user-desc"><p>公司电话：{{project.phone}}</p></h5>
											<h5 class="widget-user-desc"><p>收款人：{{project.payee}}</p></h5>
											<h5 class="widget-user-desc"><p>公司地址：{{project.address}}</p></h5>
											<h5 class="widget-user-desc"><b><p>开户银行：{{project.opening_bank}}</p></b></h5>
											<h5 class="widget-user-desc"><b><p>开户账号：{{project.bank_account}}</p></b></h5>
											
										</div>
										<div class="col-md-4 col-xs-6">
											
										</div>
										<div class="col-md-4 col-xs-6">

										</div>
									</div>
								</div>

								<div class="box-footer"
									style="background-color:rgba(211, 211, 211, 0.322);">
									<div class="row">
										<div class="col-md-12">
											<div class="row">
												<div class="col-md-2">
													<h4 class="box-title">关联的账号</h4>
												</div>
												<div class="col-md-4">
													<div class="row">
														<div class="col-md-6 col-xs-12 p-0">
															<div class="btn-group">
																<a href="" v-on:click="$emit('projectht', project)"
																	title="添加账号" data-toggle="modal"
																	data-target="#modelHT">
																	<button class="btn btn-default btn-sm">
																		<i class="fa fa-plus"></i>
																	</button>
																</a>
																<a href="javaScript:void(0);" v-on:click="$emit('refresh')" title="刷新">
																	<button class="btn btn-default btn-sm">
																		<i class="fa fa-refresh"></i>
																	</button>
																</a>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-4"></div>
											</div>
											<table class="table table-hover">
												<thead>
													<tr>
														<th scope="col">ID</th>
														<th scope="col">用户名</th>
														<th scope="col">姓名</th>
														<th scope="col">职务</th>
														<th scope="col">联系方式</th>
														<th scope="col">邮箱</th>
														<th scope="col">备注</th>
														<th scope="col">操作</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(item, index) in list" >
														<th scope="row">{{item.id}}</th>
														<td>{{item.username}}</td>
														<td>{{item.name}}</td>
														<td>{{item.post}}</td>
														<td>{{item.phone}}</td>
														<td>{{item.email}}</td>
														<td>{{item.remarks}}</td>
														<td><a href="javascript:;" v-on:click="$emit('removeht', item.id)" title="删除账号"> <i class="fa fa-trash-o"></i></a></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			

		</div>
	</div>
		`,
});

//自定义呈批件详情右侧内容页面
Vue.component('n-content-submit', {
	props: ['return', 'list', 'project', 'moldepro', 'prolist'],
	template: `
	<div class="row">
		<div class="col-xs-12">
			<div class="box">
				<div class="box-header">
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-flat bg-purple" v-on:click="$emit('return')"> 返回列表 </button>
						</div>

					</div>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<div class="box box-widget widget-user ">
								<div class="widget-user-header bg-aqua-active" style="height: 100%;">
									<h3 class="widget-user-username">{{project.sub_name}} &nbsp; <!--<a href="#"
											 title="修改" data-toggle="modal"
											data-target="#modelUpdatePro"><i class="fa fa-edit"></i></a>-->
									</h3>
									<div class="row">
										<div class="col-md-6 col-xs-6">
											
											<h5 class="widget-user-desc"><p>申请时间：{{project.sub_time}}</p></h5>
											<h5 class="widget-user-desc">
												<p>合同资料：
													<a :href="'api/v2/db/dowlond?fileurl='+project.sub_fileUrl" target="_blank" title="点击下载文件">
														<i class="fa fa-paperclip"></i> &nbsp;{{project.sub_fileName}}
													</a>
												</p>
											</h5>
											<h5 class="widget-user-desc"><b><p>备注：{{project.remarks}}</p></b></h5>
										</div>
										<div class="col-md-4 col-xs-6">
												
										</div>
										<div class="col-md-4 col-xs-6">

										</div>
									</div>
								</div>

								<div class="box-footer"
									style="background-color:rgba(211, 211, 211, 0.322);">
									<div class="row">
										<div class="col-md-12">
											<div class="row">
												<div class="col-md-2">
													<h4 class="box-title">关联的项目</h4>
												</div>
												<div class="col-md-4">
													<div class="row">
														<div class="col-md-6 col-xs-12 p-0">
															<div class="btn-group">
																
																<a href="javaScript:void(0);" v-on:click="$emit('refresh')" title="刷新">
																	<button class="btn btn-default btn-sm">
																		<i class="fa fa-refresh"></i>
																	</button>
																</a>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-4"></div>
											</div>
											<table class="table table-hover">
												<thead>
													<tr>
														<th scope="col">ID</th>
														<th scope="col">项目名称</th>
														<th scope="col">归属处室</th>
														<th scope="col">申报金额</th>
														<th scope="col">审核金额</th>
														<th scope="col">入库时间</th>
														<th scope="col">统筹类型</th>
														<th scope="col">项目状态</th>
														<th scope="col">操作</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(item, index) in list" >
														<th scope="row">{{item.p_id}}</th>
														<td>{{item.p_name}}</td>
														<td>{{item.position}}</td>
														<td><span class="color-success">{{item.declare_money}}</span> <i class="fa fa-cny"></i></td>
														<td><span class="color-danger">{{item.examine_money}}</span> <i class="fa fa-cny"></i></td>
														<td>{{item.warehousing_time}}</td>
														<td>{{item.overall_type}}</td>
														<td><b>{{item.p_tagle}}</b></td>
														<td><!--<a href="javascript:;" v-on:click="$emit('removeht', item.p_id, project.sub_id)" title="移除该呈批件"> <i class="fa fa-trash-o"></i></a>--></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 添加合同模态框 -->
			<div class="modal fade" id="modelHT" tabindex="-1" role="dialog"
				aria-labelledby="modelHTTit" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="modelHTTit">关联合同 <i class="fa fa-plus"></i>
							</h4>
						</div>
						<div class="modal-body">
							<div class="form-group ">
								<div class="row">
									<div class="col-md-1"></div>
									<div class="col-md-10">
										<div class="input-group">
											<span class="input-group-addon">项目名称</span>
											<input type="text" class="form-control"
												:value="project.sub_name" placeholder="请填写该字段" disabled>
										</div>
									</div>
									<div class="col-md-1"></div>
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-md-1"></div>
									<div class="col-md-10">
										<div class="input-group">
											<span class="input-group-addon">选择项目</span>
											<select class="form-control" v-model="moldepro.p_id">
												<option selected="selected" value="0">---选择项目---
												</option>
												<option v-for="item in prolist" :value="item.p_id">{{item.p_name}}</option>
												
											</select>
										</div>
									</div>
									<div class="col-md-1"></div>
								</div>
							</div>
							
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="$emit('projecthtsumbit')"
								>提交</button>
						</div>
					</div>
				</div>
			</div>

			<!-- 修改项目模态框 -->
			<div class="modal fade" id="modelUpdatePro" tabindex="-1" role="dialog"
				aria-labelledby="modelProTit" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="modelProTit">修改项目 <i class="fa fa-edit"></i>
							</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">项目名称</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">归属处室</span>
													<select class="form-control">
														<option selected="selected" value="0">---归属处室---
														</option>
														<option v-for="item in list" :value="item.id">{{item.name}}</option>
													</select>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">申报金额</span>
													<input type="text" 
														class="form-control" placeholder="" required>
													<span class="input-group-addon">
														<i class="fa fa-cny"></i>
													</span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-7 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">入库时间</span>
													<input type="datetime-local"
														class="form-control" />
													<span class="input-group-addon">
														<i class="fa fa-calendar"></i>
													</span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">项目名称</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">项目名称</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>
							
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal"
								>提交</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
		`,
});

//自定义指标详情右侧内容页面
Vue.component('n-content-sign', {

	props: ['return', 'list', 'project', 'moldepro', 'prolist'],
	template: `
	<div class="row">
		<div class="col-xs-12">
			<div class="box">
				<div class="box-header">
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-flat bg-purple" v-on:click="$emit('return')"> 返回列表 </button>
						</div>

					</div>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<div class="box box-widget widget-user ">
								<div class="widget-user-header bg-aqua-active" style="height: 100%;">
									<h3 class="widget-user-username">{{project.sub_name}} &nbsp; <!--<a href="#"
											 title="修改" data-toggle="modal"
											data-target="#modelUpdatePro"><i class="fa fa-edit"></i></a>-->
									</h3>
									<div class="row">
										<div class="col-md-6 col-xs-6">
											
											<h5 class="widget-user-desc"><p>申请时间：{{project.sub_time}}</p></h5>
											<h5 class="widget-user-desc">
												<p>合同资料：
													<a :href="'api/v2/db/dowlond?fileurl='+project.sub_fileUrl" target="_blank" title="点击下载文件">
														<i class="fa fa-paperclip"></i> &nbsp;{{project.sub_fileName}}
													</a>
												</p>
											</h5>
											<h5 class="widget-user-desc"><b><p>备注：{{project.remarks}}</p></b></h5>
										</div>
										<div class="col-md-4 col-xs-6">
												
										</div>
										<div class="col-md-4 col-xs-6">

										</div>
									</div>
								</div>

								<div class="box-footer"
									style="background-color:rgba(211, 211, 211, 0.322);">
									<div class="row">
										<div class="col-md-12">
											<div class="row">
												<div class="col-md-2">
													<h4 class="box-title">关联的项目</h4>
												</div>
												<div class="col-md-4">
													<div class="row">
														<div class="col-md-6 col-xs-12 p-0">
															<div class="btn-group">
																
																<a href="javaScript:void(0);" v-on:click="$emit('refresh')" title="刷新">
																	<button class="btn btn-default btn-sm">
																		<i class="fa fa-refresh"></i>
																	</button>
																</a>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-4"></div>
											</div>
											<table class="table table-hover">
												<thead>
													<tr>
														<th scope="col">ID</th>
														<th scope="col">项目名称</th>
														<th scope="col">归属处室</th>
														<th scope="col">申报金额</th>
														<th scope="col">审核金额</th>
														<th scope="col">入库时间</th>
														<th scope="col">统筹类型</th>
														<th scope="col">项目状态</th>
														<th scope="col">操作</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(item, index) in list" >
														<th scope="row">{{item.p_id}}</th>
														<td>{{item.p_name}}</td>
														<td>{{item.position}}</td>
														<td><span class="color-success">{{item.declare_money}}</span> <i class="fa fa-cny"></i></td>
														<td><span class="color-danger">{{item.examine_money}}</span> <i class="fa fa-cny"></i></td>
														<td>{{item.warehousing_time}}</td>
														<td>{{item.overall_type}}</td>
														<td><b>{{item.p_tagle}}</b></td>
														<td><!--<a href="javascript:;" v-on:click="$emit('removeht', item.p_id, project.sub_id)" title="移除该呈批件"> <i class="fa fa-trash-o"></i></a>--></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 添加合同模态框 -->
			<div class="modal fade" id="modelHT" tabindex="-1" role="dialog"
				aria-labelledby="modelHTTit" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="modelHTTit">关联合同 <i class="fa fa-plus"></i>
							</h4>
						</div>
						<div class="modal-body">
							<div class="form-group ">
								<div class="row">
									<div class="col-md-1"></div>
									<div class="col-md-10">
										<div class="input-group">
											<span class="input-group-addon">项目名称</span>
											<input type="text" class="form-control"
												:value="project.sub_name" placeholder="请填写该字段" disabled>
										</div>
									</div>
									<div class="col-md-1"></div>
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-md-1"></div>
									<div class="col-md-10">
										<div class="input-group">
											<span class="input-group-addon">选择项目</span>
											<select class="form-control" v-model="moldepro.p_id">
												<option selected="selected" value="0">---选择项目---
												</option>
												<option v-for="item in prolist" :value="item.p_id">{{item.p_name}}</option>
												
											</select>
										</div>
									</div>
									<div class="col-md-1"></div>
								</div>
							</div>
							
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="$emit('projecthtsumbit')"
								>提交</button>
						</div>
					</div>
				</div>
			</div>

			<!-- 修改项目模态框 -->
			<div class="modal fade" id="modelUpdatePro" tabindex="-1" role="dialog"
				aria-labelledby="modelProTit" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="modelProTit">修改项目 <i class="fa fa-edit"></i>
							</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">项目名称</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">归属处室</span>
													<select class="form-control">
														<option selected="selected" value="0">---归属处室---
														</option>
														<option v-for="item in list" :value="item.id">{{item.name}}</option>
													</select>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">申报金额</span>
													<input type="text" 
														class="form-control" placeholder="" required>
													<span class="input-group-addon">
														<i class="fa fa-cny"></i>
													</span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-7 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">入库时间</span>
													<input type="datetime-local"
														class="form-control" />
													<span class="input-group-addon">
														<i class="fa fa-calendar"></i>
													</span>
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">项目名称</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
								<div class="col-md-6 p-0">
									<div class="form-group ">
										<div class="row">
											<div class="col-md-1"></div>
											<div class="col-md-10">
												<div class="input-group">
													<span class="input-group-addon">项目名称</span>
													<input type="text" class="form-control"
														:value="project.name" placeholder="请填写该字段">
												</div>
											</div>
											<div class="col-md-1"></div>
										</div>
									</div>
								</div>
							</div>
							
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal"
								>提交</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
		`,
});

//自定义回到顶部
Vue.component('n-nav-', {
	data: function () {
		return {

		}
	},
	template: `
	
		`,
});


//自定义回到顶部
Vue.component('n-nav-', {
	data: function () {
		return {

		}
	},
	template: `
	
		`,
});


//自定义回到顶部
Vue.component('n-nav-', {
	data: function () {
		return {

		}
	},
	template: `
	
		`,
});


//自定义回到顶部
Vue.component('n-nav-', {
	data: function () {
		return {

		}
	},
	template: `
	
		`,
});


//自定义回到顶部
Vue.component('n-nav-', {
	data: function () {
		return {

		}
	},
	template: `
	
		`,
});


//自定义回到顶部
Vue.component('n-nav-', {
	data: function () {
		return {

		}
	},
	template: `
	
		`,
});

