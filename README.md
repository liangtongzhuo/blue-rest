## Node 搭建的 Restful 的风格的 API 服务器，搭配的数据库为：mongodb


- 主要实现内容有：
	- Restful的约定风格
	- 查询排序功能
	- 实现关系数据
	- 登陆加密



URL | 	HTTP | 功能
----|------|----
/model | POST  | 创建对象
/model | GET  | 查询对象
/model/objectId | GET  | 获取对象
/model/objectId | PUT  | 更新对象
/model/objectId | DELETE  | 删除对象


0.1 版本搭建框架，调试接口。

