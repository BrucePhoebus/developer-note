/*
 * @tags: 算法 类
 */
class Stack {
  /**
   * @description: 构造函数 
   */
  constructor () {
    this.count = 0;
    this.items = {};
  }

  /**
   * @description: 将对象入栈
   * @param {*} element 传入的值或对象引用
   */
  push (element) {
    this.items[this.count] = element;
    this.count++;
  }

  /**
   * @description: 弹出栈的最后一个值 
   * @return { * }
   */
  pop () {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek () {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  /**
   * @description: 判断对象是否为空 
   * @return { Boolean }
   */
  isEmpty () {
    return this.count === 0;
  }

  /**
   * @description: 返回栈个数
   * @return { Number }
   */
  size () {
    return this.count;
  }

  /**
   * @description: 重置数据
   */
  clear () {
    this.items = {};
    this.count = 0;
  }

  toString () {
    if (this.isEmpty()) {
      return '';
    }

    let objString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString;
  }
}

exports.Stack = Stack
