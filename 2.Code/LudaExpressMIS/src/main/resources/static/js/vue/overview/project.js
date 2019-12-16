/*** 项目总览 vue实例 ***/

new Vue({
    el: '#app',
    data: {

        apiurl: '',
        ProjectTagle: '0',
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
            id: 51,
            title: '项目总览',
            text: '左右方向键可以控制横向滚动条移动',
            position: [
                {
                    name: '总览',
                    img: 'fa fa-bar-chart-o',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '项目总览',
                    img: '',
                    url: 'projectOverview.html'
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
        p_tagleList: [],      //项目状态
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
            p_id: '',
            
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
        modalAdd: {          //添加模态框
            p_id: '0',
            examine_money: '',
            overall_type: '0',
            approval_time: '',
            approval_fileName: '',
            approval_fileUrl: '',
            p_tagle: '项目立项'
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
                sup_person: '1',
                sup_time: '1',
                project_situation: '1',
                feedback_person: '1',
                document: '1',
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
        fileUpdateList: {
            warehousing: false,
            approval: false,
            bid: false,
            acceBefore: false,
            acce: false,
            payment: false
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

            this.beanChange.position = '0';
            this.beanChange.overall_type = '0';
            this.beanChange.warehousing_time = '0';
            this.beanSearch = '';
            this.beanChange.p_tagle = '0',
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
                    this.modalAdd_project = this.list1[i];
                }
            }

        },

        /**
         * 修改模态框获得数据数据
         * @param {*} obj 
         */
        update: function (obj) {
            this.modalUpdate = obj;
            // this.modalUpdate.p_name = obj.p_name;
            // this.modalUpdate.position = obj.position;
            // this.modalUpdate.examine_money = obj.examine_money;
            // this.modalUpdate.overall_type = obj.overall_type;
            //对时间格式进行转码
            if(obj.warehousing_time != null){
                this.modalUpdate.warehousing_time = obj.warehousing_time.substr(0, 10);
            }
            if(obj.approval_time != null){
                this.modalUpdate.approval_time = obj.approval_time.substr(0, 10);
            }
            if(obj.acce_time != null){
                this.modalUpdate.acce_time = obj.acce_time.substr(0, 10);
            }
            if(obj.bid_time != null){
                this.modalUpdate.bid_time = obj.bid_time.substr(0, 10);
            }
            if(obj.acceBefore_time != null){
                this.modalUpdate.acceBefore_time = obj.acceBefore_time.substr(0, 10);
            }
            if(obj.sup_time != null){
                this.modalUpdate.sup_time = obj.sup_time.substr(0, 10);
            }

            
        },

        /**
         * 修改数据提交
         */

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
                case 'p_tagle':
                    this.modalShow.shows.p_tagle = tagle;
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
                case 'bid_money':
                    this.modalShow.shows.bid_money = tagle;
                    break;
                case 'bid_time':
                    this.modalShow.shows.bid_time = tagle;
                    break;
                case 'bid_fileName':
                    this.modalShow.shows.bid_fileName = tagle;
                    break;
                case 'acceBefore_opinion':
                    this.modalShow.shows.acceBefore_opinion = tagle;
                    break;
                case 'acceBefore_time':
                    this.modalShow.shows.acceBefore_time = tagle;
                    break;
                case 'acceBefore_fileName':
                    this.modalShow.shows.acceBefore_fileName = tagle;
                    break;
                case 'is_acceBefore':
                    this.modalShow.shows.is_acceBefore = tagle;
                    break;
                case 'acce_time':
                    this.modalShow.shows.acce_time = tagle;
                    break;
                case 'acce_user_opinion':
                    this.modalShow.shows.acce_user_opinion = tagle;
                    break;
                case 'acce_build_opinion':
                    this.modalShow.shows.acce_build_opinion = tagle;
                    break;
                case 'acce_organ_opinion':
                    this.modalShow.shows.acce_organ_opinion = tagle;
                    break;
                case 'acce_fileName':
                    this.modalShow.shows.acce_fileName = tagle;
                    break;
                case 'acce_result':
                    this.modalShow.shows.acce_result = tagle;
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
                case 'payment_agreement':
                    this.modalShow.shows.payment_agreement = tagle;
                    break;
                case 'supplementary_Payment':
                    this.modalShow.shows.supplementary_Payment = tagle;
                    break;
                case 'payment_fileName':
                    this.modalShow.shows.payment_fileName = tagle;
                    break;
                case 'planning_type':
                    this.modalShow.shows.planning_type = tagle;
                    break;
                case 'document':
                    this.modalShow.shows.document = tagle;
                
            }
        },

        ShowSubmit: function () {
            axios.post(this.apiurl + 'api/v2/show/update', this.modalShow.shows)
                .then(
                    (res) => {
                        toastr.success('成功保存到云端！');
                        this.listlimit();
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.error('保存失败！');
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
                    var url = 'overview';
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

        fileUpdateTagle: function (obj) {
            if(obj == 'warehousing'){
                this.fileUpdateList.warehousing = !this.fileUpdateList.warehousing;
            }else if(obj == 'approval') {
                this.fileUpdateList.approval = !this.fileUpdateList.approval;
            }else if(obj == 'bid') {
                this.fileUpdateList.bid = !this.fileUpdateList.bid;
            }else if(obj == 'acceBefore') {
                this.fileUpdateList.acceBefore = !this.fileUpdateList.acceBefore;
            }else if(obj == 'acce') {
                this.fileUpdateList.acce = !this.fileUpdateList.acce;
            }else if(obj == 'payment') {
                this.fileUpdateList.payment = !this.fileUpdateList.payment;
            }
        },

    

        /**
         * 修改数据
         */
        updateSubmit: function () {
            let warehousing ;
            let approval;
            let bid;
            let acceBefore;
            let acce;
            let payment;
            //判断文件是否非空
            if ($('#upload_warehousing')[0].files[0] != null) {
                warehousing = $('#upload_warehousing')[0].files[0].name;
                this.modalUpdate.warehousing_fileName = warehousing;
                this.modalUpdate.warehousing_fileUrl = 'File/overview/' + warehousing;
            }
            if ($('#upload_approval')[0].files[0] != null) {
                approval = $('#upload_approval')[0].files[0].name;
                this.modalUpdate.approval_fileName = approval;
                this.modalUpdate.approval_fileUrl = 'File/overview/' + approval;
            }
            if ($('#upload_bid')[0].files[0] != null) {
                bid = $('#upload_bid')[0].files[0].name;
                this.modalUpdate.bid_fileName = bid;
                this.modalUpdate.bid_fileUrl = 'File/overview/' + bid;
            }
            if ($('#upload_acceBefore')[0].files[0] != null) {
                acceBefore = $('#upload_acceBefore')[0].files[0].name;
                this.modalUpdate.acceBefore_fileName = acceBefore;
                this.modalUpdate.acceBefore_fileUrl = 'File/overview/' + acceBefore;
            }
            if ($('#upload_acce')[0].files[0] != null) {
                acce = $('#upload_acce')[0].files[0].name;
                this.modalUpdate.acce_fileName = acce;
                this.modalUpdate.acce_fileUrl = 'File/overview/' + acce;
            }
            if ($('#upload_payment')[0].files[0] != null) {
                payment = $('#upload_payment')[0].files[0].name;
                this.modalUpdate.payment_fileName = payment;
                this.modalUpdate.payment_fileUrl = 'File/overview/' + payment;
            }

            //发起修改请求
            axios.post(this.apiurl + 'api/v2/project/updatePro', this.modalUpdate)
                .then(
                    (res) => {
                        if(res.data){
                            toastr.success('修改成功！');
                        }else {
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
         * 添加数据提交
         */
        addSubmit: function () {
            var name = '';
            //判断文件是否非空
            if ($('#uploadFile')[0].files[0] != null) {
                name = $('#uploadFile')[0].files[0].name;
                this.modalAdd.approval_fileName = name;
                this.modalAdd.approval_fileUrl = 'File/approval/' + name;
            }
            this.modalAdd_project.examine_money = this.modalAdd.examine_money;
            this.modalAdd_project.overall_type = this.modalAdd.overall_type;
            this.modalAdd_project.approval_time = this.modalAdd.approval_time;
            this.modalAdd_project.approval_fileName = this.modalAdd.approval_fileName;
            this.modalAdd_project.approval_fileUrl = this.modalAdd.approval_fileUrl;
            this.modalAdd_project.p_tagle = this.ProjectTagle;



            axios.post(this.apiurl + 'api/v2/project/approval/update', this.modalAdd_project)
                .then(
                    (res) => {
                        toastr.success('添加成功！');
                        this.modalAdd_project = {
                            p_id: '',
                            p_name: '',
                            declare_money: '',
                            position: '',
                            warehousing_time: '',
                            examine_money: '',
                            approval_time: '',
                            approval_fileName: '',
                            approval_fileUrl: '',
                            p_tagle: this.ProjectTagle
                        };
                        this.modalAdd = {
                            p_id: '',
                            examine_money: '',
                            approval_time: '',
                            approval_fileName: '',
                            approval_fileUrl: '',
                            p_tagle: this.ProjectTagle
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

        /**
         * excel导出
         */
        excelExport: function () {
            let arr_key = [];
            let arr_value = [];
            
            if (this.modalShow.shows.p_id == '1') {
                arr_key.push('ID');
                arr_value.push('p_id');
            }
            if (this.modalShow.shows.p_name == '1') {
                arr_key.push('项目名称');
                arr_value.push('p_name');
            }
            if (this.modalShow.shows.p_tagle == '1') {
                arr_key.push('项目状态');
                arr_value.push('p_tagle');
            }
            if (this.modalShow.shows.position == '1') {
                arr_key.push('归属处室');
                arr_value.push('position');
            }
            if (this.modalShow.shows.document == '1') {
                arr_key.push('资料序号');
                arr_value.push('document');
            }
            if (this.modalShow.shows.declare_money == '1') {
                arr_key.push('申报金额');
                arr_value.push('declare_money');
            }
            if (this.modalShow.shows.warehousing_time == '1') {
                arr_key.push('入库时间');
                arr_value.push('warehousing_time');
            }
            if (this.modalShow.shows.warehousing_fileName == '1') {
                arr_key.push('入库文件');
                arr_value.push('warehousing_fileName');
            }
            if (this.modalShow.shows.examine_money == '1') {
                arr_key.push('审核金额');
                arr_value.push('examine_money');
            }
            if (this.modalShow.shows.approval_time == '1') {
                arr_key.push('立项时间');
                arr_value.push('approval_time');
            }
            if (this.modalShow.shows.approval_fileName == '1') {
                arr_key.push('立项资料');
                arr_value.push('approval_fileName');
            }
            if (this.modalShow.shows.overall_type == '1') {
                arr_key.push('统筹类型');
                arr_value.push('overall_type');
            }
            if (this.modalShow.shows.contractor == '1') {
                arr_key.push('供应商');
                arr_value.push('contractor');
            }
            if (this.modalShow.shows.bid_money == '1') {
                arr_key.push('中标金额');
                arr_value.push('bid_money');
            }
            if (this.modalShow.shows.bid_time == '1') {
                arr_key.push('中标时间');
                arr_value.push('bid_time');
            }
            if (this.modalShow.shows.bid_fileName == '1') {
                arr_key.push('中标资料');
                arr_value.push('bid_fileName');
            }
            if (this.modalShow.shows.acceBefore_opinion == '1') {
                arr_key.push('验收初步意见');
                arr_value.push('acceBefore_opinion');
            }
            if (this.modalShow.shows.acceBefore_time == '1') {
                arr_key.push('预验收时间');
                arr_value.push('acceBefore_time');
            }
            if (this.modalShow.shows.acceBefore_fileName == '1') {
                arr_key.push('预验收文档');
                arr_value.push('acceBefore_fileName');
            }
            if (this.modalShow.shows.is_acceBefore == '1') {
                arr_key.push('是否同意验收');
                arr_value.push('is_acceBefore');
            }
            if (this.modalShow.shows.acce_time == '1') {
                arr_key.push('验收时间');
                arr_value.push('acce_time');
            }
            if (this.modalShow.shows.acce_user_opinion == '1') {
                arr_key.push('用户方意见');
                arr_value.push('acce_user_opinion');
            }
            if (this.modalShow.shows.acce_build_opinion == '1') {
                arr_key.push('建设方意见');
                arr_value.push('acce_build_opinion');
            }
            if (this.modalShow.shows.acce_organ_opinion == '1') {
                arr_key.push('组织方意见');
                arr_value.push('acce_organ_opinion');
            }
            if (this.modalShow.shows.acce_fileName == '1') {
                arr_key.push('验收报告文档');
                arr_value.push('acce_fileName');
            }
            if (this.modalShow.shows.acce_result == '1') {
                arr_key.push('验收结论');
                arr_value.push('acce_result');
            }
            if (this.modalShow.shows.payable_money == '1') {
                arr_key.push('应付款');
                arr_value.push('payable_money');
            }
            if (this.modalShow.shows.payment_money == '1') {
                arr_key.push('已付款');
                arr_value.push('payment_money');
            }
            if (this.modalShow.shows.progress == '1') {
                arr_key.push('付款进度');
                arr_value.push('progress');
            }
            if (this.modalShow.shows.payment_agreement == '1') {
                arr_key.push('付款约定信息');
                arr_value.push('payment_agreement');
            }
            if (this.modalShow.shows.supplementary_Payment == '1') {
                arr_key.push('补进付款信息');
                arr_value.push('supplementary_Payment');
            }
            if (this.modalShow.shows.payment_fileName == '1') {
                arr_key.push('付款附件');
                arr_value.push('payment_fileName');
            }
            if (this.modalShow.shows.planning_type == '1') {
                arr_key.push('项目付款状态');
                arr_value.push('planning_type');
            }
            console.log(arr_key);
            console.log(arr_value);
            let e = {
                fileName: '项目列表.xls',
                sheetName: '总览',
                key: arr_key,
                value: arr_value,
                screen: this.beanChange
            };
            axios.post(this.apiurl + 'api/v2/db/excelExportByPro', e)
                .then(
                    (res) => {
                        if (res.data == true) {
                            toastr.success('导出成功！');
                            window.open("api/v2/db/dowlond?fileurl=File/excel/export/项目列表.xls");
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
                        toastr.danger('关联失败！');
                    }
                );
        },

        listlimit: function () {
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
        let url = document.location.toString();
        let arrUrl = url.split("=");
        let para = arrUrl[1];

        if (typeof (para) == undefined) {

            para = '0';
        }
        this.beanChange.warehousing_time = para;
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
                        console.log(res.data);
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
                    this.modalShow.shows = res.data;
                    console.log(res.data);
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        //HTTP post 请求-获得列表数据总条数
        axios.post(this.apiurl + 'api/v2/db/nums', this.beanChange)
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
        axios.post(this.apiurl + 'api/v2/project/getListByLimit', this.beanChange)
            .then(
                (res) => {
                    this.limitData.list = res.data;
                    console.log(res.data);
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
         * 获得项目状态下拉框数据
         */
        axios.get(this.apiurl + 'api/v2/db/getDropdown',
            {
                params: {
                    typecode: 'DICT01',
                }
            })
            .then(
                (res) => {
                    this.p_tagleList = res.data;
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
                    p_tagle: '项目入库',
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
        },
        beanParma: function () {
            this.beanChange.page_no = this.limitData.page;
            this.beanChange.page_line = this.limitData.line;
            this.beanChange.search = this.beanSearch;
            return this.beanChange;
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