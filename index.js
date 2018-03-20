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

const nextCharForNumberString = str =>
  Box(str)
  .map(s => s.trim())
  .map(s => new Number(s))
  .map(i => i + 1)
  .map(i => i + 34)
  .fold(i => String.fromCharCode(i));


const result = nextCharForNumberString('  64 ');

console.log(result);