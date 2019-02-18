/*
 * tabs 组件的外层，处理所有组件逻辑
 * 控制整个组件的各种操作 接受三个参数 defaultIndex、changeCallBack、deleteCallBack
 * |  defaultIndex number类型 控制整个 tabs 默认显示那个 tab ，通过修改 defaultIndex 也可以控制组件选中哪个
 * |  changeCallBack 改变 tab 选中时所触发的回调函数，并传入一个参数 index 当前选中项
 * |  deleteCallBack 删除 tab 时所触发的回调函数，并传入一个参数 index 当前选中项
 * -  ！注意 deleteCallBack 删除后导致 选中项改变的情况下 也会触发 changeCallBack 回调函数
 * -  ！注意删除 tab 是受外部数据源控制的，不是组件自身控制的，删除必须根据外部数据源和 index 来修改传入的 AnalysisTab 数量来控制
 */
import React from 'react';

import { TabsContent, TabsTitle } from './tabComponent';

export default class AnalysisTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.defaultIndex ? props.defaultIndex : 0
        }
        this.changeIndex = this.changeIndex.bind(this);
        this.deleteIndex = this.deleteIndex.bind(this);
    }
    componentWillReceiveProps(props) {
        // 如果 props.defaultIndex 没有改变的话 说明只是设置的默认值 不要影响组件内部
        if(this.props.defaultIndex === props.defaultIndex) {
            return;
        }
        // props.defaultIndex 被修改 说明 tab 切换受外部控制修改 state
        if((props.defaultIndex || props.defaultIndex === 0) && this.state.index !== props.defaultIndex) {
            this.setState({
                index: props.defaultIndex
            })
        }
    }
    // 切换选择的 tab 触发的回调函数
    changeIndex(index) {
        this.setState({
            index
        })
        if(this.props.changeCallBack) {
            this.props.changeCallBack(index);
        }
    }
    // 删除 tab 所触发的函数
    deleteIndex(index,name) {
        if(!this.props.deleteCallBack) {
            return;
        }

        const deleteIndex = index;
        const deleteName = name;
        this.props.deleteCallBack(deleteIndex, deleteName);
    }
    render() {
        const { children } = this.props;
        const { index } = this.state;
        const tabs = React.Children.map(children, (item) => {
            return item.props.tab
        })
        return (
            <div>
                <TabsTitle tabs={tabs} index={index} changeIndex={this.changeIndex} deleteIndex={this.deleteIndex}/>
                <TabsContent activeNum={index}>{children}</TabsContent>
            </div>
        )
    }
}
