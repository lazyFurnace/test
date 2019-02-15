import React from 'react';

import styles from './connectList.less';
// 相关参数 13个
// dragEventHandlerName、dragEventHandlerDown、dragEventHandlerInside、dragEventHandlerCoordinate、dragEventHandlerToggle
// 点击、拖动、停止的五个相关事件 详情见父组件
// coordinateUpdate、checkBoxSelect、deleteCallBack、clickUpdate 层的回调函数 不多做叙述
// isExhibition 值是 true or false 判断是不是那个拖拽框
// titleName 拖拽框的名字
// titleIndex: 当前是第几个
// diffItem 当前所选择表格的所有相关数据
// drag 是否被拖动
export default class ConnectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCheck: this.isAllCheck(props)
        }
        this.handlerClickCheck = this.handlerClickCheck.bind(this);
        this.handlerAllCheck = this.handlerAllCheck.bind(this);
        this.handlerDalete = this.handlerDalete.bind(this);
        this.handlerClose = this.handlerClose.bind(this);
        this.handlerLook = this.handlerLook.bind(this);
        // 是否全选
        this.isAllCheck = this.isAllCheck.bind(this);
        // 鼠标事件相关
        this.mouseDown = this.mouseDown.bind(this);
        this.addDocumentMove = this.addDocumentMove.bind(this);
        this.removeDocumentMove = this.removeDocumentMove.bind(this);
        // 选择关联项
        this.selectClick = this.selectClick.bind(this);
    }
    // 判断是否是全选 更新 state
    componentWillReceiveProps(nextProps) {
        this.setState({
            allCheck: this.isAllCheck(nextProps)
        })
    }
    //每次得到新数据后都重新计算新坐标
    componentDidUpdate() {
        if(this.props.isExhibition || !this.props.diffItem) {
            return false;
        }

        //计算新坐标
        const outerLayer = window.connectionFormHeight.offsetHeight;
        const innerLayer = this.contentDom.offsetHeight;
        const basicsHeight = parseInt((outerLayer - innerLayer)/2);
        const { relationAfterIndex, relationBeforeIndex } = this.props.diffItem.relationData;

        let relationAfterCoordinate = null, relationBeforeCoordinate = null;
        if(relationAfterIndex || relationAfterIndex === 0) {
            relationAfterCoordinate = basicsHeight + 41 + 10 + (relationAfterIndex + 1) * 30 -20;
        }
        if(relationBeforeIndex || relationBeforeIndex === 0) {
            relationBeforeCoordinate = basicsHeight + 41 + 10 + (relationBeforeIndex + 1) * 30 -20;
        }

        //获取原来的坐标和以前的坐标对比 如果一样的话就没必要执行下去了
        const nextRelationAfterCoordinate = this.props.diffItem.relationData.relationAfterCoordinate;
        const nextRelationBeforeCoordinate = this.props.diffItem.relationData.relationBeforeCoordinate;

        if(nextRelationAfterCoordinate === relationAfterCoordinate && nextRelationBeforeCoordinate === relationBeforeCoordinate) {
            return false;
        }
        //不一样执行回调修改数据源坐标
        this.props.coordinateUpdate(this.props.titleIndex, {relationAfterCoordinate, relationBeforeCoordinate})
    }
    // 通过判断 props.diffItem.titleData 的所有内容里的选中情况，判断是否为全选
    isAllCheck(props) {
        return props.diffItem && props.diffItem.titleData && props.diffItem.titleData.every((item) => {
            return item.isSelect;
        });
    }
    // 点击连线
    selectClick(e) {
        const dataset = e.target.dataset;
        this.props.clickUpdate(dataset.key, dataset.text, this.props.titleIndex, dataset.index);
    }
    // 点击选中
    handlerClickCheck(e) {
        this.props.checkBoxSelect("select", this.props.titleIndex, e.target.dataset.index);
    }
    //点击全选
    handlerAllCheck() {
        this.props.checkBoxSelect("selectAll", this.props.titleIndex, !this.state.allCheck);
    }
    //删除列表
    handlerDalete() {
        this.props.deleteCallBack(this.props.titleIndex);
    }
    //浏览
    handlerLook() {
        this.props.lookTable(this.props.titleIndex);
    }
    //合上？
    handlerClose() {
        this.props.toggleList(this.props.titleIndex);
    }
    // 根据鼠标移动的当前位置 更新拖拽框的位置
    addDocumentMove(e) {
        // 获取当前点击位置
        const clientX = e.clientX;
        const clientY = e.clientY;
        
        this.props.dragEventHandlerCoordinate(clientX, clientY);
    }
    // 鼠标抬起时事件，解除鼠标移动和抬起事件  隐藏拖拽框  传出当前的列表的序号、更新数据 this -> 父组件 -> app.js 更新数据
    removeDocumentMove() {
        window.document.removeEventListener('mousemove', this.addDocumentMove);
        window.document.removeEventListener('mouseup', this.removeDocumentMove);
        this.props.dragEventHandlerToggle();
        this.props.dragEventHandlerDown(this.props.titleIndex);
    }
    // 鼠标按下时触发的函数
    mouseDown(e) {
        e.stopPropagation();
        // 获取当前页面上的 scrollTop  和  scrollLeft
        const scrollLeft = window.dragLeft.scrollLeft;
        const scrollTop = window.dragTop.scrollTop;

        // 获取当前点击位置
        const clientX = e.clientX;
        const clientY = e.clientY;

        // 根据 scroll 距离和点击相对于窗口位置计算所点击区域在拖拽容器中的位置
        const dragX = clientX + scrollLeft;
        const dragY = clientY + scrollTop;

        // 点击位置在元素里的坐标
        const offsetX = dragX - e.target.offsetLeft - window.connectionFormHeight.offsetLeft;
        const offsetY = dragY - e.target.offsetTop - window.connectionFormHeight.offsetTop;

        // document 上开启监听 mousemove mouseup
        window.document.addEventListener('mousemove', this.addDocumentMove);
        window.document.addEventListener('mouseup', this.removeDocumentMove);

        // 显示拖拽框  传递点击的位置在 title 上的相对坐标  传递点击位置在浏览器中的坐标  传递拖拽框的名字
        this.props.dragEventHandlerToggle();
        this.props.dragEventHandlerInside(offsetX, offsetY);
        this.props.dragEventHandlerCoordinate(clientX, clientY);
        this.props.dragEventHandlerName(this.props.diffItem.name);
    }
    render() {
        const { isExhibition, diffItem, titleName, drag } = this.props;
        const { allCheck } = this.state;
        if(isExhibition) {
            return (
                <div className={styles.listBody}>
                    <div className={styles.title}>
                        <p>{titleName}</p>
                        <ul>
                            <li className={allCheck ? styles.checkSel : styles.allCheck}></li>
                            <li className={styles.look}></li>
                            <li className={styles.delete}></li>
                            <li className={styles.close}></li>
                        </ul>
                    </div>
                </div>
            )
        }
        return (
            <div ref={(elem) => this.contentDom = elem} className={styles.listBody}>
                <div className={styles.title}>
                    <p title={diffItem.name} onMouseDown={this.mouseDown}>{diffItem.name}</p>
                    <ul>
                        <li 
                            onClick={this.handlerAllCheck} 
                            data-key="allCheck" 
                            className={allCheck ? styles.checkSel : styles.allCheck}
                        ></li>
                        <li onClick={this.handlerLook} data-key="look" className={styles.look}></li>
                        <li onClick={this.handlerDalete} data-key="delete" className={styles.delete}></li>
                        <li onClick={this.handlerClose} data-key="close" className={styles.close}></li>
                    </ul>
                </div>
                <ul style={{"display": diffItem.relationData.toggleList ? 'none' : 'block'}} className={styles.list}>
                    {
                        diffItem.titleData.map((item, index) => {
                            const { relationBeforeIndex, relationAfterIndex } = diffItem.relationData;
                            return (
                                <li key={index}>
                                    <span 
                                        onClick={this.handlerClickCheck} 
                                        data-index={index} 
                                        className={item.isSelect ? styles.checkSel : styles.checkBox}
                                    ></span>
                                    <div style={{
                                        'color': (relationBeforeIndex === index || relationAfterIndex === index) ? 
                                            '#fb452f' : '#333'
                                    }}>
                                        <b>{item.title}</b>
                                        <div
                                            style={{'display': drag ? 'none' : 'block'}}
                                            className={relationBeforeIndex === index ? styles.leftDis : styles.leftMask}
                                            data-key='before'
                                            data-text={item.title}
                                            data-index={index}
                                            onClick={this.selectClick}
                                        ></div>
                                        <div
                                            style={{'display': drag ? 'none' : 'block'}}
                                            className={relationAfterIndex === index ? styles.rightDis : styles.rightMask}
                                            data-key='after'
                                            data-text={item.title}
                                            data-index={index}
                                            onClick={this.selectClick}
                                        ></div>
                                    </div>

                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}