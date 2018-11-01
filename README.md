# test

这个包用于各种测试或放未整理的东西...

#### async & await
```js
function getSomething() {
  return "something";
}
function testAsync() {
  return new Promise(res => {
    setTimeout(() => {
      res('hahaha')
    }, 2000);
  })
}

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}

test();
```  


#### react-transition-group 使用

```jsx
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
            value => {
              console.log(`value: ${value}`);
              return <div>{value}</div>
            }
          }
        </Transition>
        <button onClick={() => this.setState({isShow: !isShow})}>点我</button>
      </div>
    );
  }
}
```

### 计划文章
- postMessage 介绍 finish
- window 启动 ubuntu 虚拟机 && nginx 代理使用介绍
- 常用 linux 指令
- redux 和 react-redux 源码文章

### 问题记录
- canvas 回去图片 base64 问题介绍

#### linux 指令

- ps -ef | grep nginx 查进程
- sudo kill -QUIT 522 杀进程
- find /| grep nginx.conf 查找文件
- sudo nginx 启动 nginx
- sudo vi nginx.conf 打开看文本
- sudo mv /mnt/d/nginx.conf ./nginx.conf 替换文件
- cd 进入 xxx
- mkdir xxx 创建
- ls 看有什么
- cp -i ./config/m.dev.huohua.cn.conf etc/nginx/servers/  拷贝
- sudo apt-get install nginx 安装 nginx
- /etc/nginx 位置
- sudo nginx -s reload 重新加载
- sudo vim m.dev.huohua.cn.conf  编辑文件
- ll  不知道
