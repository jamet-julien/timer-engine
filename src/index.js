const Timer = (frequence = 1 / 60) => {
    let lastTick = 0,
        cumulateTime = 0,
        visibilityState = "visible",
        p = {
            played: false,
            update: function(_) {},
            draw: function(_) {}
        };

    document.addEventListener("visibilitychange", () => {
        visibilityState = document.visibilityState;
    });

    const proxyRun = function(time) {
        cumulateTime += (time - lastTick || 0) / 1000;

        if (cumulateTime > 1) {
            cumulateTime = 1;
        }

        while (cumulateTime > frequence) {
            p.update(frequence);
            cumulateTime -= frequence;
        }

        lastTick = time;

        if (visibilityState == "visible") {
            p.draw(cumulateTime);
        }

        p.played && enqueue();
    };

    const enqueue = function() {
        window.requestAnimationFrame(proxyRun);
    };

    p.stop = function() {
        p.played = false;
    };

    p.start = function() {
        p.played = true;
        enqueue();
    };

    return p;
};

export default Timer;
export { Timer };
