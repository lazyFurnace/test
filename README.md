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


```
function LinkedList() {
    var length = 0;
    var head = null;

    function ListNode(val) {
        this.val = val;
        this.next = null;
    }

    this.append = function(element) {
        element = new ListNode(element);
        let current;

        if (head === null) {
            head = element;
        } else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = element;
        }

        length++;
    }
    this.remove = function(position) {

        if ((!position && position !== 0) || position < 0 || position > length - 1) {
            return false;
        }

        let index = 0;
        let current = head;
        let previous;

        if (position === 0) {
            head = head.next;
        } else {
            while (index < position) {
                previous = current;
                current = current.next;
                index++;
            }
            previous.next = current.next;
        }
        
        length--;
        return current;
    }
    this.insert = function(position, element) {
        element = new ListNode(element);

        if ((!position && position !== 0) || position < 0 || position > length - 1) {
            return false;
        }

        let index = 0;
        let current = head;
        let previous;

        if (position === 0) {
            head = element;
            head.next = current;
        } else {
            while (index < position) {
                previous = current;
                current = current.next;

                index++;
            }
            previous.next = element;
            element.next = current;
        }
        length++;
        return element;
    }

    this.indexOf = function(element) {
        let index = 0;
        let current = head;

        while (current) {
            if (current.val === element) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    this.print = function() {
        console.log(JSON.stringify(head, null, 4));
    }
}

var L = new LinkedList();

for (let i = 0; i < 5; i++) {
    L.append(i);
}

```
