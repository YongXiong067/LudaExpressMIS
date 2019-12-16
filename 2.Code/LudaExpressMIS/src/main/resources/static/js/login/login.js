

// 粒子字体
var COLOR = "#52E6FF"
var MESSAGE = document.getElementById("title-desktop").textContent;

var FONT_SIZE = 100;  //字体大小
var AMOUNT = 2500;    //粒子总数
var SIZE = 2;         //粒子大小
var INITIAL_DISPLACEMENT = 500;     //
var INITIAL_VELOCITY = 5;           //初始
var VELOCITY_RETENTION = 0.90;
var SETTLE_SPEED = 2;
var FLEE_SPEED = 2;
var FLEE_DISTANCE = 50;
var FLEE = true;
var SCATTER_VELOCITY = 1;
var SCATTER = true;



const canvas = document.getElementById("spring-text");
const ctx = canvas.getContext("2d");

var POINTS = [];
var MOUSE = {
    x: 0,
    y: 0
}

function Point(x, y, r, g, b, a) {
    var angle = Math.random() * 6.28;
    this.dest_x = x;
    this.dest_y = y;
    this.original_r = r;
    this.original_g = g;
    this.original_a = a;
    this.x = canvas.width / 2 - x + (Math.random() - 0.5) * INITIAL_DISPLACEMENT;
    this.y = canvas.height / 2 - y + (Math.random() - 0.5) * INITIAL_DISPLACEMENT;
    this.velx = INITIAL_VELOCITY * Math.cos(angle);
    this.vely = INITIAL_VELOCITY * Math.sin(angle);
    this.target_x = canvas.width / 2 - x;
    this.target_y = canvas.height / 2 - y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

    this.getX = function () {
        return this.x;
    }

    this.getY = function () {
        return this.y;
    }

    this.resetTarget = function () {
        this.target_x = canvas.width / 2 - this.dest_x;
        this.target_y = canvas.height / 2 - this.dest_y;
    }

    this.fleeFrom = function (x, y) {
        this.velx -= ((MOUSE.x - this.x) * FLEE_SPEED / 15);
        this.vely -= ((MOUSE.y - this.y) * FLEE_SPEED / 15);
    }

    this.settleTo = function (x, y) {
        this.velx += ((this.target_x - this.x) * SETTLE_SPEED / 150);
        this.vely += ((this.target_y - this.y) * SETTLE_SPEED / 150);
        this.velx -= this.velx * (1 - VELOCITY_RETENTION);
        this.vely -= this.vely * (1 - VELOCITY_RETENTION);
    }

    this.scatter = function () {
        var unit = this.unitVecToMouse();
        var vel = SCATTER_VELOCITY * 10 * (0.5 + Math.random() / 2);
        this.velx = -unit.x * vel;
        this.vely = -unit.y * vel;
    }

    this.move = function () {
        if (this.distanceToMouse() <= FLEE_DISTANCE) {
            this.fleeFrom(MOUSE.x, MOUSE.y);
        }
        else {
            this.settleTo(this.target_x, this.target_y);
        }

        if (this.x + this.velx < 0 || this.x + this.velx >= canvas.width) {
            this.velx *= -1;
        }
        if (this.y + this.vely < 0 || this.y + this.vely >= canvas.height) {
            this.vely *= -1;
        }

        this.x += this.velx;
        this.y += this.vely;
    }

    this.distanceToTarget = function () {
        return this.distanceTo(this.target_x, this.target_y);
    }

    this.distanceToMouse = function () {
        return this.distanceTo(MOUSE.x, MOUSE.y);
    }

    this.distanceTo = function (x, y) {
        return Math.sqrt((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y));
    }

    this.unitVecToTarget = function () {
        return this.unitVecTo(this.target_x, this.target_y);
    }

    this.unitVecToMouse = function () {
        return this.unitVecTo(MOUSE.x, MOUSE.y);
    }

    this.unitVecTo = function (x, y) {
        var dx = x - this.x;
        var dy = y - this.y;
        return {
            x: dx / Math.sqrt(dx * dx + dy * dy),
            y: dy / Math.sqrt(dx * dx + dy * dy)
        };
    }
}

window.addEventListener("resize", function () {
    resizeCanvas()
    adjustText()
});

if (FLEE) {
    window.addEventListener("mousemove", function (event) {
        MOUSE.x = event.clientX;
        MOUSE.y = event.clientY + canvas.height*0.15;
    });
}


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function adjustText() {
    ctx.fillStyle = COLOR;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = FONT_SIZE + "px Arial";
    ctx.fillText(MESSAGE, canvas.width / 2, canvas.height / 2);
    var textWidth = ctx.measureText(MESSAGE).width;
    if (textWidth == 0) {
        return;
    }
    var minX = canvas.width / 2 - textWidth / 2;
    var minY = canvas.height / 2 - FONT_SIZE / 2;
    var data = ctx.getImageData(minX, minY, textWidth, FONT_SIZE).data;
    var isBlank = true;
    for (var i = 0; i < data.length; i++) {
        if (data[i] != 0) {
            isBlank = false;
            break;
        }
    }

    if (!isBlank) {
        var count = 0;
        var curr = 0;
        var num = 0;
        var x = 0;
        var y = 0;
        var w = Math.floor(textWidth);
        POINTS = [];
        while (count < AMOUNT) {
            while (curr == 0) {
                num = Math.floor(Math.random() * data.length);
                curr = data[num];
            }
            num = Math.floor(num / 4);
            x = w / 2 - num % w;
            y = FONT_SIZE / 2 - Math.floor(num / w);
            POINTS.push(new Point(x, y, data[num * 4], data[num * 4 + 1], data[num * 4 + 2], data[num * 4 + 3]));
            curr = 0;
            count++;
        }
    }
}

function init() {
    resizeCanvas()
    adjustText()
    window.requestAnimationFrame(animate);
}

function animate() {
    update();
    draw();
}

function update() {
    var point;
    for (var i = 0; i < POINTS.length; i++) {
        point = POINTS[i];
        point.move();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var point;
    for (var i = 0; i < POINTS.length; i++) {
        point = POINTS[i];
        ctx.fillStyle = "rgba(" + point.r + "," + point.g + "," + point.b + "," + point.a + ")";
        ctx.beginPath();
        ctx.arc(point.getX(), point.getY(), SIZE, 0, 2 * Math.PI);
        ctx.fill();
    }

    window.requestAnimationFrame(animate);
}

init();

//鼠标吸附特效
!function () {
    function n(n, e, t) {
        return n.getAttribute(e) || t
    }
    function e(n) {
        return document.getElementsByTagName(n)
    }
    function t() {
        var t = e("script"), o = t.length, i = t[o - 1];
        return { l: o, z: n(i, "zIndex", -1), o: n(i, "opacity", .5), c: n(i, "color", "240,230,230"), n: n(i, "count", 120) }
    }
    function o() {
        a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
    function i() {
        r.clearRect(0, 0, a, c);
        var n, e, t, o, m, l;
        s.forEach(function (i, x) {
            for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++)n = u[e],
                null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y,
                    l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m),
                        t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
        }),
            x(i)
    }
    var a, c, u, m = document.createElement("canvas"),
        d = t(), l = "c_n" + d.l, r = m.getContext("2d"),
        x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function (n) {
                window.setTimeout(n, 1e3 / 45)
            },
        w = Math.random, y = { x: null, y: null, max: 2e4 }; m.id = l, m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o, e("body")[0].appendChild(m), o(), window.onresize = o,
            window.onmousemove = function (n) {
                n = n || window.event, y.x = n.clientX, y.y = n.clientY
            },
            window.onmouseout = function () {
                y.x = null, y.y = null
            };
    for (var s = [], f = 0; d.n > f; f++) {
        var h = w() * a, g = w() * c, v = 2 * w() - 1, p = 2 * w() - 1; s.push({ x: h, y: g, xa: v, ya: p, max: 6e3 })
    }
    u = s.concat([y]),
        setTimeout(function () { i() }, 100)
}();


toastr.options = {
    closeButton: false,                                            // 是否显示关闭按钮，（提示框右上角关闭按钮）
    debug: false,                                                    // 是否使用deBug模式
    progressBar: true,                                            // 是否显示进度条，（设置关闭的超时时间进度条）
    positionClass: "toast-top-center",              // 设置提示款显示的位置
    onclick: null,                                                     // 点击消息框自定义事件 
    showDuration: "300",                                      // 显示动画的时间
    hideDuration: "1000",                                     //  消失的动画时间
    timeOut: "2000",                                             //  自动关闭超时时间 
    extendedTimeOut: "1000",                             //  加长展示时间
    showEasing: "swing",                                     //  显示时的动画缓冲方式
    hideEasing: "linear",                                       //   消失时的动画缓冲方式
    showMethod: "fadeIn",                                   //   显示时的动画方式
    hideMethod: "fadeOut"                                   //   消失时的动画方式
};