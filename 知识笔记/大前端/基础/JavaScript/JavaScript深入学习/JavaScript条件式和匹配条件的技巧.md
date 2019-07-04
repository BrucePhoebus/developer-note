# JavaScript条件式和匹配条件的技巧

## 更简洁的实现

#### 对于多个条件，使用 Array.includes

**初学者常见实现**

```js
const checkCarModel = (model) => {
    if(model === 'renault' || model === 'peugeot') { 
    console.log('model valid');
    }
}

checkCarModel('renault'); // 输出 'model valid'
```

> 这样代码实现一般看起来比较lo，而想要变更也比较麻烦(就是维护)，当然少量是无所谓，但一旦多起来就麻烦了

**优化实现**

```js
const checkCarModel = (model) => {
    const models = ['peugeot', 'renault']; // 这是作为常量的存在，而在项目中我们常会把常量抽离到一个地方做统一处理

    if(models.includes(model)) { 
    console.log('model valid');
    }
}

checkCarModel('renault'); // 输出 'model valid'
```

#### 匹配所有条件，使用 Array.every 或者 Array.find

**初学者常见实现**

```js
const cars = [
  { model: 'renault', year: 1956 },
  { model: 'peugeot', year: 1968 },
  { model: 'ford', year: 1977 }
];

const checkEveryModel = (model) => {
  let isValid = true;

  for (let car of cars) {
    if (!isValid) {
      break;
    }
    isValid = car.model === model;
  }

  return isValid;
}

console.log(checkEveryModel('renault')); // 输出 false
```

**使用 Array.every优化实现**

```js
const checkEveryModel = (model) => {
  return cars.every(car => car.model === model);
}

console.log(checkEveryModel('renault')); // 输出 false
```

**使用Array.find优化实现**

```js
const checkEveryModel = (model) => {
  return cars.find(car => car.model !== model) === undefined;
}

console.log(checkEveryModel('renault')); // 输出 false
```

> 其实我们常见会将这个匹配所有条件抽离出来形成一个函数，传入要匹配的值和可匹配的对象，进行复用

#### 匹配部分条件，使用 Array.some

```js
const cars = [
  { model: 'renault', year: 1956 },
  { model: 'peugeot', year: 1968 },
  { model: 'ford', year: 1977 }
];

const checkForAnyModel = (model) => {
  return cars.some(car => car.model === model);
}

console.log(checkForAnyModel('renault')); // 输出 true
```

#### 提前返回而不是使用 if...else 分支

	假设我们想要显示所给车辆的模型和生产年份

**初学时的实现**

```js
const checkModel = (car) => {
  let result; // 首先，定义一个 result 变量
  
  // 检查是否有车
  if(car) {

    // 检查是否有车的模型
    if (car.model) {

      // 检查是否有车的年份
      if(car.year) {
        result = `Car model: ${car.model}; Manufacturing year: ${car.year};`;
      } else {
        result = 'No car year';
      }
    
    } else {
      result = 'No car model'
    }   

  } else {
    result = 'No car';
  }

  return result; // 我们的单独的返回语句
}

console.log(checkModel()); // 输出 'No car'
console.log(checkModel({ year: 1988 })); // 输出 'No car model'
console.log(checkModel({ model: 'ford' })); // 输出 'No car year'
console.log(checkModel({ model: 'ford', year: 1988 })); // 输出 'Car model: ford; Manufacturing year: 1988;'
```

> 很明显，这种实现太复杂了，耦合太高，维护起来极其麻烦，而生活中我们拥有更复杂的逻辑，往往我们需要优化实现方式

**优化实现**

	使用更多的JavaScript特性

```js
const checkModel = ({model, year} = {}) => {
  if(!model && !year) return 'No car';
  if(!model) return 'No car model';
  if(!year) return 'No car year';

  // 这里可以任意操作模型或年份
  // 确保它们存在
  // 无需更多检查

  // doSomething(model);
  // doSomethingElse(year);
  
  return `Car model: ${model}; Manufacturing year: ${year};`;
}

console.log(checkModel()); // 输出 'No car'
console.log(checkModel({ year: 1988 })); // 输出 'No car model'
console.log(checkModel({ model: 'ford' })); // 输出 'No car year'
console.log(checkModel({ model: 'ford', year: 1988 })); // 输出 'Car model: ford; Manufacturing year: 1988;'
```

#### 使用索引或者映射，而不是 switch 语句

**我们以前经常会用switch优化if else**

```js
const getCarsByState = (state) => {
  switch (state) {
    case 'usa':
      return ['Ford', 'Dodge'];
    case 'france':
      return ['Renault', 'Peugeot'];
    case 'italy':
      return ['Fiat'];
    default:
      return [];
  }
}

console.log(getCarsByState()); // 输出 []
console.log(getCarsByState('usa')); // 输出 ['Ford', 'Dodge']
console.log(getCarsByState('italy')); // 输出 ['Fiat']
```

> 但这其实只是让代码看起来比较好而已，并没有本质的改变

**使用map优化**

```js
const cars = new Map()
  .set('usa', ['Ford', 'Dodge'])
  .set('france', ['Renault', 'Peugeot'])
  .set('italy', ['Fiat']);

const getCarsByState = (state) => {
  return cars.get(state) || [];
}

console.log(getCarsByState()); // 输出 []
console.log(getCarsByState('usa')); //输出 ['Ford', 'Dodge']
console.log(getCarsByState('italy')); // 输出 ['Fiat']
```

> 这样使用key value存储和获取显得更美观，当然我感觉初学者还是比较难写出来的，还是需要多练练

**字面量优化**

```js
const carState = {
  usa: ['Ford', 'Dodge'],
  france: ['Renault', 'Peugeot'],
  italy: ['Fiat']
};

const getCarsByState = (state) => {
  return carState[state] || [];
}

console.log(getCarsByState()); // 输出 []
console.log(getCarsByState('usa')); // 输出 ['Ford', 'Dodge']
console.log(getCarsByState('france')); // 输出 ['Renault', 'Peugeot']
```

> 这样使用JSON对象，字面量的方式，同样是key value存储，但是更好理解，基本都会写

#### 使用自判断链接和空合并

	自判断链接 允许我们在没有显式检查中间节点是否存在的时候处理树形结构
	空合并 可以确保节点不存在时会有一个默认值，配合自判断链接使用会有不错的效果

```js
const car = {
  model: 'Fiesta',
  manufacturer: {
    name: 'Ford',
    address: {
      street: 'Some Street Name',
      number: '5555',
      state: 'USA'
    }
  }
}

// 获取汽车模型
const model = car && car.model || 'default model';
// 获取厂商地址
const street = car && car.manufacturer && car.manufacturer.address && car.manufacturer.address.street || 'default street';
// 请求一个不存在的属性
const phoneNumber = car && car.manufacturer && car.manufacturer.address && car.manufacturer.phoneNumber;

console.log(model) // 输出 'Fiesta'
console.log(street) // 输出 'Some Street Name'
console.log(phoneNumber) // 输出 undefined
```

* 如果我们想要知道厂商是否来自 某个品牌

```js
const checkCarManufacturerState = (trademark) => {
  if(car && car.manufacturer && car.manufacturer.address && car.manufacturer.address.state === trademark) {
    console.log('Is from ', trademark);
  }
}

checkCarManufacturerState('USA') // 输出 'Is from USA'
```

**js原生实现**

```js
// 获取汽车模型
const model = car?.model ?? 'default model';
// 获取厂商地址
const street = car?.manufacturer?.address?.street ?? 'default street';

// 检查汽车厂商是否来自 USA
const checkCarManufacturerState = () => {
	if(car?.manufacturer?.address?.state === 'USA') {
	console.log('Is from USA');
	}
}
```

**自判断链接同样支持 DOM API**

```js
const value = document.querySelector('input#user-name')?.value;
```

> 参考：[编写更好的 JavaScript 条件式和匹配条件的技巧](https://segmentfault.com/a/1190000019576207?utm_source=weekly)
