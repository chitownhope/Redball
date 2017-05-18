// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback ) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


function Ball(leftval, topval) {
    this._left = leftval;
    this._top = topval;
    this.__defineGetter__("left", function () {
//			log("get left");
        return this._left;
    });
    this.__defineSetter__("left", function (val) {
//			log("set left");
        this._left = val;
        animation.push(new RecordedMove(this._left, this._top));
    });
    this.__defineGetter__("top", function () {
//			log("get top");
        return this._top;
    });
    this.__defineSetter__("top", function (val) {
//			log("set top");
        this._top = val;
        animation.push(new RecordedMove(this._left, this._top));
    });
}

//initial coordinates for the ball image when it is loaded
// pressing up on the keyboard increments the y, and pressing left and right changes the x

var x = 50;
var y = 100;
var animation = [];
var redball = new Ball(x, y);
animate();

function RecordedMove(newx, newy) {
    this.x = newx;
    this.y = newy;
    //log("recorded move x" + this.x + ' total moves ' + animation.length);
}

function animate() {
    requestAnimFrame(animate);
    draw();
}

function draw() {
    var move = animation.shift();
    if (move) {
        x = move.x;
        y = move.y;
    }

    if (document.getElementById("redball")) {
        document.getElementById("redball").style.position = 'absolute';
        document.getElementById("redball").style.left = x + 'px';
        document.getElementById("redball").style.top = y + 'px';
    }
    else {
        console.log('cannot find element with id of "redball"');
    }

}

//type cooercion js is changing the values you are giving it so it do the work you want it to
// is confused by the double ==

//imagine doing '37' == 37
//that is true

//type cooercion is bad bad
// changes the code and makes it unpredictable


window.onload = function () {
    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.keyCode === 37) {
            redball.left = redball.left - 5;
        }
        if (e.keyCode === 38) {
            redball.top = redball.top - 5;
        }
        if (e.keyCode === 39) {
            redball.left = redball.left + 5;
        }
        if (e.keyCode === 40) {
            redball.top = redball.top + 5;
        }
    }
};



// function log(msg) {
//     document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + "<br>" + msg;
// }