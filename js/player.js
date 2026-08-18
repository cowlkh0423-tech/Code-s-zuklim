// ============================================================
// CODE : 죽림고수
// player.js
// ============================================================

export class Player {

    constructor(canvas) {

        this.canvas = canvas;

        this.x = 0;
        this.y = 0;

        this.radius = 16;

        this.speed = 330;

        this.alive = true;

        this.reset();
    }


    reset() {

        this.x =
            this.canvas.width / 2;

        this.y =
            this.canvas.height / 2;

        this.alive = true;
    }


    update(delta, keys) {

        let dx = 0;
        let dy = 0;


        // WASD

        if (keys["w"]) {
            dy -= 1;
        }

        if (keys["s"]) {
            dy += 1;
        }

        if (keys["a"]) {
            dx -= 1;
        }

        if (keys["d"]) {
            dx += 1;
        }


        // 방향키

        if (keys["arrowup"]) {
            dy -= 1;
        }

        if (keys["arrowdown"]) {
            dy += 1;
        }

        if (keys["arrowleft"]) {
            dx -= 1;
        }

        if (keys["arrowright"]) {
            dx += 1;
        }


        // 대각선 속도 보정

        if (dx !== 0 || dy !== 0) {

            const length =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            dx /= length;
            dy /= length;
        }


        // 이동

        this.x +=
            dx *
            this.speed *
            delta;

        this.y +=
            dy *
            this.speed *
            delta;


        // 화면 밖 방지

        this.x =
            Math.max(
                this.radius,
                Math.min(
                    this.canvas.width -
                    this.radius,
                    this.x
                )
            );


        this.y =
            Math.max(
                this.radius,
                Math.min(
                    this.canvas.height -
                    this.radius,
                    this.y
                )
            );
    }


    draw(ctx) {

        if (!this.alive) {
            return;
        }


        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );


        // 외부 빛

        ctx.shadowColor =
            "rgba(235, 200, 100, 0.9)";

        ctx.shadowBlur = 20;


        // 외곽

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#dfc36b";

        ctx.fill();


        // 내부

        ctx.shadowBlur = 0;

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            this.radius * 0.55,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#102516";

        ctx.fill();


        // 중앙

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#fff0a0";

        ctx.fill();


        ctx.restore();
    }

}
