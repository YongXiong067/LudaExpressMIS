/*** 登录 vue实例 ***/

new Vue({
    el: '#app',
    
    data: {
        apiurl: '',
        /**
         * 账号资料
         */
        user: {},
        
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


    },
    methods: {
        
    },
    mounted() {
        
    }

});