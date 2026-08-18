const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");


const startScreen =
    document.getElementById("startScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");


let running = false;

let startTime = 0;

let lastTime = 0;

let survivalTime = 0;


const keys = {};


window.addEventListener(
    "keydown",
    (event) => {

        keys[event.key.toLowerCase()] = true;

        if (
            event.key === " "
        ) {

            event.preventDefault();

        }

        if (
            event.key.toLowerCase() === "r"
            &&
            !running
        ) {

            startGame();

        }

    }
);


window.addEventListener(
    "keyup",
    (event) => {

        keys[event.key.toLowerCase()] = false;

    }
);


function resize() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


window.addEventListener(
    "resize",
    resize
);


resize();


function startGame() {

    running = true;

    survivalTime = 0;

    startTime =
        performance.now();

    lastTime =
        performance.now();

    startScreen.classList.add(
        "hidden"
    );

    gameOverScreen.classList.add(
        "hidden"
    );

    requestAnimationFrame(
        loop
    );

}


function gameOver() {

    running = false;

    document.getElementById(
        "finalTime"
    ).textContent =
        survivalTime.toFixed(2);

    gameOverScreen.classList.remove(
        "hidden"
    );

}


function update(delta) {

    survivalTime =
        (
            performance.now()
            -
            startTime
        ) / 1000;

}


function draw() {

    // 임시 배경

    ctx.fillStyle =
        "#07150b";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // 테스트용 중앙 CODE

    ctx.save();

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.font =
        "bold 120px Georgia";

    ctx.fillStyle =
        "rgba(210,175,70,0.06)";

    ctx.fillText(
        "CODE",
        canvas.width / 2,
        canvas.height / 2
    );

    ctx.restore();


    // 시간

    document.querySelector(
        ".time"
    ).textContent =
        survivalTime.toFixed(2);

}


function loop(time) {

    if (!running) {

        return;

    }


    const delta =
        Math.min(
            (time - lastTime) / 1000,
            0.05
        );


    lastTime = time;


    update(delta);

    draw();


    requestAnimationFrame(
        loop
    );

}


startButton.addEventListener(
    "click",
    startGame
);


restartButton.addEventListener(
    "click",
    startGame
);
