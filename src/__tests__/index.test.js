const {
    map,
    reduceStep,
    reduce,
    filter,
    take,
    skip,
    range
} = require('../index');

function genToArray(gen) {
    const arr = []
    for (let i of gen) {
        arr.push(i);
    }
    return arr;
}

describe("generator transducers", () => {
    describe("range", () => {
        it("should iterate over a range", () => {
            const rng = range(0, 5);
            expect(genToArray(rng)).toEqual([0, 1, 2, 3, 4, 5]);
        });
    });

    describe("filter", () => {
        it("should only include elements matching the predicate", () => {
            const rng = range(0, 5);
            const filtered = filter(x => x % 2 === 0)(rng);
            expect(genToArray(filtered)).toEqual([0, 2, 4]);
        });

        it("should run once for each item in the generator", () => {
            let count = 0;
            const rng = range(0, 10);
            const predicate = x => {
                count++;
                return x % 2 === 0;
            };
            genToArray(filter(predicate)(rng));
            expect(count).toBe(11);
        });
    });
});
