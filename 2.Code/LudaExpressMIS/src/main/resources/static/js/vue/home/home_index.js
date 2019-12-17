/*** 首页 vue实例 ***/

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

        systemNews: [],


        /**
         * 
         */
        welcome: true,


        /**
         * 页面内容标题栏导航
         */
        pagePosition: {
            title: 'HOME',
            text: '',
            position: [
                {
                    name: 'HOME',
                    img: 'fa fa-home',
                    url: 'index.html'
                }

            ]
        },
        entrance: {
            project_nums: 0,
            contract_nums: 0,
            acceptance_nums: 0,
            supplier_nums: 0
        },

        htTagle: false,
    },
    methods: {
        /**
         * 注销登录
         */
        cancellation: function () {
            axios.get(this.apiurl + 'api/user/cancellation')
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
        }


    },
    computed: {

    },

});