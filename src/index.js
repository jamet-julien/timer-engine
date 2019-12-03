module.exports = function(frequence = 1 / 60) {
    let lastTick = 0,
        cumulateTime = 0,
        play = false,
        visibilityState = "visible",
        draw = function(_) {},
        update = function(_) {};

    document.addEventListener("visibilitychange", () => {
        visibilityState = document.visibilityState;
    });

    const proxyRun = function(time) {
        cumulateTime += (time - lastTick || 0) / 1000;

        if (cumulateTime > 1) {
            cumulateTime = 1;
        }

        while (cumulateTime > frequence) {
            update(frequence);
            cumulateTime -= frequence;
        }

        lastTick = time;

        if (visibilityState == "visible") {
            draw(cumulateTime);
        }

        play && enqueue();
    };

    const stop = function() {
        play = false;
    };

    const enqueue = function() {
        requestAnimationFrame(proxyRun);
    };

    const start = function() {
        play = true;
        enqueue();
    };

    return {
        stop,
        start,
        update,
        draw
    };
};
