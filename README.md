# test
## 这是一个测试包，什么东西都可能往上放...
### 变成一个npm包了  
更新  发布  输入命令 `npm publish` <br>
更新版本  `npm version patch`

```
class Provider extends React.Component {
    getChildContext() {
        return {
            store: this.props.store
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}

Provider.childContextTypes = {
    store: PropTypes.object.isRequired
}

Provider.propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
}

const connect = (mapState, mapDispatch) => (WrappedComponent) => {

    class Connect extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.state = {};
        }
        getStore = () => {
            this.setState({})
        }
        componentDidMount() {
            const { store } = this.context.store;
            this.unsubscribe = store.subscribe(getStore);
        }
        componentWillUnmount() {
            this.unsubscribe();
        }
        render() {
            const { store } = this.context.store;
            return (
                <WrappedComponent 
                    {...mapState(store.getState(), this.props)} 
                    {...mapDispatch(store.dispatch, this.props)} 
                    {...this.props}
                />
            )
        }
    }
    Connect.contextTypes = {
        store: PropTypes.object
    }

    return Connect;
}
```


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
