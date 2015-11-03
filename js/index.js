(function() {
    var requrestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

    window.requestAnimationFrame = requestAnimationFrame;


    function Game() {
        this.score = {
            left: 0,
            right: 0
        };
        this.body = document.querySelector('body');
        this.leftScore = document.querySelector('.score .left');
        this.rightScore = document.querySelector('.score .right');
        this.init = function() {
            var me = this;
            this.generateBall();
            this.ball.move();
            return me;
        };
        this.generateBall = function() {
            this.ball = new Ball(this);
            this.ball.angle = 90;
            while (!(this.ball.angle % 90)) {
                this.ball.angle = Math.round(Math.random() * 360);
            }
        };
    }
    function Ball(game) {
        this.element = document.createElement('div');
        this.element.classList.add('ball');
        this.body = document.querySelector('body');
        this.speed = 10;
        this.game = game;

        this.body.appendChild(this.element);

        //this.point = {
            //top: this.body.offsetHeight / 2 - this.element.offsetHeight / 2,
            //left: this.body.offsetWidth / 2 - this.element.offsetWidth / 2
        //};
        this.point = {
            top: this.body.offsetHeight / 2,
            left: this.body.offsetWidth / 2
        };

        this.checkPosition = function() {
            this.angle = this.angle % 360;

            var elemTop = this.point.top;
            var elemLeft = this.point.left;

            if (elemTop <= 0) {
                this.updateHorizontalBordersAngle();
            } else if (elemTop + this.element.offsetHeight >= this.body.offsetHeight) {
                this.updateHorizontalBordersAngle();
            } else if (elemLeft <= 0)  {
                this.updateVerticalBordersAngle();
            } else if (elemLeft + this.element.offsetWidth >= this.body.offsetWidth) {
                this.updateVerticalBordersAngle();
            }

        };
        this.updateHorizontalBordersAngle = function() {
            this.angle += (180 - this.angle) * 2;
        };
        this.updateVerticalBordersAngle = function() {
            this.angle += (90 - this.angle) * 2;
        };

        this.move = function() {

            var me = this,
                ballWidth,
                ballHeight,
                bodyWidth,
                bodyHeight;

            var move = function() {
                me.checkPosition();

                me.point.top += me.speed * Math.sin(me.angle * (Math.PI / 180));
                me.point.left += me.speed * Math.cos(me.angle * (Math.PI / 180));

                ballWidth = me.element.offsetWidth,
                ballHeight = me.element.offsetHeight,

                bodyWidth = me.body.offsetWidth;
                bodyHeight = me.body.offsetHeight;

                if (me.point.top + ballHeight > bodyHeight) {
                    me.point.top = bodyHeight - ballHeight;
                }
                if (me.point.left +  ballWidth > bodyWidth) {
                    me.point.left = bodyWidth - ballWidth;
                }

                if (me.point.left < 0) {
                    me.point.left = 0;
                }

                //me.element.style.transform = 'translate(' + me.point.left + 'px,' + me.point.top + 'px)';
                me.element.style.left = me.point.left + 'px';
                me.element.style.top = me.point.top + 'px';

                requestAnimationFrame(move);
            };

            requestAnimationFrame(move);
        };
    }
    function Animator(ballsArray) {
        var me = this,
            balls = ballsArray,
            ballWidth = balls[0].element.offsetWidth,
            ballHeight = balls[0].element.offsetHeight,
            bodyWidth,
            bodyHeight;

        this.animate = function() {
            var ball;

            for (var i = 0; i < balls.length; i++) {
                ball = balls[i];
                ball.checkPosition();
                ball.point.top += ball.speed * Math.sin(ball.angle * (Math.PI / 180));
                ball.point.left += ball.speed * Math.cos(ball.angle * (Math.PI / 180));

                // should be dynamic
                bodyWidth = ball.body.offsetWidth;
                bodyHeight = ball.body.offsetHeight;


                if (ball.point.top + ballHeight > bodyHeight) {
                    ball.point.top = bodyHeight - ballHeight;
                }
                if (ball.point.left +  ballWidth > bodyWidth) {
                    ball.point.left = bodyWidth - ballWidth;
                }

                if (ball.point.left < 0) {
                    ball.point.left = 0;
                }

                ball.element.style.transform = 'translate(' + ball.point.left + 'px,' + ball.point.top + 'px)';

            }
            requestAnimationFrame(me.animate);

        }
    }
    document.addEventListener("DOMContentLoaded", function(event) {
        var balls = [];
            balls.push(new Game().init().ball);
        for(var i = 0; i < 100; i++) {
            balls.push(new Game().init().ball);
        }
        //new Animator(balls).animate();
    });
})();
