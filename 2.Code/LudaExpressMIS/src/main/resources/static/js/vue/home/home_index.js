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
            userId: '',
            userName: '',
            address:'',
            sex: '',
            loginTime:'',
            phone: '',
            img_src: 'images/img.jpg',
            last_logintime: '',
            rolu:'',
            rol: {
                
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
        modalUpdate: {
            id: '',
            userId: '',
            userName: '',
            sex: '',
            phone: '',
            img_src: 'images/img.jpg',
            last_logintime: '',
            rolu:'',
            rol: {
                
            }
        }
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
         * 修改模态框获得数据数据
         * @param {*} obj 
         */
        update: function (obj) {
        	console.log(obj);
            this.modalUpdate.userId = obj.userId;
            this.modalUpdate.userName = obj.username;
            this.modalUpdate.password = obj.password;
            this.modalUpdate.phone = obj.phone;
            this.modalUpdate.rolu = obj.rolu;
            this.modalUpdate.sex = obj.sex;
            this.modalUpdate.address = obj.address;
        },
        /**
         * 修改数据提交
         */
        updateSubmit: function () {
            axios.post(this.apiurl + 'api/user/update', this.modalUpdate)
                .then(
                    (res) => {
                        toastr.success('修改成功！');
                    }
                )
                .catch(
                    (error) => {
                    	console.log(error);
                    }
                );
        },
        /**
         * 修改密码
         */
        updatePwd: function() {
            if (this.pwdModel.newpwd != this.pwdModel.newpwd_) {
                toastr.error('两次密码不相同！');
            } else if (this.pwdModel.newpwd == '' || this.pwdModel.newpwd_ == '' || this.pwdModel.oldpwd == '') {
                toastr.error('密码不能为空！');
            } else {
            	console.log(this.pwdModel.newpwd);
                axios.get(this.apiurl + 'api/user/updatePwd',
                    {
                        params: {
                            userId: this.user.userId,
                            userName: this.user.userName,
                            oldPwd: this.pwdModel.oldpwd,
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
        }


    },
    mounted() {

        axios.get(this.apiurl + 'api/user/getUser')
            .then(
                (res) => {
                    if (res.data.userId == 0) {
                        window.location.href = "login.html";
                    } else {
                        this.user.userId = res.data.userId;
                        this.user.userName = res.data.userName;
                        this.user.img_src = res.data.imgurl;
                        this.user.address = res.data.address;
                        this.user.rolu = res.data.rolu;
                        this.user.sex = res.data.sex;
                        this.user.phone = res.data.phone;
                        this.user.last_logintime = res.data.loginTime;
                    }
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
    },
    computed: {

    },

});
//上传头像
$("#logoFile").change(function(){
	console.log(this);
	var obj = this;
	var f=$(obj).val();
    if(f == null || f ==undefined || f == ''){
        return false;
    }
    if(!/\.(?:png|jpg|bmp|gif|PNG|JPG|BMP|GIF)$/.test(f))
    {
        alert("类型必须是图片(.png|jpg|bmp|gif|PNG|JPG|BMP|GIF)");
        $(obj).val('');
        return false;
    }
    var data = new FormData();
    $.each($(obj)[0].files,function(i,file){
        data.append('lefile', file);
    });
    console.log(data);
    $.ajax({
        type: "POST",
        url: "api/user/uploadImg",
        data: data,
        cache: false,
        contentType: false,    //不可缺
        processData: false,    //不可缺
        dataType:"json",
        success: function(ret) {
        	
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("上传失败，请检查网络后重试");
        }
    });
});