import React from 'react';

export default class TabsContent extends React.Component {
    render() {
        const { children, activeNum } = this.props;
        return (
            <div>
                {
                    React.Children.map(children, (item, index) => {
                        return typeof item.type === 'function' ?
                            React.cloneElement(item, {active: (activeNum === index)}) : item;
                    })
                }
            </div>
        )
    }
}
