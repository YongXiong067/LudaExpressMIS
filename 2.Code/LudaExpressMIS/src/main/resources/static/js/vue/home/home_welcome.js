/*** 欢迎界面 vue实例 ***/

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
            username: '李莹娜',
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
                            url: '',
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
                            url: '',
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

        /**
         * 注销登录
         */
        cancellation: function () {
            window.location.href = "login.html";
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
        var username;
        
        $.ajax({
            url: this.apiurl + 'api/v2/user/getLogin',
            async: false,
            type: "GET",
            dataType: "json",
            success: function (res) {
                username = res.username;
            }
        });
        

        var S = {
            init: function () {
                S.Drawing.init('.canvas');
                S.UI.simulate('欢迎您|' + username + '||');
                S.Drawing.loop(function () {
                    S.Shape.render();
                });
                setTimeout("{window.location.href='index.html'}", 4000);
            }

        };

        S.Drawing = (function () {
            var canvas,
                context,
                renderFn
            requestFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
            return {
                init: function (el) {
                    canvas = document.querySelector(el);
                    context = canvas.getContext('2d');
                    this.adjustCanvas();
                    window.addEventListener('resize', function (e) {
                        S.Drawing.adjustCanvas();
                    });
                },

                loop: function (fn) {
                    renderFn = !renderFn ? fn : renderFn;
                    this.clearFrame();
                    renderFn();
                    requestFrame.call(window, this.loop.bind(this));
                },

                adjustCanvas: function () {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                },

                clearFrame: function () {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                },

                getArea: function () {
                    return { w: canvas.width, h: canvas.height };
                },

                drawCircle: function (p, c) {
                    context.fillStyle = c.render();
                    context.beginPath();
                    context.arc(p.x, p.y, p.z, 0, 2 * Math.PI, true);
                    context.closePath();
                    context.fill();
                }
            }
        }());

        S.UI = (function () {
            var canvas = document.querySelector('.canvas'),
                interval,
                isTouch = false, //('ontouchstart' in window || navigator.msMaxTouchPoints),
                currentAction,
                time,
                maxShapeSize = 35,
                sequence = [],
                cmd = '#';

            function formatTime(date) {
                var h = date.getHours(),
                    m = date.getMinutes(),
                    m = m < 10 ? '0' + m : m;
                return h + ':' + m;
            }

            function getValue(value) {
                return value && value.split(' ')[1];
            }

            function getAction(value) {
                value = value && value.split(' ')[0];
                return value && value[0] === cmd && value.substring(1);
            }

            function timedAction(fn, delay, max, reverse) {
                clearInterval(interval);
                currentAction = reverse ? max : 1;
                fn(currentAction);

                if (!max || (!reverse && currentAction < max) || (reverse && currentAction > 0)) {
                    interval = setInterval(function () {
                        currentAction = reverse ? currentAction - 1 : currentAction + 1;
                        fn(currentAction);

                        if ((!reverse && max && currentAction === max) || (reverse && currentAction === 0)) {
                            clearInterval(interval);
                        }
                    }, delay);
                }
            }

            function performAction(value) {
                var action,
                    value,
                    current;
                sequence = typeof (value) === 'object' ? value : sequence.concat(value.split('|'));
                timedAction(function (index) {
                    current = sequence.shift();
                    action = getAction(current);
                    value = getValue(current);

                    switch (action) {
                        case 'countdown':
                            value = parseInt(value) || 10;
                            value = value > 0 ? value : 10;

                            timedAction(function (index) {
                                if (index === 0) {
                                    if (sequence.length === 0) {
                                        S.Shape.switchShape(S.ShapeBuilder.letter(''));
                                    } else {
                                        performAction(sequence);
                                    }
                                } else {
                                    S.Shape.switchShape(S.ShapeBuilder.letter(index), true);
                                }
                            }, 1000, value, true);
                            break;

                        case 'rectangle':
                            value = value && value.split('x');
                            value = (value && value.length === 2) ? value : [maxShapeSize, maxShapeSize / 2];

                            S.Shape.switchShape(S.ShapeBuilder.rectangle(Math.min(maxShapeSize, parseInt(value[0])), Math.min(maxShapeSize, parseInt(value[1]))));
                            break;

                        case 'circle':
                            value = parseInt(value) || maxShapeSize;
                            value = Math.min(value, maxShapeSize);
                            S.Shape.switchShape(S.ShapeBuilder.circle(value));
                            break;

                        case 'time':
                            var t = formatTime(new Date());

                            if (sequence.length > 0) {
                                S.Shape.switchShape(S.ShapeBuilder.letter(t));
                            } else {
                                timedAction(function () {
                                    t = formatTime(new Date());
                                    if (t !== time) {
                                        time = t;
                                        S.Shape.switchShape(S.ShapeBuilder.letter(time));
                                    }
                                }, 1000);
                            }
                            break;

                        default:
                            S.Shape.switchShape(S.ShapeBuilder.letter(current[0] === cmd ? 'What?' : current));
                    }
                }, 1200, sequence.length);
            }

            function bindEvents() {

                canvas.addEventListener('click', function (e) {
                });
            }

            function init() {
                bindEvents();
                isTouch && document.body.classList.add('touch');
            }
            // Init
            init();
            return {
                simulate: function (action) {
                    performAction(action);
                }
            }
        }());

        S.Point = function (args) {
            this.x = args.x;
            this.y = args.y;
            this.z = args.z;
            this.a = args.a;
            this.h = args.h;
        };

        S.Color = function (r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        };

        S.Color.prototype = {
            render: function () {
                return 'rgba(' + this.r + ',' + + this.g + ',' + this.b + ',' + this.a + ')';
            }
        };

        S.Dot = function (x, y) {
            this.p = new S.Point({
                x: x,
                y: y,
                z: 5,
                a: 1,
                h: 0
            });

            this.e = 0.07;
            this.s = true;
            this.c = new S.Color(30, 144, 255, this.p.a);
            this.t = this.clone();
            this.q = [];
        };

        S.Dot.prototype = {
            clone: function () {
                return new S.Point({
                    x: this.x,
                    y: this.y,
                    z: this.z,
                    a: this.a,
                    h: this.h
                });
            },

            _draw: function () {
                this.c.a = this.p.a;
                S.Drawing.drawCircle(this.p, this.c);
            },

            _moveTowards: function (n) {
                var details = this.distanceTo(n, true),
                    dx = details[0],
                    dy = details[1],
                    d = details[2],
                    e = this.e * d;

                if (this.p.h === -1) {
                    this.p.x = n.x;
                    this.p.y = n.y;
                    return true;
                }

                if (d > 1) {
                    this.p.x -= ((dx / d) * e);
                    this.p.y -= ((dy / d) * e);
                } else {
                    if (this.p.h > 0) {
                        this.p.h--;
                    } else {
                        return true;
                    }
                }
                return false;
            },

            _update: function () {
                if (this._moveTowards(this.t)) {
                    var p = this.q.shift();
                    if (p) {
                        this.t.x = p.x || this.p.x;
                        this.t.y = p.y || this.p.y;
                        this.t.z = p.z || this.p.z;
                        this.t.a = p.a || this.p.a;
                        this.p.h = p.h || 0;
                    } else {
                        if (this.s) {
                            this.p.x -= Math.sin(Math.random() * 3.142);
                            this.p.y -= Math.sin(Math.random() * 3.142);
                        } else {
                            this.move(new S.Point({
                                x: this.p.x + (Math.random() * 50) - 25,
                                y: this.p.y + (Math.random() * 50) - 25,
                            }));
                        }
                    }
                }
                d = this.p.a - this.t.a;
                this.p.a = Math.max(0.1, this.p.a - (d * 0.05));
                d = this.p.z - this.t.z;
                this.p.z = Math.max(1, this.p.z - (d * 0.05));
            },

            distanceTo: function (n, details) {
                var dx = this.p.x - n.x,
                    dy = this.p.y - n.y,
                    d = Math.sqrt(dx * dx + dy * dy);

                return details ? [dx, dy, d] : d;
            },

            move: function (p, avoidStatic) {
                if (!avoidStatic || (avoidStatic && this.distanceTo(p) > 1)) {
                    this.q.push(p);
                }
            },

            render: function () {
                this._update();
                this._draw();
            }
        }

        S.ShapeBuilder = (function () {
            var gap = 13,
                shapeCanvas = document.createElement('canvas'),
                shapeContext = shapeCanvas.getContext('2d'),
                fontSize = 600,
                fontFamily = 'Avenir, Helvetica Neue, Helvetica, Arial, sans-serif';

            function fit() {
                shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap;
                shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap;
                shapeContext.fillStyle = 'red';
                shapeContext.textBaseline = 'middle';
                shapeContext.textAlign = 'center';
            }

            function processCanvas() {
                var pixels = shapeContext.getImageData(0, 0, shapeCanvas.width, shapeCanvas.height).data;
                dots = [],
                    pixels,
                    x = 0,
                    y = 0,
                    fx = shapeCanvas.width,
                    fy = shapeCanvas.height,
                    w = 0,
                    h = 0;

                for (var p = 0; p < pixels.length; p += (4 * gap)) {
                    if (pixels[p + 3] > 0) {
                        dots.push(new S.Point({
                            x: x,
                            y: y
                        }));
                        w = x > w ? x : w;
                        h = y > h ? y : h;
                        fx = x < fx ? x : fx;
                        fy = y < fy ? y : fy;
                    }
                    x += gap;
                    if (x >= shapeCanvas.width) {
                        x = 0;
                        y += gap;
                        p += gap * 4 * shapeCanvas.width;
                    }
                }
                return { dots: dots, w: w + fx, h: h + fy };
            }

            function setFontSize(s) {
                shapeContext.font = 'bold ' + s + 'px ' + fontFamily;
            }
            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
            function init() {
                fit();
                window.addEventListener('resize', fit);
            }
            // Init
            init();
            return {
                imageFile: function (url, callback) {
                    var image = new Image(),
                        a = S.Drawing.getArea();

                    image.onload = function () {
                        shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
                        shapeContext.drawImage(this, 0, 0, a.h * 0.6, a.h * 0.6);
                        callback(processCanvas());
                    };

                    image.onerror = function () {
                        callback(S.ShapeBuilder.letter('What?'));
                    }

                    image.src = url;
                },

                circle: function (d) {
                    var r = Math.max(0, d) / 2;
                    shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
                    shapeContext.beginPath();
                    shapeContext.arc(r * gap, r * gap, r * gap, 0, 2 * Math.PI, false);
                    shapeContext.fill();
                    shapeContext.closePath();

                    return processCanvas();
                },

                letter: function (l) {
                    var s = 0;

                    setFontSize(fontSize);
                    s = Math.min(fontSize,
                        (shapeCanvas.width / shapeContext.measureText(l).width) * 0.8 * fontSize,
                        (shapeCanvas.height / fontSize) * (isNumber(l) ? 1 : 0.45) * fontSize);
                    setFontSize(s);

                    shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
                    shapeContext.fillText(l, shapeCanvas.width / 2, shapeCanvas.height / 2);

                    return processCanvas();
                },

                rectangle: function (w, h) {
                    var dots = [],
                        width = gap * w,
                        height = gap * h;

                    for (var y = 0; y < height; y += gap) {
                        for (var x = 0; x < width; x += gap) {
                            dots.push(new S.Point({
                                x: x,
                                y: y,
                            }));
                        }
                    }

                    return { dots: dots, w: width, h: height };
                }
            };
        }());


        S.Shape = (function () {
            var dots = [],
                width = 0,
                height = 0,
                cx = 0,
                cy = 0;

            function compensate() {
                var a = S.Drawing.getArea();

                cx = a.w / 2 - width / 2;
                cy = a.h / 2 - height / 2;
            }

            return {
                shuffleIdle: function () {
                    var a = S.Drawing.getArea();

                    for (var d = 0; d < dots.length; d++) {
                        if (!dots[d].s) {
                            dots[d].move({
                                x: Math.random() * a.w,
                                y: Math.random() * a.h
                            });
                        }
                    }
                },

                switchShape: function (n, fast) {
                    var size,
                        a = S.Drawing.getArea();

                    width = n.w;
                    height = n.h;

                    compensate();

                    if (n.dots.length > dots.length) {
                        size = n.dots.length - dots.length;
                        for (var d = 1; d <= size; d++) {
                            dots.push(new S.Dot(a.w / 2, a.h / 2));
                        }
                    }

                    var d = 0,
                        i = 0;

                    while (n.dots.length > 0) {
                        i = Math.floor(Math.random() * n.dots.length);
                        dots[d].e = fast ? 0.25 : (dots[d].s ? 0.14 : 0.11);

                        if (dots[d].s) {
                            dots[d].move(new S.Point({
                                z: Math.random() * 20 + 10,
                                a: Math.random(),
                                h: 18
                            }));
                        } else {
                            dots[d].move(new S.Point({
                                z: Math.random() * 5 + 5,
                                h: fast ? 18 : 30
                            }));
                        }

                        dots[d].s = true;
                        dots[d].move(new S.Point({
                            x: n.dots[i].x + cx,
                            y: n.dots[i].y + cy,
                            a: 1,
                            z: 5,
                            h: 0
                        }));

                        n.dots = n.dots.slice(0, i).concat(n.dots.slice(i + 1));
                        d++;
                    }

                    for (var i = d; i < dots.length; i++) {
                        if (dots[i].s) {
                            dots[i].move(new S.Point({
                                z: Math.random() * 20 + 10,
                                a: Math.random(),
                                h: 20
                            }));

                            dots[i].s = false;
                            dots[i].e = 0.04;
                            dots[i].move(new S.Point({
                                x: Math.random() * a.w,
                                y: Math.random() * a.h,
                                a: 0.3, //.4
                                z: Math.random() * 4,
                                h: 0
                            }));
                        }
                    }
                },

                render: function () {
                    for (var d = 0; d < dots.length; d++) {
                        dots[d].render();
                    }
                }
            }
        }());

        S.init();
    }

});