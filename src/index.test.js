const Chai = require("chai");
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
});
