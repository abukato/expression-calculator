function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let arr = expr.match(/[-+*/()]|\d+/g);
  let leftBracket = 0;
  let rightBracket = 0;
  for(let i = 0; i < expr.length; i++){
      if(expr[i] === '(') {
        leftBracket++;
      } else if(expr[i] === ')') {
        rightBracket++;
      }
  };

  if(leftBracket !== rightBracket) {
      throw new Error ('ExpressionError: Brackets must be paired');
  };

  function calc(a, b, operator) {
    if (operator === '+') return a + b;
    if (operator === '-') return a - b;
    if (operator === '*') return a * b;
    if (operator === '/') {
      if (b === 0) {
        throw new Error("TypeError: Division by zero.");
      } else return a / b;
    }
  }

  const priority = {
    '(': 1,
    ')': 1,
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3,
  };

  let numbers = [];
  let operators = [];
  let result = 0;

  const updateArrays = function() {
    result = calc(numbers[numbers.length-2], numbers[numbers.length-1], operators[operators.length-1]);
    numbers.pop();
    numbers.pop();
    operators.pop();
    numbers.push(result);
  }

  for (let i = 0; i < arr.length; i++){
    if(!isNaN(arr[i])) {
        numbers.push(+arr[i]);
    } else if (operators.length === 0 || arr[i] === '(' || priority[arr[i]] > priority[operators[operators.length-1]]) {
      operators.push(arr[i]);
    } else {
      if (arr[i] === ')') {
        if (operators[operators.length-1] === '(') {
          operators.pop();
        } else {
          updateArrays();
          i--;
        }
      } else {
        updateArrays();
        i--;
      }
    }
  }

  if (numbers.length > 1) {
    for (let i = 0; i < numbers.length; i++){
      updateArrays();
    }
  }

  return result;
}

module.exports = {
    expressionCalculator
}