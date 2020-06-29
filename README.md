# TIMER-ENGINE

[![CircleCI Status](https://circleci.com/gh/jamet-julien/timer-engine.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/jamet-julien/timer-engine)
![Codecov](https://img.shields.io/codecov/c/github/jamet-julien/timer-engine)
[![npm](https://img.shields.io/npm/dt/timer-engine.svg?style=flat-square)](https://www.npmjs.com/package/timer-engine)
[![npm](https://img.shields.io/npm/v/timer-engine.svg?style=flat-square)](https://www.npmjs.com/package/timer-engine)
[![npm](https://img.shields.io/npm/l/timer-engine.svg?style=flat-square)](https://github.com/jamet-julien/timer-engine/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Timer make loop with "update" and "draw" states function

## [Live example](https://codepen.io/jamet-julien/full/OJMxjRa)

-   [Install](#install)
-   [Importing](#importing)
-   [sample "SNAKE GAME"](#sample)

## Install <a id="install"></a>

`npm i timer-engine --save`  
or  
`yarn add timer-engine`

---

### Importing <a id="importing"></a>

```js
import Timer from "timer-engine";

const timer = Timer();
timer.update = (frequenceValue) => {
    /*make something*/
};
timer.draw = (cumultateValue) => {
    /*make something*/
};
timer.start();
```

---

### Sample SNAKE GAME <a id="sample"></a>

> simple game to test Timer-engine plugin

index.html file

```html
<canvas width="320" height="240" style="border:red 1px solid"></canvas>
```

script.js file

```js
var canvas = document.body.children[0];
var context = canvas.getContext("2d");
context.scale(10, 10);
snake = [[16, 1]];

action = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0]
};

direction = [0, 1];
apple = [5, 5];

// instance and choose frequence ( use CDN so need `default` caller)
timer = Timer.default(1 / 5);

// use keyboard to move snake
window.onkeydown = ({ key }) => {
    direction = action[key] || direction;
};

// set Update function
timer.update = () => {
    head = snake[0];
    snake.unshift([head[0] + direction[0], head[1] + direction[1]]);

    if (apple[0] === head[0] && apple[1] === head[1]) {
        apple = [(Math.random() * 32) | 0, (Math.random() * 24) | 0];
    } else {
        snake.pop();
    }
};

// set Draw function
timer.draw = () => {
    context.clearRect(0, 0, 100, 100);
    context.fillStyle = "red";
    context.fillRect(apple[0], apple[1], 1, 1);

    context.fillStyle = "black";
    snake.forEach(([x, y]) => {
        context.fillRect(x, y, 1, 1);
    });
};

//first draw
timer.draw();

//click to start game
document.addEventListener("click", () => {
    timer.start();
});
```

---

## Methods <a id="methods"></a>

### .start() <a id="start"></a>

#### Description

Start the loop, if it wasn't already start

### .stop() <a id="stop"></a>

#### Description

Stop the loop, if it wasn't already stop

### .setFrequence(num) <a id="setFrequence"></a>

#### Description

set new frequence loop

#### Arguments

| argument | type     | Description            |
| :------- | :------- | :--------------------- |
| `num`    | `number` | new value of frequence |
