import Timer from "../src/index";

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
context.scale(10, 10);
frequence = 5;
snake = [[16, 1]];

action = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0]
};

window.onkeydown = ({ key }) => {
    direction = action[key] || direction;
};

direction = [0, 1];
apple = [5, 5];

timer = Timer.default(1 / frequence);

timer.update = () => {
    head = snake[0];

    const posX =
        head[0] + direction[0] >= 0 ? (head[0] + direction[0]) % 32 : 32;
    const posY =
        head[1] + direction[1] >= 0 ? (head[1] + direction[1]) % 24 : 24;

    snake.unshift([posX, posY]);

    if (apple[0] === head[0] && apple[1] === head[1]) {
        apple = [(Math.random() * 32) | 0, (Math.random() * 24) | 0];
        if (snake.length % 4 == 0) frequence++;
        timer.setFrequence(1 / frequence);
    } else {
        snake.pop();
    }
};

timer.draw = () => {
    context.clearRect(0, 0, 100, 100);
    context.fillStyle = "red";
    context.fillRect(apple[0], apple[1], 1, 1);

    context.fillStyle = "black";
    snake.forEach(([x, y]) => {
        context.fillRect(x, y, 1, 1);
    });
};
timer.draw();
document.addEventListener("click", () => {
    timer.start();
});
