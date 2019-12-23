/*** 项目督办 vue实例 ***/

new Vue({
    el: '#app',
    data: {

        apiurl: '',
        ProjectTagle: '项目督办',
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
            parent_id: 2,
            id: 23,
            title: '项目督办',
            text: '',
            position: [
                {
                    name: '建设',
                    img: 'fa fa-windows',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '项目督办',
                    img: '',
                    url: 'buildSupervise.html'
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
        },
        beanSearch: '',         //搜索
        modalUpdate: {          //修改模态框
            p_id: {
                p_id: '0'
            },
            sup_person: '',
            sup_text: '',
            sup_time: '',
            project_situation: '',
            feedback_person: '',
            feedback_text: '',
        },

        modalAdd: {          //添加模态框
            p_id: {
                p_id: '0'
            },
            sup_person: '',
            sup_text: '',
            sup_time: '',
            project_situation: '',
            feedback_person: '',
            feedback_text: '',
        },
        modalFile: {          //文件上传模态框
            p_id: '',
            p_name: '',
            bid_fileName: '',
            bid_fileUrl: '',
            p_tagle: '项目督办'
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
        /**
         * 项目详情页面数据
         */
        projectContent: {

        },
        contentHtModel: [],
        /**
         * 测试数据-合同列表
         */
        listHT: [
            {
                id: '1',
                no: '湘财采计[2017]006072号',
                name: 'XX厅信息系统安全等级保护整改建设项目采购合同',
                postion: '信息中心',
                money: '10000',
                time: '2017-10-25',
                tagle: '正常'
            },
            {
                id: '2',
                no: '湘财采计[2017]006073号',
                name: 'XX厅信息系统安全建设项目采购合同',
                postion: '办公室',
                money: '85000',
                time: '2017-10-25',
                tagle: '终止'
            }
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
                        if(res.data){
                            toastr.success('成功解除关联！');
                        }else {
                            toastr.error('解除关联失败！');
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
         * 刷新内容详情列表数据
         */
        refreshContent: function () {
            axios.get(this.apiurl + 'api/v2/contract/getListById',
                {
                    params: {
                        p_id: this.moldeHt.p_id,
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
         * 添加改变选择项目
         */
       

        /**
         * 修改模态框获得数据数据
         * @param {*} obj 
         */
        update: function (obj) {
            this.modalUpdate = obj;

            //对时间格式进行转码
            this.modalUpdate.sup_time = obj.sup_time.substr(0, 10);

        },

        /**
         * 修改数据提交
         */
        updateSubmit: function () {
            axios.post(this.apiurl + 'api/v2/supervise/update', this.modalUpdate)
                .then(
                    (res) => {
                        if(res.data){
                            toastr.success('修改成功！');
                            this.listlimit();
                        }else{
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
                            toastr.error('上传到服务器失败！');
                        }
                    })
                } else {
                    toastr.warning('模板文件大小超过限制！');
                }
            } else {
                toastr.warning('上传文件格式错误！');
            }
        },

        /**
         * 添加数据提交
         */
        addSubmit: function () {
            if (this.modalAdd.p_id.p_id == 0 || this.modalAdd.sup_person == '' || this.modalAdd.sup_text == '' || this.modalAdd.project_situation == ''
                || this.modalAdd.sup_time == '') {
                toastr.warning('请填写完整的信息！');
                return false;
            }
            axios.post(this.apiurl + 'api/v2/supervise/save', this.modalAdd)
                .then(
                    (res) => {
                        if (res.data) {
                            toastr.success('添加成功！');
                            this.modalAdd = {          //添加模态框
                                p_id: {
                                    p_id: '0'
                                },
                                sup_person: '',
                                sup_text: '',
                                sup_time: '',
                                project_situation: '',
                                feedback_person: '',
                                feedback_text: '',
                            }
                            this.numsByPosition();
                            this.listlimit();
                        }else{
                            toastr.error('添加失败！');
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
            this.modalFile = obj;

        },

        fileSubmit: function () {
            var name = '';
            //判断文件是否非空
            if ($('#updateFile')[0].files[0] != null) {
                name = $('#updateFile')[0].files[0].name;
                this.modalFile.bid_fileName = name;
                this.modalFile.bid_fileUrl = 'File/tendering/' + name;
                axios.post(this.apiurl + 'api/v2/project/tendering/updateFile', this.modalFile)
                    .then(
                        (res) => {
                            if(res.data){
                                toastr.success('添加成功！');
                                this.listlimit();
                            }else{
                                toastr.error('添加失败！');
                            }
                        }
                    )
                    .catch(
                        (error) => {
                            console.log(error);
                        }
                    );
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
            axios.get(this.apiurl + 'api/v2/supervise/delete',
                {
                    params: {
                        id: id,
                    }
                })
                .then(
                    (res) => {
                        if(res.data){
                            toastr.success('删除成功！');
                            this.numsByPosition();
                            this.listlimit();
                        }else {
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

        /**
         * excel导出
         */
        excelExport: function () {
            let e = {
                fileName: '督办列表.xls',
                sheetName: '督办',
                key: ['ID', '督办人', '督办内容', '督办时间', '项目进度情况', '反馈人', '反馈内容'],
                value: ['id', 'sup_person', 'sup_text', 'sup_time', 'project_situation', 'feedback_person', 'feedback_text'],
                screen: {
                    state: '1',
                    page_no: this.limitData.page,
                    page_line: this.limitData.line,
                    sup_time: this.beanChange.beanYear,
                    search: this.beanSearch
                }
            };
            axios.post(this.apiurl + 'api/v2/db/excelExportBySupervise', e)
                .then(
                    (res) => {
                        if (res.data == true) {
                            toastr.success('导出成功！');
                            window.open("api/v2/db/dowlond?fileurl=File/excel/export/督办列表.xls");
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
         * 关联合同模态框获得数据
         * @param {*} obj 
         */
        projectHt: function (obj) {
            this.moldeHt.p_id = obj.p_id;

        },
        /**
         * 关联合同模态框提交
         */
        projectHtSumbit: function () {
            console.log(this.moldeHt);

            axios.get(this.apiurl + 'api/v2/contract/relation',
                {
                    params: {
                        p_id: this.moldeHt.p_id,
                        c_id: this.moldeHt.c_id
                    }
                })
                .then(
                    (res) => {
                        toastr.success('关联成功！');
                        axios.get(this.apiurl + 'api/v2/contract/getListById',
                            {
                                params: {
                                    p_id: this.moldeHt.p_id,
                                }
                            })
                            .then(
                                (res) => {
                                    this.listHT = res.data;
                                }
                            )
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.error('关联失败!');
                    }
                );

        },

        listlimit: function () {
            axios.get(this.apiurl + 'api/v2/supervise/getListByLimit',
                {
                    params: {
                        state: '1',
                        page_no: this.limitData.page,
                        page_line: this.limitData.line,
                        p_year: this.beanChange.beanYear,
                        search: this.beanSearch
                    }
                })
                .then(
                    (res) => {
                        console.log(res.data);
                        this.limitData.list = res.data;
                    }
                )
                .catch(
                    (error) => { console.log(error); }
                );
        },
        numsByPosition: function () {
            axios.get(this.apiurl + 'api/v2/db/numBySupervise',
                {
                    params: {
                        state: '1',
                        p_year: this.beanChange.beanYear,
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
        axios.get(this.apiurl + 'api/v2/db/numBySupervise',
            {
                params: {
                    state: '1',
                    p_year: this.beanChange.beanYear,
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
        axios.get(this.apiurl + 'api/v2/supervise/getListByLimit',
            {
                params: {
                    state: '1',
                    page_no: this.limitData.page,
                    page_line: this.limitData.line,
                    p_year: this.beanChange.beanYear,
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
         * 获得统筹类型下拉框数据
         */
        axios.get(this.apiurl + 'api/v2/db/getDropdown',
            {
                params: {
                    typecode: 'DICT03',
                }
            })
            .then(
                (res) => {
                    this.overall_typeList = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        /**
         * 获得模态框项目列表
         */
        axios.get(this.apiurl + 'api/v2/project/getListByDropdown',
            {
                params: {
                    p_tagle: '签订合同',
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
        /**
         * 获得分页合同详细列表
         */
        axios.get(this.apiurl + 'api/v2/contract/getListByLimitAll'
        )
            .then(
                (res) => {
                    this.contentHtModel = res.data;
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