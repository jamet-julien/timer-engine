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
});
