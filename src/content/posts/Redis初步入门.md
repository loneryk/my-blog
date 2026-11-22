---
title: 'Redis初步入门'
published: 2026-11-07
description: ''
image: ''
tags: [Redis]
category: '技术'
draft: false
lang: ''
---


# 什么是Redis 

Redis作为键值型非关系型数据库，在项目中的使用中有低延迟速度快的优点，适合用在短时间大量调用的数据；能够支持数据持久化，支持主从集群 分片集群

与传统关系型数据库对比

- 存储方式
 - 关系型数据库基于磁盘存储，会对性能产生一定影响
 - 非关系型数据库更多依赖内存操作，内存读写速度快

 - 扩展性 
  - 关系型数据库集群模式一般是主从，主从数据一致，起到数据备份的作用，称为垂直扩展。

  * 非关系型数据库可以将数据拆分，存储在不同机器上，可以保存海量数据，解决内存大小有限的问题。称为水平扩展。

  * 关系型数据库因为表之间存在关联关系，如果做水平扩展会给数据查询带来很多麻烦



# Redis的多种数据结构

## String  

String结构是将对象序列化成JSON字符串存储 


String的常见命令有：
- SET：添加或者修改已经存在的一个String类型的键值对

- GET：根据key获取String类型的value

- MSET：批量添加多个String类型的键值对

- MGET：根据多个key获取多个String类型的value

- INCR：让一个整型的key自增1

- INCRBY:让一个整型的key自增并指定步长，例如：incrby num 2 让num值自增2

- INCRBYFLOAT：让一个浮点类型的数字自增并指定步长

- SETNX：添加一个String类型的键值对，前提是这个key不存在，否则不执行

- SETEX：添加一个String类型的键值对，并且指定有效期

在java代码中的调用是


```java

    /**

     * 操作字符串类型的数据

     */

    @Test

    public void testString(){

        // set get setex setnx

        redisTemplate.opsForValue().set("name","小明");

        String city = (String) redisTemplate.opsForValue().get("name");

        System.out.println(city);

        redisTemplate.opsForValue().set("code","1234",3, TimeUnit.MINUTES);

        redisTemplate.opsForValue().setIfAbsent("lock","1");

        redisTemplate.opsForValue().setIfAbsent("lock","2");

    }
```

**使用场景**
String 数据结构一般运用在分布式锁的实现中
利用
SETNX：添加一个String类型的键值对，前提是这个key不存在，否则不执行
原子性的实现仅当键不存在时设置值，再通过设置过期值来避免死锁

**常规数据缓存**

**限流和计数器**
利用
INCR：让一个整型的key自增1

INCRBY:让一个整型的key自增并指定步长，例如：incrby num 2 让num值自增2

的原子自增特性 高效实现计数
- 统计页面访问量，接口调用次数等需要高频计数的场景



## Hash

Hash结构能将对象中的每个字段独立存储 能针对单个字符做CRUD 


Hash的常见命令有：

- HSET key field value：添加或者修改hash类型key的field的值

- HGET key field：获取一个hash类型key的field的值

- HMSET：批量添加多个hash类型key的field的值

- HMGET：批量获取多个hash类型key的field的值

- HGETALL：获取一个hash类型的key中的所有的field和value

- HKEYS：获取一个hash类型的key中的所有的field

- HINCRBY:让一个hash类型key的字段值自增并指定步长

- HSETNX：添加一个hash类型的key的field值，前提是这个field不存在，否则不执行

在java代码中的实现是
```java
    public void testHash(){

        //hset hget hdel hkeys hvals

        HashOperations hashOperations = redisTemplate.opsForHash();

  
	//HSET 100 name tom
        hashOperations.put("100","name","tom");
	//HSET 100 age 20
        hashOperations.put("100","age","20");


	//HGET 100 name
        String name = (String) hashOperations.get("100", "name");

        System.out.println(name);

	  //HKEYS 100

        Set keys = hashOperations.keys("100");

        System.out.println(keys);

	  //HVALS

        List values = hashOperations.values("100");

        System.out.println(values);

  
	//HDEL 100 age
        hashOperations.delete("100","age");

    }
```

**使用场景**

针对一个具有多个属性的对象能够单一的对某一个字段做CRUD 
- 用户信息 ：将用户ID 作为Key 用户属性名作为field
- 商品信息 ：存储商品的库存扣减时 直接调用HINCRBY操作

Hash的字段值支持原子自增 避免创建大量的String值 


## List 
Redis中的List类型与Java中的LinkedList类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。

特征也与LinkedList类似：

- 有序

- 元素可以重复

- 插入和删除快

- 查询速度一般

常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等。

  

List的常见命令有：
- LPUSH key element ... ：向列表左侧插入一个或多个元素

- LPOP key：移除并返回列表左侧的第一个元素，没有则返回nil

- RPUSH key element ... ：向列表右侧插入一个或多个元素

- RPOP key：移除并返回列表右侧的第一个元素

- LRANGE key star end：返回一段角标范围内的所有元素

- BLPOP和BRPOP：与LPOP和RPOP类似，只不过在没有元素时等待指定时间，而不是直接返回nil


在java中的实现
```java
 public void testList(){

        //lpush lrange rpop llen

        ListOperations listOperations = redisTemplate.opsForList();

  //LPUSH mylist a b c 

        listOperations.leftPushAll("mylist","a","b","c");
  //LPUSH mylist d
        listOperations.leftPush("mylist","d");

	  //LRANGE mylist 0 -1

        List mylist = listOperations.range("mylist", 0, -1);

        System.out.println(mylist);

	  //RPOP mylist

        listOperations.rightPop("mylist");

	  //LLEN mylist

        Long size = listOperations.size("mylist");

        System.out.println(size);

    }
```

**使用场景**

**轻量级消息队列**

利用LPUSH BRPOP 从左侧写入 从右侧阻塞式读取 形成先进先出的队列

## Set
Set的常见命令有：

- SADD key member ... ：向set中添加一个或多个元素

- SREM key member ... : 移除set中的指定元素

- SCARD key： 返回set中元素的个数

- SISMEMBER key member：判断一个元素是否存在于set中

- SMEMBERS：获取set中的所有元素

- SINTER key1 key2 ... ：求key1与key2的交集


在java中的实现

```java
public void testSet(){

        //sadd smembers scard sinter sunion srem

        SetOperations setOperations = redisTemplate.opsForSet();

		//SADD set1 a b c d 

        setOperations.add("set1","a","b","c","d");
		//SADD set1 a b x y
        setOperations.add("set2","a","b","x","y");

		
		//SMEMBERS set1
        Set members = setOperations.members("set1");

        System.out.println(members);

  
		//SCARD set1
        Long size = setOperations.size("set1");

        System.out.println(size);

		//交集
		//SINTER set1 set2
        Set intersect = setOperations.intersect("set1", "set2");

        System.out.println(intersect);

		  //并集
		//SUNION set1 set2
	    Set union = setOperations.union("set1", "set2");

        System.out.println(union);

  
		//SREM set1 set2
        setOperations.remove("set1","a","b");

    }
```


**使用场景**

Redis 的Set 是一个无序，自动去重的集合 优势在于成员唯一性判断 及求多个集合之间的交集 并集 差集运算 

**去重和唯一性保障**

- 点赞 投票 用id做key 用户id 做成员 点赞时执行SADD Set去重过后，同一个用户不会产生额外记录
**社交关系集合运算**
SINTER交集  SUNION并集  SDIFF差集
- 共同关注 ：将两个用户的关注列表分别存入两个Set 执行SINTER  
- 标签系统 ： 给商品打标签 每个标签是一个Set 通过集合运算实现同时包含A B 标签的内容


## SortedSet

SortedSet具备下列特性：

- 可排序

- 元素不重复

- 查询速度快
SortedSet的常见命令有

- ZADD key score member：添加一个或多个元素到sorted set ，如果已经存在则更新其score值

- ZREM key member：删除sorted set中的一个指定元素

- ZSCORE key member : 获取sorted set中的指定元素的score值

- ZRANK key member：获取sorted set 中的指定元素的排名

- ZCARD key：获取sorted set中的元素个数

- ZCOUNT key min max：统计score值在给定范围内的所有元素的个数

- ZINCRBY key increment member：让sorted set中的指定元素自增，步长为指定的increment值

- ZRANGE key min max：按照score排序后，获取指定排名范围内的元素

- ZRANGEBYSCORE key min max：按照score排序后，获取指定score范围内的元素

- ZDIFF、ZINTER、ZUNION：求差集、交集、并集

**升序**获取sorted set 中的指定元素的排名：ZRANK key member

  **降序**获取sorted set 中的指定元素的排名：ZREVRANK key memeber

在Java中的实现

```java
public void testZset(){

        //zadd zrange zincrby zrem

        ZSetOperations zSetOperations = redisTemplate.opsForZSet();

  
		//ZADD zset1 10 a 
        zSetOperations.add("zset1","a",10);
		
        zSetOperations.add("zset1","b",12);

        zSetOperations.add("zset1","c",9);

  
		//ZRANGE zset1 0 -1
        Set zset1 = zSetOperations.range("zset1", 0, -1);

        System.out.println(zset1);

  
		//ZINCRBY zset1 10 c
        zSetOperations.incrementScore("zset1","c",10);

  
		//ZREM zset1 a b
        zSetOperations.remove("zset1","a","b");

    }
```


**使用场景**

**排行榜**

将参与排名的对象（如用户 ID、文章 ID）作为成员，将排序依据（如分数、热度、点赞数）作为 `score`。利用 `ZREVRANGE` 可以获取 top N 榜单，利用 `ZREVRANK` 可以查询某个成员的实时名次。如果分数发生变化，`ZINCRBY` 能原子地更新分数并自动调整其排序位置，无需手动重排


