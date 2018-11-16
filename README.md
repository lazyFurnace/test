# test

new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),


node 获取本机 ip
```
function getIPAdress(){  
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }  
} 
```

这个包用于各种测试或放未整理的东西...

redux-action
https://www.jianshu.com/p/d2615a7d725e

Reselect
https://www.jianshu.com/p/6e38c66366cd

redux-form redux-modal

react 注释规范
```
/**
 * @typedef {Object} Avatar.props
 * @property {boolean} [bordered=false] - Avatar has border, set true to add "bordered" class name.
 * @property {string} [label] - Avatar aria label.
 * @property {string} [prefix=CLASS_NAME_PREFIX] - Avatar class name prefix.
 * @property {"circle"|"square"} [shape="circle"] - Avatar shape class name.
 * @property {"small"|"normal"|"large"} [size="normal"] - Avatar size class name.
 * @property {string} src - Avatar image url.
 * @see CLASS_NAME_PREFIX
 */

/**
 * @typedef {Object} Avatar.state
 * @property {boolean} loading - Avatar image is loading.
 * @property {boolean} loaded - Avatar image is loaded.
 * @property {string} src - Avatar image resize url.
 */

/**
 * Avatar component.
 * @class Avatar
 * @classdesc Avatars can be used to represent people or objects. It supports images only.
 * @extends React.Component<Avatar.props, Avatar.state>
 * @property {Avatar.props} props
 * @requires module:components/media/qiniu
 */
```

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
- window 启动 ubuntu 虚拟机 && nginx 代理使用介绍
- 常用 linux 指令
- redux 和 react-redux 源码文章

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





### 根目录 

#### app.json
- pages - 小程序中所有的页面
- window - 页面顶部颜色等设置
- [配置](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)

#### project.config.json
- [配置微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html)

### 模板使用
```
<button wx:if="{{!hasUserInfo && canIUse}}"> 获取头像昵称 </button>
<block wx:else>
  <image src="{{userInfo.avatarUrl}}" background-size="cover"></image>
  <text class="userinfo-nickname">{{userInfo.nickName}}</text>
</block>
```

### 事件
wxml
```
<view>{{ msg }}</view>
<button bindtap="clickMe">点击我</button>
```
js
```
page({
  clickMe: function() {
    this.setData({
      msg: 'hello world'
    })
  }
})
```

### 生命周期
onLaunch - 小程序启动之后触发



