/*** 项目入库 vue实例 ***/

new Vue({
    el: '#app',
    data: {

        apiurl: '',
        ProjectTagle: '项目入库',
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
            parent_id: 1,
            id: 12,
            title: '项目入库',
            text: '',
            position: [
                {
                    name: '立项',
                    img: 'fa fa-edit',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '项目入库',
                    img: '',
                    url: 'projectWarehousing.html'
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
            p_id: '',
            p_name: '',
            declare_money: '',
            position: '',
            document: '',
            warehousing_time: '',
        },
        modalAdd: {          //添加模态框
            p_name: '',
            declare_money: '',
            position: '0',
            document: '',
            warehousing_time: '',
            warehousing_fileName: '',
            warehousing_fileUrl: '',
            p_tagle: '项目入库'
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
                        toastr.danger('关联失败！');
                    }
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
            /**
             * 获取呈批件列表
             */
            axios.get(this.apiurl + 'api/v2/submit_approval/getByPId',
                {
                    params: {
                        p_id: obj.p_id,
                    }
                })
                .then(
                    (res) => {
                        this.listData.submitList = res.data;
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
            /**
             * 获取指标列表
             */
            axios.get(this.apiurl + 'api/v2/sign/getByPId',
                {
                    params: {
                        p_id: obj.p_id,
                    }
                })
                .then(
                    (res) => {
                        this.listData.signList = res.data;
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
            /**
             * 获取合同列表
             */
            axios.get(this.apiurl + 'api/v2/contract/getListById',
                {
                    params: {
                        p_id: obj.p_id,
                    }
                })
                .then(
                    (res) => {
                        this.listData.htList = res.data;
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
            /**
             * 获取督办列表
             */
            axios.get(this.apiurl + 'api/v2/supervise/getListById',
                {
                    params: {
                        p_id: obj.p_id,
                    }
                })
                .then(
                    (res) => {
                        this.listData.superviseList = res.data;
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
            /**
             * 获取付款记录列表
             */
            axios.get(this.apiurl + 'api/v2/payment/getListById',
                {
                    params: {
                        p_id: obj.p_id,
                    }
                })
                .then(
                    (res) => {
                        this.listData.paymentList = res.data;
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
            /**
             * 获取供应商列表
             */
            axios.get(this.apiurl + 'api/v2/supplierAccount/getListByPId',
                {
                    params: {
                        p_id: obj.p_id,
                    }
                })
                .then(
                    (res) => {
                        this.listData.supplierList = res.data;
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



        /* *******************项目详情所需方法-end********************** */

        /**
         * 修改模态框获得数据数据
         * @param {*} obj 
         */
        update: function (obj) {
            this.modalUpdate.p_id = obj.p_id;
            this.modalUpdate.p_name = obj.p_name;
            this.modalUpdate.position = obj.position;
            this.modalUpdate.document = obj.document;
            this.modalUpdate.declare_money = obj.declare_money;
            //对时间格式进行转码
            this.modalUpdate.warehousing_time = obj.warehousing_time.substr(0, 10);

        },

        /**
         * 修改数据提交
         */
        updateSubmit: function () {
            axios.post(this.apiurl + 'api/v2/project/warehousing/update', this.modalUpdate)
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

        // /**
        //  * 添加数据重置
        //  */
        // addRefresh: function () {
        //     this.modalAdd = {
        //         p_name: '',
        //         declare_money: '',
        //         position: '0',
        //         warehousing_time: '',
        //         warehousing_fileName: '',
        //         warehousing_fileUrl: '',
        //         p_tagle: 'IT0101'
        //     }
        // },

        /**
         * 文件上传
         */
        fileUpload: function (name) {
            var filename = $('#' + name)[0].files[0].name;
            var arr = filename.split(".");
            if (arr[1] == 'doc' || arr[1] == 'docx' || arr[1] == 'xls' || arr[1] == 'xlsx') {
                if ($('#' + name)[0].files[0].size.toFixed(1) < 20 * 1024 * 1024) {
                    var formData = new FormData();
                    var url = 'approval';
                    formData.append('file', $('#' + name)[0].files[0]);
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
        excelUpload: function (name) {
            var filename = $('#' + name)[0].files[0].name;
            var arr = filename.split(".");
            if (arr[1] == 'xlsx' || arr[1] == 'xls') {
                var formData = new FormData();
                var url = 'excel';
                formData.append('file', $('#' + name)[0].files[0]);
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
                    },
                    failure: function (res) {
                        toastr.danger('上传到服务器失败！');
                    }
                })
            } else {
                toastr.warning('请上传正确的模板文件！');
            }

        },
        /**
         * excel文件导入
         */
        excelImport: function () {
            var filename = $('#excelFile')[0].files[0].name
            axios.get(this.apiurl + 'api/v2/db/excelImport',
                {
                    params: {
                        fileurl: 'File/excel/' + filename,
                    }
                })
                .then(
                    (res) => {
                        if (res.data == true) {
                            toastr.success('导入成功！');
                            this.numsByPosition();
                            this.listlimit();
                        } else {
                            toastr.error('导入失败！');
                        }
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.error('导入失败！');
                    }
                );
        },
        /**
         * excel导出
         */
        excelExport: function () {
            let e = {
                fileName: '项目入库列表.xls',
                sheetName: '项目入库',
                key: ['ID', '项目名称', '归属处室', '申报金额', '入库时间', '项目申报资料'],
                value: ['p_id', 'p_name', 'position', 'declare_money', 'warehousing_time', 'warehousing_fileName'],
                screen: {
                    state: '1',
                    p_tagle: this.ProjectTagle,
                    page_no: this.limitData.page,
                    page_line: this.limitData.line,
                    position: this.beanChange.beanPosition,
                    warehousing_time: this.beanChange.beanYear,
                    search: this.beanSearch
                }
            };
            axios.post(this.apiurl + 'api/v2/db/excelExport', e)
                .then(
                    (res) => {
                        if (res.data == true) {
                            toastr.success('导出成功！');
                            window.open("api/v2/db/dowlond?fileurl=File/excel/export/项目入库列表.xls");
                        } else {
                            toastr.error('导出失败！');
                        }
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.error('导出失败！');
                    }
                );

        },

        /**
         * 添加数据提交
         */
        addSubmit: function () {
            if(this.modalAdd.warehousing_time == '' || this.modalAdd.p_name == ''|| this.modalAdd.declare_money == '' || this.modalAdd.position == 0){
                toastr.warning('请填写完整的信息！');
                return false;
            }
            
            var name = '';
            //判断文件是否非空
            if ($('#uploadFile')[0].files[0] != null) {
                name = $('#uploadFile')[0].files[0].name;
                var arr = name.split(".");
                this.modalAdd.warehousing_fileName = name;
                this.modalAdd.warehousing_fileUrl = 'File/approval/' + name;
            }

            axios.post(this.apiurl + 'api/v2/project/warehousing/save', this.modalAdd)
                .then(
                    (res) => {
                        if(res.data){
                            toastr.success('添加成功！');
                            this.modalAdd = {          //添加模态框
                                p_name: '',
                                declare_money: '',
                                position: '0',
                                warehousing_time: '',
                                warehousing_fileName: '',
                                warehousing_fileUrl: '',
                                document: '',
                                p_tagle: '项目入库'
                            },
                            this.numsByPosition();
                            this.listlimit();
                        }else{
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
         * 文件上传数据更新
         * @param {*} obj 
         */
        file: function (obj) {
            this.modalFile.p_id = obj.p_id;
            this.modalFile.p_name = obj.p_name;
            this.modalFile.warehousing_fileName = obj.warehousing_fileName;
            this.modalFile.warehousing_fileUrl = obj.warehousing_fileUrl;
        },

        fileSubmit: function () {
            var name = '';
            //判断文件是否非空
            if ($('#updateFile')[0].files[0] != null) {
                name = $('#updateFile')[0].files[0].name;
                var arr = name.split(".");
                if (arr[1] == 'doc' || arr[1] == 'docx' || arr[1] == 'xls' || arr[1] == 'xlsx') {
                    this.modalFile.warehousing_fileName = name;
                    this.modalFile.warehousing_fileUrl = 'File/approval/' + name;
                    axios.post(this.apiurl + 'api/v2/project/warehousing/updateFile', this.modalFile)
                        .then(
                            (res) => {
                                toastr.success('添加成功！');
                                this.listlimit();
                            }
                        )
                        .catch(
                            (error) => {
                                console.log(error);
                                toastr.error('添加失败！');
                            }
                        );
                } else {
                    toastr.warning('请上传正确的模板文件！');
                }
            } else {
                toastr.warning('选择文件再试试吧！');
            }


        },

        /**
         * 删除数据
         * @param {} id 
         */
        deleteProject: function (id) {
        	if (confirm("是否确定删除？")) {
            axios.get(this.apiurl + 'api/v2/project/delete',
                {
                    params: {
                        p_id: id,
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
                        toastr.danger('删除失败！');
                    }
                );
        	}
        },

        /**
         * 关联呈批件
         */
        relation: function () {
            axios.get(this.apiurl + 'api/v2/submit_approval/relation',
                {
                    params: {
                        p_id: this.moldePro.p_id,
                        sub_id: this.moldePro.sub_id,
                    }
                })
                .then(
                    (res) => {
                        toastr.success('关联成功！');
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.danger('关联失败！');
                    }
                );
        },

        /**
         * 关联合同模态框获得数据
         * @param {*} obj 
         */
        projectHt: function (obj) {
            this.moldeHt.id = obj.id;

        },

        listlimit: function () {
            axios.post(this.apiurl + 'api/v2/project/getListByLimit',
                {
                    state: '1',
                    p_tagle: this.ProjectTagle,
                    page_no: this.limitData.page,
                    page_line: this.limitData.line,
                    position: this.beanChange.beanPosition,
                    warehousing_time: this.beanChange.beanYear,
                    search: this.beanSearch
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
            axios.get(this.apiurl + 'api/v2/db/nums',
                {
                    params: {
                        state: '1',
                        p_tagle: this.ProjectTagle,
                        position: this.beanChange.beanPosition,
                        a_year: this.beanChange.beanYear,
                        w_year: '0',
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
        axios.get(this.apiurl + 'api/v2/db/nums',
            {
                params: {
                    state: '1',
                    p_tagle: this.ProjectTagle,
                    position: this.beanChange.beanPosition,
                    w_year: this.beanChange.beanYear,
                    a_year: '0',
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
        axios.post(this.apiurl + 'api/v2/project/getListByLimit',
            {
                state: '1',
                p_tagle: this.ProjectTagle,
                page_no: this.limitData.page,
                page_line: this.limitData.line,
                position: this.beanChange.beanPosition,
                warehousing_time: this.beanChange.beanYear,
                search: this.beanSearch
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
         * 获得呈批件数据
         */
        axios.get(this.apiurl + 'api/v2/submit_approval/getListByLimit',
            {
                params: {
                    state: '1',
                    page_no: this.limitData.page,
                    page_line: this.limitData.line,
                    sub_time: '0',
                    search: this.beanSearch
                }
            })
            .then(
                (res) => {
                    this.list1 = res.data;
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