## Node 搭建的 Restful 的风格的 API 中间件，依赖于Express 和 Mongoose



- 中间件自动生成： restful的约定风格API


URL | 	HTTP | 功能
----|------|----
/tab | POST  | 创建对象
/tab | GET  | 查询对象
/tab/objectId | GET  | 获取对象
/tab/objectId | PUT  | 更新对象
/tab/objectId | DELETE  | 删除对象


---
### 一、如何使用？

```
npm install "ltz-rest" --save
```

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

### 由上面可知，我们有俩注册模型 student school , 这俩注册的模型都自动生成API


####__下面自动生成5个 API 的使用__

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

查询 student 文档，数字大于、小于、等于、不等于的数字查询；_gt _lt _gte _lte _ne
http://localhost:3000/student?_where={"score.shuxue":{"_gt":90}} //score.shuxue 大于90的

查询 student 文档，字符串根据「 正则表达式 」查询。 "_regex":"^李"，"_regex":"李"，"_regex":"李$"，名字开头带李,名字有李，名字结尾是李
http://localhost:3000/student?_where={"name":{"_regex":"^李"}} //名字开头带"李"

查询 student 文档，连表的显示。 也就说xuexiao查询出来不是id，查询出来的是相应的文档
http://localhost:3000/student?_populte=xuexiao

来一个综合例子：查询 student 文档，score.shuxue 大于90且 name 带“李”，xuexiao 连表显示，限制一条数据。
http://localhost:3000/student?_where={"score.shuxue":{"_gt":90},"name":{"_regex":"李"}}&_populte=xuexiao&_limit=1

```

3:GET 根据唯一 id 查询

```
查询 student 文档，唯一id 592a33bf1b84a41131db2f55 ，如果需要学校数据需要_populte
http://localhost:3000/student/592a33bf1b84a41131db2f55?_populte=xuexiao
```

4:PUT 根据唯一 id 更新数据

```
修改数据 PUT， 年龄修改为18岁。 使用了 _populte 获取学校信息。
http://localhost:3000/student/592a33bf1b84a41131db2f55?_populte=xuexiao
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


### 二、跳过 API
跳过 API 的意思是:这个 API 是不会执行，但会调用 next，执行下一个中间件

```
// ALL：跳过所有的 API
// GET：跳过 GET
// 跳过的 API 有：GET,GETID,PUT,POST,DELETE
rest.skip = {
    'student':'ALL',//跳过 student 所有的API
    'school': 'GET,GETID'//跳过 school 的 GET 与 GETID,其它的 PUT,POST,DELETE 正常执行。
}
```

---
1.0 实现功能，配置是否跳过中间件。

0.9 书写文档，并且发布NPM

0.8 实现Population 

0.7 查询端口实现数字大于、小于、等于、不等于的数字查询。
gt lt gte lte ne

0.6 查询端口实现字符串根据「 正则表达式 」查询。
\_where={name:{"_regex":"^李"}}

0.5 思想总结、代码设计、接口设计、写一些demo、看文档。

0.4 错误堆栈抛向前台。

0.3 查询接口实现排序。

0.2 版本已经实现5个接口，查询接口仅仅实现了 skip 与 limit。

0.1 版本搭建框架，调试接口。

