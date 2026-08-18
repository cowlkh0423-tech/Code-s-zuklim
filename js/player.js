// ============================================================
// CODE : 죽림고수
// player.js
// ============================================================

export class Player {

    constructor(canvas) {

        this.canvas = canvas;

        // 위치
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;

        // 크기
        this.radius = 16;

        // 이동 속도
        this.speed = 330;

        // 목숨은 딱 1개
        this.alive = true;

    }


    // ========================================================
    // 초기화
    // ========================================================

    reset() {

        this.x =
            this.canvas.width / 2;

        this.y =
            this.canvas.height / 2;

        this.alive = true;

    }


    // ========================================================
    // 이동
    // ========================================================

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


        // 방향키도 허용

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


        // 대각선 이동 속도 보정

        if (dx !== 0 || dy !== 0) {

            const length =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            dx /= length;
            dy /= length;

        }


        this.x +=
            dx *
            this.speed *
            delta;

        this.y +=
            dy *
            this.speed *
            delta;


        // 화면 밖으로 나가지 못하게 함

        this.x =
            Math.max(
                this.radius,
                Math.min(
                    canvas.width -
                    this.radius,
                    this.x
                )
            );

        this.y =
            Math.max(
                this.radius,
                Math.min(
                    canvas.height -
                    this.radius,
                    this.y
                )
            );

    }


    // ========================================================
    // 플레이어 그리기
    // ========================================================

    draw(ctx) {

        if (!this.alive) {
            return;
        }


        ctx.save();


        ctx.translate(
            this.x,
            this.y
        );


        // ----------------------------------------------------
        // 외부 빛
        // ----------------------------------------------------

        ctx.shadowColor =
            "rgba(224,190,92,0.8)";

        ctx.shadowBlur = 20;


        // ----------------------------------------------------
        // 외곽 원
        // ----------------------------------------------------

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#d9b965";

        ctx.fill();


        // ----------------------------------------------------
        // 내부
        // ----------------------------------------------------

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
            "#0b1b0e";

        ctx.fill();


        // ----------------------------------------------------
        // 중앙 빛
        // ----------------------------------------------------

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#f2da8a";

        ctx.fill();


        ctx.restore();

    }

}
