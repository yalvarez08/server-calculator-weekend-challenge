const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [];

// objects in array should look like:
//  [
//   {
//     input1: 3,
//     input2: 5,
//     operator: '+',
//     result: 8
//   },
//   {
//     input1: 11,
//     input2: 7,
//     operator: '-',
//     result: 4
//   }
//  ]
// const calculatorDiv = document.getElementById('calc-container');

//let operatorAction = document.querySelector('data-action');

// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {

  res.status(200);
  res.send(calculations);
});


// POST /calculations
app.post('/calculations', (req, res) => {
// console.log(req.body);
  let calculations = req.body;
  console.log(calculations);
  // let recentInput = calculations[calculations.length - 1];
  // let recentInput = calculations[calculations.length - 1];
// math logic for inputs
let input1 = calculations.input1;
let input2 = calculations.input2;
let operator = calculations.operator;

// input1 = Number(input1);
// input2 = Number(input2);
// const arithmetic = (input1, operator, input2 ) => {
  let result;
  let num1 = parseFloat(input1);
  let num2 = parseFloat(input2);
  if (operator === '+') {
    result = num1 + num2;
  }
  if (operator === '-') {
    result = num1 - num2;
  }
  if (operator === '*') {
    result = num1 * num2;
  }
  if (operator === '/') {
    result = num1 / num2;
  }

console.log('result is:', result);
  
// let output = { 
//   input1: num1,
//   input2: num2,
//   operator: operator,
//   result: result
// }

// console.log(output);
calculations.push({
  input1: num1,
  input2: num2,
  operator: operator,
  result: result
  });

res.send(201);
});

app.delete('/calculations', (req, res) => {
  calculations = [];
  console.log('204 status: No content')
  res.send(204);
});

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
