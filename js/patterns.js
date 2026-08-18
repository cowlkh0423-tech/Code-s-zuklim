// ============================================================
// CODE : 죽림고수
// patterns.js
// ============================================================

import { Arrow } from "./arrow.js";


export class PatternManager {

    constructor(game) {

        this.game = game;

        this.timer = 1;

        this.elapsed = 0;

    }


    // ========================================================
    // 초기화
    // ========================================================

    reset() {

        this.timer = 1;

        this.elapsed = 0;

    }


    // ========================================================
    // 업데이트
    // ========================================================

    update(delta) {

        this.elapsed += delta;

        this.timer -= delta;


        if (this.timer <= 0) {

            this.createPattern();

            this.timer =
                this.getInterval();

        }

    }


    // ========================================================
    // 패턴 간격
    // ========================================================

    getInterval() {

        if (this.elapsed < 3) {

            return 0.9;

        }


        if (this.elapsed < 6) {

            return 0.7;

        }


        if (this.elapsed < 10) {

            return 0.5;

        }


        if (this.elapsed < 15) {

            return 0.38;

        }


        return 0.28;

    }


    // ========================================================
    // 패턴 선택
    // ========================================================

    createPattern() {

        const time =
            this.elapsed;


        // 초반

        if (time < 3) {

            this.straight();

            return;

        }


        // 3~6초

        if (time < 6) {

            this.random([

                () => this.straight(),

                () => this.double(),

                () => this.diagonal()

            ]);

            return;

        }


        // 6~10초

        if (time < 10) {

            this.random([

                () => this.double(),

                () => this.diagonal(),

                () => this.fan(),

                () => this.aim()

            ]);

            return;

        }


        // 10초 이후

        this.random([

            () => this.double(),

            () => this.fan(),

            () => this.bigFan(),

            () => this.aim(),

            () => this.cross(),

            () => this.combination()

        ]);

    }


    // ========================================================
    // 랜덤 패턴
    // ========================================================

    random(patterns) {

        const index =
            Math.floor(
                Math.random() *
                patterns.length
            );


        patterns[index]();

    }


    // ========================================================
    // 화살 생성
    // ========================================================

    addArrow(
        x,
        y,
        angle,
        speed = 450
    ) {

        this.game.arrows.push(

            new Arrow(
                x,
                y,
                angle,
                speed
            )

        );

    }


    // ========================================================
    // 1. 직선
    // ========================================================

    straight() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const side =
            Math.floor(
                Math.random() * 4
            );


        const margin = 70;


        if (side === 0) {

            this.addArrow(

                Math.random() * width,
                -margin,

                Math.PI / 2

            );

        }


        else if (side === 1) {

            this.addArrow(

                width + margin,
                Math.random() * height,

                Math.PI

            );

        }


        else if (side === 2) {

            this.addArrow(

                Math.random() * width,
                height + margin,

                -Math.PI / 2

            );

        }


        else {

            this.addArrow(

                -margin,
                Math.random() * height,

                0

            );

        }

    }


    // ========================================================
    // 2. 양쪽
    // ========================================================

    double() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const y =
            Math.random() * height;


        this.addArrow(
            -70,
            y,
            0,
            470
        );


        this.addArrow(
            width + 70,
            y,
            Math.PI,
            470
        );

    }


    // ========================================================
    // 3. 대각선
    // ========================================================

    diagonal() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const corner =
            Math.floor(
                Math.random() * 4
            );


        const margin = 70;


        if (corner === 0) {

            this.addArrow(
                -margin,
                -margin,
                Math.PI / 4,
                480
            );

        }


        else if (corner === 1) {

            this.addArrow(
                width + margin,
                -margin,
                3 * Math.PI / 4,
                480
            );

        }


        else if (corner === 2) {

            this.addArrow(
                width + margin,
                height + margin,
                5 * Math.PI / 4,
                480
            );

        }


        else {

            this.addArrow(
                -margin,
                height + margin,
                7 * Math.PI / 4,
                480
            );

        }

    }


    // ========================================================
    // 4. 부채꼴
    // ========================================================

    fan() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const side =
            Math.floor(
                Math.random() * 4
            );


        const margin = 70;

        let x;

        let y;

        let baseAngle;


        if (side === 0) {

            x =
                Math.random() * width;

            y = -margin;

            baseAngle =
                Math.PI / 2;

        }


        else if (side === 1) {

            x = width + margin;

            y =
                Math.random() * height;

            baseAngle =
                Math.PI;

        }


        else if (side === 2) {

            x =
                Math.random() * width;

            y = height + margin;

            baseAngle =
                -Math.PI / 2;

        }


        else {

            x = -margin;

            y =
                Math.random() * height;

            baseAngle = 0;

        }


        const count = 7;

        const spread =
            Math.PI / 9;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const angle =
                baseAngle +
                (
                    i -
                    (count - 1) / 2
                ) *
                spread;


            this.addArrow(
                x,
                y,
                angle,
                460
            );

        }

    }


    // ========================================================
    // 5. 대형 부채꼴
    // ========================================================

    bigFan() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const margin = 70;


        const x =
            Math.random() * width;


        const count = 11;


        const baseAngle =
            Math.PI / 2;


        const spread =
            Math.PI / 11;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const angle =
                baseAngle +
                (
                    i -
                    (count - 1) / 2
                ) *
                spread;


            this.addArrow(
                x,
                -margin,
                angle,
                490
            );

        }

    }


    // ========================================================
    // 6. 플레이어 조준
    // ========================================================

    aim() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;

        const player =
            this.game.player;


        const side =
            Math.floor(
                Math.random() * 4
            );


        const margin = 70;


        let x;

        let y;


        if (side === 0) {

            x =
                Math.random() * width;

            y = -margin;

        }


        else if (side === 1) {

            x = width + margin;

            y =
                Math.random() * height;

        }


        else if (side === 2) {

            x =
                Math.random() * width;

            y = height + margin;

        }


        else {

            x = -margin;

            y =
                Math.random() * height;

        }


        const dx =
            player.x - x;

        const dy =
            player.y - y;


        const angle =
            Math.atan2(
                dy,
                dx
            );


        this.addArrow(
            x,
            y,
            angle,
            520
        );

    }


    // ========================================================
    // 7. 십자
    // ========================================================

    cross() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const speed = 500;


        this.addArrow(
            width / 2,
            -70,
            Math.PI / 2,
            speed
        );


        this.addArrow(
            width + 70,
            height / 2,
            Math.PI,
            speed
        );


        this.addArrow(
            width / 2,
            height + 70,
            -Math.PI / 2,
            speed
        );


        this.addArrow(
            -70,
            height / 2,
            0,
            speed
        );

    }


    // ========================================================
    // 8. 복합 패턴
    // ========================================================

    combination() {

        this.fan();


        setTimeout(
            () => {

                if (
                    !this.game.running
                ) {

                    return;

                }

                this.aim();

            },
            180
        );


        setTimeout(
            () => {

                if (
                    !this.game.running
                ) {

                    return;

                }

                this.double();

            },
            360
        );

    }

}
