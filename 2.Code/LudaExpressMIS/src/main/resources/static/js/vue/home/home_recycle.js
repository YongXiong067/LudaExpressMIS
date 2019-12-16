/*** 回收站 vue实例 ***/

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
        userRol: {
            id: 1,
            list: [
                {
                    id: 1,
                    parent_id: '',
                    name: '立项',
                    icon_cls: 'fa fa-edit',
                    left: 0,
                    url: '',
                    li: [
                        {
                            id: 11,
                            parent_id: 1,
                            name: '项目入库',
                            icon_cls: '',
                            left: 1,
                            url: 'projectWarehousing.html',
                        },
                        {
                            id: 12,
                            parent_id: 1,
                            name: '项目立项',
                            icon_cls: '',
                            left: 1,
                            url: 'projectApproval.html',
                        },
                        {
                            id: 13,
                            parent_id: 1,
                            name: '指标登录',
                            icon_cls: '',
                            left: 1,
                            url: '',
                        }
                    ]
                },
                {
                    id: 2,
                    parent_id: '',
                    name: '建设',
                    icon_cls: 'fa fa-windows',
                    left: 0,
                    url: '',
                    li: [
                        {
                            id: 21,
                            parent_id: 2,
                            name: '项目招标',
                            icon_cls: '',
                            left: 1,
                            url: 'buildTendering.html',
                        },
                        {
                            id: 22,
                            parent_id: 2,
                            name: '签订合同',
                            icon_cls: '',
                            left: 1,
                            url: 'buildContract.html',
                        },
                        {
                            id: 23,
                            parent_id: 2,
                            name: '项目督办',
                            icon_cls: '',
                            left: 1,
                            url: '',
                        }
                    ]
                },
                {
                    id: 3,
                    parent_id: '',
                    name: '验收',
                    icon_cls: 'fa fa-suitcase',
                    left: 0,
                    url: '',
                    li: [
                        {
                            id: 31,
                            parent_id: 3,
                            name: '预验收',
                            icon_cls: '',
                            left: 1,
                            url: '',
                        },
                        {
                            id: 32,
                            parent_id: 3,
                            name: '验收',
                            icon_cls: '',
                            left: 1,
                            url: '',
                        }
                    ]
                },
                {
                    id: 4,
                    parent_id: '',
                    name: '付款',
                    icon_cls: 'fa fa-cny',
                    left: 0,
                    url: '',
                    li: [
                        {
                            id: 41,
                            parent_id: 4,
                            name: '付款进度',
                            icon_cls: '',
                            left: 1,
                            url: '',
                        }
                    ]
                },
                {
                    id: 5,
                    parent_id: '',
                    name: '总览',
                    icon_cls: 'fa fa-bar-chart-o',
                    left: 0,
                    url: '',
                    li: [
                        {
                            id: 51,
                            parent_id: 5,
                            name: '项目总览',
                            icon_cls: '',
                            left: 1,
                            url: '',
                        },
                        {
                            id: 52,
                            parent_id: 5,
                            name: '付款总览',
                            icon_cls: '',
                            left: 1,
                            url: '',
                        }
                    ]
                },
                {
                    id: 6,
                    parent_id: '',
                    name: '供应商',
                    icon_cls: 'fa fa-clone',
                    left: 0,
                    url: '',
                    li: [
                        {
                            id: 51,
                            parent_id: 5,
                            name: '供应商管理',
                            icon_cls: '',
                            left: 1,
                            url: '',
                        },
                        {
                            id: 52,
                            parent_id: 5,
                            name: '供应商申请记录',
                            icon_cls: '',
                            left: 1,
                            url: '',
                        },
                        {
                            id: 53,
                            parent_id: 5,
                            name: '供应商账号分配',
                            icon_cls: '',
                            left: 1,
                            url: '',
                        }
                    ]
                }
            ]
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
        systemNews: [
            {
                id: '2019-07-03-1',
                title: '项目验收提醒！',
                user: {
                    id: '8',
                    userName: 'zwl',
                    realName: '周伟林',
                    sex: '男',
                    phone: '15574361955',
                    img: 'images/img.jpg',
                    lastLoginTime: '2019-06-03 14:52:24'
                },
                text: '省厅等保项目可以验收了，8月1号审核！',
                time: '2019-07-03 17:54:11'
            },
            {
                id: '2019-07-03-2',
                title: '合同付款提醒！',
                user: {
                    id: '8',
                    userName: 'zwl',
                    realName: '周伟林',
                    sex: '男',
                    phone: '15574361955',
                    img: 'images/img.jpg',
                    lastLoginTime: '2019-06-03 14:52:24'
                },
                text: '合同付款合同付款合同付款合同付款合同付款！',
                time: '2019-07-03 17:54:11'
            },
        ],

        /**
         * 页面内容标题栏导航
         */
        pagePosition: {
            parent_id: 0,
            id: 0,
            title: '回收站',
            text: '被删除的所有数据都在这里，点击操作可以来恢复数据',
            position: [
                {
                    name: 'HOME',
                    img: 'fa fa-home',
                    url: 'index.html'
                },
                {
                    name: '回收站',
                    img: '',
                    url: 'Recycle.html'
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
         * 项目详情页面数据
         */
        projectContent: {
            
        },

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
            window.location.href = "login.html";
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
        },

        /**
         * 返回列表界面
         * @param {*} obj 
         */
        contentReturn: function () {

            this.contentTagle = true;
        },
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
                    toastr.danger('上传到服务器失败！');
                }
            })
        },


        /**
         * 恢复数据
         * @param {} id 
         */
        recoveryProject: function (id) {
            axios.get(this.apiurl + 'api/v2/project/recovery',
                {
                    params: {
                        p_id: id,
                    }
                })
                .then(
                    (res) => {
                        toastr.success('恢复成功！');
                        this.numsByPosition();
                        this.listlimit();
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        toastr.danger('恢复失败！');
                    }
                );
        },

        

        listlimit: function () {
            axios.get(this.apiurl + 'api/v2/project/getListByLimit',
                {
                    params: {
                        state: '0',
                        p_tagle: this.ProjectTagle,
                        page_no: this.limitData.page,
                        page_line: this.limitData.line,
                        position: this.beanChange.beanPosition,
                        a_year: this.beanChange.beanYear,
                        w_year: '0',
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
            axios.get(this.apiurl + 'api/v2/db/nums',
                {
                    params: {
                        state: '0',
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
                    this.user = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );

        //HTTP GET 请求-获得列表数据总条数
        axios.get(this.apiurl + 'api/v2/db/nums',
            {
                params: {
                    state: '0',
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

        /**
         * 获得分页详细列表
         */
        axios.get(this.apiurl + 'api/v2/project/getListByLimit',
            {
                params: {
                    state: '0',
                    p_tagle: this.ProjectTagle,
                    page_no: this.limitData.page,
                    page_line: this.limitData.line,
                    position: this.beanChange.beanPosition,
                    a_year: this.beanChange.beanYear,
                    w_year: '0',
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