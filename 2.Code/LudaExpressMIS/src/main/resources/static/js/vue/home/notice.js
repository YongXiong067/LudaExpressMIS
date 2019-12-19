/*** 项目入库 vue实例 ***/

new Vue({
    el: '#app',
    data: {
        apiurl: '',
        ProjectTagle: '用户管理',
        /**
         * 账号资料
         */
        user: {
            id: '',
            userid: '',
            username: '',
            sex: '',
            phone: '',
            img_src: 'images/img.jpg',
            last_logintime: '',
            rol: {
                id: '',
                name: ''
            }
        },
        /**
         * 账号权限资料
         */
        userRol: {
            id: 1,
            list: []
        },
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
        systemNews: [],
        /**
         * 页面内容标题栏导航
         */
        pagePosition: {
            parent_id: 2,
            id: 22,
            title: '公告管理',
            text: '',
            position: [
                {
                    name: '公司',
                    img: 'fa fa-edit',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '公告管理',
                    img: '',
                    url: 'user.html'
                }
            ]
        },
        /**
         * 右侧内容页展示状态
         */
        contentTagle: true,
        /**
         * 数据分页
         */
        limitData: {
            page: 1,        //当前页
            page_go: '',    //跳转页
            line: 20,       //每页数据条数
            nums: '',      //总条数
            list: [
                {
                    noticeId: 1,
                    title: '标题1',
                    content: '内容1内容1内容1内容1内容1内容1'
                },
                {
                    noticeId: 2,
                    title: '标题2',
                    content: '内容2内容2内容2内容2内容2内容2'
                },
            ],       //数据集合
        },
        positionList: [

        ],
        beanChange: {       //过滤条件
            beanPosition: '0',
            beanYear: '0',
        },
        beanSearch: '',         //搜索
        modalUpdate: {          //修改模态框
        	userName: '',
            password: '',
            phone: '',
            rolu: ''
        },
        modalAdd: {          //添加模态框
            userName: '',
            password: '',
            phone: '',
            rolu: ''
        },
        /**
         * 关联合同模态框
         */
        moldeHt: {
            id: '',
            htid: '0'
        },
        moldePro: {
            sub_id: '0',
            p_id: '0'
        },
        /**
         * 项目详情列表数据
         */
        listData: {
            htList: [],
            submitList: [],
            signList: [],
            superviseList: [],
            paymentList: [],
            supplierList: []
        },
        /**
         * 项目详情页面数据
         */
        projectContent: {},
        /**
         * 测试数据
         */
        list1: [],
        list3: [],
        /**
         * 测试数据-合同列表
         */
        listHT: [],
    },
    methods: {
        /**  输入验证-start **/
        //正常验证
        inputText: function (value) {
            if (value != '') {

            } else {
                toastr.warning("内容不能为空!");
            }
        },
        //数字验证
        inputNumber: function (value) {
            if (value != '') {
                if (!value.match(/^-?\d+(\.\d+)?$/)) {
                    toastr.warning("只能输入数字呢！");
                }
            } else {
                toastr.warning("内容不能为空!");
            }
        },

        /**  输入验证-end **/
        /**
         * 修改密码
         */
        updatePwd: function () {
			 if (this.pwdModel.newpwd != this.pwdModel.newpwd_) {
				 toastr.error('两次密码不相同！');
			 } else if (this.pwdModel.newpwd == '' || this.pwdModel.newpwd_ == '' || this.pwdModel.oldpwd == '') {
				 toastr.error('密码不能为空！');
			 } else {
				 console.log(this.pwdModel.newpwd);
				 axios.get(this.apiurl + 'api/user/updatePwd',
						 {
					 params: {
						 userId: this.user.userId,
						 userName: this.user.userName,
						 oldPwd: this.pwdModel.oldpwd,
						 newpwd: this.pwdModel.newpwd
					 }
						 })
						 .then(
								 (res) => {
									 if (res.data == 1) {
										 toastr.success('修改成功！');
									 } else if (res.data == -1) {
										 toastr.error('密码验证失败！');
									 } else {
										 toastr.error('修改密码失败！');
									 }
								 }
						 )
						 .catch(
								 (error) => { console.log(error); }
						 );
			 }
		 },
        /**
         * 刷新数据
         */
        refresh: function () {
            this.limitData.page = 1;
            this.limitData.line = 20;
            this.beanSearch = '';
            this.limitData.page_go = '';
            //this.numsByPosition();
            this.listlimit();
        },

        /**
         * 注销登录
         */
        cancellation: function () {
            axios.get(this.apiurl + 'api/user/cancellation')
                .then(
                    (res) => {
                        //toastr.success('注销成功！');
                        window.location.href = "login.html";
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        window.location.href = "login.html";
                        //toastr.danger('注销失败！');
                    }
                );
        },

        /**
         * 分页跳转
         * @param {*} tagle 
         */
        limit_page: function (tagle) {

            if (tagle == 'next') {
                if (this.limitData.page < this.pages) {
                    this.limitData.page++;
                }
            } else if (tagle == 'pre') {
                if (this.limitData.page > 1) {
                    this.limitData.page--;
                }
            } else if (tagle == "first") {
                if (this.limitData.page > 1) {
                    this.limitData.page = 1;
                }
            } else if (tagle == "last") {
                if (this.limitData.page < this.pages) {
                    this.limitData.page = this.pages;
                }
            } else {
                if (tagle <= this.pages && tagle >= 1) {
                    this.limitData.page = tagle;
                }
            }
            this.listlimit();
        },
        /**
         * 页面条数更新
         */
        search: function () {
            this.limitData.page = 1;
            //this.numsByPosition();
            this.listlimit();
        },

        /**
         * 筛选值改变触发方法，按值去查询
         */
        beanPosition_change: function () {
            this.limitData.page = 1;
            //this.numsByPosition();
            this.listlimit();
        },

        /* *******************项目详情所需方法-start********************** */
        /**
         * 进入详情界面
         * @param {*} obj 
         */
        contentChange: function (obj) {
            this.projectContent = obj;
            this.contentTagle = false;
        },
        /**
         * 返回列表界面
         * @param {*} obj 
         */
        contentReturn: function () {
            this.contentTagle = true;
        },

        /* *******************所需方法-end********************** */

        /**
         * 修改模态框获得数据数据
         * @param {*} obj 
         */
        update: function (obj) {
            this.modalUpdate = obj;
        },

        /**
         * 修改数据提交
         */
        updateSubmit: function () {
            axios.post(this.apiurl + 'api/user/update', this.modalUpdate)
                .then(
                    (res) => {
                        toastr.success('修改成功！');
                        this.listlimit();
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.danger('修改失败！');
                    }
                );
        },
          /**
         * 添加数据提交
         */
        addSubmit: function () {
            if (this.modalAdd.userName == '' || this.modalAdd.password == '' || this.modalAdd.phone == '' || this.modalAdd.rolu == '') {
            	console.log(this.modalAdd.password);
            	console.log(this.modalAdd.phone);
            	toastr.warning('请填写完整的信息！');
                return false;
            }

            var name = '';
            axios.post(this.apiurl + 'api/user/insertUser', this.modalAdd)
                .then(
                    (res) => {
                        if (res.data) {
                            toastr.success('添加成功！');
                            this.modalAdd = {          //添加模态框
                                userName: '',
                                password: '',
                                phone: '',
                                rolu: ''
                            },
                            //this.numsByPosition();
                            this.listlimit();
                        } else {
                            toastr.danger('添加失败！');
                        }
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
        },
        /**
         * 删除数据
         * @param {} id 
         */
        deleteProject: function (id) {
            if (confirm("是否确定删除？")) {
                axios.get(this.apiurl + 'api/user/deleteUser',
                    {
                        params: {
                        	userId: id,
                        }
                    })
                    .then(
                        (res) => {
                            toastr.success('删除成功！');
                            //this.numsByPosition();
                            this.listlimit();
                        }
                    )
                    .catch(
                        (error) => {
                            console.log(error);
                            toastr.danger('删除失败！');
                        }
                    );
            }
        },
        listlimit: function () {
        	
        	axios.get(this.apiurl + 'api/user/getAllUser', {
        		params: {
        			search: this.beanSearch
        		}
        	})
                    .then(
                        (res) => {
                            this.limitData.list = res.data;
                        }
                    )
                    .catch(
                        (error) => { console.log(error); }
                    );
//            axios.post(this.apiurl + 'api/v2/project/getListByLimit',
//                {
//                    state: '1',
//                    p_tagle: this.ProjectTagle,
//                    page_no: this.limitData.page,
//                    page_line: this.limitData.line,
//                    position: this.beanChange.beanPosition,
//                    warehousing_time: this.beanChange.beanYear,
//                    search: this.beanSearch
//                })
//                .then(
//                    (res) => {
//
//                        this.limitData.list = res.data;
//                    }
//                )
//                .catch(
//                    (error) => { console.log(error); }
//                );
        },
        numsByPosition: function () {
//            axios.get(this.apiurl + 'api/db/nums',
//                {
//                    params: {
//                        state: '1',
//                        p_tagle: this.ProjectTagle,
//                        position: this.beanChange.beanPosition,
//                        a_year: this.beanChange.beanYear,
//                        w_year: '0',
//                        search: this.beanSearch
//                    }
//                })
//                .then(
//                    (res) => {
//                        this.limitData.nums = res.data;
//                    }
//                )
//                .catch(
//                    (error) => { console.log(error); }
//                );
//        }
		}
    },
    mounted() {
        //-------------
        //- api请求 -
        //-------------
        //HTTP GET 请求-获得当前登录用户信息
        axios.get(this.apiurl + 'api/user/getUser')
            .then(
                (res) => {
                    if (res.data.userId == 0) {
                        window.location.href = "login.html";
                    } else {
                        this.user.id = res.data.userId;
                        this.user.userid = res.data.userName;
                        this.user.username = res.data.userName;
                    }
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        /**
         * 获得分页详细列表
         */
        // axios.get(this.apiurl + 'api/user/getAllUser',
	    //     {
	    // 		params: {
	    // 			search: this.beanSearch
	    // 		}
	    // 	})
        //     .then(
        //         (res) => {
        //             this.limitData.list = res.data;
        //         }
        //     )
        //     .catch(
        //         (error) => { console.log(error); }
        //     );
    },
    computed: {
        pages: function () {
            return Math.ceil(this.limitData.nums / this.limitData.line);
        },
        page_first: function () {
            return (this.limitData.page - 1) * this.limitData.line + 1;
        },
        page_last: function () {
            if (this.limitData.page * this.limitData.line > this.limitData.nums) {
                return this.limitData.nums;
            }
            return this.limitData.page * this.limitData.line;
        }
    },
    created() {  //全局监听键盘事件
        var _this = this;
        document.onkeydown = function (e) {
            let key = window.event.keyCode;
            if (key == 39) {
                _this.limit_page('next');
            }
            if (key == 37) {
                _this.limit_page('pre');
            }
        };
    }
});