import React from 'react';

import styles from './tabsTitle.less';

import TabTitle from './tabTitle';

export default class TabsTitle extends React.Component {
    render() {
        const { tabs, index, changeIndex, deleteIndex } = this.props;
        return (
            <div className={styles.tabsTitle}>
                {
                    tabs.map((item, num) => (
                        <TabTitle 
                            key={num}
                            index={num}
                            active={index === num}
                            changeIndex={changeIndex}
                            deleteIndex={deleteIndex}
                        >
                            {item}
                        </TabTitle>
                    ))
                }
            </div>
        )
    }
}