## generator-transducers

A small [transducer](http://elbenshira.com/blog/understanding-transducers/) library using es6 generators.

Usage:
```
const transform = compose(
    map(x => x * 2),
    filter(x => x % 2 === 0)
);

const newSequence = transform(range(0, 5)); // generator with values: [0, 4, 8]

const sum = reduce((a, b) => a + b)(newSequence); // 12
```