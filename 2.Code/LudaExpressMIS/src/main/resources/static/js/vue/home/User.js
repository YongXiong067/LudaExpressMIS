/*** 市州人防办申请记录 vue实例 ***/

new Vue({
    el: '#app',
    data: {

        apiurl: '',
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
            id: 24,
            title: '网点管理',
            text: '',
            position: [
                {
                    name: '公司',
                    img: 'fa fa-clone',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '网点管理',
                    img: '',
                    url: 'userAccount.html'
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
        positionList: [

        ],
        beanChange: {       //过滤条件
            beanPosition: '0',
            beanYear: '0',
        },
        beanSearch: '',         //搜索
        modalUpdate: {          //修改模态框
            dotId: '',
            dotName: '',
        },
        modalAdd: {          //添加模态框
            dotId: '',
            dotName: '',
        },
        modalFile: {          //文件上传模态框
            p_id: '',
            p_name: '',
            declare_money: '',
            position: '',
            warehousing_time: '',
            warehousing_fileName: '',
            warehousing_fileUrl: '',
            p_tagle: '项目入库'
        },



        /**
         * 项目详情页面数据
         */
        projectContent: {

        },
        modelAccount: {
            p_id: '0',
            sup_id: '0',
            sup_acc_id: '0'
        },
        /**
         * 测试数据
         */
        list3: [],
        list1: [],
        /**
         * 关联模态框数据
         */
        list2: {
            pro: [],
            manage: [],
            account: []
        },
        /**
         * 
         */
        accountChange: {
            dotId: 0,

        },
        /**
         * 网点列表数据
         */
        listUser: {
            oneList: [
                {
                    dotId: 2,
                    parentId: 1,
                    dotName: '长沙分公司'
                },
                {
                    dotId: 3,
                    parentId: 1,
                    dotName: '株洲分公司'
                }
            ],
            twoList: [
                {
                    dotId: 4,
                    parentId: 2,
                    dotName: '岳麓区网点'
                },
                {
                    dotId: 4,
                    parentId: 2,
                    dotName: '天心区网点'
                },
                {
                    dotId: 4,
                    parentId: 2,
                    dotName: '芙蓉区网点'
                },
                {
                    dotId: 4,
                    parentId: 2,
                    dotName: '雨花区网点'
                },
            ],
            nav_: [],
            rol: []
        },
    },
    methods: {
        setAccount: function (obj) {

            this.accountChange = obj;
            this.refreshRol();
            /**
             *对一级导航栏进行循环，判断每个一级导航栏账号是否具有权限，如果有权限则对其进行填充，再进入二级栏判断
             *对二级导航栏进行循环，判断每个二级导航栏账号是否具有权限，有则进行填充
             */
            //一级导航栏权限循环
            for (let l_j = 0; l_j < this.listUser.nav.length; l_j++) {
                //账号的权限列表
                for (let o_i = 0; o_i < obj.nav.length; o_i++) {
                    //判断是否有一级导航栏权限
                    if (this.listUser.nav[l_j].id == obj.nav[o_i]) {
                        //添加填充
                        this.listUser.nav[l_j].tagle = 1;
                        //二级导航栏权限循环
                        for (let x = 0; x < this.listUser.nav[l_j].li.length; x++) {
                            for (let o_j = 0; o_j < obj.nav.length; o_j++) {
                                //判断是否有二级导航栏权限
                                if (this.listUser.nav[l_j].li[x].id == obj.nav[o_j]) {
                                    this.listUser.nav[l_j].li[x].tagle = 1;
                                }
                            }
                        }
                    }
                }
            }

        },

        /**
         * 改变权限
         * 根据接收的id来来改变当前的状态
         * 如果id为一级导航栏目，则该栏目下的二级导航权限也会随之改变
         * 改变二级导航栏，一级导航权限也会自动改变
         */
        setRole: function (id) {
            for (let l_j = 0; l_j < this.listUser.nav.length; l_j++) {
                if (this.listUser.nav[l_j].id == id) {
                    if (this.listUser.nav[l_j].tagle == 1) {
                        this.listUser.nav[l_j].tagle = 0;
                        for (let x = 0; x < this.listUser.nav[l_j].li.length; x++) {
                            this.listUser.nav[l_j].li[x].tagle = 0;
                        }
                    } else {
                        this.listUser.nav[l_j].tagle = 1;
                        for (let x = 0; x < this.listUser.nav[l_j].li.length; x++) {
                            this.listUser.nav[l_j].li[x].tagle = 1;
                        }
                    }
                } else {
                    for (let x = 0; x < this.listUser.nav[l_j].li.length; x++) {
                        if (this.listUser.nav[l_j].li[x].id == id) {
                            if (this.listUser.nav[l_j].li[x].tagle == 1) {
                                this.listUser.nav[l_j].li[x].tagle = 0;
                            } else {
                                this.listUser.nav[l_j].tagle = 1;
                                this.listUser.nav[l_j].li[x].tagle = 1;
                            }
                        }
                    }
                }
            }
        },

        //权限重置
        refreshRol: function () {
            for (let l_j = 0; l_j < this.listUser.nav.length; l_j++) {
                this.listUser.nav[l_j].tagle = 0;
                for (let x = 0; x < this.listUser.nav[l_j].li.length; x++) {
                    this.listUser.nav[l_j].li[x].tagle = 0;
                }
            }
        },

        /**
         * 修改数据提交
         */
        updateSubmit: function () {
            if(this.accountChange.id == 0){
                toastr.warning('请选择账号！');
                return false;
            }
            let arr = [];
            //获得权限数组
            for (let l_j = 0; l_j < this.listUser.nav.length; l_j++) {
                if (this.listUser.nav[l_j].tagle == 1) {
                    arr.push(this.listUser.nav[l_j].id);
                    for (let x = 0; x < this.listUser.nav[l_j].li.length; x++) {
                        if (this.listUser.nav[l_j].li[x].tagle == 1) {
                            arr.push(this.listUser.nav[l_j].li[x].id);
                        }
                    }
                }
            }
            this.accountChange.nav = arr;
            axios.post(this.apiurl + 'api/v2/user/updateRole', this.accountChange)
                .then(
                    (res) => {
                        if (res.data) {
                            toastr.success('修改成功！');
                        } else {
                            toastr.error('修改失败！');
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
         * 添加账号提交
         */
        addSubmit: function () {
            if (this.modalAdd.dotName == '') {
                toastr.warning('请填写完整的信息！');
                return false;
            }
            axios.get(this.apiurl + 'api/v2/user/saveUser', {
                params: {
                    dotName: this.modalAdd.dotName
                }
            })
                .then(
                    (res) => {
                        if (res.data == 1) {
                            toastr.success('添加成功！');
                            this.modalAdd = {          //添加模态框
                                dotName: '',
                            }
                            this.listlimit();
                        } else if (res.data == -1) {
                            toastr.error('账号已存在失败！');
                        } else {
                            toastr.error('添加失败！');
                        }

                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.error('添加失败！');
                    }
                );
        },

        /**
         * 修改数据
         */
        updateUser: function () {
            axios.get(this.apiurl + 'api/v2/user/updateUser',
                {
                    params: {
                        id: this.modalUpdate.id,
                        username: this.modalUpdate.username,
                        rol_id: this.modalUpdate.rol.id
                    }
                })
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

                    }
                );
        },

        /**
         * 删除数据
         * @param {} id 
         */
        deleteUser: function (id) {
            if (confirm("是否确定删除？")) {
                axios.get(this.apiurl + 'api/v2/user/updateState',
                    {
                        params: {
                            id: id,
                            tagle: 0
                        }
                    })
                    .then(
                        (res) => {
                            if (res.data) {
                                toastr.success('删除成功！');
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
                        //toastr.error('注销失败！');
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
         * 
         */
        account_change: function () {
            /**
             * 获取市州人防办账号列表
             */
            axios.get(this.apiurl + 'api/v2/supplierAccount/getListById',
                {
                    params: {
                        sup_id: this.modelAccount.sup_id,
                    }
                })
                .then(
                    (res) => {
                        this.list2.account = res.data;
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.error('获取列表失败！');
                    }
                );
        },
        sumbitmodelChange: function () {
            axios.get(this.apiurl + 'api/v2/supplierAccount/relation',
                {
                    params: {
                        p_id: this.modelAccount.p_id,
                        sup_acc_id: this.modelAccount.sup_acc_id
                    }
                })
                .then(
                    (res) => {
                        if (res.data) {
                            toastr.success('分配项目成功！');
                        } else {
                            toastr.error('分配项目失败！');
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
         * 重置密码
         */
        refreshPwd: function () {
            if (confirm("是否重置密码？")) {
                axios.get(this.apiurl + 'api/v2/user/refreshPwd',
                    {
                        params: {
                            id: this.modalUpdate.id,
                        }
                    })
                    .then(
                        (res) => {
                            if (res.data) {
                                toastr.success('重置密码成功！');
                            } else {
                                toastr.error('重置密码失败！');
                            }
                        }
                    )
                    .catch(
                        (error) => { console.log(error); }
                    );
            }
        },



        /**
         * 关联合同模态框获得数据
         * @param {*} obj 
         */
        projectHt: function (obj) {
            this.moldeHt.id = obj.id;

        },

        listlimit: function () {
            axios.get(this.apiurl + 'api/v2/user/getListAll',
                {
                    params: {
                        level: '1',
                    }
                })
                .then(
                    (res) => {
                        this.listUser.account = res.data;
                    }
                )
                .catch(
                    (error) => { console.log(error); }
                );
        },
        numsByPosition: function () {
            axios.get(this.apiurl + 'api/v2/db/numBySupplierApply',
                {
                    params: {
                        state: '1',
                        search: this.beanSearch
                    }
                })
                .then(
                    (res) => {
                        this.limitData.nums = res.data;
                    }
                )
                .catch(
                    (error) => { console.log(error); }
                );
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

        //HTTP GET 请求-获得列表数据总条数
        axios.get(this.apiurl + 'api/v2/db/numBySupplierApply',
            {
                params: {
                    state: '1',
                    search: this.beanSearch
                }
            })
            .then(
                (res) => {
                    this.limitData.nums = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );

        /**
         * 获得分页详细列表
         */
        axios.get(this.apiurl + 'api/v2/supplierAccount/getListByLimit',
            {
                params: {
                    state: '1',
                    page_no: this.limitData.page,
                    page_line: this.limitData.line,
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
        /**
         * 获得归属处室下拉框数据
         */
        axios.get(this.apiurl + 'api/v2/db/getDropdown',
            {
                params: {
                    typecode: 'DICT02',
                }
            })
            .then(
                (res) => {
                    this.positionList = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );

        /**
         * 获得归属处室下拉框数据
         */
        axios.get(this.apiurl + 'api/v2/supplier/getByList')
            .then(
                (res) => {
                    this.list1 = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        /**
         * 获得所有项目数据
         */
        axios.get(this.apiurl + 'api/v2/project/getListByAll')
            .then(
                (res) => {
                    this.list2.pro = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        /**
         * 获得所有导航列表
         */
        axios.get(this.apiurl + 'api/v2/nav/getListAll',
            {
                params: {
                    level: '1',
                }
            })
            .then(
                (res) => {
                    this.listUser.nav = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );

        /**
         * 获得所有账号数据
         */
        axios.get(this.apiurl + 'api/v2/user/getListAll',
            {
                params: {
                    level: '1',
                }
            })
            .then(
                (res) => {
                    this.listUser.account = res.data;
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