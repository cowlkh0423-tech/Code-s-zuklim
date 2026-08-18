// ============================================================
// CODE : 죽림고수
// main.js
// ============================================================

import { Player } from "./player.js";
import { Arrow } from "./arrow.js";
import { PatternManager } from "./patterns.js";


// ============================================================
// Canvas
// ============================================================

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");


// ============================================================
// UI
// ============================================================

const startScreen =
    document.getElementById("startScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");

const timeDisplay =
    document.querySelector(".time");

const finalTimeDisplay =
    document.getElementById("finalTime");


// ============================================================
// 키
// ============================================================

const keys = {};

window.addEventListener(
    "keydown",
    (event) => {

        const key =
            event.key.toLowerCase();

        keys[key] = true;


        if (
            key === "arrowup" ||
            key === "arrowdown" ||
            key === "arrowleft" ||
            key === "arrowright"
        ) {

            event.preventDefault();

        }


        if (
            key === "r" &&
            !game.running
        ) {

            startGame();

        }

    }
);


window.addEventListener(
    "keyup",
    (event) => {

        const key =
            event.key.toLowerCase();

        keys[key] = false;

    }
);


// ============================================================
// 게임
// ============================================================

const game = {

    running: false,

    startTime: 0,

    lastTime: 0,

    survivalTime: 0,

    player: null,

    arrows: [],

    patternManager: null

};


// ============================================================
// Canvas 크기
// ============================================================

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    if (game.player) {

        game.player.canvas =
            canvas;

    }

}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


// ============================================================
// 플레이어
// ============================================================

game.player =
    new Player(canvas);


// ============================================================
// 패턴 관리자
// ============================================================

game.patternManager =
    new PatternManager(game);


// ============================================================
// 게임 시작
// ============================================================

function startGame() {

    game.running = true;

    game.survivalTime = 0;

    game.arrows = [];


    game.player.reset();

    game.patternManager.reset();


    game.startTime =
        performance.now();

    game.lastTime =
        performance.now();


    startScreen.classList.add(
        "hidden"
    );

    gameOverScreen.classList.add(
        "hidden"
    );


    requestAnimationFrame(
        gameLoop
    );

}


// ============================================================
// 게임 오버
// ============================================================

function gameOver() {

    if (!game.running) {
        return;
    }


    game.running = false;

    game.player.alive = false;


    finalTimeDisplay.textContent =
        game.survivalTime.toFixed(2);


    gameOverScreen.classList.remove(
        "hidden"
    );

}


// ============================================================
// 업데이트
// ============================================================

function update(delta) {

    // 생존 시간

    game.survivalTime =
        (
            performance.now() -
            game.startTime
        ) / 1000;


    // 플레이어

    game.player.update(
        delta,
        keys
    );


    // 패턴

    game.patternManager.update(
        delta
    );


    // 화살

    for (
        const arrow of game.arrows
    ) {

        arrow.update(delta);


        // 충돌

        if (
            arrow.collidesWith(
                game.player
            )
        ) {

            arrow.active = false;

            gameOver();

            return;
        }


        // 화면 밖

        if (
            arrow.isOutside(
                canvas.width,
                canvas.height
            )
        ) {

            arrow.active = false;

        }

    }


    // 삭제

    game.arrows =
        game.arrows.filter(
            arrow =>
                arrow.active
        );

}


// ============================================================
// 배경
// ============================================================

function drawBackground() {

    const width =
        canvas.width;

    const height =
        canvas.height;


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );


    gradient.addColorStop(
        0,
        "#020806"
    );

    gradient.addColorStop(
        0.5,
        "#092012"
    );

    gradient.addColorStop(
        1,
        "#020604"
    );


    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // 대나무

    drawBamboo(
        65,
        0.6
    );

    drawBamboo(
        100,
        1
    );


    // 안개

    const fog =
        ctx.createRadialGradient(
            width / 2,
            height / 2,
            30,
            width / 2,
            height / 2,
            width * 0.7
        );


    fog.addColorStop(
        0,
        "rgba(130,170,100,0.08)"
    );

    fog.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle =
        fog;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // CODE

    ctx.save();

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.font =
        "bold " +
        Math.min(
            width * 0.16,
            150
        ) +
        "px Georgia";

    ctx.fillStyle =
        "rgba(220,185,80,0.055)";

    ctx.fillText(
        "CODE",
        width / 2,
        height / 2
    );

    ctx.restore();

}


// ============================================================
// 대나무
// ============================================================

function drawBamboo(
    spacing,
    scale
) {

    const width =
        canvas.width;

    const height =
        canvas.height;


    for (
        let x = -50;
        x < width + 100;
        x += spacing
    ) {

        const bambooWidth =
            14 * scale;


        ctx.fillStyle =
            "rgba(25,65,32,0.65)";


        ctx.fillRect(
            x,
            0,
            bambooWidth,
            height
        );


        ctx.fillStyle =
            "rgba(5,20,9,0.8)";


        for (
            let y = 60;
            y < height;
            y += 75
        ) {

            ctx.fillRect(
                x - 2,
                y,
                bambooWidth + 4,
                6
            );

        }

    }

}


// ============================================================
// 그리기
// ============================================================

function draw() {

    drawBackground();


    // 화살

    for (
        const arrow of game.arrows
    ) {

        arrow.draw(ctx);

    }


    // 플레이어

    game.player.draw(ctx);


    // 시간

    timeDisplay.textContent =
        game.survivalTime.toFixed(2);

}


// ============================================================
// 게임 루프
// ============================================================

function gameLoop(currentTime) {

    if (!game.running) {
        return;
    }


    const delta =
        Math.min(
            (
                currentTime -
                game.lastTime
            ) / 1000,
            0.05
        );


    game.lastTime =
        currentTime;


    update(delta);

    draw();


    requestAnimationFrame(
        gameLoop
    );

}


// ============================================================
// 버튼
// ============================================================

startButton.addEventListener(
    "click",
    startGame
);


restartButton.addEventListener(
    "click",
    startGame
);
