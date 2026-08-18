// ============================================================
// CODE : 죽림고수
// arrow.js
// ============================================================

export class Arrow {

    constructor(x, y, angle, speed = 450) {

        // 위치
        this.x = x;
        this.y = y;

        // 이동 방향
        this.angle = angle;

        // 속도
        this.speed = speed;

        // 화살 상태
        this.active = true;

        // 화살 크기
        this.length = 46;
        this.width = 5;

    }


    // ========================================================
    // 업데이트
    // ========================================================

    update(delta) {

        this.x +=
            Math.cos(this.angle) *
            this.speed *
            delta;

        this.y +=
            Math.sin(this.angle) *
            this.speed *
            delta;

    }


    // ========================================================
    // 화면 밖 확인
    // ========================================================

    isOutside(width, height) {

        const margin = 100;

        return (
            this.x < -margin ||
            this.x > width + margin ||
            this.y < -margin ||
            this.y > height + margin
        );

    }


    // ========================================================
    // 플레이어 충돌
    // ========================================================

    collidesWith(player) {

        const dx =
            this.x - player.x;

        const dy =
            this.y - player.y;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        return (
            distance <
            player.radius + 12
        );

    }


    // ========================================================
    // 화살 그리기
    // ========================================================

    draw(ctx) {

        if (!this.active) {

            return;

        }


        ctx.save();


        // 화살 위치
        ctx.translate(
            this.x,
            this.y
        );


        // 이동 방향으로 회전
        ctx.rotate(
            this.angle
        );


        // ====================================================
        // 황금빛 잔상
        // ====================================================

        ctx.shadowColor =
            "rgba(235, 194, 82, 0.9)";

        ctx.shadowBlur = 12;


        // ====================================================
        // 화살대
        // ====================================================

        const shaft =
            ctx.createLinearGradient(
                -23,
                0,
                20,
                0
            );


        shaft.addColorStop(
            0,
            "#745622"
        );

        shaft.addColorStop(
            0.5,
            "#e3c46a"
        );

        shaft.addColorStop(
            1,
            "#a17c32"
        );


        ctx.fillStyle =
            shaft;


        ctx.fillRect(
            -22,
            -2.5,
            36,
            5
        );


        // ====================================================
        // 화살촉
        // ====================================================

        ctx.beginPath();

        ctx.moveTo(
            25,
            0
        );

        ctx.lineTo(
            9,
            -10
        );

        ctx.lineTo(
            12,
            0
        );

        ctx.lineTo(
            9,
            10
        );

        ctx.closePath();


        const head =
            ctx.createLinearGradient(
                8,
                -10,
                25,
                10
            );


        head.addColorStop(
            0,
            "#fff1a8"
        );

        head.addColorStop(
            0.5,
            "#e5c15b"
        );

        head.addColorStop(
            1,
            "#8c6725"
        );


        ctx.fillStyle =
            head;

        ctx.fill();


        // ====================================================
        // 깃털
        // ====================================================

        ctx.shadowBlur = 3;


        ctx.beginPath();

        ctx.moveTo(
            -22,
            0
        );

        ctx.lineTo(
            -33,
            -8
        );

        ctx.lineTo(
            -28,
            0
        );

        ctx.lineTo(
            -33,
            8
        );

        ctx.closePath();


        ctx.fillStyle =
            "#a9863a";

        ctx.fill();


        // ====================================================
        // 화살대 하이라이트
        // ====================================================

        ctx.shadowBlur = 0;


        ctx.fillStyle =
            "rgba(255,245,190,0.75)";


        ctx.fillRect(
            -14,
            -1,
            23,
            2
        );


        ctx.restore();

    }

}
