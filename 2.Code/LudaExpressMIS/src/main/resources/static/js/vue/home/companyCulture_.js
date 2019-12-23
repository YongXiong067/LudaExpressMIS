/*** 项目入库 vue实例 ***/

new Vue({
    el: '#app',
    data: {

        apiurl: '',
        ProjectTagle: '企业文化',
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
            parent_id: 2,
            id: 21,
            title: '企业文化',
            text: '',
            position: [
                {
                    name: '公司',
                    img: 'fa fa-windows',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '企业文化',
                    img: '',
                    url: 'CompanyCulture.html'
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
        positionList: [],   //归属处室
        overall_typeList: [],      //统筹类型
        beanChange: {       //过滤条件
            beanPosition: '0',
            beanYear: '0',
            beanTagle: ''
        },
        beanSearch: '',         //搜索
        modalUpdate: {          //修改模态框
            ncId: '',
            title: '',
            content: '',
            type: 1

        },
        modalAdd: {          //添加模态框
            ncId: '',
            title: '',
            content: '',
            type: 1
        },
        modalFile: {          //文件上传模态框
            c_id: '',
            c_name: '',
            fileName: '',
            fileUrl: '',
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
         * 项目详情页面数据
         */
        projectContent: {

        },

        /**
         * 测试数据-合同列表
         */
        listPro: [],
        timeLine: {
            year: '2019',
            month: '7',
            list: [
                {
                    day: '3',
                    list: [
                        {
                            id: '2019-07-03-1',
                            title: '项目入库提醒',
                            user: {
                                id: '8',
                                userName: 'zwl',
                                realName: '周伟林',
                                sex: '男',
                                phone: '15574361955',
                                img: 'images/img.jpg',
                                lastLoginTime: '2019-06-03 14:52:24'
                            },
                            text: '省厅等保项目已经入库，请尽快立项！',
                            time: '14:52:24'
                        },
                        {
                            id: '2019-07-03-2',
                            title: '项目验收提醒！',
                            user: {
                                id: '8',
                                userName: 'liyn',
                                realName: '李莹娜',
                                sex: '女',
                                phone: '15574361955',
                                img: 'images/picture.jpg',
                                lastLoginTime: '2019-06-03 14:52:24',

                            },
                            text: '省厅等保项目可以验收了，8月1号审核！',
                            time: '14:52:24'
                        }
                    ]
                },
                {
                    day: '2',
                    list: [
                        {
                            id: '2019-07-02-1',
                            title: '项目督办提醒',
                            user: {
                                id: '8',
                                userName: 'zwl',
                                realName: '周伟林',
                                sex: '男',
                                phone: '15574361955',
                                img: 'images/img.jpg',
                                lastLoginTime: '2019-06-03 14:52:24'
                            },
                            text: '国土局的项目要开始督办了，要尽快，8月16号截至，超过截至日期将造成不必要的损失！',
                            time: '8:52:24'
                        },
                        {
                            id: '2019-07-02-2',
                            title: '项目督办提醒',
                            user: {
                                id: '8',
                                userName: 'zwl',
                                realName: '周伟林',
                                sex: '男',
                                phone: '15574361955',
                                img: 'images/img.jpg',
                                lastLoginTime: '2019-06-03 14:52:24'
                            },
                            text: '国土局的项目要开始督办了，8月16号截至！',
                            time: '14:52:24'
                        }
                    ]
                },
            ]
        },

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
            this.beanChange.beanPosition = '0';
            this.beanChange.beanYear = '0';
            this.beanSearch = '';
            this.limitData.page_go = '';
            this.numsByPosition();
            this.listlimit();
        },

        /**
         * 注销登录
         */
        cancellation: function () {
            axios.get(this.apiurl + 'api/v2/user/cancellation')
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
         * 进入详情界面
         * @param {*} obj 
         */
        contentChange: function (obj) {
            this.projectContent = obj;
            this.contentTagle = false;
            this.moldeHt.c_id = obj.c_id;
            this.refreshContent();
        },

        /**
         * 刷新内容详情列表数据
         */
        refreshContent: function () {
            axios.get(this.apiurl + 'api/v2/project/getListByCId',
                {
                    params: {
                        c_id: this.moldeHt.c_id,
                    }
                })
                .then(
                    (res) => {
                        this.listPro = res.data;
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
        },

        /**
         * 返回列表界面
         * @param {*} obj 
         */
        contentReturn: function () {

            this.contentTagle = true;
        },

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
            axios.post(this.apiurl + 'api/company/updateCulture', this.modalUpdate)
                .then(
                    (res) => {
                        if (res.data) {
                            toastr.success('修改成功！');
                            this.listlimit();
                        } else {
                            toastr.error('修改失败！');
                        }

                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.error('修改失败！');
                    }
                );
        },
        /**
         * 添加数据提交
         */
        addSubmit: function () {
            if (this.modalAdd.title == '' || this.modalAdd.content == '') {
                toastr.warning('请填写完整的信息！');
                return false;
            }
            axios.post(this.apiurl + 'api/company/insertCulture', this.modalAdd)
                .then(
                    (res) => {
                        toastr.success('添加成功！');
                        this.numsByPosition();
                        this.listlimit();
                        this.modalAdd = {          //重置数据
                            ncId: '',
                            title: '',
                            content: '',
                            type: 1
                        }
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.danger('添加失败！');
                    }
                );
        },
        /**
         * 删除数据
         * @param {} id 
         */
        deleteCulture: function (id) {
            if (confirm("是否确定删除？")) {
                axios.get(this.apiurl + 'api/company/deleteCulture',
                    {
                        params: {
                            id: id,
                        }
                    })
                    .then(
                        (res) => {
                            if (res.data) {
                                toastr.success('删除成功！');
                                this.numsByPosition();
                                this.listlimit();
                            } else {
                                toastr.error('删除失败！');
                            }

                        }
                    )
                    .catch(
                        (error) => {
                            console.log(error);

                        }
                    );
            }
        },
        listlimit: function () {
            axios.get(this.apiurl + 'api/company/getCulture',
                {
                    params: {
                        search: this.beanSearch,
                        type: 1
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

        axios.get(this.apiurl + 'api/company/getCulture',
            {
                params: {
                    search: this.beanSearch,
                    type: 1
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