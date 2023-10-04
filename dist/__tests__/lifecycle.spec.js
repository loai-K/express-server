"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("../bootstrap");
describe('lifecycle', () => {
    it('when lifecycle open check -> then should return true', async () => {
        expect(bootstrap_1.lifecycle.isOpen()).toEqual(true);
    });
    it('when delay 5s -> then use run step function to ensure timely close', async () => {
        let steps = 0;
        const incrementStep = async () => new Promise((resolve) => {
            steps += 1;
            return resolve();
        });
        await bootstrap_1.lifecycle.delay(5000, incrementStep);
        expect(steps).toEqual(25);
    });
    it('when lifecycle close -> then should fire listeners', async () => {
        let closed = false;
        bootstrap_1.lifecycle.on('close', async () => {
            closed = true;
        });
        await bootstrap_1.lifecycle.close();
        expect(closed).toEqual(true);
    });
    it('when lifecycle open check -> then should return false', async () => {
        expect(bootstrap_1.lifecycle.isOpen()).toEqual(false);
    });
});
//# sourceMappingURL=lifecycle.spec.js.map