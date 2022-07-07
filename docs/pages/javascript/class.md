---
sidebarDepth: 1
---

## new class

> Javascript 是一种基于对象（object-based）的语言，你遇到的所有东西几乎都是对象。但是，它又不是一种真正的面向对象编程（OOP）语言，因为它的语法中没有 class（类）。

这是摘自阮一峰老师的博客，这句话放在 ES5 可以说不为过，然而到了 ES6 这么说就已经不严谨了。因为 ES6 中已经有了专属的 class 语法了。

有的同学喜欢函数式的编程方式，有的同学喜欢面向对象的编程思维，我们今天不论长短，重点讲述怎么使用 ES6 的 class 语法完成面向对象的开发。

对于面向对象编程而言，更关注类的声明、属性、方法、静态方法、继承、多态、私有属性。

## 声明类

首先我们要先来说明在 JavaScript 世界里如何声明一个 “类”。在 ES6 之前大家都是这么做的：

```js
let Animal = function(type) {
  this.type = type;
  this.walk = function() {
    console.log(`I am walking`);
  };
};

let dog = new Animal("dog");
let monkey = new Animal("monkey");
```

在上述代码中，我们定义了一个叫 Animal 的类，类中声明了一个属性 type、一个方法 walk；然后通过 new Animal 这个类生成实例，完成了类的定义和实例化。当然你也可以这样写：

```js
let Animal = function(type) {
  this.type = type;
};

Animal.prototype.walk = function() {
  console.log(`I am walking`);
};

let dog = new Animal("dog");
let monkey = new Animal("monkey");
```

在 ES6 中把类的声明专业化了，不在用 function 的方式了，请看：

```js
class Animal {
  constructor(type) {
    this.type = type;
  }
  walk() {
    console.log(`I am walking`);
  }
}
let dog = new Animal("dog");
let monkey = new Animal("monkey");
```

很明显，从定义上就很专业了，有构造函数、方法，但是 ES6 增加了新的数据类型 class 吗？

`console.log(typeof Animal) //function`
可以发现 class 的类型还是 function，和 ES5 貌似并没有什么区别，那么 class 中定义的方法在哪呢？我们知道只要是函数，就一定会有 prototype 对象。那么类的方法和 prototype 对象有什么关系呢？

```js
console.log(Animal.prototype);
// {constructor: ƒ, walk: ƒ}
//   constructor: class Animal
//   walk: ƒ walk()
//   __proto__:
//   constructor: ƒ Object()
//   hasOwnProperty: ƒ hasOwnProperty()
//   isPrototypeOf: ƒ isPrototypeOf()
//   propertyIsEnumerable: ƒ propertyIsEnumerable()
//   toLocaleString: ƒ toLocaleString()
//   toString: ƒ toString()
//   valueOf: ƒ valueOf()
//   __defineGetter__: ƒ __defineGetter__()
//   __defineSetter__: ƒ __defineSetter__()
//   __lookupGetter__: ƒ __lookupGetter__()
//   __lookupSetter__: ƒ __lookupSetter__()
//   get __proto__: ƒ __proto__()
//   set __proto__: ƒ __proto__()
```

可以看出在 Animal.prototype 对象上有两个方法，一个是构造函数（constructor）、一个是自定义的方法（walk）。这是不是和 ES5 的第二种写法一模一样？我们再来看下属性，在 ES5 中有个 API 用来判断对象的自有属性（hasOwnProperty）。

`console.log(dog.hasOwnProperty('type')) //true`
这个表现也和 ES5 中直接使用 function 定义类的方式相同，所以得出一个结论：class 的方式是 function 方式的语法糖。

## Setters & Getters

对于类中的属性，可以直接在 constructor 中通过 this 直接定义，还可以直接在类的顶层来定义：

```js
class Animal {
  constructor(type, age) {
    this.type = type;
    this._age = age;
  }
  get age() {
    return this._age;
  }
  set age(val) {
    this._age = val;
  }
}
```

这个代码演示了，通过 get/set 来给类定一个属性，不过貌似没有说服力。因为 age 和 \_age 都是类的属性，而且是相同的含义这样做感觉没有实际用途。但是如果一个属性是个只读的呢？

```js
class Animal {
  constructor(type) {
    this.type = type;
  }
  get addr() {
    return "北京动物园";
  }
}
```

毋庸赘述，大家都能看出来含义。再来看下如下的应用场景：

```js
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }
  get html() {
    return this.element.innerHTML;
  }
  set html(value) {
    this.element.innerHTML = value;
  }
}
```

利用 set/get 实现了对 element.innerHTML 的简单封装。

可是，有时候我们真的需要设置一个私有属性(闭包)，然后通过一定的规则来限制对它的修改，利用 set/get 就可以轻松实现。

```js
let #age = 1
class Animal {
    constructor(type) {
        this.type = type
    }
    get age() {
        return #age
    }
    set age(val) {
        if (val > 0 && val < 10) {
            #age = val
        }
    }
}
```

```js
// getter and setter静态属性的由来
//1、类中定义的属性name时私有属性 类外部无法获取到

class Person {
  constructor(private name: string) {}
}
const person = new Person("dell");
console.log(person.name); //会报错

//2、定义类的静态属性 getter来返回类中的私有属性，类外可以直接调用该属性，且不用执行

class Person {
  constructor(private _name: string) {}
  get name() {
    return this._name + " lee"; //可以在类中获取私有属性，比如返回可以加密，确保私有属性的保密性
  }
}
const person = new Person("dell");
console.log(person.name); //无需执行

//同理上面直接在类外使用 person._name是无法被赋值的，所以用到set属性

class Person {
  constructor(private _name: string) {}
  get name() {
    return this._name + " lee";
  }
  set name(name: string) {
    //通过set进行处理，将传入的值真正改变私有属性
    const realName = name.split(" ")[0];
    this._name = realName;
  }
}

const person = new Person("dell");
console.log(person.name);
person.name = "dell lee";
console.log(person.name);
```

## 静态方法

静态方法是面向对象最常用的功能，在 ES5 中利用 function 实现的类是这样实现一个静态方法的。

```js
let Animal = function(type) {
  this.type = type;
  this.walk = function() {
    console.log(`I am walking`);
  };
};

Animal.eat = function(food) {
  console.log(`I am eating`);
};
```

在 ES6 中使用 static 的标记是不是静态方法，代码如下：

```js
class Animal {
  constructor(type) {
    this.type = type;
  }
  walk() {
    console.log(`I am walking`);
  }
  static eat() {
    console.log(`I am eating`);
  }
}
```

有没有很清爽，代码可读性一下子就上来了。static 静态方法可以被子类继承，无法实例化。
下面这部分代码是 TS 中对 class 类的定义，注意的是 ts 中多了 private、public 等

```js
//类的单例模式，不允许通过new Demo() 方法生成多个
//方法一：
class Demo {
  //private定义的constructor 则无法new
  private constructor() {}
  //通过static定义的方法 把该方法挂载到类上 而不是类的实例上
  static getInstance() {
    return new Demo();
  }
}

const demo1 = Demo.getInstance(); //依旧是new了两个实例，指向不同
const demo2 = Demo.getInstance();

//方法二：
class Demo {
  private static instance: Demo;
  //private定义的constructor 则无法new
  private constructor(public name: string) {}
  //通过static定义的方法 把该方法挂载到类上 而不是类的实例上
  static getInstance() {
    //instance为私有属性，类外不能调用，如果没有则初始化，有则返回该实例
    if (!this.instance) {
      this.instance = new Demo("dell lee");
    }
    return this.instance;
  }
}

const demo1 = Demo.getInstance();
const demo2 = Demo.getInstance();
console.log(demo1.name);
console.log(demo2.name);

// getter and setter
// class Person {
//   constructor(private _name: string) {}
//   get name() {
//     return this._name + ' lee';
//   }
//   set name(name: string) {
//     const realName = name.split(' ')[0];
//     this._name = realName;
//   }
// }

// const person = new Person('dell');
// console.log(person.name);
// person.name = 'dell lee';
// console.log(person.name);

class Demo {
  private static instance: Demo;
  private constructor(public name: string) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Demo("dell lee");
    }
    return this.instance;
  }
}

const demo1 = Demo.getInstance();
const demo2 = Demo.getInstance();
console.log(demo1.name);
console.log(demo2.name);

```

## 继承

面向对象只所以可以应对复杂的项目实现，很大程度上要归功于继承。如果对继承概念不熟悉的同学，可以自行查询。在 ES5 中怎么实现继承呢？

```js
// 定义父类
let Animal = function(type) {
  this.type = type;
};
// 定义方法
Animal.prototype.walk = function() {
  console.log(`I am walking`);
};
// 定义静态方法
Animal.eat = function(food) {
  console.log(`I am eating`);
};
// 定义子类
let Dog = function() {
  // 初始化父类
  Animal.call(this, "dog");
  this.run = function() {
    console.log("I can run");
  };
};
// 继承
Dog.prototype = Animal.prototype;
```

从代码上看，是不是很繁琐？而且阅读性也较差。再看看 ES6 是怎么解决这些问题的：

```js
class Animal {
  constructor(type) {
    this.type = type;
  }
  walk() {
    console.log(`I am walking`);
  }
  static eat() {
    console.log(`I am eating`);
  }
}

class Dog extends Animal {
  constructor() {
    super("dog");
  }
  run() {
    console.log("I can run");
  }
}
```

虽然 ES6 在类的定义上仅是 ES5 定义类的语法糖，但是从开发者的角度而言，开发更有效率了，代码可阅读性大大提升。

> demo 示例：demo/html/classIndex.html

## ES5 中 class 类的继承

### 1、原型链继承

**要点**

- 1、父类属性放在构造函数中、方法放在原型链上
- 2、将父类的实例作为子类的原型

```js
function Parent() {
  this.isShow = true;
  this.info = {
    age: 18,
  };
}
Parent.prototype.getInfo = function() {
  console.log(this.isShow);
  console.log(this.info);
};

function Child() {}
Child.prototype = new Parent(); //原型链继承
//实例化
let child1 = new Child();
child1.isShow = false;
child1.info.age = 25;
let child2 = new Child();
child2.getInfo(); //true {age:25}
```

**缺点**

- 父类的所有引用属性（info）会被所有子类共享，更改一个子类的引用属性，其他子类也会受影响
- 子类型实例不能给父类型构造函数传参

### 2、构造函数继承

> 在子类构造函数中调用父类构造函数，可以在子类构造函数中使用 call()和 apply()方法

```js
function Parent(name) {
  this.info = {
    name: name,
    age: 19,
  };
}

function Child(name) {
  Parent.call(this, name); //这里
}

let child1 = new Child("json");

child1.info.gender = "男";
child1.info.age = 20;
console.log(child1.info); // {name: "json", age: 20, gender: "男"};

let child2 = new Child("joy");
console.log(child2.info); // {name: "joy", age: 19}
```

​ 通过使用 call()或 apply()方法，Parent 构造函数在为 Child 的实例创建的新对象的上下文执行了，就相当于新的 Child 实例对象上运行了 Parent()函数中的所有初始化代码，结果就是每个实例都有自己的 info 属性。

**优点**

- 1、可以在子类构造函数中向父类传参数
- 2、父类的引用属性不会被共享

**缺点**
子类不能访问父类原型上定义的方法（即不能访问 Parent.prototype 上定义的方法），因此所有方法属性都写在构造函数中，每次创建实例都会初始化

**示例**

```js
function Parent() {
  this.info = {
    name: "name",
    age: 19,
  };
}
Parent.prototype.getInfo = function() {
  console.log(this.info.name);
  console.log(this.info.age);
};

function ChildTwo() {}
ChildTwo.prototype = new Parent();

let child2 = new ChildTwo();
child2.getInfo();

function Child() {
  Parent.call(this); //构造函数继承
}
let child1 = new Child("json");
child1.getInfo(); //报错，Child 通过在构造函数中的call
```

## 练习

- 请实现一个堆栈类，具备 push、pop 功能。
- 请回忆下自己在业务中有哪些场景可以用类来实现

### 相关链接

[class 继承方式汇总](https://juejin.cn/post/6914216540468576263)
