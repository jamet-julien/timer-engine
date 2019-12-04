const Chai = require("chai");
const Sinon = require("sinon");
const Timer = require("./index");

describe("Timer-engine", function() {
    describe("Make a instance", function() {
        it("Should be function", function() {
            Chai.assert.isFunction(Timer);
        });

        it("Should create object", function() {
            Chai.assert.isObject(Timer());
        });

        it("Should contain importants functions", function() {
            const methodRequired = ["stop", "start", "update", "draw"];
            const methodInstance = Object.keys(Timer());
            Chai.expect(methodInstance).to.include.members(methodRequired);
        });
    });

    describe("Run instance", function() {
        it("Should start", function() {
            const timer = Timer();
            window.requestAnimationFrame = Sinon.spy();
            timer.start();
            Chai.expect(window.requestAnimationFrame.called).to.be.true;
        });

        it("Should draw", function() {
            const timer = Timer();
            let counter = 0;

            timer.draw = Sinon.spy();

            window.requestAnimationFrame = callback => {
                counter++;
                if (counter < 3) {
                    callback(counter);
                }
            };

            timer.start();
            Chai.expect(timer.draw.called, "draw function called").to.be.true;
        });

        it("Should update", function() {
            const timer = Timer();
            let counter = 0;

            timer.update = Sinon.spy();

            window.requestAnimationFrame = callback => {
                counter++;
                if (counter < 3) {
                    callback(counter * 10);
                }
            };

            timer.start();
            Chai.expect(timer.update.called, "update function called").to.be
                .true;
        });
    });
});
