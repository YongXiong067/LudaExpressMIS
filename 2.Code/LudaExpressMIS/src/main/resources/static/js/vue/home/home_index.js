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
        /**
         * 近五年合同分布情况
         */
        htsumYear: {
            title: '近五年合同分布情况',
            x: '年',
            y: '份',
            arr: [
                {
                    year: '2015',
                    num: '0',
                    width: '100',
                    url: 'projectOverview.html?year=2015'
                },
                {
                    year: '2016',
                    num: '0',
                    width: '0',
                    url: 'projectOverview.html?year=2016'
                },
                {
                    year: '2017',
                    num: '0',
                    width: '100',
                    url: 'projectOverview.html?year=2017'
                },
                {
                    year: '2018',
                    num: '0',
                    width: '100',
                    url: 'projectOverview.html?year=2018'
                },
                {
                    year: '2019',
                    num: '0',
                    width: '0',
                    url: 'projectOverview.html?year=2019'
                },
            ]
        },
        /**
        * 近五年项目分布情况
        */
        xmsumYear: {
            title: '近五年项目分布情况',
            x: '年',
            y: '个',
            arr: [
                {
                    year: '2015',
                    num: '0',
                    width: '100',
                    url: 'projectOverview.html?year=2015'
                },
                {
                    year: '2016',
                    num: '0',
                    width: '0',
                    url: 'projectOverview.html?year=2016'
                },
                {
                    year: '2017',
                    num: '0',
                    width: '100',
                    url: 'projectOverview.html?year=2017'
                },
                {
                    year: '2018',
                    num: '0',
                    width: '100',
                    url: 'projectOverview.html?year=2018'
                },
                {
                    year: '2019',
                    num: '0',
                    width: '0',
                    url: 'projectOverview.html?year=2019'
                },
            ]
        },

        /**
         * 项目近五年分布情况条形图数据
         */
        projectCanvasData: {
            labels: ["2015年", "2016年", "2017年", "2018年", "2019年"],
            datasets: [
                {
                    label: "Electronics",
                    fillColor: "#2ac2d8",
                    data: [65, 59, 80, 81, 56]
                }
            ]
        },

        /**
         * 项目近五年分布情况折线图数据
         */
        lineCanvasData: {
            labels: ["2015年", "2016年", "2017年", "2018年", "2019年"],
            datasets: [
                {
                    fillColor: "rgba(42,194,216,.1)",
                    strokeColor: "rgba(54,127,169,.8)",
                    pointColor: "rgba(255,255,255,1)",
                    pointStrokeColor: "#2ac2d8",
                    pointHighlightFill: "#2ac2d8",
                    pointHighlightStroke: "rgba(255,255,255,1)",
                    data: [0, 0, 0, 0, 0]
                }
            ],
        },

        /**
         * 项目近五年分布情况条形图数据
         */
        dougCanvasData: [
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
        ],

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
         * 更改柱状图状态
         */
        canv_change: function (t) {
            if (t == 1) {
                this.htTagle = true;
            } else if (t == 2) {
                this.htTagle = false;
            }
        },

        /**
         * 折线图请求数据
         */
        onloadData: function (year, num) {
            let nums = 0;
            $.ajax({
                url: this.apiurl + 'api/v2/db/nums',
                data: {
                    state: '1',
                    p_tagle: '0',
                    position: '0',
                    a_year: '0',
                    w_year: year,
                    search: ''
                },
                async: false,
                type: "GET",
                dataType: "json",
                success: function (res) {
                    nums = res;
                }
            });
            //将获取到的各个
            this.lineCanvasData.datasets[0].data[num] = nums;
            this.dougCanvasData[num].value = nums;
            this.xmsumYear.arr[num].num = nums;
            this.xmsumYear.arr[num].width = nums;
            this.htsumYear.arr[num].num = nums;
            this.htsumYear.arr[num].width = nums;
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
    mounted() {
        this.onloadData('2015', 0);
        this.onloadData('2016', 1);
        this.onloadData('2017', 2);
        this.onloadData('2018', 3);
        this.onloadData('2019', 4);
        //HTTP GET 请求-获得列表数据总条数-项目
        axios.get(this.apiurl + 'api/v2/db/nums',
            {
                params: {
                    state: '1',
                    p_tagle: '0',
                    position: '0',
                    a_year: '0',
                    w_year: '0',
                    search: ''
                }
            })
            .then(
                (res) => {
                    this.entrance.project_nums = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );


        //HTTP GET 请求-获得列表数据总条数-合同
        axios.get(this.apiurl + 'api/v2/db/numsByController',
            {
                params: {
                    state: '1',
                    p_tagle: '0',
                    position: '0',
                    a_year: '0',
                    w_year: '0',
                    search: ''
                }
            })
            .then(
                (res) => {
                    this.entrance.contract_nums = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        //HTTP GET 请求-获得列表数据总条数-验收
        axios.get(this.apiurl + 'api/v2/db/nums',
            {
                params: {
                    state: '1',
                    p_tagle: '验收',
                    position: '0',
                    a_year: '0',
                    w_year: '0',
                    search: ''
                }
            })
            .then(
                (res) => {
                    this.entrance.acceptance_nums = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        //HTTP GET 请求-获得列表数据总条数-供应商
        //HTTP GET 请求-获得列表数据总条数
        axios.get(this.apiurl + 'api/v2/db/numBySupplier',
            {
                params: {
                    state: '1',
                    search: ''
                }
            })
            .then(
                (res) => {
                    this.entrance.supplier_nums = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
        //-------------
        //- 近五年项目分布情况条形图渲染 -
        //-------------
        var barChartCanvas = $("#barChart").get(0).getContext("2d");
        var barChart = new Chart(barChartCanvas);
        var barChartOptions = {
            //Boolean - 刻度是从零开始，还是从最低值向下一个数量级开始
            scaleBeginAtZero: true,
            //Boolean - 是否在图表中显示网格线
            scaleShowGridLines: true,
            //String - 网格线的颜色
            scaleGridLineColor: "rgba(0,0,0,.05)",
            //Number - 网格线宽度
            scaleGridLineWidth: 1,
            //Boolean - 是否显示水平线（X轴除外）
            scaleShowHorizontalLines: true,
            //Boolean - 是否显示水平线（y轴除外）
            scaleShowVerticalLines: true,
            //Boolean - 每根杆上是不是都有一个笔划
            barShowStroke: true,
            //Number - 条笔划的像素宽度
            barStrokeWidth: 2,
            //Number - 每个x值集之间的间距
            barValueSpacing: 26,
            //Number - X值内数据集之间的间距
            barDatasetSpacing: 1,
            //String - 图例模板
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
            //Boolean - 是否使图表响应
            responsive: true,
            maintainAspectRatio: true
        };

        barChartOptions.datasetFill = false;
        barChart.Bar(this.projectCanvasData, barChartOptions);

        //-------------
        //- 近五年项目分布情况饼状图渲染 -
        //-------------
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
        myDoughnutChart.Doughnut(this.dougCanvasData, dougOptions);

        //-------------
        //- 近五年项目分布情况折线图渲染 -
        //-------------
        var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
        var mylinehnutChart = new Chart(lineChartCanvas);
        var lineChartPotions = {
            //Boolean - 刻度是从零开始，还是从最低值向下一个数量级开始
            scaleBeginAtZero: true,
            //Boolean - 是否在图表中显示网格线
            scaleShowGridLines: true,
            //String - 网格线的颜色
            scaleGridLineColor: "rgba(0,0,0,.05)",
            //Number - 网格线宽度
            scaleGridLineWidth: 1,
            //Number - 网格字体的颜色
            scaleFontColor: "#FFF",
            //Boolean - 是否显示水平线（X轴除外）
            scaleShowHorizontalLines: true,
            //Boolean - 是否显示水平线（y轴除外）
            scaleShowVerticalLines: false,
            //Boolean - 每根杆上是不是都有一个笔划
            barShowStroke: true,
            //Number - 条笔划的像素宽度
            barStrokeWidth: 2,
            //Number - 每个x值集之间的间距
            barValueSpacing: 10,
            //Number - X值内数据集之间的间距
            barDatasetSpacing: 1,
            //String - 图例模板
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
            //Boolean - 是否使图表响应
            responsive: true,
            maintainAspectRatio: true
        };
        mylinehnutChart.Line(this.lineCanvasData, lineChartPotions);


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

            axios.get(this.apiurl + 'api/v2/db/numBySupplier',
            {
                params: {
                    username: this.user.userid,
                    search: '',
                    state: '1'
                }
            })
            .then(
                (res) => {
                    this.entrance.supplier_nums = res.data;
                }
            )
            .catch(
                (error) => { console.log(error); }
            );
            
    },
    computed: {

    },

});