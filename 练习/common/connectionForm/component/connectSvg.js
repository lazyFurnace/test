// coordinateOne、coordinateTwo  前后对应的列表
// selectListIndex 点击控制侧栏的回调
// titleIndex 选中的是什么
// dragIndex 拖拽移动上去的效果
// svgToggle 是否显示

import React from 'react';
import createSVG from './Bezier_SVG';

import styles from './connectSvg.less';

export default class ConnectSvg extends React.Component {
    constructor(props) {
        super(props);
        this.handlerSelect = this.handlerSelect.bind(this);
        this.drawingLine = this.drawingLine.bind(this);
    }
    // 选中那个列表
    handlerSelect(e) {
        e.stopPropagation();
        this.props.selectListIndex(this.props.titleIndex - 1);
    }
    // 画线
    drawingLine(y1, y2) {
        const { coordinateOne, coordinateTwo, listIndex } = this.props;
        if(coordinateOne.toggleList) {
            y1 = 'Average';
        }
        if(coordinateTwo.toggleList) {
            y2 = 'Average';
        }
        this.myLine.setData({
            x1: 0,
            y1: y1,
            x2: 400,
            y2: y2
        }, listIndex)
    }
    componentDidMount() {
        if(this.Svg) {
            this.myLine = new createSVG(this.Svg);
            const { coordinateOne, coordinateTwo } = this.props;
            if(coordinateOne.relationAfterCoordinate && coordinateTwo.relationBeforeCoordinate) {
                this.drawingLine(coordinateOne.relationAfterCoordinate, coordinateTwo.relationBeforeCoordinate);
            }
        }
    }
    componentDidUpdate() {
        const { coordinateOne, coordinateTwo } = this.props;
        if(this.Svg && coordinateOne.relationAfterCoordinate && coordinateTwo.relationBeforeCoordinate) {
            this.drawingLine(coordinateOne.relationAfterCoordinate, coordinateTwo.relationBeforeCoordinate);
        }
    }
    render() {
        const { svgToggle, dragIndex } = this.props;
        return (
            <div 
                onClick={this.handlerSelect}
                className={`${styles.svgBody}  ${svgToggle ? styles.svgToggle : ''} ${svgToggle && dragIndex ? styles.indexList : ''}`}
            >
                <div
                    ref={elem => this.Svg = elem}
                    style={{'display': svgToggle ? 'none' : 'block'}} 
                    className={styles.svgBox}
                >   
                    <div className={styles.bindIcon}></div>
                </div>
            </div>
        )
    }
}