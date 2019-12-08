import Timer from "./index";

describe("Start", () => {
    it("First import right", () => {
        expect(typeof Timer).toBe("function");
    });

    it("Required functions", () => {
        const instance = Timer();
        expect(instance).toHaveProperty("update");
        expect(instance).toHaveProperty("draw");
        expect(instance).toHaveProperty("stop");
        expect(instance).toHaveProperty("start");
    });

    it("Launched", () => {
        const instance = Timer();
        window.requestAnimationFrame = jest.fn();
        instance.start();
        expect(window.requestAnimationFrame.mock.calls.length).toBe(1);
    });

    it("Launched cancel", () => {
        const instance = Timer();
        instance.start();
        instance.stop();
        expect(instance.played).toBe(false);
    });

    it("Draw called", () => {
        let highResTimeStamp = 0;
        const instance = Timer();

        window.requestAnimationFrame = callback => {
            highResTimeStamp++;
            if (highResTimeStamp <= 3) {
                callback(highResTimeStamp);
            }
        };

        instance.draw = jest.fn();
        instance.start();
        expect(instance.draw.mock.calls.length).toBe(3);
    });

    it("Update don't called", () => {
        let highResTimeStamp = 0;
        const instance = Timer();

        window.requestAnimationFrame = callback => {
            highResTimeStamp++;
            if (highResTimeStamp <= 3) {
                callback(highResTimeStamp);
            }
        };

        instance.update = jest.fn();
        instance.start();
        expect(instance.update.mock.calls.length).toBe(0);
    });

    it("Update called", () => {
        let highResTimeStamp = 0;
        const instance = Timer();

        window.requestAnimationFrame = callback => {
            highResTimeStamp++;
            if (highResTimeStamp <= 3) {
                callback(highResTimeStamp * 10);
            }
        };

        instance.update = jest.fn();
        instance.start();
        expect(instance.update.mock.calls.length).toBe(1);
    });

    it("Update called more than draw", () => {
        let counterCalled = 0;
        const instance = Timer();

        window.requestAnimationFrame = callback => {
            counterCalled++;
            if (counterCalled === 3) {
                instance.stop();
            }
            callback(10000);
        };

        instance.draw = jest.fn();
        instance.update = jest.fn();
        instance.start();
        expect(instance.update.mock.calls.length).toBeGreaterThan(
            instance.draw.mock.calls.length
        );
    });

    it("Set frequence", () => {
        let counterCalled = 0;
        const instance = Timer(1 / 2);

        window.requestAnimationFrame = callback => {
            counterCalled++;
            if (counterCalled == 1) {
                callback(1000);
            } else if (counterCalled == 2) {
                instance.setFrequence(1 / 3);
                callback(1000);
            }
        };

        instance.update = jest.fn();
        instance.start();
        expect(instance.update.mock.calls[0][0]).toBe(1 / 2);
        expect(instance.update.mock.calls[1][0]).toBe(1 / 3);
    });
});
