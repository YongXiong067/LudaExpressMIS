/*** 付款信息 vue实例 ***/

new Vue({
    el: '#app',
    data: {

        apiurl: '',
        ProjectTagle: '付款',
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
            parent_id: 4,
            id: 41,
            title: '付款批次',
            text: '按批次选择项目来付款',
            position: [
                {
                    name: '付款',
                    img: 'fa fa-windows',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '付款批次',
                    img: '',
                    url: 'payment.html'
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
            state: '1',
            page_no: '',
            page_line: '',
            beanYear: '0',
            search: '',
            position: '0',
            overall_type: '0',
        },
        beanSearch: '',         //搜索
        modalUpdate: {          //修改模态框
            p_id: '',
            p_name: '',
            payment_agreement: '',
            supplementary_Payment: '',
            payable_money: '',
            p_tagle: '付款',
        },
        modalAdd_pay: {
            id: 0,
            money: 0,
            rSList: [],
            rMList: [],
            mList: []
        },
        modalAdd: {          //添加模态框
            name: '',
            remakes: '',
            money: '',
            nums: '',
            tagle: '未付款',
            pList: [],
        },
        modalFile: {          //文件上传模态框
            p_id: '',
            p_name: '',
            payment_fileName: '',
            payment_fileUrl: '',
            p_tagle: '付款'
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
        listHT: [],
        /**
         * 添加付款批次模态框数据
         */

        addData: {
            rPList: [],
            rSList: [],
            rMList: [],
            money: 0
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
            this.beanChange.p_tagle = '付款',
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
                        toastr.success('成功解除关联！');

                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.danger('解除关联失败！');
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
        modelAdd_change: function () {

            for (let i = 0; i < this.list1.length; i++) {

                if (this.modalAdd.p_id == this.list1[i].p_id) {
                    this.modalAdd_project = this.list1[i];
                }
            }

        },

        /**
         * 改变多选框数组
         * @param {*} i 
         * @param {*} tagle 
         */
        rChange: function (i, tagle) {
            if (tagle == 'add') {

                let con = {
                    p_id: '',
                    p_name: '',
                    c_id: '',
                    c_name: '',
                    paylist: '',
                    money: '',
                }
                con.p_id = this.addData.rPList[i].p_id;
                con.p_name = this.addData.rPList[i].p_name;

                axios.get(this.apiurl + 'api/v2/contract/getListById', {
                    params: {
                        p_id: this.addData.rPList[i].p_id,
                    }
                })
                    .then(
                        (res) => {
                            if(res.data.length == 0){
                                toastr.warning('该项目下暂无合同！');
                            }else {
                                console.log(res.data[0]);
                                con.c_id = res.data[0].c_id;
                                con.c_name = res.data[0].c_name;
                                con.paylist = res.data[0].paylist[res.data[0].mode].name;
                                con.money = res.data[0].signed_money * res.data[0].paylist[res.data[0].mode].per;
                                this.addData.money += con.money;
                                this.addData.rMList.push(con);
                            }
                            
                        }
                    )
                    .catch(
                        (error) => { console.log(error); }
                    );
                this.addData.rSList.push(this.addData.rPList[i]);
                this.addData.rPList.splice(i, 1);
            } else if (tagle == 'remove') {

                for (let j = 0; j < this.addData.rMList.length; j++) {
                    if (this.addData.rMList[j].p_id == this.addData.rSList[i].p_id) {
                        this.addData.money -= this.addData.rMList[j].money;
                        this.addData.rMList.splice(j, 1);
                    }

                }
                this.addData.rPList.push(this.addData.rSList[i]);
                this.addData.rSList.splice(i, 1);

            }
        },

        /**
         * 刷新数组
         */
        rChangeClearn: function () {

            this.addData.rMList = [];
            this.addData.rSList = [];
            this.addData.money = 0;
            axios.get(this.apiurl + 'api/v2/project/getListByAll')
                .then(
                    (res) => {
                        this.addData.rPList = res.data;
                    }
                )
                .catch(
                    (error) => { console.log(error); }
                );
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
            axios.post(this.apiurl + 'api/v2/project/payment/update', this.modalUpdate)
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
         * 付款
         */
        payAdd: function (obj) {
            this.modalAdd_pay = {
                id: 0,
                money: 0,
                rSList: [],
                rMList: [],
                mList: []
            }
            this.modalAdd_pay.id = obj.id;
            this.modalAdd_pay.money = obj.money;
            for (let i = 0; i < obj.pList.length; i++) {
                let con = {
                    p_id: '',
                    p_name: '',
                    c_id: '',
                    c_name: '',
                    paylist: '',
                    money: '',
                }
                axios.get(this.apiurl + 'api/v2/contract/getListById', {
                    params: {
                        p_id: obj.pList[i].p_id,
                    }
                })
                    .then(
                        (res) => {
                            con.c_id = res.data[0].c_id;
                            con.c_name = res.data[0].c_name;
                            con.paylist = res.data[0].paylist[obj.nList[i]].name;
                            con.money = res.data[0].signed_money * res.data[0].paylist[obj.nList[i]].per;
                            this.modalAdd_pay.rMList.push(con);
                            this.modalAdd_pay.mList.push(con.money);
                        }
                    )
                    .catch(
                        (error) => { console.log(error); }
                    );
                con.p_id = obj.pList[i].p_id;
                con.p_name = obj.pList[i].p_name;
                
            }
            console.log(this.modalAdd_pay.mList);


        },

        /**
         * 对批次进行付款
         */
        addPay: function () {
            
            axios.post(this.apiurl + 'api/v2/project/payment/addPay', this.modalAdd_pay)
                .then(
                    (res) => {
                        if(res.data){
                            toastr.success('付款成功！');
                            this.listlimit();
                        }
                    }
                )
                .catch(
                    (error) => { console.log(error); }
                );
        },

        /**
         * 添加数据提交
         */
        addSubmit: function () {
            this.modalAdd.money = this.addData.money;
            this.modalAdd.pList = this.addData.rSList;
            this.modalAdd.nums = this.addData.rSList.length;
            if (this.modalAdd.name == '' || this.modalAdd.money == 0) {
                toastr.warning('请填写完整的信息！');
                return false;
            }


            axios.post(this.apiurl + 'api/v2/project/payment/add', this.modalAdd)
                .then(
                    (res) => {
                        toastr.success('添加成功！');

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
                this.modalFile.payment_fileName = name;
                this.modalFile.payment_fileUrl = 'File/payment/' + name;
                axios.post(this.apiurl + 'api/v2/project/payment/updateFile', this.modalFile)
                    .then(
                        (res) => {
                            toastr.success('添加成功！');
                            this.listlimit();
                        }
                    )
                    .catch(
                        (error) => {
                            console.log(error);
                            toastr.danger('添加失败！');
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
                axios.get(this.apiurl + 'api/v2/project/payment/delete',
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
                            toastr.danger('删除失败！');
                        }
                    );
            }
        },

        /**
         * excel导出
         */
        excelExport: function () {
            this.beanChange.page_no = this.limitData.page;
            this.beanChange.page_line = this.limitData.line;
            this.beanChange.search = this.beanSearch;
            let e = {
                fileName: '项目付款信息列表.xlsx',
                sheetName: '项目付款信息',
                key: ['ID', '项目名称', '归属处室', '承建商', '应付款', '付款约定信息', '补进付款信息', '付款约定附件'],
                value: ['p_id', 'p_name', 'position', 'contractor', 'payable_money', 'payment_agreement', 'supplementary_Payment', 'payment_fileName'],
                screen: this.beanChange
            };
            axios.post(this.apiurl + 'api/v2/db/excelExport', e)
                .then(
                    (res) => {
                        if (res.data == true) {
                            toastr.success('导出成功！');
                            window.open("api/v2/db/dowlond?fileurl=File/excel/export/项目付款信息列表.xlsx");
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
                        toastr.danger('关联失败!');
                    }
                );

        },

        listlimit: function () {
            this.beanChange.page_no = this.limitData.page;
            this.beanChange.page_line = this.limitData.line;
            this.beanChange.search = this.beanSearch;

            axios.post(this.apiurl + 'api/v2/project/payment/listByLimit', this.beanChange)
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
            this.beanChange.page_no = this.limitData.page;
            this.beanChange.page_line = this.limitData.line;
            this.beanChange.search = this.beanSearch;
            axios.post(this.apiurl + 'api/v2/db/numsByPayBatch', this.beanChange)
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
        this.beanChange.p_tagle = this.ProjectTagle;
        this.beanChange.page_no = this.limitData.page;
        this.beanChange.page_line = this.limitData.line;
        this.beanChange.search = this.beanSearch;
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

        //HTTP post 请求-获得列表数据总条数
        axios.post(this.apiurl + 'api/v2/db/numsByPayBatch', this.beanChange)
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
        axios.post(this.apiurl + 'api/v2/project/payment/listByLimit', this.beanChange)
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
                    p_tagle: '验收',
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
        axios.get(this.apiurl + 'api/v2/contract/getListByLimitAll')
            .then(
                (res) => {
                    this.contentHtModel = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        /**
         * 获得全部项目列表
         */
        axios.get(this.apiurl + 'api/v2/project/getListByAll')
            .then(
                (res) => {
                    for(let i = 0; i < res.data.length; i++){
                        
                    }
                    this.addData.rPList = res.data;
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