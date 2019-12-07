# TIMER-ENGINE

[![CircleCI Status](https://circleci.com/gh/jamet-julien/timer-engine.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/jamet-julien/timer-engine)
![Codecov](https://img.shields.io/codecov/c/github/jamet-julien/timer-engine)
[![npm](https://img.shields.io/npm/dt/timer-engine.svg?style=flat-square)](https://www.npmjs.com/package/timer-engine)
[![npm](https://img.shields.io/npm/v/timer-engine.svg?style=flat-square)](https://www.npmjs.com/package/timer-engine)
[![npm](https://img.shields.io/npm/l/timer-engine.svg?style=flat-square)](https://github.com/jamet-julien/timer-engine/blob/master/LICENSE)

> Timer make loop with "update" and "draw" states function

## [Live example](https://codepen.io/jamet-julien/pen/dyPYRgz)

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
timer.update = frequenceValue => {
    /*make something*/
};
timer.draw = cumultateValue => {
    /*make something*/
};
timer.start();
```

---

### Sample SNAKE GAME<a id="sample"></a>

> index.html

```html
<canvas width="320" height="240" style="border:red 1px solid"></canvas>
```

> script.js

```js
var canvas = document.body.children[0];
var context = canvas.getContext("2d");
context.scale(10, 10);
snake = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3]
];

action = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0]
};

direction = [0, -1];
apple = [5, 5];

timer = Timer(1 / 2);

timer.update = () => {
    head = snake[0];
    snake.unshift([head[0] + direction[0], head[1] + direction[1]]);

    if (apple[0] === head[0] && apple[1] === head[1]) {
        apple = [(Math.random() * 10) | 0, (Math.random() * 10) | 0];
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

timer.start();
```

---

## Options <a id="options"></a>

---

## Methods <a id="methods"></a>

### .start() <a id="start"></a>

| Type       | Description                                |
| :--------- | :----------------------------------------- |
| `function` | Start the loop, if it wasn't already start |

---

### .stop() <a id="stop"></a>

| Type       | Description                              |
| :--------- | :--------------------------------------- |
| `function` | Stop the loop, if it wasn't already stop |
