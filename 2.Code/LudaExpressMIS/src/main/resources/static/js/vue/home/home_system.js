/*** 系统设置 vue实例 ***/

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
            is_welcome: '',
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
            title: '系统设置',
            text: '个性化管理，系统参数管理，操作日志管理，帮助手册',
            position: [
                {
                    name: '系统设置',
                    img: 'fa fa-gear',
                    url: 'systemManage.html'
                }

            ]
        },

        /**
         * 右侧内容页展示状态
         */
        contentTagle: true,

        /**
         * 文件位置
         */
        fileAddress: 'File\\',
        fileList: {},
        changeTagle: 'home',
        /**
         * 字段类型列表
         */
        typeList: {},


        positionList: [

        ],
        beanChange: {       //过滤条件
            beanPosition: '0',
            beanYear: '0',
        },
        beanSearch: '',         //搜索
        modalUpdate: {          //修改模态框
            id: '',
            a_return: '',
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
            url: ''
        },

        /**
         * 关联合同模态框
         */
        moldeHt: {
            id: '',
            htid: '0',
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
            this.fileAddress = 'File\\',
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
         * 页面状态改变
         */
        changeCard: function (name) {
            this.changeTagle = name;
        },

        /**
         * 修改状态
         * @param {*} obj 
         */
        update: function (obj, tagle) {
            if (obj == 'is_welcome') {
                this.user.is_welcome = tagle;
            } else if (obj == 'is_bubble') {
                this.user.is_bubble = tagle;
            }
            axios.get(this.apiurl + 'api/v2/user/updateTagle',
                {
                    params: {
                        tagle: tagle,
                        name: obj
                    }
                })
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
         * 筛选值改变触发方法，按值去查询
         */
        beanPosition_change: function () {
            this.limitData.page = 1;
            this.numsByPosition();
            this.listlimit();
        },


        /**
         * 返回上一级
         * @param {*} obj 
         */
        returnFile: function () {
            this.fileAddress = this.fileAddress.substr(0, this.fileAddress.lastIndexOf('\\'));
            this.fileAddress = this.fileAddress.substr(0, this.fileAddress.lastIndexOf('\\') + 1);
            console.log(this.fileAddress);
            this.listlimit();
        },



        /**
         * 文件上传
         */
        fileUpload: function (name) {
            var filename = $('#' + name)[0].files[0].name;
            var arr = filename.split(".");
            if (arr[1] == 'doc' || arr[1] == 'docx' || arr[1] == 'xls' || arr[1] == 'xlsx') {
                if ($('#' + name)[0].files[0].size.toFixed(1) < 20 * 1024 * 1024) {
                    var formData = new FormData();
                    formData.append('file', $('#' + name)[0].files[0]);
                    formData.append('url', this.modalFile.url);
                    $.ajax({
                        url: this.apiurl + 'api/v2/db/fileUpload',
                        data: formData,
                        type: "POST",
                        dataType: "json",
                        cache: false,			//上传文件无需缓存
                        processData: false,		//用于对data参数进行序列化处理 这里必须false
                        contentType: false,
                        success: function (res) {
                            toastr.success('成功上传到服务器！');
                        },
                        failure: function (res) {
                            toastr.danger('上传到服务器失败！');
                        }
                    })
                } else {
                    toastr.warning('模板文件大小超过限制！');
                }

            } else {
                toastr.warning('请上传正确的模板文件！');
            }
        },

        /**
         * 文件上传数据更新
         * @param {*} obj 
         */
        file: function (obj) {
            this.modalFile.url = this.fileAddress.substring(5, this.fileAddress.length) + obj;
        },


        /**
         * 删除数据
         * @param {} id 
         */
        deleteFile: function (id) {
            axios.get(this.apiurl + 'api/v2/db/delete',
                {
                    params: {
                        fileurl: this.fileAddress + '\\' + id,
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
        },


        listlimit: function () {
            axios.get(this.apiurl + 'api/v2/db/list',
                {
                    params: {
                        fileurl: this.fileAddress,
                    }
                })
                .then(
                    (res) => {
                        this.fileList = res.data;
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





        /**
         * 获得字段列表
         */
        axios.get(this.apiurl + 'api/v2/dict/getDictTypeList')
            .then(
                (res) => {
                    this.typeList = res.data;
                    console.log(res.data);
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