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


const result = applyDiscount('$5.00', '20%');

console.log(result);