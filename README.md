## Node 搭建的 Restful 的风格的 API 服务器，搭配的数据库为：mongodb



- 主要实现内容有：
	- Restful的约定风格


URL | 	HTTP | 功能
----|------|----
/tab | POST  | 创建对象
/tab | GET  | 查询对象
/tab/objectId | GET  | 获取对象
/tab/objectId | PUT  | 更新对象
/tab/objectId | DELETE  | 删除对象


---
0.9 例子



---

0.8 实现Population 

---

0.7 查询端口实现数字大于、小于、等于、不等于的数字查询。
gt lt gte lte ne

---
0.6 查询端口实现字符串根据「 正则表达式 」查询。
\_where={name:{"_regex":"^你"}}

---
0.5 思想总结、代码设计、接口设计、写一些demo、看文档。

---
0.4 错误堆栈抛向前台。

---
0.3 查询接口实现排序。

---
0.2 版本已经实现5个接口，但是查询接口仅仅实现了 skip 与 limit。

---
0.1 版本搭建框架，调试接口。

