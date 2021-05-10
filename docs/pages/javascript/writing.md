---
sidebarDepth: 1
---

### 实现下面代码

```js
function repeat(s, count) {}
repeat("s", 3); // 输出 ‘sss’
```

- 实现下面代码

```js
// 正则匹配标签名 输出div p span
<div>
  <p>
    <span></span>
  </p>
  <span></span>
</div>
```

- 请实现 find 函数，使下列的代码调用正确。

```js
// 约定：
// title数据类型为String
// userId为主键，数据类型为Number
var data = [
  { userId: 8, title: "title1" },
  { userId: 11, title: "other" },
  { userId: 15, title: null },
  { userId: 19, title: "title2" },
];
var find = function(origin) {
  // your code are here...
};
// 查找 data 中，符合条件的数据，并进行排序
var result = find(data)
  .where({
    title: /\d$/,
  })
  .orderBy("userId", "desc");

console.log(result); // [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];
```

- 实现 sendRequest(promises, max, callback)，同时最多执行 max 个 promises，超过的等待有空闲的开始执行，执行完成后执行 callback

```js
function sendRequest(promises, max, callback) {
  let current = 0;
  const results = [];
  const originLen = promises.length;
  const next = () => {
    while (current < max && promises.length) {
      const index = originLen - promises.length;
      const promise = promises.shift();
      results[index] = {
        value: null,
        reason: null,
      };
      Promise.resolve(promise)
        .then(
          (value) => {
            results[index].value = value;
          },
          (reason) => {
            results[index].reason = reason;
          }
        )
        .finally(() => {
          current--;
          next();
        });
      current++;
    }

    if (current === 0) {
      callback(results);
    }
  };
  next();
}
```

- 实现 findFirstIndex 函数，找到有序数组 [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67]中第一次出现的位置，比如 7 第一次出现的位置是 4

```js
function findFirstIndex(arr, target) {
  let begin = 0;
  let end = arr.length;
  while (begin < end) {
    const mid = (begin + end) >>> 1;
    if (arr[mid] >= target) {
      end = mid;
    } else {
      begin = mid + 1;
    }
  }
  if (begin === arr.length) return -1;
  return arr[begin] === target ? begin : -1;
}
```

- 十进制转换成任意进制

```js
function tenToOther(num, base) {
  const baseNumber = "0123456789abcdefghijklmnopqrstuvwxyz";
  const result = [];
  while (num) {
    const rest = num % base;
    num = Math.floor(num / base);
    result.unshift(baseNumber[rest]);
  }
  return result.join("");
}
```

- 大数相加

```js
function bigAdd(a, b) {
  const aArr = a.split("");
  const bArr = b.split("");

  let flag = 0;
  let result = [];
  while (aArr.length || bArr.length) {
    const left = aArr.pop() || 0;
    const right = bArr.pop() || 0;

    const value = Number(left) + Number(right) + flag;

    result.unshift(value % 10);

    flag = parseInt(value / 10);
  }

  if (flag) {
    result.unshift(flag);
  }

  return result.join("");
}
```

- 深拷贝

```js
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (map.has(obj)) {
    return map.get(obj);
  }
  const copy = Array.isArray(obj) ? [] : {};
  map.set(obj, copy);
  const keys = Reflect.ownKeys(obj);
  keys.forEach((key) => {
    copy[key] = deepClone(obj[key], map);
  });
  return copy;
}
```

- 图片懒加载写代码

```js
function lazyload() {
  const observe = new IntersectionObserver((enteris) => {
    enteris.forEach((entry) => {
      const lazyImage = entry.target;
      if (
        entry.isIntersecting &&
        lazyImage.getAttribute("src") == "loading.gif"
      ) {
        lazyImage.src = lazyImage.dataset.src;
        observe.unobserve(lazyImage);
      }
    });
  });

  for (let i = 0; i < imgs.length; i++) {
    observe.observer(imgs[i]);
  }
}
```

### 相关文章

[手撕前端面试代码题](https://blog.csdn.net/weixin_43758603/article/details/109895826)
