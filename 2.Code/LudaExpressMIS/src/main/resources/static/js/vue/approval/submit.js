/*** 呈批件 vue实例 ***/

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
            parent_id: 1,
            id: 11,
            title: '呈批件',
            text: '',
            position: [
                {
                    name: '立项',
                    img: 'fa fa-edit',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '呈批件',
                    img: '',
                    url: 'projectSubmit.html'
                }
            ]
        },

        /**
         * 右侧内容页展示状态
         */
        contentTagle: 'home',

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
            beanYear: '0',
            beanTagle: ''
        },
        beanSearch: '',         //搜索
        modalUpdate: {          //修改模态框
            sub_id: '',
            sub_name: '',
            sub_fileName: '',
            sub_fileUrl: '',
            remarks: '',
            sub_time: '',

        },
        modalAdd: {          //添加模态框
            sub_name: '',
            sub_fileName: '',
            sub_fileUrl: '',
            remarks: '',
            sub_time: '',
        },
        modalFile: {          //文件上传模态框
            sub_id: '',
            sub_name: '',
            sub_fileName: '',
            sub_fileUrl: '',
        },

        /**
         * 关联合同模态框
         */
        moldeHt: {
            p_id: '0',
            c_id: '0',
        },

        rPList: [

        ],
        rSList: [

        ],

        /**
         * 关联项目
         */
        moldePro: {
            sub_id: '0',
            p_id: '0'
        },
        /**
         * 模态框下拉项目列表
         */
        list1: [],

        list2: [],
        /**
         * 项目详情页面数据
         */
        projectContent: {

        },

        /**
         * 测试数据-呈批件项目列表
         */
        listPro: [],
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
            //修改密码简单逻辑验证
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
                        if (res.data) {
                            window.location.href = "login.html";
                        } else {
                            toastr.error('注销失败！');
                        }
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        window.location.href = "login.html";
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
         * 进入详情界面
         * @param {*} obj 
         */
        contentChange: function (obj) {
            this.projectContent = obj;
            this.contentTagle = 'pro';
            this.moldePro.sub_id = obj.sub_id;
            this.refreshContent();
        },

        /**
         * 刷新内容详情列表数据
         */
        refreshContent: function () {
            axios.get(this.apiurl + 'api/v2/project/getListBySubId',
                {
                    params: {
                        sub_id: this.moldePro.sub_id,
                    }
                })
                .then(
                    (res) => {
                        this.listPro = res.data;
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
            this.contentTagle = 'home';
        },

        /**
         * 进入关联界面
         */
        connectChange: function () {
            this.contentTagle = 'connect';
        },

        /**
         * 移除合同
         * @param {项目id} pid 
         * @param {合同id} cid 
         */
        removeHt: function (pid, sub_id) {
            axios.get(this.apiurl + 'api/v2/submit_approval/noRelation',
                {
                    params: {
                        p_id: pid,
                        sub_id: sub_id
                    }
                })
                .then(
                    (res) => {
                        if (res.data) {
                            toastr.success('成功解除关联！');
                            this.refreshContent();
                        } else {
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
                        if (res.data) {
                            toastr.success('关联成功！');
                            this.refreshContent();
                        } else {
                            toastr.error('关联失败！');
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
         * 多选关联呈批件
         */
        relationAll: function (id) {
            for (let i = 0; i < this.rSList.length; i++) {
                axios.get(this.apiurl + 'api/v2/submit_approval/relation',
                    {
                        params: {
                            p_id: this.rSList[i].p_id,
                            sub_id: id,
                        }
                    })
                    .then(
                        (res) => {
                            if (res.data) {
                                toastr.success('关联成功！');
                                this.refreshContent();
                            } else {
                                toastr.error('关联失败！');
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
         * 改变多选框数组
         * @param {*} i 
         * @param {*} tagle 
         */
        rChange: function (i, tagle) {
            if (tagle == 'add') {
                this.rSList.push(this.rPList[i]);
                this.rPList.splice(i, 1);
            } else {
                this.rPList.push(this.rSList[i]);
                this.rSList.splice(i, 1);
            }
        },

        /**
         * 刷新数组
         */
        rChangeClearn: function () {
            this.rSList = [];
            axios.get(this.apiurl + 'api/v2/project/getListByAll')
                .then(
                    (res) => {
                        this.rPList = res.data;
                        console.log(res.data);
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
            this.modalUpdate.sub_id = obj.sub_id;
            this.modalUpdate.sub_name = obj.sub_name;
            this.modalUpdate.remarks = obj.remarks;
            //对时间格式进行转码
            this.modalUpdate.sub_time = obj.sub_time.substr(0, 10);
        },

        /**
         * 修改数据提交
         */
        updateSubmit: function () {
            axios.post(this.apiurl + 'api/v2/submit_approval/update', this.modalUpdate)
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
         * 文件上传
         */
        fileUpload: function (name) {
            var filename = $('#' + name)[0].files[0].name;
            var arr = filename.split(".");
            if (arr[1] == 'doc' || arr[1] == 'docx' || arr[1] == 'xls' || arr[1] == 'xlsx') {
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
                toastr.warning('上传文件格式错误！');
            }
        },

        /**
         * 添加数据提交
         */
        addSubmit: function () {
            if (this.modalAdd.sub_name == '' || this.modalAdd.remarks == '' || this.modalAdd.sub_time == '') {
                toastr.warning('请填写完整的信息！');
                return false;
            }
            var name = '';
            //判断文件是否非空
            if ($('#uploadFile')[0].files[0] != null) {
                name = $('#uploadFile')[0].files[0].name;
                var arr = name.split(".");
                this.modalAdd.sub_fileName = name;
                this.modalAdd.sub_fileUrl = 'File/approval/' + name;
            }

            axios.post(this.apiurl + 'api/v2/submit_approval/save', this.modalAdd)
                .then(
                    (res) => {
                        if (res.data != 0) {
                            toastr.success('添加成功！');
                            this.numsByPosition();
                            this.listlimit();
                            this.modalAdd = {          //重置数据
                                sub_name: '',
                                sub_fileName: '',
                                sub_fileUrl: '',
                                remarks: '',
                                sub_time: '',
                            }
                            this.relationAll(res.data);
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
         * 文件上传数据更新
         * @param {*} obj 
         */
        file: function (obj) {
            this.modalFile.sub_id = obj.sub_id;
            this.modalFile.sub_name = obj.sub_name;
            this.modalFile.sub_fileName = obj.sub_fileName;
            this.modalFile.sub_fileUrl = obj.sub_fileUrl;
        },

        fileSubmit: function () {
            var name = '';
            //判断文件是否非空
            if ($('#updateFile')[0].files[0] != null) {
                name = $('#updateFile')[0].files[0].name;
                var arr = name.split(".");
                //对文件类型进行过滤
                if (arr[1] == 'doc' || arr[1] == 'docx' || arr[1] == 'xls' || arr[1] == 'xlsx') {
                    this.modalFile.sub_fileName = name;
                    this.modalFile.sub_fileUrl = 'File/approval/' + name;
                    axios.post(this.apiurl + 'api/v2/submit_approval/updateFile', this.modalFile)
                        .then(
                            (res) => {
                                if (res.data) {
                                    toastr.success('上传成功！');
                                    this.listlimit();
                                } else {
                                    toastr.error('上传失败！');
                                }
                            }
                        )
                        .catch(
                            (error) => {
                                console.log(error);
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
                axios.get(this.apiurl + 'api/v2/submit_approval/delete',
                {
                    params: {
                        sub_id: id,
                    }
                })
                .then(
                    (res) => {
                        if (res.data) {
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
         * excel导出
         */
        excelExport: function () {
            let e = {
                fileName: '呈批件列表.xls',
                sheetName: '呈批件',
                key: ['ID', '呈批件名称', '申请时间', '申请资料', '备注'],
                value: ['sub_id', 'sub_name', 'sub_time', 'sub_fileName', 'remarks'],
                screen: {
                    state: '1',
                    page_no: this.limitData.page,
                    page_line: this.limitData.line,
                    sub_time: this.beanChange.beanYear,
                    search: this.beanSearch
                }
            };
            axios.post(this.apiurl + 'api/v2/db/excelExportBySub', e)
                .then(
                    (res) => {
                        if (res.data) {
                            toastr.success('导出成功！');
                            window.open("api/v2/db/dowlond?fileurl=File/excel/export/呈批件列表.xls");
                        } else {
                            toastr.error('导出失败！');
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
         * 关联合同模态框获得数据
         * @param {*} obj 
         */
        projectHt: function (obj) {
            this.moldePro.sub_id = obj.sub_id;
        },

        listlimit: function () {
            axios.get(this.apiurl + 'api/v2/submit_approval/getListByLimit',
                {
                    params: {
                        state: '1',
                        page_no: this.limitData.page,
                        page_line: this.limitData.line,
                        sub_time: this.beanChange.beanYear,
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
            axios.get(this.apiurl + 'api/v2/db/numBySumbit',
                {
                    params: {
                        state: '1',
                        sub_time: this.beanChange.beanYear,
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
        axios.get(this.apiurl + 'api/v2/db/numBySumbit',
            {
                params: {
                    state: '1',
                    sub_time: '0',
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

        /**
         * 获得全部项目列表
         */
        axios.get(this.apiurl + 'api/v2/project/getListByAll')
            .then(
                (res) => {
                    this.rPList = res.data;
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