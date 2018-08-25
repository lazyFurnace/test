# test
## 这是一个测试包，什么东西都可能往上放...
### 变成一个npm包了  
更新  发布  输入命令 `npm publish` <br>
更新版本  `npm version patch`

```
function getSomething() {
    return "something";
}
function testAsync() {
    return new Promise(res => {
		setTimeout(() => {
			res('hahah')
		}, 2000)
		
	})
}

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}

test();
```

8 月 27 日 起计划
周一  白天 react 虚拟DOM 、diff
      晚上 react-uxunk 中间件编写、代码注释补全。 
周二  白天 react 动画库学习
      晚上 轮播图修改
周三  白天 python 学习  LeetCode
      http 图解