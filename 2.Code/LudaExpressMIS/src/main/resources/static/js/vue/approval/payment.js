/** * 财务管理 vue实例 ** */
var dougCanvasData = [
    {
        value: 65,
        color: "#de5e4e",
        highlight: "#b94b3e",
        label: "2015年"
    },
    {
        value: 59,
        color: "#2ac2d8",
        highlight: "#1aa3c4",
        label: "2016年"
    },
    {
        value: 80,
        color: "#eea736",
        highlight: "#cf8f29",
        label: "2017年"
    },
    {
        value: 81,
        color: "#367fa9",
        highlight: "#307298",
        label: "2018年"
    },
    {
        value: 56,
        color: "#1cbc72",
        highlight: "#0da35d",
        label: "2019年"
    }
];
/**
 * 分布情况折线图数据
 */
var lineCanvasData = {
    labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    datasets: [
        {
            fillColor: "rgba(42,194,216,.1)",
            strokeColor: "rgba(54,127,169,.8)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "#2ac2d8",
            pointHighlightFill: "#2ac2d8",
            pointHighlightStroke: "rgba(255,255,255,1)",
            data: [12, 66, 31, 22, 41, 12, 66, 31, 22, 41, 0, 0]
        }
    ],
};
new Vue({
    el: '#app',
    data: {
        apiurl: '',
        ProjectTagle: '用户管理',
        /**
		 * 账号资料
		 */
        user: {
            id: '',
            userid: '',
            username: '',
            sex: '',
            phone: '',
            img_src: 'images/img.jpg',
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
            parent_id: 4,
            id: 41,
            title: '财务管理',
            text: '',
            position: [
                {
                    name: '财务',
                    img: 'fa fa-cny',
                    url: 'javaScript:void(0);'
                },
                {
                    name: '财务管理',
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
            page: 1,        // 当前页
            page_go: '',    // 跳转页
            line: 20,       // 每页数据条数
            nums: '',      // 总条数
            list: [],       // 数据集合
        },
        positionList: [

        ],
        beanChange: {       // 过滤条件
            beanPosition: '0',
            beanYear: '0',
        },
        beanSearch: '',         // 搜索
        modalUpdate: {          // 修改模态框
        	userName: '',
            password: '',
            phone: '',
            rolu: ''
        },
        modalAdd: {          // 添加模态框
            userName: '',
            password: '',
            phone: '',
            rolu: ''
        }
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
        },
        /**
		 * 刷新数据
		 */
        refresh: function () {
            this.limitData.page = 1;
            this.limitData.line = 20;
            this.beanSearch = '';
            this.limitData.page_go = '';
            // this.numsByPosition();
            this.listlimit();
        },

        /**
		 * 注销登录
		 */
        cancellation: function () {
            axios.get(this.apiurl + 'api/user/cancellation')
                .then(
                    (res) => {
                        // toastr.success('注销成功！');
                        window.location.href = "login.html";
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
		 * 
		 * @param {*}
		 *            tagle
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
            // this.numsByPosition();
            this.listlimit();
        },

        /**
		 * 筛选值改变触发方法，按值去查询
		 */
        beanPosition_change: function () {
            this.limitData.page = 1;
            // this.numsByPosition();
            this.listlimit();
        },

        /* *******************项目详情所需方法-start********************** */
        /**
		 * 进入详情界面
		 * 
		 * @param {*}
		 *            obj
		 */
        contentChange: function (obj) {
            this.projectContent = obj;
            this.contentTagle = false;
        },
        /**
		 * 返回列表界面
		 * 
		 * @param {*}
		 *            obj
		 */
        contentReturn: function () {
            this.contentTagle = true;
        },

        /* *******************所需方法-end********************** */
        listlimit: function () { 
        	axios.get(this.apiurl + 'api/money/getMoneyTable')
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

        }
    },
    mounted() {
        // -------------
        // - api请求 -
        // -------------
        // HTTP GET 请求-获得当前登录用户信息
    	axios.get(this.apiurl + 'api/user/getUser')
        .then(
            (res) => {
                if (res.data.userId == 0) {
                    window.location.href = "login.html";
                } else {
                    this.user.id = res.data.userId;
                    this.user.userid = res.data.userName;
                    this.user.username = res.data.userName;
                    this.user.img_src = res.data.imgurl;
                    this.user.address = res.data.address;
                    this.user.sex = res.data.sex;
                    this.user.last_logintime = res.data.loginTime;
                }
            }
        )
        .catch(
            (error) => { console.log(error); }
        );
        /**
		 * 获得详细列表
		 */
        axios.get(this.apiurl + 'api/money/getMoneyTable')
            .then(
                (res) => {
                    this.limitData.list = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        //饼图数据
        $.ajax({
            url: this.apiurl + 'api/money/getMoneyColumnYear',
            data: {
            },
            async: false,
            type: "GET",
            dataType: "json",
            success: function (res) {
                for(var i = 0;i < res.length;i++){
            		dougCanvasData[i].value = res[i].money;
            		dougCanvasData[i].label = res[i].dateMonth+"年";
            	}
            }
        });
      //折线图数据
        $.ajax({
            url: this.apiurl + 'api/money/getMoneyColumn',
            data: {
            },
            async: false,
            type: "GET",
            dataType: "json",
            success: function (res) {
            	//对标题进行自动获取当前年份
            	var myDate = new Date();
                var tYear = myDate.getFullYear();
            	$("#zxTitle").html(tYear+"年1-12月份资金统计");
            	var labels = new Array();
            	var values = new Array();
                for(var i = 0;i < res.length;i++){
                	labels[i] = res[i].dateMonth;
                	values[i] = res[i].money;
            	}
                lineCanvasData.labels = labels;
                lineCanvasData.datasets[0].data = values;
            }
        });
        // -------------
        // - 近五年项目分布情况饼状图渲染 -
        // -------------
        var DougChartCanvas = $("#dougChart").get(0).getContext("2d");
        var myDoughnutChart = new Chart(DougChartCanvas);
        var dougOptions = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            percentageInnerCutout: 50,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
            responsive: true,
            maintainAspectRatio: true
        }
        myDoughnutChart.Doughnut(dougCanvasData, dougOptions);

        // -------------
        // - 近五年项目分布情况折线图渲染 -
        // -------------
        var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
        var mylinehnutChart = new Chart(lineChartCanvas);
        var lineChartPotions = {
            // Boolean - 刻度是从零开始，还是从最低值向下一个数量级开始
            scaleBeginAtZero: true,
            // Boolean - 是否在图表中显示网格线
            scaleShowGridLines: true,
            // String - 网格线的颜色
            scaleGridLineColor: "rgba(0,0,0,.05)",
            // Number - 网格线宽度
            scaleGridLineWidth: 1,
            // Number - 网格字体的颜色
            scaleFontColor: "#FFF",
            // Boolean - 是否显示水平线（X轴除外）
            scaleShowHorizontalLines: true,
            // Boolean - 是否显示水平线（y轴除外）
            scaleShowVerticalLines: false,
            // Boolean - 每根杆上是不是都有一个笔划
            barShowStroke: true,
            // Number - 条笔划的像素宽度
            barStrokeWidth: 2,
            // Number - 每个x值集之间的间距
            barValueSpacing: 10,
            // Number - X值内数据集之间的间距
            barDatasetSpacing: 1,
            // String - 图例模板
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
            // Boolean - 是否使图表响应
            responsive: true,
            maintainAspectRatio: true
        };
        mylinehnutChart.Line(lineCanvasData, lineChartPotions);
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
    created() {  // 全局监听键盘事件
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