/*** 预验收 vue实例 ***/

new Vue({
    el: '#app',
    data: {

        apiurl: '',
        ProjectTagle: '订单管理',
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
        //网点下拉框数据
        dotOption:{
        	dotId:'',
        	parentId:'',
        	dotName:'',
        	list: []
        },
        //用户下拉框数据
        userOption:{
        	userId:'',
        	userName:'',
        	list: []
        },
        //详细列表信息
        orderDetail:{
        	user:'',
        	userImg:'',
        	roluName:'',
        	state:'',
        	time:'',
        	list:[]
        },
        /**
         * 账号权限资料
         */
        userRol: {},
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
            parent_id: 3,
            id: 31,
            title: '订单管理',
            text: '',
            position: [
                {
                    name: '订单管理',
                    img: 'fa fa-windows',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '订单管理',
                    img: '',
                    url: 'acceptanceBefore.html'
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
            list: [],       //数据集合
        },
        beanChange: {       //过滤条件
            p_tagle: '订单管理',
            state: '1',
            page_no: '',
            page_line: '',
            acceBefore_time: '0',
            search: '',
        },
        beanSearch: '',         //搜索
        modalUpdate: {          //修改模态框
            dotName:"",
            dotId:"",
            sendTel:"",
            sendAddr:"",
            receiveTel:"",
            receiveAddr:"",//收件人地址
            weight:"",
            currentUser:'',
            money:"",
            state:""

        },
        modalAdd: {          //添加模态框
            dotid:"",
            sendTel:"",
            sendAddr:"",
            receiveTel:"",
            receiveAddr:"",//收件人地址
            weight:"",
            money:"",
        },
        modalFile: {          //文件上传模态框
            p_id: '',
            p_name: '',
            bid_fileName: '',
            bid_fileUrl: '',
            p_tagle: '订单管理'
        },

        /**
         * 关联合同模态框
         */
        moldeHt: {
            p_id: '0',
            c_id: '0',
        },

        /**
         * 模态框下拉项目列表
         */
        list1: [],
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
        /**
         * 修改密码
         */
        updatePwd: function () {
            if (this.pwdModel.newpwd != this.pwdModel.newpwd_) {
                toastr.error('两次密码不相同！');
            } else if (this.pwdModel.newpwd == '' || this.pwdModel.newpwd_ == '' || this.pwdModel.oldpwd == '') {
                toastr.error('密码不能为空！');
            } else {
                axios.get(this.apiurl + 'api/v2/user/updatePwd',
                    {
                        params: {
                            id: this.user.id,
                            username: this.user.userid,
                            pwd: this.pwdModel.oldpwd,
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

            this.beanChange.position = '0';
            this.beanChange.overall_type = '0';
            this.beanChange.beanYear = '0';
            this.beanSearch = '';
            this.beanChange.p_tagle = '订单管理',
                this.limitData.page_go = '';
            this.numsByPosition();
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
            this.numsByPosition();
            this.listlimit();
        },

        /**
         * 筛选值改变触发方法，按值去查询
         */
        beanPosition_change: function () {
            this.limitData.page = 1;
            this.numsByPosition();
            this.listlimit();
        },


        /**
         * 刷新内容详情列表数据
         */
        refreshContent: function () {
        	axios.get(this.apiurl + 'api/order/getOrders',   {
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
        },

        /* *******************项目详情所需方法-start********************** */
        /**
         * 进入详情界面
         * @param {*} obj 
         */
        contentChange: function (obj) {
            this.projectContent = obj;
            this.contentTagle = false;
            console.log(obj);
            axios.get(this.apiurl + 'api/order/getContent',{
                params: {
                	orderId: obj.orderId
                }
            })
                .then(
                    (res) => {
                        this.orderDetail.list = res.data;
                    }
                )
                .catch(
                    (error) => { console.log(error); }
                );
        },
        /**
         * 返回列表界面
         * @param {*} obj 
         */
        contentReturn: function () {

            this.contentTagle = true;
        },



        /* *******************项目详情所需方法-end********************** */

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
        	if(this.modalUpdate.receivetel.length != 11){
        		toastr.warning("手机号长度为11位！");
        		return;
        	}
            axios.post(this.apiurl + 'api/order/updateOrders', this.modalUpdate)
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
            if (this.modalAdd.p_id == 0 || this.modalAdd.sendtel == '' || this.modalAdd.sendaddr == '' || this.modalAdd.receivetel == '' || this.receiveaddr == '') {
                toastr.warning('请填写完整的信息！');
                return false;
            }
            axios.post(this.apiurl + 'api/order/addorders', this.modalAdd)
                .then(
                    (res) => {
                        toastr.success('添加成功！');
                            this.modalAdd = {          //添加模态框
                                dotid:"",
                                sendtel:"",
                                sendaddr:"",
                                receivetel:"",
                                receiveaddr:"",//收件人地址
                                weight:"",
                                money:"",
                            },
                            this.numsByPosition();
                        this.listlimit();
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.danger('添加失败！');
                    }
                );
        },
        //数据列表查询
        listlimit: function () {
            // this.beanChange.page_no = this.limitData.page;
            // this.beanChange.page_line = this.limitData.line;
            // this.beanChange.search = this.beanSearch;

            axios.get(this.apiurl + 'api/order/getOrders',{
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
        },
        numsByPosition: function () {
            // this.beanChange.page_no = this.limitData.page;
            // this.beanChange.page_line = this.limitData.line;
            // this.beanChange.search = this.beanSearch;
            // axios.post(this.apiurl + 'api/v2/db/nums', this.beanChange)
            //     .then(
            //         (res) => {
            //             this.limitData.nums = res.data;
            //         }
            //     )
            //     .catch(
            //         (error) => { console.log(error); }
            //     );
        }

    },
    mounted() {
        this.beanChange.p_tagle = this.ProjectTagle;
        this.beanChange.page_no = this.limitData.page;
        this.beanChange.page_line = this.limitData.line;
        this.beanChange.search = this.beanSearch;
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
		                    this.user.img_src = res.data.imgurl;
					}
				}
		)
		.catch(
				(error) => { console.log(error); }
		);

        //HTTP get 获得分页详细列表
        axios.get(this.apiurl + 'api/order/getOrders',   {
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
        //获取网点下拉框数据
        axios.get(this.apiurl + 'api/dot/getDotParentList',   {
            params: {
            	parentId: this.beanSearch
            }
        })
            .then(
                (res) => {
                    this.dotOption.list = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        //获取用户下拉框数据
        axios.get(this.apiurl + 'api/user/getAllUser',   {
            params: {
            	search: ""
            }
        })
            .then(
                (res) => {
                    this.userOption.list = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
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