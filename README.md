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






```
function rendomArray(arrayNum) {

    let arr = [], rendomArr = [];

    const rendomNum = length => parseInt(Math.random() * length);

    for (let i = 0; i < arrayNum; i++) {
        arr.push(i);
    }
    
    for (let i = 0; i < arrayNum; i++) {
        const num = rendomNum(arr.length);
        rendomArr.push(arr[num]);
        arr[num] = arr[arr.length - 1];
        arr.length -= 1;
    }
    
    return rendomArr;
};

/**
 * Test
 */

console.time('Time Test');

rendomArray(100);

console.timeEnd('Time Test');



function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}



function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            if(arr[j - 1] > arr[j]) {
                let temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}


function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        if (minIndex) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}


function mergeSort(arr) {
    const len = arr.length;
    if (len < 2) {
        return arr;
    }
    const middle = Math.floor(len / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] > right[0]) {
            result.push(right.shift());
        } else {
            result.push(left.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift());
    }
    console.log(result);
    return result;
}
function shellSort(arr) {
    let len = arr.length;
    let gap = 1;
    while (gap < len / 3) {
        gap = 3 * gap + 1;
    }
    // console.log(gap)
    while (gap >= 1) {

        for (let i = gap; i < len; i++) {
            for (let j = i; j >= gap; j -= gap) {
                console.log(j)
                if (arr[j] < arr[j - gap]) {
                    swap(arr, j, j - gap);
                } else {
                    break;
                }
            }
            console.log('---');
        }

        gap = (gap - 1) / 3;
    }
}
function swap(array, i, j) {
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}
```


function quickSort(arr) {
    quick(arr, 0, arr.length - 1);
}

function quick(arr, left, right) {
    let index;

    if (arr.length > 1) {
        index = partition(arr, left, right);

        if (left < index - 1) { //{4} 
            quick(arr, left, index - 1); //{5} 
        }
        if (index < right) { //{6} 
            quick(arr, index, right); //{7} 
        }
    }
}

function partition(arr, left, right) {
    let pivot = arr[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
        while (arr[i] < pivot) { //{12} 
            i++;
        }
        while (arr[j] > pivot) { //{13} 
            j--;
        }
        if (i <= j) { //{14} 
            swapQuickStort(arr, i, j); //{15} 
            i++;
            j--;
        }
    }
    return i; //{16} 
}

function swapQuickStort(array, index1, index2) {
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
};
