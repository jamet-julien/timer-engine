module.exports = function(frequence = 1 / 60) {
    let lastTick = 0,
        cumulateTime = 0,
        visibilityState = "visible",
        public = {
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
            public.update(frequence);
            cumulateTime -= frequence;
        }

        lastTick = time;

        if (visibilityState == "visible") {
            public.draw(cumulateTime);
        }

        public.played && enqueue();
    };

    const enqueue = function() {
        window.requestAnimationFrame(proxyRun);
    };

    public.stop = function() {
        public.played = false;
    };

    public.start = function() {
        public.played = true;
        enqueue();
    };

    return public;
};
