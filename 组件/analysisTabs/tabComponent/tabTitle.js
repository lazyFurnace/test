import React from 'react';

import styles from './tabTitle.less';

import iconfont from '../../../../../css/common/icon_font.less';

export default class TabTitle extends React.Component {
    constructor(props) {
        super(props);
        this.changeIndex = this.changeIndex.bind(this);
    }
    changeIndex(e) {
        if(e.target.nodeName === "SPAN") {
            return;
        }
        this.props.changeIndex(this.props.index);
    }
    render() {
        const { active, index, deleteIndex } = this.props;
        return (
            <div onClick={this.changeIndex} className={`${styles.tabTitle} ${active ? styles.tabTitleSel : ''}`} >
                <b className={styles.tabIcon}></b>
                <p>{this.props.children}</p>
                <span onClick={() => deleteIndex(index, this.props.children)} className={`${iconfont['iconfont']} ${iconfont["icon-guanbi1"]}`}></span>
            </div>
        )
    }
}