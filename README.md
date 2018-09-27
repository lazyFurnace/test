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
```
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    }
  }

  onEnter = () => {
    console.log('onEnter');
  }
  onEntering = () => {
    console.log('onEntering');
  }
  onEntered = () => {
    console.log('onEntered');
  }
  onExit = () => {
    console.log('onExit');
  }
  onExiting = () => {
    console.log('onExiting');
  }
  onExited = () => {
    console.log('onExited');
  }

  render() {
    const { isShow } = this.state;

    const duration = 3000;

    return (
      <div>
        <Transition
          // 第一遍懒加载
          mountOnEnter={true}
          // 卸载时机
          unmountOnExit={true}
          // 载入时是否加载一遍
          appear={true}
          // 布尔值代表 enter 和 exit
          in={isShow} 
          // 加载的时间
          timeout={duration}
          // 详细控制 ing... 时间
          addEndListener={(node, done) => {
            // use the css transitionend event to mark the finish of a transition
            node.addEventListener('transitionend', done, false);
          }}
          onEnter={this.onEnter}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExit={this.onExit}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          {
            (value) => {
              console.log(`value: ${value}`);
              return <div>{value}</div>
            }
          }
        </Transition>
        <button onClick={() => this.setState({ isShow: !isShow })}>点我</button>
      </div>
    );
  }
}
```


9 月 28 日 起计划 <br>

知乎 live 
- 前端工程师面试必备指南
- 前端笔试题十讲(已听，做题)
- 20道面试题帮你夯实前端基础 <br>
Puppeteer 安装调研 <br>
*****

9 月 29 日 起计划 <br>

简历修改 <br>
排序算法练习 <br>
整理 github  <br>
复习以前面试问题及应对面试方案 <br>
****

9 月 30 日 起计划 <br>
Puppeteer 写读取书签爬虫 <br>
整理再万博做的组件 <br>
pwa 准备开新坑 <br>
****
