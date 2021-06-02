---
sidebarDepth: 1
---

### 1、elasticsearch 查询（match 和 term）的区别

(1)match 匹配查询，会将查询匹配进行分词，比如：查询和"我的宝马多少马力"这个查询语句匹配的文档。

```json
{
  "query": {
    "match": {
      "content": {
        "query": "我的宝马多少马力"
      }
    }
  }
}
```

上面的查询匹配就会进行分词，比如"宝马多少马力"会被分词为"宝马 多少 马力", 所有有关"宝马 多少 马力", 那么所有包含这三个词中的一个或多个的文档就会被搜索出来。并且根据 lucene 的评分机制(TF/IDF)来进行评分。

(2)term 是代表完全匹配，即不进行分词器分析，文档中必须包含整个搜索的词汇

```json
{
  "query": {
    "term": {
      "content": "汽车保养"
    }
  }
}
```

查出的所有文档都包含"汽车保养"这个词组的词汇。

(3)bool 联合查询: must,should,must_not
如果我们想要请求"content 中带宝马，但是 tag 中不带宝马"这样类似的需求，就需要用到 bool 联合查询。
联合查询就会使用到 must,should,must_not 三种关键词。

这三个可以这么理解

must: 文档必须完全匹配条件
should: should 下面会带一个以上的条件，至少满足一个条件，这个文档就符合 should
must_not: 文档必须不匹配条件
比如上面那个需求：

```json
{
  "query": {
    "bool": {
      "must": {
        "term": {
          "content": "宝马"
        }
      },
      "must_not": {
        "term": {
          "tags": "宝马"
        }
      }
    }
  }
}
```
