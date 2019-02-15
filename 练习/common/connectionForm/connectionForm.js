/*
 * 这个组件接收 10个 参数
 * coordinateUpdate 坐标位置更新回调函数  index 改的是哪个 coordinateObj 坐标位置对象
 * listExchange 拖拽后改变数据位置的的回调函数 nowIndex 拖动元素是哪个  willIndex 拖动到什么位置上
 * checkBoxSelect 列表中所有选择框的回调函数 type 单选还是全选  index 哪个表格的数据  num 改表格中的哪一项数据
 * deleteCallBack 删除按钮的回调 index 哪个表格的数据
 * selectListIndex 选中列表的回调 控制右侧栏显示的内容
 * clickUpdate 链接画线的回调函数  type, text, index, num 是前是后 文字是什么 第几个表格的  第几项
 * toggleList 切换展开收起回调
 * lookTable 浏览回调
 * preAnalysisData 这个数据源这个页面的核心数据源不多做叙述
 * listIndex 被点击的连线
 */
import React from 'react';

import { ConnectList, ConnectSvg } from './component';

import styles from './connectionForm.less';

export default class ConnectionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            //拖动框是否显示
            drag: false,

            //拖动框的位置
            dragX: 0,
            dragY: 0,

            //点击拖动框内的位置
            marginX: 0,
            marginY: 0,

            //画线的div是否显示
            svgToggle: false,

            //拖动框拖动到哪个位置上
            dragIndex: 0,

            //拖动列表的名字
            dragName: ''
        }
        this.dragEventHandlerToggle = this.dragEventHandlerToggle.bind(this);
        this.dragEventHandlerCoordinate = this.dragEventHandlerCoordinate.bind(this);
        this.dragEventHandlerInside = this.dragEventHandlerInside.bind(this);
        this.dragEventHandlerDown = this.dragEventHandlerDown.bind(this);
        this.dragEventHandlerName = this.dragEventHandlerName.bind(this);
    }
    // 列表 title 点击时触发 显示拖动框 隐藏链接
    dragEventHandlerToggle() {
        const { drag, svgToggle } = this.state;
        this.setState({
            drag: !drag,
            svgToggle: !svgToggle
        })
    }
    // 列表 title 点击和拖动时触发这个方法 传入当前拖动的坐标
    dragEventHandlerCoordinate(dragX, dragY) {
        /*
         * containerLeft 找到当前容器距离左侧边界的距离 +10 是因为有 10px 的 padding-left
         * scrollLeft 找到外层可滑动容器滑动了多少距离
         * dragX + scrollLeft 得出鼠标所在位置在这个滑动容器中真正的坐标 actualDistance
         * actualDistance - containerLeft 是点击位置相对于列表第一项的位置
         * +120 是因为想去的是中点 每个列表长 240 得出 相对位置 mouseLeft
         * mouseLeft/240 得出当前为第几个列表上 并取整
         */
        const containerLeft = window.connectionFormHeight.offsetLeft + 10;
        const scrollLeft = window.dragLeft.scrollLeft;
        const actualDistance = scrollLeft + dragX;
        const mouseLeft = actualDistance - containerLeft + 120;
        const dragIndex = parseInt(mouseLeft / 240);
        //将当前点的坐标 几拖动到了哪个列表的位置保存下载
        this.setState({
            dragX,
            dragY,
            dragIndex
        })
    }
    // 由于 dragX、dragY 的坐标是 元素左上角的坐标 所以需要用 为负值的 margin 矫正位置 
    dragEventHandlerInside(marginX, marginY) {
        this.setState({
            marginX,
            marginY
        })
    }
    // 拖拽松手后根据 index 所拖拽元素的需要和 this.state.dragIndex 所拖拽到的位置来交换元素
    dragEventHandlerDown(index) {
        this.props.listExchange(index, this.state.dragIndex);
    }
    // 拖拽前的点击获取所点击列表的 titleName 传给拖拽框
    dragEventHandlerName(name) {
        this.setState({
            dragName: name
        })
    }
    render() {
        const { 
            preAnalysisData, 
            selectListIndex, 
            deleteCallBack, 
            checkBoxSelect, 
            coordinateUpdate, 
            clickUpdate, 
            toggleList, 
            lookTable,
            listIndex
        } = this.props;

        const { 
            drag, 
            dragX, 
            dragY, 
            svgToggle,
            marginX, 
            marginY, 
            dragIndex, 
            dragName 
        } = this.state;

        const connectWidth = ((preAnalysisData.length * 240) + (svgToggle ? 0 : (preAnalysisData.length - 1)) * 400 + 20 + 'px');
        return (
            <div 
                id='connectionFormHeight'
                className={styles.connectBody} 
                style={{'width': connectWidth}}
            >
                {
                    preAnalysisData.map((item, index) => {
                        const List = (
                            <ConnectList
                                dragEventHandlerName={this.dragEventHandlerName}
                                dragEventHandlerDown={this.dragEventHandlerDown}
                                dragEventHandlerInside={this.dragEventHandlerInside}
                                dragEventHandlerCoordinate={this.dragEventHandlerCoordinate}
                                dragEventHandlerToggle={this.dragEventHandlerToggle}
                                coordinateUpdate={coordinateUpdate}
                                checkBoxSelect={checkBoxSelect}
                                deleteCallBack={deleteCallBack}
                                clickUpdate={clickUpdate}
                                toggleList={toggleList}
                                lookTable={lookTable}
                                titleIndex={index}
                                diffItem={item}
                                drag={drag}
                                key={item.key + 'list'}
                            />
                        );
                        const Svg = (
                            <ConnectSvg
                                coordinateOne={preAnalysisData[index - 1] && preAnalysisData[index - 1].relationData}
                                coordinateTwo={item.relationData}
                                selectListIndex={selectListIndex}
                                titleIndex={index} 
                                listIndex={listIndex === index - 1}
                                dragIndex={dragIndex === index} 
                                svgToggle={svgToggle} 
                                key={item.key + 'svg'}
                            />
                        );
                        if(index === 0) {
                            return List;
                        } else {
                            return [Svg, List];
                        }
                    })
                }
                <div 
                    style={{
                        'display': drag ? "block" : "none", 
                        'left': `${dragX}px`, 
                        'top': `${dragY}px`,
                        'marginLeft': `-${marginX}px`,
                        'marginTop': `-${marginY}px`
                    }} 
                    className={styles.drag}
                >
                    <ConnectList isExhibition={true} titleName={dragName} />
                </div>
            </div>
        )
    }
}