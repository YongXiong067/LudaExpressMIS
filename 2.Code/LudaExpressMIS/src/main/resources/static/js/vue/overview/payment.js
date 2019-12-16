/*** 付款总览 vue实例 ***/

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

        systemNews: [],


        /**
         * 页面内容标题栏导航
         */
        pagePosition: {
            parent_id: 5,
            id: 52,
            title: '付款总览',
            text: '左右方向键可以控制横向滚动条移动',
            position: [
                {
                    name: '总览',
                    img: 'fa fa-bar-chart-o',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '付款总览',
                    img: '',
                    url: 'paymentOverview.html'
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
            p_id: '',
            p_name: '',
            position: '',
            examine_money: '',
            overall_type: '',
            approval_time: '',
            p_tagle: '项目立项',

        },
        modalAdd_project: {
            p_id: '',
            p_name: '',
            declare_money: '',
            position: '',
            warehousing_time: '',
            examine_money: '',
            overall_type: '',
            approval_time: '',
            approval_fileName: '',
            approval_fileUrl: '',
            p_tagle: '项目立项'
        },
        modalAdd_ht: {
            c_id: '0',
        },
        modalAdd: {          //添加模态框
            p_id: '0',
            c_id: '0',
            batch: '',
            pay_money: '',
            pay_explain: '',
            pay_time: '',
        },
        modalFile: {          //文件上传模态框
            p_id: '',
            p_name: '',
            approval_fileName: '',
            approval_fileUrl: '',
            p_tagle: '项目立项'
        },
        modalShow: {
            shows: {
                p_id: '1',
                p_name: '1',
                declare_money: '1',
                position: '1',
                warehousing_time: '1',
                warehousing_fileName: '1',
                examine_money: '1',
                overall_type: '1',
                approval_time: '1',
                approval_fileName: '1',
                approval_fileUrl: '1',
                planning_type: '1',
                contractor: '1',
                payable_money: '1',
                payment_money: '1',
                planning_type: '1',
                pay_id: '1',
                batch: '1',
                pay_money: '1',
                pay_explain: '1',
                pay_fileName: '1',
                pay_time: '1',
                p_money: '1'
            }
        },

        /**
         * 关联合同模态框
         */
        moldeHt: {
            id: '',
            htid: '0',
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

        /**
         * 测试数据-合同列表
         */
        listHT: [],

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
        modelAdd_change: function () {
            for (let i = 0; i < this.list1.length; i++) {
                if (this.modalAdd.p_id == this.list1[i].p_id) {
                    //this.modalAdd_project = this.list1[i];
                    this.modalAdd_ht.c_id = '0';
                    axios.get(this.apiurl + 'api/v2/contract/getListById',
                        {
                            params: {
                                p_id: this.modalAdd.p_id,
                            }
                        })
                        .then(
                            (res) => {
                                this.listHT = res.data;
                            }
                        );
                }
            }
        },

        /**
         * 修改模态框获得数据数据
         * @param {*} obj 
         */
        update: function (obj) {
            this.modalUpdate.p_id = obj.p_id;
            this.modalUpdate.p_name = obj.p_name;
            this.modalUpdate.position = obj.position;
            this.modalUpdate.examine_money = obj.examine_money;
            this.modalUpdate.overall_type = obj.overall_type;
            //对时间格式进行转码
            this.modalUpdate.approval_time = obj.approval_time.substr(0, 10);

        },

        /**
         * 修改数据提交
         */
        updateSubmit: function () {
            axios.post(this.apiurl + 'api/v2/project/approval/update', this.modalUpdate)
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
         * 显示列表模态框
         */
        change_shows: function (obj, tagle) {
            switch (obj) {
                case 'p_id':
                    this.modalShow.shows.p_id = tagle;
                    break;
                case 'p_name':
                    this.modalShow.shows.p_name = tagle;
                    break;
                case 'position':
                    this.modalShow.shows.position = tagle;
                    break;
                case 'declare_money':
                    this.modalShow.shows.declare_money = tagle;
                    break;
                case 'warehousing_time':
                    this.modalShow.shows.warehousing_time = tagle;
                    break;
                case 'warehousing_fileName':
                    this.modalShow.shows.warehousing_fileName = tagle;
                    break;
                case 'examine_money':
                    this.modalShow.shows.examine_money = tagle;
                    break;
                case 'approval_time':
                    this.modalShow.shows.approval_time = tagle;
                    break;
                case 'approval_fileName':
                    this.modalShow.shows.approval_fileName = tagle;
                    break;
                case 'overall_type':
                    this.modalShow.shows.overall_type = tagle;
                    break;
                case 'contractor':
                    this.modalShow.shows.contractor = tagle;
                    break;
                case 'pay_id':
                    this.modalShow.shows.pay_id = tagle;
                    break;
                case 'batch':
                    this.modalShow.shows.batch = tagle;
                    break;
                case 'pay_money':
                    this.modalShow.shows.pay_money = tagle;
                    break;
                case 'pay_explain':
                    this.modalShow.shows.pay_explain = tagle;
                    break;
                case 'pay_fileName':
                    this.modalShow.shows.pay_fileName = tagle;
                    break;
                case 'pay_time':
                    this.modalShow.shows.pay_time = tagle;
                    break;
                case 'planning_type':
                    this.modalShow.shows.planning_type = tagle;
                    break;
                case 'payable_money':
                    this.modalShow.shows.payable_money = tagle;
                    break;
                case 'payment_money':
                    this.modalShow.shows.payment_money = tagle;
                    break;
                case 'progress':
                    this.modalShow.shows.progress = tagle;
                    break;
                case 'p_money':
                    this.modalShow.shows.p_money = tagle;
                    break;
            }
        },

        ShowSubmit: function () {
            axios.post(this.apiurl + 'api/v2/show/update', this.modalShow.shows)
                .then(
                    (res) => {
                        if (res.data) {
                            toastr.success('成功保存到云端！');
                            this.listlimit();
                        } else {
                            toastr.error('保存失败！');
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
        },

        /**
         * 添加数据提交
         */
        addSubmit: function () {

            axios.post(this.apiurl + 'api/v2/project/approval/update', this.modalAdd)
                .then(
                    (res) => {
                        if (res.data) {
                            toastr.success('添加成功！');
                            this.modalAdd = {
                                p_id: '0',
                                c_id: '0',
                                batch: '',
                                pay_money: '',
                                pay_explain: '',
                                pay_time: ''
                            },
                                this.numsByPosition();
                            this.listlimit();
                        } else {
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
         * excel导出
         */
        excelExport: function () {
            let arr_key = [];
            let arr_value = [];

            if (this.modalShow.shows.pay_id == '1') {
                arr_key.push('ID');
                arr_value.push('pay_id');
            }
            if (this.modalShow.shows.batch == '1') {
                arr_key.push('付款批次');
                arr_value.push('batch');
            }
            if (this.modalShow.shows.pay_money == '1') {
                arr_key.push('付款金额');
                arr_value.push('pay_money');
            }
            if (this.modalShow.shows.pay_explain == '1') {
                arr_key.push('付款说明');
                arr_value.push('pay_explain');
            }
            if (this.modalShow.shows.pay_fileName == '1') {
                arr_key.push('付款附件');
                arr_value.push('pay_fileName');
            }
            if (this.modalShow.shows.pay_time == '1') {
                arr_key.push('付款日期');
                arr_value.push('pay_time');
            }
            if (this.modalShow.shows.p_money == '1') {
                arr_key.push('历史金额');
                arr_value.push('p_money');
            }
            if (this.modalShow.shows.p_id == '1') {
                arr_key.push('项目ID');
                arr_value.push('p_name');
            }

            console.log(arr_key);
            console.log(arr_value);
            let e = {
                fileName: '付款总览列表.xls',
                sheetName: '总览',
                key: arr_key,
                value: arr_value,
                screen: {
                    state: '1',
                    page_no: this.limitData.page,
                    page_line: this.limitData.line,
                    pay_time: this.beanChange.beanYear,
                    search: this.beanSearch
                }
            };
            axios.post(this.apiurl + 'api/v2/db/excelExportByPay', e)
                .then(
                    (res) => {
                        if (res.data == true) {
                            toastr.success('导出成功！');
                            window.open("api/v2/db/dowlond?fileurl=File/excel/export/付款总览列表.xls");
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
         * 文件上传数据更新
         * @param {*} obj 
         */
        file: function (obj) {
            this.modalFile.p_id = obj.p_id;
            this.modalFile.p_name = obj.p_name;
            this.modalFile.approval_fileName = obj.approval_fileName;
            this.modalFile.approval_fileUrl = obj.approval_fileUrl;
        },

        fileSubmit: function () {
            var name = '';
            //判断文件是否非空
            if ($('#updateFile')[0].files[0] != null) {
                name = $('#updateFile')[0].files[0].name;
                this.modalFile.approval_fileName = name;
                this.modalFile.approval_fileUrl = 'File/approval/' + name;
                axios.post(this.apiurl + 'api/v2/project/approval/updateFile', this.modalFile)
                    .then(
                        (res) => {
                            if (res.data) {
                                toastr.success('添加成功！');
                                this.listlimit();
                            } else {
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
            axios.get(this.apiurl + 'api/v2/payment/delete',
                {
                    params: {
                        pay_id: id,
                    }
                })
                .then(
                    (res) => {
                        if (res.data == 1) {
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

        /**
         * 关联合同模态框获得数据
         * @param {*} obj 
         */
        projectHt: function (obj) {
            this.moldeHt.id = obj.id;

        },
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

        listlimit: function () {
            axios.get(this.apiurl + 'api/v2/payment/getListByLimit',
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
        },
        numsByPosition: function () {
            axios.get(this.apiurl + 'api/v2/db/numsByPayment',
                {
                    params: {
                        state: '1',
                        p_year: this.beanChange.beanYear,
                        search: ''
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
        //HTTP GET 请求-获得当前登录用户信息
        axios.get(this.apiurl + 'api/v2/show/getShow')
            .then(
                (res) => {
                    console.log(res.data);
                    this.modalShow.shows = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        //HTTP GET 请求-获得列表数据总条数
        axios.get(this.apiurl + 'api/v2/db/numsByPayment',
            {
                params: {
                    state: '1',
                    p_year: this.beanChange.beanYear,
                    search: ''
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
        axios.get(this.apiurl + 'api/v2/payment/getListByLimit',
            {
                params: {
                    state: '1',
                    page_no: this.limitData.page,
                    page_line: this.limitData.line,
                    p_year: '0',
                    search: ''
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
                    p_tagle: '付款',
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
        // var _this = this;
        // document.onkeydown = function (e) {
        //     let key = window.event.keyCode;
        //     if (key == 39) {
        //         _this.limit_page('next');
        //     }
        //     if (key == 37) {
        //         _this.limit_page('pre');
        //     }
        // };
    }

});