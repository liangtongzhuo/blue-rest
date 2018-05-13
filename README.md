## Node 搭建的 Restful 的风格的 API 中间件，依赖于 Express 和 Mongoose

### 前言

中间件自动生成： restful的约定风格API


URL | 	HTTP | 功能
----|------|----
/tab | POST  | 创建对象
/tab | GET  | 查询对象
/tab/objectId | GET  | 获取对象
/tab/objectId | PUT  | 更新对象
/tab/objectId | DELETE  | 删除对象

### 安装

```
npm install "ltz-rest" --save
```

依赖 mongoose 注册模型，两句实现 rest API

```
//1.引入框架
const rest = require('ltz-rest');
app.use('/', rest);

```

---
### 一、详情使用


```
'use strict';

const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/test');

const express = require('express');
const app = express();

//1.引入框架
const rest = require('ltz-rest');
app.use('/', rest);

app.listen(3000);


const Schema = mongoose.Schema;

const student = {
    name: String,
    age: Number,
    sex: String,
    xuexiao: {
        type: Schema.Types.ObjectId,
        ref: 'school' 
    },
    score: {
        shuxue: Number,
        yuwen: Number
    }
};
//注册 mongoose 的模型
mongoose.model('student', new Schema(student));

const school = {
    title: String
};
//注册 mongoose 的模型
mongoose.model('school', new Schema(school));

```

由上面可知，我们有俩注册模型 student school , 这俩注册的模型都自动生成API；本插件依赖 mongoose ，只有注册到mongoose.model() 才会自动生成 API


__下面自动生成 student 5个 API 的使用__

1:POST 创建数据

```

http://localhost:3000/student
body 包含 JSON 数据
{
	"age":5,
	"xuexiao":"58e8448918493009b7449229",
	"name":"小四",
	"score":{
		"shuxue":89,
		"yuwen":77
	},
	"sex":"woman"
}

返回数据
{
  "__v": 0,
  "age": 5,
  "xuexiao": "58e8448918493009b7449229",
  "name": "小四",
  "sex": "woman",
  "_id": "592a33db1b84a41131db2f56",
  "score": {
    "shuxue": 89,
    "yuwen": 77
  }
}

注意 POST，请求的主体必须是 JSON 格式，而且 HTTP header 的 Content-Type 需要设置为 application/json
```

2:GET 查询，所有的特殊性关键词都是“_”开头

```
查询 student 文档，默认_limit=100
http://localhost:3000/student

查询 student 文档，限制一条和跳过一跳：_limit=1&_skip=1
http://localhost:3000/student?_limit=1&_skip=1

查询 student 文档，数字大于、小于、大于等于、小于等于、不等于的数字查询；_gt _lt _gte _lte _ne
http://localhost:3000/student?_where={"score.shuxue":{"_gt":90}} //score.shuxue 大于90的

查询 student 文档，字符串根据「 正则表达式 」查询。 "_regex":"^李"，"_regex":"李"，"_regex":"李$"，名字开头带李,名字有李，名字结尾是李
http://localhost:3000/student?_where={"name":{"_regex":"^李"}} //名字开头带"李"

查询 student 文档，连表的显示。 也就说xuexiao查询出来不是id，查询出来的是相应的文档
http://localhost:3000/student?_populate=xuexiao

来一个综合例子：查询 student 文档，score.shuxue 大于90且 name 带“李”，xuexiao 连表显示，限制一条数据。
http://localhost:3000/student?_where={"score.shuxue":{"_gt":90},"name":{"_regex":"李"}}&_populate=xuexiao&_limit=1

```
特殊关键词_ | 	功能 | 演示
----|------|----
_limit | 限制  | _limit=10，限制返回10条数据
_skip | 跳过  | _skip=10，跳过10条数据
\_gt、\_lt、\_gte、\_lte、\_ne | 限制数字：大于、小于、大于等于、小于等于、不等于 | \_gt=10，大于10、_ne=20，不等于20
_regex | 字符串根据「 正则表达式 」查询  | {"_regex":"^李"}，名字开头带"李"
_populate| 连表数据返回  | \_populate=xuexiao，显示 xuexiao 数据，也可以用"."显示更深层的数据：_populate=xuexiao.local，可以把 xuexiao.local 的数据也展示出来

3:GET 根据唯一 id 查询

```
查询 student 文档，唯一id 592a33bf1b84a41131db2f55 ，如果需要学校数据需要_populate
http://localhost:3000/student/592a33bf1b84a41131db2f55?_populate=xuexiao
```

4:PUT 根据唯一 id 更新数据

```
修改数据 PUT， 年龄修改为18岁。 使用了 _populate 获取学校信息。
http://localhost:3000/student/592a33bf1b84a41131db2f55?_populate=xuexiao
body 包含 JSON 数据
{
	"age":18
}

返回数据
{
  "_id": "592a33bf1b84a41131db2f55",
  "age": 18,
  "xuexiao": {
    "_id": "58ddd5db6216a905ce973de4",
    "name": "第一高中",
    "__v": 0
  },
  "name": "小红2222",
  "sex": "woman",
  "__v": 0,
  "score": {
    "shuxue": 99,
    "yuwen": 88
  }
}

注意 PUT，请求的主体必须是 JSON 格式，而且 HTTP header 的 Content-Type 需要设置为 application/json
```

5:DELETE 根据唯一 id 删除数据

```
DELETE 删除文档 id 为592a33bf1b84a41131db2f55
http://localhost:3000/student/592a33bf1b84a41131db2f55

返回数据
{
  "_id": "592a33bf1b84a41131db2f55",
  "age": 18,
  "xuexiao": "58ddd5db6216a905ce973de4",
  "name": "小红2222",
  "sex": "woman",
  "__v": 0,
  "score": {
    "shuxue": 99,
    "yuwen": 88
  }
}
```


### 二、跳过中间件
这个请求中间件不会执行，并且调用 next，执行下一个中间件。

```
// ALL：跳过所有的 API 请求
// GET：跳过 GET 请求
// 5个 API：GET,GETID,PUT,POST,DELETE，可以任意选择跳过。
rest.skip = {
    'student':'ALL',//跳过 student 所有的API
    'school': 'GET,GETID'//跳过 school 的 GET 与 GETID,其它的 PUT,POST,DELETE 正常返回结果。
}

GET获取 school 文档
http://localhost:3000/school
执行失败，因为上面跳过GET

DELETE school 文档删除
http://localhost:3000/school/592a33bf1b84a41131db2f55
执行成功，因为上面没有跳过 DELETE 。


```

---
- 增加不严格模式，不写 model 也可以创建表

- 实现功能，配置是否跳过中间件。

- 书写文档，发布 NPM。

- 实现Population 

- 查询端口实现数字大于、小于、等于、不等于的数字查询。
gt lt gte lte ne

- 查询端口实现字符串根据「 正则表达式 」查询。
\_where={name:{"_regex":"^李"}}

- 思想总结、代码设计、接口设计、写一些demo、看文档。

- 错误堆栈抛向前台。

- 查询接口实现排序。

- 版本已经实现5个接口，查询接口仅仅实现了 skip 与 limit。

- 版本搭建框架，调试接口。

