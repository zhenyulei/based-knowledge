---
sidebarDepth: 1
---

> demo 示例：demo/html/classIndex.html

## class 类的继承

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

### 相关链接

[class 继承方式汇总](https://juejin.cn/post/6914216540468576263)
