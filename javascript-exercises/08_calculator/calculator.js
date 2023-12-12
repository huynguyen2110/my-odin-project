const add = function(a, b) {
	return a + b
};

const subtract = function(a, b) {
	return a- b
};

const sum = function(argv) {
    let sum =  0
    argv.forEach(item => sum = sum + item)
    return sum
};

const multiply = function(argv) {
  let multi =  1
  argv.forEach(item => multi = multi * item)
  return multi
};

const power = function(a, b) {
  return a ** b
};

const factorial = function(a) {
	if(a == 0) {
      return 1
    }else{
      let factorial = 1
      for(let i = 1; i <= a; i++){
        factorial = factorial * i
      }
      return factorial
    }

};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
