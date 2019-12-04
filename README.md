# TIMER-ENGINE

[![CircleCI Status](https://circleci.com/gh/jamet-julien/timer-engine.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/jamet-julien/timer-engine)
![Codecov](https://img.shields.io/codecov/c/github/jamet-julien/timer-engine)
[![npm](https://img.shields.io/npm/dt/timer-engine.svg?style=flat-square)](https://www.npmjs.com/package/timer-engine)
[![npm](https://img.shields.io/npm/v/timer-engine.svg?style=flat-square)](https://www.npmjs.com/package/timer-engine)
[![npm](https://img.shields.io/npm/l/timer-engine.svg?style=flat-square)](https://github.com/jamet-julien/timer-engine/blob/master/LICENSE)

> Timer make loop with "update" and "draw" states function

## [Live example]()

-   [Install](#install)
-   [Importing](#importing)

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
| `function` | Stop the loop, if it was'nt already stop |
