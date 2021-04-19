/*
 * @desc: Stack类实现36进制转换 
 * @tags: 算法 进制转换 类
 */

const { Stack } = require('./Stack.js');

function baseConverter (decNumber, base) {
  // 实例化Stack类
  const remStack = new Stack();
  // 定义一个进制位数，这里设置了 36 位进制，可自定义位数
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decNumber,
      rem,
      baseString = '';
  // 限制进制，小于等于2或大于36进制的返回空字符串
  if (!(base >= 2 && base <= 36)) {
    return '';
  }

  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while (!remStack.isEmpty()) {
    // 有数据，则对栈中的数字进行转化
    baseString += digits[remStack.pop()];
  }

  return baseString;
}

console.log(baseConverter(1314, 2));    //10100100010
console.log(baseConverter(1314, 8));    //2442
console.log(baseConverter(1314, 16));    //522
console.log(baseConverter(1314, 20));    //35E
console.log(baseConverter(1314, 30));    //1DO
console.log(baseConverter(1314, 35));    //12J
