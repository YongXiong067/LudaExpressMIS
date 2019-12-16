/*** 市州人防办管理 vue实例 ***/

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
            img_src: '',
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
            parent_id: 6,
            id: 51,
            title: '市州人防办管理',
            text: '',
            position: [
                {
                    name: '市州人防办',
                    img: 'fa fa-clone',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '市州人防办管理',
                    img: '',
                    url: 'supplierManage.html'
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
            sup_id: '',
            sup_name: '',
            phone: '',
            payee: '',
            opening_bank: '',
            bank_account: '',
            address: '',
        },
        modalAdd: {          //添加模态框
            sup_id: '',
            sup_name: '',
            phone: '',
            payee: '',
            opening_bank: '',
            bank_account: '',
            address: '',
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
         * 关联合同模态框
         */
        moldeHt: {
            sup_id: '0',
            id: '0',
        },

        /**
         * 详情页面数据
         */
        projectContent: {

        },
        /**
         * 测试数据-公共机房
         */
        list3: [],
        /**
         * 测试数据-合同列表
         */
        listHT: [
        ],
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
        updatePwd: function() {
            if(this.pwdModel.newpwd != this.pwdModel.newpwd_){
                toastr.error('两次密码不相同！');
            }else if(this.pwdModel.newpwd == '' || this.pwdModel.newpwd_ == '' || this.pwdModel.oldpwd == ''){
                toastr.error('密码不能为空！');
            }else {
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
                        if(res.data == 1){
                            toastr.success('修改成功！');
                        }else if(res.data == -1){
                            toastr.error('密码验证失败！');
                        }else {
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
         * 移除合同
         * @param {项目id} pid 
         * @param {合同id} cid 
         */
        removeHt: function (pid, cid) {
            axios.get(this.apiurl + 'api/v2/contract/relationRemove',
                {
                    params: {
                        p_id: pid,
                        c_id: cid
                    }
                })
                .then(
                    (res) => {
                        axios.get(this.apiurl + 'api/v2/contract/getListById',
                            {
                                params: {
                                    p_id: pid,
                                }
                            })
                            .then(
                                (res) => {
                                    console.log(res.data);
                                    this.listHT = res.data;
                                }
                            );


                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.error('关联失败！');
                    }
                );
        },

        /**
         * 进入详情界面
         * @param {*} obj 
         */
        contentChange: function (obj) {
            this.projectContent = obj;
            this.contentTagle = false;
            axios.get(this.apiurl + 'api/v2/supplierAccount/getListById',
                {
                    params: {
                        sup_id: obj.sup_id,
                    }
                })
                .then(
                    (res) => {
                        this.listHT = res.data;
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.error('获取列表失败！');
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
            this.modalUpdate.sup_id = obj.sup_id;
            this.modalUpdate.sup_name = obj.sup_name;
            this.modalUpdate.phone = obj.phone;
            this.modalUpdate.payee = obj.payee;
            this.modalUpdate.opening_bank = obj.opening_bank;
            this.modalUpdate.bank_account = obj.bank_account;
            this.modalUpdate.address = obj.address;
        },



        /**
         * 修改数据提交
         */
        updateSubmit: function () {
            axios.post(this.apiurl + 'api/v2/supplier/update', this.modalUpdate)
                .then(
                    (res) => {
                        toastr.success('修改成功！');
                        this.listlimit();
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
         * 删除数据
         * @param {} id 
         */
        deleteSup: function (id) {
        	if (confirm("是否确定删除？")) {
            axios.get(this.apiurl + 'api/v2/supplierAccount/delete',
                {
                    params: {
                        id: id,
                    }
                })
                .then(
                    (res) => {
                        toastr.success('删除成功！');
                        this.numsByPosition();
                        this.listlimit();
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.error('删除失败！');
                    }
                );
        	}
        },

        /**
         * 添加数据提交
         */
        addSubmit: function () {
            if (this.modalAdd.sup_name == '') {
                toastr.warning('请填写完整的信息！');
                return false;
            }
            axios.post(this.apiurl + 'api/v2/supplier/save', this.modalAdd)
                .then(
                    (res) => {
                        toastr.success('添加成功！');
                        modalAdd = {
                            sup_id: '',
                            sup_name: '',
                            phone: '',
                            payee: '',
                            opening_bank: '',
                            bank_account: '',
                            address: '',
                        }
                        this.numsByPosition();
                        this.listlimit();
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
         * 删除数据
         * @param {} id 
         */
        deleteSupplier: function (id) {
        	if (confirm("是否确定删除？")) {
            axios.get(this.apiurl + 'api/v2/supplier/delete',
                {
                    params: {
                        sup_id: id,
                    }
                })
                .then(
                    (res) => {
                        toastr.success('删除成功！');
                        this.numsByPosition();
                        this.listlimit();
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.error('删除失败！');
                    }
                );
        	}
        },

        /**
         * 关联合同模态框获得数据
         * @param {*} obj 
         */
        projectHt: function (obj) {
            //this.moldeHt.id = obj.id;

        },

        listlimit: function () {
            axios.get(this.apiurl + 'api/v2/supplier/getListByLimit',
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
        },
        numsByPosition: function () {
            axios.get(this.apiurl + 'api/v2/db/numBySupplier',
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
        axios.get(this.apiurl + 'api/v2/user/getLogin')
            .then(
                (res) => {
                    if (res.data.id == 0) {
                        window.location.href = "login.html";
                    } else {
                        this.user = res.data;
                    }
                }
            )
            .catch(
                (error) => { console.log(error); }
            );

        //HTTP GET 请求-获得列表数据总条数
        axios.get(this.apiurl + 'api/v2/db/numBySupplier',
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
        axios.get(this.apiurl + 'api/v2/supplier/getListByLimit',
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