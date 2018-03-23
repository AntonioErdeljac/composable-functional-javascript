// const nextCharForNumberString = str => {
//   const trimmed = str.trim();
//   const number = parseInt(trimmed);
//   const nextNumber = number + 1;

//   return String.fromCharCode(nextNumber);
// };

const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: f => `Box(${x})`
})

// const moneyToFloat = str =>
//   parseFloat(str.replace(/\$/g, ''));


const moneyToFloat = str =>
    Box(str)
    .map(s => s.replace(/\$/g, ''))
     .map(r => parseFloat(r))

// const percentToFloat = str => {
//   const replaced = str.replace(/\$/g, '');
//   const number = parseFloat(replaced);
//   return number * 0.01;
// };

const percentToFloat = str =>
     Box(str.replace(/\%/g, ''))
     .map(replaced => parseFloat(replaced))
     .map(number => number * 0.01)
// const applyDiscount = (price, discount) => {
//   const cost = moneyToFloat(price);
//   const savings = percentToFloat(discount);
//   return cost - cost * savings;
// };

const applyDiscount = (price, discount) =>
     moneyToFloat(price)
     .fold(cost =>
       percentToFloat(discount)
        .fold(savings =>
          cost - cost * savings))

const nextCharForNumberString = str =>
  Box(str)
  .map(s => s.trim())
  .map(s => new Number(s))
  .map(i => i + 1)
  .map(i => i + 34)
  .fold(i => String.fromCharCode(i));


// const result = applyDiscount('$5.00', '20%');


const Right = x =>
({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
});

const Left = x =>
({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Left(${x})`
});

const fromNullable = x =>
 x != null ? Right(x) : Left(null)

const fs = require('fs');

const tryCatch = f => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e);
  }
};

// const getPort = () => {
//   try {
//     const str = fs.readFileSync('config.json');
//     const config = JSON.parse(str);
//     return config.port;
//   } catch(e) {
//     return 3000
//   }
// };

const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json'))
  .chain(c => tryCatch(() => JSON.parse(c)))
  .fold(e => 3000,
        c => c.port)

// const result = getPort();

const Sum = x =>
({
  x,
  concat: ({ x: y }) =>
    Sum(x + y),
  inspect: () =>
    `Sum(${x})`
});

const All = x =>
({
  x,
  concat: ({ x: y }) =>
    All(x && y),
  inspect: () =>
    `All(${x})`
});

const First = x =>
({
  x,
  concat: _ =>
    First(x),
  inspect: () =>
    `First(${x})`
})


const res = "a".concat("b".concat("c"));
const resArr = [1,2].concat([3,4].concat([5,6]));

const resNew = Sum(1).concat(Sum(2)).concat(Sum(3));

const resAll = All(true).concat(All(true));

const resFirst = First('test').concat(First('pop'));

console.log(resFirst);