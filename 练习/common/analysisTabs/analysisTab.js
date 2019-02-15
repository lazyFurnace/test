/*
 * tabs 的 title 对应的每一项都是一个 AnalysisTab
 * AnalysisTab 控制 tabs 中所渲染组件的样式 接受 两个参数 children 和 active 
 * |  children 是 tabs 组件要渲染在里面的元素 类型可以是文本、HTML、React组件等
 * |  active 是一个布尔值 判断当前 AnalysisTab 是否被选中
 * |  tab 是对应 title 的名称
 */
import React from 'react';

export default class AnalysisTab extends React.Component {
    render() {
        const { children, active, tab } = this.props;
        return (
            <div data-tab={tab} style={{"display": active ? "block" : "none"}}>{children}</div>
        )
    }
}
