import React from 'react';

import styles from './analysisTable.less';

export default class AnalysisTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollLeft: 0,
            widthData: []
        }
        this.onScroll = this.onScroll.bind(this);
        this.getTheadWidth = this.getTheadWidth.bind(this);
    }
    onScroll() {
        this.setState({
            scrollLeft: this.scroll.scrollLeft
        })
    }
    getTheadWidth(widthData) {
        if(widthData.toString() === this.state.widthData.toString()) {
            return false;
        } else {
            this.setState({
                widthData
            })
        }
    }
    render() {
        const { scrollLeft, widthData } = this.state;
        const { tableData, tbodyLength, marks } = this.props;
        if(!tableData || tableData.length === 0) {
            return <div>还没有数据哦~</div>
        }
        let tbody = JSON.parse(JSON.stringify(tableData));
        let thead = tbody.shift();
        return (
            <div className={styles.divTable}>
                <div className={styles.thead} style={{'right': `${scrollLeft}px`}}>
                    <TableHead widthData={widthData} tableHead={thead} marks={marks}/>
                </div>
                <div 
                    onScroll={this.onScroll} 
                    ref={(node) => this.scroll = node} 
                    className={styles.tbody} 
                    style={{
                        "paddingRight": tbody.length > tbodyLength ? "0px" : "7px",
                        "height": `${(tbody.length > tbodyLength ? tbodyLength : tbody.length) * 40 + 1}px`
                    }}
                >
                    <TableBody getTheadWidth={this.getTheadWidth} tableHead={thead} tableBody={tbody} marks={marks}/>
                </div>
            </div>
        )
    }
}

class TableHead extends React.Component {
    render() {
        const { widthData, tableHead, marks } = this.props;
        return (
            <table>
                <tbody>
                    <tr>
                        {
                            tableHead.map((item, index) => {
                                if((tableHead.length - 1 === index && item === "key") || index === 0) {
                                    return false;
                                }
                                return <td style={{"width": `${widthData[index - 1]}px`}} key={index}>{item}</td>
                            }).filter(item => item)
                        }
                        {
                            marks ? 
                                (<td style={{'width': '200px', 'textAlign': 'center'}}>操作</td>) : 
                                (<td style={{'display': 'none'}}></td>)
                        }
                    </tr>
                </tbody>
            </table>
        )
    }
}

class TableBody extends React.Component {
    constructor(props) {
        super(props);
        this.getTheadWidth = this.getTheadWidth.bind(this);
    }
    getTheadWidth() {
        let tr = this.thead;
        let th = tr.children;
        let widthArray = [];
        Array.from(th).forEach((item) => {
            widthArray.push(item.offsetWidth);
        })
        this.props.getTheadWidth(widthArray);
    }
    componentDidMount() {
        this.getTheadWidth();
    }
    componentDidUpdate() {
        this.getTheadWidth();
    }
    render() {
        const { tableHead, tableBody, marks } = this.props;
        return (
            <table>
                <thead>
                    <tr style={{'height': '0px', 'overflow': 'hidden'}} ref={(elem) => this.thead = elem}>
                        {
                            tableHead.map((item, index) => {
                                if((tableHead.length - 1 === index && item === "key") || index === 0) {
                                    return false;
                                }
                                return <th style={{"display" : index === 0 ? "none" : ""}} key={index} >{item}</th>
                            }).filter(item => item)
                        }
                        {
                            marks ? 
                                (<th style={{'width': '200px', 'textAlign': 'center'}}>操作</th>) : 
                                (<th style={{'display': 'none'}}></th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        tableBody.map((item, num) => {
                            return (
                                <tr key={num}>
                                    {
                                        item.map((data, index) => {
                                            if((tableHead[index] === "key" && tableHead.length - 1 === index) || index === 0) {
                                                return false;
                                            }
                                            return <td key={index}>{data}</td>
                                        }).filter(item => item)
                                    }
                                    {
                                        marks ? (
                                            <td style={{'width': '200px'}}>
                                                {
                                                    React.cloneElement(marks,{index: num})
                                                }
                                            </td>
                                        ) : (<td style={{'display': 'none'}}></td>)
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}