// ============================================================
// CODE : 죽림고수
// main.js
// ============================================================

import { Player } from "./player.js";


// ============================================================
// Canvas
// ============================================================

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");


// ============================================================
// 화면 UI
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
// 키보드
// ============================================================

const keys = {};


// 눌린 키

window.addEventListener(
    "keydown",
    (event) => {

        const key =
            event.key.toLowerCase();

        keys[key] = true;


        // 게임 중 방향키 스크롤 방지

        if (
            key === "arrowup" ||
            key === "arrowdown" ||
            key === "arrowleft" ||
            key === "arrowright" ||
            key === " "
        ) {

            event.preventDefault();

        }


        // R 재시작

        if (
            key === "r" &&
            !game.running
        ) {

            startGame();

        }

    }
);


// 키를 뗌

window.addEventListener(
    "keyup",
    (event) => {

        const key =
            event.key.toLowerCase();

        keys[key] = false;

    }
);


// ============================================================
// Game 상태
// ============================================================

const game = {

    running: false,

    startTime: 0,

    lastTime: 0,

    survivalTime: 0,

    player: null,

    arrows: []

};


// ============================================================
// Canvas 크기
// ============================================================

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    // 플레이어가 이미 존재한다면
    // 화면 크기 변경 후 위치 보정

    if (game.player) {

        game.player.canvas =
            canvas;


        game.player.x =
            Math.min(
                game.player.x,
                canvas.width -
                game.player.radius
            );


        game.player.y =
            Math.min(
                game.player.y,
                canvas.height -
                game.player.radius
            );

    }

}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


// ============================================================
// 플레이어 생성
// ============================================================

game.player =
    new Player(canvas);


// ============================================================
// 게임 시작
// ============================================================

function startGame() {

    game.running = true;

    game.survivalTime = 0;

    game.startTime =
        performance.now();

    game.lastTime =
        performance.now();


    // 기존 화살 전부 제거

    game.arrows = [];


    // 플레이어 초기화

    game.player.reset();


    // 화면 전환

    startScreen.classList.add(
        "hidden"
    );

    gameOverScreen.classList.add(
        "hidden"
    );


    // 게임 루프 시작

    requestAnimationFrame(
        gameLoop
    );

}


// ============================================================
// 게임 오버
// ============================================================

function gameOver() {

    game.running = false;


    finalTimeDisplay.textContent =
        game.survivalTime.toFixed(2);


    gameOverScreen.classList.remove(
        "hidden"
    );

}


// ============================================================
// 게임 업데이트
// ============================================================

function update(delta) {

    // --------------------------------------------------------
    // 생존 시간
    // --------------------------------------------------------

    game.survivalTime =
        (
            performance.now() -
            game.startTime
        ) / 1000;


    // --------------------------------------------------------
    // 플레이어
    // --------------------------------------------------------

    game.player.update(
        delta,
        keys
    );


    // --------------------------------------------------------
    // 나중에 여기에 화살 패턴을 넣는다
    // --------------------------------------------------------

}


// ============================================================
// 배경
// ============================================================

function drawBackground() {

    const width =
        canvas.width;

    const height =
        canvas.height;


    // --------------------------------------------------------
    // 기본 숲
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // 뒤쪽 대나무
    // --------------------------------------------------------

    drawBambooLayer(
        65,
        0.55,
        "rgba(35,75,40,0.45)"
    );


    // --------------------------------------------------------
    // 안개
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // CODE
    // --------------------------------------------------------

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

    ctx.shadowColor =
        "rgba(220,185,80,0.15)";

    ctx.shadowBlur = 25;

    ctx.fillText(
        "CODE",
        width / 2,
        height / 2
    );

    ctx.restore();


    // --------------------------------------------------------
    // 앞쪽 대나무
    // --------------------------------------------------------

    drawBambooLayer(
        95,
        1,
        "rgba(25,60,30,0.75)"
    );

}


// ============================================================
// 대나무 레이어
// ============================================================

function drawBambooLayer(
    spacing,
    scale,
    color
) {

    const width =
        canvas.width;

    const height =
        canvas.height;


    ctx.save();


    for (
        let x = -50;
        x < width + 100;
        x += spacing
    ) {

        const offset =
            Math.sin(x * 0.1) * 20;


        const bambooWidth =
            14 * scale;


        // 줄기

        ctx.fillStyle =
            color;


        ctx.fillRect(
            x + offset,
            0,
            bambooWidth,
            height
        );


        // 마디

        ctx.fillStyle =
            "rgba(5,20,9,0.8)";


        for (
            let y = 60;
            y < height;
            y += 75
        ) {

            ctx.fillRect(
                x + offset - 2,
                y,
                bambooWidth + 4,
                6
            );

        }

    }


    ctx.restore();

}


// ============================================================
// 화면 그리기
// ============================================================

function draw() {

    // 배경

    drawBackground();


    // 플레이어

    game.player.draw(
        ctx
    );


    // 시간 표시

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
    () => {

        startGame();

    }
);


restartButton.addEventListener(
    "click",
    () => {

        startGame();

    }
);
