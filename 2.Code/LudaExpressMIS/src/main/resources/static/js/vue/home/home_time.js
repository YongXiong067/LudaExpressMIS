/*** 消息队列 vue实例 ***/

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
            title: '消息队列',
            text: '',
            position: [
                {
                    name: '消息队列',
                    img: 'fa fa-comments-o',
                    url: 'timeLine.html'
                }

            ]
        },

        timeLine: {
            year: '2019',
            month: '7',
            list: [
                {
                    day: '3',
                    list: [
                        {
                            id: '2019-07-03-1',
                            title: '项目入库提醒',
                            user: {
                                id: '8',
                                userName: 'zwl',
                                realName: '周伟林',
                                sex: '男',
                                phone: '15574361955',
                                img: 'images/img.jpg',
                                lastLoginTime: '2019-06-03 14:52:24'
                            },
                            text: '省厅等保项目已经入库，请尽快立项！',
                            time: '14:52:24'
                        },
                        {
                            id: '2019-07-03-2',
                            title: '项目验收提醒！',
                            user: {
                                id: '8',
                                userName: 'liyn',
                                realName: '李莹娜',
                                sex: '女',
                                phone: '15574361955',
                                img: 'images/picture.jpg',
                                lastLoginTime: '2019-06-03 14:52:24',
                                
                            },
                            text: '省厅等保项目可以验收了，8月1号审核！',
                            time: '14:52:24'
                        }
                    ]
                },
                {
                    day: '2',
                    list: [
                        {
                            id: '2019-07-02-1',
                            title: '项目督办提醒',
                            user: {
                                id: '8',
                                userName: 'zwl',
                                realName: '周伟林',
                                sex: '男',
                                phone: '15574361955',
                                img: 'images/img.jpg',
                                lastLoginTime: '2019-06-03 14:52:24'
                            },
                            text: '国土局的项目要开始督办了，要尽快，8月16号截至，超过截至日期将造成不必要的损失！',
                            time: '8:52:24'
                        },
                        {
                            id: '2019-07-02-2',
                            title: '项目督办提醒',
                            user: {
                                id: '8',
                                userName: 'zwl',
                                realName: '周伟林',
                                sex: '男',
                                phone: '15574361955',
                                img: 'images/img.jpg',
                                lastLoginTime: '2019-06-03 14:52:24'
                            },
                            text: '国土局的项目要开始督办了，8月16号截至！',
                            time: '14:52:24'
                        }
                    ]
                },
            ]
        },



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
        }
    },
    mounted() {
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