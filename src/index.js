const compose = (...fns) => fns.reduce((f, g) => {
    return (...args) => f(g(...args));
});


function *range(min, max) {
    let start = min;
    while(start <= max) {
        yield start;
        start++;
    }
}

function take(num) {
    return function* (gen) {
        let cur = 0;
        for (let i of gen) {
            if (++cur < num) {
                yield i;
            } else {
                return;
            }
        }
    }
}

function skip(num) {
    return function* (gen) {
        let cur = 0;
        for (let i of gen) {
            if (++cur > num) {
                yield i;
            }
        }
    }
}

function filter(fn) {
    return function* (gen) {
        for (let i of gen) {
            if (fn(i)) {
                yield i;
            }
        }
    }
}

function map(fn) {
    return function* (gen) {
        for (let i of gen) {
            yield fn(i);
        }
    }
}

function reduceStep(fn, initialValue) {
    return function* (gen) {
        let accum = initialValue;
        for (let i of gen) {
            if (typeof accum === 'undefined') {
                accum = i;
            } else {
                accum = fn(accum, i);
                yield accum;
            }
        }
        return accum;
    }
}

function reduce(fn, initialValue) {
    return function (gen) {
        let accum;
        for (let i of reduceStep(fn, initialValue)(gen)) {
            accum = i;
        }
        return accum;
    }
}


module.exports = {
    compose,
    filter,
    map,
    range,
    reduce,
    reduceStep,
    skip,
    take,
};
