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
            parent_id: 13,
            id: 15,
            title: '申报记录',
            text: '',
            position: [
                {
                    name: '项目管理',
                    img: 'fa fa-clone',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '申报记录',
                    img: '',
                    url: 'supplierApply.html'
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
        positionList_: [

        ],
        beanChange: {           //过滤条件
            p_tagle: '0',
            state: '1',
            page_no: '',
            page_line: '',
            search: '',
            position: '0',
            overall_type: '0',
            warehousing_time: '0',
        },

        beanSearch: '',         //搜索
        modalUpdate: {          //修改模态框
            id: '',
            a_return: '',
        },
        modalAdd: {          //添加模态框
            id: '',
            position: '0',
            overall_type: '0',
            p_name: '',
            declare_money: '',
            examine_money: '',
            bid_money: '',
            warehousing_time: '',
            warehousing_fileName: '',
            warehousing_fileUrl: '',
            approval_fileName: '',
            approval_fileUrl: '',
            bid_fileName: '',
            bid_fileUrl: '',


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


        refreshData: function () {

        },

        /**
         * 添加改变选择项目
         */
        modelAdd_change_: function () {
            for (let i = 0; i < this.listHT.length; i++) {
                if (this.modalAdd.payment.c_id.c_id == this.listHT[i].c_id) {
                    //this.modalAdd_project = this.list1[i];
                    this.modalAdd.payment.text = this.listHT[i].mode;
                }
            }
        },

        /**
         * 修改模态框获得数据数据
         * @param {*} obj 
         */
        update: function (obj, tagle) {




        },

        /**
         * 修改数据提交
         */
        updateSubmit: function (id, a_tagle) {





            let apply = {
                id: id,
                a_tagle: a_tagle,
                a_return: this.modalUpdate.a_return
            };
            axios.post(this.apiurl + 'api/v2/supplierApply/update', apply)
                .then(
                    (res) => {
                        if (res.data) {
                            toastr.success('修改成功!');
                            this.listlimit();
                            this.modalUpdate.a_return = '';
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

        fileSubmit: function (name) {
            var obj = $('#' + name)[0].files[0];
            var name = '';
            //判断文件是否非空
            if (obj != null) {
                var filename = obj.name;
                var arr = filename.split(".");
                // var len = arr.length - 1;
                if (obj.size.toFixed(1) < 50 * 1024 * 1024) {
                    var formData = new FormData();
                    var url = this.user.userid;
                    formData.append('file', obj);
                    formData.append('url', url);
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
                            if(name == 'file_1' || name == 'file_5'){
                                this.modalAdd.warehousing_fileName = filename;
                                this.modalAdd.warehousing_fileUrl = 'File/'+url+'/'+filename;
                            }else if(name == 'file_2'){
                                this.modalAdd.approval_fileName = filename;
                                this.modalAdd.approval_fileUrl = 'File/'+url+'/'+filename;
                            }else if (name == 'file_3' || name == 'file_4') {
                                this.modalAdd.bid_fileName = filename;
                                this.modalAdd.bid_fileUrl = 'File/'+url+'/'+filename;
                            }
                            
                        },
                        failure: function (res) {
                            toastr.danger('上传到服务器失败！');
                        }
                    })
                } else {
                    toastr.warning('文件大小超过50M限制！');
                }
            } else {
                toastr.warning('选择文件再试试吧！');
            }

        },

        /**
         * 添加数据提交
         */
        addSubmit: function () {
            if(this.modalAdd.position == 0 || this.modalAdd.overall_type == 0 || this.modalAdd.p_name == '' || this.modalAdd.declare_money == '' ||
                this.modalAdd.examine_money == '' || this.modalAdd.bid_money == '' || this.modalAdd.warehousing_time == ''){
                toastr.warning('请填写完成的信息');
                return false;
            }
            
            axios.post(this.apiurl + 'api/v2/project/warehousing/save', this.modalAdd)
                .then(
                    (res) => {
                        toastr.success('添加成功！');
                        this.modalAdd = {
                            id: '',
                            position: '0',
                            overall_type: '0',
                            p_name: '',
                            declare_money: '',
                            examine_money: '',
                            bid_money: '',
                            warehousing_time: '',
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
            this.moldeHt.id = obj.id;

        },

        listlimit: function () {
            /**
             * 获得分页详细列表
             */
            axios.post(this.apiurl + 'api/v2/project/getListByLimit', this.beanParma)
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
            //HTTP GET 请求-获得列表数据总条数
            axios.post(this.apiurl + 'api/v2/db/nums', this.beanParma)
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
        axios.post(this.apiurl + 'api/v2/db/nums', this.beanParma)
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
        axios.post(this.apiurl + 'api/v2/project/getListByLimit', this.beanParma)
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
                    typecode: 'DICT03',
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
        axios.get(this.apiurl + 'api/v2/db/getDropdown',
            {
                params: {
                    typecode: 'DICT04',
                }
            })
            .then(
                (res) => {
                    this.positionList_ = res.data;
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
        },
        beanParma: function () {
            this.beanChange.page_no = this.limitData.page;
            this.beanChange.page_line = this.limitData.line;
            this.beanChange.search = this.beanSearch;
            return this.beanChange;
        },
        fileUrl: function () {
            return 'File/' + this.user.userid + '/';
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